// ============================================================
// SAMRAJYA - Pure Pachisi Ruleset & Engine Types
// Traditional Indian 4-Piece Cross-Board Architecture
// ============================================================

export type RulerChoice = 'KING' | 'QUEEN';

export type DynastyId = 'MAURYA' | 'CHOLA' | 'VIJAYANAGARA' | 'RAJPUT';

export interface DynastyIdentity {
  id: DynastyId;
  name: string;
  color: string;
  badgeBg: string;
  border: string;
  accent: string;
  emblem: string;
  rulerName: {
    KING: string;
    QUEEN: string;
  };
  capital: string;
}

export type PieceId = 'P1' | 'P2' | 'P3' | 'P4' | 'C1' | 'C2' | 'C3' | 'C4';

export type PieceState = 'HOME' | 'ACTIVE' | 'FINISHED';

export interface PachisiPiece {
  id: PieceId;
  playerIndex: 0 | 1; // 0 = Human, 1 = Computer
  pieceNumber: 1 | 2 | 3 | 4;
  state: PieceState;
  /**
   * position on the player's personal path (0 = entry square, max = Charkoni)
   * -1 when state === 'HOME'
   */
  pathIndex: number;
  /** Board square ID currently occupied, or 'CHARKONI_HOME' or 'CHARKONI_FINISHED' */
  currentSquareId: string;
}

export interface BoardSquare {
  id: string;
  name: string;
  isCastle: boolean; // Safe square (cannot be captured)
  arm: 'SOUTH' | 'EAST' | 'NORTH' | 'WEST' | 'CHARKONI';
  columnType: 'OUTER_LEFT' | 'OUTER_RIGHT' | 'HOME_COL' | 'CHARKONI';
  colIndex: number; // 0..7 along the arm
  gridX: number; // 0..18 grid coordinates for rendering the cross board
  gridY: number;
}

export interface CowrieShell {
  id: number;
  isMouthUp: boolean;
  rotation: number;
}

export interface CowrieThrowResult {
  mouthsUp: number;
  moveValue: number; // 2, 3, 4, 5, 6, 10, 25
  isGrace: boolean; // true for 0, 1, 6 mouths up (values 25, 10, 6)
  shells: CowrieShell[];
}

export interface LegalMove {
  pieceId: PieceId;
  isEnterMove: boolean; // true if bringing an inactive piece from HOME to start square
  fromSquareId: string;
  toSquareId: string;
  fromPathIndex: number;
  toPathIndex: number;
  willCapturePieceIds: PieceId[];
  willFinish: boolean;
  description: string;
}

export type TurnPhase =
  | 'WAITING_FOR_THROW'
  | 'THROWING_ANIMATION'
  | 'AWAITING_MOVE_SELECTION'
  | 'PIECE_MOVING_ANIMATION'
  | 'RESOLVING_LANDING'
  | 'TURN_TRANSITION'
  | 'MATCH_OVER';

export interface PlayerInfo {
  isHuman: boolean;
  ruler: RulerChoice;
  dynasty: DynastyId;
  name: string;
  color: string;
  pieces: PachisiPiece[];
  entrySquareId: string;
  startTrackIndex: number;
  homeColStartTrackIndex: number;
}

export interface MatchState {
  player0: PlayerInfo; // Human
  player1: PlayerInfo; // Computer AI
  activePlayerIndex: 0 | 1;
  turnNumber: number;
  phase: TurnPhase;
  currentRoll: CowrieThrowResult | null;
  legalMoves: LegalMove[];
  selectedPieceId: PieceId | null;
  extraThrowsCount: number;
  hasExtraThrow: boolean;
  extraThrowReason: 'GRACE' | 'CAPTURE' | null;
  lastCaptureEvent: {
    capturerPieceId: PieceId;
    capturedPieceIds: PieceId[];
    squareId: string;
  } | null;
  matchLog: string[];
  winnerPlayerIndex: 0 | 1 | null;
}
