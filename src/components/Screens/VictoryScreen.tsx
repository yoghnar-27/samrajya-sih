import React from 'react';
import { CivId, PlayerState } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface VictoryScreenProps {
  winningPlayer: PlayerState;
  onPlayAgain: () => void;
  onReturnToMainMenu: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winningPlayer,
  onPlayAgain,
  onReturnToMainMenu,
}) => {
  const dynasty = DYNASTIES[winningPlayer.id];
  const rulerTitle = winningPlayer.rulerGender === 'king' ? 'SOVEREIGN KING' : 'SOVEREIGN QUEEN';

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none flex items-center justify-center p-6">
      {/* Background */}
      <img
        src={GAME_IMAGES.HORIZON_FORT}
        alt="Imperial Victory Sunset"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.08]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/90 pointer-events-none" />

      {/* Floating particles */}
      <div className="dust-particle w-2 h-2 top-1/5 left-1/4" style={{ animationDelay: '0s' }} />
      <div className="dust-particle w-2.5 h-2.5 top-1/3 right-1/4" style={{ animationDelay: '1.5s' }} />
      <div className="dust-particle w-1.5 h-1.5 bottom-1/4 left-1/2" style={{ animationDelay: '3s' }} />

      {/* Victory Pedestal Modal */}
      <div className="relative z-20 w-full max-w-3xl bg-gradient-to-b from-[#1C1611]/95 to-[#0E0B08]/98 border-2 border-[#D4AF37] rounded-xl p-8 lg:p-10 shadow-[0_0_60px_rgba(212,175,55,0.4)] text-center backdrop-blur-md">
        {/* Crown Badge */}
        <div className="w-16 h-16 mx-auto mb-3 text-amber-300 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8 12 2" />
          </svg>
        </div>

        <span className="text-[10px] font-cinzel tracking-[0.4em] text-[#D4AF37] uppercase block mb-1">
          CHAKRAVARTIN SOVEREIGN TRIUMPH
        </span>

        <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-[0.22em] text-[#FFF7DF] drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] mb-1">
          SAMRAJYA
        </h1>

        <div className="text-xs font-cinzel tracking-[0.35em] text-gold-gradient uppercase mb-6">
          THE REALM IS YOURS • ALL PROVINCES UNITED
        </div>

        {/* Dynamic Metrics specified in Section 31 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#D4AF37]/30 py-5 my-6 bg-black/40 rounded text-xs">
          <div className="p-2">
            <span className="text-[9px] uppercase tracking-wider text-[#A69680] font-marcellus block">
              Winning Dynasty
            </span>
            <span className="text-base font-cinzel font-bold text-amber-200 mt-0.5 block">
              {dynasty.name}
            </span>
            <span className="text-[10px] text-stone-400 font-serif">
              {rulerTitle} {winningPlayer.rulerName}
            </span>
          </div>

          <div className="p-2 border-l border-[#D4AF37]/20">
            <span className="text-[9px] uppercase tracking-wider text-[#A69680] font-marcellus block">
              Dominions Held
            </span>
            <span className="text-lg font-cinzel font-bold text-emerald-400 mt-0.5 block">
              {winningPlayer.territories.length} PROVINCES
            </span>
            <span className="text-[10px] text-stone-400 font-serif">Major Realm Control</span>
          </div>

          <div className="p-2 border-l border-[#D4AF37]/20">
            <span className="text-[9px] uppercase tracking-wider text-[#A69680] font-marcellus block">
              Army Remaining
            </span>
            <span className="text-lg font-cinzel font-bold text-amber-200 mt-0.5 block">
              {winningPlayer.army}k TROOPS
            </span>
            <span className="text-[10px] text-stone-400 font-serif">Standing Legions</span>
          </div>

          <div className="p-2 border-l border-[#D4AF37]/20">
            <span className="text-[9px] uppercase tracking-wider text-[#A69680] font-marcellus block">
              Battles Won
            </span>
            <span className="text-lg font-cinzel font-black text-[#FFD86B] mt-0.5 block">
              {winningPlayer.battlesWon} CONFLICTS
            </span>
            <span className="text-[10px] text-stone-400 font-serif">
              {winningPlayer.neutralCaptured} Small Empires
            </span>
          </div>
        </div>

        {/* Action Buttons as requested in Section 31 */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onPlayAgain();
            }}
            className="px-8 py-3 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel font-black text-xs tracking-[0.2em] uppercase shadow-royal-glow hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            PLAY AGAIN
          </button>

          <button
            onClick={() => {
              sounds.playButtonClick();
              onReturnToMainMenu();
            }}
            className="px-6 py-3 rounded bg-[#2A1F16] border border-[#D4AF37]/60 text-[#FFF4D0] font-cinzel text-xs tracking-wider uppercase hover:border-amber-300 transition cursor-pointer"
          >
            RETURN TO MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};
