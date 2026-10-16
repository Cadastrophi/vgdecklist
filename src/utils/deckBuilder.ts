import { VanguardCard } from '../types/card';
import { DeckStructure, DeckCardSlot, DeckStatistics, CardSlotCategory } from '../types/deck';
import rawCards from '../data/cards.json';
import rawDeck from '../data/chronojetDeck.json';

export const allCards: VanguardCard[] = rawCards as VanguardCard[];

export function getChronojetDeck(): DeckStructure {
  const cardMap = new Map<string, VanguardCard>();
  allCards.forEach(c => cardMap.set(c.cardNo, c));

  // Resolve Crest
  const crest = rawDeck.crest ? (cardMap.get(rawDeck.crest) || null) : null;

  // Resolve Ride Deck
  const rideDeck: VanguardCard[] = rawDeck.rideDeck
    .map(cardNo => cardMap.get(cardNo))
    .filter((c): c is VanguardCard => Boolean(c));

  // Resolve G-Deck
  const gDeck: DeckCardSlot[] = [];
  for (const slot of rawDeck.gDeck) {
    const card = cardMap.get(slot.cardNo);
    if (card) {
      gDeck.push({
        card,
        count: slot.count,
        category: 'Grade 4'
      });
    }
  }

  // Resolve Main Deck
  const mainDeck: DeckCardSlot[] = [];
  for (const slot of rawDeck.mainDeck) {
    const card = cardMap.get(slot.cardNo);
    if (card) {
      mainDeck.push({
        card,
        count: slot.count,
        category: slot.category as CardSlotCategory
      });
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
      const t = slot.card.triggerType.toLowerCase();
      if (t === 'critical') triggersSummary.critical += slot.count;
      if (t === 'draw') triggersSummary.draw += slot.count;
      if (t === 'front') triggersSummary.front += slot.count;
      if (t === 'heal') triggersSummary.heal += slot.count;
      if (t === 'over') triggersSummary.over += slot.count;
    }
  });

  const statistics: DeckStatistics = {
    totalCards: mainDeckCount + rideDeck.length + (crest ? 1 : 0) + (gDeck.reduce((acc, s) => acc + s.count, 0)),
    mainDeckCount,
    rideDeckCount: rideDeck.length,
    gDeckCount: gDeck.reduce((acc, s) => acc + s.count, 0),
    crestCount: crest ? 1 : 0,
    averagePower: powerCount > 0 ? Math.round(totalPower / powerCount) : 0,
    averageShield: shieldCount > 0 ? Math.round(totalShield / shieldCount) : 0,
    totalShield,
    triggerCount,
    triggersSummary,
    gradeDistribution
  };

  return {
    id: rawDeck.id || 'd-ss03-chronojet',
    name: rawDeck.name || 'Stride Deckset Chronojet',
    code: rawDeck.code || 'D-SS03',
    nation: rawDeck.nation || 'Dark States',
    description: rawDeck.description || 'Pre-constructed Stride Deck featuring Chronojet Dragon and G-Units Chronodragon Nextage and Faterider Dragon.',
    crest,
    rideDeck,
    gDeck,
    mainDeck,
    statistics
  };
}
