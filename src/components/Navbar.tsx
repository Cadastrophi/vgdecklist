import React from 'react';
import { Layers, Search, BookOpen, Sparkles } from 'lucide-react';
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
  activeDeckId
}) => {
  const getDeckPill = () => {
    switch (activeDeckId) {
      case 'dz-ss14-blaster-blade':
        return { label: 'Blaster Blade', code: 'DZ-SS14', color: 'text-sky-300 border-sky-500/40 bg-sky-500/10' };
      case 'dz-ss15-dragonic-overlord':
        return { label: 'Overlord', code: 'DZ-SS15', color: 'text-rose-300 border-rose-500/40 bg-rose-500/10' };
      case 'dz-ss02-harri':
        return { label: 'Harri', code: 'DZ-SS02', color: 'text-pink-300 border-pink-500/40 bg-pink-500/10' };
      case 'd-ss03-chronojet':
      default:
        return { label: 'Chronojet', code: 'D-SS03', color: 'text-amber-300 border-amber-500/40 bg-amber-500/10' };
    }
  };

  const pill = getDeckPill();

  return (
    <header className="sticky top-0 z-40 bg-[#090c13]/95 backdrop-blur-md border-b border-white/[0.08] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Top Left: Compiled Apple-Style Icon-Only Tab Dock */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <nav className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              
              {/* Tab 1: Current Deck View */}
              <button
                onClick={() => {
                  playHapticClick(600);
                  setActiveTab('deck');
                }}
                title="Current Deck View"
                aria-label="Deck View"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all pressable ${
                  activeTab === 'deck'
                    ? 'bg-white/[0.12] text-amber-300 font-bold border border-white/[0.12]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Tab 2: Choose Deck / Directory */}
              <button
                onClick={() => {
                  playHapticClick(600);
                  setActiveTab('decks');
                }}
                title="Choose Deck"
                aria-label="Choose Deck"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all pressable ${
                  activeTab === 'decks'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </button>

              {/* Tab 3: Search Cards / Explorer */}
              <button
                onClick={() => {
                  playHapticClick(600);
                  setActiveTab('explorer');
                }}
                title="Search Cards"
                aria-label="Search Cards"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all pressable ${
                  activeTab === 'explorer'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Tab 4: Piloting Strategy Guides */}
              <button
                onClick={() => {
                  playHapticClick(600);
                  setActiveTab('guide');
                }}
                title="Strategy Guides"
                aria-label="Strategy Guides"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all pressable ${
                  activeTab === 'guide'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </nav>
          </div>

          {/* Right Area: Active Deck Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition pressable ${pill.color}`}
            >
              <span className="truncate max-w-[100px] sm:max-w-none">{pill.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({pill.code})</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
