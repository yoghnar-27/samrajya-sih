import React from 'react';
import { RulerGender } from '../../types/game';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface RulerSelectScreenProps {
  selectedRuler: RulerGender;
  onSelect: (gender: RulerGender) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const RulerSelectScreen: React.FC<RulerSelectScreenProps> = ({
  selectedRuler,
  onSelect,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#1C150F] via-[#0E0A07] to-[#080604] p-6 lg:p-8 flex flex-col items-center select-none">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] uppercase font-marcellus tracking-[0.3em] text-[#D4AF37]">
            SOVEREIGN ARCHETYPE
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-gold-gradient tracking-widest">
          CHOOSE YOUR RULER
        </h2>
        <p className="text-xs text-[#9E8E76] font-marcellus tracking-wider uppercase mt-1">
          Select whether your dynasty shall be led by a Sovereign King or Queen
        </p>
      </div>

      {/* King vs Queen Cards */}
      <div className="flex flex-wrap gap-8 justify-center items-stretch max-w-4xl w-full my-auto">
        {/* KING */}
        <div
          onClick={() => {
            sounds.playButtonClick();
            onSelect('king');
          }}
          className={`w-full sm:w-[360px] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
            selectedRuler === 'king'
              ? 'bg-gradient-to-b from-[#2A2118]/95 to-[#140F0B]/98 border-2 border-[#D4AF37] shadow-royal-glow scale-[1.02]'
              : 'bg-[#18120D]/85 border border-[#B8860B]/30 hover:border-[#D4AF37]/60'
          }`}
        >
          <div>
            <div className="relative w-full h-[340px] rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black mb-4">
              <img
                src={GAME_IMAGES.KING_VIKRAMADITYA}
                alt="Sovereign King"
                className="w-full h-full object-cover object-top brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {selectedRuler === 'king' && (
                <div className="absolute top-3 right-3 bg-amber-400 text-black px-2.5 py-0.5 rounded text-[10px] font-cinzel font-black tracking-widest uppercase shadow">
                  ✓ ACTIVE CHOICE
                </div>
              )}
            </div>

            <h3 className="text-xl font-cinzel font-bold text-[#FFF4D0] text-center tracking-wider">
              SOVEREIGN KING
            </h3>
            <div className="text-[11px] font-marcellus text-[#D4AF37] text-center uppercase tracking-widest mt-0.5 mb-2">
              High Commander • Warrior Lineage
            </div>
            <p className="text-xs text-[#BEB29E] font-prose italic text-center mb-4">
              "The throne belongs to whoever holds the shield for the realm and the sword for the law."
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playTempleBell();
              onSelect('king');
              onConfirm();
            }}
            className={`w-full py-2.5 rounded font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer ${
              selectedRuler === 'king'
                ? 'bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black shadow-royal-glow hover:brightness-110'
                : 'bg-[#2A1F16] text-[#C8B088] hover:text-white border border-[#B8860B]/40'
            }`}
          >
            {selectedRuler === 'king' ? 'SELECT KING & CONTINUE →' : 'CHOOSE KING'}
          </button>
        </div>

        {/* QUEEN */}
        <div
          onClick={() => {
            sounds.playButtonClick();
            onSelect('queen');
          }}
          className={`w-full sm:w-[360px] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
            selectedRuler === 'queen'
              ? 'bg-gradient-to-b from-[#2A2118]/95 to-[#140F0B]/98 border-2 border-[#D4AF37] shadow-royal-glow scale-[1.02]'
              : 'bg-[#18120D]/85 border border-[#B8860B]/30 hover:border-[#D4AF37]/60'
          }`}
        >
          <div>
            <div className="relative w-full h-[340px] rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black mb-4">
              <img
                src={GAME_IMAGES.QUEEN_RUDRAMA}
                alt="Sovereign Queen"
                className="w-full h-full object-cover object-top brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {selectedRuler === 'queen' && (
                <div className="absolute top-3 right-3 bg-amber-400 text-black px-2.5 py-0.5 rounded text-[10px] font-cinzel font-black tracking-widest uppercase shadow">
                  ✓ ACTIVE CHOICE
                </div>
              )}
            </div>

            <h3 className="text-xl font-cinzel font-bold text-[#FFF4D0] text-center tracking-wider">
              SOVEREIGN QUEEN
            </h3>
            <div className="text-[11px] font-marcellus text-[#D4AF37] text-center uppercase tracking-widest mt-0.5 mb-2">
              Royal Strategist • Statecraft &amp; Law
            </div>
            <p className="text-xs text-[#BEB29E] font-prose italic text-center mb-4">
              "Fortresses are built with granite stone, but empires endure through wisdom and pacts."
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playTempleBell();
              onSelect('queen');
              onConfirm();
            }}
            className={`w-full py-2.5 rounded font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer ${
              selectedRuler === 'queen'
                ? 'bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black shadow-royal-glow hover:brightness-110'
                : 'bg-[#2A1F16] text-[#C8B088] hover:text-white border border-[#B8860B]/40'
            }`}
          >
            {selectedRuler === 'queen' ? 'SELECT QUEEN & CONTINUE →' : 'CHOOSE QUEEN'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center w-full max-w-4xl">
        <button
          onClick={onBack}
          className="text-xs font-cinzel tracking-wider text-[#A89279] hover:text-white cursor-pointer"
        >
          ← BACK TO MAIN MENU
        </button>
        <span className="text-[11px] text-[#7E7160] font-marcellus">
          Step 1: Choose Ruler
        </span>
      </div>
    </div>
  );
};
