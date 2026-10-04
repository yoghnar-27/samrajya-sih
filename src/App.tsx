// ============================================================
// SAMRAJYA - Playable Human-vs-Computer Pachisi Game
// Full match loop, exact 6-cowrie ruleset, AI, and dynasty identity
// ============================================================

import React, { useState } from 'react';
import { DynastyId, MatchState, RulerChoice } from './types/pachisi';
import { DYNASTIES } from './engine/pachisiBoard';
import { initializeMatch } from './engine/pachisiRules';
import { OpeningThrow } from './components/OpeningThrow';
import { PachisiMatch } from './components/PachisiMatch';
import { PachisiRulesModal } from './components/PachisiRulesModal';
import { sounds } from './utils/audio';

type AppStep =
  | 'TITLE_SCREEN'
  | 'CHOOSE_RULER'
  | 'CHOOSE_DYNASTY'
  | 'CONFIRM_MATCHUP'
  | 'OPENING_THROW'
  | 'MATCH';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('TITLE_SCREEN');

  // Player Selections
  const [humanRuler, setHumanRuler] = useState<RulerChoice>('KING');
  const [humanDynasty, setHumanDynasty] = useState<DynastyId>('MAURYA');

  // Computer Selections (Chosen automatically)
  const [aiRuler, setAiRuler] = useState<RulerChoice>('QUEEN');
  const [aiDynasty, setAiDynasty] = useState<DynastyId>('CHOLA');

  // Match State
  const [matchState, setMatchState] = useState<MatchState | null>(null);

  // Modal toggle
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // STEP 3: PLAY Clicked -> Go to Choose Ruler
  const handleStartPlay = () => {
    sounds.playButtonClick();
    setCurrentStep('CHOOSE_RULER');
  };

  // STEP 4: Ruler Chosen -> Go to Choose Dynasty
  const handleSelectRuler = (ruler: RulerChoice) => {
    sounds.playButtonClick();
    setHumanRuler(ruler);
    setCurrentStep('CHOOSE_DYNASTY');
  };

  // STEP 5: Dynasty Chosen -> Computer automatically selects its ruler & dynasty
  const handleSelectDynasty = (dynasty: DynastyId) => {
    sounds.playButtonClick();
    setHumanDynasty(dynasty);

    // Filter out the human's dynasty so computer picks a distinct realm
    const allDynasties: DynastyId[] = ['MAURYA', 'CHOLA', 'VIJAYANAGARA', 'RAJPUT'];
    const remaining = allDynasties.filter((d) => d !== dynasty);
    const chosenAiDynasty = remaining[Math.floor(Math.random() * remaining.length)];

    // Computer chooses ruler (alternate or random)
    const chosenAiRuler: RulerChoice = Math.random() < 0.5 ? 'QUEEN' : 'KING';

    setAiDynasty(chosenAiDynasty);
    setAiRuler(chosenAiRuler);

    setCurrentStep('CONFIRM_MATCHUP');
  };

  // STEP 6: Matchup confirmed -> Proceed to Opening Throw duel
  const handleConfirmMatchup = () => {
    sounds.playTempleBell();
    setCurrentStep('OPENING_THROW');
  };

  // Opening Throw Duel complete -> Initialize Match with winner as starter
  const handleOpeningComplete = (starterIndex: 0 | 1) => {
    const initialMatch = initializeMatch(
      humanRuler,
      humanDynasty,
      aiRuler,
      aiDynasty,
      starterIndex
    );
    setMatchState(initialMatch);
    setCurrentStep('MATCH');
  };

  // Reset match to play again
  const handleRestartMatch = () => {
    // Re-determine starter with a fresh match
    const initialMatch = initializeMatch(
      humanRuler,
      humanDynasty,
      aiRuler,
      aiDynasty,
      0 // human starts on revenge
    );
    setMatchState(initialMatch);
    setCurrentStep('MATCH');
  };

  const handleReturnToMenu = () => {
    setMatchState(null);
    setCurrentStep('TITLE_SCREEN');
  };

  return (
    <div className="w-full min-h-screen bg-[#080604] text-[#EAD9BC] flex flex-col items-center justify-between p-3 sm:p-6 font-prose select-none">
      {/* Global Top Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between py-2 border-b border-[#B8860B]/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#2D1F13] to-[#0D0907] flex items-center justify-center text-amber-300 font-bold text-xs shadow">
            ⚜
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-cinzel font-black tracking-[0.2em] text-[#FFF4D0]">
              SAMRAJYA
            </h1>
            <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-marcellus block">
              Vedic Pachisi Human-vs-Computer Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRulesModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-[#B8860B]/50 hover:border-amber-400 text-xs font-cinzel text-[#C8B088] hover:text-white transition cursor-pointer flex items-center gap-1.5"
          >
            <span>📜</span>
            <span className="hidden sm:inline">Pachisi Rules</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white transition cursor-pointer text-sm"
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex-1 flex flex-col items-center justify-center py-4">
        {/* ============================================================ */}
        {/* STEP 1 & 2: TITLE SCREEN (PLAY & HOW TO PLAY)                */}
        {/* ============================================================ */}
        {currentStep === 'TITLE_SCREEN' && (
          <div className="max-w-xl w-full text-center bg-gradient-to-b from-[#1C140C] via-[#120D08] to-[#0A0704] border-2 border-amber-400/80 rounded-2xl p-8 sm:p-12 shadow-2xl my-auto">
            {/* Crown Embellishment */}
            <div className="w-12 h-12 mx-auto mb-3 text-amber-400 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
              </svg>
            </div>

            <span className="text-[10px] sm:text-xs font-marcellus tracking-[0.35em] uppercase text-amber-400 block mb-1">
              TRADITIONAL INDIAN STRATEGY GAME
            </span>

            <h1 className="text-4xl sm:text-6xl font-cinzel font-black tracking-[0.25em] text-[#FFF4D0] mb-2 drop-shadow-md">
              SAMRAJYA
            </h1>

            <p className="text-xs sm:text-sm text-[#C8B088] font-prose max-w-md mx-auto mb-8 leading-relaxed">
              Experience the authentic game of <strong>Pachisi</strong>. Roll the six sacred cowrie shells, navigate the cross-shaped board, capture opponent pieces, and race all four pieces back into the central Charkoni.
            </p>

            {/* CTAs: PLAY and HOW TO PLAY */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartPlay}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-b from-[#E5A93C] to-[#A8721A] hover:from-[#F5BD54] hover:to-[#BD8527] text-black font-cinzel font-black text-sm tracking-[0.25em] uppercase shadow-xl shadow-amber-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PLAY</span>
                <span className="text-base font-bold">→</span>
              </button>

              <button
                onClick={() => setIsRulesModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black/60 border border-[#B8860B]/60 hover:border-amber-400 text-[#C8B088] hover:text-[#FFF4D0] font-cinzel text-xs tracking-[0.2em] uppercase transition cursor-pointer"
              >
                HOW TO PLAY
              </button>
            </div>

            <div className="mt-8 text-[11px] text-[#A89279] font-marcellus uppercase tracking-wider">
              1 Human Player vs 1 Computer AI • Complete 4-Piece Race
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: CHOOSE RULER (KING OR QUEEN)                         */}
        {/* ============================================================ */}
        {currentStep === 'CHOOSE_RULER' && (
          <div className="max-w-2xl w-full text-center bg-gradient-to-b from-[#1C140C] via-[#120D08] to-[#0A0704] border-2 border-amber-400/80 rounded-2xl p-6 sm:p-10 shadow-2xl my-auto">
            <span className="text-[10px] font-marcellus tracking-[0.3em] uppercase text-amber-400 block mb-1">
              STEP 1 OF 2 · ROYAL SOVEREIGNTY
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
              CHOOSE YOUR RULER
            </h2>
            <p className="text-xs text-[#C8B088] font-prose max-w-md mx-auto mb-8">
              Select whether you shall lead your Pachisi pieces as a Sovereign King or Queen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto mb-8">
              {/* KING */}
              <button
                onClick={() => handleSelectRuler('KING')}
                className="group p-6 rounded-xl border-2 border-[#B8860B]/50 hover:border-amber-400 bg-black/50 hover:bg-gradient-to-b hover:from-[#2B1E12] hover:to-[#140F09] transition-all cursor-pointer flex flex-col items-center shadow-lg hover:scale-105 active:scale-95 text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-950/40 flex items-center justify-center text-3xl mb-3 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  👑
                </div>
                <h3 className="font-cinzel font-black text-lg text-white group-hover:text-amber-300 tracking-wider">
                  SOVEREIGN KING
                </h3>
                <span className="text-[11px] text-[#A89279] font-marcellus mt-1">
                  Commander of the Vanguard
                </span>
              </button>

              {/* QUEEN */}
              <button
                onClick={() => handleSelectRuler('QUEEN')}
                className="group p-6 rounded-xl border-2 border-[#B8860B]/50 hover:border-amber-400 bg-black/50 hover:bg-gradient-to-b hover:from-[#2B1E12] hover:to-[#140F09] transition-all cursor-pointer flex flex-col items-center shadow-lg hover:scale-105 active:scale-95 text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-950/40 flex items-center justify-center text-3xl mb-3 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  👸
                </div>
                <h3 className="font-cinzel font-black text-lg text-white group-hover:text-amber-300 tracking-wider">
                  SOVEREIGN QUEEN
                </h3>
                <span className="text-[11px] text-[#A89279] font-marcellus mt-1">
                  Master of High Statecraft
                </span>
              </button>
            </div>

            <button
              onClick={() => setCurrentStep('TITLE_SCREEN')}
              className="text-xs text-stone-400 hover:text-white font-cinzel tracking-wider uppercase cursor-pointer"
            >
              ← Back to Main Menu
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: CHOOSE DYNASTY (MAURYA, CHOLA, VIJAYANAGARA, RAJPUT) */}
        {/* ============================================================ */}
        {currentStep === 'CHOOSE_DYNASTY' && (
          <div className="max-w-4xl w-full text-center bg-gradient-to-b from-[#1C140C] via-[#120D08] to-[#0A0704] border-2 border-amber-400/80 rounded-2xl p-6 sm:p-10 shadow-2xl my-auto">
            <span className="text-[10px] font-marcellus tracking-[0.3em] uppercase text-amber-400 block mb-1">
              STEP 2 OF 2 · DYNASTIC ALLEGIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
              CHOOSE YOUR DYNASTY
            </h2>
            <p className="text-xs text-[#C8B088] font-prose max-w-lg mx-auto mb-8">
              Select your realm. The computer will automatically choose its own dynasty and ruler to challenge you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {(Object.keys(DYNASTIES) as DynastyId[]).map((dynastyId) => {
                const config = DYNASTIES[dynastyId];
                return (
                  <button
                    key={dynastyId}
                    onClick={() => handleSelectDynasty(dynastyId)}
                    style={{ borderColor: `${config.color}60` }}
                    className="p-5 rounded-xl border-2 bg-black/50 hover:bg-gradient-to-b hover:from-[#2B1E12] hover:to-[#140F09] transition-all cursor-pointer flex flex-col justify-between items-center text-center shadow-lg hover:scale-105 active:scale-95 group min-h-[180px]"
                  >
                    <div
                      style={{ backgroundColor: `${config.color}25`, borderColor: config.color }}
                      className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl mb-3 shadow"
                    >
                      {config.emblem}
                    </div>

                    <div>
                      <h4 className="font-cinzel font-black text-sm text-white group-hover:text-amber-300 tracking-wider">
                        {config.name}
                      </h4>
                      <span className="text-[10px] text-[#A89279] font-prose block mt-1">
                        Seat: {config.capital}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800 w-full text-[10px] font-cinzel font-bold text-amber-400">
                      CHOOSE →
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentStep('CHOOSE_RULER')}
              className="text-xs text-stone-400 hover:text-white font-cinzel tracking-wider uppercase cursor-pointer"
            >
              ← Back to Ruler Selection
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: CONFIRM MATCHUP (COMPUTER AUTO-SELECTED)             */}
        {/* ============================================================ */}
        {currentStep === 'CONFIRM_MATCHUP' && (
          <div className="max-w-2xl w-full text-center bg-gradient-to-b from-[#1C140C] via-[#120D08] to-[#0A0704] border-2 border-amber-400/80 rounded-2xl p-6 sm:p-10 shadow-2xl my-auto">
            <span className="text-[10px] font-marcellus tracking-[0.3em] uppercase text-amber-400 block mb-1">
              MATCH SETUP COMPLETE
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
              THE DUEL IS SET
            </h2>
            <p className="text-xs text-[#C8B088] font-prose max-w-md mx-auto mb-8">
              The computer has automatically selected its sovereign and dynasty.
            </p>

            {/* Side by side display */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
              {/* Human Player */}
              <div
                style={{ borderColor: DYNASTIES[humanDynasty].color }}
                className="p-4 rounded-xl border-2 bg-black/60 flex flex-col items-center"
              >
                <div
                  style={{ backgroundColor: DYNASTIES[humanDynasty].color }}
                  className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-xl text-black font-black mb-2 shadow"
                >
                  {humanRuler === 'KING' ? '👑' : '👸'}
                </div>
                <span className="text-[9px] uppercase font-marcellus text-amber-300 font-bold">
                  PLAYER (YOU)
                </span>
                <h4 className="font-cinzel font-bold text-sm text-white mt-0.5">
                  {DYNASTIES[humanDynasty].name}
                </h4>
                <span className="text-[10px] text-[#A89279]">
                  {humanRuler === 'KING' ? 'Sovereign King' : 'Sovereign Queen'}
                </span>
                <span className="text-[9px] text-emerald-400 font-cinzel mt-2 font-bold">
                  4 Pieces (P1..P4)
                </span>
              </div>

              {/* Computer Player */}
              <div
                style={{ borderColor: DYNASTIES[aiDynasty].color }}
                className="p-4 rounded-xl border-2 bg-black/60 flex flex-col items-center"
              >
                <div
                  style={{ backgroundColor: DYNASTIES[aiDynasty].color }}
                  className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-xl text-white font-black mb-2 shadow"
                >
                  {aiRuler === 'KING' ? '👑' : '👸'}
                </div>
                <span className="text-[9px] uppercase font-marcellus text-rose-400 font-bold">
                  COMPUTER (AI)
                </span>
                <h4 className="font-cinzel font-bold text-sm text-white mt-0.5">
                  {DYNASTIES[aiDynasty].name}
                </h4>
                <span className="text-[10px] text-[#A89279]">
                  {aiRuler === 'KING' ? 'Sovereign King' : 'Sovereign Queen'}
                </span>
                <span className="text-[9px] text-rose-400 font-cinzel mt-2 font-bold">
                  4 Pieces (C1..C4)
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmMatchup}
              className="px-10 py-3.5 rounded-xl bg-gradient-to-b from-[#E5A93C] to-[#A8721A] hover:from-[#F5BD54] hover:to-[#BD8527] text-black font-cinzel font-black text-sm tracking-[0.25em] uppercase shadow-xl shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              PROCEED TO OPENING DUEL →
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 6: OPENING COWRIE THROW DUEL                            */}
        {/* ============================================================ */}
        {currentStep === 'OPENING_THROW' && (
          <OpeningThrow
            humanRuler={humanRuler}
            humanDynasty={DYNASTIES[humanDynasty]}
            aiRuler={aiRuler}
            aiDynasty={DYNASTIES[aiDynasty]}
            onOpeningComplete={handleOpeningComplete}
          />
        )}

        {/* ============================================================ */}
        {/* STEP 7: FULL PACHISI MATCH (HUMAN VS COMPUTER)               */}
        {/* ============================================================ */}
        {currentStep === 'MATCH' && matchState && (
          <PachisiMatch
            initialState={matchState}
            onRestartMatch={handleRestartMatch}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-6xl text-center py-2 border-t border-[#B8860B]/20 text-[10px] text-[#A89279] font-marcellus uppercase tracking-widest">
        SAMRAJYA • Modern Digital Pachisi Experience • Pure 4-Piece Race Architecture
      </footer>

      {/* Rules Modal */}
      <PachisiRulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        onStartPlay={currentStep === 'TITLE_SCREEN' ? handleStartPlay : undefined}
      />
    </div>
  );
}
