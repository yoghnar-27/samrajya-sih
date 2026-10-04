// ============================================================
// SAMRAJYA - AI Decision Making Engine
// Heuristic evaluation prioritizing Finish > Capture > Castle > Advance
// Uses identical rules engine and legal move set as human
// ============================================================

import { ALL_SQUARES_MAP, PLAYER_PATHS } from './pachisiBoard';
import { LegalMove, MatchState, PieceId } from '../types/pachisi';

export interface ScoredMove {
  move: LegalMove;
  score: number;
  reason: string;
}

/**
 * Checks if a piece on a given square is in danger of being captured by an opponent piece.
 * (i.e. an opponent piece is behind it within range 2..25 on a non-castle square)
 */
function isPositionInDanger(
  squareId: string,
  state: MatchState,
  opponentIndex: 0 | 1
): boolean {
  const square = ALL_SQUARES_MAP.get(squareId);
  if (!square || square.isCastle) return false;

  const opponentPath = opponentIndex === 0 ? PLAYER_PATHS.SOUTH : PLAYER_PATHS.NORTH;
  const oppSquareIndex = opponentPath.findIndex((s) => s.id === squareId);
  if (oppSquareIndex === -1) return false;

  const opponent = opponentIndex === 0 ? state.player0 : state.player1;
  const possibleRolls = [2, 3, 4, 5, 6, 10, 25];

  for (const op of opponent.pieces) {
    if (op.state !== 'ACTIVE') continue;
    const dist = oppSquareIndex - op.pathIndex;
    if (possibleRolls.includes(dist)) {
      return true; // An opponent piece can reach this square on a single roll!
    }
  }

  return false;
}

/**
 * Evaluates all legal moves for the AI and picks the highest scoring strategic move.
 */
export function chooseBestAiMove(
  state: MatchState,
  legalMoves: LegalMove[]
): LegalMove | null {
  if (legalMoves.length === 0) return null;
  if (legalMoves.length === 1) return legalMoves[0];

  const aiIndex = state.activePlayerIndex;
  const humanIndex: 0 | 1 = aiIndex === 0 ? 1 : 0;
  const aiPath = aiIndex === 0 ? PLAYER_PATHS.SOUTH : PLAYER_PATHS.NORTH;

  const scoredMoves: ScoredMove[] = legalMoves.map((move) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. FINISH A PIECE IF POSSIBLE (+1000)
    if (move.willFinish) {
      score += 1000;
      reasons.push('Finishes piece into Charkoni (+1000)');
    }

    // 2. CAPTURE AN OPPONENT IF POSSIBLE (+500 per captured piece)
    if (move.willCapturePieceIds.length > 0) {
      const captureBonus = 500 * move.willCapturePieceIds.length;
      score += captureBonus;
      reasons.push(`Captures ${move.willCapturePieceIds.join(', ')} (+${captureBonus})`);
    }

    // 3. MOVE A PIECE TO A SAFE CASTLE (+160)
    const targetSquare = ALL_SQUARES_MAP.get(move.toSquareId);
    if (targetSquare && targetSquare.isCastle && !move.willFinish) {
      score += 160;
      reasons.push('Lands on safe castle (+160)');
    }

    // 4. ESCAPE DANGER (+120)
    // If the piece was in danger on its current square and moves to safety
    if (move.fromSquareId !== 'HOME') {
      const wasInDanger = isPositionInDanger(move.fromSquareId, state, humanIndex);
      const willBeInDanger = isPositionInDanger(move.toSquareId, state, humanIndex);
      if (wasInDanger && !willBeInDanger) {
        score += 120;
        reasons.push('Escapes enemy threat range (+120)');
      }
    }

    // 5. ENTER A NEW PIECE IF STRATEGICALLY USEFUL (+140)
    if (move.isEnterMove) {
      // Useful if few active pieces on the board
      const activePiecesCount = state.player1.pieces.filter((p) => p.state === 'ACTIVE').length;
      if (activePiecesCount < 2) {
        score += 180;
        reasons.push('Brings new piece into play (+180)');
      } else {
        score += 100;
        reasons.push('Brings piece onto board (+100)');
      }
    }

    // 6. PROGRESS TOWARDS HOME (+distance advanced + distance along track)
    if (!move.isEnterMove && !move.willFinish) {
      // Reward pieces further along their path to prioritize bringing leading pieces home
      const progressScore = Math.floor(move.toPathIndex * 1.5);
      score += progressScore;
      reasons.push(`Advances along path (+${progressScore})`);
    }

    return {
      move,
      score,
      reason: reasons.join(' · '),
    };
  });

  // Sort descending by score
  scoredMoves.sort((a, b) => b.score - a.score);

  return scoredMoves[0].move;
}
