import React from 'react';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface KingdomFallenScreenProps {
  onContinueExile: () => void;
  onRestart: () => void;
}

export const KingdomFallenScreen: React.FC<KingdomFallenScreenProps> = ({
  onContinueExile,
  onRestart,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Muted ash-toned battlefield aftermath (Image 4) */}
      <img
        src={GAME_IMAGES.BATTLE_CINEMATIC}
        alt="Fallen kingdom in ruins"
        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-[1.15] brightness-[0.65]"
      />

      {/* Somber shroud overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95 pointer-events-none" />

      {/* Top Fallen Plinth (Exact Archetype 06 from spec) */}
      <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
        <div className="bg-gradient-to-b from-[#1C120C]/95 via-[#130C08]/95 to-[#0B0704]/95 border border-[#8F5528]/50 rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#100B07] border border-[#8F5528]/60 flex items-center justify-center text-[#B45309] text-2xl">
              👑
            </div>
            <div>
              <span className="text-[9px] font-marcellus font-bold uppercase tracking-[0.25em] text-[#B45309] block">
                CAPITAL FALLEN • THE EMPIRE OVERRUN
              </span>
              <h3 className="text-base lg:text-xl font-cinzel font-black tracking-[0.2em] text-[#EAD9BC]">
                THE KINGDOM HAS FALLEN
              </h3>
              <p className="text-xs text-[#A89279] mt-0.5 font-prose">
                Your capital has been captured. <span className="text-[#EAD9BC] font-medium tracking-wide">THE RULER SURVIVES IN EXILE.</span>
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                sounds.playTempleBell();
                onContinueExile();
              }}
              className="px-7 py-2.5 rounded bg-gradient-to-b from-[#382214] via-[#24150B] to-[#120B06] border-2 border-[#D4AF37]/80 hover:border-[#FFF4D0] text-[#FFF4D0] font-cinzel text-xs font-black tracking-[0.25em] uppercase shadow-carved hover:shadow-royal-glow transition flex items-center gap-2.5 cursor-pointer"
            >
              <span className="text-sm">⚔️</span>
              <span>RECLAIM KINGDOM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Central Lore Proclamation */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4 z-20 text-center">
        <div className="bg-black/85 backdrop-blur-md border border-[#8F5528]/40 p-8 rounded-lg shadow-2xl">
          <div className="w-10 h-10 mx-auto mb-3 text-amber-500/70 text-2xl">
            🕯
          </div>
          <span className="text-[10px] font-cinzel text-[#D4AF37] tracking-[0.35em] uppercase block mb-2">
            A SACRED OATH IN THE WILDERNESS
          </span>
          <p className="text-sm text-[#C9BAA5] font-prose italic leading-relaxed mb-6">
            "Though the sandstone walls crumble and enemy banners fly from the palace terraces, the sacred lineage remains unbroken. The sovereign survives beyond the stepwells. With the six sacred cowrie shells in hand, the ancestral vow shall be fulfilled."
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                sounds.playMarchDrum();
                onContinueExile();
              }}
              className="px-8 py-3 rounded bg-gradient-to-b from-[#AA8524] to-[#684F12] hover:brightness-110 border border-[#D4AF37] text-black font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow transition cursor-pointer"
            >
              RALLY CLANS &amp; RECLAIM THRONE →
            </button>
            <button
              onClick={onRestart}
              className="px-5 py-3 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
            >
              ABANDON CHRONICLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
