import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DeckViewer } from './components/DeckViewer';
import { DeckCatalog } from './components/DeckCatalog';
import { CardExplorer } from './components/CardExplorer';
import { TipsAndTricks } from './components/TipsAndTricks';
import { CardModal } from './components/CardModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { VanguardCard } from './types/card';
import { getDeckById, allCards } from './utils/deckBuilder';
import { ExternalLink, Keyboard } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deck');
  // Default to Blaster Blade start deck for first time users
  const [activeDeckId, setActiveDeckId] = useState<string>('dz-ss14-blaster-blade');
  const [selectedCard, setSelectedCard] = useState<VanguardCard | null>(null);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  const deck = getDeckById(activeDeckId);

  // Card modal navigation index
  const currentCardIndex = selectedCard 
    ? allCards.findIndex(c => c.cardNo === selectedCard.cardNo) 
    : -1;

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setSelectedCard(allCards[currentCardIndex - 1]);
    } else {
      setSelectedCard(allCards[allCards.length - 1]);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex >= 0 && currentCardIndex < allCards.length - 1) {
      setSelectedCard(allCards[currentCardIndex + 1]);
    } else {
      setSelectedCard(allCards[0]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input or select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setSelectedCard(null);
        setShowShortcuts(false);
      } else if (e.key === '?') {
        setShowShortcuts(prev => !prev);
      } else if (e.key === '1') {
        setActiveTab('deck');
      } else if (e.key === '2') {
        setActiveTab('decks');
      } else if (e.key === '3') {
        setActiveTab('explorer');
      } else if (e.key === '4') {
        setActiveTab('guide');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-white/15 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeDeckId={activeDeckId}
        totalCards={allCards.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-safe w-full max-w-full overflow-x-hidden">
        {activeTab === 'deck' && (
          <DeckViewer 
            deck={deck} 
            onSelectCard={(card) => setSelectedCard(card)} 
            onOpenDeckCatalog={() => setActiveTab('decks')}
            onOpenSearchCards={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'decks' && (
          <DeckCatalog
            activeDeckId={activeDeckId}
            onSelectDeck={(newDeckId) => setActiveDeckId(newDeckId)}
            onNavigateToDeckView={() => setActiveTab('deck')}
          />
        )}

        {activeTab === 'explorer' && (
          <CardExplorer 
            cards={allCards} 
            onSelectCard={(card) => setSelectedCard(card)} 
          />
        )}

        {activeTab === 'guide' && (
          <TipsAndTricks 
            activeDeckId={activeDeckId}
            onSelectDeck={(newDeckId) => setActiveDeckId(newDeckId)}
          />
        )}
      </main>

      {/* Detailed Card Inspect Modal */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
        onPrev={handlePrevCard}
        onNext={handleNextCard}
        currentIndex={currentCardIndex >= 0 ? currentCardIndex : undefined}
        totalCards={allCards.length}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#09090b] py-6 text-zinc-500 text-xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-400">VG DECKLIST</span>
            <span>·</span>
            <span>Cardfight!! Vanguard Standard (D & DZ Series)</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button
              onClick={() => setShowShortcuts(true)}
              className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors pressable"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Shortcuts</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.08]">?</kbd>
            </button>
            <span>·</span>
            <a
              href="https://en.cf-vanguard.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
            >
              <span>Official Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
