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
    { value: 'Stride', label: 'Stride Decksets' },
    { value: 'Energy', label: 'Break Away Start Decks' }
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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#141b30] to-[#0c0f1a] border border-white/[0.1] p-4 sm:p-7 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Deck Selection Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide break-words">
            Choose Deck
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Select an authentic Vanguard deck to load its full card lineup, ride line, and strategic piloting guide.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-[#0e1322] border border-white/[0.08] p-3.5 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Nation Pills with Wrapping */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-amber-400" /> Nation:
            </span>
            {nations.map(nat => (
              <button
                key={nat}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedNation(nat);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all pressable ${
                  selectedNation === nat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {nat === 'all' ? 'All Nations' : nat}
              </button>
            ))}
          </div>

          {/* Format / Type Pills with Wrapping */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase hidden sm:inline">Format:</span>
            {formats.map(fmt => (
              <button
                key={fmt.value}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedFormat(fmt.value);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all pressable ${
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
            placeholder="Search decks by boss (Overlord, Harri, Chronojet, Blaster), clan, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Results Counter */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white font-mono">{filteredDecks.length}</strong> of {AVAILABLE_DECKS.length} Pre-con Decklists</span>
          <span className="font-mono text-[10px] text-slate-500">Standard D & DZ Series</span>
        </div>
      </div>

      {/* Decks Grid with Clean Mobile Wrapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredDecks.map(deckItem => {
          const isSelected = deckItem.id === activeDeckId;
          const { fullDeck } = deckItem;

          // Border & Glow styling depending on archetype
          const getThemeStyles = () => {
            switch (deckItem.themeColor) {
              case 'purple':
                return {
                  cardBorder: isSelected ? 'border-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.3)]' : 'border-purple-900/40 hover:border-purple-500/50',
                  badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                  accent: 'from-amber-500 to-purple-600',
                  bgGradient: 'from-[#0e101f] to-[#120f26]'
                };
              case 'blue':
                return {
                  cardBorder: isSelected ? 'border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]' : 'border-blue-900/40 hover:border-sky-500/50',
                  badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
                  accent: 'from-blue-600 to-sky-400',
                  bgGradient: 'from-[#0d1424] to-[#0f1d38]'
                };
              case 'red':
                return {
                  cardBorder: isSelected ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'border-red-900/40 hover:border-rose-500/50',
                  badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
                  accent: 'from-rose-600 to-amber-500',
                  bgGradient: 'from-[#1a0e14] to-[#261019]'
                };
              case 'magenta':
                return {
                  cardBorder: isSelected ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'border-pink-900/40 hover:border-pink-500/50',
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
              className={`rounded-3xl bg-gradient-to-br ${styles.bgGradient} border ${styles.cardBorder} p-4 sm:p-6 shadow-2xl transition-all duration-200 flex flex-col justify-between space-y-4 relative overflow-hidden`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1 shadow-sm">
                  <Check className="w-3 h-3" />
                  ACTIVE DECK
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border ${styles.badge}`}>
                        {deckItem.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08]">
                        {deckItem.nation}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-white/[0.02]">
                        {deckItem.clan}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-extrabold text-white font-heading break-words">
                      {deckItem.name}
                    </h3>
                  </div>

                  {bossCard && (
                    <div className="w-14 h-20 sm:w-20 sm:h-28 rounded-xl overflow-hidden bg-slate-900 border border-white/[0.1] shadow-lg flex-shrink-0">
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
                <div className="rounded-xl bg-black/30 border border-white/[0.06] p-2.5 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Vanguard Boss:</span>
                    <span className="text-amber-300 font-semibold truncate ml-2">{deckItem.keyBoss}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Format / Type:</span>
                    <span className="text-sky-300 truncate ml-2">{deckItem.format}</span>
                  </div>
                </div>

                {/* Deck Statistics Quick Strip */}
                <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[9px] text-slate-400 font-mono block">TOTAL</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{fullDeck.statistics.totalCards}</span>
                  </div>
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[9px] text-slate-400 font-mono block">MAIN</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono">{fullDeck.statistics.mainDeckCount}</span>
                  </div>
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[9px] text-slate-400 font-mono block">{fullDeck.gDeck.length > 0 ? 'G-ZONE' : 'CREST'}</span>
                    <span className="text-xs sm:text-sm font-bold text-rose-400 font-mono">
                      {fullDeck.gDeck.length > 0 ? fullDeck.statistics.gDeckCount : '1 Crest'}
                    </span>
                  </div>
                  <div className="bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[9px] text-slate-400 font-mono block">TRIGGERS</span>
                    <span className="text-xs sm:text-sm font-bold text-purple-400 font-mono">{fullDeck.statistics.triggerCount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    playHapticClick(800);
                    onSelectDeck(deckItem.id);
                    onNavigateToDeckView();
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all pressable ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-950/40'
                      : `bg-gradient-to-r ${styles.accent} text-white shadow-lg`
                  }`}
                >
                  <span>{isSelected ? 'Open Deck View' : 'Select This Deck'}</span>
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
