import React, { useState, useMemo } from 'react';
import { VanguardCard } from '../types/card';
import { 
  Search, X, LayoutGrid, List
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface CardExplorerProps {
  cards: VanguardCard[];
  onSelectCard: (card: VanguardCard) => void;
}

export const CardExplorer: React.FC<CardExplorerProps> = ({ cards, onSelectCard }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedClan, setSelectedClan] = useState<string>('all');
  const [selectedDeck, setSelectedDeck] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filtered Cards logic
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Deck package filter
      if (selectedDeck !== 'all') {
        if (selectedDeck === 'chronojet' && !card.cardNo.startsWith('D-SS03')) return false;
        if (selectedDeck === 'blaster' && !card.cardNo.startsWith('DZ-SS14')) return false;
        if (selectedDeck === 'overlord' && !card.cardNo.startsWith('DZ-SS15')) return false;
        if (selectedDeck === 'harri' && !card.cardNo.startsWith('DZ-SS02')) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = card.name.toLowerCase().includes(q);
        const matchNo = card.cardNo.toLowerCase().includes(q);
        const matchClan = card.clan?.toLowerCase().includes(q) || false;
        const matchNation = card.nation.toLowerCase().includes(q);
        const matchSkill = card.skillText.toLowerCase().includes(q);
        const matchRace = card.race?.toLowerCase().includes(q) || false;

        if (!matchName && !matchNo && !matchClan && !matchNation && !matchSkill && !matchRace) {
          return false;
        }
      }

      // Grade filter
      if (selectedGrade !== 'all') {
        if (selectedGrade === 'crest') {
          if (card.cardType !== 'Crest') return false;
        } else {
          const gNum = parseInt(selectedGrade, 10);
          if (card.grade !== gNum) return false;
        }
      }

      // Card Type filter
      if (selectedType !== 'all') {
        if (selectedType === 'Trigger') {
          if (card.cardType !== 'Trigger Unit') return false;
        } else if (selectedType === 'Normal') {
          if (card.cardType !== 'Normal Unit') return false;
        } else if (selectedType === 'G Unit') {
          if (card.cardType !== 'G Unit') return false;
        } else if (selectedType === 'Crest') {
          if (card.cardType !== 'Crest') return false;
        } else if (selectedType === 'Order') {
          if (!card.cardType.includes('Order')) return false;
        }
      }

      // Clan filter
      if (selectedClan !== 'all' && card.clan !== selectedClan) {
        return false;
      }

      return true;
    });
  }, [cards, searchQuery, selectedDeck, selectedGrade, selectedType, selectedClan]);

  const uniqueClans = useMemo(() => {
    const clans = new Set<string>();
    cards.forEach(c => {
      if (c.clan) clans.add(c.clan);
    });
    return Array.from(clans).sort();
  }, [cards]);

  const handleResetFilters = () => {
    playHapticClick(600);
    setSearchQuery('');
    setSelectedDeck('all');
    setSelectedGrade('all');
    setSelectedType('all');
    setSelectedClan('all');
  };

  const hasActiveFilters = searchQuery || selectedDeck !== 'all' || selectedGrade !== 'all' || selectedType !== 'all' || selectedClan !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in">
      
      {/* Editorial Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Card Database
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Browse and search all cards from indexed pre-constructed decks with official card texts, trigger types, and rulings.
        </p>
      </div>

      {/* Search and Filters Header */}
      <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by card name, skill text, clan, or race..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter dropdowns in responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          
          {/* Deck Package Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase">Deck</label>
            <select
              value={selectedDeck}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedDeck(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
            >
              <option value="all">All Decks ({cards.length})</option>
              <option value="chronojet">Chronojet (D-SS03)</option>
              <option value="blaster">Blaster Blade (DZ-SS14)</option>
              <option value="overlord">Dragonic Overlord (DZ-SS15)</option>
              <option value="harri">Harri (DZ-SS02)</option>
            </select>
          </div>

          {/* Grade Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedGrade(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
            >
              <option value="all">All Grades</option>
              <option value="4">Grade 4 (Stride)</option>
              <option value="3">Grade 3</option>
              <option value="2">Grade 2</option>
              <option value="1">Grade 1</option>
              <option value="0">Grade 0</option>
              <option value="crest">Crest</option>
            </select>
          </div>

          {/* Card Type Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase">Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedType(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
            >
              <option value="all">All Types</option>
              <option value="Normal">Normal Unit</option>
              <option value="Trigger">Trigger Unit</option>
              <option value="G Unit">G Unit (Stride)</option>
              <option value="Crest">Crest</option>
              <option value="Order">Order Card</option>
            </select>
          </div>

          {/* Clan Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase">Clan</label>
            <select
              value={selectedClan}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedClan(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
            >
              <option value="all">All Clans</option>
              {uniqueClans.map(clan => (
                <option key={clan} value={clan}>{clan}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase">Layout</label>
            <div className="flex rounded-lg bg-black/40 border border-white/[0.08] p-0.5">
              <button
                onClick={() => {
                  playHapticClick(650);
                  setViewMode('grid');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => {
                  playHapticClick(650);
                  setViewMode('table');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  viewMode === 'table'
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

        </div>

        {/* Filter Status & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs text-zinc-500">
          <div>
            Found <span className="text-zinc-200 font-bold font-mono">{filteredCards.length}</span> cards
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-zinc-400 hover:text-white font-mono transition-colors pressable"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredCards.map((card) => (
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
                
                {/* Grade Badge */}
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono font-medium text-zinc-200">
                  {card.cardType === 'Crest' ? (
                    <span>CREST</span>
                  ) : card.triggerType ? (
                    <span>{card.triggerType.toUpperCase()}</span>
                  ) : (
                    <span>G{card.grade ?? 0}</span>
                  )}
                </div>

                {/* Nation / Clan badge */}
                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-zinc-400">
                  {card.clan || card.nation.split(' ')[0]}
                </div>

                {/* Shield badge */}
                {card.shield !== null && card.shield !== undefined && (
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-zinc-300">
                    +{card.shield.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-100 truncate group-hover:text-white transition-colors">
                  {card.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-0.5">
                  <span className="truncate mr-1">{card.cardNo}</span>
                  <span className="text-zinc-300 font-medium">
                    {card.power ? card.power.toLocaleString() : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table / List View Mode */}
      {viewMode === 'table' && (
        <div className="rounded-xl bg-[#111215] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/30 text-zinc-500 font-mono text-[10px] uppercase border-b border-white/[0.06]">
                <tr>
                  <th className="py-2.5 px-3">Card</th>
                  <th className="py-2.5 px-3">Grade</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Power</th>
                  <th className="py-2.5 px-3">Shield</th>
                  <th className="py-2.5 px-3">Clan / Nation</th>
                  <th className="py-2.5 px-3">Card No.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredCards.map((card) => (
                  <tr
                    key={card.cardNo}
                    onClick={() => {
                      playHapticClick(700);
                      onSelectCard(card);
                    }}
                    className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2.5">
                      <div className="w-7 h-9 rounded overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/[0.06]">
                        <img 
                          src={card.localImageUrl || card.imageUrl} 
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-zinc-100 truncate max-w-[200px]">{card.name}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">
                      {card.grade !== null ? `G${card.grade}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-400">
                      {card.triggerType ? `${card.triggerType} Trigger` : card.cardType}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-zinc-300 font-medium">
                      {card.power ? card.power.toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">
                      {card.shield ? `+${card.shield.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-400 truncate max-w-[140px]">
                      {card.clan || card.nation}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-zinc-500">
                      {card.cardNo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-zinc-400 text-sm">No cards match the active filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-white border border-white/[0.1] transition-colors pressable"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
