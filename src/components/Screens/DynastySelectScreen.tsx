import React from 'react';
import { CivId } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface DynastySelectScreenProps {
  selectedDynasty: CivId;
  onSelect: (dynastyId: CivId) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const DynastySelectScreen: React.FC<DynastySelectScreenProps> = ({
  selectedDynasty,
  onSelect,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#1C150F] via-[#0E0A07] to-[#080604] p-6 lg:p-8 flex flex-col items-center select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] uppercase font-marcellus tracking-[0.3em] text-[#D4AF37]">
            CIVILIZATION SELECTION
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-gold-gradient tracking-widest">
          CHOOSE YOUR DYNASTY
        </h2>
        <p className="text-xs text-[#9E8E76] font-marcellus tracking-wider uppercase mt-1">
          Each dynasty starts at their ancestral capital on the Pachisi board
        </p>
      </div>

      {/* 4 Dynasties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl w-full my-auto">
        {Object.values(DYNASTIES).map((dynasty) => {
          const isSelected = selectedDynasty === dynasty.id;

          return (
            <div
              key={dynasty.id}
              onClick={() => {
                sounds.playButtonClick();
                onSelect(dynasty.id);
              }}
              style={{
                borderColor: isSelected ? dynasty.color : 'rgba(184, 134, 11, 0.3)',
              }}
              className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#2A2118]/95 to-[#140F0B]/98 border-2 shadow-royal-glow -translate-y-1'
                  : 'bg-[#18120D]/85 border hover:border-[#D4AF37]/60'
              }`}
            >
              <div>
                {/* Emblem */}
                <div
                  style={{
                    backgroundColor: `${dynasty.color}25`,
                    borderColor: dynasty.color,
                  }}
                  className="w-14 h-14 rounded-full border-2 mx-auto mb-3 flex items-center justify-center text-3xl shadow"
                >
                  {dynasty.emblem}
                </div>

                <h3 className="text-xl font-cinzel font-bold text-[#FFF4D0] text-center tracking-wider">
                  {dynasty.name}
                </h3>
                <div className="text-[11px] font-marcellus tracking-widest text-[#D4AF37] uppercase text-center mb-3">
                  Capital: {dynasty.capitalName}
                </div>

                {/* Description */}
                <p className="text-xs text-[#BEB29E] font-prose leading-relaxed mb-4 min-h-[50px]">
                  {dynasty.description}
                </p>
              </div>

              <div>
                {/* Stats Breakdown */}
                <div className="border-t border-[#D4AF37]/20 pt-3 mb-4 space-y-1.5 text-xs font-prose bg-black/40 p-2.5 rounded">
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-[10px] font-marcellus uppercase text-amber-300">
                      Starting Army:
                    </span>
                    <strong className="text-white font-cinzel">{dynasty.startingArmy}k</strong>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-[10px] font-marcellus uppercase text-amber-300">
                      Starting Treasury:
                    </span>
                    <strong className="text-white font-cinzel">{dynasty.startingResources} G</strong>
                  </div>
                  <div className="flex justify-between items-center text-stone-300 pt-1 border-t border-stone-800">
                    <span className="text-[10px] font-marcellus uppercase text-emerald-400">
                      Dynastic Bonus:
                    </span>
                    <span className="text-[10px] font-bold text-amber-200 text-right">
                      {dynasty.bonus}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playTempleBell();
                    onSelect(dynasty.id);
                    onConfirm();
                  }}
                  style={{
                    backgroundColor: isSelected ? dynasty.color : '#2A1F16',
                    color: isSelected ? '#000000' : '#EAD9BC',
                  }}
                  className="w-full py-2.5 rounded font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer shadow hover:brightness-110"
                >
                  {isSelected ? 'PROCEED WITH DYNASTY →' : 'SELECT DYNASTY'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center w-full max-w-6xl">
        <button
          onClick={onBack}
          className="text-xs font-cinzel tracking-wider text-[#A89279] hover:text-white cursor-pointer"
        >
          ← BACK TO RULER SELECTION
        </button>
        <span className="text-[11px] text-[#7E7160] font-marcellus">
          Step 2: Choose Dynasty
        </span>
      </div>
    </div>
  );
};
