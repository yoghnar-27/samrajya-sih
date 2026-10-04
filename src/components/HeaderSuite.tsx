import React, { useState } from 'react';
import { HeaderSpecState } from '../types/game';
import { GAME_IMAGES } from '../data/gameData';
import { sounds } from '../utils/audio';

interface HeaderSuiteProps {
  onLaunchGame: () => void;
  onJumpToState: (stateIndex: number) => void;
  onOpenGallery?: () => void;
}

export const HeaderSuite: React.FC<HeaderSuiteProps> = ({
  onLaunchGame,
  onJumpToState,
  onOpenGallery,
}) => {
  const [activeTab, setActiveTab] = useState<HeaderSpecState>('ALL');

  const states: { id: HeaderSpecState; label: string; stateNum: number }[] = [
    { id: 'ALL', label: 'ALL 7 STATES', stateNum: 0 },
    { id: '01_MAIN_MENU', label: '01 MAIN MENU', stateNum: 0 },
    { id: '02_STRATEGY_WORLD', label: '02 STRATEGY WORLD', stateNum: 4 },
    { id: '03_TERRITORY_SELECTED', label: '03 TERRITORY SELECTED', stateNum: 7 },
    { id: '04_COWRIE_THROW', label: '04 COWRIE THROW', stateNum: 5 },
    { id: '05_BATTLE_STATE', label: '05 BATTLE STATE', stateNum: 8 },
    { id: '06_KINGDOM_FALLEN', label: '06 KINGDOM FALLEN', stateNum: 10 },
    { id: '07_KINGDOM_RECLAIMED', label: '07 KINGDOM RECLAIMED', stateNum: 11 },
  ];

  const handleTabClick = (tab: HeaderSpecState) => {
    sounds.playButtonClick();
    setActiveTab(tab);
  };

  const showState = (stateId: HeaderSpecState) => {
    return activeTab === 'ALL' || activeTab === stateId;
  };

  return (
    <div className="w-full bg-[#08090D] text-[#EAD9BC] pb-24">
      {/* Top Spec Navigation Switcher Bar */}
      <div className="sticky top-0 z-50 bg-[#0E0C09]/95 backdrop-blur-md border-b border-[#B8860B]/30 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#2D1F13] to-[#0D0907] flex items-center justify-center text-[#D4AF37] font-bold text-xs shadow-royal-glow-sm">
            ⚜
          </div>
          <div>
            <span className="font-cinzel tracking-[0.22em] text-xs font-bold text-gold-gradient block">
              SAMRAJYA HEADER SYSTEM SPECIFICATION
            </span>
            <span className="text-[10px] tracking-widest text-[#B8860B]/70 uppercase font-marcellus">
              10–15% Viewport Rule • Vedic Pachisi Heritage • AAA 4X Grand Strategy
            </span>
          </div>
        </div>

        {/* Quick Mode Jumpers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onLaunchGame();
            }}
            className="px-3 py-1.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel font-black text-[10px] tracking-wider uppercase shadow-royal-glow-sm hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-1"
          >
            <span>🎮</span>
            <span>PLAY CAMPAIGN</span>
          </button>
          {onOpenGallery && (
            <button
              onClick={() => {
                sounds.playButtonClick();
                onOpenGallery();
              }}
              className="px-3 py-1.5 rounded border border-[#D4AF37]/60 text-[#F3E5AB] font-cinzel text-[10px] tracking-wider uppercase hover:border-[#FFF4D0] hover:text-white transition cursor-pointer bg-black/40 flex items-center gap-1"
            >
              <span>🏛</span>
              <span>ALL SCREENS</span>
            </button>
          )}
        </div>

        {/* State tabs */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 text-xs border-t border-[#B8860B]/20 pt-2">
          {states.map((st) => (
            <button
              key={st.id}
              onClick={() => handleTabClick(st.id)}
              className={`px-3 py-1.5 rounded border font-cinzel tracking-wider text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                activeTab === st.id
                  ? 'bg-gradient-to-b from-[#8F7226]/40 to-[#1E140C]/90 border-[#D4AF37] text-[#FFF4D0] shadow-royal-glow-sm font-bold'
                  : 'border-[#B8860B]/30 hover:border-[#D4AF37]/70 text-[#C8B088] hover:text-[#FFF4D0]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Philosophy Hero Banner */}
      <section className="max-w-[1440px] mx-auto px-6 pt-8 pb-4">
        <div className="relative rounded-xl border border-[#B8860B]/30 bg-gradient-to-r from-[#17120D] via-[#221810] to-[#121622] p-6 lg:p-8 shadow-2xl overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] tracking-widest uppercase font-cinzel bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                  Vedic Pachisi Heritage &amp; AAA 4X Grand Strategy
                </span>
                <span className="text-xs text-[#B8860B]/70 font-marcellus">
                  • 10–15% Viewport Rule Enforced
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-cinzel font-bold text-gold-gradient tracking-wider">
                SAMRAJYA — Strategic Command Interface System
              </h1>
              <p className="text-xs md:text-sm text-[#C8B088] max-w-3xl mt-1.5 leading-relaxed font-prose">
                Crafted with authentic antique Indian royal aesthetic: carved sandstone borders, antique gold accents, aged bronze plinths, and subtle Vedic manuscript motifs. Designed to integrate seamlessly over AAA 3D environments without resembling modern SaaS cards or generic gaming neon.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right border-r border-[#B8860B]/30 pr-4">
                <span className="text-[10px] uppercase tracking-widest text-[#B8860B]/70 block font-marcellus">
                  Palette Identity
                </span>
                <span className="text-xs font-cinzel text-[#F3E5AB]">
                  Bronze • Gold • Indigo • Crimson
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] border border-white/20 shadow-sm" title="Antique Gold" />
                <span className="w-5 h-5 rounded-full bg-[#B8860B] border border-white/20 shadow-sm" title="Aged Bronze" />
                <span className="w-5 h-5 rounded-full bg-[#141829] border border-[#D4AF37]/40 shadow-sm" title="Deep Royal Indigo" />
                <span className="w-5 h-5 rounded-full bg-[#6E1B1B] border border-white/20 shadow-sm" title="Muted Royal Crimson" />
                <span className="w-5 h-5 rounded-full bg-[#EAD9BC] border border-black/40 shadow-sm" title="Aged Parchment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Container for the 7 Archetypal Headers */}
      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-16">
        {/* ========================================================================= */}
        {/* HEADER 01: MAIN MENU */}
        {/* ========================================================================= */}
        {showState('01_MAIN_MENU') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  01
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Main Menu Header &amp; Cinematic Hero
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Full-bleed 3D Indian temple fort vista with integrated atmospheric royal navigation.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onJumpToState(0)}
                  className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
                >
                  Play In Context →
                </button>
              </div>
            </div>

            {/* Simulated 16:9 Viewport Container */}
            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black">
              <img
                src={GAME_IMAGES.HORIZON_FORT}
                alt="Ancient Indian Fort and Temple Horizon"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/75 pointer-events-none" />

              {/* The Header (Top 12-15%) */}
              <div className="relative z-20 w-full px-8 lg:px-14 pt-6 pb-4 flex items-center justify-between border-b border-[#D4AF37]/20 backdrop-blur-[2px]">
                {/* Brand */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#2D1F13] to-[#0D0907] flex items-center justify-center shadow-royal-glow p-2">
                    <span className="text-amber-300 font-bold text-lg">👑</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h1 className="text-2xl lg:text-3xl font-cinzel font-black tracking-[0.22em] text-gold-gradient">
                        SAMRAJYA
                      </h1>
                      <span className="text-[9px] font-bold tracking-widest text-[#F3E5AB]/60 uppercase px-1.5 py-0.5 border border-[#D4AF37]/30 rounded">
                        III
                      </span>
                    </div>
                    <p className="text-[10px] font-cinzel tracking-[0.4em] text-[#C8B088] uppercase mt-0.5">
                      Rise. Rule. Reclaim.
                    </p>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-cinzel tracking-[0.2em] text-[#EAD9BC]/90">
                  <span className="hover:text-[#FFF4D0] cursor-pointer">HOW TO PLAY</span>
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/20" />
                  <span className="hover:text-[#FFF4D0] cursor-pointer">CIVILIZATIONS</span>
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/20" />
                  <span className="hover:text-[#FFF4D0] cursor-pointer">ROYALTY</span>
                </nav>

                {/* Sovereign Status */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8860B] font-semibold block">
                      ROYAL STATUS
                    </span>
                    <span className="text-xs font-cinzel text-[#F3E5AB] font-bold tracking-wider">
                      KING / QUEEN
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-b from-[#FFF4D0] via-[#B8860B] to-[#5E4314] shadow-royal-glow-sm">
                    <div className="w-full h-full rounded-full bg-[#191410] flex items-center justify-center text-amber-300">
                      ⚜
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom In-Scene Title Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
                <span className="text-xs uppercase tracking-[0.4em] text-[#F3E5AB]/90 font-cinzel block mb-2">
                  A Grand Civilization Reclaiming Tale
                </span>
                <p className="text-xs text-[#EAD9BC]/70 max-w-lg mx-auto font-prose">
                  Command armies through ancient kingdoms, roll the six sacred cowrie shells, and rebuild your fallen dynasty across the 3D subcontinental realm.
                </p>
                <div className="mt-4 flex justify-center gap-4 pointer-events-auto">
                  <button
                    onClick={onLaunchGame}
                    className="px-6 py-2.5 rounded bg-gradient-to-b from-[#2B1E14] to-[#120D08] border border-[#D4AF37] hover:border-[#FFF4D0] text-[#FFF4D0] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:shadow-royal-glow transition cursor-pointer"
                  >
                    BEGIN CONQUEST
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 02: IN-GAME STRATEGY HEADER (Tactical 3D World Play) */}
        {/* ========================================================================= */}
        {showState('02_STRATEGY_WORLD') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  02
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    In-Game Strategy Header (3D World Play)
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Dominant 3D tactical map with thin 12% royal strategic command plinth.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(4)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black">
              <img
                src={GAME_IMAGES.TACTICAL_MAP}
                alt="Tactical isometric 3D world"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
              />
              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* The Header (Exact 10-15% screen occupation) */}
              <div className="relative z-20 w-full px-6 lg:px-10 pt-4">
                <div className="carved-plinth rounded-lg px-6 py-3 flex items-center justify-between backdrop-blur-md">
                  {/* Left: Empire & Ruler */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#1E140C] border border-[#D4AF37]/60 flex items-center justify-center shadow-inner text-amber-300 font-bold">
                      🦁
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-cinzel font-black tracking-[0.2em] text-[#FFF4D0] uppercase">
                          MAURYA EMPIRE
                        </span>
                        <span className="text-[9px] bg-[#6E1B1B]/80 text-[#F3E5AB] px-1.5 py-0.2 rounded border border-[#D4AF37]/30">
                          IMPERIAL
                        </span>
                      </div>
                      <p className="text-[10px] text-[#C8B088] tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                        <span>👑</span> KING VIKRAMADITYA
                      </p>
                    </div>
                  </div>

                  {/* Center: Turn 04 */}
                  <div className="text-center px-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#B8860B] font-semibold block font-marcellus">
                      CHRONICLE PHASE
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-0.5">
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                      <span className="text-base font-cinzel font-bold text-gold-gradient tracking-[0.2em]">
                        TURN 04
                      </span>
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                    </div>
                  </div>

                  {/* Right: Gold, Army, Dominions */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🪙</span>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-medium">
                          GOLD
                        </span>
                        <span className="text-sm font-bold text-[#FFF4D0]">450</span>
                      </div>
                    </div>
                    <div className="h-6 w-px bg-[#B8860B]/30" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⚔</span>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-medium">
                          ARMY
                        </span>
                        <span className="text-sm font-bold text-[#FFF4D0]">120k</span>
                      </div>
                    </div>
                    <div className="h-6 w-px bg-[#B8860B]/30" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🏛</span>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-medium">
                          DOMINIONS
                        </span>
                        <span className="text-sm font-bold text-[#FFF4D0]">7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Gameplay Cue */}
              <div className="absolute bottom-6 left-8 bg-[#120E0A]/85 backdrop-blur-md px-4 py-2 rounded border border-[#B8860B]/30 flex items-center gap-3 text-xs text-[#C8B088]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span>Click any province or fortress on the tactical map to inspect command options</span>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 03: TERRITORY SELECTED */}
        {/* ========================================================================= */}
        {showState('03_TERRITORY_SELECTED') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  03
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Territory / Kingdom Selected Header
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Contextual fortress banner with defense, resource yields, and bronze command action.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(7)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black">
              <img
                src={GAME_IMAGES.TACTICAL_MAP}
                alt="Selected Fortress"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/60 pointer-events-none" />

              {/* Contextual Territory Header */}
              <div className="relative z-20 w-full px-6 lg:px-12 pt-4">
                <div className="carved-plinth rounded-lg p-4 lg:px-8 lg:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded bg-[#1F1710] border-2 border-[#D4AF37]/60 flex items-center justify-center text-amber-300 font-bold">
                      🏰
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base lg:text-lg font-cinzel font-black tracking-[0.2em] text-[#FFF4D0]">
                          EASTERN FORT
                        </h3>
                        <span className="text-[9px] tracking-widest font-marcellus uppercase px-2 py-0.5 rounded bg-[#3A3022] text-[#F3E5AB] border border-[#B8860B]/40 font-semibold">
                          NEUTRAL TERRITORY
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C8B088] mt-0.5 font-prose">
                        Sandstone Bastion • Bordering Magadha Trade Route
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 bg-[#110D09]/80 px-6 py-2 rounded-md border border-[#B8860B]/25">
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-marcellus">
                        DEFENCE
                      </span>
                      <span className="text-sm font-bold text-[#FFF4D0]">60</span>
                    </div>
                    <div className="h-6 w-px bg-[#B8860B]/30" />
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-marcellus">
                        RESOURCES
                      </span>
                      <span className="text-sm font-bold text-[#FFF4D0]">120</span>
                    </div>
                    <div className="h-6 w-px bg-[#B8860B]/30" />
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-marcellus">
                        ARMY
                      </span>
                      <span className="text-sm font-bold text-[#FFF4D0]">35k</span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => onJumpToState(7)}
                      className="px-6 py-2 rounded bg-gradient-to-b from-[#3D2817] via-[#24170D] to-[#120B06] border border-[#D4AF37] text-[#FFF4D0] font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-carved hover:shadow-royal-glow transition cursor-pointer"
                    >
                      ✦ CAPTURE TERRITORY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 04: COWRIE THROW */}
        {/* ========================================================================= */}
        {showState('04_COWRIE_THROW') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  04
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Cowrie Throw Header (Pachisi Heritage Phase)
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Framed with Indian royal manuscript ornamentation connected to 6 physical cowrie shells.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(5)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black">
              <img
                src={GAME_IMAGES.HORIZON_FORT}
                alt="Cowrie roll vista"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/80 pointer-events-none" />

              {/* Manuscript Top Plinth */}
              <div className="relative z-20 w-full px-6 pt-5 flex justify-center">
                <div className="carved-plinth rounded-lg px-8 py-3 max-w-xl w-full text-center relative border border-[#D4AF37]/50 backdrop-blur-md shadow-royal-glow-sm">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="text-[10px] font-cinzel font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
                      YOUR TURN
                    </span>
                    <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-cinzel font-black tracking-[0.25em] text-[#FFF4D0] mt-0.5">
                    THROW THE COWRIES
                  </h3>
                  <p className="text-[10px] font-marcellus tracking-widest uppercase text-[#C8B088] mt-0.5">
                    Vedic Pachisi Destiny • Cast the Six Sacred Shells
                  </p>
                </div>
              </div>

              {/* Six Shells Demonstration Plinth */}
              <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center">
                <div className="bg-gradient-to-b from-[#2E1F14]/90 to-[#120B06]/95 border-2 border-[#D4AF37]/60 rounded-xl px-8 py-4 backdrop-blur-md shadow-2xl flex flex-col items-center">
                  <div className="flex items-center gap-4 my-1">
                    {[1, 1, 0, 1, 1, 0].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-14 rounded-full border-2 flex items-center justify-center ${
                            val === 1
                              ? 'bg-gradient-to-b from-[#FFFDF0] via-[#EAD9BC] to-[#A38A65] border-amber-300'
                              : 'bg-gradient-to-b from-[#D4AF37] via-[#8F7226] to-[#473611] border-[#8C6239]'
                          }`}
                        >
                          {val === 1 ? (
                            <div className="w-2 h-9 bg-[#351E10] rounded-full border border-amber-300/60" />
                          ) : (
                            <div className="w-4 h-8 rounded-full bg-amber-900/30" />
                          )}
                        </div>
                        <span className="text-[8px] font-bold mt-1 text-amber-200">
                          {val === 1 ? 'UP (1)' : 'DOWN (0)'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#F3E5AB]/90 font-cinzel mt-2 tracking-wider">
                    CALCULATED MARCH: 4 STEPS (GRACE ROLL AVAILABLE ON 6)
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 05: BATTLE STATE */}
        {/* ========================================================================= */}
        {showState('05_BATTLE_STATE') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  05
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Battle State Header (Tension &amp; Warfare)
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Dramatic crimson battlefield backdrop with Maurya vs Rajput facing insignia.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(8)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#6E1B1B] shadow-crimson-glow bg-black">
              <img
                src={GAME_IMAGES.BATTLE_CINEMATIC}
                alt="Battlefield in flames"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/75 pointer-events-none" />

              <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
                <div className="bg-gradient-to-b from-[#210D0D]/95 via-[#180A0A]/95 to-[#0F0505]/95 border border-[#8C2323] rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-2xl flex items-center justify-between">
                  {/* Attacking Realm */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full border-2 border-[#D4AF37] bg-[#2A180E] flex items-center justify-center shadow-royal-glow-sm text-amber-300">
                      🦁
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-marcellus font-bold block">
                        ATTACKING REALM
                      </span>
                      <h4 className="text-sm lg:text-base font-cinzel font-black tracking-[0.15em] text-[#FFF4D0]">
                        MAURYA EMPIRE
                      </h4>
                      <span className="text-[10px] text-[#C8B088] font-prose">
                        King Vikramaditya • 120k Troops
                      </span>
                    </div>
                  </div>

                  {/* VS Emblem */}
                  <div className="text-center px-4">
                    <span className="text-[10px] font-cinzel font-black tracking-[0.4em] text-crimson-gradient block">
                      ENGAGEMENT
                    </span>
                    <div className="flex items-center justify-center gap-3 my-0.5">
                      <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#8C2323]" />
                      <div className="px-2.5 py-0.5 rounded bg-[#3B1212] border border-[#8C2323] text-xs font-cinzel font-bold text-[#FFA5A5] tracking-widest">
                        VS
                      </div>
                      <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#8C2323]" />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8B088]/80 font-marcellus">
                      CLASH AT DEVAGIRI GATES
                    </span>
                  </div>

                  {/* Defending Realm */}
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#D94444] font-marcellus font-bold block">
                        DEFENDING REALM
                      </span>
                      <h4 className="text-sm lg:text-base font-cinzel font-black tracking-[0.15em] text-[#FFF4D0]">
                        RAJPUT KINGDOM
                      </h4>
                      <span className="text-[10px] text-[#C8B088] font-prose">
                        Rana Kumbha • 95k Garrison
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-full border-2 border-[#8C2323] bg-[#210D0D] flex items-center justify-center text-red-300">
                      ⚔
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 06: KINGDOM FALLEN */}
        {/* ========================================================================= */}
        {showState('06_KINGDOM_FALLEN') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  06
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Kingdom Fallen Header (Exile State)
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Darkened aged parchment &amp; ash-tinted bronze plinth with Reclaim action.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(10)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border border-[#78350F]/70 shadow-2xl bg-black">
              <img
                src={GAME_IMAGES.BATTLE_CINEMATIC}
                alt="Ruined fortress after battle"
                className="absolute inset-0 w-full h-full object-cover grayscale-[35%] contrast-[1.1] brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/90 pointer-events-none" />

              <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
                <div className="bg-gradient-to-b from-[#1C120C]/95 via-[#130C08]/95 to-[#0B0704]/95 border border-[#8F5528]/50 rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded bg-[#100B07] border border-[#8F5528]/60 flex items-center justify-center text-[#B45309]">
                      👑
                    </div>
                    <div>
                      <span className="text-[9px] font-marcellus font-bold uppercase tracking-[0.25em] text-[#B45309] block">
                        CAPITAL FALLEN • THE EMPIRE OVERRUN
                      </span>
                      <h3 className="text-base lg:text-lg font-cinzel font-black tracking-[0.2em] text-[#EAD9BC]">
                        THE KINGDOM HAS FALLEN
                      </h3>
                      <p className="text-xs text-[#A89279] mt-0.5 font-prose">
                        Your capital has been captured. <span className="text-[#EAD9BC] font-medium">THE RULER SURVIVES IN EXILE.</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => onJumpToState(11)}
                      className="px-6 py-2 rounded bg-gradient-to-b from-[#382214] via-[#24150B] to-[#120B06] border border-[#D4AF37]/80 text-[#FFF4D0] font-cinzel text-xs font-black tracking-[0.2em] uppercase transition cursor-pointer"
                    >
                      ⚔ RECLAIM KINGDOM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* HEADER 07: KINGDOM RECLAIMED */}
        {/* ========================================================================= */}
        {showState('07_KINGDOM_RECLAIMED') && (
          <article className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#F3E5AB]">
                  07
                </span>
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-[#F3E5AB] tracking-wide">
                    Kingdom Reclaimed Header (Royal Return)
                  </h2>
                  <p className="text-xs text-[#C8B088]/80 font-prose">
                    Warmer antique-gold lighting and subtle celebratory Vedic ornamentation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onJumpToState(11)}
                className="text-[11px] font-cinzel uppercase tracking-widest text-[#D4AF37] bg-[#1a140d] px-3 py-1 rounded border border-[#B8860B]/40 hover:border-[#D4AF37] cursor-pointer"
              >
                Play In Context →
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-royal-glow bg-black">
              <img
                src={GAME_IMAGES.HORIZON_FORT}
                alt="Golden reclaimed kingdom"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/75 pointer-events-none" />

              <div className="relative z-20 w-full px-6 lg:px-14 pt-4">
                <div className="bg-gradient-to-b from-[#2E2012]/95 via-[#1E150B]/95 to-[#120C06]/95 border-2 border-[#D4AF37] rounded-lg p-4 lg:px-8 lg:py-3.5 backdrop-blur-md shadow-royal-glow flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#FFF4D0] bg-gradient-to-br from-[#8F7226] to-[#24170D] flex items-center justify-center text-amber-200 text-lg shadow-royal-glow">
                      ⚜
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-marcellus font-bold block">
                          DYNASTY RESTORED
                        </span>
                        <span className="text-[9px] bg-[#D4AF37]/20 text-[#FFF4D0] px-2 py-0.5 rounded border border-[#D4AF37]/40 font-cinzel">
                          VICTORIOUS
                        </span>
                      </div>
                      <h3 className="text-base lg:text-xl font-cinzel font-black tracking-[0.25em] text-gold-gradient">
                        KINGDOM RECLAIMED
                      </h3>
                      <p className="text-xs font-cinzel tracking-[0.2em] text-[#F3E5AB] mt-0.5">
                        THE RULER RETURNS • SEAT OF EMPIRE RE-ESTABLISHED
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <span className="text-[9px] uppercase tracking-widest text-[#B8860B] block font-marcellus">
                        SOVEREIGNTY SCORE
                      </span>
                      <span className="text-sm font-cinzel font-bold text-[#FFF4D0] tracking-wider">
                        +1,200 PRESTIGE
                      </span>
                    </div>
                    <button
                      onClick={() => onJumpToState(12)}
                      className="px-6 py-2 rounded bg-gradient-to-b from-[#8F7226] via-[#B8860B] to-[#5E4314] border border-[#FFF4D0] text-[#120B06] font-cinzel text-xs font-black tracking-[0.2em] uppercase shadow-royal-glow hover:brightness-110 transition cursor-pointer"
                    >
                      ASCEND THE THRONE
                    </button>
                  </div>
                </div>
              </div>

              {/* Stepwell Bells Banner */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
                <div className="inline-block bg-[#120B06]/85 backdrop-blur-md px-6 py-2.5 rounded-lg border border-[#D4AF37]/40">
                  <span className="text-xs font-cinzel text-[#FFF4D0] tracking-[0.25em] uppercase">
                    All 7 Vassal Territories Proclaim Allegiance
                  </span>
                  <p className="text-[11px] text-[#C8B088] font-prose mt-0.5">
                    The sacred bells of the Khajuraho-inspired shikharas ring across the valley.
                  </p>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Engineering & Art Bible Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-12 border-t border-[#B8860B]/25">
        <div className="bg-[#120E0A] rounded-xl border border-[#B8860B]/30 p-8 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B8860B]/20 pb-6">
            <div>
              <span className="text-[10px] uppercase font-marcellus tracking-[0.3em] text-[#D4AF37] font-semibold">
                ENGINEERING &amp; ART BIBLE
              </span>
              <h3 className="text-2xl font-cinzel font-bold text-gold-gradient mt-1">
                SAMRAJYA Header System Architecture
              </h3>
              <p className="text-xs text-[#C8B088] max-w-2xl mt-1 font-prose">
                Detailed breakdown of how the 7 header archetypes align with AAA historical strategy standards (Civilization, Total War) and ancient Indian architectural motifs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#1A140E] text-[#D4AF37] border border-[#B8860B]/40 rounded font-cinzel text-xs font-bold">
                SIH 2026 Ready
              </span>
            </div>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#18130E] p-5 rounded-lg border border-[#B8860B]/20">
              <div className="w-8 h-8 rounded bg-[#2D1F13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mb-3 text-sm">
                🏛️
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#FFF4D0] tracking-wide">
                10–15% Viewport Rule
              </h4>
              <p className="text-xs text-[#C8B088]/80 font-prose mt-2 leading-relaxed">
                The header never covers more than 15% of the 1440×900 viewport. The rendered 3D ancient world—temple silhouettes, fort walls, and river valleys—remains the indisputable visual hero.
              </p>
            </div>

            <div className="bg-[#18130E] p-5 rounded-lg border border-[#B8860B]/20">
              <div className="w-8 h-8 rounded bg-[#2D1F13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mb-3 text-sm">
                📜
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#FFF4D0] tracking-wide">
                Pachisi Heritage Mechanics
              </h4>
              <p className="text-xs text-[#C8B088]/80 font-prose mt-2 leading-relaxed">
                Integrates the six traditional cowrie shell rolls into 3D strategic movement, bridging authentic Vedic game heritage with grand-strategy turn structure.
              </p>
            </div>

            <div className="bg-[#18130E] p-5 rounded-lg border border-[#B8860B]/20">
              <div className="w-8 h-8 rounded bg-[#2D1F13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mb-3 text-sm">
                🪔
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#FFF4D0] tracking-wide">
                Materials &amp; Filigree
              </h4>
              <p className="text-xs text-[#C8B088]/80 font-prose mt-2 leading-relaxed">
                Eliminates all modern SaaS rounded white cards, neon accents, and generic gradients. Uses carved plinths, aged brass, bronze dividers, and subtle manuscript borders.
              </p>
            </div>

            <div className="bg-[#18130E] p-5 rounded-lg border border-[#B8860B]/20">
              <div className="w-8 h-8 rounded bg-[#2D1F13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mb-3 text-sm">
                👑
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#FFF4D0] tracking-wide">
                Reclaim Narrative Flow
              </h4>
              <p className="text-xs text-[#C8B088]/80 font-prose mt-2 leading-relaxed">
                Distinct visual emotional states: from dramatic crimson warfare and somber ash-toned exile back to warm celebratory gold when the kingdom is reclaimed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
