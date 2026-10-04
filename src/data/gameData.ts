import { Civilization, Ruler, Territory } from '../types/game';

// Image assets hotlinked from the prompt's proven URLs
export const GAME_IMAGES = {
  // Cinematic Horizon / Main Menu / Sunset Khajuraho fort vista
  HORIZON_FORT:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDcFNKWdRvLJYbXf7K4O9HoKv3-yaGyrfasR0uSxTGalOQqDyGap3zW20RapNTQ0vQkOuw30ub7JUvYVayMv_1bw924F_j7AKckNVimOSg2crNG0ssdtRN29a3sJE5Y9Jsq_KiHtQnCo0jzxTwIFYGJ9NIzu7Eo_GvpWj2ZdHjLu_1dINKw2moerUR6aY3hadHNXdZ7W3psrKrO3VqvU2zTEbRMKcYgEfUjS4LU5nhXndfs6P5B3iSD',
  // Isometric 3D Map with temples, stepwells, rivers, fortresses (Image 10)
  TACTICAL_MAP:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtO4UnqWdEiH3vT5te_jLaQZEAOZDNczc85hkcIIMOIPLUAqcFhqv4xZSLnHS4IDF6EDz38uvcMXO_5SPqIPdNjSW8mt8sV9g1T4YhcPMuQ1SX39jdPN9kn_Eke-AUW6zbNWKt08lMa1DrnQhH1UgS9vNmbrkhBP2ZyBlnO0ivkaXhnGmLaK3--Pix3O5ru4n4aVLeNJzCa7JkBtMBMvT0gYwnrhk8R6WMyjU_yC3MEHahIFoNYdLb',
  // Alternative Isometric 3D view (Image 2)
  TACTICAL_MAP_ALT:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-a7TJvyhNUcWMjNz9NG_dVlGcGv5sml-FQ4x1WNS48Nk24mhMzgT_5b2FqSa6CWiIFJSdEvOMVjoDGuLqA4gYS0-LFWDpm405sorFPFk7BoI3gJGINgHu8Vp20qEFg-7MYKEwaWdeJSBRxESYMCRL_bzkY-_IQelD42cxd0cRZ-DxNws3BLx0e8A08eJt51Xz8TeZqQVSK2D_07UKv9go4yNInd8uQ_Ong261PFtIQZn4z2n0WDx7',
  // King Vikramaditya in ceremonial royal robes on carved plinth (Image 3)
  KING_VIKRAMADITYA:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDW60VIvLo0fZW1tkoDx3_LXusLbtXxmCqm5CZD8-LGo3rBzAbvfuLokDn397EPANHU2IUKYRCbKuXpXBMan581IOsKquH0vz20I7KQABWbT648o0M9TsOxcgCC9oXlKHQEP8kL7UXRgl3eNuUPu-7WTw2Lw8ZpoR1c1MzGJ0e23b3AWdLbDufCZNHCkjxtGPHsVPWexyp-T96QFiNKpRqeG08NzLH-RsvDILyRt21lopxbMUdnyaH5',
  // Queen Rudrama Devi with scroll and royal sword on plinth (Image 6)
  QUEEN_RUDRAMA:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBnTK7E_BG5eXjKL7cEFziLSeLwvGbF2TdVzCMl0Cgzbfv2znNXRpAj9mBE8Pr9Nbf6lD67NKNu6nMikoInBuFnHn1V5eLOpj8HeO1vopfAy9OINyN0j-ra41ZsOLlNVoJat5HUQFnhDes0L6eRUm7hM55IBBSXoGdWIvMdvj8b0wosYV2VrcBbeU4NBAGb6vvolti50covYnaa6C-kwbVpWWHJSZjjuGn0jUdfASF-v1pVUvKS0fbx',
  // Cinematic Battlefield sunset with war elephants and fires (Image 4)
  BATTLE_CINEMATIC:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0qHaeaVu-_KjaVvdfumZbIulSZ4Q8vT8du51VhA0ZQueX9hQaZPita2ZQoxQuH7X60xpu829kM7Ksh_wZbyzprwDp6XL5qz1cBvwem7AT3AdBSbWxsw2dRL2HmKa887Woq8WaRS_wj0YM83aDWqZjRtNk7cqhdB6k9oztVtQ3F5DC8CFYTHjY6njEwtIfSwL7eIc4YJKdS6AQtO8kiTvggYegJvyyP0VJnDFbaZ45ndjI5rGZQWh3',
  // High-intensity tactical combat clash (Image 5)
  BATTLE_COMBAT:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAbbuHd8kH83ZBuR-WFafqwDWQZZHMFBjA1gDC9-ry8NShxxmjQP0MsvZfEwJGSGBHSbswvz8SrDFZWfcrx_NyWUAgTZ17yv6k5IP7KuE1z7-g_z7M9H14QfmyTrzxCCB7DqOuFM1QJjhzvY6vXL9Lw0Q72BdtnkT-6Rqpcau-Y95qziqD52dDfecevJj77kHtRtuloGt8mqXVXs56pTkV54WRdhCncu_EeBYWc48zuTm0X7lni0Ame',
};

export const RULERS: Record<string, Ruler> = {
  vikramaditya: {
    id: 'vikramaditya',
    name: 'KING VIKRAMADITYA',
    title: 'THE CHAKRAVARTIN OF UJJAYINI',
    archetype: 'Royal Warrior • High Commander',
    image: GAME_IMAGES.KING_VIKRAMADITYA,
    bio: 'Renowned for valor, wisdom, and the golden era of Sanskrit arts. A sovereign who wields the ancestral curved Talwar and commands the iron discipline of imperial legions.',
    quote: 'The throne belongs not to him who inherits it, but to him who protects the realm.',
    traits: [
      { label: 'Talwar Mastery', value: '+25% Combat Attack' },
      { label: 'Army Morale', value: '+15 Legion Courage' },
      { label: 'Fort Defense', value: '+20 Sandstone Rampart' },
    ],
  },
  rudrama: {
    id: 'rudrama',
    name: 'QUEEN RUDRAMA DEVI',
    title: 'SOVEREIGN OF ORUGALLU',
    archetype: 'Sovereign Strategist • Statecraft & Diplomacy',
    image: GAME_IMAGES.QUEEN_RUDRAMA,
    bio: 'A fearless monarch of the Kakatiya dynasty who defended her kingdom against neighboring dynasties with impenetrable fort rings and visionary economic treaties.',
    quote: 'Statecraft is the chisel that carves enduring dynasties out of shifting stone.',
    traits: [
      { label: 'Cowrie Fortune', value: '+1 Grace Roll on 6' },
      { label: 'Territory Revenue', value: '+30% Gold Yield' },
      { label: 'Diplomacy & Vyuha', value: '+20 Strategic Maneuver' },
    ],
  },
};

export const CIVILIZATIONS: Record<string, Civilization> = {
  maurya: {
    id: 'maurya',
    name: 'MAURYA EMPIRE',
    title: 'Imperial Chakravartin Realm',
    heritage: 'Arthashastra Discipline',
    bannerColor: '#d4af37',
    crestIcon: '🦁',
    image: GAME_IMAGES.TACTICAL_MAP,
    description:
      'Masters of imperial bureaucracy, iron metallurgy, disciplined elephant phalanxes, and paved stone Grand Trunk highways that link distant subcontinental satrapies.',
    bonus: {
      primary: 'War Elephant Formations Tier IV',
      secondary: '+20% Trade Revenue from Highway Posts',
    },
    specialUnit: {
      name: 'Gajadhyaksha War Elephants',
      icon: '🐘',
      description: 'Armored elephant corps equipped with stone-throwers and tusk blades.',
    },
  },
  chola: {
    id: 'chola',
    name: 'CHOLA DYNASTY',
    title: 'Maritime Thalassocracy',
    heritage: 'Granary Wealth & Navies',
    bannerColor: '#2dd4bf',
    crestIcon: '⛵',
    image: GAME_IMAGES.HORIZON_FORT,
    description:
      'Rulers of oceanic trade routes, mighty bronze artisans, and builders of monumental soaring granite gopurams along the sacred Kaveri delta.',
    bonus: {
      primary: 'River & Coastal Crossings No Penalty',
      secondary: '+25% Food & Grain Tribute from Deltas',
    },
    specialUnit: {
      name: 'Kadal-Padai Marine Vanguard',
      icon: '🛡',
      description: 'Disciplined boarding troops wielding curved steel and teak bucklers.',
    },
  },
  vijayanagara: {
    id: 'vijayanagara',
    name: 'VIJAYANAGARA',
    title: 'City of Victory & Diamonds',
    heritage: 'Golden Age Splendor',
    bannerColor: '#f59e0b',
    crestIcon: '👑',
    image: GAME_IMAGES.HORIZON_FORT,
    description:
      'The jewel of the Tungabhadra river valley. Famed for sprawling monolithic boulder bastions, royal cavalry imported from Arabia, and immense gemstone vaults.',
    bonus: {
      primary: '+40% Gold Accrual from Diamond Mines',
      secondary: '+30 Fortress Defense at Sacred Monoliths',
    },
    specialUnit: {
      name: 'Vijaya Royal Guard',
      icon: '⚔',
      description: 'Heavy gilded infantry trained in dual-sword dancing and spear shields.',
    },
  },
  rajput: {
    id: 'rajput',
    name: 'RAJPUT CONFEDERACY',
    title: 'Unconquered Hill Fortresses',
    heritage: 'Chivalric Bastions',
    bannerColor: '#ef4444',
    crestIcon: '🗡',
    image: GAME_IMAGES.BATTLE_CINEMATIC,
    description:
      'Commanders of soaring desert citadels atop precipitous sandstone cliffs. Feared for suicidal cavalry charges and unbreakable garrison honor.',
    bonus: {
      primary: '+35 Cavalry Shock Attack in Open Plains',
      secondary: 'Garrisons Immune to Siege Morale Penalties',
    },
    specialUnit: {
      name: 'Mewari Rajput Lancers',
      icon: '🐎',
      description: 'Fierce armored horsemen wielding bamboo lances and Damascus steel.',
    },
  },
};

export const INITIAL_TERRITORIES: Territory[] = [
  {
    id: 'pataliputra',
    name: 'PATALIPUTRA CITADEL',
    type: 'CAPITAL',
    owner: 'player',
    defense: 100,
    maxDefense: 100,
    resources: 180,
    garrison: 80,
    location: { x: 38, y: 55 },
    description: 'The ancient walled capital seated at the river confluence. Hearth of the Maurya imperial lineage and high treasury.',
    yieldLabel: '+85 Gold / +40 Grain',
  },
  {
    id: 'eastern_fort',
    name: 'EASTERN FORT',
    type: 'NEUTRAL',
    owner: 'neutral',
    defense: 60,
    maxDefense: 80,
    resources: 120,
    garrison: 35,
    location: { x: 52, y: 46 },
    description: 'Carved sandstone bastion overlooking trade bridges and fertile paddy stepwells. Sentinel garrison guards the iron mines.',
    yieldLabel: '+65 Gold / +25 Iron',
  },
  {
    id: 'devagiri_gates',
    name: 'DEVAGIRI GATES',
    type: 'RIVAL_BASTION',
    owner: 'rajput',
    defense: 85,
    maxDefense: 90,
    resources: 140,
    garrison: 95,
    location: { x: 18, y: 38 },
    description: 'Impregnable cliff-hewn citadel held by rival Rajput clans. Threatens the northern flank with elite camel archers.',
    yieldLabel: '+90 Gold / High Strategic Morale',
  },
  {
    id: 'narmada_stepwells',
    name: 'NARMADA STEPWELLS',
    type: 'SANCTUARY',
    owner: 'player',
    defense: 70,
    maxDefense: 75,
    resources: 95,
    garrison: 40,
    location: { x: 26, y: 68 },
    description: 'Deep subterranean stepwells and sandstone water temples providing continuous replenishment to passing royal legions.',
    yieldLabel: '+40 Grain / +15 Morale',
  },
  {
    id: 'vijayanagara_citadel',
    name: 'VIJAYANAGARA CITADEL',
    type: 'SANCTUARY',
    owner: 'vijayanagara',
    defense: 95,
    maxDefense: 100,
    resources: 220,
    garrison: 75,
    location: { x: 68, y: 28 },
    description: 'Monolithic granite temple complex boasting royal jewel markets and monumental monolithic Nandi guardians.',
    yieldLabel: '+110 Gold / Sacred Relics',
  },
  {
    id: 'chola_delta',
    name: 'CHOLA TEMPLE DELTA',
    type: 'MARITIME_DELTA',
    owner: 'chola',
    defense: 75,
    maxDefense: 85,
    resources: 170,
    garrison: 60,
    location: { x: 82, y: 52 },
    description: 'Riverine trading port with grand soaring gopurams. Ships from Sumatra and Java dock here bearing silks and spices.',
    yieldLabel: '+40 Maritime Trade / +35 Grain',
  },
  {
    id: 'kalinga_coast',
    name: 'KALINGA COASTAL GATES',
    type: 'OUTPOST',
    owner: 'neutral',
    defense: 50,
    maxDefense: 70,
    resources: 110,
    garrison: 30,
    location: { x: 88, y: 72 },
    description: 'Rugged coastal battlements overlooking the Bay of Bengal. Strategic watchtowers guard naval approaches.',
    yieldLabel: '+50 Gold / Naval Timber',
  },
];
