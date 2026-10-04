import React from 'react';
import { Territory } from '../types/game';
import { GAME_IMAGES } from '../data/gameData';
import { sounds } from '../utils/audio';

interface TacticalMapProps {
  territories: Territory[];
  selectedTerritoryId: string | null;
  onSelectTerritory: (territoryId: string) => void;
  onMarchToTerritory: (territoryId: string) => void;
  onAttackTerritory: (territoryId: string) => void;
  marchPotential: number;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({
  territories,
  selectedTerritoryId,
  onSelectTerritory,
  onMarchToTerritory,
  onAttackTerritory,
  marchPotential,
}) => {
  const selectedTerritory =
    territories.find((t) => t.id === selectedTerritoryId) || territories[0];

  const handleNodeClick = (t: Territory) => {
    sounds.playButtonClick();
    onSelectTerritory(t.id);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 3D Isometric Map Visual Background (Image 10) */}
      <img
        src={GAME_IMAGES.TACTICAL_MAP}
        alt="Elevated isometric 3D ancient Indian strategy map"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.98] contrast-[1.04]"
      />

      {/* Atmospheric lighting & vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,7,4,0.65)_100%)] pointer-events-none" />

      {/* SVG Connecting Highways & Sacred Strategic Routes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bronze-glow-map" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Ancient Stone Highways linking fortresses */}
        <path
          d="M 520 480 Q 420 540 280 560"
          fill="none"
          filter="url(#bronze-glow-map)"
          stroke="rgba(217, 166, 75, 0.45)"
          strokeDasharray="6,6"
          strokeWidth="3.5"
        />
        <path
          d="M 540 460 Q 640 400 740 370 T 960 410"
          fill="none"
          filter="url(#bronze-glow-map)"
          stroke="rgba(217, 166, 75, 0.55)"
          strokeDasharray="8,6"
          strokeWidth="3.5"
        />
        <path
          d="M 520 440 Q 380 390 240 340"
          fill="none"
          stroke="rgba(217, 166, 75, 0.4)"
          strokeDasharray="4,6"
          strokeWidth="2.5"
        />
        <path
          d="M 740 370 Q 820 280 660 220"
          fill="none"
          stroke="rgba(217, 166, 75, 0.35)"
          strokeDasharray="4,8"
          strokeWidth="2.5"
        />
        <path
          d="M 540 500 Q 750 560 980 540"
          fill="none"
          stroke="rgba(217, 166, 75, 0.45)"
          strokeDasharray="6,6"
          strokeWidth="3"
        />
      </svg>

      {/* Interactive Road Waypoints (Step 2 and Step 4 as in Image 13) */}
      <div
        className="absolute top-[52%] left-[58%] z-20 cursor-pointer pointer-events-auto group"
        onClick={() => {
          sounds.playMarchDrum();
          onMarchToTerritory('eastern_fort');
        }}
        title="Pachisi Waypoint: Step 2 · Click to advance legion"
      >
        <div className="path-waypoint w-6 h-6 rounded-full border-2 border-amber-300 bg-amber-600/40 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
          <div className="w-2 h-2 rounded-full bg-amber-200"></div>
        </div>
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-200 uppercase bg-black/85 px-1.5 py-0.2 rounded border border-amber-500/40 whitespace-nowrap shadow">
          STEP 2
        </span>
      </div>

      <div
        className="absolute top-[46%] left-[68%] z-20 cursor-pointer pointer-events-auto group"
        onClick={() => {
          sounds.playMarchDrum();
          onMarchToTerritory('eastern_fort');
        }}
        title="Pachisi Waypoint: Step 4 (Target Sector)"
      >
        <div className="path-waypoint w-6 h-6 rounded-full border-2 border-amber-300 bg-amber-600/40 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
          <div className="w-2 h-2 rounded-full bg-amber-200"></div>
        </div>
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-200 uppercase bg-black/85 px-1.5 py-0.2 rounded border border-amber-500/40 whitespace-nowrap shadow">
          STEP 4
        </span>
      </div>

      {/* Strategic Unit: 1st Gajadhyaksha War Elephants on Highway */}
      <div
        className="absolute top-[41%] left-[45%] z-20 pointer-events-auto cursor-pointer group"
        onClick={() => {
          sounds.playMarchDrum();
          onSelectTerritory('pataliputra');
        }}
        title="Imperial Vanguard: 18 War Elephants stationed at river crossing"
      >
        <div className="plinth-stone border border-amber-400/80 px-2.5 py-1 rounded shadow-2xl flex items-center space-x-1.5 transform group-hover:scale-105 transition-transform">
          <span className="text-base">🐘</span>
          <div>
            <div className="text-[8px] text-amber-300 font-bold uppercase tracking-wider">
              1st Gajadhyaksha
            </div>
            <div className="text-[10px] text-amber-100 font-semibold">18 War Elephants</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-950 animate-pulse"></span>
        </div>
      </div>

      {/* Dynamic Territory Pins */}
      {territories.map((terr) => {
        const isSelected = terr.id === selectedTerritoryId;

        // Custom coordinates on the visual map
        let posX = terr.location.x;
        let posY = terr.location.y;

        return (
          <div
            key={terr.id}
            style={{ left: `${posX}%`, top: `${posY}%` }}
            onClick={() => handleNodeClick(terr)}
            className="absolute z-20 pointer-events-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center"
          >
            {/* Halo Ring when Selected */}
            {isSelected && (
              <div className="w-32 h-16 -mb-8 rounded-[100%] border-2 border-amber-300/80 bg-amber-400/10 shadow-[0_0_24px_rgba(235,192,114,0.5)] animate-pulse pointer-events-none" />
            )}

            {/* Badge Pill */}
            <div
              className={`plinth-stone border transition-all duration-200 px-3.5 py-1.5 rounded flex items-center space-x-2 shadow-2xl backdrop-blur-sm group-hover:scale-105 ${
                isSelected
                  ? 'border-amber-300 ring-1 ring-amber-300 shadow-royal-glow bg-amber-950/60'
                  : terr.owner === 'player'
                  ? 'border-amber-400/70 hover:border-amber-300'
                  : terr.owner === 'rajput'
                  ? 'border-red-500/70 hover:border-red-400 bg-red-950/40'
                  : terr.owner === 'chola'
                  ? 'border-teal-500/70 hover:border-teal-400 bg-teal-950/40'
                  : terr.owner === 'vijayanagara'
                  ? 'border-amber-600/70 hover:border-amber-400'
                  : 'border-bronze-400/70 hover:border-amber-300'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                  terr.owner === 'player'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-300/50'
                    : terr.owner === 'rajput'
                    ? 'bg-red-900/60 text-red-200 border border-red-500/50'
                    : terr.owner === 'chola'
                    ? 'bg-teal-900/60 text-teal-200 border border-teal-500/50'
                    : 'bg-stone-800 text-stone-300 border border-stone-600'
                }`}
              >
                {terr.owner === 'player'
                  ? '🏛'
                  : terr.owner === 'rajput'
                  ? '⚔'
                  : terr.owner === 'chola'
                  ? '⛵'
                  : '❖'}
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[8px] uppercase tracking-widest font-marcellus text-amber-200/80">
                    {terr.type}
                  </span>
                  {terr.owner === 'player' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-100 whitespace-nowrap">
                  {terr.name}
                </div>
              </div>
            </div>

            {/* Garrison subtitle */}
            <div className="mt-1 text-[9px] text-amber-200/80 bg-black/80 px-2 py-0.5 rounded border border-bronze-600/40 shadow">
              Def: {terr.defense} · Gar: {terr.garrison}k
            </div>
          </div>
        );
      })}

      {/* Sector Breakdown HUD Card (Top Left) as shown in Image 13 */}
      <aside className="absolute top-20 left-8 z-20 pointer-events-auto w-80 plinth-stone rounded border border-bronze-400/50 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-bronze-500/30 pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400">❖</span>
            <h3 className="text-xs uppercase font-bold tracking-wider text-amber-200 font-cinzel">
              Sector Breakdown
            </h3>
          </div>
          <span className="text-[9px] font-marcellus px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-700/50 uppercase font-semibold">
            {selectedTerritory.owner === 'player' ? 'PROTECTED' : 'CONTESTED'}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-amber-100/90">
            <span className="text-[11px] font-marcellus text-stone-300">Territory:</span>
            <span className="font-bold text-amber-300 text-right">{selectedTerritory.name}</span>
          </div>
          <div className="flex justify-between items-center text-amber-100/90">
            <span className="text-[11px] font-marcellus text-stone-300">Fortification:</span>
            <span className="font-bold text-amber-200">
              Sandstone Lvl {Math.ceil(selectedTerritory.defense / 25)}
            </span>
          </div>
          <div className="flex justify-between items-center text-amber-100/90">
            <span className="text-[11px] font-marcellus text-stone-300">Tribute Yield:</span>
            <span className="font-bold text-emerald-400">{selectedTerritory.yieldLabel}</span>
          </div>
          <div className="flex justify-between items-center text-amber-100/90">
            <span className="text-[11px] font-marcellus text-stone-300">Garrison Guard:</span>
            <span className="font-bold text-amber-300">{selectedTerritory.garrison}k Troops</span>
          </div>
        </div>

        {/* Citadel Integrity Bar */}
        <div className="mt-3 pt-2.5 border-t border-bronze-600/30">
          <div className="flex justify-between text-[10px] text-amber-200/80 mb-1 font-marcellus">
            <span>Citadel Integrity</span>
            <span>
              {selectedTerritory.defense * 10} / {selectedTerritory.maxDefense * 10}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-bronze-600/40">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-300 transition-all duration-300"
              style={{
                width: `${(selectedTerritory.defense / selectedTerritory.maxDefense) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Action Controls for Selected Territory */}
        <div className="mt-3.5 pt-2 flex flex-col gap-2">
          {selectedTerritory.owner === 'player' ? (
            <button
              onClick={() => {
                sounds.playTempleBell();
                alert(`Fortified ${selectedTerritory.name} defenses +10.`);
              }}
              className="w-full py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 rounded text-amber-200 text-xs font-cinzel font-bold tracking-wider uppercase transition cursor-pointer"
            >
              Reinforce Citadel Defenses
            </button>
          ) : selectedTerritory.owner === 'neutral' ? (
            <button
              onClick={() => {
                sounds.playMarchDrum();
                onMarchToTerritory(selectedTerritory.id);
              }}
              className="w-full py-2 bg-gradient-to-b from-[#DFB76C] via-[#A4782B] to-[#593B0F] hover:brightness-110 border border-amber-200 rounded text-black text-xs font-cinzel font-black tracking-widest uppercase shadow transition cursor-pointer"
            >
              ✦ March to Capture Territory
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playMarchDrum();
                onAttackTerritory(selectedTerritory.id);
              }}
              className="w-full py-2 bg-gradient-to-b from-[#8B1E1E] to-[#421414] hover:brightness-110 border border-red-400 rounded text-amber-100 text-xs font-cinzel font-black tracking-widest uppercase shadow transition cursor-pointer"
            >
              ⚔ Attack Hostile Stronghold
            </button>
          )}
        </div>
      </aside>

      {/* Filter Tabs in Top Right below header */}
      <nav className="absolute top-20 right-8 z-20 pointer-events-auto flex space-x-1.5 plinth-stone p-1.5 rounded border border-bronze-500/40">
        <button className="px-2.5 py-1 text-[10px] font-marcellus tracking-wider uppercase text-amber-300 bg-amber-950/80 border border-amber-600/60 rounded cursor-pointer">
          Provinces
        </button>
        <button
          onClick={() => {
            sounds.playButtonClick();
            alert('Trade routes: Connecting Pataliputra to Kaveri Delta & Ujjayini Highway.');
          }}
          className="px-2.5 py-1 text-[10px] font-marcellus tracking-wider uppercase text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
        >
          Trade Routes
        </button>
        <button
          onClick={() => {
            sounds.playButtonClick();
            alert('Military Garrisons: 120k Total Imperial Standing Army deployed.');
          }}
          className="px-2.5 py-1 text-[10px] font-marcellus tracking-wider uppercase text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
        >
          Military Garrisons
        </button>
      </nav>
    </div>
  );
};
