import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { DeckStructure } from '../types/deck';
import { 
  ArrowRight, Eye, Flame, Copy, Check
} from 'lucide-react';

interface DeckViewerProps {
  deck: DeckStructure;
  onSelectCard: (card: VanguardCard) => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({ deck, onSelectCard }) => {
  // Interactive Crest simulator: number of face-up cards in G-Zone
  const [faceUpGCount, setFaceUpGCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const crestPowerBonus = faceUpGCount * 5000;

  const handleCopyDecklist = () => {
    let text = `=== ${deck.name} (${deck.code}) ===\nNation: ${deck.nation}\n\n`;
    text += `[Ride Deck - 4 Cards]\n`;
    deck.rideDeck.forEach(c => {
      text += `1x [G${c.grade}] ${c.name} (${c.cardNo})\n`;
    });
    if (deck.crest) {
      text += `\n[Crest]\n1x ${deck.crest.name} (${deck.crest.cardNo})\n`;
    }
    text += `\n[G-Zone - 8 Cards]\n`;
    deck.gDeck.forEach(slot => {
      text += `${slot.count}x [G${slot.card.grade}] ${slot.card.name} (${slot.card.cardNo})\n`;
    });
    text += `\n[Main Deck - 46 Cards]\n`;
    deck.mainDeck.forEach(slot => {
      const typeStr = slot.card.triggerType ? `[${slot.card.triggerType} Trigger]` : `[G${slot.card.grade}]`;
      text += `${slot.count}x ${typeStr} ${slot.card.name} (${slot.card.cardNo})\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group Main Deck into categories
  const grade3Cards = deck.mainDeck.filter(s => s.category === 'Grade 3' || (!s.category && s.card.grade === 3));
  const grade2Cards = deck.mainDeck.filter(s => s.category === 'Grade 2' || (!s.category && s.card.grade === 2));
  const grade1Cards = deck.mainDeck.filter(s => s.category === 'Grade 1' || (!s.category && s.card.grade === 1));
  const triggerCards = deck.mainDeck.filter(s => s.category === 'Trigger' || s.card.cardType === 'Trigger Unit');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Deck Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-800/40 bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {deck.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-purple-950 text-purple-300 border border-purple-800/50">
                {deck.nation}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Pre-constructed Stride Deckset
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-wide">
              {deck.name}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {deck.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleCopyDecklist}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition font-medium text-sm shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Decklist Copied!</span>
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

        {/* Quick Stat Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/60">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">TOTAL CARDS</p>
            <p className="text-lg font-bold text-white font-mono">{deck.statistics.totalCards} cards</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">MAIN DECK</p>
            <p className="text-lg font-bold text-amber-400 font-mono">{deck.statistics.mainDeckCount} cards</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">RIDE DECK</p>
            <p className="text-lg font-bold text-cyan-400 font-mono">{deck.statistics.rideDeckCount} cards</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">G-ZONE / STRIDE</p>
            <p className="text-lg font-bold text-rose-400 font-mono">{deck.statistics.gDeckCount} cards</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">TRIGGERS</p>
            <p className="text-lg font-bold text-purple-400 font-mono">{deck.statistics.triggerCount} cards</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-mono">TOTAL SHIELD</p>
            <p className="text-lg font-bold text-sky-400 font-mono">{(deck.statistics.totalShield / 1000).toFixed(0)}k Shield</p>
          </div>
        </div>
      </div>

      {/* Persistent Crest & Power Scaling Simulator */}
      {deck.crest && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/50 border border-purple-500/40 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Crest Card Visual Preview */}
              <div 
                onClick={() => onSelectCard(deck.crest!)}
                className="w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden border-2 border-purple-400/60 shadow-lg cursor-pointer hover:scale-105 transition-transform shrink-0 relative group"
              >
                <img 
                  src={deck.crest.localImageUrl || deck.crest.imageUrl} 
                  alt={deck.crest.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-purple-900 text-purple-200 border border-purple-600">
                    Crest Zone
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-semibold">{deck.crest.cardNo}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading mt-1">{deck.crest.name}</h3>
                <p className="text-xs text-slate-300 max-w-xl mt-0.5">
                  Grants Stride permission, sets base Vanguard power to 13,000, and scales <strong className="text-amber-400">+5,000 Power</strong> per face-up G-card to Vanguard & all Front Row rear-guards!
                </p>
              </div>
            </div>

            {/* Interactive Simulator Controls */}
            <div className="w-full lg:w-auto bg-slate-950/80 p-4 rounded-xl border border-purple-800/50 flex flex-col sm:flex-row items-center gap-4">
              <div>
                <p className="text-xs font-mono text-slate-400 text-center sm:text-left">
                  SIMULATE FACE-UP G-ZONE:
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 justify-center sm:justify-start">
                  {[0, 1, 2, 3, 4].map(count => (
                    <button
                      key={count}
                      onClick={() => setFaceUpGCount(count)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                        faceUpGCount === count
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/50 scale-105 border border-purple-300'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-10 w-px bg-slate-800 hidden sm:block" />

              <div className="text-center sm:text-left">
                <p className="text-xs font-mono text-slate-400">FRONT ROW POWER BUFF</p>
                <p className="text-2xl font-black font-mono text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                  <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                  +{crestPowerBonus.toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 1: RIDE DECK (4 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xl font-bold font-heading text-white">Ride Deck</h3>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              4 Cards (Guaranteed Progression)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Turn 0 to Turn 3 Sequence
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {deck.rideDeck.map((card, idx) => (
            <div
              key={card.cardNo}
              onClick={() => onSelectCard(card)}
              className="group relative bg-slate-900/70 hover:bg-slate-900 rounded-xl p-3 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div className="relative aspect-[5/7] rounded-lg overflow-hidden mb-2 bg-slate-950">
                <img
                  src={card.localImageUrl || card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-950/90 text-cyan-300 border border-cyan-500/40">
                  Step {idx + 1} • G{card.grade}
                </span>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-950/80 text-amber-300 border border-amber-500/30">
                  {card.power ? `${(card.power / 1000).toFixed(0)}k` : '—'}
                </span>
              </div>
              
              <div>
                <p className="text-xs font-mono text-cyan-400 truncate">{card.cardNo}</p>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {card.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{card.race}</p>
              </div>

              {idx < deck.rideDeck.length - 1 && (
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-950 rounded-full p-1 border border-cyan-800 text-cyan-400">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: G-ZONE / STRIDE DECK (8 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-xl font-bold font-heading text-white">G-Zone / Stride Deck</h3>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-rose-950 text-rose-300 border border-rose-800">
              8 Cards (Triple Drive Stride Bosses)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Max 8 Cards in Standard G-Zone
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deck.gDeck.map((slot) => {
            const card = slot.card;
            return (
              <div
                key={card.cardNo}
                onClick={() => onSelectCard(card)}
                className="group relative bg-gradient-to-r from-slate-900 to-rose-950/20 hover:from-slate-850 rounded-xl p-4 border border-slate-800 hover:border-rose-500/50 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-rose-500/10 flex gap-4"
              >
                <div className="w-24 sm:w-28 aspect-[5/7] rounded-lg overflow-hidden shrink-0 bg-slate-950 relative">
                  <img
                    src={card.localImageUrl || card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-rose-950/90 text-rose-200 border border-rose-600">
                    G4 • STRIDE
                  </span>
                </div>

                <div className="flex flex-col justify-between py-1 flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-rose-400 font-bold">{card.cardNo}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-900/60 text-rose-200 border border-rose-700">
                        {slot.count}x Copies
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors mt-1 font-heading">
                      {card.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-[11px] rounded bg-slate-800 text-slate-300 font-mono">
                        Power: 15,000+
                      </span>
                      <span className="px-2 py-0.5 text-[11px] rounded bg-amber-950/60 text-amber-300 font-mono border border-amber-800/40">
                        Triple Drive
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 mt-2 italic">
                      {card.skillText.substring(0, 110)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                    <span>{card.race}</span>
                    <span className="text-rose-400 font-semibold flex items-center gap-1">
                      Inspect Card <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: MAIN DECK (46 Cards) Categorized */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-xl font-bold font-heading text-white">Main Deck</h3>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              46 Cards (Grades 1-3 & Triggers)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            50 Cards Total with Ride Deck
          </span>
        </div>

        {/* Grade 3 Cards */}
        <div>
          <h4 className="text-sm font-mono font-bold uppercase text-amber-400 tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-amber-500" />
            Grade 3 Attackers & Stride Fodder ({grade3Cards.reduce((acc, s) => acc + s.count, 0)} Cards)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grade3Cards.map(slot => (
              <DeckCardThumbnail key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
            ))}
          </div>
        </div>

        {/* Grade 2 Cards */}
        <div>
          <h4 className="text-sm font-mono font-bold uppercase text-blue-400 tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-blue-500" />
            Grade 2 Interceptors & Engine Attackers ({grade2Cards.reduce((acc, s) => acc + s.count, 0)} Cards)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grade2Cards.map(slot => (
              <DeckCardThumbnail key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
            ))}
          </div>
        </div>

        {/* Grade 1 Cards */}
        <div>
          <h4 className="text-sm font-mono font-bold uppercase text-emerald-400 tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            Grade 1 Boosters, Sentinels & Utilities ({grade1Cards.reduce((acc, s) => acc + s.count, 0)} Cards)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grade1Cards.map(slot => (
              <DeckCardThumbnail key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
            ))}
          </div>
        </div>

        {/* Trigger Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-mono font-bold uppercase text-purple-400 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-purple-500" />
              Trigger Lineup ({triggerCards.reduce((acc, s) => acc + s.count, 0)} Cards)
            </h4>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span className="text-yellow-400 font-semibold">4 Crit</span> /
              <span className="text-red-400 font-semibold">4 Draw</span> /
              <span className="text-orange-400 font-semibold">3 Front</span> /
              <span className="text-emerald-400 font-semibold">4 Heal</span> /
              <span className="text-purple-400 font-semibold">1 Over</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {triggerCards.map(slot => (
              <DeckCardThumbnail key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} isTrigger />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

interface DeckCardThumbnailProps {
  slot: { card: VanguardCard; count: number };
  onSelect: (card: VanguardCard) => void;
  isTrigger?: boolean;
}

const DeckCardThumbnail: React.FC<DeckCardThumbnailProps> = ({ slot, onSelect, isTrigger }) => {
  const { card, count } = slot;

  return (
    <div
      onClick={() => onSelect(card)}
      className="group bg-slate-900/70 hover:bg-slate-900 rounded-xl p-3 border border-slate-800 hover:border-purple-500/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-purple-500/10 flex flex-col justify-between relative"
    >
      {/* Count Badge on Corner */}
      <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500 text-slate-950 shadow-md">
        {count}x
      </span>

      <div className="relative aspect-[5/7] rounded-lg overflow-hidden mb-2 bg-slate-950">
        <img
          src={card.localImageUrl || card.imageUrl}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Grade Badge */}
        {card.grade !== null && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-950/90 text-slate-200 border border-slate-700">
            G{card.grade}
          </span>
        )}

        {/* Trigger Badge */}
        {isTrigger && card.triggerType && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-950/90 text-amber-300 border border-amber-500/40">
            {card.triggerType}
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] font-mono text-purple-400 truncate">{card.cardNo}</p>
        <h5 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
          {card.name}
        </h5>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800">
          <span>{card.power ? `${(card.power / 1000).toFixed(0)}k` : '—'}</span>
          <span>{card.shield !== null && card.shield !== undefined ? `${(card.shield / 1000).toFixed(0)}k` : '0k'}</span>
        </div>
      </div>
    </div>
  );
};
