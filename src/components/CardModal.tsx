import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { X, Shield, Swords, Sparkles, ChevronDown, ChevronUp, Layers, Info } from 'lucide-react';

interface CardModalProps {
  card: VanguardCard | null;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  if (!card) return null;

  const activeVariant = card.artVariants && card.artVariants.length > selectedVariantIndex
    ? card.artVariants[selectedVariantIndex]
    : undefined;

  const currentImageUrl = activeVariant
    ? (activeVariant.localImageUrl || activeVariant.imageUrl)
    : (card.localImageUrl || card.imageUrl);

  // Format skill text to replace vanguard tags with stylized badges
  const formatSkillText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Replace tags
      const formatted = line
        .replace(/\[AUTO\]/g, '★AUTO★')
        .replace(/\[ACT\]/g, '★ACT★')
        .replace(/\[CONT\]/g, '★CONT★')
        .replace(/\[Stride\]/g, '★STRIDE★')
        .replace(/\[1\/Turn\]/g, '★1/TURN★')
        .replace(/\[Over Trigger\]/g, '★OVER★');

      const parts = formatted.split(/(★AUTO★|★ACT★|★CONT★|★STRIDE★|★1\/TURN★|★OVER★)/g);

      return (
        <div key={idx} className="mb-2.5 leading-relaxed text-sm text-slate-200">
          {parts.map((part, pIdx) => {
            if (part === '★AUTO★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-blue-600/90 text-blue-100 border border-blue-400/50 shadow-sm">
                  AUTO
                </span>
              );
            }
            if (part === '★ACT★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-emerald-600/90 text-emerald-100 border border-emerald-400/50 shadow-sm">
                  ACT
                </span>
              );
            }
            if (part === '★CONT★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-pink-700/90 text-pink-100 border border-pink-400/50 shadow-sm">
                  CONT
                </span>
              );
            }
            if (part === '★STRIDE★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-amber-600/90 text-amber-100 border border-amber-400/50 shadow-sm">
                  STRIDE
                </span>
              );
            }
            if (part === '★1/TURN★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-purple-600/90 text-purple-100 border border-purple-400/50 shadow-sm">
                  1/Turn
                </span>
              );
            }
            if (part === '★OVER★') {
              return (
                <span key={pIdx} className="inline-block px-2 py-0.5 mr-1.5 text-xs font-bold rounded bg-rose-600/90 text-rose-100 border border-rose-400/50 shadow-sm">
                  OVER TRIGGER
                </span>
              );
            }
            // Highlight zones like [V], [R], [G]
            const subParts = part.split(/(\[V\]|\[R\]|\[G\]|COST|Soul Blast|Counter Blast)/g);
            return (
              <span key={pIdx}>
                {subParts.map((sub, sIdx) => {
                  if (sub === '[V]') return <span key={sIdx} className="font-bold text-amber-400 bg-amber-950/60 px-1 rounded border border-amber-700/40 mr-1">[V]</span>;
                  if (sub === '[R]') return <span key={sIdx} className="font-bold text-cyan-400 bg-cyan-950/60 px-1 rounded border border-cyan-700/40 mr-1">[R]</span>;
                  if (sub === '[G]') return <span key={sIdx} className="font-bold text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-700/40 mr-1">[G]</span>;
                  if (sub === 'COST') return <span key={sIdx} className="font-semibold text-amber-300 font-mono">COST </span>;
                  if (sub === 'Soul Blast') return <span key={sIdx} className="text-purple-300 font-semibold">Soul Blast</span>;
                  if (sub === 'Counter Blast') return <span key={sIdx} className="text-rose-300 font-semibold">Counter Blast</span>;
                  return sub;
                })}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const getGradeBadge = (grade: number | null) => {
    if (grade === null) return { bg: 'bg-purple-900/60 text-purple-200 border-purple-600/50', text: 'CREST' };
    switch (grade) {
      case 4: return { bg: 'bg-red-950 text-red-300 border-red-500', text: 'GRADE 4' };
      case 3: return { bg: 'bg-amber-950 text-amber-300 border-amber-500', text: 'GRADE 3' };
      case 2: return { bg: 'bg-blue-950 text-blue-300 border-blue-500', text: 'GRADE 2' };
      case 1: return { bg: 'bg-emerald-950 text-emerald-300 border-emerald-500', text: 'GRADE 1' };
      case 0: return { bg: 'bg-slate-900 text-slate-300 border-slate-600', text: 'GRADE 0' };
      default: return { bg: 'bg-slate-900 text-slate-300 border-slate-600', text: `GRADE ${grade}` };
    }
  };

  const gradeInfo = getGradeBadge(card.grade);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/50 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Visual Column */}
        <div className="md:w-5/12 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
          <div className="relative group max-w-[280px] w-full">
            {/* Card Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30 bg-slate-900 aspect-[5/7] flex items-center justify-center">
              {!imgError ? (
                <img
                  src={currentImageUrl}
                  alt={card.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border border-purple-700/50 text-center">
                  <div className="flex justify-between items-center text-xs text-purple-300 font-mono">
                    <span>{card.cardNo}</span>
                    <span>{card.rarity}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-amber-300 mb-2">{card.name}</h3>
                    <p className="text-xs text-slate-400 italic mb-2">{card.race}</p>
                    <span className={`inline-block px-3 py-1 rounded text-xs font-bold border ${gradeInfo.bg}`}>
                      {gradeInfo.text}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800">
                    {card.cardType}
                  </div>
                </div>
              )}
            </div>

            {/* Rarity & Card Number Badge */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="font-bold text-amber-400">{card.cardNo}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                {card.rarity}
              </span>
            </div>

            {/* Art Variants Switcher */}
            {card.artVariants && card.artVariants.length > 1 && (
              <div className="mt-3 flex gap-2 justify-center">
                {card.artVariants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      setImgError(false);
                    }}
                    className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all ${
                      selectedVariantIndex === idx
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {variant.rarity} Art
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Details Column */}
        <div className="md:w-7/12 p-6 flex flex-col overflow-y-auto max-h-[85vh]">
          {/* Header */}
          <div className="mb-4 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${gradeInfo.bg}`}>
                {gradeInfo.text}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/50">
                {card.cardType}
              </span>
              {card.triggerType && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-amber-950/80 text-amber-300 border border-amber-600/50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {card.triggerType} Trigger
                </span>
              )}
              {card.skillIcon && (
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {card.skillIcon}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-black tracking-wide text-white font-heading">
              {card.name}
            </h2>
            {card.kana && (
              <p className="text-xs font-mono text-purple-300/80">{card.kana}</p>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-rose-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-mono">POWER</p>
                <p className="text-sm font-bold text-rose-300 font-mono">
                  {card.power !== null ? card.power.toLocaleString() : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-x border-slate-800 px-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-mono">SHIELD</p>
                <p className="text-sm font-bold text-sky-300 font-mono">
                  {card.shield !== null ? card.shield.toLocaleString() : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-mono">CRITICAL</p>
                <p className="text-sm font-bold text-amber-300 font-mono">
                  {card.critical !== null ? card.critical : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Card Info Tags */}
          <div className="flex flex-wrap gap-2 text-xs mb-4 text-slate-400">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              <strong className="text-slate-200">Nation:</strong> {card.nation}
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              <strong className="text-slate-200">Clan:</strong> {card.clan}
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
              <strong className="text-slate-200">Race:</strong> {card.race}
            </span>
          </div>

          {/* Skill Text */}
          <div className="mb-5 p-4 rounded-xl bg-slate-900/80 border border-purple-900/40 relative">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Card Ability / Text
            </h4>
            <div className="space-y-1">
              {formatSkillText(card.skillText)}
            </div>

            {card.flavorText && (
              <p className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 italic">
                "{card.flavorText}"
              </p>
            )}
          </div>

          {/* FAQs and Rulings Accordion */}
          {card.faqs && card.faqs.length > 0 && (
            <div className="mt-auto">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Official Rulings & FAQs ({card.faqs.length})
              </h4>
              <div className="space-y-2">
                {card.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left px-3.5 py-2.5 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-2 hover:bg-slate-900/70 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-800">Q</span>
                        {faq.question}
                      </span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-3.5 py-2.5 text-xs text-slate-300 bg-slate-900/90 border-t border-slate-800/80 flex items-start gap-2 leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-800 shrink-0 mt-0.5">A</span>
                        <span>{faq.answer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Card Source */}
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{card.package}</span>
            <span className="text-slate-400">Cardfight!! Vanguard Standard Format</span>
          </div>

        </div>
      </div>
    </div>
  );
};
