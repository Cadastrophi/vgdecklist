import React, { useState, useMemo } from 'react';
import { AVAILABLE_DECKS, getDeckById } from '../utils/deckBuilder';
import { 
  ArrowRight, Check, Search
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
    { value: 'Energy', label: 'Start Decks' }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in">
      
      {/* Editorial Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Decks
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Curated tournament pre-constructed decks for Cardfight!! Vanguard Standard (D & DZ Series). Select a deck to view its full lineup and ride line.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Nation Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">
              Nation:
            </span>
            {nations.map(nat => (
              <button
                key={nat}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedNation(nat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors pressable ${
                  selectedNation === nat
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {nat === 'all' ? 'All Nations' : nat}
              </button>
            ))}
          </div>

          {/* Format Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">
              Format:
            </span>
            {formats.map(fmt => (
              <button
                key={fmt.value}
                onClick={() => {
                  playHapticClick(650);
                  setSelectedFormat(fmt.value);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors pressable ${
                  selectedFormat === fmt.value
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search decks by boss (Overlord, Harri, Chronojet, Blaster), clan, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
          />
        </div>

        {/* Results Counter */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
          <span>Showing <strong className="text-zinc-200 font-mono">{filteredDecks.length}</strong> of {AVAILABLE_DECKS.length} Pre-con Decklists</span>
          <span className="font-mono text-[10px] text-zinc-600">Standard D & DZ Series</span>
        </div>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredDecks.map(deckItem => {
          const isSelected = deckItem.id === activeDeckId;
          const { fullDeck } = deckItem;
          const bossCard = fullDeck.rideDeck[fullDeck.rideDeck.length - 1];

          return (
            <div
              key={deckItem.id}
              className={`rounded-2xl bg-[#111215] border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between space-y-5 ${
                isSelected 
                  ? 'border-zinc-400/60 ring-1 ring-zinc-400/40' 
                  : 'border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white/[0.06] border border-white/[0.1] text-zinc-300">
                        {deckItem.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                        {deckItem.nation}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                        {deckItem.clan}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-words">
                      {deckItem.name}
                    </h2>
                  </div>

                  {bossCard && (
                    <div className="w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-zinc-900 border border-white/[0.1] flex-shrink-0">
                      <img 
                        src={bossCard.localImageUrl || bossCard.imageUrl} 
                        alt={bossCard.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {deckItem.description}
                </p>

                {/* Key Boss & Format info */}
                <div className="rounded-lg bg-black/40 border border-white/[0.05] p-3 text-xs space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Vanguard Boss:</span>
                    <span className="text-zinc-200 font-medium truncate ml-2">{deckItem.keyBoss}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Format / Type:</span>
                    <span className="text-zinc-300 truncate ml-2">{deckItem.format}</span>
                  </div>
                </div>

                {/* Deck Statistics Quick Strip */}
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                    <span className="text-[10px] text-zinc-500 font-mono block">TOTAL</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{fullDeck.statistics.totalCards}</span>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                    <span className="text-[10px] text-zinc-500 font-mono block">MAIN</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 font-mono">{fullDeck.statistics.mainDeckCount}</span>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                    <span className="text-[10px] text-zinc-500 font-mono block">{fullDeck.gDeck.length > 0 ? 'G-ZONE' : 'CREST'}</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 font-mono">
                      {fullDeck.gDeck.length > 0 ? fullDeck.statistics.gDeckCount : '1'}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                    <span className="text-[10px] text-zinc-500 font-mono block">TRIGGERS</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 font-mono">{fullDeck.statistics.triggerCount}</span>
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
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-colors pressable ${
                    isSelected
                      ? 'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1]'
                  }`}
                >
                  <span>{isSelected ? 'Open Active Deck' : 'Select Deck'}</span>
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
