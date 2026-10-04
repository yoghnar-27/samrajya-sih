// ============================================================
// SAMRAJYA - Game Types & State Interfaces
// Layer 1: Game Logic & State Machine Data Structures
// ============================================================

export type RulerGender = 'king' | 'queen';

export type CivId = 'maurya' | 'chola' | 'vijayanagara' | 'rajput';

export type PlayerType = 'human' | 'ai';

export type DynastyStatus = 'active' | 'exiled' | 'eliminated';

export interface DynastyConfig {
  id: CivId;
  name: string;
  rulerName: {
    king: string;
    queen: string;
  };
  emblem: string;
  color: string;
  lightColor: string;
  darkColor: string;
  capitalId: string;
  capitalName: string;
  description: string;
  startingArmy: number;
  startingResources: number;
  bonus: string;
}

export type TerritoryType = 'CAPITAL' | 'NEUTRAL_EMPIRE' | 'TERRITORY' | 'CENTRAL_HUB';

export interface BoardNode {
  id: string;
  name: string;
  type: TerritoryType;
  dynastyId?: CivId; // default capital owner if applicable
  owner: CivId | 'neutral';
  army: number;
  defense: number;
  resources: number;
  connectedNodes: string[];
  isCapital: boolean;
  capitalOf?: CivId;
  description: string;
  // Position on the Plus (+) shaped board grid: x, y (from 0 to 100)
  gridPos: { x: number; y: number };
  arm: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER';
}

export interface PlayerState {
  id: CivId;
  name: string;
  rulerGender: RulerGender;
  rulerName: string;
  color: string;
  capitalId: string;
  currentLocation: string; // node id where main army is stationed
  army: number;
  resources: number;
  territories: string[]; // list of controlled node IDs
  status: DynastyStatus;
  isAI: boolean;
  formerCapitalId?: string; // used when in exile
  reclaimEligible: boolean;
  battlesWon: number;
  neutralCaptured: number;
}

export interface CowrieShell {
  id: number;
  isOpen: boolean; // mouth facing up
  rotation: number;
}

export type CowrieShellState = CowrieShell;

export type HeaderSpecState =
  | 'ALL'
  | '01_MAIN_MENU'
  | '02_STRATEGY_WORLD'
  | '03_TERRITORY_SELECTED'
  | '04_COWRIE_THROW'
  | '05_BATTLE_STATE'
  | '06_KINGDOM_FALLEN'
  | '07_KINGDOM_RECLAIMED';

export type RulerId = 'vikramaditya' | 'rudrama';

export interface Ruler {
  id: RulerId;
  name: string;
  title: string;
  archetype: string;
  image: string;
  traits: { label: string; value: string }[];
  bio: string;
  quote: string;
}

export interface Civilization {
  id: CivId;
  name: string;
  title: string;
  heritage: string;
  bannerColor: string;
  crestIcon: string;
  image: string;
  description: string;
  bonus: { primary: string; secondary: string };
  specialUnit: { name: string; icon: string; description: string };
}

export interface Territory {
  id: string;
  name: string;
  type: string;
  owner: string;
  defense: number;
  maxDefense: number;
  resources: number;
  garrison: number;
  location: { x: number; y: number };
  description: string;
  yieldLabel: string;
}

export interface LedgerData {
  ruler: string;
  civilization: string;
  turn: number;
  gold: number;
  armies: number;
  territoriesCount: number;
  prestige: number;
  mandate: string;
  lastRoll: number;
  marchPotential: number;
  hasGraceRoll: boolean;
  selectedTerritoryId: string | null;
  selectedUnitId: string | null;
  historyLog: string[];
}

export interface CowrieResult {
  mouthsUp: number;
  moveValue: number;
  grantsExtraThrow: boolean;
  shells: CowrieShell[];
}

export type GameScreen =
  | 'SPLASH'
  | 'MAIN_MENU'
  | 'HOW_TO_PLAY'
  | 'RULER_SELECTION'
  | 'DYNASTY_SELECTION'
  | 'DYNASTY_INTRO'
  | 'GAME_BOARD'
  | 'VICTORY'
  | 'DEFEAT';

export type TurnPhase =
  | 'PLAYER_TURN_START'
  | 'COWRIE_THROWING'
  | 'COWRIE_RESULT'
  | 'SELECTING_MOVE'
  | 'MOVING_ARMY'
  | 'RESOLVING_DESTINATION'
  | 'NEUTRAL_INTERACTION'
  | 'BATTLE_INTERACTION'
  | 'CAPITAL_INTERACTION'
  | 'RECLAIM_INTERACTION'
  | 'OWN_TERRITORY_INTERACTION'
  | 'TURN_TRANSITION'
  | 'AI_THINKING';

export interface ActiveBattle {
  nodeId: string;
  attackerId: CivId;
  defenderId: CivId;
  isCapitalBattle: boolean;
  isReclaimBattle: boolean;
  attackerArmy: number;
  defenderArmy: number;
  territoryDefense: number;
  attackerPower: number;
  defenderPower: number;
  result?: 'attacker_won' | 'defender_won';
  attackerCasualties: number;
  defenderCasualties: number;
}

export interface ActiveNeutralCapture {
  nodeId: string;
  nodeName: string;
  attackerId: CivId;
  attackerArmy: number;
  neutralDefense: number;
  captureCost: number;
  success: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  animationSpeed: 'normal' | 'fast';
  aiDifficulty: 'normal' | 'strategic';
}

export interface GameState {
  currentTurn: number;
  activePlayerId: CivId;
  humanPlayerId: CivId;
  players: Record<CivId, PlayerState>;
  board: Record<string, BoardNode>;
  turnPhase: TurnPhase;
  lastCowrieResult: CowrieResult | null;
  throwsThisTurn: number;
  maxThrowsAllowed: number;
  validDestinations: { nodeId: string; path: string[] }[];
  currentMovingPath: string[];
  currentMovingIndex: number;
  activeBattle: ActiveBattle | null;
  activeNeutralCapture: ActiveNeutralCapture | null;
  exileAlert: { dynastyId: CivId; message: string } | null;
  reclaimAlert: { dynastyId: CivId; message: string } | null;
  turnLogs: string[];
  winningDynastyId: CivId | null;
}
