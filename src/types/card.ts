export type CardGrade = 0 | 1 | 2 | 3 | 4 | null;

export type CardType = 
  | 'Normal Unit' 
  | 'Trigger Unit' 
  | 'G Unit' 
  | 'Crest' 
  | 'Order' 
  | 'Normal Order' 
  | 'Blitz Order';

export type TriggerType = 'Critical' | 'Draw' | 'Front' | 'Heal' | 'Over' | null;

export interface CardFaq {
  question: string;
  answer: string;
}

export interface ArtVariant {
  rarity: string;
  imageUrl: string;
  localImageUrl?: string;
  source?: string;
}

export interface VanguardCard {
  cardNo: string;
  name: string;
  kana?: string;
  rarity: string;
  grade: CardGrade;
  power: number | null;
  shield: number | null;
  critical: number | null;
  nation: string;
  clan: string;
  race: string;
  cardType: CardType;
  triggerType?: TriggerType;
  triggerEffect?: string;
  skillIcon?: string;
  skillText: string;
  flavorText?: string;
  package: string;
  imageUrl: string;
  localImageUrl?: string;
  artVariants?: ArtVariant[];
  faqs?: CardFaq[];
  isRideDeck?: boolean;
  isGUnit?: boolean;
  isCrest?: boolean;
  rideDeckOrder?: number; // 0 for G0, 1 for G1, 2 for G2, 3 for G3
}
