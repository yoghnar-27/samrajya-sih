import {
  ActiveBattle,
  ActiveNeutralCapture,
  BoardNode,
  CivId,
  CowrieResult,
  CowrieShell,
  DynastyStatus,
  GameState,
  PlayerState,
} from '../types/game';
import { DYNASTIES } from '../data/pachisiBoard';

// ============================================================
// 1. SIX COWRIE SHELLS SYSTEM (STANDARD PACHISI MAPPING)
// ============================================================

export function rollSixCowries(): CowrieResult {
  const shells: CowrieShell[] = [];
  let mouthsUp = 0;

  for (let i = 1; i <= 6; i++) {
    // True randomized mouth orientation
    const isOpen = Math.random() > 0.45;
    if (isOpen) mouthsUp++;
    shells.push({
      id: i,
      isOpen,
      rotation: Math.floor(Math.random() * 30) - 15,
    });
  }

  // Standard traditional Indian Pachisi values:
  // 0 mouths up = 25 (Extra throw)
  // 1 mouth up  = 10 (Extra throw)
  // 2 mouths up = 2
  // 3 mouths up = 3
  // 4 mouths up = 4
  // 5 mouths up = 5
  // 6 mouths up = 6 (Extra throw)
  let moveValue = 0;
  let grantsExtraThrow = false;

  switch (mouthsUp) {
    case 0:
      moveValue = 25;
      grantsExtraThrow = true;
      break;
    case 1:
      moveValue = 10;
      grantsExtraThrow = true;
      break;
    case 2:
      moveValue = 2;
      grantsExtraThrow = false;
      break;
    case 3:
      moveValue = 3;
      grantsExtraThrow = false;
      break;
    case 4:
      moveValue = 4;
      grantsExtraThrow = false;
      break;
    case 5:
      moveValue = 5;
      grantsExtraThrow = false;
      break;
    case 6:
      moveValue = 6;
      grantsExtraThrow = true;
      break;
  }

  return {
    mouthsUp,
    moveValue,
    grantsExtraThrow,
    shells,
  };
}

// ============================================================
// 2. GRAPH-BASED MOVEMENT CALCULATION (BFS PATHS)
// ============================================================

export function calculateValidDestinations(
  startNodeId: string,
  targetSteps: number,
  board: Record<string, BoardNode>
): { nodeId: string; path: string[] }[] {
  // If targetSteps is 10 or 25, the board has 17 nodes.
  // In Pachisi, high numbers wrap around the circuit of the board.
  // We normalize long throws to effective board paths (e.g. 10 -> (10 % 8) or 4 steps, 25 -> 5 steps)
  // so the player can always move strategically within the plus board without deadlock!
  let effectiveSteps = targetSteps;
  if (targetSteps === 10) effectiveSteps = 4;
  if (targetSteps === 25) effectiveSteps = 5;

  const validDestinations: Map<string, string[]> = new Map();

  // Queue of [currentNodeId, currentPath]
  const queue: { nodeId: string; path: string[] }[] = [{ nodeId: startNodeId, path: [startNodeId] }];

  while (queue.length > 0) {
    const { nodeId, path } = queue.shift()!;

    if (path.length - 1 === effectiveSteps) {
      // Reached exact required steps! Do not land on the starting node itself unless cyclic.
      if (nodeId !== startNodeId) {
        if (!validDestinations.has(nodeId)) {
          validDestinations.set(nodeId, path);
        }
      }
      continue;
    }

    const currentNode = board[nodeId];
    if (!currentNode) continue;

    for (const neighborId of currentNode.connectedNodes) {
      // Avoid immediate backtracking to immediate predecessor in path
      const prevNodeId = path.length >= 2 ? path[path.length - 2] : null;
      if (neighborId !== prevNodeId) {
        queue.push({
          nodeId: neighborId,
          path: [...path, neighborId],
        });
      }
    }
  }

  // Fallback: If no destinations found (rare graph dead-end), return neighbors
  if (validDestinations.size === 0 && board[startNodeId]) {
    for (const neighborId of board[startNodeId].connectedNodes) {
      validDestinations.set(neighborId, [startNodeId, neighborId]);
    }
  }

  return Array.from(validDestinations.entries()).map(([nodeId, path]) => ({
    nodeId,
    path,
  }));
}

// ============================================================
// 3. COMBAT & CAPTURE RESOLUTION (DETERMINISTIC FORMULAS)
// ============================================================

export function resolveCombat(
  attackerId: CivId,
  defenderId: CivId,
  targetNode: BoardNode,
  attackerArmy: number,
  isCapitalBattle: boolean,
  isReclaimBattle: boolean
): ActiveBattle {
  const attackerConfig = DYNASTIES[attackerId];
  const defenderConfig = DYNASTIES[defenderId];

  // Attacker power bonuses
  let attackerBonus = 0;
  if (attackerId === 'maurya') attackerBonus += 15;
  if (attackerId === 'rajput') attackerBonus += 20;

  // Defender power bonuses
  let defenderBonus = targetNode.defense;
  if (defenderId === 'vijayanagara') defenderBonus += 20;

  const attackerPower = attackerArmy + attackerBonus;
  const defenderPower = targetNode.army + defenderBonus;

  const attackerWon = attackerPower > defenderPower;

  // Calculate casualties
  let attackerCasualties = 0;
  let defenderCasualties = 0;

  if (attackerWon) {
    attackerCasualties = Math.min(attackerArmy - 10, Math.floor(defenderPower * 0.35));
    defenderCasualties = targetNode.army; // garrison routed
  } else {
    attackerCasualties = Math.min(attackerArmy - 15, Math.floor(attackerPower * 0.45));
    defenderCasualties = Math.floor(targetNode.army * 0.2);
  }

  return {
    nodeId: targetNode.id,
    attackerId,
    defenderId,
    isCapitalBattle,
    isReclaimBattle,
    attackerArmy,
    defenderArmy: targetNode.army,
    territoryDefense: targetNode.defense,
    attackerPower,
    defenderPower,
    result: attackerWon ? 'attacker_won' : 'defender_won',
    attackerCasualties: Math.max(5, attackerCasualties),
    defenderCasualties: Math.max(5, defenderCasualties),
  };
}

export function resolveNeutralCapture(
  targetNode: BoardNode,
  attackerId: CivId,
  attackerArmy: number
): ActiveNeutralCapture {
  // Deterministic neutral capture requirement
  const captureCost = Math.min(15, Math.floor(targetNode.defense * 0.4));
  const success = attackerArmy >= targetNode.defense;

  return {
    nodeId: targetNode.id,
    nodeName: targetNode.name,
    attackerId,
    attackerArmy,
    neutralDefense: targetNode.defense,
    captureCost,
    success,
  };
}

// ============================================================
// 4. DETERMINISTIC AI DECISION ENGINE
// ============================================================

export function chooseAiMove(
  aiId: CivId,
  validDestinations: { nodeId: string; path: string[] }[],
  board: Record<string, BoardNode>,
  players: Record<CivId, PlayerState>
): { nodeId: string; path: string[] } | null {
  if (validDestinations.length === 0) return null;

  const aiPlayer = players[aiId];

  // Strategy 1: Reclaim own former capital if exiled and eligible
  if (aiPlayer.status === 'exiled' && aiPlayer.formerCapitalId) {
    const reclaimDest = validDestinations.find((d) => d.nodeId === aiPlayer.formerCapitalId);
    if (reclaimDest) return reclaimDest;
  }

  // Strategy 2: Attack enemy capital if reachable and winnable
  for (const dest of validDestinations) {
    const node = board[dest.nodeId];
    if (node && node.isCapital && node.owner !== aiId && node.owner !== 'neutral') {
      const defenderPower = node.army + node.defense;
      if (aiPlayer.army > defenderPower) {
        return dest; // Priority attack enemy capital!
      }
    }
  }

  // Strategy 3: Capture reachable neutral small empire
  for (const dest of validDestinations) {
    const node = board[dest.nodeId];
    if (node && node.type === 'NEUTRAL_EMPIRE' && node.owner === 'neutral') {
      if (aiPlayer.army >= node.defense) {
        return dest;
      }
    }
  }

  // Strategy 4: Attack vulnerable enemy territory
  for (const dest of validDestinations) {
    const node = board[dest.nodeId];
    if (node && node.owner !== aiId && node.owner !== 'neutral') {
      const defenderPower = node.army + node.defense;
      if (aiPlayer.army > defenderPower * 1.1) {
        return dest;
      }
    }
  }

  // Strategy 5: Fortify own territory if low defense
  for (const dest of validDestinations) {
    const node = board[dest.nodeId];
    if (node && node.owner === aiId && node.defense < 60) {
      return dest;
    }
  }

  // Strategy 6: Default to unowned / neutral territory or highest resource node
  let bestDest = validDestinations[0];
  let highestScore = -1;

  for (const dest of validDestinations) {
    const node = board[dest.nodeId];
    if (!node) continue;
    let score = node.resources;
    if (node.owner === 'neutral') score += 50;
    if (node.owner !== aiId && node.owner !== 'neutral') score += 30;
    if (score > highestScore) {
      highestScore = score;
      bestDest = dest;
    }
  }

  return bestDest;
}

// ============================================================
// 5. WIN & LOSS CONDITION EVALUATOR
// ============================================================

export function checkVictory(
  players: Record<CivId, PlayerState>,
  board: Record<string, BoardNode>
): { hasWinner: boolean; winningDynastyId: CivId | null; reason: string } {
  const totalTerritories = Object.keys(board).length; // 17

  for (const [id, player] of Object.entries(players) as [CivId, PlayerState][]) {
    // Win Condition 1: Controls at least 60% of all territories (>= 10 territories)
    if (player.territories.length >= Math.ceil(totalTerritories * 0.58)) {
      return {
        hasWinner: true,
        winningDynastyId: id,
        reason: `${player.name} has unified over 60% of all territories across the realm!`,
      };
    }

    // Win Condition 2: All rival capitals have been conquered and player holds their capital
    const rivalCapitals = Object.values(board).filter(
      (node) => node.isCapital && node.capitalOf !== id
    );
    const rivalCapitalsDefeated = rivalCapitals.every((cap) => cap.owner === id);

    if (rivalCapitalsDefeated && board[player.capitalId].owner === id) {
      return {
        hasWinner: true,
        winningDynastyId: id,
        reason: `${player.name} has conquered all rival capitals and forced their rulers into submission!`,
      };
    }
  }

  return { hasWinner: false, winningDynastyId: null, reason: '' };
}
