import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DeckViewer } from './components/DeckViewer';
import { CardExplorer } from './components/CardExplorer';
import { TipsAndTricks } from './components/TipsAndTricks';
import { CardModal } from './components/CardModal';
import { VanguardCard } from './types/card';
import { getChronojetDeck, allCards } from './utils/deckBuilder';
import { ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deck');
  const [selectedCard, setSelectedCard] = useState<VanguardCard | null>(null);

  const deck = getChronojetDeck();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalCards={deck.statistics.totalCards} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'deck' && (
          <DeckViewer 
            deck={deck} 
            onSelectCard={(card) => setSelectedCard(card)} 
          />
        )}

        {activeTab === 'explorer' && (
          <CardExplorer 
            cards={allCards} 
            onSelectCard={(card) => setSelectedCard(card)} 
          />
        )}

        {activeTab === 'guide' && (
          <TipsAndTricks />
        )}
      </main>

      {/* Detailed Card Inspect Modal */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-purple-900/30 bg-slate-950/80 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Cardfight!! Vanguard D-Standard</span>
            <span>•</span>
            <span>D Special Series 03: Stride Deckset Chronojet</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://cardfight.fandom.com/wiki/D_Special_Series_03:_Stride_Deckset_Chronojet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              Wiki Database <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://en.cf-vanguard.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              Official Bushiroad Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
