import React from 'react';
import { GameSettings } from '../../types/game';
import { sounds } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetGame: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onUpdateSettings,
  onResetGame,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1C1611] to-[#0E0B08] border-2 border-amber-400 rounded-xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3 mb-5">
          <h3 className="text-lg font-cinzel font-bold text-gold-gradient">
            GAMEPLAY SETTINGS
          </h3>
          <button
            onClick={() => {
              sounds.playButtonClick();
              onClose();
            }}
            className="text-stone-400 hover:text-white text-xs font-cinzel cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 text-xs font-prose text-[#EAD9BC]">
          {/* Audio */}
          <div className="flex items-center justify-between p-3 bg-black/50 rounded border border-bronze-600/30">
            <div>
              <span className="font-bold text-white block">Temple Bells &amp; Sound FX</span>
              <span className="text-[10px] text-stone-400">Procedural audio synthesized via Web Audio</span>
            </div>
            <button
              onClick={() => {
                const next = !settings.soundEnabled;
                sounds.enabled = next;
                if (next) sounds.playButtonClick();
                onUpdateSettings({ soundEnabled: next });
              }}
              className={`px-3 py-1.5 rounded font-cinzel text-xs font-bold transition cursor-pointer ${
                settings.soundEnabled
                  ? 'bg-amber-400 text-black border border-amber-300'
                  : 'bg-stone-800 text-stone-400 border border-stone-600'
              }`}
            >
              {settings.soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Animation Speed */}
          <div className="flex items-center justify-between p-3 bg-black/50 rounded border border-bronze-600/30">
            <div>
              <span className="font-bold text-white block">Army March Speed</span>
              <span className="text-[10px] text-stone-400">Step-by-step token movement pace</span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  sounds.playButtonClick();
                  onUpdateSettings({ animationSpeed: 'normal' });
                }}
                className={`px-2.5 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  settings.animationSpeed === 'normal'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => {
                  sounds.playButtonClick();
                  onUpdateSettings({ animationSpeed: 'fast' });
                }}
                className={`px-2.5 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  settings.animationSpeed === 'fast'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                Fast
              </button>
            </div>
          </div>

          {/* AI Difficulty */}
          <div className="flex items-center justify-between p-3 bg-black/50 rounded border border-bronze-600/30">
            <div>
              <span className="font-bold text-white block">AI Strategic Logic</span>
              <span className="text-[10px] text-stone-400">Deterministic decision priority matrix</span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  sounds.playButtonClick();
                  onUpdateSettings({ aiDifficulty: 'normal' });
                }}
                className={`px-2.5 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  settings.aiDifficulty === 'normal'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => {
                  sounds.playButtonClick();
                  onUpdateSettings({ aiDifficulty: 'strategic' });
                }}
                className={`px-2.5 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  settings.aiDifficulty === 'strategic'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                Strategic
              </button>
            </div>
          </div>
        </div>

        {/* Reset Game & Close */}
        <div className="mt-6 pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center">
          <button
            onClick={() => {
              if (window.confirm('Reset this chronicle and return to main menu?')) {
                onResetGame();
                onClose();
              }
            }}
            className="text-red-400 hover:text-red-300 text-xs font-cinzel uppercase cursor-pointer"
          >
            Restart Chronicle
          </button>

          <button
            onClick={() => {
              sounds.playButtonClick();
              onClose();
            }}
            className="px-5 py-2 rounded bg-gradient-to-b from-[#8F7226] to-[#5E4314] text-amber-100 font-cinzel text-xs font-bold uppercase hover:brightness-110 cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
