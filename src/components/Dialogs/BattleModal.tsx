import React from 'react';
import { ActiveBattle } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface BattleModalProps {
  battleData: ActiveBattle;
  territoryName: string;
  onResolve: () => void;
  onConclude: () => void;
}

export const BattleModal: React.FC<BattleModalProps> = ({
  battleData,
  territoryName,
  onResolve,
  onConclude,
}) => {
  const attacker = DYNASTIES[battleData.attackerId];
  const defender = DYNASTIES[battleData.defenderId];
  const hasResolved = !!battleData.result;
  const attackerWon = battleData.result === 'attacker_won';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#210D0D]/98 via-[#180A0A]/98 to-[#0E0606]/98 border-2 border-red-500 rounded-xl p-6 shadow-crimson-glow text-center">
        {/* Banner */}
        <div className="flex items-center justify-center space-x-2 text-xs font-marcellus uppercase tracking-[0.3em] text-red-400 mb-1">
          <span>⚔</span>
          <span>
            {battleData.isReclaimBattle
              ? '✦ SACRED RECLAIM ENGAGEMENT ✦'
              : battleData.isCapitalBattle
              ? '✦ CAPITAL SIEGE ENGAGEMENT ✦'
              : '✦ TACTICAL BATTLE ENGAGEMENT ✦'}
          </span>
          <span>⚔</span>
        </div>

        <h3 className="text-2xl font-cinzel font-black tracking-wider text-[#FFF4D0] mb-1">
          CLASH AT {territoryName.toUpperCase()}
        </h3>

        {/* Facing Factions */}
        <div className="flex items-center justify-between p-4 bg-black/60 rounded-lg border border-red-900/60 my-4">
          {/* Attacker */}
          <div className="text-left flex items-center space-x-3">
            <div
              style={{ backgroundColor: attacker.color }}
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow"
            >
              {attacker.emblem}
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-amber-300 font-marcellus block">
                Attacker
              </span>
              <div className="text-sm font-bold text-white font-cinzel">{attacker.name}</div>
              <span className="text-xs text-amber-200">
                Army: {battleData.attackerArmy} troops
              </span>
            </div>
          </div>

          <div className="px-3 py-1 bg-red-950 border border-red-600 rounded text-red-200 font-cinzel font-black text-xs">
            VS
          </div>

          {/* Defender */}
          <div className="text-right flex items-center space-x-3 flex-row-reverse">
            <div
              style={{ backgroundColor: defender.color }}
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow ml-3"
            >
              {defender.emblem}
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-red-400 font-marcellus block">
                Defender
              </span>
              <div className="text-sm font-bold text-white font-cinzel">{defender.name}</div>
              <span className="text-xs text-red-200">
                Garrison: {battleData.defenderArmy} (+{battleData.territoryDefense} Def)
              </span>
            </div>
          </div>
        </div>

        {/* Power Comparison Breakdown */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-black/40 rounded border border-bronze-600/30 text-xs mb-4">
          <div className="p-2 border-r border-bronze-600/30">
            <div className="text-[9px] font-marcellus uppercase text-amber-300">
              Total Attack Power
            </div>
            <div className="text-lg font-cinzel font-bold text-amber-200">
              {battleData.attackerPower} PWR
            </div>
            <span className="text-[9px] text-stone-400">Army + Dynasty Attack Bonus</span>
          </div>

          <div className="p-2">
            <div className="text-[9px] font-marcellus uppercase text-red-300">
              Total Defense Power
            </div>
            <div className="text-lg font-cinzel font-bold text-red-200">
              {battleData.defenderPower} PWR
            </div>
            <span className="text-[9px] text-stone-400">Garrison + Sandstone Ramparts</span>
          </div>
        </div>

        {/* Resolution State */}
        {hasResolved ? (
          <div className="p-4 rounded-lg bg-black/70 border border-amber-400/50 mb-5">
            <h4
              className={`text-lg font-cinzel font-black uppercase mb-1 ${
                attackerWon ? 'text-amber-300' : 'text-red-400'
              }`}
            >
              {attackerWon ? '✦ ATTACKER VICTORIOUS! ✦' : '✦ DEFENDER REPELLED! ✦'}
            </h4>
            <p className="text-xs text-[#EAD9BC] font-prose mb-2">
              {attackerWon
                ? `${attacker.name} forces breached the battlements and claimed ${territoryName}!`
                : `${defender.name} fortifications held firm. The attacking vanguard was repulsed!`}
            </p>
            <div className="flex justify-around text-xs text-stone-300 border-t border-stone-800 pt-2">
              <span>Attacker Casualties: -{battleData.attackerCasualties} troops</span>
              <span>Defender Casualties: -{battleData.defenderCasualties} troops</span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-stone-400 mb-5 font-cinzel">
            Calculated formula: Attack Power vs Defense Power.
          </div>
        )}

        {/* Action Button */}
        <div>
          {!hasResolved ? (
            <button
              onClick={() => {
                sounds.playMarchDrum();
                onResolve();
              }}
              className="px-8 py-3 rounded bg-gradient-to-b from-[#8B1E1E] to-[#421414] hover:brightness-110 border border-red-400 text-white font-cinzel text-xs font-black tracking-widest uppercase shadow-crimson-glow active:scale-95 transition cursor-pointer"
            >
              RESOLVE BATTLE (ENGAGE FORCES) →
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playButtonClick();
                onConclude();
              }}
              className="px-8 py-2.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-royal-glow active:scale-95 transition cursor-pointer"
            >
              CONCLUDE BATTLE &amp; CONTINUE →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
