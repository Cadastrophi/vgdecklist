import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DeckViewer } from './components/DeckViewer';
import { DeckCatalog } from './components/DeckCatalog';
import { CardExplorer } from './components/CardExplorer';
import { TipsAndTricks } from './components/TipsAndTricks';
import { CardModal } from './components/CardModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { VanguardCard } from './types/card';
import { getDeckById, allCards, AVAILABLE_DECKS } from './utils/deckBuilder';
import { getAudioEnabled, toggleAudio, playHapticClick } from './utils/audio';
import { ExternalLink, Filter } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deck');
  const [activeDeckId, setActiveDeckId] = useState<string>('d-ss03-chronojet');
  const [selectedCard, setSelectedCard] = useState<VanguardCard | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getAudioEnabled());
  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  const deck = getDeckById(activeDeckId);

  // Toggle sound
  const handleToggleSound = () => {
    const next = toggleAudio();
    setSoundEnabled(next);
  };

  // Keyboard navigation & power shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '1') {
        playHapticClick(650);
        setActiveTab('deck');
      } else if (e.key === '2') {
        playHapticClick(650);
        setActiveTab('decks');
      } else if (e.key === '3') {
        playHapticClick(650);
        setActiveTab('explorer');
      } else if (e.key === '4') {
        playHapticClick(650);
        setActiveTab('guide');
      } else if (e.key === 'd' || e.key === 'D') {
        playHapticClick(750);
        const deckIds = AVAILABLE_DECKS.map(d => d.id);
        const currentIdx = deckIds.indexOf(activeDeckId);
        const nextIdx = (currentIdx + 1) % deckIds.length;
        setActiveDeckId(deckIds[nextIdx]);
      } else if (e.key === '?') {
        playHapticClick(550);
        setShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDeckId]);

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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeDeckId={activeDeckId}
        setActiveDeckId={setActiveDeckId}
        totalCards={allCards.length}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'deck' && (
          <DeckViewer 
            deck={deck} 
            onSelectCard={(card) => setSelectedCard(card)} 
            onSwitchDeck={(newDeckId) => setActiveDeckId(newDeckId)}
            onOpenDeckCatalog={() => setActiveTab('decks')}
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
          <TipsAndTricks />
        )}
      </main>

      {/* Detailed Card Inspect Modal with Navigation */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
        onPrev={handlePrevCard}
        onNext={handleNextCard}
        currentIndex={currentCardIndex >= 0 ? currentCardIndex : undefined}
        totalCards={allCards.length}
      />

      {/* Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal 
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/[0.08] bg-[#05070a]/90 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-400">Cardfight!! Vanguard D & DZ Series</span>
            <span>•</span>
            <span className="text-slate-300">Chronojet • Blaster Blade • Dragonic Overlord • Harri</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playHapticClick(650);
                setActiveTab('decks');
              }}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors pressable"
            >
              <Filter className="w-3 h-3 text-sky-400" />
              <span>Deck Directory ({AVAILABLE_DECKS.length})</span>
            </button>
            <a 
              href="https://cardfight.fandom.com/wiki/DZ_Special_Series_14:_Break_Away_Start_Deck_-_Blaster_Blade"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              DZ-SS14 Wiki <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://cardfight.fandom.com/wiki/DZ_Special_Series_15:_Break_Away_Start_Deck_-_Dragonic_Overlord"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              DZ-SS15 Wiki <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://cardfight.fandom.com/wiki/DZ_Special_Series_02:_Stride_Deckset_Harri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 flex items-center gap-1 transition-colors"
            >
              DZ-SS02 Wiki <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
