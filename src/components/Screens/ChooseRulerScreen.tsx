import React from 'react';
import { RulerId } from '../../types/game';
import { RULERS } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface ChooseRulerScreenProps {
  selectedRuler: RulerId;
  onSelectRuler: (rulerId: RulerId) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const ChooseRulerScreen: React.FC<ChooseRulerScreenProps> = ({
  selectedRuler,
  onSelectRuler,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#1C150F] via-[#0E0A07] to-[#080604] p-6 lg:p-8 flex flex-col items-center select-none">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] uppercase font-marcellus tracking-[0.3em] text-[#D4AF37]">
            SOVEREIGN SUCCESSION
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-cinzel font-bold text-gold-gradient tracking-widest">
          CHOOSE YOUR RULER
        </h2>
        <p className="text-xs text-[#9E8E76] font-marcellus tracking-wider uppercase mt-1">
          Select the monarch who shall lead the dynasty across the subcontinental realm
        </p>
      </div>

      {/* Two Rulers Container */}
      <div className="flex flex-wrap gap-8 lg:gap-12 justify-center items-stretch max-w-5xl w-full my-auto">
        {Object.values(RULERS).map((ruler) => {
          const isSelected = selectedRuler === ruler.id;

          return (
            <div
              key={ruler.id}
              onClick={() => {
                sounds.playButtonClick();
                onSelectRuler(ruler.id);
              }}
              className={`w-full sm:w-[380px] rounded-lg p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#2A2118]/95 to-[#140F0B]/98 border-2 border-[#D4AF37] shadow-royal-glow scale-[1.01]'
                  : 'bg-gradient-to-b from-[#1C1611]/85 to-[#100C09]/95 border border-[#B8860B]/30 hover:border-[#D4AF37]/60'
              }`}
            >
              {/* Ruler 3D Portrait Frame (Images 3 & 6) */}
              <div className="relative w-full h-[400px] rounded overflow-hidden border border-[#D4AF37]/30 bg-black mb-4">
                <img
                  src={ruler.image}
                  alt={ruler.name}
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Selected Seal Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-black px-2.5 py-0.5 rounded text-[10px] font-cinzel font-black tracking-widest uppercase shadow">
                    ✓ SELECTED
                  </div>
                )}
              </div>

              {/* Ruler Details */}
              <div className="text-center w-full">
                <h3 className="text-lg font-cinzel font-bold text-[#FFF4D0] tracking-wider">
                  {ruler.name}
                </h3>
                <div className="text-[11px] font-marcellus tracking-widest text-[#D4AF37] uppercase mt-0.5 mb-2">
                  {ruler.archetype}
                </div>
                <p className="text-xs text-[#BEB29E] font-prose italic mb-3">
                  "{ruler.quote}"
                </p>

                {/* Traits */}
                <div className="grid grid-cols-3 gap-2 border-t border-[#D4AF37]/20 pt-2.5 mb-4 text-[10px] font-prose text-[#EAD9BC]">
                  {ruler.traits.map((tr: { label: string; value: string }, idx: number) => (
                    <div key={idx} className="bg-black/40 p-1.5 rounded border border-[#B8860B]/20">
                      <div className="text-stone-400 text-[8px] uppercase">{tr.label}</div>
                      <div className="font-bold text-amber-200 mt-0.5">{tr.value}</div>
                    </div>
                  ))}
                </div>

                {/* Primary Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playTempleBell();
                    onSelectRuler(ruler.id);
                    onConfirm();
                  }}
                  className={`w-full py-2.5 rounded font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black shadow-royal-glow hover:brightness-110'
                      : 'bg-[#2A1F16] text-[#C8B088] hover:text-white border border-[#B8860B]/40'
                  }`}
                >
                  {isSelected ? 'CONFIRM RULER & PROCEED →' : 'SELECT THIS RULER'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 flex justify-between items-center w-full max-w-5xl">
        <button
          onClick={onBack}
          className="text-xs font-cinzel tracking-wider text-[#A89279] hover:text-white cursor-pointer"
        >
          ← BACK TO MAIN MENU
        </button>
        <span className="text-[11px] text-[#7E7160] font-marcellus">
          Step 3 of 13 in Empire Creation
        </span>
      </div>
    </div>
  );
};
