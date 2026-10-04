import React from 'react';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface KingdomReclaimedScreenProps {
  onAscendThrone: () => void;
  onReturnToMap: () => void;
}

export const KingdomReclaimedScreen: React.FC<KingdomReclaimedScreenProps> = ({
  onAscendThrone,
  onReturnToMap,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Sunlit Majestic Fort Vista (Image 12 / Horizon Fort) */}
      <img
        src={GAME_IMAGES.HORIZON_FORT}
        alt="Sunlit reclaimed Indian kingdom"
        className="absolute inset-0 w-full h-full object-cover contrast-[1.08] filter brightness-[0.98]"
      />

      {/* Golden celebratory vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

      {/* Floating Golden Dust Particles */}
      <div className="dust-particle w-2 h-2 top-1/5 left-1/4" style={{ animationDelay: '0.5s' }} />
      <div className="dust-particle w-2.5 h-2.5 top-1/4 right-1/3" style={{ animationDelay: '2.1s' }} />
      <div className="dust-particle w-1.5 h-1.5 top-1/3 left-1/2" style={{ animationDelay: '3.8s' }} />

      {/* Top Reclaimed Header (Archetype 07 from spec) */}
      <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
        <div className="bg-gradient-to-b from-[#2E2012]/95 via-[#1E150B]/95 to-[#120C06]/95 border-2 border-[#D4AF37] rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-royal-glow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#FFF4D0] bg-gradient-to-br from-[#8F7226] to-[#24170D] flex items-center justify-center text-amber-200 text-xl shadow-royal-glow">
              ⚜
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-marcellus font-bold block">
                  DYNASTY RESTORED
                </span>
                <span className="text-[9px] bg-[#D4AF37]/20 text-[#FFF4D0] px-2 py-0.5 rounded border border-[#D4AF37]/40 font-cinzel">
                  VICTORIOUS
                </span>
              </div>
              <h3 className="text-base lg:text-xl font-cinzel font-black tracking-[0.25em] text-gold-gradient">
                KINGDOM RECLAIMED
              </h3>
              <p className="text-xs font-cinzel tracking-[0.2em] text-[#F3E5AB] mt-0.5">
                THE RULER RETURNS • SEAT OF EMPIRE RE-ESTABLISHED
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-marcellus">
                SOVEREIGNTY SCORE
              </span>
              <span className="text-base font-cinzel font-bold text-[#FFF4D0] tracking-wider">
                +1,200 PRESTIGE
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playVictoryFanfare();
                onAscendThrone();
              }}
              className="px-6 py-2.5 rounded bg-gradient-to-b from-[#8F7226] via-[#B8860B] to-[#5E4314] border border-[#FFF4D0] text-[#120B06] font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              ASCEND THE THRONE →
            </button>
          </div>
        </div>
      </div>

      {/* Central Reclaim Proclamation Box */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4 z-20 text-center">
        <div className="bg-[#16120E]/90 backdrop-blur-md border-2 border-[#D4AF37] rounded-lg p-8 shadow-royal-glow">
          <div className="w-14 h-14 mx-auto mb-3 text-amber-300 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-[10px] font-cinzel text-[#D4AF37] tracking-[0.35em] uppercase block mb-1">
            THE RETURN OF THE SOVEREIGN
          </span>
          <h2 className="text-2xl font-cinzel font-black tracking-[0.2em] text-[#FFF4D4] mb-3">
            SEAT OF EMPIRE RE-ESTABLISHED
          </h2>
          <p className="text-xs text-[#C4B69D] font-prose leading-relaxed mb-6">
            The sacred bells of the Khajuraho-inspired shikharas ring across the river valley. The rival banners have yielded, and the original golden crest is hoisted once more over the imperial citadel.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                sounds.playVictoryFanfare();
                onAscendThrone();
              }}
              className="px-8 py-3 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              PROCLAIM GRAND VICTORY →
            </button>
            <button
              onClick={onReturnToMap}
              className="px-5 py-3 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
            >
              INSPECT REALM
            </button>
          </div>
        </div>
      </div>

      {/* Stepwell bells celebration banner */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
        <div className="inline-block bg-[#120B06]/85 backdrop-blur-md px-6 py-2 rounded-lg border border-[#D4AF37]/40 shadow">
          <span className="text-xs font-cinzel text-[#FFF4D0] tracking-[0.25em] uppercase">
            All 7 Vassal Territories Proclaim Allegiance
          </span>
          <p className="text-[10px] text-[#C8B088] font-prose mt-0.5">
            Tribute routes re-opened • Armies replenished across the stepwells.
          </p>
        </div>
      </div>
    </div>
  );
};
