import React, { useState } from 'react';
import { PRECON_DECKS, CHRONOJET_PILOTING_MASTERCLASS } from '../data/preconGuides';
import { 
  BookOpen, Sparkles, Swords, Zap, CheckCircle2, XCircle, 
  HelpCircle, Layers, Flame, Trophy, AlertTriangle, Lightbulb
} from 'lucide-react';

export const TipsAndTricks: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chronojet-pilot' | 'precons'>('chronojet-pilot');
  const [selectedPreconId, setSelectedPreconId] = useState<string>('chronojet');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});

  const selectedPrecon = PRECON_DECKS.find(d => d.id === selectedPreconId) || PRECON_DECKS[0];
  const currentStep = CHRONOJET_PILOTING_MASTERCLASS[currentStepIndex];

  const handleSelectQuizOption = (stepIndex: number, optionIndex: number) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [stepIndex]: optionIndex
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950/80 border border-purple-800/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Vanguard D-Standard Pre-con & Piloting Compendium
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vanguard Pre-con Guide & Chronojet Masterclass
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to master Vanguard pre-constructed decks. Learn the Stride mechanics, resource management, and step-by-step piloting for the legendary <span className="text-amber-400 font-semibold">Stride Deckset Chronojet</span>.
          </p>

          {/* Primary View Switcher */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSubTab('chronojet-pilot')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeSubTab === 'chronojet-pilot'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg shadow-amber-950/40 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-purple-900/40'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              How to Pilot Chronojet (Interactive Masterclass)
            </button>
            <button
              onClick={() => setActiveSubTab('precons')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeSubTab === 'precons'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-950/40 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-purple-900/40'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-300" />
              Pre-Con Deck Directory & Comparisons
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: HOW TO PILOT CHRONOJET (Interactive Masterclass) */}
      {activeSubTab === 'chronojet-pilot' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Step Navigation Bar */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-purple-900/40 p-3 sm:p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Course Progress: Step {currentStepIndex + 1} of {CHRONOJET_PILOTING_MASTERCLASS.length}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                {currentStep.phase}
              </span>
            </div>

            {/* Horizontal Step Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {CHRONOJET_PILOTING_MASTERCLASS.map((step, idx) => (
                <button
                  key={step.step}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    currentStepIndex === idx
                      ? 'bg-gradient-to-br from-purple-900/80 to-amber-950/70 border-amber-500/80 text-white shadow-md shadow-purple-950/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase ${currentStepIndex === idx ? 'text-amber-400' : 'text-slate-500'}`}>
                    Step {step.step}
                  </span>
                  <span className="text-xs font-bold truncate w-full mt-0.5">
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Step Details (2 Columns) */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-purple-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      STEP {currentStep.step}
                    </span>
                    <span className="text-xs text-purple-300 font-semibold">
                      {currentStep.phase}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {currentStep.title}
                  </h2>
                </div>

                {/* Cards involved chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {currentStep.cardsInvolved.map((cardName, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-purple-950/80 text-[11px] text-purple-200 border border-purple-800/40 font-mono">
                      {cardName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-slate-200 leading-relaxed text-base">
                {currentStep.summary}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Tactical Directives
                </h3>
                <div className="grid gap-2.5">
                  {currentStep.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-purple-900/20 text-slate-300 text-sm">
                      <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 text-xs flex items-center justify-center font-mono shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border-l-4 border-amber-500 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Pro Tournament Tip
                  </h4>
                  <p className="text-sm text-amber-100/90 mt-1">
                    {currentStep.proTip}
                  </p>
                </div>
              </div>

              {/* Interactive Quiz / Scenario */}
              {currentStep.interactiveScenario && (
                <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-4">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>Quick Pilot Check: What would you do?</span>
                  </div>
                  <p className="text-sm text-slate-200 font-medium">
                    {currentStep.interactiveScenario.question}
                  </p>

                  <div className="grid gap-2">
                    {currentStep.interactiveScenario.options.map((opt, optIdx) => {
                      const hasSelected = selectedQuizAnswers[currentStepIndex] !== undefined;
                      const isSelected = selectedQuizAnswers[currentStepIndex] === optIdx;

                      let buttonStyle = 'bg-slate-950/80 border-purple-900/40 text-slate-300 hover:bg-slate-900 hover:border-purple-600';
                      if (hasSelected) {
                        if (opt.isCorrect) {
                          buttonStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-950/30';
                        } else if (isSelected) {
                          buttonStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                        } else {
                          buttonStyle = 'opacity-50 bg-slate-950/40 border-slate-900 text-slate-500';
                        }
                      }

                      return (
                        <div key={optIdx} className="space-y-1.5">
                          <button
                            disabled={hasSelected}
                            onClick={() => handleSelectQuizOption(currentStepIndex, optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${buttonStyle}`}
                          >
                            <span>{opt.text}</span>
                            {hasSelected && opt.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {hasSelected && isSelected && !opt.isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                            )}
                          </button>
                          {hasSelected && isSelected && (
                            <p className={`text-xs px-3 py-1.5 rounded-lg ${opt.isCorrect ? 'bg-emerald-900/30 text-emerald-300' : 'bg-rose-900/30 text-rose-300'}`}>
                              {opt.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prev / Next Step Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={currentStepIndex === CHRONOJET_PILOTING_MASTERCLASS.length - 1}
                  onClick={() => setCurrentStepIndex(prev => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-md hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next Step →
                </button>
              </div>

            </div>

            {/* Side Card: The Stride & Crest Fast Cheat-Sheet */}
            <div className="space-y-6">
              
              {/* Crest Rule Box */}
              <div className="bg-slate-900/90 rounded-2xl border border-amber-900/40 p-5 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <h3>Chronojet Crest Power Matrix</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your Crest gives <span className="text-amber-300 font-semibold">+5,000 Power</span> to your Vanguard and front-row rear-guards for <span className="underline decoration-amber-500">each face-up card</span> in your G-Zone during your turn.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70 border border-purple-900/30">
                    <span className="text-slate-400">1st Stride (Faterider cost):</span>
                    <span className="text-amber-400 font-bold">+5,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70 border border-purple-900/30">
                    <span className="text-slate-400">2nd Stride (Nextage start):</span>
                    <span className="text-amber-400 font-bold">+10,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70 border border-purple-900/30">
                    <span className="text-slate-400">Nextage GB2 Return + Flip:</span>
                    <span className="text-cyan-400 font-bold">+15,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70 border border-amber-500/40 bg-amber-950/20">
                    <span className="text-amber-200">Chronojet Restand Attack:</span>
                    <span className="text-emerald-400 font-bold">+20,000+!</span>
                  </div>
                </div>
              </div>

              {/* Key Mulligan & Search Card */}
              <div className="bg-slate-900/90 rounded-2xl border border-purple-900/40 p-5 space-y-3 shadow-xl">
                <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Mulligan Priority
                </h3>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span><strong>Keep 1 Steam Breath Dragon</strong> (Searches Chronojet / counts as G3 for Stride).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span><strong>Keep Upstream Dragon</strong> (Enables early rush & Grade 1 engine call).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span><strong>Keep 1 Sentinel (Arlim)</strong> against fast aggro decks.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span><strong>Send back all Triggers</strong> (Never keep triggers in opening hand).</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: PRE-CON DECK DIRECTORY & COMPARISONS */}
      {activeSubTab === 'precons' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Deck Horizontal Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {PRECON_DECKS.map(deck => (
              <button
                key={deck.id}
                onClick={() => setSelectedPreconId(deck.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedPreconId === deck.id
                    ? 'bg-gradient-to-r from-purple-700 to-amber-600 text-white shadow-lg shadow-purple-950/50 scale-[1.02] border border-amber-500/50'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-purple-900/30'
                }`}
              >
                <span>{deck.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-amber-300 font-mono">
                  {deck.code}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Deck Overview Box */}
          <div className="bg-slate-900/90 rounded-3xl border border-purple-900/40 p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-900/30 pb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    {selectedPrecon.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300">
                    {selectedPrecon.nation}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    Difficulty: {selectedPrecon.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedPrecon.name}
                </h2>
                <p className="text-sm font-medium text-amber-400 mt-1">
                  "{selectedPrecon.tagline}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-900/30 md:text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Key Boss Unit
                </span>
                <span className="text-lg font-bold text-purple-200">
                  {selectedPrecon.keyBoss}
                </span>
              </div>
            </div>

            {/* Overview narrative */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedPrecon.overview}
            </p>

            {/* Mechanics Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Signature Playstyle & Mechanics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPrecon.mechanics.map((mech, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/30 space-y-1.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {mech.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {mech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pros */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Strengths & Advantages
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedPrecon.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Weaknesses & Vulnerabilities
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedPrecon.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✗</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Signature Combos */}
            {selectedPrecon.keyCombos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-2">
                  <Swords className="w-4 h-4 text-purple-400" />
                  Core Attack Sequences & Combos
                </h3>
                <div className="grid gap-4">
                  {selectedPrecon.keyCombos.map((combo, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-950/70 border border-purple-900/30 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-amber-300">
                          {combo.name}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {combo.cards.map((c, ci) => (
                            <span key={ci} className="px-2 py-0.5 rounded bg-purple-950 text-[10px] text-purple-300 border border-purple-800/40 font-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ol className="space-y-1.5 text-xs text-slate-300 pl-4 list-decimal">
                        {combo.steps.map((st, si) => (
                          <li key={si} className="leading-relaxed">
                            {st}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Upgrades */}
            {selectedPrecon.recommendedUpgrades.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Top Recommended Card Upgrades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedPrecon.recommendedUpgrades.map((upg, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-cyan-900/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {upg.cardName}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                          {upg.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {upg.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
