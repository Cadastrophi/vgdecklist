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
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Brand & Format */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('deck');
              }}
              className="flex items-center gap-2 text-left group pressable"
            >
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                VG DECKLIST
              </span>
              <span className="hidden xs:inline-block text-[10px] font-mono tracking-wider text-zinc-500 uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03]">
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
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'deck'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deck View</span>
              <span className="sm:hidden">Deck</span>
            </button>

            {/* Tab: Choose Deck / Catalog */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('decks');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'decks'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Decks</span>
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">(4)</span>
            </button>

            {/* Tab: Card Explorer */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('explorer');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
                activeTab === 'explorer'
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Database</span>
              <span className="sm:hidden">Cards</span>
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">({totalCards})</span>
            </button>

            {/* Tab: Strategy Guide */}
            <button
              onClick={() => {
                playHapticClick(600);
                setActiveTab('guide');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all pressable ${
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
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all pressable"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              <span className="truncate max-w-[90px] sm:max-w-[130px] font-medium">{deckSummary.label}</span>
              <span className="text-[10px] font-mono text-zinc-500 hidden xs:inline">{deckSummary.code}</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
