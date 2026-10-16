import React, { useState, useMemo } from 'react';
import { VanguardCard } from '../types/card';
import { Search, Swords, Shield, Eye, RotateCcw } from 'lucide-react';

interface CardExplorerProps {
  cards: VanguardCard[];
  onSelectCard: (card: VanguardCard) => void;
}

export const CardExplorer: React.FC<CardExplorerProps> = ({ cards, onSelectCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTrigger, setSelectedTrigger] = useState<string>('all');
  const [selectedRace, setSelectedRace] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'grade-desc' | 'grade-asc' | 'power-desc' | 'shield-desc' | 'name-asc'>('grade-desc');

  // Extract unique races for dropdown filter
  const allRaces = useMemo(() => {
    const set = new Set<string>();
    cards.forEach(c => {
      if (c.race) {
        c.race.split(' / ').forEach(r => set.add(r.trim()));
      }
    });
    return Array.from(set).sort();
  }, [cards]);

  // Filtered and sorted cards
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Search query matches name, cardNo, skillText, or race
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchName = card.name.toLowerCase().includes(q);
        const matchNo = card.cardNo.toLowerCase().includes(q);
        const matchSkill = card.skillText.toLowerCase().includes(q);
        const matchRace = card.race.toLowerCase().includes(q);
        if (!matchName && !matchNo && !matchSkill && !matchRace) return false;
      }

      // Grade filter
      if (selectedGrade !== 'all') {
        if (selectedGrade === 'crest') {
          if (!card.isCrest && card.grade !== null) return false;
        } else {
          const gNum = parseInt(selectedGrade, 10);
          if (card.grade !== gNum) return false;
        }
      }

      // Card Type filter
      if (selectedType !== 'all') {
        if (card.cardType !== selectedType) return false;
      }

      // Trigger Type filter
      if (selectedTrigger !== 'all') {
        if (selectedTrigger === 'none' && card.triggerType) return false;
        if (selectedTrigger !== 'none' && card.triggerType !== selectedTrigger) return false;
      }

      // Race filter
      if (selectedRace !== 'all') {
        if (!card.race.includes(selectedRace)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'grade-desc': {
          const ga = a.grade ?? -1;
          const gb = b.grade ?? -1;
          return gb - ga;
        }
        case 'grade-asc': {
          const ga = a.grade ?? -1;
          const gb = b.grade ?? -1;
          return ga - gb;
        }
        case 'power-desc': {
          const pa = a.power ?? 0;
          const pb = b.power ?? 0;
          return pb - pa;
        }
        case 'shield-desc': {
          const sa = a.shield ?? 0;
          const sb = b.shield ?? 0;
          return sb - sa;
        }
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [cards, searchQuery, selectedGrade, selectedType, selectedTrigger, selectedRace, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGrade('all');
    setSelectedType('all');
    setSelectedTrigger('all');
    setSelectedRace('all');
    setSortBy('grade-desc');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedGrade !== 'all' || 
    selectedType !== 'all' || 
    selectedTrigger !== 'all' || 
    selectedRace !== 'all';

  return (
    <div className="space-y-6 pb-16">
      
      {/* Search and Filter Panel */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-purple-900/30 shadow-xl space-y-4">
        
        {/* Main Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by card name, card number (e.g. D-SS03/001), ability text, or race..."
            className="w-full bg-slate-950/90 text-white pl-11 pr-4 py-3 rounded-xl border border-slate-700/80 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm transition placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          
          {/* Grade Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">GRADE</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs px-2.5 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
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

          {/* Card Type Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">CARD TYPE</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs px-2.5 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="Normal Unit">Normal Unit</option>
              <option value="Trigger Unit">Trigger Unit</option>
              <option value="G Unit">G Unit (Stride)</option>
              <option value="Crest">Crest</option>
            </select>
          </div>

          {/* Trigger Type Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">TRIGGER</label>
            <select
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs px-2.5 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Triggers</option>
              <option value="Critical">Critical</option>
              <option value="Draw">Draw</option>
              <option value="Front">Front</option>
              <option value="Heal">Heal</option>
              <option value="Over">Over Trigger</option>
              <option value="none">No Trigger</option>
            </select>
          </div>

          {/* Race Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">RACE</label>
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs px-2.5 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Races</option>
              {allRaces.map(race => (
                <option key={race} value={race}>{race}</option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">SORT BY</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs px-2.5 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
            >
              <option value="grade-desc">Grade (Highest First)</option>
              <option value="grade-asc">Grade (Lowest First)</option>
              <option value="power-desc">Power (Highest First)</option>
              <option value="shield-desc">Shield (Highest First)</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className={`w-full text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                hasActiveFilters
                  ? 'bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800'
                  : 'bg-slate-950 text-slate-600 border border-slate-800 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>

        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-slate-800/80">
          <span>
            Showing <strong className="text-white">{filteredCards.length}</strong> of <strong className="text-white">{cards.length}</strong> cards
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> D-SS03 Chronojet Set
            </span>
          </div>
        </div>

      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredCards.map((card) => {
            return (
              <div
                key={card.cardNo}
                onClick={() => onSelectCard(card)}
                className="group bg-slate-900/70 hover:bg-slate-900 rounded-xl p-3 border border-slate-800 hover:border-purple-500/60 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-purple-500/20 flex flex-col justify-between"
              >
                {/* Image container */}
                <div className="relative aspect-[5/7] rounded-lg overflow-hidden mb-2.5 bg-slate-950">
                  <img
                    src={card.localImageUrl || card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                    {card.grade !== null ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-950/90 text-amber-300 border border-amber-500/40">
                        G{card.grade}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-purple-950/90 text-purple-300 border border-purple-500/40">
                        CREST
                      </span>
                    )}

                    {card.isRideDeck && (
                      <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                        RIDE
                      </span>
                    )}

                    {card.isGUnit && (
                      <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold rounded bg-red-950/90 text-red-300 border border-red-500/40">
                        STRIDE
                      </span>
                    )}
                  </div>

                  {/* Trigger Badge */}
                  {card.triggerType && (
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 text-[9px] font-bold rounded bg-slate-950/90 text-amber-300 border border-amber-500/50 shadow-md">
                      {card.triggerType}
                    </span>
                  )}

                  {/* Inspect Icon Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 text-white text-xs font-semibold flex items-center gap-1 shadow-lg border border-purple-400">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      View Card
                    </span>
                  </div>
                </div>

                {/* Card Meta */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                    <span className="text-purple-400 font-semibold">{card.cardNo}</span>
                    <span className="text-slate-400">{card.rarity}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {card.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {card.race}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800">
                    <span className="flex items-center gap-0.5 text-slate-300">
                      <Swords className="w-3 h-3 text-rose-400" />
                      {card.power !== null ? `${(card.power / 1000).toFixed(0)}k` : '—'}
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-300">
                      <Shield className="w-3 h-3 text-sky-400" />
                      {card.shield !== null ? `${(card.shield / 1000).toFixed(0)}k` : '0k'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-lg font-bold text-slate-300 mb-2">No cards match your filter criteria.</p>
          <p className="text-sm text-slate-500 mb-4">Try clearing some filters or searching with different keywords.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/30"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
