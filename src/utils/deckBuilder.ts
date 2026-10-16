import { VanguardCard } from '../types/card';
import { DeckStructure, DeckCardSlot, DeckStatistics, CardSlotCategory } from '../types/deck';
import rawCards from '../data/cards.json';
import rawChronojetDeck from '../data/chronojetDeck.json';
import rawBlasterBladeDeck from '../data/blasterBladeDeck.json';
import rawOverlordDeck from '../data/overlordDeck.json';
import rawHarriDeck from '../data/harriDeck.json';

export const allCards: VanguardCard[] = rawCards as VanguardCard[];

export interface DeckSummary {
  id: string;
  name: string;
  code: string;
  nation: string;
  clan: string;
  format: string;
  badgeColor: string;
  themeColor: 'purple' | 'blue' | 'red' | 'magenta';
  keyBoss: string;
  description: string;
}

export const AVAILABLE_DECKS: DeckSummary[] = [
  {
    id: 'd-ss03-chronojet',
    name: 'Stride Deckset Chronojet',
    code: 'D-SS03',
    nation: 'Dark States',
    clan: 'Gear Chronicle',
    format: 'Standard (Stride / Stride Crest)',
    badgeColor: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
    themeColor: 'purple',
    keyBoss: 'Chronojet Dragon & Chronodragon Nextage',
    description: 'Rewind time and manipulate the G-Zone to deliver high-velocity dual vanguard attacks.'
  },
  {
    id: 'dz-ss14-blaster-blade',
    name: 'Break Away Start Deck - Blaster Blade',
    code: 'DZ-SS14',
    nation: 'Keter Sanctuary',
    clan: 'Royal Paladin',
    format: 'Standard (Energy Generator / Aichi Icon)',
    badgeColor: 'border-blue-500/50 bg-blue-500/10 text-sky-300',
    themeColor: 'blue',
    keyBoss: 'King of Knights, Alfred & Blaster Blade & Soul Saver Dragon',
    description: 'Stand up, my avatar! Universal persona ride, pinpoint retire/draw, and Holy Charging Roar.'
  },
  {
    id: 'dz-ss15-dragonic-overlord',
    name: 'Break Away Start Deck - Dragonic Overlord',
    code: 'DZ-SS15',
    nation: 'Dragon Empire',
    clan: 'Kagero',
    format: 'Standard (Energy Generator / Kai Icon)',
    badgeColor: 'border-red-500/50 bg-red-500/10 text-red-300',
    themeColor: 'red',
    keyBoss: 'Dragonic Overlord & Vortex Dragon',
    description: 'The violent dragon of the empire returns with blazing re-standing fury and board sweep.'
  },
  {
    id: 'dz-ss02-harri',
    name: 'Stride Deckset Harri',
    code: 'DZ-SS02',
    nation: 'Dark States',
    clan: 'Pale Moon',
    format: 'Standard (Stride / Magia Crest)',
    badgeColor: 'border-pink-500/50 bg-pink-500/10 text-pink-300',
    themeColor: 'magenta',
    keyBoss: 'Masked Magician, Harri & Dragon Masquerade, Harri',
    description: 'Welcome to the grand Pale Moon Magia Circus! Superior call from soul and unleash acrobatic multi-attacks.'
  }
];

function buildDeckStructure(rawDeck: any): DeckStructure {
  const cardMap = new Map<string, VanguardCard>();
  allCards.forEach(c => cardMap.set(c.cardNo, c));

  // Resolve Crest
  let crest: VanguardCard | null = null;
  if (rawDeck.crest) {
    const crestNo = typeof rawDeck.crest === 'string' ? rawDeck.crest : rawDeck.crest.cardNo;
    crest = cardMap.get(crestNo) || null;
  }

  // Resolve Ride Deck
  const rideDeck: VanguardCard[] = (rawDeck.rideDeck || [])
    .map((item: any) => {
      const cardNo = typeof item === 'string' ? item : item.cardNo;
      return cardMap.get(cardNo);
    })
    .filter((c: VanguardCard | undefined): c is VanguardCard => Boolean(c));

  // Resolve G-Deck
  const gDeck: DeckCardSlot[] = [];
  if (Array.isArray(rawDeck.gDeck)) {
    for (const slot of rawDeck.gDeck) {
      const cardNo = typeof slot.cardNo === 'string' ? slot.cardNo : slot.card?.cardNo;
      const card = cardMap.get(cardNo);
      if (card) {
        gDeck.push({
          card,
          count: slot.count,
          category: (slot.category as CardSlotCategory) || 'Grade 4'
        });
      }
    }
  }

  // Resolve Main Deck
  const mainDeck: DeckCardSlot[] = [];
  if (Array.isArray(rawDeck.mainDeck)) {
    for (const slot of rawDeck.mainDeck) {
      const cardNo = typeof slot.cardNo === 'string' ? slot.cardNo : slot.card?.cardNo;
      const card = cardMap.get(cardNo);
      if (card) {
        mainDeck.push({
          card,
          count: slot.count,
          category: (slot.category as CardSlotCategory) || (card.cardType === 'Trigger Unit' ? 'Trigger' : (`Grade ${card.grade}` as CardSlotCategory))
        });
      }
    }
  }

  // Calculate statistics
  let totalCards = 0;
  let mainDeckCount = 0;
  let totalPower = 0;
  let powerCount = 0;
  let totalShield = 0;
  let shieldCount = 0;
  let triggerCount = 0;

  const triggersSummary = {
    critical: 0,
    draw: 0,
    front: 0,
    heal: 0,
    over: 0,
    total: 0
  };

  const gradeDistribution = {
    grade0: 0,
    grade1: 0,
    grade2: 0,
    grade3: 0,
    grade4: 0
  };

  // Add Ride Deck cards to grade distribution
  rideDeck.forEach(c => {
    if (c.grade === 0) gradeDistribution.grade0 += 1;
    if (c.grade === 1) gradeDistribution.grade1 += 1;
    if (c.grade === 2) gradeDistribution.grade2 += 1;
    if (c.grade === 3) gradeDistribution.grade3 += 1;
  });

  // Add G-Deck to grade distribution
  gDeck.forEach(slot => {
    gradeDistribution.grade4 += slot.count;
  });

  // Process Main Deck
  mainDeck.forEach(slot => {
    mainDeckCount += slot.count;
    totalCards += slot.count;

    if (slot.card.grade === 0) gradeDistribution.grade0 += slot.count;
    if (slot.card.grade === 1) gradeDistribution.grade1 += slot.count;
    if (slot.card.grade === 2) gradeDistribution.grade2 += slot.count;
    if (slot.card.grade === 3) gradeDistribution.grade3 += slot.count;

    if (slot.card.power) {
      totalPower += slot.card.power * slot.count;
      powerCount += slot.count;
    }

    if (slot.card.shield !== null && slot.card.shield !== undefined) {
      totalShield += slot.card.shield * slot.count;
      shieldCount += slot.count;
    }

    if (slot.card.triggerType) {
      triggerCount += slot.count;
      triggersSummary.total += slot.count;
      switch (slot.card.triggerType) {
        case 'Critical':
          triggersSummary.critical += slot.count;
          break;
        case 'Draw':
          triggersSummary.draw += slot.count;
          break;
        case 'Front':
          triggersSummary.front += slot.count;
          break;
        case 'Heal':
          triggersSummary.heal += slot.count;
          break;
        case 'Over':
          triggersSummary.over += slot.count;
          break;
      }
    }
  });

  totalCards += rideDeck.length;
  if (crest) totalCards += 1;
  gDeck.forEach(s => {
    totalCards += s.count;
  });

  const statistics: DeckStatistics = {
    totalCards,
    mainDeckCount,
    rideDeckCount: rideDeck.length,
    gDeckCount: gDeck.reduce((acc, s) => acc + s.count, 0),
    crestCount: crest ? 1 : 0,
    triggerCount,
    averagePower: powerCount > 0 ? Math.round(totalPower / powerCount) : 0,
    averageShield: shieldCount > 0 ? Math.round(totalShield / shieldCount) : 0,
    totalShield,
    gradeDistribution,
    triggersSummary
  };

  return {
    id: rawDeck.id,
    name: rawDeck.name,
    code: rawDeck.code,
    nation: rawDeck.nation,
    description: rawDeck.description,
    crest,
    rideDeck,
    gDeck,
    mainDeck,
    statistics
  };
}

export function getChronojetDeck(): DeckStructure {
  return buildDeckStructure(rawChronojetDeck);
}

export function getBlasterBladeDeck(): DeckStructure {
  return buildDeckStructure(rawBlasterBladeDeck);
}

export function getDragonicOverlordDeck(): DeckStructure {
  return buildDeckStructure(rawOverlordDeck);
}

export function getHarriDeck(): DeckStructure {
  return buildDeckStructure(rawHarriDeck);
}

export function getDeckById(deckId: string): DeckStructure {
  switch (deckId) {
    case 'dz-ss14-blaster-blade':
      return getBlasterBladeDeck();
    case 'dz-ss15-dragonic-overlord':
      return getDragonicOverlordDeck();
    case 'dz-ss02-harri':
      return getHarriDeck();
    case 'd-ss03-chronojet':
    default:
      return getChronojetDeck();
  }
}
