import React from 'react';
import { CivId } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface KingdomReclaimedModalProps {
  dynastyId: CivId;
  message: string;
  onContinue: () => void;
}

export const KingdomReclaimedModal: React.FC<KingdomReclaimedModalProps> = ({
  dynastyId,
  message,
  onContinue,
}) => {
  const dynasty = DYNASTIES[dynastyId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#2E2012]/98 via-[#1E150B]/98 to-[#120C06]/98 border-2 border-amber-300 rounded-xl p-7 shadow-royal-glow text-center">
        <div className="w-14 h-14 mx-auto mb-3 text-amber-300 text-3xl flex items-center justify-center bg-black/60 border border-amber-400 rounded-full shadow">
          ⚜
        </div>

        <span className="text-[10px] font-marcellus font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
          THE RETURN OF THE SOVEREIGN
        </span>

        <h3 className="text-2xl font-cinzel font-black tracking-wider text-gold-gradient mb-2">
          KINGDOM RECLAIMED
        </h3>

        <div className="text-sm font-cinzel text-[#FFF4D0] font-bold mb-3">
          {dynasty.name} SEAT RESTORED
        </div>

        <p className="text-xs text-[#EAD9BC] font-prose leading-relaxed mb-6 border-y border-[#D4AF37]/30 py-3">
          The sacred bells of the Khajuraho-inspired shikharas ring across the valley. The rival garrison has yielded, and the original golden crest is hoisted once more over the imperial citadel!
        </p>

        <button
          onClick={() => {
            sounds.playVictoryFanfare();
            onContinue();
          }}
          className="px-8 py-3 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          ASCEND THE THRONE →
        </button>
      </div>
    </div>
  );
};
