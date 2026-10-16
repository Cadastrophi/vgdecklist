import React from 'react';
import { Layers, Search, BookOpen, LayoutGrid, ChevronDown } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

export type ActiveTab = 'deck' | 'decks' | 'explorer' | 'guide';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeDeckId: string;
  totalCards: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeDeckId,
  totalCards
}) => {
  const getDeckSummary = () => {
    switch (activeDeckId) {
      case 'dz-ss14-blaster-blade':
        return { label: 'Blaster Blade', code: 'DZ-SS14' };
      case 'dz-ss15-dragonic-overlord':
        return { label: 'Overlord', code: 'DZ-SS15' };
      case 'dz-ss02-harri':
        return { label: 'Harri', code: 'DZ-SS02' };
      case 'd-ss03-chronojet':
      default:
        return { label: 'Chronojet', code: 'D-SS03' };
    }
  };

  const deckSummary = getDeckSummary();

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-white/[0.08] transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Mobile View (< sm): 2 Clean Rows that Wrap and Never Overflow */}
        <div className="sm:hidden py-2 space-y-2">
          {/* Row 1: Brand on Left, Active Deck Pill on Right */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('deck');
              }}
              className="flex items-center gap-2 text-left group pressable"
            >
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                VG DECKLIST
              </span>
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03]">
                D & DZ
              </span>
            </button>

            {/* Deck Switcher Pill */}
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              title="Click to switch deck"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-zinc-200 transition-all pressable"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="truncate max-w-[100px] font-medium">{deckSummary.label}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
          </div>

          {/* Row 2: 4 Tabs Distributed Across Screen */}
          <nav className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-full">
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('deck');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'deck'
                  ? 'bg-white/[0.12] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Deck</span>
            </button>

            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('decks');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'decks'
                  ? 'bg-white/[0.12] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Decks</span>
            </button>

            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('explorer');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'explorer'
                  ? 'bg-white/[0.12] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('guide');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'guide'
                  ? 'bg-white/[0.12] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </nav>
        </div>

        {/* Desktop View (>= sm): Single Sleek Row */}
        <div className="hidden sm:flex items-center justify-between h-16 gap-3">
          
          {/* Brand & Format */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('deck');
              }}
              className="flex items-center gap-2 text-left group pressable"
            >
              <span className="text-base font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                VG DECKLIST
              </span>
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03]">
                D & DZ
              </span>
            </button>
          </div>

          {/* Center Navigation Bar */}
          <nav className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            
            {/* Tab: Current Deck */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('deck');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'deck'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Deck View</span>
            </button>

            {/* Tab: Choose Deck / Catalog */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('decks');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'decks'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Decks</span>
              <span className="text-[10px] font-mono text-zinc-500">(4)</span>
            </button>

            {/* Tab: Card Explorer */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('explorer');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'explorer'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Database</span>
              <span className="text-[10px] font-mono text-zinc-500">({totalCards})</span>
            </button>

            {/* Tab: Strategy Guide */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('guide');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'guide'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </nav>

          {/* Right: Active Deck Selector Button */}
          <div className="flex items-center">
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              title="Click to switch deck"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all pressable"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="truncate max-w-[130px] font-medium">{deckSummary.label}</span>
              <span className="text-[10px] font-mono text-zinc-500">{deckSummary.code}</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
