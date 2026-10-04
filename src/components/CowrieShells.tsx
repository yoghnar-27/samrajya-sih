import React, { useState } from 'react';
import { CowrieShellState } from '../types/game';
import { sounds } from '../utils/audio';

interface CowrieShellsProps {
  shells: CowrieShellState[];
  onRoll: (points: number, newShells: CowrieShellState[]) => void;
  compact?: boolean;
  disabled?: boolean;
}

export const CowrieShells: React.FC<CowrieShellsProps> = ({
  shells,
  onRoll,
  compact = false,
  disabled = false,
}) => {
  const [isRolling, setIsRolling] = useState(false);

  const handleCast = () => {
    if (disabled || isRolling) return;
    setIsRolling(true);
    sounds.playCowrieRattle();

    setTimeout(() => {
      // Roll 6 shells. Each has ~50% chance of landing face up
      const newShells = shells.map((s) => ({
        ...s,
        isOpen: Math.random() > 0.42, // slight historical bias towards positive movement
        rotation: Math.floor(Math.random() * 30) - 15,
      }));

      // In Vedic Pachisi:
      // If 0 shells land face up -> counts as 6 (or 25 in some rules)
      // If 1 shell lands face up -> counts as 10 + grace throw
      // For strategy video game clarity:
      // count of open shells = movement distance (1 to 6). If all 6 open, player gets 6 + Grace Roll! If 0 open, counts as 1.
      const openCount = newShells.filter((s) => s.isOpen).length;
      const points = openCount === 0 ? 1 : openCount;

      setIsRolling(false);
      onRoll(points, newShells);
    }, 450);
  };

  const handleToggleSingle = (index: number) => {
    if (disabled || isRolling) return;
    sounds.playButtonClick();
    const updated = [...shells];
    updated[index] = {
      ...updated[index],
      isOpen: !updated[index].isOpen,
    };
    const openCount = updated.filter((s) => s.isOpen).length;
    onRoll(openCount === 0 ? 1 : openCount, updated);
  };

  const openCount = shells.filter((s) => s.isOpen).length;

  return (
    <div className={`relative plinth-stone border-2 border-bronze-400 rounded-t-xl ${compact ? 'p-3' : 'px-8 py-3.5'} shadow-[0_-8px_30px_rgba(0,0,0,0.85)] flex flex-col items-center`}>
      {/* Title Header */}
      <div className="text-center mb-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-amber-400 text-xs">❖</span>
          <span className="text-[10px] font-marcellus tracking-[0.28em] uppercase text-amber-300 font-bold">
            Pachisi Heritage Stratagem
          </span>
          <span className="text-amber-400 text-xs">❖</span>
        </div>
        <p className="text-[10px] text-amber-100/70 font-marcellus tracking-wider">
          Cast the six sacred cowrie shells to determine legion marching steps
        </p>
      </div>

      {/* Six Shells Container */}
      <div className="flex items-center justify-center space-x-3 sm:space-x-5 my-1.5 p-2 bg-black/60 rounded-lg border border-bronze-600/40 w-full">
        {shells.map((shell, idx) => (
          <div
            key={shell.id}
            onClick={() => handleToggleSingle(idx)}
            className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
              isRolling ? 'shell-rolling' : ''
            }`}
            title={`Cowrie #${idx + 1}: Click to flip (${shell.isOpen ? 'Face Up · 1' : 'Face Down · 0'})`}
          >
            {/* Visual Shell */}
            <div
              style={{ transform: `rotate(${shell.rotation}deg)` }}
              className={`relative transition-all duration-300 ${
                compact ? 'w-8 h-12' : 'w-9 h-14'
              } rounded-full flex items-center justify-center ${
                shell.isOpen
                  ? 'bg-gradient-to-b from-[#FFFDF0] via-[#EAD9BC] to-[#A38A65] border-2 border-amber-300 shadow-md'
                  : 'bg-gradient-to-b from-[#D4AF37] via-[#8F7226] to-[#473611] border-2 border-[#8C6239] shadow-inner'
              }`}
            >
              {shell.isOpen ? (
                /* Ventral aperture (Teeth slit) */
                <div className="relative w-2.5 h-10 bg-[#351E10] rounded-full border border-amber-300/60 overflow-hidden flex flex-col justify-around py-0.5">
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60"></div>
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60"></div>
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60"></div>
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60"></div>
                  <div className="w-full h-0.5 bg-[#ECD8B8]/60"></div>
                </div>
              ) : (
                /* Smooth Dorsal Back */
                <div className="w-5 h-9 rounded-full bg-gradient-to-b from-amber-200/30 to-amber-900/40 border border-white/20"></div>
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

      {/* Roll Action Footer */}
      <div className="flex flex-wrap items-center justify-between w-full mt-2 pt-2 border-t border-bronze-600/30 gap-3">
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-wider text-amber-300/70 font-marcellus">
            Calculated Stratagem
          </div>
          <div className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
            <span>MARCH POTENTIAL:</span>
            <span className="text-amber-300 text-sm font-black tracking-widest">
              {openCount === 0 ? 1 : openCount} STEPS
            </span>
            {openCount === 6 && (
              <span className="text-[10px] text-emerald-400 font-bold ml-1 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                ✦ GRACE ROLL ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* Primary Cast Button */}
        <button
          onClick={handleCast}
          disabled={disabled || isRolling}
          className="px-6 py-2 bg-gradient-to-b from-[#DFB76C] via-[#A4782B] to-[#593B0F] hover:from-[#EDD194] hover:to-[#7A541A] text-black font-cinzel font-black text-xs uppercase tracking-[0.2em] rounded border border-amber-200 shadow-[0_4px_14px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.7)] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
        >
          <span>{isRolling ? 'CASTING SACRED SHELLS...' : 'CAST SIX COWRIES'}</span>
          <span className="text-xs">🎲</span>
        </button>
      </div>
    </div>
  );
};
