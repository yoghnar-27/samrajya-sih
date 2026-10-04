import React from 'react';
import { sounds } from '../../utils/audio';

interface HowToPlayScreenProps {
  onBack: () => void;
  onBeginReign: () => void;
}

export const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({
  onBack,
  onBeginReign,
}) => {
  const steps = [
    'Choose your ruler (King or Queen).',
    'Choose your dynasty (Maurya, Chola, Vijayanagara, Rajput).',
    'Enter the Pachisi-inspired Plus (+) shaped map at your ancestral capital.',
    'Throw the six sacred cowrie shells to determine your movement points.',
    'Use the result to move your army along connected stone highways.',
    'Land on territories and resolve destination interactions.',
    'Capture neutral small empires (Vidarbha, Kalinga, Avanti) when army >= defense.',
    'Fight enemy dynasties in deterministic combat if you land on rival ground.',
    'Defend and fortify your own territories to build garrison defense.',
    'Survive in exile if your capital falls, and rally clans to reclaim your throne!',
    'Defeat rival dynasties by capturing their capitals.',
    'Become the dominant dynasty by controlling 60% of all territories!',
  ];

  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#1C1611] via-[#120E0A] to-[#0A0705] p-6 lg:p-10 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center border-b border-[#D4AF37]/30 pb-4">
          <span className="text-[10px] uppercase font-marcellus tracking-[0.3em] text-[#D4AF37] block mb-1">
            SACRED PACHISI STRATEGY SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-gold-gradient">
            HOW TO PLAY SAMRAJYA
          </h2>
          <p className="text-xs text-[#BEB29E] font-prose mt-1">
            Complete rules of engagement for ruling, battling, and reclaiming the subcontinental realm
          </p>
        </div>

        {/* 12-Step Gameplay Workflow */}
        <div className="bg-black/60 p-5 rounded-lg border border-bronze-600/30">
          <h3 className="text-sm font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-3">
            ✦ THE 12-STEP CHRONICLE OF CONQUEST ✦
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-prose text-[#EAD9BC]">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-[#17120D] p-2 rounded border border-[#B8860B]/15">
                <span className="font-cinzel font-bold text-amber-400 min-w-[20px] text-right">
                  {idx + 1}.
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Pillars: Cowries, Armies, Combat, Reclaim */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cowrie Table */}
          <div className="bg-black/60 p-4 rounded-lg border border-bronze-600/30">
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-2">
              ✦ SIX COWRIE SHELLS RNG TABLE
            </h4>
            <div className="space-y-1 text-[11px] font-prose text-[#EAD9BC]">
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>0 Mouths Up:</span>
                <strong className="text-amber-300 font-cinzel">25 SPACES + EXTRA THROW!</strong>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>1 Mouth Up:</span>
                <strong className="text-amber-300 font-cinzel">10 SPACES + EXTRA THROW!</strong>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>2 Mouths Up:</span>
                <span className="text-stone-300 font-cinzel">2 Spaces</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>3 Mouths Up:</span>
                <span className="text-stone-300 font-cinzel">3 Spaces</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>4 Mouths Up:</span>
                <span className="text-stone-300 font-cinzel">4 Spaces</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-800">
                <span>5 Mouths Up:</span>
                <span className="text-stone-300 font-cinzel">5 Spaces</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>6 Mouths Up:</span>
                <strong className="text-amber-300 font-cinzel">6 SPACES + EXTRA THROW!</strong>
              </div>
            </div>
          </div>

          {/* Combat & Captures */}
          <div className="bg-black/60 p-4 rounded-lg border border-bronze-600/30">
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-2">
              ✦ BATTLES &amp; CAPTURES
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed mb-2">
              Combat is deterministic: <strong className="text-amber-200">Attack Power</strong> (Attacker Army + Dynasty Bonus) versus <strong className="text-red-300">Defense Power</strong> (Defending Army + Citadel Defense).
            </p>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              Landing on neutral small empires allows direct capture if your army exceeds local defenses. Own territories can be fortified for +15 Defense.
            </p>
          </div>

          {/* Exile & Reclaim */}
          <div className="md:col-span-2 bg-black/60 p-4 rounded-lg border border-bronze-600/30">
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              ✦ EXILE &amp; RECLAIM MECHANIC (SIGNATURE FEATURE)
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              If your capital is conquered, your dynasty is <strong className="text-amber-300">NOT eliminated</strong>! Your ruler survives in exile across outer stepwells. Move your surviving legions to strike back at your former capital: winning the reclaim engagement restores your throne and dynasty sovereignty!
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-[#D4AF37]/30">
          <button
            onClick={() => {
              sounds.playButtonClick();
              onBack();
            }}
            className="px-6 py-2.5 rounded bg-black/60 border border-[#B8860B]/50 hover:border-[#D4AF37] text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
          >
            ← BACK TO MENU
          </button>

          <button
            onClick={() => {
              sounds.playTempleBell();
              onBeginReign();
            }}
            className="px-8 py-2.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-royal-glow active:scale-95 transition cursor-pointer"
          >
            BEGIN REIGN →
          </button>
        </div>
      </div>
    </div>
  );
};
