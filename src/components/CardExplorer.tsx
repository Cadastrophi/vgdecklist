import React, { useState, useMemo } from 'react';
import { VanguardCard } from '../types/card';
import { 
  Search, X, Grid, List
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

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 animate-in fade-in slide-in-from-bottom">
      
      {/* Search and Filters Header */}
      <div className="rounded-3xl bg-[#0c101d] border border-white/[0.08] p-3.5 sm:p-5 shadow-2xl space-y-3.5">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search card by name, ability text, clan, or race..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-11 pr-10 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-slate-400 focus:outline-none focus:border-sky-400/80 focus:bg-white/[0.05] transition-all text-sm font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter dropdowns in responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
          
          {/* Deck Package Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Deck</label>
            <select
              value={selectedDeck}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedDeck(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition"
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
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedGrade(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition"
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
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedType(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition"
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
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Clan</label>
            <select
              value={selectedClan}
              onChange={(e) => {
                playHapticClick(650);
                setSelectedClan(e.target.value);
              }}
              className="w-full py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition"
            >
              <option value="all">All Clans</option>
              {uniqueClans.map(clan => (
                <option key={clan} value={clan}>{clan}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Layout</label>
            <div className="flex rounded-xl bg-white/[0.04] border border-white/[0.08] p-0.5">
              <button
                onClick={() => {
                  playHapticClick(650);
                  setViewMode('grid');
                }}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-mono transition ${
                  viewMode === 'grid'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => {
                  playHapticClick(650);
                  setViewMode('table');
                }}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-mono transition ${
                  viewMode === 'table'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

        </div>

        {/* Filter Status & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs text-slate-400">
          <div>
            Found <span className="text-amber-400 font-bold font-mono">{filteredCards.length}</span> cards
          </div>
          {(searchQuery || selectedDeck !== 'all' || selectedGrade !== 'all' || selectedType !== 'all' || selectedClan !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-mono transition pressable"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {filteredCards.map((card) => (
            <div
              key={card.cardNo}
              onClick={() => {
                playHapticClick(700);
                onSelectCard(card);
              }}
              className="group cursor-pointer rounded-2xl bg-[#0f1322] border border-white/[0.08] hover:border-amber-400/50 p-2 space-y-1.5 card-foil pressable shadow-md"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                <img 
                  src={card.localImageUrl || card.imageUrl} 
                  alt={card.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Grade Badge */}
                <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold">
                  {card.cardType === 'Crest' ? (
                    <span className="text-purple-300">Crest</span>
                  ) : card.triggerType ? (
                    <span className="text-amber-300">{card.triggerType}</span>
                  ) : (
                    <span className="text-slate-200">G{card.grade}</span>
                  )}
                </div>

                {/* Nation badge */}
                <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[8px] font-mono text-slate-300">
                  {card.clan || card.nation.split(' ')[0]}
                </div>

                {/* Shield badge */}
                {card.shield !== null && card.shield !== undefined && (
                  <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[8px] font-mono text-cyan-300">
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
          ))}
        </div>
      )}

      {/* Table / List View Mode (Optimized for Mobile Scrolling) */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-[#0c101d] border border-white/[0.08] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-slate-400 font-mono text-[10px] uppercase border-b border-white/[0.06]">
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
                    className="hover:bg-white/[0.04] cursor-pointer transition"
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <div className="w-7 h-9 rounded overflow-hidden bg-slate-900 flex-shrink-0">
                        <img 
                          src={card.localImageUrl || card.imageUrl} 
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-white truncate max-w-[180px]">{card.name}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {card.grade !== null ? `G${card.grade}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {card.triggerType ? `${card.triggerType} Trigger` : card.cardType}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-400">
                      {card.power ? card.power.toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300">
                      {card.shield ? `+${card.shield.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 truncate max-w-[120px]">
                      {card.clan || card.nation}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">
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
          <p className="text-slate-400 text-sm">No cards found matching your current filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-amber-300 border border-white/[0.1] transition pressable"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
