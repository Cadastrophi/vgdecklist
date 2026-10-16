import React from 'react';
import { Layers, Search, BookOpen, Sparkles, Volume2, VolumeX, Keyboard, Filter } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

export type ActiveTab = 'deck' | 'decks' | 'explorer' | 'guide';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeDeckId: string;
  setActiveDeckId: (deckId: string) => void;
  totalCards: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenShortcuts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeDeckId,
  setActiveDeckId,
  totalCards,
  soundEnabled,
  onToggleSound,
  onOpenShortcuts
}) => {
  const getDeckColor = () => {
    switch (activeDeckId) {
      case 'd-ss03-chronojet':
        return 'bg-gradient-to-tr from-amber-500 via-purple-600 to-amber-300';
      case 'dz-ss14-blaster-blade':
        return 'bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-300';
      case 'dz-ss15-dragonic-overlord':
        return 'bg-gradient-to-tr from-rose-600 via-red-500 to-amber-400';
      case 'dz-ss02-harri':
        return 'bg-gradient-to-tr from-pink-600 via-purple-500 to-amber-300';
      default:
        return 'bg-gradient-to-tr from-amber-500 via-purple-600 to-amber-300';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080a11]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand & Home */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => {
                playHapticClick(650);
                setActiveTab('deck');
              }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl p-[2px] transition-all duration-300 group-hover:scale-105 ${getDeckColor()}`}>
                  <div className="w-full h-full bg-[#090c15] rounded-[9px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-white text-lg tracking-wider">
                    VANGUARD
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    DECKLIST
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 tracking-tight">
                  High-Fidelity TCG Directory
                </p>
              </div>
            </div>

            {/* Quick Deck Switcher Carousel in Navbar */}
            <div className="hidden lg:flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-2xl border border-white/[0.06]">
              <button
                onClick={() => {
                  playHapticClick(700);
                  setActiveDeckId('d-ss03-chronojet');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all pressable ${
                  activeDeckId === 'd-ss03-chronojet'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chronojet
              </button>
              <button
                onClick={() => {
                  playHapticClick(700);
                  setActiveDeckId('dz-ss14-blaster-blade');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all pressable ${
                  activeDeckId === 'dz-ss14-blaster-blade'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Blaster Blade
              </button>
              <button
                onClick={() => {
                  playHapticClick(700);
                  setActiveDeckId('dz-ss15-dragonic-overlord');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all pressable ${
                  activeDeckId === 'dz-ss15-dragonic-overlord'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Overlord
              </button>
              <button
                onClick={() => {
                  playHapticClick(700);
                  setActiveDeckId('dz-ss02-harri');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all pressable ${
                  activeDeckId === 'dz-ss02-harri'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Harri
              </button>
            </div>
          </div>

          {/* Center Navigation Tabs (Deck View, Choose Deck / Filter, Card Explorer, Guide) */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            
            {/* Tab 1: Current Deck */}
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('deck');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all pressable ${
                activeTab === 'deck'
                  ? 'bg-white/[0.1] text-white shadow-lg shadow-black/40 border border-white/[0.15]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Deck View</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono text-slate-500 bg-white/[0.05] px-1.5 py-0.2 rounded">1</kbd>
            </button>

            {/* Tab 2: Filter Decks / Choose Deck */}
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all pressable ${
                activeTab === 'decks'
                  ? 'bg-white/[0.1] text-white shadow-lg shadow-black/40 border border-white/[0.15]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Filter className="w-4 h-4 text-sky-400" />
              <span>Filter Decks</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 font-bold">
                4
              </span>
              <kbd className="hidden md:inline-block text-[10px] font-mono text-slate-500 bg-white/[0.05] px-1.5 py-0.2 rounded">2</kbd>
            </button>

            {/* Tab 3: Card Explorer */}
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('explorer');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all pressable ${
                activeTab === 'explorer'
                  ? 'bg-white/[0.1] text-white shadow-lg shadow-black/40 border border-white/[0.15]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Explorer</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.08] text-slate-300">
                {totalCards}
              </span>
              <kbd className="hidden md:inline-block text-[10px] font-mono text-slate-500 bg-white/[0.05] px-1.5 py-0.2 rounded">3</kbd>
            </button>

            {/* Tab 4: Guide */}
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('guide');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all pressable ${
                activeTab === 'guide'
                  ? 'bg-white/[0.1] text-white shadow-lg shadow-black/40 border border-white/[0.15]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Piloting Guide</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono text-slate-500 bg-white/[0.05] px-1.5 py-0.2 rounded">4</kbd>
            </button>
          </nav>

          {/* Controls: Audio Haptic Click & Keyboard Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable Mechanical Click Feedback'}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition pressable"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={onOpenShortcuts}
              title="Keyboard Shortcuts (? / D)"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition pressable"
            >
              <Keyboard className="w-4 h-4 text-slate-300" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
