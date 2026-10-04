// ============================================================
// SAMRAJYA - Pachisi Rules & How to Play Dialog
// Authentic, concise guide to the 4-piece traditional race
// ============================================================

import React from 'react';

interface PachisiRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPlay?: () => void;
}

export const PachisiRulesModal: React.FC<PachisiRulesModalProps> = ({
  isOpen,
  onClose,
  onStartPlay,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-2xl w-full bg-gradient-to-b from-[#1C140C] via-[#120D08] to-[#0A0704] border-2 border-amber-400 rounded-2xl p-6 sm:p-8 shadow-2xl text-left text-[#EAD9BC] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B8860B]/40 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-marcellus tracking-[0.3em] uppercase text-amber-400 block">
              Vedic Pachisi Heritage
            </span>
            <h2 className="text-xl sm:text-2xl font-cinzel font-black tracking-wider text-[#FFF4D0]">
              HOW TO PLAY PACHISI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-stone-600 hover:border-amber-400 text-stone-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition"
          >
            ✕
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs sm:text-sm font-prose text-[#BEB29E]">
          {/* Section 1: Objective */}
          <div className="bg-black/50 p-3 rounded-xl border border-stone-800">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
              <span>🏆</span>
              <span>Primary Objective</span>
            </h4>
            <p className="leading-relaxed">
              Navigate all <strong>four of your pieces</strong> from the central Charkoni, counter-clockwise around the complete 68-square cross track, and back into the central Charkoni. The first player to bring all 4 pieces home wins the match!
            </p>
          </div>

          {/* Section 2: Six Cowrie Shells */}
          <div className="bg-black/50 p-3 rounded-xl border border-stone-800">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
              <span>🐚</span>
              <span>Six Cowrie Shells &amp; Movement Table</span>
            </h4>
            <p className="mb-2 leading-relaxed">
              Every turn, six independent cowrie shells are cast. Movement is calculated by the number of shells with mouths facing upward:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-cinzel text-center">
              <div className="p-1.5 rounded bg-amber-950/60 border border-amber-500/40">
                0 Up: <strong className="text-amber-300">25 + Grace</strong>
              </div>
              <div className="p-1.5 rounded bg-amber-950/60 border border-amber-500/40">
                1 Up: <strong className="text-amber-300">10 + Grace</strong>
              </div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-700">
                2 Up: <strong>2 Spaces</strong>
              </div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-700">
                3 Up: <strong>3 Spaces</strong>
              </div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-700">
                4 Up: <strong>4 Spaces</strong>
              </div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-700">
                5 Up: <strong>5 Spaces</strong>
              </div>
              <div className="p-1.5 rounded bg-amber-950/60 border border-amber-500/40 col-span-2">
                6 Up: <strong className="text-amber-300">6 + Grace</strong>
              </div>
            </div>
            <p className="text-[11px] text-amber-200/80 mt-2 font-marcellus">
              ✦ <strong>Grace:</strong> A roll of 6, 10, or 25 awards an <em>extra throw</em> after the turn!
            </p>
          </div>

          {/* Section 3: Entering Pieces */}
          <div className="bg-black/50 p-3 rounded-xl border border-stone-800">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
              <span>🚪</span>
              <span>Entering Pieces from Home</span>
            </h4>
            <p className="leading-relaxed">
              Your first piece enters play automatically at match setup. The remaining three pieces require a <strong>Grace roll (6, 10, or 25)</strong> to enter play onto your starting square.
            </p>
          </div>

          {/* Section 4: Captures & Castles */}
          <div className="bg-black/50 p-3 rounded-xl border border-stone-800">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
              <span>⚔️</span>
              <span>Captures, Safe Castles &amp; Blockades</span>
            </h4>
            <ul className="space-y-1 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Capture:</strong> Landing on an opponent piece on an ordinary square captures it! The captured piece returns to its Home, and the capturing player receives an <strong>extra throw</strong>.
              </li>
              <li>
                <strong>Safe Castles (⚔️):</strong> Squares marked with an 'X' are safe. Pieces cannot be captured on castle squares.
              </li>
              <li>
                <strong>Blockades (🛡️):</strong> Two or more pieces of the same player on a square form a blockade. Opponent pieces cannot land on or pass through an enemy blockade.
              </li>
            </ul>
          </div>

          {/* Section 5: Exact Finish */}
          <div className="bg-black/50 p-3 rounded-xl border border-stone-800">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
              <span>🎯</span>
              <span>Exact Finish in Charkoni</span>
            </h4>
            <p className="leading-relaxed">
              After completing the full outer track, pieces turn into their home column leading into the central Charkoni. The final step into the Charkoni must be <strong>exact</strong>. If a piece is 3 spaces away, only a roll of 3 can finish it.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-[#B8860B]/30 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-stone-700 text-stone-300 hover:text-white font-cinzel text-xs tracking-wider uppercase cursor-pointer"
          >
            Close
          </button>
          {onStartPlay && (
            <button
              onClick={() => {
                onClose();
                onStartPlay();
              }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#E5A93C] to-[#A8721A] text-black font-cinzel font-black text-xs tracking-widest uppercase shadow-md cursor-pointer hover:brightness-110 active:scale-95"
            >
              Start Game →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
