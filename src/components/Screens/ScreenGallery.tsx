import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { MainMenuScreen } from './MainMenuScreen';
import { ChooseRulerScreen } from './ChooseRulerScreen';
import { ChooseCivScreen } from './ChooseCivScreen';
import { DynastyIntroScreen } from './DynastyIntroScreen';
import { TacticalMap } from '../TacticalMap';
import { BattleScreen } from './BattleScreen';
import { KingdomFallenScreen } from './KingdomFallenScreen';
import { KingdomReclaimedScreen } from './KingdomReclaimedScreen';
import { VictoryScreen } from './VictoryScreen';
import { HowToPlayScreen } from './HowToPlayScreen';
import { INITIAL_TERRITORIES } from '../../data/gameData';
import { CivId, RulerGender, RulerId } from '../../types/game';

interface ScreenGalleryProps {
  onLaunchCampaign: () => void;
  onOpenHeaderSpec: () => void;
}

export type GalleryScreenId =
  | '01_MAIN_MENU'
  | '02_CHOOSE_RULER'
  | '03_CHOOSE_CIV'
  | '04_DYNASTY_INTRO'
  | '05_TACTICAL_MAP'
  | '06_BATTLE_ENGAGEMENT'
  | '07_KINGDOM_FALLEN'
  | '08_KINGDOM_RECLAIMED'
  | '09_GRAND_VICTORY'
  | '10_HOW_TO_PLAY';

export const ScreenGallery: React.FC<ScreenGalleryProps> = ({
  onLaunchCampaign,
  onOpenHeaderSpec,
}) => {
  const [activeScreen, setActiveScreen] = useState<GalleryScreenId>('01_MAIN_MENU');
  const [selectedRulerId, setSelectedRulerId] = useState<RulerId>('vikramaditya');
  const [selectedCivId, setSelectedCivId] = useState<CivId>('maurya');
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string>('pataliputra');

  const galleryItems: { id: GalleryScreenId; label: string; icon: string; category: string }[] = [
    { id: '01_MAIN_MENU', label: '01 Main Menu', icon: '🏰', category: 'Entrance' },
    { id: '02_CHOOSE_RULER', label: '02 Choose Ruler', icon: '👑', category: 'Lineage' },
    { id: '03_CHOOSE_CIV', label: '03 Choose Dynasty', icon: '🦁', category: 'Realm' },
    { id: '04_DYNASTY_INTRO', label: '04 Dynastic Oath', icon: '📜', category: 'Investiture' },
    { id: '05_TACTICAL_MAP', label: '05 3D Tactical World', icon: '🗺️', category: 'Campaign' },
    { id: '06_BATTLE_ENGAGEMENT', label: '06 Tactical Combat', icon: '⚔️', category: 'Warfare' },
    { id: '07_KINGDOM_FALLEN', label: '07 Kingdom Fallen', icon: '🔥', category: 'Exile' },
    { id: '08_KINGDOM_RECLAIMED', label: '08 Sovereign Return', icon: '✨', category: 'Restoration' },
    { id: '09_GRAND_VICTORY', label: '09 Chakravartin Victory', icon: '🏆', category: 'Triumph' },
    { id: '10_HOW_TO_PLAY', label: '10 Sacred Rules', icon: '🎲', category: 'Heritage' },
  ];

  const handleSelectScreen = (id: GalleryScreenId) => {
    sounds.playButtonClick();
    setActiveScreen(id);
  };

  const rulerGender: RulerGender = selectedRulerId === 'vikramaditya' ? 'king' : 'queen';

  return (
    <div className="relative w-full h-screen bg-[#08090D] text-[#EAD9BC] flex flex-col overflow-hidden">
      {/* Top Floating Gallery Ribbon Bar */}
      <div className="relative z-50 w-full bg-[#110D09]/95 border-b border-[#D4AF37]/40 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#2D1F13] to-[#0D0907] flex items-center justify-center text-[#D4AF37] font-bold text-xs shadow-royal-glow-sm">
            🏛
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel tracking-[0.2em] text-xs font-bold text-gold-gradient">
                ARCHETYPAL SCREEN EXPLORER
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-marcellus text-amber-200/80 bg-amber-950/60 border border-amber-500/40 rounded">
                10 SCREENS
              </span>
            </div>
            <p className="text-[10px] text-[#A89279] font-prose hidden sm:block">
              Direct access to all visual prototypes &amp; historical game interfaces
            </p>
          </div>
        </div>

        {/* Gallery Screen Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full lg:max-w-2xl scrollbar-thin">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectScreen(item.id)}
              className={`px-2 sm:px-2.5 py-1 rounded border text-[10px] font-cinzel tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeScreen === item.id
                  ? 'bg-gradient-to-b from-[#8F7226]/40 to-[#1E140C]/90 border-[#D4AF37] text-[#FFF4D0] shadow-royal-glow-sm font-bold scale-[1.02]'
                  : 'border-[#B8860B]/30 hover:border-[#D4AF37]/60 text-[#C8B088] hover:text-[#FFF4D0] bg-black/40'
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.id.split('_')[0]}</span>
            </button>
          ))}
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playTempleBell();
              onLaunchCampaign();
            }}
            className="px-3 py-1.5 rounded bg-gradient-to-b from-[#E4BE50] to-[#AA8524] text-black font-cinzel font-black text-[10px] tracking-wider uppercase shadow-royal-glow-sm hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-1"
          >
            <span>🎮</span>
            <span>PLAY CAMPAIGN</span>
          </button>
          <button
            onClick={() => {
              sounds.playButtonClick();
              onOpenHeaderSpec();
            }}
            className="px-3 py-1.5 rounded border border-[#D4AF37]/60 text-[#F3E5AB] font-cinzel text-[10px] tracking-wider uppercase hover:border-[#FFF4D0] hover:text-white transition cursor-pointer bg-black/40"
          >
            📜 SPEC BIBLE
          </button>
        </div>
      </div>

      {/* Screen Render Container */}
      <div className="relative flex-1 w-full overflow-hidden">
        {activeScreen === '01_MAIN_MENU' && (
          <MainMenuScreen
            onBeginReign={() => setActiveScreen('02_CHOOSE_RULER')}
            onOpenHowToPlay={() => setActiveScreen('10_HOW_TO_PLAY')}
            onOpenSettings={() => {}}
            onOpenCivs={() => setActiveScreen('03_CHOOSE_CIV')}
            onOpenRuler={() => setActiveScreen('02_CHOOSE_RULER')}
          />
        )}

        {activeScreen === '02_CHOOSE_RULER' && (
          <ChooseRulerScreen
            selectedRuler={selectedRulerId}
            onSelectRuler={(id) => setSelectedRulerId(id)}
            onConfirm={() => setActiveScreen('03_CHOOSE_CIV')}
            onBack={() => setActiveScreen('01_MAIN_MENU')}
          />
        )}

        {activeScreen === '03_CHOOSE_CIV' && (
          <ChooseCivScreen
            selectedCiv={selectedCivId}
            onSelectCiv={(id) => setSelectedCivId(id)}
            onConfirm={() => setActiveScreen('04_DYNASTY_INTRO')}
            onBack={() => setActiveScreen('02_CHOOSE_RULER')}
          />
        )}

        {activeScreen === '04_DYNASTY_INTRO' && (
          <DynastyIntroScreen
            dynastyId={selectedCivId}
            rulerGender={rulerGender}
            onEnterGame={() => setActiveScreen('05_TACTICAL_MAP')}
            onBack={() => setActiveScreen('03_CHOOSE_CIV')}
          />
        )}

        {activeScreen === '05_TACTICAL_MAP' && (
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute top-3 right-4 z-30 flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded border border-amber-500/40 backdrop-blur-md">
              <button
                onClick={() => setActiveScreen('06_BATTLE_ENGAGEMENT')}
                className="text-[10px] font-cinzel font-bold text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚔️</span>
                <span>TEST COMBAT CLASH</span>
              </button>
            </div>
            <TacticalMap
              territories={INITIAL_TERRITORIES}
              selectedTerritoryId={selectedTerritoryId}
              onSelectTerritory={(id) => setSelectedTerritoryId(id)}
              onMarchToTerritory={(id) => setSelectedTerritoryId(id)}
              onAttackTerritory={() => setActiveScreen('06_BATTLE_ENGAGEMENT')}
              marchPotential={6}
            />
          </div>
        )}

        {activeScreen === '06_BATTLE_ENGAGEMENT' && (
          <BattleScreen
            onResolveVictory={() => setActiveScreen('08_KINGDOM_RECLAIMED')}
            onSimulateDefeat={() => setActiveScreen('07_KINGDOM_FALLEN')}
            onRetreat={() => setActiveScreen('05_TACTICAL_MAP')}
          />
        )}

        {activeScreen === '07_KINGDOM_FALLEN' && (
          <KingdomFallenScreen
            onContinueExile={() => setActiveScreen('08_KINGDOM_RECLAIMED')}
            onRestart={() => setActiveScreen('01_MAIN_MENU')}
          />
        )}

        {activeScreen === '08_KINGDOM_RECLAIMED' && (
          <KingdomReclaimedScreen
            onAscendThrone={() => setActiveScreen('09_GRAND_VICTORY')}
            onReturnToMap={() => setActiveScreen('05_TACTICAL_MAP')}
          />
        )}

        {activeScreen === '09_GRAND_VICTORY' && (
          <VictoryScreen
            winningPlayer={{
              id: selectedCivId,
              name: selectedCivId === 'maurya' ? 'MAURYA DYNASTY' : `${selectedCivId.toUpperCase()} EMPIRE`,
              rulerGender: rulerGender,
              rulerName: selectedRulerId === 'vikramaditya' ? 'King Vikramaditya' : 'Queen Rudrama Devi',
              color: '#d4af37',
              capitalId: 'pataliputra',
              currentLocation: 'pataliputra',
              army: 145,
              resources: 1250,
              territories: ['pataliputra', 'eastern_fort', 'devagiri_gates', 'malwa_crossroad'],
              status: 'active',
              isAI: false,
              reclaimEligible: false,
              battlesWon: 7,
              neutralCaptured: 4,
            }}
            onPlayAgain={() => setActiveScreen('01_MAIN_MENU')}
            onReturnToMainMenu={() => setActiveScreen('01_MAIN_MENU')}
          />
        )}

        {activeScreen === '10_HOW_TO_PLAY' && (
          <HowToPlayScreen
            onBack={() => setActiveScreen('01_MAIN_MENU')}
            onBeginReign={() => setActiveScreen('02_CHOOSE_RULER')}
          />
        )}
      </div>
    </div>
  );
};
