// ============================================================
// SAMRAJYA - Complete Human vs Computer Pachisi Match Loop
// Implements exact turn state machine, AI auto-turns & rules
// ============================================================

import React, { useEffect, useState, useRef } from 'react';
import { LegalMove, MatchState, PieceId } from '../types/pachisi';
import { throwSixCowries } from '../engine/cowrieEngine';
import { executeMove, getLegalMoves } from '../engine/pachisiRules';
import { chooseBestAiMove } from '../engine/pachisiAi';
import { PachisiBoard2D } from './PachisiBoard2D';
import { CowrieCup } from './CowrieCup';
import { PieceSelectionBar } from './PieceSelectionBar';
import { sounds } from '../utils/audio';

interface PachisiMatchProps {
  initialState: MatchState;
  onRestartMatch: () => void;
  onReturnToMenu: () => void;
}

export const PachisiMatch: React.FC<PachisiMatchProps> = ({
  initialState,
  onRestartMatch,
  onReturnToMenu,
}) => {
  const [matchState, setMatchState] = useState<MatchState>(initialState);
  const [isRolling, setIsRolling] = useState(false);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  // Guard against race conditions in timeouts
  const stateRef = useRef(matchState);
  stateRef.current = matchState;

  const isHumanTurn = matchState.activePlayerIndex === 0;
  const isAwaitingMove = matchState.phase === 'AWAITING_MOVE_SELECTION';
  const isWaitingThrow = matchState.phase === 'WAITING_FOR_THROW';
  const isGameOver = matchState.phase === 'MATCH_OVER';

  const activePlayer = matchState.activePlayerIndex === 0 ? matchState.player0 : matchState.player1;
  const humanPlayer = matchState.player0;
  const aiPlayer = matchState.player1;

  // ============================================================
  // HUMAN PLAYER: THROW COWRIES
  // ============================================================
  const handleHumanThrow = () => {
    if (!isHumanTurn || !isWaitingThrow || isRolling) return;

    setIsRolling(true);
    sounds.playCowrieRattle();

    setTimeout(() => {
      const roll = throwSixCowries();
      setIsRolling(false);

      // Calculate legal moves using the single authoritative rules engine
      const legals = getLegalMoves(stateRef.current, 0, roll);

      // Play alert sound if Grace
      if (roll.isGrace) {
        sounds.playTempleBell();
        showAlert(`✦ GRACE ROLL! ${roll.moveValue} Spaces + Extra Throw Granted!`);
      }

      if (legals.length === 0) {
        // No legal move!
        // The movement is skipped.
        // Check if grace: if grace, get another throw; else switch turn.
        showAlert(`No legal moves for roll of ${roll.moveValue}!`);

        if (roll.isGrace) {
          setTimeout(() => {
            setMatchState((prev) => ({
              ...prev,
              currentRoll: roll,
              legalMoves: [],
              phase: 'WAITING_FOR_THROW',
              matchLog: [
                `✦ ${prev.player0.name} rolled ${roll.moveValue} but has no legal moves. Grace grants re-throw.`,
                ...prev.matchLog.slice(0, 15),
              ],
            }));
          }, 1200);
        } else {
          setTimeout(() => {
            switchTurn(roll, '✦ No legal moves. Turn passes to opponent.');
          }, 1200);
        }
      } else {
        // Legal moves available -> Wait for human to select one piece!
        setMatchState((prev) => ({
          ...prev,
          currentRoll: roll,
          legalMoves: legals,
          phase: 'AWAITING_MOVE_SELECTION',
          matchLog: [
            `✦ ${prev.player0.name} rolled ${roll.moveValue}${roll.isGrace ? ' (Grace)' : ''}. Select a piece.`,
            ...prev.matchLog.slice(0, 15),
          ],
        }));
      }
    }, 600);
  };

  // ============================================================
  // HUMAN PLAYER: SELECT LEGAL PIECE TO MOVE
  // ============================================================
  const handleSelectMove = (move: LegalMove) => {
    if (!isHumanTurn || !isAwaitingMove) return;

    sounds.playMarchDrum();

    // Execute move on authoritative rules engine
    const nextState = executeMove(stateRef.current, move);

    // Check capture alert
    if (nextState.lastCaptureEvent) {
      sounds.playMarchDrum();
      showAlert(
        `⚔️ CAPTURE! Your ${nextState.lastCaptureEvent.capturerPieceId} captured ${nextState.lastCaptureEvent.capturedPieceIds.join(', ')}! Extra throw granted!`
      );
    } else if (move.willFinish) {
      sounds.playTempleBell();
      showAlert(`🏆 PIECE ${move.pieceId} FINISHED INTO CHARKONI!`);
    }

    setMatchState(nextState);

    // If game over, stop!
    if (nextState.phase === 'MATCH_OVER') {
      sounds.playVictoryFanfare();
      return;
    }

    // Check extra throw
    setTimeout(() => {
      if (nextState.hasExtraThrow) {
        // Player gets another throw!
        setMatchState((prev) => ({
          ...prev,
          phase: 'WAITING_FOR_THROW',
          currentRoll: null,
          legalMoves: [],
          matchLog: [
            `✦ Extra Throw awarded to ${prev.player0.name}!`,
            ...prev.matchLog.slice(0, 15),
          ],
        }));
      } else {
        // No extra throw -> Switch to Computer!
        switchTurn(nextState.currentRoll, `${prevName(0)} turn ended.`);
      }
    }, 1000);
  };

  // ============================================================
  // COMPUTER (AI) AUTOMATIC TURN EXECUTION
  // ============================================================
  useEffect(() => {
    // Only execute if it's the computer's turn and match is not over
    if (matchState.activePlayerIndex !== 1 || matchState.phase === 'MATCH_OVER') {
      return;
    }

    // If computer is waiting for throw, execute throw after brief human-readable delay
    if (matchState.phase === 'WAITING_FOR_THROW') {
      const throwTimer = setTimeout(() => {
        setIsRolling(true);
        sounds.playCowrieRattle();

        setTimeout(() => {
          const roll = throwSixCowries();
          setIsRolling(false);

          // Get legal moves using identical rules engine
          const legals = getLegalMoves(stateRef.current, 1, roll);

          if (legals.length === 0) {
            showAlert(`Computer rolled ${roll.moveValue} but has no legal moves!`);

            if (roll.isGrace) {
              setTimeout(() => {
                setMatchState((prev) => ({
                  ...prev,
                  currentRoll: roll,
                  legalMoves: [],
                  phase: 'WAITING_FOR_THROW',
                  matchLog: [
                    `✦ ${prev.player1.name} rolled ${roll.moveValue} (no legal moves). Grace grants re-throw.`,
                    ...prev.matchLog.slice(0, 15),
                  ],
                }));
              }, 1200);
            } else {
              setTimeout(() => {
                switchTurn(roll, '✦ Computer has no legal moves. Turn passes to Player.');
              }, 1200);
            }
          } else {
            // Legal moves available -> AI picks the best strategic move!
            setMatchState((prev) => ({
              ...prev,
              currentRoll: roll,
              legalMoves: legals,
              phase: 'AWAITING_MOVE_SELECTION',
              matchLog: [
                `✦ Computer rolled ${roll.moveValue}${roll.isGrace ? ' (Grace)' : ''}. AI choosing move...`,
                ...prev.matchLog.slice(0, 15),
              ],
            }));
          }
        }, 600);
      }, 900);

      return () => clearTimeout(throwTimer);
    }

    // If computer is in move selection phase, AI picks and executes move
    if (matchState.phase === 'AWAITING_MOVE_SELECTION') {
      const moveTimer = setTimeout(() => {
        const chosenMove = chooseBestAiMove(stateRef.current, stateRef.current.legalMoves);

        if (chosenMove) {
          sounds.playMarchDrum();
          const nextState = executeMove(stateRef.current, chosenMove);

          if (nextState.lastCaptureEvent) {
            sounds.playMarchDrum();
            showAlert(
              `⚔️ Computer captured your piece ${nextState.lastCaptureEvent.capturedPieceIds.join(', ')}! Returned to Home.`
            );
          } else if (chosenMove.willFinish) {
            showAlert(`Computer piece ${chosenMove.pieceId} finished into Charkoni!`);
          }

          setMatchState(nextState);

          if (nextState.phase === 'MATCH_OVER') {
            sounds.playVictoryFanfare();
            return;
          }

          setTimeout(() => {
            if (nextState.hasExtraThrow) {
              setMatchState((prev) => ({
                ...prev,
                phase: 'WAITING_FOR_THROW',
                currentRoll: null,
                legalMoves: [],
                matchLog: [
                  `✦ Extra throw granted to ${prev.player1.name}!`,
                  ...prev.matchLog.slice(0, 15),
                ],
              }));
            } else {
              switchTurn(nextState.currentRoll, '✦ Computer turn ended.');
            }
          }, 1100);
        }
      }, 800);

      return () => clearTimeout(moveTimer);
    }
  }, [matchState.activePlayerIndex, matchState.phase]);

  // Helper to switch turns between players
  const switchTurn = (roll: any, reason: string) => {
    setMatchState((prev) => {
      const nextIndex = prev.activePlayerIndex === 0 ? 1 : 0;
      const nextPlayerName = nextIndex === 0 ? prev.player0.name : prev.player1.name;
      const isNewTurnNumber = nextIndex === 0;

      return {
        ...prev,
        activePlayerIndex: nextIndex as 0 | 1,
        turnNumber: isNewTurnNumber ? prev.turnNumber + 1 : prev.turnNumber,
        phase: 'WAITING_FOR_THROW',
        currentRoll: null,
        legalMoves: [],
        hasExtraThrow: false,
        extraThrowReason: null,
        lastCaptureEvent: null,
        matchLog: [
          reason,
          `✦ Turn passes to ${nextPlayerName} (${nextIndex === 0 ? 'Player' : 'Computer'}).`,
          ...prev.matchLog.slice(0, 14),
        ],
      };
    });
  };

  const prevName = (idx: 0 | 1) => (idx === 0 ? matchState.player0.name : matchState.player1.name);

  const showAlert = (msg: string) => {
    setActiveAlert(msg);
    setTimeout(() => setActiveAlert(null), 3000);
  };

  // Check counts
  const p0FinishedCount = humanPlayer.pieces.filter((p) => p.state === 'FINISHED').length;
  const p1FinishedCount = aiPlayer.pieces.filter((p) => p.state === 'FINISHED').length;

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center gap-3 p-2 sm:p-4 select-none pb-12">
      {/* ============================================================ */}
      {/* 1. MATCH HEADER & TURN INDICATOR                             */}
      {/* ============================================================ */}
      <header className="w-full bg-[#140F0A]/95 border-2 border-[#B8860B] rounded-xl px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Player Identity & Score */}
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: humanPlayer.color }}
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-lg text-black font-black shadow"
          >
            {humanPlayer.ruler === 'KING' ? '👑' : '👸'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-marcellus tracking-widest uppercase text-amber-300">
                PLAYER (YOU)
              </span>
              {matchState.activePlayerIndex === 0 && (
                <span className="px-1.5 py-0.2 text-[9px] font-cinzel font-bold text-emerald-300 bg-emerald-950 border border-emerald-400 rounded animate-pulse">
                  ACTIVE TURN
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-cinzel font-bold text-white leading-tight">
              {humanPlayer.name}
            </h3>
            <span className="text-[10px] text-[#C8B088] font-prose">
              Finished: <strong className="text-amber-300 font-bold">{p0FinishedCount} / 4</strong>
            </span>
          </div>
        </div>

        {/* Center: Turn Info & Status */}
        <div className="text-center flex flex-col items-center">
          <span className="text-[9px] font-marcellus tracking-[0.25em] text-[#C8B088] uppercase">
            PACHISI MATCH
          </span>
          <div className="text-sm sm:text-base font-cinzel font-black text-amber-300">
            TURN {matchState.turnNumber}
          </div>
          <div className="text-[10px] font-cinzel font-bold mt-0.5">
            {isHumanTurn ? (
              <span className="text-amber-300">✦ YOUR TURN ✦</span>
            ) : (
              <span className="text-rose-400 animate-pulse">✦ COMPUTER'S TURN ✦</span>
            )}
          </div>
        </div>

        {/* Right: AI Identity & Score */}
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="flex items-center justify-end gap-2">
              {matchState.activePlayerIndex === 1 && (
                <span className="px-1.5 py-0.2 text-[9px] font-cinzel font-bold text-rose-300 bg-rose-950 border border-rose-500 rounded animate-pulse">
                  ACTIVE TURN
                </span>
              )}
              <span className="text-[10px] font-marcellus tracking-widest uppercase text-rose-400">
                COMPUTER (AI)
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-cinzel font-bold text-white leading-tight">
              {aiPlayer.name}
            </h3>
            <span className="text-[10px] text-[#C8B088] font-prose">
              Finished: <strong className="text-rose-400 font-bold">{p1FinishedCount} / 4</strong>
            </span>
          </div>
          <div
            style={{ backgroundColor: aiPlayer.color }}
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-lg text-white font-black shadow"
          >
            {aiPlayer.ruler === 'KING' ? '👑' : '👸'}
          </div>
        </div>
      </header>

      {/* Floating Alert / Toast */}
      {activeAlert && (
        <div className="w-full max-w-xl py-2 px-4 rounded-lg bg-gradient-to-r from-amber-950/95 via-[#2E1A0C]/98 to-amber-950/95 border-2 border-amber-400 text-amber-200 text-xs sm:text-sm font-cinzel font-bold text-center shadow-2xl animate-bounce">
          {activeAlert}
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. MAIN BOARD & CONTROLS GRID                                */}
      {/* ============================================================ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (5 cols): Cowrie Cup, Piece Selector, Chronicle Log */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* 6 Cowrie Shells Cup */}
          <CowrieCup
            lastRoll={matchState.currentRoll}
            isRolling={isRolling}
            canThrow={isHumanTurn && isWaitingThrow}
            isHumanTurn={isHumanTurn}
            onThrow={handleHumanThrow}
          />

          {/* Piece Action Selector Bar */}
          <PieceSelectionBar
            matchState={matchState}
            onSelectMove={handleSelectMove}
          />

          {/* Match Log Chronicle */}
          <div className="w-full bg-[#120D08]/90 border border-[#5E4314]/60 rounded-xl p-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#B8860B]/20 pb-1.5 mb-2">
              <span className="text-[10px] font-cinzel font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>📜</span>
                <span>Match Chronicle</span>
              </span>
              <span className="text-[9px] text-stone-500 font-marcellus">
                Live State Log
              </span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto pr-1 text-[10px] font-prose text-[#BEB29E]">
              {matchState.matchLog.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-snug ${
                    idx === 0 ? 'text-amber-200 font-semibold' : 'opacity-70'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Traditional Pachisi 2D Board */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <PachisiBoard2D
            matchState={matchState}
            onSelectMove={handleSelectMove}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. GAME OVER OVERLAY (WHEN 4 PIECES ARE FINISHED)            */}
      {/* ============================================================ */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gradient-to-b from-[#241A0E] via-[#161009] to-[#0A0704] border-3 border-amber-400 rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.5)]">
            <span className="text-4xl mb-2 block">
              {matchState.winnerPlayerIndex === 0 ? '🏆' : '💀'}
            </span>
            <span className="text-xs font-marcellus tracking-[0.3em] uppercase text-amber-400 block mb-1">
              PACHISI MATCH CONCLUDED
            </span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-widest text-[#FFF4D0] mb-2">
              {matchState.winnerPlayerIndex === 0 ? 'PLAYER WINS!' : 'COMPUTER WINS!'}
            </h2>
            <p className="text-xs text-[#C8B088] font-prose mb-6 leading-relaxed">
              {matchState.winnerPlayerIndex === 0
                ? `Glory to the ${humanPlayer.name}! All four of your pieces navigated the sacred Pachisi circuit and safely entered the Charkoni.`
                : `The ${aiPlayer.name} (Computer) brought all four pieces home first. Better fortune in the next match.`}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-cinzel bg-black/50 p-3 rounded-xl border border-stone-800 mb-6">
              <div>
                <span className="text-stone-400 block text-[10px]">TOTAL TURNS</span>
                <strong className="text-white text-base">{matchState.turnNumber}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">WINNER</span>
                <strong className="text-amber-300 text-base">
                  {matchState.winnerPlayerIndex === 0 ? humanPlayer.name : aiPlayer.name}
                </strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onRestartMatch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-b from-[#E5A93C] to-[#A8721A] hover:from-[#F5BD54] hover:to-[#BD8527] text-black font-cinzel font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95 transition"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onReturnToMenu}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black/60 border border-stone-700 text-[#C8B088] hover:text-white font-cinzel text-xs tracking-wider uppercase cursor-pointer transition"
              >
                MAIN MENU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
