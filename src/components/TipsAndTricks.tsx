import React, { useState, useEffect } from 'react';
import { PRECON_DECKS, PreconDeckInfo } from '../data/preconGuides';
import { 
  BookOpen, Shield, CheckCircle2, AlertCircle, Layers
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface TipsAndTricksProps {
  activeDeckId?: string;
  onSelectDeck?: (deckId: string) => void;
}

export const TipsAndTricks: React.FC<TipsAndTricksProps> = ({ 
  activeDeckId = 'dz-ss14-blaster-blade',
  onSelectDeck
}) => {
  // Normalize deck ID to match PRECON_DECKS keys
  const getNormalizedId = (id: string): string => {
    if (id.includes('blaster')) return 'blaster-blade';
    if (id.includes('overlord')) return 'overlord';
    if (id.includes('harri')) return 'harri';
    if (id.includes('chronojet')) return 'chronojet';
    return 'blaster-blade';
  };

  const [selectedDeckId, setSelectedDeckId] = useState<string>(() => getNormalizedId(activeDeckId));

  // Sync with parent activeDeckId when changed
  useEffect(() => {
    if (activeDeckId) {
      setSelectedDeckId(getNormalizedId(activeDeckId));
    }
  }, [activeDeckId]);

  const currentDeck: PreconDeckInfo = PRECON_DECKS.find(d => d.id === selectedDeckId) || PRECON_DECKS[0];

  const handleDeckTabClick = (deckId: string) => {
    playHapticClick(650);
    setSelectedDeckId(deckId);
    if (onSelectDeck) {
      const fullDeckId = deckId === 'blaster-blade' ? 'dz-ss14-blaster-blade'
        : deckId === 'overlord' ? 'dz-ss15-dragonic-overlord'
        : deckId === 'harri' ? 'dz-ss02-harri'
        : 'd-ss03-chronojet';
      onSelectDeck(fullDeckId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 animate-in fade-in slide-in-from-bottom">
      
      {/* Editorial Header */}
      <div className="rounded-3xl bg-[#0e121d] border border-white/[0.08] p-5 sm:p-7 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Deck Strategy & Gameplay Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Strategy & Combos Compendium
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Tournament-tested sequences, resource management, and key rulings for each pre-constructed deck. Select any deck below to inspect its guide.
          </p>
        </div>

        {/* Deck Tab Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-5 border-t border-white/[0.06] mt-4">
          {PRECON_DECKS.map(deck => {
            const isSelected = deck.id === selectedDeckId;
            return (
              <button
                key={deck.id}
                onClick={() => handleDeckTabClick(deck.id)}
                className={`flex flex-col items-start p-3 rounded-2xl border text-left transition pressable ${
                  isSelected
                    ? 'bg-white/[0.1] border-amber-400 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                    {deck.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{deck.nation.split(' ')[0]}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold truncate w-full mt-1">
                  {deck.name.replace('Break Away Start Deck - ', '').replace('Stride Deckset ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Deck Guide Content */}
      <div className="space-y-6">
        
        {/* Deck Overview & Key Boss Card */}
        <div className="rounded-3xl bg-[#0e121d] border border-white/[0.08] p-5 sm:p-7 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {currentDeck.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs text-slate-300 bg-white/[0.04] border border-white/[0.08]">
                  {currentDeck.nation}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs text-slate-400 bg-white/[0.02]">
                  {currentDeck.clan}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                  {currentDeck.difficulty} Friendly
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {currentDeck.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentDeck.overview}
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 min-w-[200px] text-xs space-y-1.5 font-mono">
              <div className="text-slate-400">Key Boss:</div>
              <div className="text-amber-300 font-bold break-words">{currentDeck.keyBoss}</div>
            </div>
          </div>
        </div>

        {/* Key Combos & Attack Sequences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Turn Sequences & Combat Flow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDeck.keyCombos.map((combo, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#0e121d] border border-white/[0.08] p-4 sm:p-5 space-y-3.5 shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">
                    Sequence {idx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {combo.name}
                  </h4>
                </div>

                {/* Key Cards Involved */}
                <div className="flex flex-wrap gap-1.5">
                  {combo.cards.map((cardName, cIdx) => (
                    <span 
                      key={cIdx}
                      className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-200"
                    >
                      {cardName}
                    </span>
                  ))}
                </div>

                {/* Steps */}
                <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                  {combo.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        {sIdx + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Deck Mechanics Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Core Deck Mechanics & Resource Engines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentDeck.mechanics.map((mech, mIdx) => (
              <div 
                key={mIdx}
                className="rounded-2xl bg-[#0e121d] border border-white/[0.08] p-4 sm:p-5 space-y-2 shadow-lg"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {mech.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Tactical Warnings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Strengths */}
          <div className="rounded-2xl bg-[#0e121d] border border-white/[0.08] p-4 sm:p-5 space-y-3 shadow-lg">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Strategic Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentDeck.pros.map((pro, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Matchup Notes */}
          <div className="rounded-2xl bg-[#0e121d] border border-white/[0.08] p-4 sm:p-5 space-y-3 shadow-lg">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Matchup Considerations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentDeck.cons.map((con, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Tournament Upgrades */}
        {currentDeck.recommendedUpgrades && currentDeck.recommendedUpgrades.length > 0 && (
          <div className="rounded-2xl bg-[#0e121d] border border-white/[0.08] p-4 sm:p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">
                Recommended Upgrades & Tech Cards
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Competitive Additions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {currentDeck.recommendedUpgrades.map((upg, uIdx) => (
                <div 
                  key={uIdx}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-1.5 text-xs"
                >
                  <div className="font-bold text-white text-xs sm:text-sm">
                    {upg.cardName}
                  </div>
                  <div className="text-[11px] font-mono text-amber-300">
                    {upg.role}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {upg.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
