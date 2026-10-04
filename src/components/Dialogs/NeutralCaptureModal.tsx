import React from 'react';
import { ActiveNeutralCapture } from '../../types/game';
import { DYNASTIES } from '../../data/pachisiBoard';
import { sounds } from '../../utils/audio';

interface NeutralCaptureModalProps {
  captureData: ActiveNeutralCapture;
  onCapture: () => void;
  onWithdraw: () => void;
}

export const NeutralCaptureModal: React.FC<NeutralCaptureModalProps> = ({
  captureData,
  onCapture,
  onWithdraw,
}) => {
  const attackerDynasty = DYNASTIES[captureData.attackerId];
  const canCapture = captureData.attackerArmy >= captureData.neutralDefense;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1611]/98 to-[#0E0B08]/98 border-2 border-amber-400 rounded-xl p-6 shadow-2xl text-center">
        {/* Crest */}
        <div className="w-14 h-14 mx-auto mb-3 text-amber-300 text-3xl flex items-center justify-center bg-black/50 border border-amber-400/50 rounded-full shadow">
          🏰
        </div>

        <span className="text-[10px] font-marcellus uppercase tracking-[0.3em] text-amber-300 block mb-1">
          NEUTRAL SMALL EMPIRE DISCOVERED
        </span>

        <h3 className="text-2xl font-cinzel font-black tracking-wider text-gold-gradient mb-2">
          {captureData.nodeName}
        </h3>

        <p className="text-xs text-[#BEB29E] font-prose leading-relaxed mb-5">
          An independent regional territory holding strategic trade roads and resources.
          Your legion has reached its gates.
        </p>

        {/* Comparison Box */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-black/60 rounded-lg border border-bronze-600/40 mb-5 text-xs">
          <div className="p-2 border-r border-bronze-600/30">
            <span className="text-[9px] uppercase tracking-wider text-amber-300 font-marcellus block">
              {attackerDynasty.name}
            </span>
            <div className="text-sm font-bold text-white mt-1">
              Army: {captureData.attackerArmy} troops
            </div>
            <span className="text-[9px] text-stone-400">Capture Cost: {captureData.captureCost} troops</span>
          </div>

          <div className="p-2">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-marcellus block">
              Neutral Bastion
            </span>
            <div className="text-sm font-bold text-amber-200 mt-1">
              Defense: {captureData.neutralDefense}
            </div>
            <span className="text-[9px] text-emerald-400">Yield: +80 Resources / Turn</span>
          </div>
        </div>

        {/* Result Prediction */}
        <div className="mb-5 text-xs font-cinzel">
          {canCapture ? (
            <span className="text-emerald-400 font-bold">
              ✓ Attacking force exceeds defense. Capture will succeed!
            </span>
          ) : (
            <span className="text-red-400 font-bold">
              ⚠ Defenses too strong. Attacking army will suffer casualties!
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onCapture();
            }}
            className="px-6 py-2.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-royal-glow active:scale-95 transition cursor-pointer"
          >
            CAPTURE TERRITORY
          </button>

          <button
            onClick={() => {
              sounds.playButtonClick();
              onWithdraw();
            }}
            className="px-5 py-2.5 rounded bg-black/60 border border-[#B8860B]/40 text-[#C8B088] font-cinzel text-xs tracking-wider uppercase hover:text-white transition cursor-pointer"
          >
            WITHDRAW
          </button>
        </div>
      </div>
    </div>
  );
};
