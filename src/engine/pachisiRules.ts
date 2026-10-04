// ============================================================
// SAMRAJYA - Unified Pachisi Rules Engine
// Single authoritative source of truth for both Human and AI
// ============================================================

import {
  ALL_SQUARES_MAP,
  CHARKONI_SQUARE,
  PLAYER_PATHS,
} from './pachisiBoard';
import { isGraceRoll } from './cowrieEngine';
import {
  CowrieThrowResult,
  LegalMove,
  MatchState,
  PachisiPiece,
  PieceId,
  PlayerInfo,
} from '../types/pachisi';

/**
 * Returns the path of BoardSquares for a player:
 * Player 0: South path (0..75)
 * Player 1: North path (0..75)
 */
export function getPlayerPath(playerIndex: 0 | 1) {
  return playerIndex === 0 ? PLAYER_PATHS.SOUTH : PLAYER_PATHS.NORTH;
}

/**
 * Check which squares currently contain blockades (>= 2 pieces of the same player).
 * Returns a map of squareId -> playerIndex of owner
 */
export function getBlockadedSquares(state: MatchState): Map<string, 0 | 1> {
  const blockades = new Map<string, 0 | 1>();
  const squareCountsP0 = new Map<string, number>();
  const squareCountsP1 = new Map<string, number>();

  state.player0.pieces.forEach((p) => {
    if (p.state === 'ACTIVE') {
      const c = (squareCountsP0.get(p.currentSquareId) || 0) + 1;
      squareCountsP0.set(p.currentSquareId, c);
      if (c >= 2) blockades.set(p.currentSquareId, 0);
    }
  });

  state.player1.pieces.forEach((p) => {
    if (p.state === 'ACTIVE') {
      const c = (squareCountsP1.get(p.currentSquareId) || 0) + 1;
      squareCountsP1.set(p.currentSquareId, c);
      if (c >= 2) blockades.set(p.currentSquareId, 1);
    }
  });

  return blockades;
}

/**
 * Given the current MatchState, an active playerIndex, and a CowrieThrowResult,
 * computes ALL legal moves available to that player.
 * Exactly identical logic for Human and AI.
 */
export function getLegalMoves(
  state: MatchState,
  playerIndex: 0 | 1,
  roll: CowrieThrowResult
): LegalMove[] {
  const player = playerIndex === 0 ? state.player0 : state.player1;
  const opponentIndex: 0 | 1 = playerIndex === 0 ? 1 : 0;
  const opponent = opponentIndex === 0 ? state.player0 : state.player1;
  const playerPath = getPlayerPath(playerIndex);
  const blockades = getBlockadedSquares(state);

  const legalMoves: LegalMove[] = [];
  const startSquare = playerPath[0];

  // Check if player's starting square has an ENEMY blockade
  const isStartSquareEnemyBlockaded = blockades.get(startSquare.id) === opponentIndex;

  // 1. Check inactive pieces in HOME that could enter play
  // An inactive piece can enter if:
  // - A GRACE was rolled (6, 10, or 25)
  // - AND the starting square is NOT blocked by an enemy blockade
  if (roll.isGrace && !isStartSquareEnemyBlockaded) {
    const inactivePiece = player.pieces.find((p) => p.state === 'HOME');
    if (inactivePiece) {
      // Check who occupies the starting square
      const opponentPiecesOnStart = opponent.pieces.filter(
        (op) => op.state === 'ACTIVE' && op.currentSquareId === startSquare.id
      );

      // Start square is a castle in Pachisi, so opponent piece cannot be captured on start if start is castle
      // However, check if startSquare is a castle:
      const canCaptureOnStart = !startSquare.isCastle && opponentPiecesOnStart.length > 0;
      const willCaptureIds = canCaptureOnStart ? opponentPiecesOnStart.map((op) => op.id) : [];

      legalMoves.push({
        pieceId: inactivePiece.id,
        isEnterMove: true,
        fromSquareId: 'HOME',
        toSquareId: startSquare.id,
        fromPathIndex: -1,
        toPathIndex: 0,
        willCapturePieceIds: willCaptureIds,
        willFinish: false,
        description: `Enter ${inactivePiece.id} onto ${startSquare.name}`,
      });
    }
  }

  // 2. Check active pieces traveling along the path
  const charkoniIndex = playerPath.length - 1; // 75

  player.pieces.forEach((piece) => {
    if (piece.state !== 'ACTIVE') return;

    const fromIndex = piece.pathIndex;
    const targetIndex = fromIndex + roll.moveValue;

    // Rule: Cannot overshoot the Charkoni!
    if (targetIndex > charkoniIndex) {
      // Illegal: overshoots Charkoni
      return;
    }

    // Rule: Exact roll required into Charkoni
    const willFinish = targetIndex === charkoniIndex;
    const targetSquare = playerPath[targetIndex];

    // Check path for enemy blockades between fromIndex + 1 and targetIndex
    let blockedByEnemy = false;
    for (let step = fromIndex + 1; step <= targetIndex; step++) {
      const stepSquare = playerPath[step];
      if (blockades.get(stepSquare.id) === opponentIndex) {
        blockedByEnemy = true;
        break;
      }
    }

    if (blockedByEnemy) {
      // Cannot pass through or land on an enemy blockade
      return;
    }

    // Check landing resolution
    let willCaptureIds: PieceId[] = [];
    if (!willFinish && !targetSquare.isCastle) {
      // On a non-castle square, opponent pieces are captured!
      const opponentPiecesOnTarget = opponent.pieces.filter(
        (op) => op.state === 'ACTIVE' && op.currentSquareId === targetSquare.id
      );
      if (opponentPiecesOnTarget.length > 0) {
        willCaptureIds = opponentPiecesOnTarget.map((op) => op.id);
      }
    }

    legalMoves.push({
      pieceId: piece.id,
      isEnterMove: false,
      fromSquareId: piece.currentSquareId,
      toSquareId: targetSquare.id,
      fromPathIndex: fromIndex,
      toPathIndex: targetIndex,
      willCapturePieceIds: willCaptureIds,
      willFinish,
      description: willFinish
        ? `Advance ${piece.id} ${roll.moveValue} spaces into Charkoni (FINISH)`
        : willCaptureIds.length > 0
        ? `Advance ${piece.id} ${roll.moveValue} spaces to ${targetSquare.name} and CAPTURE ${willCaptureIds.join(', ')}`
        : `Advance ${piece.id} ${roll.moveValue} spaces to ${targetSquare.name}`,
    });
  });

  return legalMoves;
}

/**
 * Executes a chosen legal move on the match state.
 * Returns the updated match state with:
 * - Piece moved
 * - Captures processed
 * - Finished pieces updated
 * - Extra throw granted if Grace or Capture
 * - Winner checked
 */
export function executeMove(state: MatchState, move: LegalMove): MatchState {
  const activePlayerIndex = state.activePlayerIndex;
  const isP0 = activePlayerIndex === 0;

  let player0 = { ...state.player0, pieces: [...state.player0.pieces] };
  let player1 = { ...state.player1, pieces: [...state.player1.pieces] };

  let activePlayer = isP0 ? player0 : player1;
  let opponentPlayer = isP0 ? player1 : player0;

  const playerPath = getPlayerPath(activePlayerIndex);
  const targetSquare = playerPath[move.toPathIndex];

  let captureOccurred = false;
  let capturedIds: PieceId[] = [];

  // 1. Move active player's piece
  activePlayer.pieces = activePlayer.pieces.map((p) => {
    if (p.id !== move.pieceId) return p;

    if (move.willFinish) {
      return {
        ...p,
        state: 'FINISHED',
        pathIndex: move.toPathIndex,
        currentSquareId: CHARKONI_SQUARE.id,
      };
    }

    return {
      ...p,
      state: 'ACTIVE',
      pathIndex: move.toPathIndex,
      currentSquareId: targetSquare.id,
    };
  });

  // 2. Process captures on opponent
  if (move.willCapturePieceIds.length > 0) {
    captureOccurred = true;
    capturedIds = move.willCapturePieceIds;

    opponentPlayer.pieces = opponentPlayer.pieces.map((op) => {
      if (capturedIds.includes(op.id)) {
        return {
          ...op,
          state: 'HOME',
          pathIndex: -1,
          currentSquareId: 'HOME',
        };
      }
      return op;
    });
  }

  // Update players back into local variables
  if (isP0) {
    player0 = activePlayer;
    player1 = opponentPlayer;
  } else {
    player0 = opponentPlayer;
    player1 = activePlayer;
  }

  // 3. Check for victory
  const allP0Finished = player0.pieces.every((p) => p.state === 'FINISHED');
  const allP1Finished = player1.pieces.every((p) => p.state === 'FINISHED');

  let winner: 0 | 1 | null = null;
  if (allP0Finished) winner = 0;
  else if (allP1Finished) winner = 1;

  // 4. Check extra throw condition
  // Granted if:
  // - Current roll was a GRACE (6, 10, or 25)
  // - OR a CAPTURE occurred!
  const isGrace = state.currentRoll ? state.currentRoll.isGrace : false;
  const grantsExtraThrow = isGrace || captureOccurred;

  let extraReason: 'GRACE' | 'CAPTURE' | null = null;
  if (captureOccurred) extraReason = 'CAPTURE';
  else if (isGrace) extraReason = 'GRACE';

  // 5. Construct log message
  const actorName = activePlayer.name;
  let logMsg = '';
  if (move.isEnterMove) {
    logMsg = `✦ ${actorName} entered ${move.pieceId} onto the board.`;
  } else if (move.willFinish) {
    logMsg = `🏆 ${actorName}'s ${move.pieceId} reached the Charkoni and is FINISHED!`;
  } else if (captureOccurred) {
    logMsg = `⚔️ CAPTURE! ${actorName}'s ${move.pieceId} captured ${capturedIds.join(', ')}! Extra throw granted!`;
  } else {
    logMsg = `✦ ${actorName} moved ${move.pieceId} ${state.currentRoll?.moveValue || ''} spaces to ${targetSquare.name}.`;
  }

  const updatedLogs = [logMsg, ...state.matchLog.slice(0, 15)];

  return {
    ...state,
    player0,
    player1,
    hasExtraThrow: grantsExtraThrow && winner === null,
    extraThrowReason: extraReason,
    lastCaptureEvent: captureOccurred
      ? {
          capturerPieceId: move.pieceId,
          capturedPieceIds: capturedIds,
          squareId: targetSquare.id,
        }
      : null,
    matchLog: updatedLogs,
    winnerPlayerIndex: winner,
    phase: winner !== null ? 'MATCH_OVER' : 'RESOLVING_LANDING',
  };
}

/**
 * Initializes a new Pachisi match between Human (player0) and Computer (player1).
 *
 * Setup:
 * - Piece 1 of each player starts ACTIVE on their entry square (pathIndex 0).
 * - Pieces 2, 3, 4 start in HOME (state: 'HOME', pathIndex -1) awaiting a grace roll.
 */
export function initializeMatch(
  humanRuler: 'KING' | 'QUEEN',
  humanDynasty: 'MAURYA' | 'CHOLA' | 'VIJAYANAGARA' | 'RAJPUT',
  aiRuler: 'KING' | 'QUEEN',
  aiDynasty: 'MAURYA' | 'CHOLA' | 'VIJAYANAGARA' | 'RAJPUT',
  startingPlayerIndex: 0 | 1
): MatchState {
  const p0Path = PLAYER_PATHS.SOUTH;
  const p1Path = PLAYER_PATHS.NORTH;

  // Player 0 (Human, South Arm)
  const p0Pieces: PachisiPiece[] = [
    {
      id: 'P1',
      playerIndex: 0,
      pieceNumber: 1,
      state: 'ACTIVE',
      pathIndex: 0,
      currentSquareId: p0Path[0].id,
    },
    {
      id: 'P2',
      playerIndex: 0,
      pieceNumber: 2,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
    {
      id: 'P3',
      playerIndex: 0,
      pieceNumber: 3,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
    {
      id: 'P4',
      playerIndex: 0,
      pieceNumber: 4,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
  ];

  // Player 1 (Computer, North Arm)
  const p1Pieces: PachisiPiece[] = [
    {
      id: 'C1',
      playerIndex: 1,
      pieceNumber: 1,
      state: 'ACTIVE',
      pathIndex: 0,
      currentSquareId: p1Path[0].id,
    },
    {
      id: 'C2',
      playerIndex: 1,
      pieceNumber: 2,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
    {
      id: 'C3',
      playerIndex: 1,
      pieceNumber: 3,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
    {
      id: 'C4',
      playerIndex: 1,
      pieceNumber: 4,
      state: 'HOME',
      pathIndex: -1,
      currentSquareId: 'HOME',
    },
  ];

  const player0: PlayerInfo = {
    isHuman: true,
    ruler: humanRuler,
    dynasty: humanDynasty,
    name: humanDynasty,
    color: '#E5A93C',
    pieces: p0Pieces,
    entrySquareId: p0Path[0].id,
    startTrackIndex: 0,
    homeColStartTrackIndex: 68,
  };

  const player1: PlayerInfo = {
    isHuman: false,
    ruler: aiRuler,
    dynasty: aiDynasty,
    name: aiDynasty,
    color: '#D9483B',
    pieces: p1Pieces,
    entrySquareId: p1Path[0].id,
    startTrackIndex: 34,
    homeColStartTrackIndex: 68,
  };

  const starterName = startingPlayerIndex === 0 ? player0.name : player1.name;

  return {
    player0,
    player1,
    activePlayerIndex: startingPlayerIndex,
    turnNumber: 1,
    phase: 'WAITING_FOR_THROW',
    currentRoll: null,
    legalMoves: [],
    selectedPieceId: null,
    extraThrowsCount: 0,
    hasExtraThrow: false,
    extraThrowReason: null,
    lastCaptureEvent: null,
    matchLog: [
      `✦ Match initiated: ${player0.name} (Human) vs ${player1.name} (Computer).`,
      `✦ ${starterName} won opening throw and takes the first turn.`,
    ],
    winnerPlayerIndex: null,
  };
}
