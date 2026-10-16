import { VanguardCard } from './card';

export type CardSlotCategory = 'Grade 4' | 'Grade 3' | 'Grade 2' | 'Grade 1' | 'Grade 0' | 'Trigger' | 'Order';

export type DeckCategory = 'Aggro' | 'Control' | 'Midrange' | 'Combo';

export interface DeckCardSlot {
  card: VanguardCard;
  count: number;
  category?: CardSlotCategory;
}

export interface DeckStatistics {
  totalCards: number;
  mainDeckCount: number;
  rideDeckCount: number;
  gDeckCount: number;
  crestCount: number;
  averagePower: number;
  averageShield: number;
  totalShield: number;
  triggerCount: number;
  triggersSummary: {
    critical: number;
    draw: number;
    front: number;
    heal: number;
    over: number;
    total: number;
  };
  gradeDistribution: {
    grade0: number;
    grade1: number;
    grade2: number;
    grade3: number;
    grade4: number;
  };
}

export interface DeckStructure {
  id: string;
  name: string;
  code: string;
  nation: string;
  category?: DeckCategory;
  categoryDescription?: string;
  playstyle?: string;
  description: string;
  crest: VanguardCard | null;
  rideDeck: VanguardCard[];
  gDeck: DeckCardSlot[];
  mainDeck: DeckCardSlot[];
  statistics: DeckStatistics;
}
