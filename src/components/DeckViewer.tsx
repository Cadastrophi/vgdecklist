import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { DeckStructure } from '../types/deck';
import { PRECON_DECKS } from '../data/preconGuides';
import { 
  ArrowRight, Copy, Check, Sparkles, Search, BookOpen, ChevronDown, ChevronUp, Layers
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

  const guide = PRECON_DECKS.find(g => g.id === deck.id || (deck.id.includes('blaster') && g.id === 'blaster-blade') || (deck.id.includes('overlord') && g.id === 'overlord') || (deck.id.includes('harri') && g.id === 'harri') || (deck.id.includes('chronojet') && g.id === 'chronojet'));

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
    setTimeout(() => setCopied(false), 2200);
  };

  // Group Main Deck into clean categories
  const grade3Cards = deck.mainDeck.filter(s => s.category === 'Grade 3' || (!s.category && s.card.grade === 3));
  const grade2Cards = deck.mainDeck.filter(s => s.category === 'Grade 2' || (!s.category && s.card.grade === 2));
  const grade1Cards = deck.mainDeck.filter(s => s.category?.includes('Grade 1') || (!s.category && s.card.grade === 1));
  const orderCards = deck.mainDeck.filter(s => s.category?.includes('Order') || s.card.cardType.includes('Order'));
  const triggerCards = deck.mainDeck.filter(s => s.category?.includes('Trigger') || s.card.cardType === 'Trigger Unit');

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 animate-in fade-in slide-in-from-bottom">
      
      {/* Primary Mobile Action Topics: Choose Deck & Search Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        
        {/* Choose Deck Button: Solid, Glowing and Vibrating */}
        <button
          onClick={() => {
            playHapticClick(800);
            onOpenDeckCatalog();
          }}
          className="btn-glow-vibrate w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#141824] border-2 border-amber-400 text-left transition pressable shadow-lg"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-300 uppercase block truncate">
                SWITCH DECK (4 AVAILABLE)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                Choose Deck
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-300 flex-shrink-0 pl-2">
            <span className="text-xs font-semibold hidden xs:inline">Browse</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Search Cards Button */}
        <button
          onClick={() => {
            playHapticClick(700);
            onOpenSearchCards();
          }}
          className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0f131f] hover:bg-[#151a2b] border border-white/[0.08] text-left transition pressable"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-sky-400" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider text-sky-400 uppercase block truncate">
                DATABASE & RULINGS
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                Search Cards
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400 flex-shrink-0 pl-2">
            <span className="text-xs font-mono hidden xs:inline">74 Cards</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Deck Hero Overview Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] p-4 sm:p-7 shadow-xl bg-[#0e121d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                {deck.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.08]">
                {deck.nation}
              </span>
              {guide && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-400 bg-white/[0.02]">
                  {guide.clan}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight break-words">
              {deck.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {deck.description}
            </p>
          </div>

          {/* Quick Copy Action */}
          <div className="flex-shrink-0 pt-2 md:pt-0">
            <button
              onClick={handleCopyDecklist}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.1] transition font-medium text-xs sm:text-sm pressable"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Decklist Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Text Decklist</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile-Friendly Stats Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-5 pt-4 border-t border-white/[0.06]">
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">Total</p>
            <p className="text-sm sm:text-base font-bold text-white font-mono">{deck.statistics.totalCards}</p>
          </div>
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">Main</p>
            <p className="text-sm sm:text-base font-bold text-amber-400 font-mono">{deck.statistics.mainDeckCount}</p>
          </div>
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">Ride</p>
            <p className="text-sm sm:text-base font-bold text-sky-400 font-mono">{deck.statistics.rideDeckCount}</p>
          </div>
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">{deck.gDeck.length > 0 ? 'G-Zone' : 'Crest'}</p>
            <p className="text-sm sm:text-base font-bold text-rose-400 font-mono">
              {deck.gDeck.length > 0 ? deck.statistics.gDeckCount : (deck.crest ? 1 : 0)}
            </p>
          </div>
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">Triggers</p>
            <p className="text-sm sm:text-base font-bold text-purple-400 font-mono">{deck.statistics.triggerCount}</p>
          </div>
          <div className="bg-black/20 p-2 sm:p-2.5 rounded-xl border border-white/[0.04] text-center min-w-0 col-span-3 sm:col-span-1">
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase truncate">Avg Power</p>
            <p className="text-sm sm:text-base font-bold text-emerald-400 font-mono">{deck.statistics.averagePower.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Strategy Highlights Accordion */}
      {guide && (
        <div className="rounded-2xl bg-[#0e121d] border border-white/[0.08] overflow-hidden shadow-md">
          <button
            onClick={() => {
              playHapticClick(650);
              setStrategyOpen(!strategyOpen);
            }}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-white/[0.02] transition"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  Deck Strategy & Key Combos
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {guide.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-shrink-0 pl-2">
              <span className="hidden sm:inline">{strategyOpen ? 'Hide' : 'View'} Guide</span>
              {strategyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {strategyOpen && (
            <div className="p-4 pt-1 border-t border-white/[0.06] space-y-3 text-xs text-slate-300 animate-in fade-in">
              <p className="leading-relaxed text-slate-300">
                {guide.overview}
              </p>

              {/* Key Combos */}
              {guide.keyCombos && guide.keyCombos.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase block tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" /> Turn Sequence: {guide.keyCombos[0].name}
                  </span>
                  <div className="rounded-xl bg-black/30 border border-white/[0.05] p-3 space-y-1.5">
                    {guide.keyCombos[0].steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                          {sIdx + 1}
                        </span>
                        <p className="text-slate-300 leading-normal">{st}</p>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 flex-shrink-0"></span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">Ride Deck & Crest Zone</h3>
            <span className="text-xs text-slate-400 font-mono">({deck.rideDeck.length + (deck.crest ? 1 : 0)})</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden xs:inline">Guaranteed Ride</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
          {deck.rideDeck.map((card, idx) => (
            <div 
              key={card.cardNo}
              onClick={() => {
                playHapticClick(700);
                onSelectCard(card);
              }}
              className="group cursor-pointer rounded-2xl bg-[#0e121d] border border-white/[0.07] hover:border-sky-500/50 p-2 space-y-1.5 card-foil pressable shadow-md"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                <img 
                  src={card.localImageUrl || card.imageUrl} 
                  alt={card.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-[9px] font-mono font-bold text-sky-300">
                  G{card.grade}
                </div>
                <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded bg-sky-600/90 text-white text-[8px] font-mono font-bold">
                  STEP {idx}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  {card.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                  <span className="truncate mr-1">{card.cardNo}</span>
                  <span className="text-amber-400 font-semibold">{card.power ? `${card.power.toLocaleString()}` : ''}</span>
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
              className="group cursor-pointer rounded-2xl bg-[#120e1a] border border-purple-500/30 hover:border-purple-400 p-2 space-y-1.5 card-foil pressable shadow-md"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-purple-950/60">
                <img 
                  src={deck.crest.localImageUrl || deck.crest.imageUrl} 
                  alt={deck.crest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-purple-950/80 backdrop-blur-sm border border-purple-400/40 text-[9px] font-mono font-bold text-purple-200">
                  CREST
                </div>
                <div className="absolute bottom-1 left-1 right-1 px-1 py-0.2 rounded bg-black/80 backdrop-blur-sm text-center text-[8px] font-mono text-purple-300">
                  Order Zone
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-purple-200 truncate group-hover:text-purple-100 transition-colors">
                  {deck.crest.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                  <span className="truncate mr-1">{deck.crest.cardNo}</span>
                  <span className="text-purple-300 font-semibold">Crest</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* G-Zone (for Stride decks) */}
      {deck.gDeck.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0"></span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">G-Zone / Stride Units</h3>
              <span className="text-xs text-slate-400 font-mono">
                ({deck.gDeck.reduce((a, b) => a + b.count, 0)})
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden xs:inline">Stride Phase</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {deck.gDeck.map(slot => (
              <div 
                key={slot.card.cardNo}
                onClick={() => {
                  playHapticClick(700);
                  onSelectCard(slot.card);
                }}
                className="group cursor-pointer rounded-2xl bg-[#140c12] border border-rose-900/30 hover:border-rose-500/50 p-2 space-y-1.5 card-foil pressable shadow-md"
              >
                <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                  <img 
                    src={slot.card.localImageUrl || slot.card.imageUrl} 
                    alt={slot.card.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-red-950/80 backdrop-blur-sm border border-red-500/40 text-[9px] font-mono font-bold text-red-300">
                    G4 / STRIDE
                  </div>
                  <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-xs font-mono font-black text-amber-400">
                    x{slot.count}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-rose-300 transition-colors">
                    {slot.card.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                    <span className="truncate mr-1">{slot.card.cardNo}</span>
                    <span className="text-red-400 font-semibold">{slot.card.power?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Deck Breakdown */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0"></span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">Main Deck</h3>
            <span className="text-xs text-slate-400 font-mono">({deck.statistics.mainDeckCount} cards)</span>
          </div>
          <span className="text-[11px] text-slate-400">Tap for card skill</span>
        </div>

        {/* Grade 3 Units */}
        {grade3Cards.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Grade 3 Units ({grade3Cards.reduce((a, b) => a + b.count, 0)})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {grade3Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 2 Units */}
        {grade2Cards.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Grade 2 Units ({grade2Cards.reduce((a, b) => a + b.count, 0)})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {grade2Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 1 Units */}
        {grade1Cards.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Grade 1 Units ({grade1Cards.reduce((a, b) => a + b.count, 0)})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {grade1Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Orders (if present) */}
        {orderCards.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Orders & Regalis Piece ({orderCards.reduce((a, b) => a + b.count, 0)})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {orderCards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Triggers */}
        {triggerCards.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-pink-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              Triggers & Guardians ({triggerCards.reduce((a, b) => a + b.count, 0)})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
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
      className="group cursor-pointer rounded-2xl bg-[#0e121d] border border-white/[0.07] hover:border-white/[0.25] p-2 space-y-1.5 card-foil pressable shadow-md"
    >
      <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
        <img 
          src={card.localImageUrl || card.imageUrl} 
          alt={card.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Count badge */}
        <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-[11px] font-mono font-black text-amber-400 shadow-md">
          x{count}
        </div>

        {/* Grade / Trigger Chip */}
        <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-[9px] font-mono font-bold">
          {card.triggerType ? (
            <span className={
              card.triggerType === 'Over' ? 'text-rose-400' :
              card.triggerType === 'Critical' ? 'text-amber-400' :
              card.triggerType === 'Draw' ? 'text-red-400' :
              card.triggerType === 'Front' ? 'text-pink-400' :
              card.triggerType === 'Heal' ? 'text-emerald-400' : 'text-sky-400'
            }>
              {card.triggerType}
            </span>
          ) : card.grade !== null ? (
            <span className="text-slate-200">G{card.grade}</span>
          ) : (
            <span className="text-purple-300">Order</span>
          )}
        </div>

        {/* Shield badge if present */}
        {card.shield !== null && card.shield !== undefined && (
          <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-cyan-300">
            +{card.shield.toLocaleString()}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
          {card.name}
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5">
          <span className="truncate mr-1">{card.cardNo}</span>
          {card.power ? (
            <span className="text-amber-400 font-semibold">{card.power.toLocaleString()}</span>
          ) : (
            <span className="text-slate-500">-</span>
          )}
        </div>
      </div>
    </div>
  );
};
