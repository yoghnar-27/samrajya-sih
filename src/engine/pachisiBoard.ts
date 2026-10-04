// ============================================================
// SAMRAJYA - Traditional Pachisi Cross-Board Representation
// 68 Perimeter Track Squares + 4 Home Columns + Central Charkoni
// Grid Size: 19x19 (Arm length: 8 squares, center Charkoni: 3x3)
// ============================================================

import { BoardSquare, DynastyId, DynastyIdentity } from '../types/pachisi';

export const DYNASTIES: Record<DynastyId, DynastyIdentity> = {
  MAURYA: {
    id: 'MAURYA',
    name: 'MAURYA DYNASTY',
    color: '#E5A93C', // Royal Saffron & Gold
    badgeBg: 'bg-amber-950/80',
    border: 'border-amber-400',
    accent: 'text-amber-300',
    emblem: '🦁',
    rulerName: {
      KING: 'Chandragupta Maurya',
      QUEEN: 'Empress Durdhara',
    },
    capital: 'Pataliputra',
  },
  CHOLA: {
    id: 'CHOLA',
    name: 'CHOLA DYNASTY',
    color: '#D9483B', // Imperial Crimson & Ruby
    badgeBg: 'bg-rose-950/80',
    border: 'border-rose-500',
    accent: 'text-rose-400',
    emblem: '🐅',
    rulerName: {
      KING: 'Rajaraja Chola',
      QUEEN: 'Queen Kundavai',
    },
    capital: 'Thanjavur',
  },
  VIJAYANAGARA: {
    id: 'VIJAYANAGARA',
    name: 'VIJAYANAGARA EMPIRE',
    color: '#2E9E68', // Emerald & Jade
    badgeBg: 'bg-emerald-950/80',
    border: 'border-emerald-400',
    accent: 'text-emerald-300',
    emblem: '🐘',
    rulerName: {
      KING: 'Krishnadevaraya',
      QUEEN: 'Queen Tirumala Devi',
    },
    capital: 'Hampi',
  },
  RAJPUT: {
    id: 'RAJPUT',
    name: 'RAJPUT REALM',
    color: '#3B82F6', // Royal Indigo & Lapis
    badgeBg: 'bg-blue-950/80',
    border: 'border-blue-400',
    accent: 'text-blue-300',
    emblem: '⚔️',
    rulerName: {
      KING: 'Maharana Pratap',
      QUEEN: 'Rani Padmini',
    },
    capital: 'Chittorgarh',
  },
};

/**
 * Total perimeter track: 68 squares (indices 0..67).
 * Counter-clockwise path around the 4 arms:
 * South Arm (squares 0..16)
 * East Arm (squares 17..33)
 * North Arm (squares 34..50)
 * West Arm (squares 51..67)
 *
 * Castle squares (marked with an X, completely safe from capture):
 * Traditionally:
 * - Square 7 & 12 on South arm
 * - Square 24 & 29 on East arm
 * - Square 41 & 46 on North arm
 * - Square 58 & 63 on West arm
 * Plus the 4 entry squares: 0, 17, 34, 51.
 */

export const CASTLE_SQUARE_INDICES = new Set([
  0, 7, 12,      // South arm castles
  17, 24, 29,    // East arm castles
  34, 41, 46,    // North arm castles
  51, 58, 63,    // West arm castles
]);

// Build the 68 perimeter track squares with 19x19 grid coordinates
// Center is x: [8, 9, 10], y: [8, 9, 10]
export function buildPerimeterTrack(): BoardSquare[] {
  const squares: BoardSquare[] = [];

  // Helper to add
  const add = (
    id: string,
    name: string,
    arm: 'SOUTH' | 'EAST' | 'NORTH' | 'WEST',
    columnType: 'OUTER_LEFT' | 'OUTER_RIGHT' | 'HOME_COL',
    colIndex: number,
    gridX: number,
    gridY: number,
    index: number
  ) => {
    squares.push({
      id,
      name,
      isCastle: CASTLE_SQUARE_INDICES.has(index),
      arm,
      columnType,
      colIndex,
      gridX,
      gridY,
    });
  };

  let idx = 0;

  // 1. SOUTH ARM (Squares 0 to 16)
  // Moving outwards down the right column (x=10, y=11..18)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `South Outward ${step + 1}`, 'SOUTH', 'OUTER_RIGHT', step, 10, 11 + step, idx);
    idx++;
  }
  // Turning bottom tip (x=9, y=18)
  add(`TRACK_${String(idx).padStart(2, '0')}`, 'South Tip', 'SOUTH', 'OUTER_RIGHT', 8, 9, 18, idx);
  idx++;
  // Moving inwards up the left column (x=8, y=18..11)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `South Inward ${8 - step}`, 'SOUTH', 'OUTER_LEFT', 7 - step, 8, 18 - step, idx);
    idx++;
  }

  // 2. EAST ARM (Squares 17 to 33)
  // Moving outwards rightwards along the bottom column (x=11..18, y=10)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `East Outward ${step + 1}`, 'EAST', 'OUTER_RIGHT', step, 11 + step, 10, idx);
    idx++;
  }
  // Turning right tip (x=18, y=9)
  add(`TRACK_${String(idx).padStart(2, '0')}`, 'East Tip', 'EAST', 'OUTER_RIGHT', 8, 18, 9, idx);
  idx++;
  // Moving inwards leftwards along the top column (x=18..11, y=8)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `East Inward ${8 - step}`, 'EAST', 'OUTER_LEFT', 7 - step, 18 - step, 8, idx);
    idx++;
  }

  // 3. NORTH ARM (Squares 34 to 50)
  // Moving outwards upwards along the left column (x=8, y=7..0)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `North Outward ${step + 1}`, 'NORTH', 'OUTER_RIGHT', step, 8, 7 - step, idx);
    idx++;
  }
  // Turning top tip (x=9, y=0)
  add(`TRACK_${String(idx).padStart(2, '0')}`, 'North Tip', 'NORTH', 'OUTER_RIGHT', 8, 9, 0, idx);
  idx++;
  // Moving inwards downwards along the right column (x=10, y=0..7)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `North Inward ${8 - step}`, 'NORTH', 'OUTER_LEFT', 7 - step, 10, step, idx);
    idx++;
  }

  // 4. WEST ARM (Squares 51 to 67)
  // Moving outwards leftwards along the top column (x=7..0, y=8)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `West Outward ${step + 1}`, 'WEST', 'OUTER_RIGHT', step, 7 - step, 8, idx);
    idx++;
  }
  // Turning left tip (x=0, y=9)
  add(`TRACK_${String(idx).padStart(2, '0')}`, 'West Tip', 'WEST', 'OUTER_RIGHT', 8, 0, 9, idx);
  idx++;
  // Moving inwards rightwards along the bottom column (x=0..7, y=10)
  for (let step = 0; step < 8; step++) {
    add(`TRACK_${String(idx).padStart(2, '0')}`, `West Inward ${8 - step}`, 'WEST', 'OUTER_LEFT', 7 - step, step, 10, idx);
    idx++;
  }

  return squares;
}

// Global cached perimeter track
export const PERIMETER_TRACK: BoardSquare[] = buildPerimeterTrack();

/**
 * Home Column for South Arm (leading into Charkoni):
 * x = 9, y = 17, 16, 15, 14, 13, 12, 11 (7 squares)
 */
export const SOUTH_HOME_COLUMN: BoardSquare[] = Array.from({ length: 7 }, (_, i) => ({
  id: `SOUTH_HOME_${i + 1}`,
  name: `South Home ${i + 1}`,
  isCastle: true, // Home column is always safe
  arm: 'SOUTH',
  columnType: 'HOME_COL',
  colIndex: i,
  gridX: 9,
  gridY: 17 - i,
}));

/**
 * Home Column for North Arm (leading into Charkoni):
 * x = 9, y = 1, 2, 3, 4, 5, 6, 7 (7 squares)
 */
export const NORTH_HOME_COLUMN: BoardSquare[] = Array.from({ length: 7 }, (_, i) => ({
  id: `NORTH_HOME_${i + 1}`,
  name: `North Home ${i + 1}`,
  isCastle: true, // Home column is always safe
  arm: 'NORTH',
  columnType: 'HOME_COL',
  colIndex: i,
  gridX: 9,
  gridY: 1 + i,
}));

/**
 * Home Column for East Arm (leading into Charkoni):
 * y = 9, x = 17, 16, 15, 14, 13, 12, 11 (7 squares)
 */
export const EAST_HOME_COLUMN: BoardSquare[] = Array.from({ length: 7 }, (_, i) => ({
  id: `EAST_HOME_${i + 1}`,
  name: `East Home ${i + 1}`,
  isCastle: true,
  arm: 'EAST',
  columnType: 'HOME_COL',
  colIndex: i,
  gridX: 17 - i,
  gridY: 9,
}));

/**
 * Home Column for West Arm (leading into Charkoni):
 * y = 9, x = 1, 2, 3, 4, 5, 6, 7 (7 squares)
 */
export const WEST_HOME_COLUMN: BoardSquare[] = Array.from({ length: 7 }, (_, i) => ({
  id: `WEST_HOME_${i + 1}`,
  name: `West Home ${i + 1}`,
  isCastle: true,
  arm: 'WEST',
  columnType: 'HOME_COL',
  colIndex: i,
  gridX: 1 + i,
  gridY: 9,
}));

/**
 * Central Charkoni Square (Destination of all finished pieces)
 */
export const CHARKONI_SQUARE: BoardSquare = {
  id: 'CHARKONI',
  name: 'Central Charkoni',
  isCastle: true,
  arm: 'CHARKONI',
  columnType: 'CHARKONI',
  colIndex: 0,
  gridX: 9,
  gridY: 9,
};

/**
 * Build a complete sequential path for Player 0 (South entry) and Player 1 (North entry).
 *
 * Player 0 (South):
 * - Starts at TRACK_00 (South entry square)
 * - Travels 68 squares along the perimeter track: TRACK_00 -> TRACK_67
 * - At step 68, turns into SOUTH_HOME_COLUMN (7 squares: index 68..74)
 * - Step 75: Enters CHARKONI (exact roll required!)
 * Total path length: 76 positions (0..75).
 *
 * Player 1 (North):
 * - Starts at TRACK_34 (North entry square)
 * - Travels 68 squares around perimeter: (34 + i) % 68
 * - At step 68, turns into NORTH_HOME_COLUMN (7 squares: index 68..74)
 * - Step 75: Enters CHARKONI (exact roll required!)
 */

export function buildPlayerPath(startTrackIndex: number, homeColumn: BoardSquare[]): BoardSquare[] {
  const fullPath: BoardSquare[] = [];

  // 68 perimeter track squares
  for (let i = 0; i < 68; i++) {
    const trackIndex = (startTrackIndex + i) % 68;
    fullPath.push(PERIMETER_TRACK[trackIndex]);
  }

  // 7 Home column squares
  for (let i = 0; i < homeColumn.length; i++) {
    fullPath.push(homeColumn[i]);
  }

  // Final Charkoni square
  fullPath.push(CHARKONI_SQUARE);

  return fullPath;
}

export const PLAYER_PATHS = {
  // Player 0 (South)
  SOUTH: buildPlayerPath(0, SOUTH_HOME_COLUMN),
  // Player 1 (North)
  NORTH: buildPlayerPath(34, NORTH_HOME_COLUMN),
};

// Map of all squares for quick ID lookup
export const ALL_SQUARES_MAP: Map<string, BoardSquare> = new Map();
PERIMETER_TRACK.forEach((s) => ALL_SQUARES_MAP.set(s.id, s));
SOUTH_HOME_COLUMN.forEach((s) => ALL_SQUARES_MAP.set(s.id, s));
NORTH_HOME_COLUMN.forEach((s) => ALL_SQUARES_MAP.set(s.id, s));
EAST_HOME_COLUMN.forEach((s) => ALL_SQUARES_MAP.set(s.id, s));
WEST_HOME_COLUMN.forEach((s) => ALL_SQUARES_MAP.set(s.id, s));
ALL_SQUARES_MAP.set(CHARKONI_SQUARE.id, CHARKONI_SQUARE);
