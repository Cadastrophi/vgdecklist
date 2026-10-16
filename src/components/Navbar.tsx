import React from 'react';
import { Layers, Search, BookOpen, Sparkles, Cpu } from 'lucide-react';

export type ActiveTab = 'deck' | 'explorer' | 'guide';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  totalCards: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, totalCards }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-purple-900/30 shadow-2xl shadow-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('deck')}>
            <div className="relative group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-purple-600 to-cyan-500 p-[2px] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-amber-400 group-hover:text-purple-300 transition-colors" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600 text-[9px] font-bold text-white items-center justify-center">D</span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-amber-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent font-heading">
                  CARDFIGHT!! VANGUARD
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-purple-950/80 text-purple-300 border border-purple-800/50">
                  D-SS03
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="text-amber-400">Stride Deckset Chronojet</span>
                <span>•</span>
                <span className="text-slate-400">Standard D-Series</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('deck')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'deck'
                  ? 'bg-gradient-to-r from-purple-700/80 to-amber-600/80 text-white shadow-lg shadow-purple-900/40 border border-purple-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Chronojet Deckset</span>
              <span className="md:hidden">Deck</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-900/80 text-slate-300 font-mono">
                {totalCards}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'explorer'
                  ? 'bg-gradient-to-r from-purple-700/80 to-cyan-600/80 text-white shadow-lg shadow-purple-900/40 border border-purple-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Card Explorer</span>
              <span className="md:hidden">Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-purple-700/80 to-pink-600/80 text-white shadow-lg shadow-purple-900/40 border border-purple-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-pink-400" />
              <span className="hidden md:inline">Tips & Pre-con Guide</span>
              <span className="md:hidden">Guides</span>
              <span className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                Tutorial
              </span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
