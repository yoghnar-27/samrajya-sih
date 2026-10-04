import React from 'react';
import { CivId, RulerGender } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface DynastyIntroScreenProps {
  dynastyId: CivId;
  rulerGender: RulerGender;
  onEnterGame: () => void;
  onBack: () => void;
}

export const DynastyIntroScreen: React.FC<DynastyIntroScreenProps> = ({
  dynastyId,
  rulerGender,
  onEnterGame,
  onBack,
}) => {
  const dynasty = DYNASTIES[dynastyId];
  const rulerTitle = rulerGender === 'king' ? 'SOVEREIGN KING' : 'SOVEREIGN QUEEN';
  const rulerName = dynasty.rulerName[rulerGender];

  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#1C150F] via-[#0E0A07] to-[#080604] p-6 lg:p-12 flex flex-col items-center justify-center select-none">
      {/* Central Regal Plinth */}
      <div className="relative max-w-xl w-full bg-gradient-to-b from-[#241A12]/95 via-[#16100B]/98 to-[#0E0906]/98 border-2 border-amber-400 rounded-xl p-8 sm:p-10 shadow-2xl text-center">
        {/* Emblem */}
        <div
          style={{ backgroundColor: `${dynasty.color}30`, borderColor: dynasty.color }}
          className="w-20 h-20 rounded-full border-2 mx-auto mb-4 flex items-center justify-center text-4xl shadow-royal-glow"
        >
          {dynasty.emblem}
        </div>

        <span className="text-xs font-marcellus tracking-[0.35em] text-[#D4AF37] uppercase block mb-1">
          DYNASTIC INVESTITURE
        </span>

        <h2 className="text-3xl sm:text-4xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
          THE {dynasty.name}
        </h2>

        <p className="text-xs text-[#BEB29E] font-prose italic mb-6">
          {dynasty.description}
        </p>

        {/* 5 Imperial Parameters as requested in Section 8 */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-black/60 rounded-lg border border-bronze-600/40 text-xs font-prose mb-8">
          <div className="p-2 border-r border-b border-stone-800 text-left">
            <span className="text-[10px] uppercase font-marcellus text-amber-300 block">
              Sovereign Ruler:
            </span>
            <div className="text-sm font-bold text-white font-cinzel">{rulerTitle}</div>
            <span className="text-[10px] text-stone-400 font-serif">{rulerName}</span>
          </div>

          <div className="p-2 border-b border-stone-800 text-left">
            <span className="text-[10px] uppercase font-marcellus text-amber-300 block">
              Ancestral Capital:
            </span>
            <div className="text-sm font-bold text-amber-200 font-cinzel">{dynasty.capitalName}</div>
            <span className="text-[10px] text-stone-400">Seat of the Throne</span>
          </div>

          <div className="p-2 border-r border-stone-800 text-left">
            <span className="text-[10px] uppercase font-marcellus text-amber-300 block">
              Standing Army:
            </span>
            <div className="text-sm font-bold text-white font-cinzel">
              {dynasty.startingArmy}k Troops
            </div>
            <span className="text-[10px] text-stone-400">Ready at Capital</span>
          </div>

          <div className="p-2 text-left">
            <span className="text-[10px] uppercase font-marcellus text-amber-300 block">
              Initial Treasury:
            </span>
            <div className="text-sm font-bold text-amber-300 font-cinzel">
              {dynasty.startingResources} Karsapana
            </div>
            <span className="text-[10px] text-stone-400">Gold Reserves</span>
          </div>

          <div className="col-span-2 pt-2 border-t border-stone-800 flex justify-between items-center text-left">
            <span className="text-[11px] uppercase font-marcellus text-emerald-400">
              Initial Territories:
            </span>
            <span className="text-sm font-bold text-emerald-300 font-cinzel">
              1 (Capital Seat)
            </span>
          </div>
        </div>

        {/* Enter Samrajya CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onEnterGame();
            }}
            className="px-10 py-3.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel font-black text-sm tracking-[0.25em] uppercase shadow-royal-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            ENTER SAMRAJYA →
          </button>

          <button
            onClick={onBack}
            className="px-5 py-3 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
          >
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );
};
