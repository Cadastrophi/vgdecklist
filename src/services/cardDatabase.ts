import type { VanguardCard, ArtVariant } from '../types/card';
import rawCardsData from '../data/cards.json';

// In-memory typed card store
const cards: VanguardCard[] = (rawCardsData as VanguardCard[]) || [];

// Fast lookup map by normalized card number (e.g. "D-SS03/001" or "D-SS03-001")
const cardMap = new Map<string, VanguardCard>();

for (const card of cards) {
  cardMap.set(normalizeCardCode(card.cardNo), card);
}

/**
 * Normalizes user input or code to standard format (e.g. "D-SS03/001" or "D-SS03-001")
 */
export function normalizeCardCode(input: string): string {
  if (!input) return '';
  let clean = input.toUpperCase().trim();
  clean = clean.replace(/_/g, '-');
  return clean;
}

/**
 * Direct lookup by card code
 */
export function getCardByCode(rawCode: string): {
  card: VanguardCard;
  matchedVariant?: ArtVariant;
  confidence?: number;
} | null {
  if (!rawCode) return null;
  const upper = rawCode.toUpperCase().trim();
  const normalized = normalizeCardCode(upper);

  // Match by exact key or variations
  let card = cardMap.get(normalized);
  if (!card) {
    // Try slash vs hyphen variation
    const altSlash = normalized.replace('-', '/');
    const altHyphen = normalized.replace('/', '-');
    card = cardMap.get(altSlash) || cardMap.get(altHyphen);
  }

  if (!card) return null;

  let matchedVariant: ArtVariant | undefined;
  if (card.artVariants && card.artVariants.length > 0) {
    matchedVariant = card.artVariants[0];
  }

  return {
    card,
    matchedVariant,
    confidence: 1.0,
  };
}

/**
 * Multi-field search matching GCG format
 */
export function searchCards(
  query: string,
  filters?: {
    grade?: string | number;
    cardType?: string;
    triggerType?: string;
    race?: string;
  }
): VanguardCard[] {
  const q = query.toLowerCase().trim();

  return cards.filter(card => {
    if (filters?.grade !== undefined && filters.grade !== 'all') {
      if (filters.grade === 'crest') {
        if (card.grade !== null) return false;
      } else if (String(card.grade) !== String(filters.grade)) {
        return false;
      }
    }

    if (filters?.cardType && filters.cardType !== 'all') {
      if (card.cardType !== filters.cardType) return false;
    }

    if (filters?.triggerType && filters.triggerType !== 'all') {
      if (filters.triggerType === 'none') {
        if (card.triggerType) return false;
      } else if (card.triggerType !== filters.triggerType) {
        return false;
      }
    }

    if (filters?.race && filters.race !== 'all') {
      if (card.race !== filters.race) return false;
    }

    if (!q) return true;

    const matchesNo = card.cardNo.toLowerCase().includes(q);
    const matchesName = card.name.toLowerCase().includes(q);
    const matchesRace = card.race.toLowerCase().includes(q);
    const matchesSkill = card.skillText.toLowerCase().includes(q);
    const matchesClan = card.clan.toLowerCase().includes(q);

    return matchesNo || matchesName || matchesRace || matchesSkill || matchesClan;
  });
}

export function getAllCards(): VanguardCard[] {
  return cards;
}

export function getAllRaces(): string[] {
  const races = new Set<string>();
  for (const c of cards) {
    if (c.race) races.add(c.race);
  }
  return Array.from(races);
}

export function getAllGrades(): (number | string)[] {
  const grades = new Set<number | string>();
  for (const c of cards) {
    if (c.grade !== null) grades.add(c.grade);
    else grades.add('Crest');
  }
  return Array.from(grades);
}
