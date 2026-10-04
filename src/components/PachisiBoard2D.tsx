// ============================================================
// SAMRAJYA - 2D Traditional Pachisi Cross-Board Component
// 19x19 Grid, Authentic Arms, Safe Castles, Charkoni & Pieces
// ============================================================

import React from 'react';
import {
  ALL_SQUARES_MAP,
  CHARKONI_SQUARE,
  EAST_HOME_COLUMN,
  NORTH_HOME_COLUMN,
  PERIMETER_TRACK,
  SOUTH_HOME_COLUMN,
  WEST_HOME_COLUMN,
} from '../engine/pachisiBoard';
import { LegalMove, MatchState, PachisiPiece, PieceId } from '../types/pachisi';

interface PachisiBoard2DProps {
  matchState: MatchState;
  onSelectMove: (move: LegalMove) => void;
}

export const PachisiBoard2D: React.FC<PachisiBoard2DProps> = ({
  matchState,
  onSelectMove,
}) => {
  const isHumanTurn = matchState.activePlayerIndex === 0;
  const isAwaitingMove = matchState.phase === 'AWAITING_MOVE_SELECTION';

  // Map squareId -> pieces on that square
  const squarePiecesMap = new Map<string, PachisiPiece[]>();
  const allActivePieces = [
    ...matchState.player0.pieces,
    ...matchState.player1.pieces,
  ].filter((p) => p.state === 'ACTIVE');

  allActivePieces.forEach((p) => {
    const list = squarePiecesMap.get(p.currentSquareId) || [];
    list.push(p);
    squarePiecesMap.set(p.currentSquareId, list);
  });

  // Map legal moves by pieceId and targetSquareId
  const legalMoveByPiece = new Map<PieceId, LegalMove>();
  const legalDestinationSquares = new Set<string>();

  if (isHumanTurn && isAwaitingMove) {
    matchState.legalMoves.forEach((m) => {
      legalMoveByPiece.set(m.pieceId, m);
      legalDestinationSquares.add(m.toSquareId);
    });
  }

  // Pre-calculate which grid coordinates belong to which square
  // Grid is 19 columns (0..18) x 19 rows (0..18)
  const gridMap = new Map<string, typeof PERIMETER_TRACK[0]>();

  PERIMETER_TRACK.forEach((s) => gridMap.set(`${s.gridX},${s.gridY}`, s));
  SOUTH_HOME_COLUMN.forEach((s) => gridMap.set(`${s.gridX},${s.gridY}`, s));
  NORTH_HOME_COLUMN.forEach((s) => gridMap.set(`${s.gridX},${s.gridY}`, s));
  EAST_HOME_COLUMN.forEach((s) => gridMap.set(`${s.gridX},${s.gridY}`, s));
  WEST_HOME_COLUMN.forEach((s) => gridMap.set(`${s.gridX},${s.gridY}`, s));

  // Count finished pieces in Charkoni
  const p0Finished = matchState.player0.pieces.filter((p) => p.state === 'FINISHED');
  const p1Finished = matchState.player1.pieces.filter((p) => p.state === 'FINISHED');

  // Count home pieces in reserves
  const p0Home = matchState.player0.pieces.filter((p) => p.state === 'HOME');
  const p1Home = matchState.player1.pieces.filter((p) => p.state === 'HOME');

  return (
    <div className="relative w-full aspect-square max-w-[680px] mx-auto p-2 sm:p-4 bg-[#0A0704] border-4 border-[#B8860B] rounded-2xl shadow-[0_0_35px_rgba(184,134,11,0.25)] select-none flex flex-col items-center justify-center">
      {/* Outer Pachisi Board Fabric Canvas */}
      <div className="relative w-full h-full grid grid-cols-19 grid-rows-19 gap-[1px] bg-[#1A120B] p-1 rounded-xl overflow-hidden border border-[#5E4314]">
        {/* Render 19x19 Grid Cells */}
        {Array.from({ length: 19 }).map((_, r) =>
          Array.from({ length: 19 }).map((_, c) => {
            const coordKey = `${c},${r}`;
            const isCenterArea = c >= 8 && c <= 10 && r >= 8 && r <= 10;
            const isCenterCore = c === 9 && r === 9;
            const square = gridMap.get(coordKey);

            // 1. Center Charkoni (3x3 area)
            if (isCenterArea) {
              if (isCenterCore) {
                const isCharkoniDest = legalDestinationSquares.has(CHARKONI_SQUARE.id);
                return (
                  <div
                    key={coordKey}
                    className={`col-span-3 row-span-3 z-20 flex flex-col items-center justify-center rounded-lg border-2 transition-all p-1 ${
                      isCharkoniDest
                        ? 'border-emerald-400 bg-emerald-950/80 shadow-[0_0_15px_rgba(52,211,153,0.5)] animate-pulse'
                        : 'border-[#D4AF37] bg-gradient-to-br from-[#2D1F13] via-[#1C140C] to-[#0D0907] shadow-inner'
                    }`}
                    style={{ gridColumn: '9 / span 3', gridRow: '9 / span 3' }}
                  >
                    <span className="text-[10px] font-cinzel font-bold text-amber-300 tracking-wider">
                      CHARKONI
                    </span>
                    <span className="text-[8px] text-[#A89279] font-marcellus">
                      FINAL HOME
                    </span>

                    {/* Finished pieces display inside Charkoni */}
                    <div className="flex items-center gap-1 mt-1">
                      {p0Finished.map((p) => (
                        <div
                          key={p.id}
                          style={{ backgroundColor: matchState.player0.color }}
                          className="w-4 h-4 rounded-full border border-white text-[8px] font-bold text-black flex items-center justify-center shadow"
                          title={`${matchState.player0.name} ${p.id} Finished`}
                        >
                          {p.id}
                        </div>
                      ))}
                      {p1Finished.map((p) => (
                        <div
                          key={p.id}
                          style={{ backgroundColor: matchState.player1.color }}
                          className="w-4 h-4 rounded-full border border-white text-[8px] font-bold text-white flex items-center justify-center shadow"
                          title={`${matchState.player1.name} ${p.id} Finished`}
                        >
                          {p.id}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              // Skip other 8 cells covered by col-span-3 row-span-3
              return null;
            }

            // 2. Corner Reserves / Dynastic Badges (Outside the cross arms)
            // Top-Left corner: (c < 8 && r < 8) -> AI Reserve
            if (c === 0 && r === 0) {
              return (
                <div
                  key={coordKey}
                  className="col-span-8 row-span-8 bg-[#120B0B]/90 border border-rose-950 rounded-xl p-2.5 flex flex-col justify-between"
                  style={{ gridColumn: '1 / span 8', gridRow: '1 / span 8' }}
                >
                  <div className="flex items-center justify-between border-b border-rose-900/40 pb-1">
                    <span className="text-[10px] font-cinzel font-bold text-rose-300">
                      {matchState.player1.name} (AI)
                    </span>
                    <span className="text-[9px] text-[#C8B088] font-marcellus">
                      Home Charkoni
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-auto">
                    {p1Home.map((p) => (
                      <div
                        key={p.id}
                        style={{ backgroundColor: matchState.player1.color }}
                        className="p-1.5 rounded-lg border border-white/60 text-center shadow-md flex items-center justify-center gap-1"
                      >
                        <span className="text-xs font-bold text-white font-cinzel">
                          {p.id}
                        </span>
                        <span className="text-[8px] text-white/80 font-marcellus">
                          Reserve
                        </span>
                      </div>
                    ))}
                    {p1Home.length === 0 && (
                      <span className="col-span-2 text-[9px] text-stone-500 italic text-center">
                        All pieces entered play
                      </span>
                    )}
                  </div>

                  <div className="text-[9px] text-[#C8B088] font-prose">
                    Finished: <strong className="text-amber-300">{p1Finished.length} / 4</strong>
                  </div>
                </div>
              );
            }
            if (c < 8 && r < 8) return null; // Covered by col-span-8

            // Bottom-Left corner: (c < 8 && r > 10) -> Human Player Reserve
            if (c === 0 && r === 11) {
              const canEnter = matchState.legalMoves.some((m) => m.isEnterMove);

              return (
                <div
                  key={coordKey}
                  className="col-span-8 row-span-8 bg-[#1C150A]/95 border border-amber-900/60 rounded-xl p-2.5 flex flex-col justify-between"
                  style={{ gridColumn: '1 / span 8', gridRow: '12 / span 8' }}
                >
                  <div className="flex items-center justify-between border-b border-amber-900/40 pb-1">
                    <span className="text-[10px] font-cinzel font-bold text-amber-300">
                      {matchState.player0.name} (You)
                    </span>
                    <span className="text-[9px] text-[#C8B088] font-marcellus">
                      Home Charkoni
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-auto">
                    {p0Home.map((p) => {
                      const enterMove = legalMoveByPiece.get(p.id);
                      const isEnterable = Boolean(enterMove && enterMove.isEnterMove);

                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            if (isEnterable && enterMove) onSelectMove(enterMove);
                          }}
                          disabled={!isEnterable}
                          style={{ backgroundColor: matchState.player0.color }}
                          className={`p-1.5 rounded-lg border text-center shadow-md flex items-center justify-center gap-1 transition-all ${
                            isEnterable
                              ? 'border-white ring-2 ring-emerald-400 cursor-pointer animate-pulse scale-105'
                              : 'border-black/50 opacity-80 cursor-default'
                          }`}
                        >
                          <span className="text-xs font-bold text-black font-cinzel">
                            {p.id}
                          </span>
                          <span className="text-[8px] text-black/80 font-marcellus">
                            {isEnterable ? 'ENTER!' : 'Reserve'}
                          </span>
                        </button>
                      );
                    })}
                    {p0Home.length === 0 && (
                      <span className="col-span-2 text-[9px] text-stone-500 italic text-center">
                        All pieces entered play
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-[#C8B088]">
                      Finished: <strong className="text-amber-300">{p0Finished.length} / 4</strong>
                    </span>
                    {canEnter && (
                      <span className="text-emerald-400 font-bold font-cinzel animate-pulse">
                        ✦ Click to Enter!
                      </span>
                    )}
                  </div>
                </div>
              );
            }
            if (c < 8 && r > 10) return null; // Covered by col-span-8

            // Top-Right & Bottom-Right corners: Rules & Track direction
            if (c === 11 && r === 0) {
              return (
                <div
                  key={coordKey}
                  className="col-span-8 row-span-8 bg-[#0D0A08]/90 border border-[#5E4314]/60 rounded-xl p-3 flex flex-col justify-between"
                  style={{ gridColumn: '12 / span 8', gridRow: '1 / span 8' }}
                >
                  <div className="border-b border-[#B8860B]/30 pb-1">
                    <span className="text-[10px] font-cinzel font-bold text-[#EAD9BC]">
                      PACHISI RULES
                    </span>
                  </div>
                  <div className="text-[9px] text-[#A89279] font-prose space-y-1">
                    <div>• <strong>Path:</strong> Counter-clockwise 68 squares.</div>
                    <div>• <strong>Castles (⚔️):</strong> Safe from capture.</div>
                    <div>• <strong>Blockade (🛡️):</strong> 2+ same pieces block enemies.</div>
                    <div>• <strong>Finish:</strong> Exact roll into Charkoni.</div>
                  </div>
                  <div className="text-[9px] text-amber-400/80 font-marcellus">
                    First to 4 finished wins!
                  </div>
                </div>
              );
            }
            if (c > 10 && r < 8) return null;

            if (c === 11 && r === 11) {
              return (
                <div
                  key={coordKey}
                  className="col-span-8 row-span-8 bg-[#0D0A08]/90 border border-[#5E4314]/60 rounded-xl p-3 flex flex-col justify-between"
                  style={{ gridColumn: '12 / span 8', gridRow: '12 / span 8' }}
                >
                  <div className="border-b border-[#B8860B]/30 pb-1">
                    <span className="text-[10px] font-cinzel font-bold text-[#EAD9BC]">
                      COWRIE TABLE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[8.5px] font-marcellus text-[#C8B088]">
                    <div>0 up → <strong className="text-amber-300">25*</strong></div>
                    <div>1 up → <strong className="text-amber-300">10*</strong></div>
                    <div>2 up → <strong>2</strong></div>
                    <div>3 up → <strong>3</strong></div>
                    <div>4 up → <strong>4</strong></div>
                    <div>5 up → <strong>5</strong></div>
                    <div className="col-span-2">6 up → <strong className="text-amber-300">6*</strong> (* = Grace)</div>
                  </div>
                  <div className="text-[8.5px] text-stone-400 font-prose">
                    Captures also award extra throw!
                  </div>
                </div>
              );
            }
            if (c > 10 && r > 10) return null;

            // 3. Normal Arm Track Squares
            if (!square) {
              return <div key={coordKey} className="bg-transparent" />;
            }

            const piecesOnSquare = squarePiecesMap.get(square.id) || [];
            const isDestination = legalDestinationSquares.has(square.id);
            const isHomeCol = square.columnType === 'HOME_COL';

            // Check if there is an actionable piece on this square
            const clickablePiece = piecesOnSquare.find(
              (p) => p.playerIndex === 0 && legalMoveByPiece.has(p.id)
            );
            const isClickable = Boolean(clickablePiece);

            // Check blockade
            const hasP0Blockade = piecesOnSquare.filter((p) => p.playerIndex === 0).length >= 2;
            const hasP1Blockade = piecesOnSquare.filter((p) => p.playerIndex === 1).length >= 2;

            return (
              <div
                key={coordKey}
                onClick={() => {
                  if (isClickable && clickablePiece) {
                    const move = legalMoveByPiece.get(clickablePiece.id);
                    if (move) onSelectMove(move);
                  }
                }}
                className={`relative flex items-center justify-center transition-all ${
                  isDestination
                    ? 'bg-emerald-950/80 ring-2 ring-emerald-400 shadow-md animate-pulse'
                    : isHomeCol
                    ? 'bg-[#2E2012]/90 border border-[#B8860B]/40'
                    : square.isCastle
                    ? 'bg-[#332211] border border-[#D4AF37]/60 shadow-inner'
                    : 'bg-[#22180F] border border-stone-800'
                } ${isClickable ? 'cursor-pointer ring-2 ring-amber-400' : ''}`}
                title={`${square.name}${square.isCastle ? ' (Castle Safe)' : ''}`}
              >
                {/* Castle Square Crossed Lines Mark (⚔️ / X) */}
                {square.isCastle && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <span className="text-[10px] text-[#D4AF37] font-bold">✕</span>
                  </div>
                )}

                {/* Entry Point Indicators */}
                {square.id === 'TRACK_00' && (
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" title="Player Start" />
                )}
                {square.id === 'TRACK_34' && (
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500" title="Computer Start" />
                )}

                {/* Render Pieces occupying this square */}
                {piecesOnSquare.length > 0 && (
                  <div className="relative z-10 flex items-center justify-center">
                    {piecesOnSquare.length === 1 ? (
                      // Single piece
                      <div
                        style={{
                          backgroundColor:
                            piecesOnSquare[0].playerIndex === 0
                              ? matchState.player0.color
                              : matchState.player1.color,
                        }}
                        className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full border border-white flex items-center justify-center shadow-lg transition-transform ${
                          piecesOnSquare[0].playerIndex === 0
                            ? 'text-black font-black'
                            : 'text-white font-bold'
                        } text-[8px] sm:text-[9px] font-cinzel ${
                          isClickable ? 'scale-110 ring-2 ring-amber-300 animate-bounce' : ''
                        }`}
                      >
                        {piecesOnSquare[0].id}
                      </div>
                    ) : (
                      // Multiple pieces / Blockade
                      <div className="flex -space-x-1.5 items-center">
                        {piecesOnSquare.map((p) => (
                          <div
                            key={p.id}
                            style={{
                              backgroundColor:
                                p.playerIndex === 0
                                  ? matchState.player0.color
                                  : matchState.player1.color,
                            }}
                            className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full border border-white flex items-center justify-center text-[7px] font-bold font-cinzel shadow ${
                              p.playerIndex === 0 ? 'text-black' : 'text-white'
                            }`}
                          >
                            {p.id}
                          </div>
                        ))}
                        {(hasP0Blockade || hasP1Blockade) && (
                          <span
                            className="absolute -top-1 -right-1 text-[8px]"
                            title="Blockade: cannot be passed by opponent"
                          >
                            🛡️
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
