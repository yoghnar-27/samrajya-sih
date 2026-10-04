import React, { useEffect } from 'react';
import { sounds } from '../../utils/audio';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Play subtle chime upon start
    const timer = setTimeout(() => {
      sounds.playTempleBell();
    }, 400);

    // Auto transition to main menu after 2.8 seconds
    const transitionTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(transitionTimer);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative w-full h-full bg-[#070503] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden p-6"
    >
      {/* Background mandala & radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating dust */}
      <div className="dust-particle w-2 h-2 top-1/3 left-1/4" style={{ animationDelay: '0s' }} />
      <div className="dust-particle w-2.5 h-2.5 top-1/2 right-1/3" style={{ animationDelay: '1.2s' }} />

      <div className="relative z-10 text-center animate-fade-in flex flex-col items-center">
        {/* Royal Crown Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 mb-4 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        </div>

        <span className="text-xs sm:text-sm font-marcellus tracking-[0.4em] text-amber-300/80 uppercase block mb-2">
          Vedic Pachisi Civilization Strategy
        </span>

        <h1 className="text-4xl sm:text-7xl font-cinzel font-black tracking-[0.25em] text-[#FFF4D4] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          SAMRAJYA
        </h1>

        <div className="text-sm sm:text-base font-cinzel font-semibold tracking-[0.45em] text-gold-gradient uppercase mt-3">
          RISE. RULE. RECLAIM.
        </div>

        {/* Loading Bar indicator */}
        <div className="mt-10 w-48 h-1 bg-stone-900 rounded-full overflow-hidden border border-bronze-600/40">
          <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300 w-full animate-[pulse_1.5s_infinite]" />
        </div>

        <span className="text-[10px] text-stone-500 font-prose mt-3 uppercase tracking-widest">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
};
