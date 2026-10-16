import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DeckViewer } from './components/DeckViewer';
import { DeckCatalog } from './components/DeckCatalog';
import { CardExplorer } from './components/CardExplorer';
import { TipsAndTricks } from './components/TipsAndTricks';
import { CardModal } from './components/CardModal';
import { VanguardCard } from './types/card';
import { getDeckById, allCards, AVAILABLE_DECKS } from './utils/deckBuilder';
import { playHapticClick } from './utils/audio';
import { Sparkles, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deck');
  // Default to Blaster Blade start deck for first time users
  const [activeDeckId, setActiveDeckId] = useState<string>('dz-ss14-blaster-blade');
  const [selectedCard, setSelectedCard] = useState<VanguardCard | null>(null);

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

  return (
    <div className="min-h-[100dvh] bg-[#090c13] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navbar with Icon-Only Tab Dock */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeDeckId={activeDeckId}
        totalCards={allCards.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-safe">
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

      {/* Detailed Card Inspect Modal with Touch Navigation */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
        onPrev={handlePrevCard}
        onNext={handleNextCard}
        currentIndex={currentCardIndex >= 0 ? currentCardIndex : undefined}
        totalCards={allCards.length}
      />

      {/* Mobile-Friendly Minimalist Footer */}
      <footer className="mt-12 border-t border-white/[0.06] bg-[#07090f]/90 py-6 pb-safe">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="font-bold text-amber-400">VG Decklist</span>
            <span>•</span>
            <span className="text-slate-300">Standard D & DZ Series</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors pressable"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Choose Deck ({AVAILABLE_DECKS.length})</span>
            </button>
            <a 
              href="https://cardfight.fandom.com/wiki/Cardfight!!_Vanguard_Wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              Vanguard Wiki <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
