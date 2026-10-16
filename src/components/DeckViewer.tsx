import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { DeckStructure } from '../types/deck';
import { 
  ArrowRight, Flame, Copy, Check, Battery, Award, Sparkles, RefreshCw, Wand2
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface DeckViewerProps {
  deck: DeckStructure;
  onSelectCard: (card: VanguardCard) => void;
  onSwitchDeck: (deckId: string) => void;
  onOpenDeckCatalog: () => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({ 
  deck, 
  onSelectCard, 
  onSwitchDeck: _onSwitchDeck,
  onOpenDeckCatalog 
}) => {
  // Simulator states
  const [faceUpGCount, setFaceUpGCount] = useState<number>(2); // Chronojet
  const [energyCount, setEnergyCount] = useState<number>(3); // Energy Generator (Blaster & Overlord)
  const [personaRideActive, setPersonaRideActive] = useState<boolean>(true); // Blaster / Overlord
  const [overlordRestood, setOverlordRestood] = useState<boolean>(false); // Overlord Restand simulator
  const [harriMagiaSoulCount, setHarriMagiaSoulCount] = useState<number>(4); // Harri Soul Tracker

  // Copy toast state
  const [copied, setCopied] = useState<boolean>(false);

  const isChronojet = deck.id === 'd-ss03-chronojet';
  const isBlaster = deck.id === 'dz-ss14-blaster-blade';
  const isOverlord = deck.id === 'dz-ss15-dragonic-overlord';
  const isHarri = deck.id === 'dz-ss02-harri';

  const crestPowerBonus = faceUpGCount * 5000;

  const handleCopyDecklist = () => {
    playHapticClick(850);
    let text = `=== ${deck.name} (${deck.code}) ===\nNation: ${deck.nation}\n\n`;
    text += `[Ride Deck - ${deck.rideDeck.length} Cards]\n`;
    deck.rideDeck.forEach(c => {
      text += `1x [G${c.grade}] ${c.name} (${c.cardNo})\n`;
    });
    if (deck.crest) {
      text += `\n[Crest]\n1x ${deck.crest.name} (${deck.crest.cardNo})\n`;
    }
    if (deck.gDeck.length > 0) {
      text += `\n[G-Zone - ${deck.gDeck.reduce((a, b) => a + b.count, 0)} Cards]\n`;
      deck.gDeck.forEach(slot => {
        text += `${slot.count}x [G${slot.card.grade}] ${slot.card.name} (${slot.card.cardNo})\n`;
      });
    }
    text += `\n[Main Deck - ${deck.statistics.mainDeckCount} Cards]\n`;
    deck.mainDeck.forEach(slot => {
      const typeStr = slot.card.triggerType ? `[${slot.card.triggerType} Trigger]` : `[G${slot.card.grade}]`;
      text += `${slot.count}x ${typeStr} ${slot.card.name} (${slot.card.cardNo})\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Group Main Deck into clean categories
  const grade3Cards = deck.mainDeck.filter(s => s.category === 'Grade 3' || (!s.category && s.card.grade === 3));
  const grade2Cards = deck.mainDeck.filter(s => s.category === 'Grade 2' || (!s.category && s.card.grade === 2));
  const grade1Cards = deck.mainDeck.filter(s => s.category?.includes('Grade 1') || (!s.category && s.card.grade === 1));
  const orderCards = deck.mainDeck.filter(s => s.category?.includes('Order') || s.card.cardType.includes('Order'));
  const triggerCards = deck.mainDeck.filter(s => s.category?.includes('Trigger') || s.card.cardType === 'Trigger Unit');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">
      
      {/* Deck Hero Banner */}
      <div className={`relative rounded-3xl overflow-hidden border p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
        isChronojet
          ? 'border-purple-800/40 bg-gradient-to-br from-[#0c0d18] via-[#120f24] to-[#090b12]'
          : isBlaster
          ? 'border-blue-800/40 bg-gradient-to-br from-[#0a0f1d] via-[#0f172a] to-[#090b12]'
          : isOverlord
          ? 'border-rose-800/40 bg-gradient-to-br from-[#1c0c11] via-[#1a0f14] to-[#090b12]'
          : 'border-pink-800/40 bg-gradient-to-br from-[#1a0c1b] via-[#160e1d] to-[#090b12]'
      }`}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border bg-white/[0.05] border-white/[0.12] text-amber-300">
                {deck.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                {deck.nation}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                Pre-constructed Deckset
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
              {deck.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {deck.description}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-stretch gap-2.5 min-w-[210px]">
            <button
              onClick={handleCopyDecklist}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-100 border border-white/[0.12] transition font-medium text-xs sm:text-sm shadow-md pressable"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Decklist Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Text Decklist</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                playHapticClick(700);
                onOpenDeckCatalog();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.1] transition pressable"
            >
              <span>Browse All Decks (Filter Tab)</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Quick Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-6 pt-6 border-t border-white/[0.08]">
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Total Cards</p>
            <p className="text-base sm:text-lg font-bold text-white font-mono">{deck.statistics.totalCards}</p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Main Deck</p>
            <p className="text-base sm:text-lg font-bold text-amber-400 font-mono">{deck.statistics.mainDeckCount}</p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Ride Deck</p>
            <p className="text-base sm:text-lg font-bold text-sky-400 font-mono">{deck.statistics.rideDeckCount}</p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">{deck.gDeck.length > 0 ? 'G-Zone' : 'Crest / Orders'}</p>
            <p className="text-base sm:text-lg font-bold text-rose-400 font-mono">
              {deck.gDeck.length > 0 ? deck.statistics.gDeckCount : (deck.crest ? 1 : 0) + orderCards.reduce((a, b) => a + b.count, 0)}
            </p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Triggers</p>
            <p className="text-base sm:text-lg font-bold text-purple-400 font-mono">{deck.statistics.triggerCount}</p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Avg Power</p>
            <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{deck.statistics.averagePower.toLocaleString()}</p>
          </div>
          <div className="bg-[#0b0e18]/80 p-3 rounded-xl border border-white/[0.06] col-span-2 sm:col-span-1">
            <p className="text-[10px] text-slate-400 font-mono uppercase">Total Shield</p>
            <p className="text-base sm:text-lg font-bold text-indigo-400 font-mono">{deck.statistics.totalShield.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Dynamic Interactive Crest & Engine Simulators */}
      {isChronojet && (
        <div className="rounded-2xl bg-[#0e1220]/90 border border-purple-800/40 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-amber-300">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-heading">
                    Chronojet Crest Power Escalation Simulator
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800/50">
                    +5,000 Power / Face-up G-card
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Simulate G-Zone stride progress and calculate permanent front-row Vanguard & Rear-guard buffs.
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono">FRONT ROW BONUS</p>
              <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                +{crestPowerBonus.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/[0.06]">
            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Face-up G-Units in G-Zone:</span>
                <span className="font-mono font-bold text-purple-300">{faceUpGCount} / 8 Cards</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                value={faceUpGCount}
                onChange={(e) => {
                  playHapticClick(600 + Number(e.target.value) * 40);
                  setFaceUpGCount(parseInt(e.target.value, 10));
                }}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 (Turn 1-2)</span>
                <span>2 (First Stride)</span>
                <span>4 (Nextage Restand)</span>
                <span>8 (Late Game)</span>
              </div>
            </div>

            <div className="bg-[#131728] p-3 rounded-xl border border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-mono">CHRONOJET ATK</p>
                <p className="text-sm font-bold text-white font-mono">
                  {(13000 + crestPowerBonus).toLocaleString()} <span className="text-[10px] text-amber-400">(Base 13k)</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">REAR-GUARD ATK</p>
                <p className="text-sm font-bold text-emerald-400 font-mono">
                  {(10000 + crestPowerBonus).toLocaleString()} <span className="text-[10px] text-slate-400">(Base 10k)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBlaster && (
        <div className="rounded-2xl bg-[#0e1424]/90 border border-blue-800/40 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-500/30 text-sky-300">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-heading">
                    Energy Generator Crest & Aichi Icon Engine
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-sky-300 border border-blue-800/50">
                    DZ Standard Mechanics
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Track Energy counters (0–10) and simulate Blaster Blade retire/draw and Soul Saver Roar costs.
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono">CURRENT ENERGY</p>
              <p className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                {energyCount} <span className="text-xs text-slate-500 font-normal">/ 10</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/[0.06]">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Energy Blast (EB) Reservoir:</span>
                <span className="text-xs font-mono text-sky-400 font-semibold">{energyCount} Counters</span>
              </div>
              <div className="flex gap-1.5 h-4 w-full">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      playHapticClick(600 + i * 40);
                      setEnergyCount(i + 1);
                    }}
                    className={`flex-1 rounded cursor-pointer transition-all ${
                      i < energyCount
                        ? 'bg-gradient-to-t from-sky-600 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    playHapticClick(700);
                    setEnergyCount(prev => Math.min(10, prev + 3));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-600/40 text-xs font-medium pressable"
                >
                  +3 Energy (Ride Phase)
                </button>
                <button
                  disabled={energyCount < 3}
                  onClick={() => {
                    playHapticClick(500);
                    setEnergyCount(prev => Math.max(0, prev - 3));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 text-xs text-slate-300 border border-white/[0.08] pressable"
                >
                  Spend EB3 (Blaster Blade)
                </button>
                <button
                  disabled={energyCount < 5}
                  onClick={() => {
                    playHapticClick(500);
                    setEnergyCount(prev => Math.max(0, prev - 5));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 text-xs text-slate-300 border border-white/[0.08] pressable"
                >
                  Spend EB5 (Soul Saver)
                </button>
              </div>
            </div>

            <div className="bg-[#12192c] p-3 rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Persona Ride
                </span>
                <button
                  onClick={() => {
                    playHapticClick(700);
                    setPersonaRideActive(!personaRideActive);
                  }}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition ${
                    personaRideActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {personaRideActive ? 'ACTIVE (+10k)' : 'INACTIVE'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Alfred treats any G3 with an Aichi icon as Persona Ride!
              </p>
            </div>
          </div>
        </div>
      )}

      {isOverlord && (
        <div className="rounded-2xl bg-[#1d0e15]/90 border border-rose-800/40 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-900/40 border border-rose-500/30 text-rose-300">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-heading">
                    Dragonic Overlord Re-stand & Kai Icon Simulator
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800/50">
                    Dual Re-standing Strike
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  When Overlord attacks a rear-guard, stand again and gain Drive -1. Spend EB or CB for Nehalem and Bahr synergies!
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono">OVERLORD STATUS</p>
              <p className="text-sm font-black text-rose-400 font-mono">
                {overlordRestood ? 'RESTOOD (Drive 1)' : 'FIRST STRIKE (Twin Drive)'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/[0.06]">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Energy Reservoir:</span>
                <span className="text-xs font-mono text-rose-400 font-semibold">{energyCount} / 10 Energy</span>
              </div>
              <div className="flex gap-1.5 h-4 w-full">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      playHapticClick(600 + i * 40);
                      setEnergyCount(i + 1);
                    }}
                    className={`flex-1 rounded cursor-pointer transition-all ${
                      i < energyCount
                        ? 'bg-gradient-to-t from-rose-600 to-amber-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    playHapticClick(700);
                    setOverlordRestood(!overlordRestood);
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-600/40 text-xs font-medium pressable"
                >
                  {overlordRestood ? 'Reset Attack Phase' : 'Trigger Overlord Re-stand!'}
                </button>
                <button
                  onClick={() => {
                    playHapticClick(700);
                    setEnergyCount(prev => Math.min(10, prev + 3));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs text-slate-300 border border-white/[0.08] pressable"
                >
                  +3 Energy (Ride Phase)
                </button>
              </div>
            </div>

            <div className="bg-[#1f1017] p-3 rounded-xl border border-white/[0.06] space-y-1.5">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Flame Board Wipe
              </span>
              <p className="text-[11px] text-slate-400 leading-tight">
                Vortex Dragon: Pay SB5 to retire up to three opponent rear-guards!
              </p>
              <div className="text-[11px] font-mono text-rose-300">
                Opponent Rear-guards: Burned to Ash
              </div>
            </div>
          </div>
        </div>
      )}

      {isHarri && (
        <div className="rounded-2xl bg-[#1d0e22]/90 border border-pink-800/40 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-900/40 border border-pink-500/30 text-pink-300">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-heading">
                    Harri Magia Crest & Soul Acrobatics Simulator
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-300 border border-pink-800/50">
                    Pale Moon Magia Circus
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Track Soul resources for superior-calling Cutie Paratrooper and Jacqueline during Stride turns.
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono">CARDS IN SOUL</p>
              <p className="text-xl sm:text-2xl font-black text-pink-400 font-mono">
                {harriMagiaSoulCount} <span className="text-xs text-slate-500 font-normal">Cards</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/[0.06]">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Soul Reservoir:</span>
                <span className="text-xs font-mono text-pink-400 font-semibold">{harriMagiaSoulCount} Units</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={harriMagiaSoulCount}
                onChange={(e) => {
                  playHapticClick(600 + Number(e.target.value) * 30);
                  setHarriMagiaSoulCount(parseInt(e.target.value, 10));
                }}
                className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    playHapticClick(700);
                    setHarriMagiaSoulCount(prev => prev + 1);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900/60 text-pink-300 border border-pink-600/40 text-xs font-medium pressable"
                >
                  +1 Soul Charge
                </button>
                <button
                  disabled={harriMagiaSoulCount < 1}
                  onClick={() => {
                    playHapticClick(500);
                    setHarriMagiaSoulCount(prev => Math.max(0, prev - 1));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs text-slate-300 border border-white/[0.08] pressable disabled:opacity-40"
                >
                  Magia Call from Soul (-1 Soul)
                </button>
              </div>
            </div>

            <div className="bg-[#1f1025] p-3 rounded-xl border border-white/[0.06] space-y-1.5">
              <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Dragon Masquerade
              </span>
              <p className="text-[11px] text-slate-400 leading-tight">
                Harri Stride Crest: All units called by the Magia ability get +5,000 Power for each face-up G card!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ride Deck & Crest Zone */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <h3 className="text-lg font-bold text-white font-heading">Ride Deck & Crest Zone</h3>
            <span className="text-xs text-slate-400 font-mono">({deck.rideDeck.length} cards + {deck.crest ? '1 Crest' : '0 Crest'})</span>
          </div>
          <span className="text-xs text-slate-400">Guaranteed progression each turn</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {deck.rideDeck.map((card, idx) => (
            <div 
              key={card.cardNo}
              onClick={() => {
                playHapticClick(700);
                onSelectCard(card);
              }}
              className="group cursor-pointer rounded-2xl bg-[#0f1322] border border-white/[0.08] hover:border-sky-500/50 p-2.5 space-y-2 card-foil pressable shadow-lg"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                <img 
                  src={card.localImageUrl || card.imageUrl} 
                  alt={card.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-sky-300">
                  G{card.grade}
                </div>
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-sky-600/90 text-white text-[9px] font-mono font-bold">
                  STEP {idx}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  {card.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>{card.cardNo}</span>
                  <span className="text-amber-400">{card.power ? `${card.power.toLocaleString()}` : ''}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Crest Card */}
          {deck.crest && (
            <div 
              onClick={() => {
                playHapticClick(700);
                onSelectCard(deck.crest!);
              }}
              className="group cursor-pointer rounded-2xl bg-[#140e24] border border-purple-500/40 hover:border-purple-400 p-2.5 space-y-2 card-foil pressable shadow-lg"
            >
              <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-purple-950/60">
                <img 
                  src={deck.crest.localImageUrl || deck.crest.imageUrl} 
                  alt={deck.crest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-[10px] font-mono font-bold text-purple-200">
                  CREST
                </div>
                <div className="absolute bottom-1.5 left-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-center text-[9px] font-mono text-purple-300">
                  Permanent Zone
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-purple-200 truncate group-hover:text-purple-100 transition-colors">
                  {deck.crest.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>{deck.crest.cardNo}</span>
                  <span className="text-purple-300 font-semibold">Crest</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* G-Zone (for Stride decks) */}
      {deck.gDeck.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h3 className="text-lg font-bold text-white font-heading">G-Zone / Stride Units</h3>
              <span className="text-xs text-slate-400 font-mono">
                ({deck.gDeck.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <span className="text-xs text-slate-400">Stride Phase & Stride Crest Scaling</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {deck.gDeck.map(slot => (
              <div 
                key={slot.card.cardNo}
                onClick={() => {
                  playHapticClick(700);
                  onSelectCard(slot.card);
                }}
                className="group cursor-pointer rounded-2xl bg-[#140b12] border border-rose-900/40 hover:border-rose-500/50 p-2.5 space-y-2 card-foil pressable shadow-lg"
              >
                <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
                  <img 
                    src={slot.card.localImageUrl || slot.card.imageUrl} 
                    alt={slot.card.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-red-950/80 backdrop-blur-md border border-red-500/40 text-[10px] font-mono font-bold text-red-300">
                    G4 / STRIDE
                  </div>
                  <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-black text-amber-400">
                    x{slot.count}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate group-hover:text-rose-300 transition-colors">
                    {slot.card.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>{slot.card.cardNo}</span>
                    <span className="text-red-400">{slot.card.power?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Deck Breakdown */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="text-lg font-bold text-white font-heading">Main Deck Categories</h3>
            <span className="text-xs text-slate-400 font-mono">({deck.statistics.mainDeckCount} cards)</span>
          </div>
          <span className="text-xs text-slate-400">Click any card to inspect high-res art & FAQs</span>
        </div>

        {/* Grade 3 Units */}
        {grade3Cards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-400"></span>
                Grade 3 Units ({grade3Cards.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {grade3Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 2 Units */}
        {grade2Cards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-blue-400"></span>
                Grade 2 Units ({grade2Cards.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {grade2Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Grade 1 Units */}
        {grade1Cards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-emerald-400"></span>
                Grade 1 Units ({grade1Cards.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {grade1Cards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Orders (if present) */}
        {orderCards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-purple-400"></span>
                Orders & Regalis Piece ({orderCards.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {orderCards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}

        {/* Triggers */}
        {triggerCards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-pink-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-pink-400"></span>
                Triggers & Guardians ({triggerCards.reduce((a, b) => a + b.count, 0)} cards)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {triggerCards.map(slot => (
                <CardSlotTile key={slot.card.cardNo} slot={slot} onSelect={onSelectCard} />
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

interface CardSlotTileProps {
  slot: { card: VanguardCard; count: number; category?: string };
  onSelect: (card: VanguardCard) => void;
}

const CardSlotTile: React.FC<CardSlotTileProps> = ({ slot, onSelect }) => {
  const { card, count } = slot;

  return (
    <div 
      onClick={() => {
        playHapticClick(700);
        onSelect(card);
      }}
      className="group cursor-pointer rounded-2xl bg-[#0e1220] border border-white/[0.07] hover:border-white/[0.25] p-2.5 space-y-2 card-foil pressable shadow-lg"
    >
      <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-slate-900">
        <img 
          src={card.localImageUrl || card.imageUrl} 
          alt={card.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Count badge */}
        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-black text-amber-400 shadow-md">
          x{count}
        </div>

        {/* Grade / Trigger Chip */}
        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold">
          {card.triggerType ? (
            <span className={
              card.triggerType === 'Over' ? 'text-rose-400' :
              card.triggerType === 'Critical' ? 'text-amber-400' :
              card.triggerType === 'Draw' ? 'text-red-400' :
              card.triggerType === 'Front' ? 'text-pink-400' :
              card.triggerType === 'Heal' ? 'text-emerald-400' : 'text-sky-400'
            }>
              {card.triggerType}
            </span>
          ) : card.grade !== null ? (
            <span className="text-slate-200">G{card.grade}</span>
          ) : (
            <span className="text-purple-300">Order</span>
          )}
        </div>

        {/* Shield badge if present */}
        {card.shield !== null && card.shield !== undefined && (
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-300">
            +{card.shield.toLocaleString()}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
          {card.name}
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>{card.cardNo}</span>
          {card.power ? (
            <span className="text-amber-400 font-semibold">{card.power.toLocaleString()}</span>
          ) : (
            <span className="text-slate-500">-</span>
          )}
        </div>
      </div>
    </div>
  );
};
