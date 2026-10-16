import React, { useState, useEffect } from 'react';
import { PRECON_DECKS, PreconDeckInfo } from '../data/preconGuides';
import { 
  Shield, CheckCircle2, AlertCircle, Layers
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in">
      
      {/* Editorial Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Strategy Guide
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Tournament sequences, turn-by-turn combat lines, and key rulings for each pre-constructed deck archetype.
        </p>
      </div>

      {/* Deck Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRECON_DECKS.map(deck => {
          const isSelected = deck.id === selectedDeckId;
          return (
            <button
              key={deck.id}
              onClick={() => handleDeckTabClick(deck.id)}
              className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-colors pressable ${
                isSelected
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-200 shadow-sm'
                  : 'bg-[#111215] border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                  {deck.code}
                </span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  {deck.nation.split(' ')[0]}
                </span>
              </div>
              <span className={`text-xs sm:text-sm font-semibold truncate w-full mt-1.5 ${isSelected ? 'text-zinc-950' : 'text-zinc-200'}`}>
                {deck.name.replace('Break Away Start Deck - ', '').replace('Stride Deckset ', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Deck Guide Content */}
      <div className="space-y-6">
        
        {/* Deck Overview & Key Boss Card */}
        <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2.5 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white/[0.06] border border-white/[0.1] text-zinc-300">
                  {currentDeck.code}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                  {currentDeck.nation}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                  {currentDeck.clan}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                  {currentDeck.difficulty}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentDeck.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                {currentDeck.overview}
              </p>
            </div>

            <div className="flex-shrink-0 bg-black/40 border border-white/[0.06] rounded-lg p-3 min-w-[200px] text-xs space-y-1 font-mono">
              <div className="text-zinc-500">Key Boss:</div>
              <div className="text-zinc-200 font-semibold break-words">{currentDeck.keyBoss}</div>
            </div>
          </div>
        </div>

        {/* Key Combos & Attack Sequences */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Turn Sequences & Combat Lines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDeck.keyCombos.map((combo, idx) => (
              <div 
                key={idx}
                className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 sm:p-5 space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-500 block">
                    Sequence {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-white mt-0.5">
                    {combo.name}
                  </h4>
                </div>

                {/* Key Cards Involved */}
                <div className="flex flex-wrap gap-1.5">
                  {combo.cards.map((cardName, cIdx) => (
                    <span 
                      key={cIdx}
                      className="px-2 py-0.5 rounded text-[11px] bg-white/[0.03] border border-white/[0.06] text-zinc-300 font-mono"
                    >
                      {cardName}
                    </span>
                  ))}
                </div>

                {/* Steps */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {combo.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                      <span className="font-mono text-[10px] text-zinc-500 font-semibold mt-0.5">
                        {String(sIdx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-zinc-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Deck Mechanics Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
            <Shield className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Core Mechanics & Engine
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentDeck.mechanics.map((mech, mIdx) => (
              <div 
                key={mIdx}
                className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 sm:p-5 space-y-1.5"
              >
                <h4 className="text-sm font-semibold text-white">
                  {mech.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {mech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Tactical Warnings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Strengths */}
          <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 sm:p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono uppercase tracking-wider text-xs">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              Strategic Strengths
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {currentDeck.pros.map((pro, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-zinc-500 font-mono">—</span>
                  <span className="text-zinc-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Matchup Notes */}
          <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 sm:p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono uppercase tracking-wider text-xs">
              <AlertCircle className="w-4 h-4 text-zinc-400" />
              Matchup Considerations
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {currentDeck.cons.map((con, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-zinc-500 font-mono">—</span>
                  <span className="text-zinc-300">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Upgrades */}
        {currentDeck.recommendedUpgrades && currentDeck.recommendedUpgrades.length > 0 && (
          <div className="rounded-xl bg-[#111215] border border-white/[0.08] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Recommended Upgrades & Tech Cards
              </h4>
              <span className="text-[11px] font-mono text-zinc-500">Competitive Additions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {currentDeck.recommendedUpgrades.map((upg, uIdx) => (
                <div 
                  key={uIdx}
                  className="rounded-lg bg-black/40 border border-white/[0.05] p-3 space-y-1.5 text-xs"
                >
                  <div className="font-semibold text-zinc-100">
                    {upg.cardName}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {upg.role}
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
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
