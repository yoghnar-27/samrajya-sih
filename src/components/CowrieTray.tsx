import React from 'react';
import { CowrieResult, CowrieShell } from '../types/game';

interface CowrieTrayProps {
  lastResult: CowrieResult | null;
  isRolling: boolean;
  canThrow: boolean;
  throwsThisTurn: number;
  maxThrows: number;
  onThrow: () => void;
  disabled?: boolean;
}

export const CowrieTray: React.FC<CowrieTrayProps> = ({
  lastResult,
  isRolling,
  canThrow,
  throwsThisTurn,
  maxThrows,
  onThrow,
  disabled = false,
}) => {
  // Default shells before first roll
  const defaultShells: CowrieShell[] = [
    { id: 1, isOpen: true, rotation: -6 },
    { id: 2, isOpen: true, rotation: 3 },
    { id: 3, isOpen: false, rotation: -12 },
    { id: 4, isOpen: true, rotation: 6 },
    { id: 5, isOpen: true, rotation: -3 },
    { id: 6, isOpen: false, rotation: 12 },
  ];

  const shells = lastResult?.shells || defaultShells;
  const mouthsUp = lastResult?.mouthsUp ?? 4;
  const moveValue = lastResult?.moveValue ?? 4;
  const extraThrow = lastResult?.grantsExtraThrow ?? false;

  return (
    <div className="relative plinth-stone border-2 border-bronze-400 rounded-xl p-3 sm:p-4 shadow-2xl flex flex-col items-center select-none bg-[#140F0B]/95 w-full">
      {/* Header title */}
      <div className="flex items-center justify-between w-full border-b border-bronze-600/30 pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-amber-400 text-xs">❖</span>
          <span className="text-[11px] font-cinzel tracking-[0.25em] uppercase text-amber-300 font-bold">
            SIX COWRIE STRATAGEM
          </span>
          <span className="text-amber-400 text-xs">❖</span>
        </div>
        <div className="text-[10px] font-marcellus text-amber-200/70 tracking-wider">
          Traditional Vedic Pachisi RNG
        </div>
      </div>

      {/* 6 Shells Row */}
      <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-2 p-2 bg-black/60 rounded-lg border border-bronze-600/40 w-full overflow-x-auto">
        {shells.map((shell, idx) => (
          <div
            key={shell.id}
            className={`flex flex-col items-center transition-all ${
              isRolling ? 'shell-rolling' : ''
            }`}
          >
            {/* Visual Shell */}
            <div
              style={{ transform: `rotate(${shell.rotation}deg)` }}
              className={`relative transition-all duration-300 w-8 h-12 sm:w-9 sm:h-14 rounded-full flex items-center justify-center ${
                shell.isOpen
                  ? 'bg-gradient-to-b from-[#FFFDF0] via-[#EAD9BC] to-[#A38A65] border-2 border-amber-300 shadow-md'
                  : 'bg-gradient-to-b from-[#D4AF37] via-[#8F7226] to-[#473611] border-2 border-[#8C6239] shadow-inner'
              }`}
            >
              {shell.isOpen ? (
                /* Ventral aperture (Teeth slit) */
                <div className="relative w-2 h-8 sm:w-2.5 sm:h-10 bg-[#351E10] rounded-full border border-amber-300/60 overflow-hidden flex flex-col justify-around py-0.5">
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60" />
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60" />
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60" />
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60" />
                </div>
              ) : (
                /* Smooth Dorsal Back */
                <div className="w-4 h-7 sm:w-5 sm:h-9 rounded-full bg-gradient-to-b from-amber-200/30 to-amber-900/40 border border-white/20" />
              )}
            </div>

            <span
              className={`text-[9px] font-bold mt-1 tracking-wider ${
                shell.isOpen ? 'text-amber-300' : 'text-stone-400'
              }`}
            >
              {shell.isOpen ? 'UP (1)' : 'DOWN (0)'}
            </span>
          </div>
        ))}
      </div>

      {/* Result Metrics & Status */}
      <div className="flex flex-wrap items-center justify-between w-full mt-1.5 pt-2 border-t border-bronze-600/30 gap-2">
        <div className="flex items-center space-x-3 text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-amber-300/70 font-marcellus block">
              Mouths Open
            </span>
            <span className="font-cinzel font-bold text-amber-100">{mouthsUp} of 6</span>
          </div>
          <div className="h-6 w-px bg-bronze-600/30" />
          <div>
            <span className="text-[9px] uppercase tracking-wider text-amber-300/70 font-marcellus block">
              Movement Steps
            </span>
            <span className="font-cinzel font-black text-amber-300 text-sm">
              {moveValue} SPACES
            </span>
          </div>
          <div className="h-6 w-px bg-bronze-600/30" />
          <div>
            <span className="text-[9px] uppercase tracking-wider text-amber-300/70 font-marcellus block">
              Extra Throw?
            </span>
            <span
              className={`font-cinzel font-bold text-xs ${
                extraThrow ? 'text-emerald-400 animate-pulse' : 'text-stone-400'
              }`}
            >
              {extraThrow ? '✦ YES (0, 1, or 6) ✦' : 'NO'}
            </span>
          </div>
        </div>

        {/* Primary Throw Button */}
        <button
          onClick={onThrow}
          disabled={disabled || !canThrow || isRolling}
          className="px-5 py-2.5 bg-gradient-to-b from-[#DFB76C] via-[#A4782B] to-[#593B0F] hover:from-[#EDD194] hover:to-[#7A541A] text-black font-cinzel font-black text-xs uppercase tracking-[0.2em] rounded border border-amber-200 shadow-[0_4px_14px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.7)] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{isRolling ? 'CASTING SHELLS...' : extraThrow && throwsThisTurn > 1 ? 'EXTRA THROW!' : 'THROW COWRIES'}</span>
          <span className="text-xs">🎲</span>
        </button>
      </div>
    </div>
  );
};
