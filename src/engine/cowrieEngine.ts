// ============================================================
// SAMRAJYA - Six Cowrie Shells Physics & Rules Engine
// Exact Pachisi movement table: [25*, 10*, 2, 3, 4, 5, 6*]
// ============================================================

import { CowrieShell, CowrieThrowResult } from '../types/pachisi';

/**
 * Authentic Pachisi 6-Cowrie Movement Table:
 * 0 mouths up -> 25 spaces + GRACE
 * 1 mouth up  -> 10 spaces + GRACE
 * 2 mouths up -> 2 spaces
 * 3 mouths up -> 3 spaces
 * 4 mouths up -> 4 spaces
 * 5 mouths up -> 5 spaces
 * 6 mouths up -> 6 spaces + GRACE
 */
export const COWRIE_MOVEMENT_TABLE: Record<number, { moveValue: number; isGrace: boolean }> = {
  0: { moveValue: 25, isGrace: true },
  1: { moveValue: 10, isGrace: true },
  2: { moveValue: 2, isGrace: false },
  3: { moveValue: 3, isGrace: false },
  4: { moveValue: 4, isGrace: false },
  5: { moveValue: 5, isGrace: false },
  6: { moveValue: 6, isGrace: true },
};

/**
 * Throws 6 independent cowrie shells.
 * Each shell independently lands mouth up or mouth down (50% probability).
 */
export function throwSixCowries(): CowrieThrowResult {
  const shells: CowrieShell[] = [];
  let mouthsUpCount = 0;

  for (let i = 0; i < 6; i++) {
    // 50% chance of mouth facing upward
    const isMouthUp = Math.random() < 0.5;
    if (isMouthUp) mouthsUpCount++;

    shells.push({
      id: i + 1,
      isMouthUp,
      // Random rotation angle for visual fidelity (0..360 degrees)
      rotation: Math.floor(Math.random() * 360),
    });
  }

  const { moveValue, isGrace } = COWRIE_MOVEMENT_TABLE[mouthsUpCount];

  return {
    mouthsUp: mouthsUpCount,
    moveValue,
    isGrace,
    shells,
  };
}

/**
 * Helper to check if a rolled movement value is a grace throw
 */
export function isGraceRoll(moveValue: number): boolean {
  return moveValue === 25 || moveValue === 10 || moveValue === 6;
}
