// ============================================================
// SAMRAJYA - Piece Selection & Status Control Bar
// Clearly marks which pieces can legally move & triggers moves
// ============================================================

import React from 'react';
import { LegalMove, MatchState, PieceId } from '../types/pachisi';
import { ALL_SQUARES_MAP } from '../engine/pachisiBoard';

interface PieceSelectionBarProps {
  matchState: MatchState;
  onSelectMove: (move: LegalMove) => void;
}

export const PieceSelectionBar: React.FC<PieceSelectionBarProps> = ({
  matchState,
  onSelectMove,
}) => {
  const isHumanTurn = matchState.activePlayerIndex === 0;
  const isAwaitingMove = matchState.phase === 'AWAITING_MOVE_SELECTION';
  const human = matchState.player0;
  const ai = matchState.player1;

  // Map legal moves by pieceId
  const legalMoveMap = new Map<PieceId, LegalMove>();
  if (isHumanTurn && isAwaitingMove) {
    matchState.legalMoves.forEach((m) => legalMoveMap.set(m.pieceId, m));
  }

  return (
    <div className="w-full bg-[#140F0A]/95 border-2 border-[#B8860B]/60 rounded-xl p-3 sm:p-4 shadow-2xl flex flex-col gap-3">
      {/* Top Banner: Status & Instruction */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B8860B]/30 pb-2">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: human.color }}
            className="w-4 h-4 rounded-full border border-white shadow-sm"
          />
          <span className="font-cinzel text-xs sm:text-sm font-bold text-[#FFF4D0] uppercase tracking-wider">
            {human.name} (Your Pieces)
          </span>
        </div>

        {isHumanTurn && isAwaitingMove ? (
          <div className="text-xs font-cinzel text-amber-300 animate-pulse font-bold">
            ✦ SELECT A LEGAL PIECE TO MOVE {matchState.currentRoll?.moveValue} SPACES
          </div>
        ) : (
          <div className="text-xs text-[#A89279] font-marcellus">
            {isHumanTurn ? 'Throw cowries to determine movement' : 'Opponent is strategizing...'}
          </div>
        )}
      </div>

      {/* Human Pieces Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {human.pieces.map((piece) => {
          const legalMove = legalMoveMap.get(piece.id);
          const isLegal = Boolean(legalMove);

          // Get human-readable location
          let locationLabel = 'In Charkoni (Home)';
          if (piece.state === 'ACTIVE') {
            const sq = ALL_SQUARES_MAP.get(piece.currentSquareId);
            locationLabel = sq ? sq.name : `Space #${piece.pathIndex}`;
          } else if (piece.state === 'FINISHED') {
            locationLabel = '🏆 FINISHED in Charkoni';
          }

          return (
            <button
              key={piece.id}
              onClick={() => {
                if (isLegal && legalMove) {
                  onSelectMove(legalMove);
                }
              }}
              disabled={!isLegal}
              className={`rounded-lg p-2.5 sm:p-3 text-left border transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                isLegal
                  ? 'bg-gradient-to-b from-[#2E2010] to-[#1A1208] border-amber-400 shadow-[0_0_15px_rgba(229,169,60,0.35)] cursor-pointer hover:border-[#FFF4D0] hover:scale-[1.03] active:scale-95'
                  : 'bg-black/50 border-stone-800 text-stone-500 cursor-not-allowed opacity-60'
              }`}
            >
              {/* Header: Piece ID & Legal Status Badge */}
              <div className="flex items-center justify-between w-full">
                <span className="font-cinzel text-sm sm:text-base font-black text-amber-300">
                  {piece.id}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-cinzel uppercase tracking-wider font-bold ${
                    isLegal
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                      : piece.state === 'FINISHED'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'bg-stone-800 text-stone-500'
                  }`}
                >
                  {isLegal ? 'AVAILABLE' : piece.state === 'FINISHED' ? 'FINISHED' : 'UNAVAILABLE'}
                </span>
              </div>

              {/* State and Location */}
              <div className="mt-1">
                <div className="text-[10px] text-[#A89279] uppercase font-marcellus leading-tight">
                  Status: <strong className="text-white">{piece.state}</strong>
                </div>
                <div className="text-[10px] text-[#EAD9BC]/80 font-prose truncate leading-tight mt-0.5">
                  {locationLabel}
                </div>
              </div>

              {/* Move Action Teaser */}
              {isLegal && legalMove && (
                <div className="mt-2 pt-1 border-t border-amber-400/30 text-[10px] font-cinzel font-bold text-amber-300 flex items-center justify-between">
                  <span>{legalMove.isEnterMove ? 'ENTER BOARD' : `MOVE ${matchState.currentRoll?.moveValue}`}</span>
                  <span>→</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Opponent (AI) Status Row */}
      <div className="pt-2 border-t border-[#B8860B]/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: ai.color }}
            className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
          />
          <span className="text-[11px] font-cinzel text-[#C8B088]">
            {ai.name} (Computer):
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-cinzel">
          {ai.pieces.map((cp) => (
            <span
              key={cp.id}
              className={`px-2 py-0.5 rounded border ${
                cp.state === 'FINISHED'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                  : cp.state === 'ACTIVE'
                  ? 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}
            >
              {cp.id}: {cp.state === 'ACTIVE' ? `Step #${cp.pathIndex}` : cp.state}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
