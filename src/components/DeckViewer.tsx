import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { DeckStructure } from '../types/deck';
import { PRECON_DECKS } from '../data/preconGuides';
import { 
  Copy, Check, Search, BookOpen, ChevronDown, ChevronUp, LayoutGrid
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface DeckViewerProps {
  deck: DeckStructure;
  onSelectCard: (card: VanguardCard) => void;
  onOpenDeckCatalog: () => void;
  onOpenSearchCards: () => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({ 
  deck, 
  onSelectCard, 
  onOpenDeckCatalog,
  onOpenSearchCards
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [strategyOpen, setStrategyOpen] = useState<boolean>(false);

  const guide = PRECON_DECKS.find(g => 
    g.id === deck.id || 
    (deck.id.includes('blaster') && g.id === 'blaster-blade') || 
    (deck.id.includes('overlord') && g.id === 'overlord') || 
    (deck.id.includes('harri') && g.id === 'harri') || 
    (deck.id.includes('chronojet') && g.id === 'chronojet')
  );

  const handleCopyDecklist = () => {
    playHapticClick(850);
    let text = `=== ${deck.name} (${deck.code}) ===\nNation: ${deck.nation}\n\n`;
    text += `[Ride Deck - ${deck.rideDeck.length} Cards]\n`;
    deck.rideDeck.forEach(c => {
      text += `1x [G${c.grade}] ${c.name} (${c.cardNo})\n`;
    });
    if (deck.crest) {
      text += `\n[Crest]\n1x ${deck.crest.name} (${deck.crest.cardNo})\n`;
    }
    if (deck.gDeck.length > 0) {
      text += `\n[G-Zone - ${deck.gDeck.reduce((a, b) => a + b.count, 0)} Cards]\n`;
      deck.gDeck.forEach(slot => {
        text += `${slot.count}x [G${slot.card.grade}] ${slot.card.name} (${slot.card.cardNo})\n`;
      });
    }
    text += `\n[Main Deck - ${deck.statistics.mainDeckCount} Cards]\n`;
    deck.mainDeck.forEach(slot => {
      const typeStr = slot.card.triggerType ? `[${slot.card.triggerType} Trigger]` : `[G${slot.card.grade}]`;
      text += `${slot.count}x ${typeStr} ${slot.card.name} (${slot.card.cardNo})\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group Main Deck into clean categories
  const grade3Cards = deck.mainDeck.filter(s => s.category === 'Grade 3' || (!s.category && s.card.grade === 3));
  const grade2Cards = deck.mainDeck.filter(s => s.category === 'Grade 2' || (!s.category && s.card.grade === 2));
  const grade1Cards = deck.mainDeck.filter(s => s.category?.includes('Grade 1') || (!s.category && s.card.grade === 1));
  const orderCards = deck.mainDeck.filter(s => s.category?.includes('Order') || s.card.cardType.includes('Order'));
  const triggerCards = deck.mainDeck.filter(s => s.category?.includes('Trigger') || s.card.cardType === 'Trigger Unit');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in">
      
      {/* Editorial Deck Header */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#111215] p-5 sm:p-7 space-y-6">
        
        {/* Top Meta & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="space-y-3 min-w-0">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white/[0.06] border border-white/[0.1] text-zinc-300">
                {deck.code}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                {deck.nation}
              </span>
              {guide && (
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                  {guide.clan}
                </span>
              )}
              <span className="text-[11px] text-zinc-500 font-mono">
                Standard D & DZ Series
              </span>
            </div>

            {/* Deck Title */}
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {deck.name}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
              {deck.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0 pt-1 md:pt-0">
            <button
              onClick={() => {
                playHapticClick(800);
                onOpenDeckCatalog();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm transition-colors pressable"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Choose Deck</span>
            </button>

            <button
              onClick={handleCopyDecklist}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/[0.08] transition-colors font-medium text-xs sm:text-sm pressable"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy List</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                playHapticClick(700);
                onOpenSearchCards();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] transition-colors text-xs font-medium pressable"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Database</span>
            </button>
          </div>
        </div>

        {/* Minimal Hairline Stats Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4 border-t border-white/[0.06]">
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Total</p>
            <p className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">{deck.statistics.totalCards}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Main Deck</p>
            <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono mt-0.5">{deck.statistics.mainDeckCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Ride Deck</p>
            <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono mt-0.5">{deck.statistics.rideDeckCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              {deck.gDeck.length > 0 ? 'G-Zone' : 'Crest'}
            </p>
            <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono mt-0.5">
              {deck.gDeck.length > 0 ? deck.statistics.gDeckCount : (deck.crest ? 1 : 0)}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Triggers</p>
            <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono mt-0.5">{deck.statistics.triggerCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center col-span-3 sm:col-span-1">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Avg Power</p>
            <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono mt-0.5">
              {deck.statistics.averagePower.toLocaleString()}
            </p>
          </div>
        </div>

      </div>

      {/* Strategy Highlights Accordion */}
      {guide && (
        <div className="rounded-xl bg-[#111215] border border-white/[0.08] overflow-hidden">
          <button
            onClick={() => {
              playHapticClick(650);
              setStrategyOpen(!strategyOpen);
            }}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-white block truncate">
                  Strategy & Piloting Notes
                </span>
                <span className="text-[11px] text-zinc-500 block truncate">
                  {guide.tagline}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 flex-shrink-0 pl-2">
              <span className="hidden sm:inline">{strategyOpen ? 'Collapse' : 'Expand'}</span>
              {strategyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {strategyOpen && (
            <div className="p-4 sm:p-5 pt-2 border-t border-white/[0.06] space-y-4 text-xs text-zinc-300">
              <p className="leading-relaxed text-zinc-400">
                {guide.overview}
              </p>

              {guide.keyCombos && guide.keyCombos.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-medium">
                    Turn Sequence · {guide.keyCombos[0].name}
                  </span>
                  <div className="rounded-lg bg-black/40 border border-white/[0.05] p-3 space-y-2">
                    {guide.keyCombos[0].steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5">
                        <span className="font-mono text-[10px] text-zinc-500 font-semibold mt-0.5">
                          {String(sIdx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-zinc-300 leading-normal">{st}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Ride Deck & Crest Zone */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Ride Line & Crest
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              ({deck.rideDeck.length + (deck.crest ? 1 : 0)})
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-mono hidden xs:inline">Guaranteed Ride</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {deck.rideDeck.map((card, idx) => (
            <div 
              key={card.cardNo}
              onClick={() => {
                playHapticClick(700);
                onSelectCard(card);
              }}
              className="group cursor-pointer rounded-xl bg-[#111215] border border-white/[0.07] hover:border-white/20 p-2 space-y-2 card-hover pressable"
            >
              <div className="relative aspect-[7/10] rounded-lg overflow-hidden bg-zinc-900">
                <img 
                  src={card.localImageUrl || card.imageUrl} 
                  alt={card.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-zinc-200">
                  G{card.grade}
                </div>
                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-zinc-400">
                  STEP {idx}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-white transition-colors">
                  {card.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-0.5">
                  <span className="truncate mr-1">{card.cardNo}</span>
                  <span className="text-zinc-300 font-medium">{card.power ? card.power.toLocaleString() : ''}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Crest Card */}
          {deck.crest && (
            <div 
              onClick={() => {
                playHapticClick(700);
                onSelectCard(deck.crest!);
              }}
              className="group cursor-pointer rounded-xl bg-[#111215] border border-white/[0.07] hover:border-white/20 p-2 space-y-2 card-hover pressable"
            >
              <div className="relative aspect-[7/10] rounded-lg overflow-hidden bg-zinc-900">
                <img 
                  src={deck.crest.localImageUrl || deck.crest.imageUrl} 
                  alt={deck.crest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-zinc-200">
                  CREST
                </div>
                <div className="absolute bottom-1 left-1 right-1 px-1 py-0.5 rounded bg-black/80 backdrop-blur-sm text-center text-[8px] font-mono text-zinc-400">
                  Order Zone
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-white transition-colors">
                  {deck.crest.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-0.5">
                  <span className="truncate mr-1">{deck.crest.cardNo}</span>
                  <span className="text-zinc-400">Crest</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* G-Zone (for Stride decks) */}
      {deck.gDeck.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                G-Zone / Stride Units
              </h2>
              <span className="text-xs text-zinc-500 font-mono">
                ({deck.gDeck.reduce((a, b) => a + b.count, 0)})
              </span>
            </div>
            <span className="text-xs text-zinc-500 font-mono hidden xs:inline">Stride Phase</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {deck.gDeck.map(slot => (
              <div 
                key={slot.card.cardNo}
                onClick={() => {
                  playHapticClick(700);
                  onSelectCard(slot.card);
                }}
                className="group cursor-pointer rounded-xl bg-[#111215] border border-white/[0.07] hover:border-white/20 p-2 space-y-2 card-hover pressable"
              >
                <div className="relative aspect-[7/10] rounded-lg overflow-hidden bg-zinc-900">
                  <img 
                    src={slot.card.localImageUrl || slot.card.imageUrl} 
                    alt={slot.card.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-zinc-200">
                    G4
                  </div>
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono font-bold text-zinc-100">
                    {slot.count}×
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-white transition-colors">
                    {slot.card.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-0.5">
                    <span className="truncate mr-1">{slot.card.cardNo}</span>
                    <span className="text-zinc-300 font-medium">{slot.card.power?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Deck Breakdown */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Main Deck
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              ({deck.statistics.mainDeckCount} cards)
            </span>
          </div>
          <span className="text-xs text-zinc-500">Tap card for details</span>
        </div>

        {/* Grade 3 Units */}
        {grade3Cards.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Grade 3 Units · {grade3Cards.reduce((a, b) => a + b.count, 0)}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {grade3Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 2 Units */}
        {grade2Cards.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Grade 2 Units · {grade2Cards.reduce((a, b) => a + b.count, 0)}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {grade2Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 1 Units */}
        {grade1Cards.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Grade 1 Units · {grade1Cards.reduce((a, b) => a + b.count, 0)}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {grade1Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {orderCards.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Orders · {orderCards.reduce((a, b) => a + b.count, 0)}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {orderCards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Triggers */}
        {triggerCards.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Triggers & Guardians · {triggerCards.reduce((a, b) => a + b.count, 0)}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {triggerCards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

interface CardSlotTileProps {
  slot: { card: VanguardCard; count: number; category?: string };
  onSelect: (card: VanguardCard) => void;
}

const CardSlotTile: React.FC<CardSlotTileProps> = ({ slot, onSelect }) => {
  const { card, count } = slot;

  return (
    <div 
      onClick={() => {
        playHapticClick(700);
        onSelect(card);
      }}
      className="group cursor-pointer rounded-xl bg-[#111215] border border-white/[0.07] hover:border-white/20 p-2 space-y-2 card-hover pressable"
    >
      <div className="relative aspect-[7/10] rounded-lg overflow-hidden bg-zinc-900">
        <img 
          src={card.localImageUrl || card.imageUrl} 
          alt={card.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        
        {/* Count badge */}
        <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono font-bold text-zinc-100">
          {count}×
        </div>

        {/* Grade / Trigger Chip */}
        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-zinc-300">
          {card.triggerType ? card.triggerType.toUpperCase() : `G${card.grade ?? 0}`}
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-white transition-colors">
          {card.name}
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-0.5">
          <span className="truncate mr-1">{card.cardNo}</span>
          <span className="text-zinc-300 font-medium">
            {card.power ? card.power.toLocaleString() : (card.shield ? `+${card.shield.toLocaleString()}` : '')}
          </span>
        </div>
      </div>
    </div>
  );
};
