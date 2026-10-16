import React, { useState, useMemo, useRef, useEffect } from 'react';
import { VanguardCard } from '../types/card';
import { Search, RotateCcw, LayoutGrid, List } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface CardExplorerProps {
  cards: VanguardCard[];
  onSelectCard: (card: VanguardCard) => void;
}

export const CardExplorer: React.FC<CardExplorerProps> = ({ cards, onSelectCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeck, setSelectedDeck] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedClan, setSelectedClan] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global hotkey '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Search query matches name, cardNo, skillText, race, clan
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchName = card.name.toLowerCase().includes(q);
        const matchNo = card.cardNo.toLowerCase().includes(q);
        const matchSkill = card.skillText.toLowerCase().includes(q);
        const matchRace = card.race.toLowerCase().includes(q);
        const matchClan = card.clan.toLowerCase().includes(q);
        if (!matchName && !matchNo && !matchSkill && !matchRace && !matchClan) return false;
      }

      // Deck Package filter
      if (selectedDeck !== 'all') {
        if (selectedDeck === 'chronojet' && !card.cardNo.startsWith('D-SS03')) return false;
        if (selectedDeck === 'blaster' && !card.cardNo.startsWith('DZ-SS14')) return false;
        if (selectedDeck === 'overlord' && !card.cardNo.startsWith('DZ-SS15')) return false;
        if (selectedDeck === 'harri' && !card.cardNo.startsWith('DZ-SS02')) return false;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      
      {/* Search and Filters Header */}
      <div className="rounded-3xl bg-[#0c101d] border border-white/[0.08] p-5 sm:p-6 shadow-2xl space-y-4">
        
        {/* Search input with '/' badge */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search card by name, card number, ability text, clan, or race..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-16 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/80 focus:bg-white/[0.05] transition-all text-sm sm:text-base font-normal"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/[0.1] rounded shadow-sm">
              /
            </kbd>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-white/[0.06]">
          
          {/* Deck Package Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Decklist</label>
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
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">Layout</label>
            <div className="flex rounded-xl bg-white/[0.04] border border-white/[0.08] p-0.5">
              <button
                onClick={() => {
                  playHapticClick(650);
                  setViewMode('grid');
                }}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-mono transition ${
                  viewMode === 'grid'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
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
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-mono transition ${
                  viewMode === 'table'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] text-xs font-mono transition pressable"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-xs font-mono text-slate-400">
          <div>
            Showing <strong className="text-amber-400 font-bold">{filteredCards.length}</strong> of {cards.length} authentic cards
          </div>
          <div className="hidden sm:block text-[11px] text-slate-500">
            Use arrow keys or click card for rulings & art switcher
          </div>
        </div>

      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredCards.map((card) => (
            <div
              key={card.cardNo}
              onClick={() => {
                playHapticClick(700);
                onSelectCard(card);
              }}
              className="group cursor-pointer rounded-2xl bg-[#0f1322] border border-white/[0.08] hover:border-amber-400/50 p-2.5 space-y-2 card-foil pressable shadow-lg"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={card.localImageUrl || card.imageUrl}
                  alt={card.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Grade Badge */}
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold">
                  {card.grade !== null ? `G${card.grade}` : 'CREST'}
                </div>

                {/* Trigger Chip */}
                {card.triggerType && (
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-rose-600/90 text-white text-[9px] font-mono font-bold">
                    {card.triggerType}
                  </div>
                )}

                {/* Art Count Chip */}
                {card.artVariants && card.artVariants.length > 1 && (
                  <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono text-amber-300">
                    {card.artVariants.length} Arts
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {card.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>{card.cardNo}</span>
                  <span className="text-amber-400">{card.power ? card.power.toLocaleString() : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View for Compact Browser Use */
        <div className="rounded-2xl bg-[#0c101d] border border-white/[0.08] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-white/[0.03] border-b border-white/[0.08] text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Card No</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-3">Grade</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Power</th>
                  <th className="py-3 px-3">Shield</th>
                  <th className="py-3 px-4">Clan</th>
                  <th className="py-3 px-4">Skill Icon</th>
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
                    <td className="py-2.5 px-4 font-mono text-amber-400">{card.cardNo}</td>
                    <td className="py-2.5 px-4 font-bold text-white max-w-[200px] truncate">{card.name}</td>
                    <td className="py-2.5 px-3 font-mono">
                      {card.grade !== null ? (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          card.grade === 4 ? 'bg-red-950 text-red-300' :
                          card.grade === 3 ? 'bg-amber-950 text-amber-300' :
                          card.grade === 2 ? 'bg-blue-950 text-blue-300' :
                          card.grade === 1 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          G{card.grade}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 font-bold">Crest</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      {card.triggerType ? (
                        <span className="text-rose-400 font-semibold">{card.triggerType} Trigger</span>
                      ) : (
                        card.cardType
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">
                      {card.power ? card.power.toLocaleString() : '-'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300">
                      {card.shield !== null && card.shield !== undefined ? `+${card.shield.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">{card.clan}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-400">
                      {card.skillIcon || '-'}
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
        <div className="text-center py-16 space-y-3 bg-white/[0.02] rounded-3xl border border-white/[0.06]">
          <p className="text-slate-400 text-base">No cards match the specified filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono pressable"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
