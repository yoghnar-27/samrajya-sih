// ============================================================
// SAMRAJYA - 6 Cowrie Shells Interactive Display
// Authentic representation of mouths up/down & Pachisi movement
// ============================================================

import React from 'react';
import { CowrieThrowResult } from '../types/pachisi';

interface CowrieCupProps {
  lastRoll: CowrieThrowResult | null;
  isRolling: boolean;
  canThrow: boolean;
  isHumanTurn: boolean;
  onThrow: () => void;
}

export const CowrieCup: React.FC<CowrieCupProps> = ({
  lastRoll,
  isRolling,
  canThrow,
  isHumanTurn,
  onThrow,
}) => {
  return (
    <div className="w-full bg-[#140F0A]/95 border-2 border-[#B8860B]/60 rounded-xl p-3 sm:p-4 shadow-2xl flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-[#B8860B]/30 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">🐚</span>
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#FFF4D0] uppercase">
            Six Sacred Cowries
          </span>
        </div>
        {lastRoll && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-marcellus text-[#C8B088]">
              Mouths Up: <strong className="text-amber-300">{lastRoll.mouthsUp} / 6</strong>
            </span>
            {lastRoll.isGrace && (
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/50 animate-pulse">
                ✦ GRACE (EXTRA THROW)
              </span>
            )}
          </div>
        )}
      </div>

      {/* 6 Shells Visual Rendering */}
      <div className="w-full grid grid-cols-6 gap-2 sm:gap-3 py-2 max-w-md">
        {Array.from({ length: 6 }).map((_, idx) => {
          const shell = lastRoll?.shells[idx];
          const isUp = shell ? shell.isMouthUp : idx < 2; // Default preview
          const rot = shell?.rotation ?? idx * 45;

          return (
            <div
              key={idx}
              className={`relative aspect-[3/4] rounded-full border flex items-center justify-center transition-all duration-300 ${
                isRolling
                  ? 'animate-bounce border-amber-400 bg-amber-950/40'
                  : isUp
                  ? 'border-amber-400 bg-gradient-to-b from-[#FFF8E7] via-[#E8D098] to-[#C2A362] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'border-stone-700 bg-gradient-to-b from-[#2E241B] to-[#120E0A] shadow-inner'
              }`}
              style={{ transform: `rotate(${rot}deg)` }}
            >
              {/* Shell Mouth Slit vs Shell Back Texture */}
              {isUp ? (
                // Mouth Up: Distinctive ribbed slit opening of a cowrie shell
                <div className="w-2 sm:w-2.5 h-7 sm:h-9 bg-[#382414] rounded-full flex flex-col justify-around items-center py-0.5 border border-[#6B4723]">
                  <span className="w-1 h-0.5 bg-[#E8D098] rounded-full opacity-80" />
                  <span className="w-1 h-0.5 bg-[#E8D098] rounded-full opacity-80" />
                  <span className="w-1 h-0.5 bg-[#E8D098] rounded-full opacity-80" />
                  <span className="w-1 h-0.5 bg-[#E8D098] rounded-full opacity-80" />
                </div>
              ) : (
                // Mouth Down: Smooth rounded back of shell with subtle ridge
                <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                  <span className="w-1.5 h-6 bg-stone-500 rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Movement Outcome & Throw CTA */}
      <div className="w-full flex items-center justify-between gap-3 mt-3 pt-2 border-t border-[#B8860B]/30">
        {/* Outcome Box */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-black/70 border-2 border-amber-400 flex flex-col items-center justify-center shadow-inner">
            <span className="text-[9px] uppercase tracking-wider text-[#A89279] font-marcellus leading-none">
              Spaces
            </span>
            <span className="text-xl sm:text-2xl font-cinzel font-black text-amber-300 leading-none mt-0.5">
              {isRolling ? '…' : lastRoll?.moveValue ?? '—'}
            </span>
          </div>

          <div className="text-left">
            <div className="text-[10px] text-[#A89279] uppercase font-marcellus">
              Rule Table
            </div>
            <div className="text-xs text-[#EAD9BC] font-cinzel">
              {lastRoll ? (
                <>
                  {lastRoll.mouthsUp} Up → <strong className="text-amber-300">{lastRoll.moveValue} Spaces</strong>
                  {lastRoll.isGrace ? ' + Grace Throw' : ''}
                </>
              ) : (
                'Values: 2, 3, 4, 5, 6*, 10*, 25*'
              )}
            </div>
          </div>
        </div>

        {/* Throw Action Button */}
        {isHumanTurn ? (
          <button
            onClick={onThrow}
            disabled={!canThrow || isRolling}
            className={`px-5 py-2.5 rounded-lg font-cinzel font-black text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
              canThrow && !isRolling
                ? 'bg-gradient-to-b from-[#E5A93C] to-[#A8721A] hover:from-[#F5BD54] hover:to-[#BD8527] text-black shadow-amber-500/30 scale-100 hover:scale-[1.02] active:scale-95'
                : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60'
            }`}
          >
            <span>🐚</span>
            <span>{isRolling ? 'CASTING...' : 'THROW COWRIES'}</span>
          </button>
        ) : (
          <div className="px-4 py-2 rounded bg-black/60 border border-rose-500/40 text-rose-300 text-xs font-cinzel tracking-wider flex items-center gap-2 animate-pulse">
            <span>⚙️</span>
            <span>COMPUTER ROLLING...</span>
          </div>
        )}
      </div>
    </div>
  );
};
