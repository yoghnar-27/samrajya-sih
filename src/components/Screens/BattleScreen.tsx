import React, { useState } from 'react';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface BattleScreenProps {
  onResolveVictory: () => void;
  onSimulateDefeat: () => void;
  onRetreat: () => void;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  onResolveVictory,
  onSimulateDefeat,
  onRetreat,
}) => {
  const [battleLog, setBattleLog] = useState<string[]>([
    'Engaging hostile Rajput vanguard at Devagiri Gates...',
    '1st Gajadhyaksha War Elephants deployed in Vyuha crescent formation.',
  ]);
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = () => {
    setIsResolving(true);
    sounds.playMarchDrum();

    setBattleLog((prev) => [
      ...prev,
      'The war elephants crash through the sandstone timber palisades!',
      'Talwar charges break the defending garrison morale.',
      'Victory secured! Royal standard hoisted over Devagiri ramparts.',
    ]);

    setTimeout(() => {
      sounds.playVictoryFanfare();
      onResolveVictory();
    }, 1200);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Cinematic Battlefield Background (Image 4 & 5) */}
      <img
        src={GAME_IMAGES.BATTLE_CINEMATIC}
        alt="Battlefield with war elephants and fires"
        className="absolute inset-0 w-full h-full object-cover contrast-[1.1] filter brightness-95"
      />

      {/* Smoky crimson vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(60,10,10,0.5)_100%)] pointer-events-none" />

      {/* Top Combat Header Plinth */}
      <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
        <div className="bg-gradient-to-b from-[#210D0D]/95 via-[#180A0A]/95 to-[#0F0505]/95 border border-[#8C2323] rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-2xl flex items-center justify-between">
          {/* Attacking Realm */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#2A180E] flex items-center justify-center shadow-royal-glow-sm text-2xl">
              🦁
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-marcellus font-bold block">
                ATTACKING REALM
              </span>
              <h4 className="text-sm lg:text-base font-cinzel font-black tracking-[0.15em] text-[#FFF4D0]">
                MAURYA EMPIRE
              </h4>
              <span className="text-[10px] text-[#C8B088] font-prose">
                King Vikramaditya • 120k Royal Troops
              </span>
            </div>
          </div>

          {/* Engagement VS Emblem */}
          <div className="text-center px-4">
            <span className="text-[10px] font-cinzel font-black tracking-[0.4em] text-crimson-gradient block">
              ENGAGEMENT
            </span>
            <div className="flex items-center justify-center gap-3 my-0.5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8C2323]" />
              <div className="px-3 py-1 rounded bg-[#3B1212] border border-[#8C2323] text-sm font-cinzel font-bold text-[#FFA5A5] tracking-widest">
                VS
              </div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8C2323]" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8B088]/80 font-marcellus">
              CLASH AT DEVAGIRI GATES
            </span>
          </div>

          {/* Defending Realm */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#D94444] font-marcellus font-bold block">
                DEFENDING REALM
              </span>
              <h4 className="text-sm lg:text-base font-cinzel font-black tracking-[0.15em] text-[#FFF4D0]">
                RAJPUT KINGDOM
              </h4>
              <span className="text-[10px] text-[#C8B088] font-prose">
                Rana Kumbha • 95k Garrison
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[#8C2323] bg-[#210D0D] flex items-center justify-center text-red-300 text-xl shadow-crimson-glow">
              ⚔
            </div>
          </div>
        </div>
      </div>

      {/* Center Tactical Battle Log & Live Modifiers */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 z-20">
        <div className="bg-black/80 backdrop-blur-md border border-[#8C2323]/60 rounded-lg p-5 shadow-2xl">
          <div className="grid grid-cols-3 gap-4 text-center border-b border-[#8C2323]/30 pb-4 mb-4">
            <div>
              <div className="text-[9px] font-marcellus uppercase text-amber-300">
                Maurya Combat Strength
              </div>
              <div className="text-lg font-cinzel font-bold text-amber-200 mt-0.5">840 PWR</div>
              <span className="text-[9px] text-emerald-400 font-prose">+Elephants Active</span>
            </div>

            <div className="border-x border-[#8C2323]/30 px-2">
              <div className="text-[9px] font-marcellus uppercase text-stone-400">
                Terrain Modifier
              </div>
              <div className="text-sm font-cinzel font-bold text-[#EAD9BC] mt-1">
                Sandstone Gates
              </div>
              <span className="text-[9px] text-amber-300 font-prose">+15 Defense Bonus</span>
            </div>

            <div>
              <div className="text-[9px] font-marcellus uppercase text-red-300">
                Rajput Resistance
              </div>
              <div className="text-lg font-cinzel font-bold text-red-200 mt-0.5">620 PWR</div>
              <span className="text-[9px] text-amber-300 font-prose">Archer Bastion</span>
            </div>
          </div>

          {/* Combat Log */}
          <div className="space-y-1.5 min-h-[70px]">
            {battleLog.map((log, i) => (
              <p key={i} className="text-xs text-[#EAD9BC]/90 font-prose flex items-center gap-2">
                <span className="text-amber-400 text-[10px]">❖</span>
                <span>{log}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Command Plinth Actions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 pointer-events-auto">
        <button
          onClick={handleResolve}
          disabled={isResolving}
          className="px-8 py-3 rounded bg-gradient-to-b from-[#8B1E1E] via-[#5C1414] to-[#2E0B0B] border border-[#FFA5A5]/60 text-[#FFF4D0] font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-crimson-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          {isResolving ? 'RESOLVING ENGAGEMENT...' : 'RESOLVE COMBAT (COWRIE STRATAGEM) →'}
        </button>

        <button
          onClick={onSimulateDefeat}
          className="px-5 py-3 rounded bg-[#1C120C]/90 border border-[#8F5528]/60 text-[#C8B088] hover:text-white font-cinzel text-xs tracking-wider uppercase transition cursor-pointer"
          title="Experience the canonical Kingdom Fallen & Sovereign Exile storyline"
        >
          SIMULATE FALLEN STATE
        </button>

        <button
          onClick={onRetreat}
          className="px-5 py-3 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
        >
          TACTICAL RETREAT
        </button>
      </div>
    </div>
  );
};
