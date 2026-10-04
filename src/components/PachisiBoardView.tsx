import React from 'react';
import { BoardNode, CivId, PlayerState } from '../types/game';
import { DYNASTIES } from '../data/pachisiBoard';
import { sounds } from '../utils/audio';

interface PachisiBoardViewProps {
  board: Record<string, BoardNode>;
  players: Record<CivId, PlayerState>;
  activePlayerId: CivId;
  validDestinations: { nodeId: string; path: string[] }[];
  currentMovingPath: string[];
  currentMovingIndex: number;
  onSelectDestination: (nodeId: string, path: string[]) => void;
  onInspectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

export const PachisiBoardView: React.FC<PachisiBoardViewProps> = ({
  board,
  players,
  activePlayerId,
  validDestinations,
  currentMovingPath,
  currentMovingIndex,
  onSelectDestination,
  onInspectNode,
  selectedNodeId,
}) => {
  const validNodeIds = new Set(validDestinations.map((d) => d.nodeId));

  // Determine current animated position of the moving army (if moving)
  const movingNodeId =
    currentMovingPath.length > 0 && currentMovingIndex < currentMovingPath.length
      ? currentMovingPath[currentMovingIndex]
      : null;

  // Build unique road segments from connectedNodes to render once
  const renderedEdges = new Set<string>();
  const roadLines: { from: BoardNode; to: BoardNode; isMovingRoute: boolean }[] = [];

  Object.values(board).forEach((fromNode) => {
    fromNode.connectedNodes.forEach((toId) => {
      const toNode = board[toId];
      if (!toNode) return;
      const edgeKey = [fromNode.id, toNode.id].sort().join('__');
      if (!renderedEdges.has(edgeKey)) {
        renderedEdges.add(edgeKey);

        // Check if this edge is part of the moving path
        let isMovingRoute = false;
        if (currentMovingPath.length >= 2) {
          for (let i = 0; i < currentMovingPath.length - 1; i++) {
            if (
              (currentMovingPath[i] === fromNode.id && currentMovingPath[i + 1] === toNode.id) ||
              (currentMovingPath[i] === toNode.id && currentMovingPath[i + 1] === fromNode.id)
            ) {
              isMovingRoute = true;
              break;
            }
          }
        }

        roadLines.push({ from: fromNode, to: toNode, isMovingRoute });
      }
    });
  });

  return (
    <div className="relative w-full h-full min-h-[520px] max-h-[720px] bg-[#0A0704] border border-[#B8860B]/30 rounded-xl overflow-hidden select-none shadow-2xl flex items-center justify-center">
      {/* Background Indian Parchisi Mandala Texture & Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1A140E_0%,#0E0A07_65%,#050403_100%)] pointer-events-none" />

      {/* Decorative cruciform guide lines representing the traditional Pachisi board arms */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-36 bg-amber-500/5 border-y border-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-36 bg-amber-500/5 border-x border-[#D4AF37]/10 pointer-events-none" />

      {/* Center Sacred Chawk Diamond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rotate-45 border-2 border-[#D4AF37]/25 bg-[#2A1D13]/40 pointer-events-none" />

      {/* SVG Highways & Road Network */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {roadLines.map((line, idx) => (
          <line
            key={idx}
            x1={line.from.gridPos.x}
            y1={line.from.gridPos.y}
            x2={line.to.gridPos.x}
            y2={line.to.gridPos.y}
            stroke={line.isMovingRoute ? '#FFD86B' : 'rgba(212, 175, 55, 0.35)'}
            strokeWidth={line.isMovingRoute ? '1.2' : '0.7'}
            strokeDasharray={line.isMovingRoute ? 'none' : '1.5, 1'}
            filter={line.isMovingRoute ? 'url(#roadGlow)' : undefined}
            className={line.isMovingRoute ? 'transition-all duration-300' : ''}
          />
        ))}
      </svg>

      {/* Territory Nodes and Palaces (Graph Representation) */}
      <div className="relative w-full h-full z-20">
        {Object.values(board).map((node) => {
          const isValidDestination = validNodeIds.has(node.id);
          const isSelected = selectedNodeId === node.id;
          const ownerDynasty = node.owner !== 'neutral' ? DYNASTIES[node.owner] : null;

          // Find players stationed at this node
          const stationedPlayers = Object.values(players).filter((p) => {
            if (movingNodeId && p.id === activePlayerId) {
              return movingNodeId === node.id;
            }
            return p.currentLocation === node.id;
          });

          return (
            <div
              key={node.id}
              style={{
                left: `${node.gridPos.x}%`,
                top: `${node.gridPos.y}%`,
              }}
              onClick={() => {
                if (isValidDestination) {
                  const match = validDestinations.find((d) => d.nodeId === node.id);
                  if (match) {
                    sounds.playMarchDrum();
                    onSelectDestination(node.id, match.path);
                    return;
                  }
                }
                sounds.playButtonClick();
                onInspectNode(node.id);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                isValidDestination ? 'z-30 scale-110' : 'z-20 hover:scale-105'
              }`}
            >
              {/* Highlight Pulse Ring for Valid Destinations */}
              {isValidDestination && (
                <div className="absolute -inset-3 rounded-full border-2 border-amber-300 animate-ping opacity-75 pointer-events-none" />
              )}

              {/* Selection Ring */}
              {isSelected && (
                <div className="absolute -inset-2 rounded-full border border-amber-200/90 shadow-royal-glow pointer-events-none" />
              )}

              {/* Node Visual Building / Palace / Fort Model */}
              <div
                style={{
                  borderColor: ownerDynasty ? ownerDynasty.color : '#8C6239',
                  backgroundColor: ownerDynasty
                    ? `${ownerDynasty.darkColor}EE`
                    : node.type === 'NEUTRAL_EMPIRE'
                    ? '#221810EE'
                    : '#150F0CEE',
                }}
                className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-lg border-2 flex items-center justify-center shadow-xl transition-transform ${
                  isValidDestination
                    ? 'ring-2 ring-amber-300 shadow-royal-glow bg-amber-950/80'
                    : ''
                }`}
              >
                {/* Visual miniature representation */}
                {node.isCapital ? (
                  /* Capital Palace / Fort */
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg">
                      {ownerDynasty ? ownerDynasty.emblem : '🏛'}
                    </span>
                    <span className="text-[7px] font-cinzel font-bold text-amber-200 uppercase -mt-0.5">
                      CAPITAL
                    </span>
                  </div>
                ) : node.type === 'NEUTRAL_EMPIRE' ? (
                  /* Neutral Small Empire */
                  <div className="flex flex-col items-center">
                    <span className="text-base text-amber-300">🏰</span>
                    <span className="text-[7px] font-marcellus text-amber-100/80 uppercase -mt-0.5">
                      EMPIRE
                    </span>
                  </div>
                ) : node.type === 'CENTRAL_HUB' ? (
                  /* Central Narmada Crossroads */
                  <div className="flex flex-col items-center">
                    <span className="text-base text-amber-400">☸</span>
                    <span className="text-[7px] font-cinzel font-bold text-amber-300 uppercase -mt-0.5">
                      CHAWK
                    </span>
                  </div>
                ) : (
                  /* Standard Strategic Fort */
                  <div className="flex flex-col items-center">
                    <span className="text-sm">🛡</span>
                    <span className="text-[7px] font-prose text-stone-300 uppercase -mt-0.5">
                      FORT
                    </span>
                  </div>
                )}

                {/* Banner Ribbon attached to top corner */}
                <div
                  style={{
                    backgroundColor: ownerDynasty ? ownerDynasty.color : '#6B5338',
                  }}
                  className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded-sm text-[8px] font-bold text-black font-cinzel shadow"
                >
                  {ownerDynasty ? ownerDynasty.id.slice(0, 3).toUpperCase() : 'NEU'}
                </div>

                {/* Defense shield badge */}
                <div className="absolute -bottom-1 -left-1 bg-black/80 px-1 py-0.2 rounded border border-bronze-600/40 text-[8px] text-amber-200 font-bold">
                  {node.defense}
                </div>
              </div>

              {/* Stationed Army Tokens */}
              {stationedPlayers.length > 0 && (
                <div className="absolute -top-6 flex items-center gap-1 z-40">
                  {stationedPlayers.map((player) => (
                    <div
                      key={player.id}
                      style={{
                        backgroundColor: player.color,
                        borderColor: '#FFFFFF',
                      }}
                      className="px-2 py-0.5 rounded-full border shadow-lg flex items-center gap-1 animate-bounce"
                      title={`${player.name} Army: ${player.army} troops`}
                    >
                      <span className="text-[10px] font-bold text-black">
                        {player.rulerGender === 'king' ? '👑' : '👸'}
                      </span>
                      <span className="text-[9px] font-black text-black font-cinzel">
                        {player.army}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Territory Name Label */}
              <div
                className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-cinzel tracking-wider whitespace-nowrap border shadow ${
                  isValidDestination
                    ? 'bg-amber-400 text-black font-black border-amber-200'
                    : isSelected
                    ? 'bg-[#2A1D13] text-amber-200 border-amber-400'
                    : 'bg-black/85 text-[#EAD9BC] border-bronze-600/40'
                }`}
              >
                {node.name}
              </div>

              {/* Destination Indicator */}
              {isValidDestination && (
                <div className="text-[8px] font-bold text-amber-300 font-marcellus mt-0.5 animate-pulse uppercase">
                  ✦ Click to March
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
