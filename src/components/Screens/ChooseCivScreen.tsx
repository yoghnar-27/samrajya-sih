import React from 'react';
import { CivId } from '../../types/game';
import { CIVILIZATIONS } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface ChooseCivScreenProps {
  selectedCiv: CivId;
  onSelectCiv: (civId: CivId) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const ChooseCivScreen: React.FC<ChooseCivScreenProps> = ({
  selectedCiv,
  onSelectCiv,
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
            DYNASTIC IDENTITY
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-cinzel font-bold text-gold-gradient tracking-widest">
          CHOOSE YOUR CIVILIZATION
        </h2>
        <p className="text-xs text-[#9E8E76] font-marcellus tracking-wider uppercase mt-1">
          Each civilization commands unique cultural bonuses, architecture, and military regiments
        </p>
      </div>

      {/* 4 Civilizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl w-full my-auto">
        {Object.values(CIVILIZATIONS).map((civ) => {
          const isSelected = selectedCiv === civ.id;

          return (
            <div
              key={civ.id}
              onClick={() => {
                sounds.playButtonClick();
                onSelectCiv(civ.id);
              }}
              className={`rounded-lg p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#2A2118]/95 to-[#140F0B]/98 border-2 border-[#D4AF37] shadow-royal-glow -translate-y-1'
                  : 'bg-gradient-to-b from-[#1C1611]/85 to-[#100C09]/95 border border-[#B8860B]/30 hover:border-[#D4AF37]/60'
              }`}
            >
              <div>
                {/* Crest */}
                <div className="w-12 h-12 rounded-full border border-amber-400 mx-auto mb-3 flex items-center justify-center bg-radial from-[#2D2016] to-[#100B07] text-2xl shadow">
                  {civ.crestIcon}
                </div>

                <h3 className="text-lg font-cinzel font-bold text-[#FFF4D0] text-center tracking-wider">
                  {civ.name}
                </h3>
                <div className="text-[10px] font-marcellus tracking-widest text-[#D4AF37] uppercase text-center mb-3">
                  {civ.heritage}
                </div>

                {/* Thumbnail */}
                <div className="w-full h-32 rounded overflow-hidden border border-[#D4AF37]/20 mb-3 bg-black">
                  <img
                    src={civ.image}
                    alt={civ.name}
                    className="w-full h-full object-cover brightness-95"
                  />
                </div>

                {/* Description */}
                <p className="text-xs text-[#BEB29E] font-prose leading-relaxed mb-4">
                  {civ.description}
                </p>
              </div>

              <div>
                {/* Bonus perks */}
                <div className="border-t border-[#D4AF37]/20 pt-2.5 mb-4 space-y-1.5 text-[11px] font-prose">
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-[10px] font-marcellus text-amber-300/80">Bonus 1:</span>
                    <span className="font-semibold text-right">{civ.bonus.primary}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-[10px] font-marcellus text-amber-300/80">Bonus 2:</span>
                    <span className="font-semibold text-right">{civ.bonus.secondary}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300 pt-1 border-t border-[#B8860B]/20">
                    <span className="text-[10px] font-marcellus text-amber-300/80">Special Unit:</span>
                    <span className="font-bold text-amber-200">{civ.specialUnit.name}</span>
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playTempleBell();
                    onSelectCiv(civ.id);
                    onConfirm();
                  }}
                  className={`w-full py-2.5 rounded font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black shadow-royal-glow hover:brightness-110'
                      : 'bg-[#2A1F16] text-[#C8B088] hover:text-white border border-[#B8860B]/40'
                  }`}
                >
                  {isSelected ? 'ENTER 3D KINGDOM →' : 'SELECT CIV'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="mt-6 flex justify-between items-center w-full max-w-6xl">
        <button
          onClick={onBack}
          className="text-xs font-cinzel tracking-wider text-[#A89279] hover:text-white cursor-pointer"
        >
          ← BACK TO RULER SELECTION
        </button>
        <span className="text-[11px] text-[#7E7160] font-marcellus">
          Step 4 of 13 in Empire Creation
        </span>
      </div>
    </div>
  );
};
