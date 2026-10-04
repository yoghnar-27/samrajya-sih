import React from 'react';
import { CivId } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface CapitalFallenModalProps {
  dynastyId: CivId;
  message: string;
  onContinue: () => void;
}

export const CapitalFallenModal: React.FC<CapitalFallenModalProps> = ({
  dynastyId,
  message,
  onContinue,
}) => {
  const dynasty = DYNASTIES[dynastyId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1C120C]/98 via-[#130C08]/98 to-[#0B0704]/98 border-2 border-[#B45309] rounded-xl p-7 shadow-2xl text-center">
        <div className="w-14 h-14 mx-auto mb-3 text-[#B45309] text-3xl flex items-center justify-center bg-black/60 border border-[#8F5528]/60 rounded-full shadow">
          👑
        </div>

        <span className="text-[10px] font-marcellus font-bold uppercase tracking-[0.3em] text-[#B45309] block mb-1">
          CAPITAL BREACHED • THE EMPIRE OVERRUN
        </span>

        <h3 className="text-2xl font-cinzel font-black tracking-wider text-[#EAD9BC] mb-2">
          THE KINGDOM HAS FALLEN
        </h3>

        <div className="text-sm font-cinzel text-amber-300 font-bold mb-3">
          {dynasty.name} SEAT IS OVERRUN
        </div>

        <p className="text-xs text-[#C9BAA5] font-prose italic leading-relaxed mb-6 border-y border-[#8F5528]/30 py-3">
          "Though the sandstone walls crumble and enemy standards fly from the palace terraces, the sacred lineage remains unbroken. The ruler survives in exile across the outer stepwells. Rally the remaining loyal clans to reclaim the ancestral throne!"
        </p>

        <button
          onClick={() => {
            sounds.playTempleBell();
            onContinue();
          }}
          className="px-8 py-3 rounded bg-gradient-to-b from-[#AA8524] to-[#684F12] hover:brightness-110 border border-[#D4AF37] text-black font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow transition cursor-pointer"
        >
          SURVIVE IN EXILE &amp; RALLY CLANS →
        </button>
      </div>
    </div>
  );
};
