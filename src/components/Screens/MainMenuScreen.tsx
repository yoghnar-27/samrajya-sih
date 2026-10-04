import React from 'react';
import { GAME_IMAGES } from '../../data/gameData';
import { sounds } from '../../utils/audio';

interface MainMenuScreenProps {
  onBeginReign: () => void;
  onOpenHowToPlay: () => void;
  onOpenSettings: () => void;
  onOpenCivs?: () => void;
  onOpenRuler?: () => void;
  onOpenHeaderSpec?: () => void;
  onOpenGallery?: () => void;
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  onBeginReign,
  onOpenHowToPlay,
  onOpenSettings,
  onOpenCivs,
  onOpenRuler,
  onOpenHeaderSpec,
  onOpenGallery,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Background 3D Environment (Horizon Fort) */}
      <img
        src={GAME_IMAGES.HORIZON_FORT}
        alt="Ancient Indian Fort and Temple Horizon"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.06]"
      />

      {/* Atmospheric Vignette and Golden Smoke Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(8,6,4,0.75)_100%)] pointer-events-none" />

      {/* Ambient Floating Dust Particles */}
      <div className="dust-particle w-1.5 h-1.5 top-1/4 left-1/5" style={{ animationDelay: '0s' }} />
      <div className="dust-particle w-2 h-2 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
      <div className="dust-particle w-1 h-1 top-1/2 left-2/3" style={{ animationDelay: '4.2s' }} />
      <div className="dust-particle w-1.5 h-1.5 top-2/3 left-1/3" style={{ animationDelay: '1.2s' }} />

      {/* Top Nav (Clean 3-Zone Contract) */}
      <header className="relative z-20 w-full px-6 lg:px-14 pt-5 pb-3 flex flex-wrap items-center justify-between border-b border-[#D4AF37]/20 backdrop-blur-[2px] gap-4">
        {/* Left: Nav Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs font-cinzel tracking-[0.18em] text-[#EAD9BC]/90">
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenGallery?.();
            }}
            className="hover:text-[#FFF4D0] transition duration-200 cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold"
          >
            <span>🏛</span>
            <span>ALL SCREENS</span>
          </button>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/20" />
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenHeaderSpec?.();
            }}
            className="hover:text-[#FFF4D0] transition duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>📜</span>
            <span>HEADER SPEC</span>
          </button>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/20" />
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenHowToPlay();
            }}
            className="hover:text-[#FFF4D0] transition duration-200 cursor-pointer"
          >
            HOW TO PLAY
          </button>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/20" />
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenSettings();
            }}
            className="hover:text-[#FFF4D0] transition duration-200 cursor-pointer"
          >
            SETTINGS
          </button>
        </nav>

        {/* Right: Sovereign Profile Insignia */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8860B] font-semibold block font-marcellus">
              VEDIC 4X REALM
            </span>
            <span className="text-xs font-cinzel text-[#F3E5AB] font-bold tracking-wider">
              MAURYA • CHOLA • VIJAYANAGARA • RAJPUT
            </span>
          </div>
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-b from-[#FFF4D0] via-[#B8860B] to-[#5E4314] shadow-royal-glow-sm">
            <div className="w-full h-full rounded-full bg-[#191410] flex items-center justify-center text-amber-300">
              ⚜
            </div>
          </div>
        </div>
      </header>

      {/* Center Hero Logo & CTAs */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full max-w-2xl px-6">
        {/* Crown Icon */}
        <div className="w-12 h-12 mx-auto mb-3 text-amber-400 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        </div>

        {/* Game Title */}
        <h1 className="text-4xl sm:text-6xl font-cinzel font-black tracking-[0.25em] text-[#FFF4D4] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-1">
          SAMRAJYA
        </h1>

        <div className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.45em] text-gold-gradient uppercase mb-7">
          RISE. RULE. RECLAIM.
        </div>

        {/* Action CTAs: BEGIN REIGN, SCREEN GALLERY, HEADER SPEC */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onBeginReign();
            }}
            className="px-7 py-3 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] hover:from-[#F3CF65] hover:to-[#BF982D] text-black font-cinzel font-black text-xs sm:text-sm tracking-[0.22em] uppercase shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>BEGIN CAMPAIGN</span>
            <span className="text-sm font-bold">→</span>
          </button>

          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenGallery?.();
            }}
            className="px-5 py-3 rounded bg-black/60 backdrop-blur-sm border border-[#D4AF37]/70 hover:border-[#FFF4D0] text-[#FFF4D0] font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase transition cursor-pointer flex items-center gap-2 shadow-royal-glow-sm"
          >
            <span>🏛</span>
            <span>ALL SCREENS</span>
          </button>

          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenHeaderSpec?.();
            }}
            className="px-5 py-3 rounded bg-black/60 backdrop-blur-sm border border-[#B8860B]/50 hover:border-[#D4AF37] text-[#C8B088] hover:text-[#FFF4D0] font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase transition cursor-pointer flex items-center gap-2"
          >
            <span>📜</span>
            <span>HEADER SPEC</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-[#BEB29E]">
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenHowToPlay();
            }}
            className="hover:text-amber-300 font-cinzel tracking-wider uppercase transition cursor-pointer"
          >
            How To Play
          </button>
          <span>•</span>
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenSettings();
            }}
            className="hover:text-amber-300 font-cinzel tracking-wider uppercase transition cursor-pointer"
          >
            Settings &amp; Audio
          </button>
        </div>

        {/* Subtitle footer */}
        <div className="mt-8 text-[11px] text-[#C8B088]/80 font-marcellus tracking-widest uppercase">
          Playable 4X Pachisi Campaign • 7 Canonical Header Archetypes • 10 Prototype Screens
        </div>
      </div>
    </div>
  );
};
