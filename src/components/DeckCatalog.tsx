import React, { useState, useMemo } from 'react';
import { AVAILABLE_DECKS, getDeckById } from '../utils/deckBuilder';
import { 
  Sparkles, Filter, ArrowRight, Check, Search
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface DeckCatalogProps {
  activeDeckId: string;
  onSelectDeck: (deckId: string) => void;
  onNavigateToDeckView: () => void;
}

export const DeckCatalog: React.FC<DeckCatalogProps> = ({
  activeDeckId,
  onSelectDeck,
  onNavigateToDeckView
}) => {
  const [selectedNation, setSelectedNation] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const nations = ['all', 'Dark States', 'Keter Sanctuary', 'Dragon Empire'];
  const formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'Stride', label: 'Stride / Crest Decksets' },
    { value: 'Energy', label: 'Break Away / Energy Generator' }
  ];

  // Preload statistics for all decks
  const decksWithStats = useMemo(() => {
    return AVAILABLE_DECKS.map(deckSummary => {
      const fullDeck = getDeckById(deckSummary.id);
      return {
        ...deckSummary,
        fullDeck
      };
    });
  }, []);

  const filteredDecks = useMemo(() => {
    return decksWithStats.filter(deck => {
      // Nation filter
      if (selectedNation !== 'all' && deck.nation !== selectedNation) return false;

      // Format filter
      if (selectedFormat !== 'all') {
        if (selectedFormat === 'Stride' && !deck.format.includes('Stride')) return false;
        if (selectedFormat === 'Energy' && !deck.format.includes('Energy')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = deck.name.toLowerCase().includes(q);
        const matchBoss = deck.keyBoss.toLowerCase().includes(q);
        const matchClan = deck.clan.toLowerCase().includes(q);
        const matchCode = deck.code.toLowerCase().includes(q);
        if (!matchName && !matchBoss && !matchClan && !matchCode) return false;
      }

      return true;
    });
  }, [decksWithStats, selectedNation, selectedFormat, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#141b30] to-[#0c0f1a] border border-white/[0.1] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Deck Selection & Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            Choose & Filter Decklists
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Filter through authentic Vanguard pre-constructed decks. Compare card counts, ride lines, boss mechanics, and select any decklist to inspect its full lineup and interactive engine simulator.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-[#0e1322] border border-white/[0.08] p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Nation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> Nation:
            </span>
            {nations.map(nat => (
              <button
                key={nat}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedNation(nat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all pressable ${
                  selectedNation === nat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {nat === 'all' ? 'All Nations' : nat}
              </button>
            ))}
          </div>

          {/* Format / Type Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase hidden sm:inline">Format:</span>
            {formats.map(fmt => (
              <button
                key={fmt.value}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedFormat(fmt.value);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all pressable ${
                  selectedFormat === fmt.value
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search decks by boss (Overlord, Harri, Chronojet, Alfred), clan, or deck code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Results Counter */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white font-mono">{filteredDecks.length}</strong> of {AVAILABLE_DECKS.length} Pre-con Decklists</span>
          <span className="font-mono text-[11px] text-slate-500">Standard Divinez & D-Series</span>
        </div>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDecks.map(deckItem => {
          const isSelected = deckItem.id === activeDeckId;
          const { fullDeck } = deckItem;

          // Border & Glow styling depending on archetype
          const getThemeStyles = () => {
            switch (deckItem.themeColor) {
              case 'purple':
                return {
                  cardBorder: isSelected ? 'border-amber-500 shadow-[0_0_25px_rgba(217,119,6,0.3)]' : 'border-purple-900/40 hover:border-purple-500/50',
                  badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                  accent: 'from-amber-500 to-purple-600',
                  bgGradient: 'from-[#0e101f] to-[#120f26]'
                };
              case 'blue':
                return {
                  cardBorder: isSelected ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.3)]' : 'border-blue-900/40 hover:border-sky-500/50',
                  badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
                  accent: 'from-blue-600 to-sky-400',
                  bgGradient: 'from-[#0d1424] to-[#0f1d38]'
                };
              case 'red':
                return {
                  cardBorder: isSelected ? 'border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.3)]' : 'border-red-900/40 hover:border-rose-500/50',
                  badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
                  accent: 'from-rose-600 to-amber-500',
                  bgGradient: 'from-[#1a0e14] to-[#261019]'
                };
              case 'magenta':
                return {
                  cardBorder: isSelected ? 'border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.3)]' : 'border-pink-900/40 hover:border-pink-500/50',
                  badge: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
                  accent: 'from-pink-600 to-purple-600',
                  bgGradient: 'from-[#170e20] to-[#24102e]'
                };
            }
          };

          const styles = getThemeStyles();
          const bossCard = fullDeck.rideDeck[fullDeck.rideDeck.length - 1];

          return (
            <div
              key={deckItem.id}
              className={`rounded-3xl bg-gradient-to-br ${styles.bgGradient} border ${styles.cardBorder} p-6 sm:p-7 shadow-2xl transition-all duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1 shadow-sm">
                  <Check className="w-3.5 h-3.5" />
                  CURRENT ACTIVE DECK
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${styles.badge}`}>
                        {deckItem.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08]">
                        {deckItem.nation}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-400 bg-white/[0.02]">
                        {deckItem.clan}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                      {deckItem.name}
                    </h3>
                  </div>

                  {bossCard && (
                    <div className="w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden bg-slate-900 border border-white/[0.1] shadow-lg flex-shrink-0">
                      <img 
                        src={bossCard.localImageUrl || bossCard.imageUrl} 
                        alt={bossCard.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {deckItem.description}
                </p>

                {/* Key Boss & Format info */}
                <div className="rounded-xl bg-black/30 border border-white/[0.06] p-3 text-xs space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Key Vanguard / Boss:</span>
                    <span className="text-amber-300 font-semibold">{deckItem.keyBoss}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Format & Engine:</span>
                    <span className="text-sky-300">{deckItem.format}</span>
                  </div>
                </div>

                {/* Deck Statistics Quick Strip */}
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-400 font-mono block">TOTAL</span>
                    <span className="text-sm font-bold text-white font-mono">{fullDeck.statistics.totalCards}</span>
                  </div>
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-400 font-mono block">MAIN</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">{fullDeck.statistics.mainDeckCount}</span>
                  </div>
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-400 font-mono block">{fullDeck.gDeck.length > 0 ? 'G-ZONE' : 'CREST'}</span>
                    <span className="text-sm font-bold text-rose-400 font-mono">
                      {fullDeck.gDeck.length > 0 ? fullDeck.statistics.gDeckCount : '1 Crest'}
                    </span>
                  </div>
                  <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-400 font-mono block">TRIGGERS</span>
                    <span className="text-sm font-bold text-purple-400 font-mono">{fullDeck.statistics.triggerCount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    playHapticClick(800);
                    onSelectDeck(deckItem.id);
                    onNavigateToDeckView();
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all pressable ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-950/40'
                      : `bg-gradient-to-r ${styles.accent} text-white shadow-lg`
                  }`}
                >
                  <span>{isSelected ? 'Open Deck View' : 'Select & View Deck'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
