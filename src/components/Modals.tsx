import React from 'react';
import { LedgerData } from '../types/game';
import { CIVILIZATIONS, RULERS } from '../data/gameData';
import { sounds } from '../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToRuler?: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onProceedToRuler,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1C1611] via-[#120E0A] to-[#0D0907] border-2 border-[#D4AF37]/50 rounded-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-4 mb-6">
          <div>
            <span className="text-[10px] tracking-widest font-marcellus text-[#D4AF37] uppercase block">
              Vedic Pachisi Heritage &amp; Strategy Rules
            </span>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold-gradient">
              THE CHRONICLES OF CONQUEST
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playButtonClick();
              onClose();
            }}
            className="px-3 py-1 border border-[#D4AF37]/40 text-amber-200 font-cinzel text-xs hover:border-amber-300 transition cursor-pointer"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#16110C]/90 p-4 rounded border border-[#B8860B]/25">
            <h4 className="text-sm font-cinzel font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span>✦</span> THE SACRED COWRIES (PACHISI)
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              Six sacred cowrie shells govern fate. Cast the shells upon the antique bronze tray; the number of shells landing opening-upward determines your army march distance and tactical stratagems. Rolling all 6 grants a bonus Grace Turn!
            </p>
          </div>

          <div className="bg-[#16110C]/90 p-4 rounded border border-[#B8860B]/25">
            <h4 className="text-sm font-cinzel font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span>✦</span> THE ROYAL ARMIES &amp; VYUHAA
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              Command Gajadhyaksha war elephant corps, royal Rajput cavalry, and infantry along paved stone highways. Deploy tactical ancient battle formations (Vyuha) to turn odds against overwhelming enemy fortresses.
            </p>
          </div>

          <div className="bg-[#16110C]/90 p-4 rounded border border-[#B8860B]/25">
            <h4 className="text-sm font-cinzel font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span>✦</span> PROVINCES &amp; CITADELS
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              Explore unclaimed frontier provinces, secure sandstone bastions, and gather grain, gold, and timber. Every conquered fortress expands your sovereign sphere of authority and tribute flow.
            </p>
          </div>

          <div className="bg-[#16110C]/90 p-4 rounded border border-[#B8860B]/25">
            <h4 className="text-sm font-cinzel font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span>✦</span> SIEGES &amp; BATTLEFIELDS
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              Engage rival dynasties at fortress gates. Combine army morale, commander bonuses, and cowrie stratagems to overpower defending garrisons and claim royal standards.
            </p>
          </div>

          <div className="md:col-span-2 bg-[#16110C]/90 p-4 rounded border border-[#B8860B]/25">
            <h4 className="text-sm font-cinzel font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span>✦</span> RECLAIM (THE SOVEREIGN SURVIVAL IN EXILE)
            </h4>
            <p className="text-xs text-[#BEB29E] font-prose leading-relaxed">
              If your royal capital falls, the empire is not lost. The ruler survives in exile across the outer stepwells. Rally loyal frontier clans, roll the sacred shells in retribution, and launch an epic campaign to reclaim the ancestral throne.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-4">
          <span className="text-[11px] text-[#8F826E] font-marcellus">
            SIH 2026 PROTOTYPE SPECIFICATION • 100% HISTORICAL FIDELITY
          </span>
          <div className="flex items-center gap-3">
            {onProceedToRuler && (
              <button
                onClick={() => {
                  sounds.playTempleBell();
                  onProceedToRuler();
                }}
                className="px-6 py-2.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-widest uppercase hover:brightness-110 transition cursor-pointer"
              >
                PROCEED TO RULER SELECTION →
              </button>
            )}
            <button
              onClick={() => {
                sounds.playButtonClick();
                onClose();
              }}
              className="px-5 py-2.5 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white cursor-pointer"
            >
              RETURN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface KingdomLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: LedgerData;
}

export const KingdomLedgerModal: React.FC<KingdomLedgerModalProps> = ({
  isOpen,
  onClose,
  gameState,
}) => {
  if (!isOpen) return null;

  const ruler = RULERS[gameState.ruler] || RULERS.vikramaditya;
  const civ = CIVILIZATIONS[gameState.civilization] || CIVILIZATIONS.maurya;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1C1611] via-[#120E0A] to-[#0D0907] border-2 border-[#D4AF37]/50 rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="text-lg font-cinzel font-bold text-gold-gradient">
              DYNASTIC KINGDOM LEDGER
            </h3>
          </div>
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

        <div className="space-y-4 text-xs font-prose text-[#EAD9BC]">
          <div className="grid grid-cols-2 gap-3 bg-black/50 p-3 rounded border border-[#B8860B]/20">
            <div>
              <span className="text-[10px] font-marcellus uppercase text-amber-300 block">
                Sovereign Monarch
              </span>
              <span className="font-cinzel text-sm font-bold text-white">{ruler.name}</span>
            </div>
            <div>
              <span className="text-[10px] font-marcellus uppercase text-amber-300 block">
                Reigning Empire
              </span>
              <span className="font-cinzel text-sm font-bold text-white">{civ.name}</span>
            </div>
          </div>

          <div className="border border-[#B8860B]/30 rounded p-3 bg-black/30 space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-300">Treasury Reserve:</span>
              <span className="font-bold text-amber-300">{gameState.gold} Karsapana</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Standing Army:</span>
              <span className="font-bold text-amber-200">{gameState.armies}k Troops</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Dominions Under Crest:</span>
              <span className="font-bold text-emerald-400">{gameState.territoriesCount} Provinces</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Dynastic Prestige:</span>
              <span className="font-bold text-amber-300">+{gameState.prestige} Prestige</span>
            </div>
            <div className="flex justify-between border-t border-[#B8860B]/20 pt-2">
              <span className="text-stone-300">Chronicle Phase:</span>
              <span className="font-cinzel font-bold text-white">TURN {gameState.turn}</span>
            </div>
          </div>

          <div className="bg-[#1B140F] p-3 rounded border border-amber-500/20">
            <span className="text-[10px] font-marcellus uppercase text-amber-300 block mb-1">
              Active Imperial Mandate
            </span>
            <p className="text-xs text-amber-100/90 font-prose italic">
              "{gameState.mandate}"
            </p>
          </div>
        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gradient-to-b from-[#8F7226] to-[#5E4314] text-amber-100 font-cinzel text-xs font-bold uppercase hover:brightness-110 cursor-pointer"
          >
            DISMISS LEDGER
          </button>
        </div>
      </div>
    </div>
  );
};

interface FormationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormationsModal: React.FC<FormationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const formations = [
    {
      name: 'CHAKRAVYUHA (THE WHEEL ARRAY)',
      icon: '☸',
      bonus: '+30% Defensive Resilience against frontal charges',
      lore: 'A labyrinthine concentric spinning formation impenetrable from outside.',
    },
    {
      name: 'KRAUNCHA VYUHA (THE HERON FORMATION)',
      icon: '🦅',
      bonus: '+25% Flanking Penetration & Cavalry shock',
      lore: 'The beak and wings strike simultaneously while the heart remains guarded.',
    },
    {
      name: 'PADMA VYUHA (THE LOTUS EMBANKMENT)',
      icon: '🪷',
      bonus: '+40% Morale retention during long fortress sieges',
      lore: 'Blooms into defensive petals trapping encircling hostile garrisons.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1C1611] via-[#120E0A] to-[#0D0907] border-2 border-[#D4AF37]/50 rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡</span>
            <h3 className="text-lg font-cinzel font-bold text-gold-gradient">
              VYUHA MILITARY FORMATIONS
            </h3>
          </div>
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

        <div className="space-y-3">
          {formations.map((f, i) => (
            <div
              key={i}
              className="bg-black/50 p-3.5 rounded border border-[#B8860B]/30 hover:border-amber-400 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{f.icon}</span>
                <h4 className="text-xs font-cinzel font-bold text-amber-200 tracking-wider">
                  {f.name}
                </h4>
              </div>
              <p className="text-xs text-emerald-400 font-prose font-semibold mb-1">
                {f.bonus}
              </p>
              <p className="text-[11px] text-stone-400 font-prose italic">
                {f.lore}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gradient-to-b from-[#8F7226] to-[#5E4314] text-amber-100 font-cinzel text-xs font-bold uppercase hover:brightness-110 cursor-pointer"
          >
            CLOSE FORMATIONS
          </button>
        </div>
      </div>
    </div>
  );
};
