// ============================================================
// SAMRAJYA - Opening Cowrie Throw Component
// Human vs Computer to determine who takes the first turn
// ============================================================

import React, { useState } from 'react';
import { CowrieThrowResult, DynastyIdentity, RulerChoice } from '../types/pachisi';
import { throwSixCowries } from '../engine/cowrieEngine';
import { sounds } from '../utils/audio';

interface OpeningThrowProps {
  humanRuler: RulerChoice;
  humanDynasty: DynastyIdentity;
  aiRuler: RulerChoice;
  aiDynasty: DynastyIdentity;
  onOpeningComplete: (starterIndex: 0 | 1) => void;
}

export const OpeningThrow: React.FC<OpeningThrowProps> = ({
  humanRuler,
  humanDynasty,
  aiRuler,
  aiDynasty,
  onOpeningComplete,
}) => {
  const [humanRoll, setHumanRoll] = useState<CowrieThrowResult | null>(null);
  const [aiRoll, setAiRoll] = useState<CowrieThrowResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  const handleThrow = () => {
    if (isRolling) return;
    setIsRolling(true);
    sounds.playCowrieRattle();

    setTimeout(() => {
      const hRoll = throwSixCowries();
      const aRoll = throwSixCowries();

      setHumanRoll(hRoll);
      setAiRoll(aRoll);
      setIsRolling(false);

      if (hRoll.moveValue > aRoll.moveValue) {
        sounds.playTempleBell();
        setWinnerMessage(`${humanDynasty.name} rolled higher (${hRoll.moveValue} vs ${aRoll.moveValue}) and moves first!`);
        setTimeout(() => onOpeningComplete(0), 1800);
      } else if (aRoll.moveValue > hRoll.moveValue) {
        sounds.playTempleBell();
        setWinnerMessage(`${aiDynasty.name} rolled higher (${aRoll.moveValue} vs ${hRoll.moveValue}) and moves first!`);
        setTimeout(() => onOpeningComplete(1), 1800);
      } else {
        // Tie! Must throw again
        sounds.playMarchDrum();
        setWinnerMessage(`Tie (${hRoll.moveValue} each)! Throwing again for precedence...`);
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#140F0A]/95 border-2 border-[#B8860B] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center my-auto">
      <span className="text-[10px] font-marcellus tracking-[0.3em] uppercase text-amber-400 mb-1">
        SACRED PRECEDENCE
      </span>
      <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
        WHO SHALL MOVE FIRST?
      </h2>
      <p className="text-xs text-[#C8B088] font-prose max-w-md mb-6 leading-relaxed">
        Both sovereigns cast the six sacred cowrie shells. The ruler whose shells yield the higher movement value claims the first march.
      </p>

      {/* Comparison Duel Columns */}
      <div className="w-full grid grid-cols-2 gap-4 mb-6">
        {/* Human Column */}
        <div
          style={{ borderColor: humanDynasty.color }}
          className="rounded-xl p-4 bg-black/60 border-2 flex flex-col items-center justify-between min-h-[160px]"
        >
          <div>
            <span className="text-[9px] uppercase tracking-wider text-amber-400 font-marcellus block">
              Player (You)
            </span>
            <h4 className="text-sm font-cinzel font-bold text-white mt-0.5">
              {humanDynasty.name}
            </h4>
            <span className="text-[10px] text-[#A89279] font-prose">
              {humanRuler === 'KING' ? 'Sovereign King' : 'Sovereign Queen'}
            </span>
          </div>

          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-cinzel font-black text-amber-300">
              {isRolling ? '…' : humanRoll ? humanRoll.moveValue : '—'}
            </span>
            {humanRoll && (
              <div className="text-[10px] text-[#C8B088] font-marcellus">
                {humanRoll.mouthsUp} mouths up
              </div>
            )}
          </div>
        </div>

        {/* AI Column */}
        <div
          style={{ borderColor: aiDynasty.color }}
          className="rounded-xl p-4 bg-black/60 border-2 flex flex-col items-center justify-between min-h-[160px]"
        >
          <div>
            <span className="text-[9px] uppercase tracking-wider text-rose-400 font-marcellus block">
              Computer
            </span>
            <h4 className="text-sm font-cinzel font-bold text-white mt-0.5">
              {aiDynasty.name}
            </h4>
            <span className="text-[10px] text-[#A89279] font-prose">
              {aiRuler === 'KING' ? 'Sovereign King' : 'Sovereign Queen'}
            </span>
          </div>

          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-cinzel font-black text-rose-300">
              {isRolling ? '…' : aiRoll ? aiRoll.moveValue : '—'}
            </span>
            {aiRoll && (
              <div className="text-[10px] text-[#C8B088] font-marcellus">
                {aiRoll.mouthsUp} mouths up
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outcome Banner */}
      {winnerMessage && (
        <div className="w-full py-2 px-3 rounded-lg bg-amber-950/60 border border-amber-400/60 text-xs font-cinzel font-bold text-amber-300 mb-5 animate-pulse">
          {winnerMessage}
        </div>
      )}

      {/* Cast Action Button */}
      <button
        onClick={handleThrow}
        disabled={isRolling}
        className="px-8 py-3.5 rounded-xl bg-gradient-to-b from-[#E5A93C] to-[#A8721A] hover:from-[#F5BD54] hover:to-[#BD8527] text-black font-cinzel font-black text-sm tracking-[0.25em] uppercase shadow-lg shadow-amber-500/30 transition-all cursor-pointer disabled:opacity-60 active:scale-95"
      >
        {isRolling ? 'CASTING SHELLS...' : humanRoll && humanRoll.moveValue === aiRoll?.moveValue ? 'RE-CAST SHELLS' : 'CAST OPENING COWRIES'}
      </button>
    </div>
  );
};
