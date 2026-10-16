import React, { useState, useEffect } from 'react';
import { VanguardCard } from '../types/card';
import { 
  X, Sparkles, ChevronDown, ChevronUp, Layers, Info, 
  ChevronLeft, ChevronRight, Copy, Check 
} from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface CardModalProps {
  card: VanguardCard | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCards?: number;
}

export const CardModal: React.FC<CardModalProps> = ({ 
  card, 
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCards
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedText, setCopiedText] = useState(false);

  // Reset variant index when card changes
  useEffect(() => {
    setSelectedVariantIndex(0);
    setOpenFaqIndex(0);
  }, [card?.cardNo]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!card) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onClose, onPrev, onNext]);

  if (!card) return null;

  const activeVariant = card.artVariants && card.artVariants.length > selectedVariantIndex
    ? card.artVariants[selectedVariantIndex]
    : undefined;

  const currentImageUrl = activeVariant
    ? (activeVariant.localImageUrl || activeVariant.imageUrl)
    : (card.localImageUrl || card.imageUrl);

  const handleCopySkillText = () => {
    playHapticClick(800);
    const textToCopy = `${card.name} (${card.cardNo})\n${card.skillText}\n${card.flavorText ? `Flavor: "${card.flavorText}"` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Format skill text to replace vanguard tags with stylized badges
  const formatSkillText = (text: string) => {
    if (!text) return <p className="text-slate-400 italic text-sm">No skill text.</p>;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const formatted = line
        .replace(/\[AUTO\]/g, '★AUTO★')
        .replace(/\[ACT\]/g, '★ACT★')
        .replace(/\[CONT\]/g, '★CONT★')
        .replace(/\[Stride\]/g, '★STRIDE★')
        .replace(/\[1\/Turn\]/g, '★1/TURN★')
        .replace(/\[Over Trigger\]/g, '★OVER★');

      const parts = formatted.split(/(★AUTO★|★ACT★|★CONT★|★STRIDE★|★1\/TURN★|★OVER★)/g);

      return (
        <div key={idx} className="mb-2 leading-relaxed text-xs sm:text-sm text-slate-200">
          {parts.map((part, pIdx) => {
            if (part === '★AUTO★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-blue-600/90 text-blue-100 border border-blue-400/50">
                  AUTO
                </span>
              );
            }
            if (part === '★ACT★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-emerald-600/90 text-emerald-100 border border-emerald-400/50">
                  ACT
                </span>
              );
            }
            if (part === '★CONT★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-pink-600/90 text-pink-100 border border-pink-400/50">
                  CONT
                </span>
              );
            }
            if (part === '★STRIDE★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-amber-600/90 text-amber-100 border border-amber-400/50">
                  STRIDE
                </span>
              );
            }
            if (part === '★1/TURN★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-purple-600/90 text-purple-100 border border-purple-400/50">
                  1/Turn
                </span>
              );
            }
            if (part === '★OVER★') {
              return (
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[11px] font-bold rounded bg-rose-600/90 text-rose-100 border border-rose-400/50">
                  OVER TRIGGER
                </span>
              );
            }

            const subParts = part.split(/(\[VC?\]|\[RC?\]|\[GC?\]|COST|Soul Blast|Counter Blast|Energy Blast)/g);
            return (
              <span key={pIdx}>
                {subParts.map((sub, sIdx) => {
                  if (sub === '[VC]' || sub === '[V]') return <span key={sIdx} className="font-bold text-amber-300 bg-amber-950/70 px-1 rounded border border-amber-700/50 mr-1 text-[11px]">[VC]</span>;
                  if (sub === '[RC]' || sub === '[R]') return <span key={sIdx} className="font-bold text-cyan-300 bg-cyan-950/70 px-1 rounded border border-cyan-700/50 mr-1 text-[11px]">[RC]</span>;
                  if (sub === '[GC]' || sub === '[G]') return <span key={sIdx} className="font-bold text-emerald-300 bg-emerald-950/70 px-1 rounded border border-emerald-700/50 mr-1 text-[11px]">[GC]</span>;
                  if (sub === 'COST') return <span key={sIdx} className="font-semibold text-amber-300 font-mono">COST </span>;
                  if (sub === 'Soul Blast') return <span key={sIdx} className="text-purple-300 font-semibold">Soul Blast</span>;
                  if (sub === 'Counter Blast') return <span key={sIdx} className="text-rose-300 font-semibold">Counter Blast</span>;
                  if (sub === 'Energy Blast') return <span key={sIdx} className="text-sky-300 font-semibold">Energy Blast</span>;
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
    if (grade === null) return { bg: 'bg-purple-950 text-purple-300 border-purple-500/50', text: 'CREST' };
    switch (grade) {
      case 4: return { bg: 'bg-red-950 text-red-300 border-red-500', text: 'GRADE 4 / STRIDE' };
      case 3: return { bg: 'bg-amber-950 text-amber-300 border-amber-500', text: 'GRADE 3' };
      case 2: return { bg: 'bg-blue-950 text-blue-300 border-blue-500', text: 'GRADE 2' };
      case 1: return { bg: 'bg-emerald-950 text-emerald-300 border-emerald-500', text: 'GRADE 1' };
      case 0: return { bg: 'bg-slate-900 text-slate-300 border-slate-600', text: 'GRADE 0' };
      default: return { bg: 'bg-slate-900 text-slate-300 border-slate-600', text: `GRADE ${grade}` };
    }
  };

  const gradeInfo = getGradeBadge(card.grade);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md backdrop-enter"
      onClick={() => {
        playHapticClick(500);
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0c0f1c] border border-white/[0.12] p-5 sm:p-7 shadow-2xl modal-enter text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Navigation & Close Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${gradeInfo.bg}`}>
              {gradeInfo.text}
            </span>
            <span className="font-mono text-xs text-slate-400">
              {card.cardNo}
            </span>
            {currentIndex !== undefined && totalCards !== undefined && (
              <span className="text-xs font-mono text-slate-500">
                ({currentIndex + 1} of {totalCards})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                onClick={() => {
                  playHapticClick(600);
                  onPrev();
                }}
                title="Previous Card (←)"
                className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition pressable"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNext && (
              <button
                onClick={() => {
                  playHapticClick(600);
                  onNext();
                }}
                title="Next Card (→)"
                className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition pressable"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                playHapticClick(500);
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/[0.08] transition pressable ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Card Image & Art Variants */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[7/10] rounded-2xl overflow-hidden bg-slate-950 border border-white/[0.1] shadow-2xl group">
              <img 
                src={currentImageUrl} 
                alt={card.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                <span className="text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {activeVariant ? activeVariant.source : 'Card Preview'}
                </span>
              </div>
            </div>

            {/* Art Variant Switcher */}
            {card.artVariants && card.artVariants.length > 1 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-400" />
                  AUTHENTIC ART EDITIONS
                </p>
                <div className="flex gap-2">
                  {card.artVariants.map((variant, vIdx) => (
                    <button
                      key={vIdx}
                      onClick={() => {
                        playHapticClick(700);
                        setSelectedVariantIndex(vIdx);
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-mono transition-all pressable ${
                        selectedVariantIndex === vIdx
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                          : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                      }`}
                    >
                      {variant.rarity || (vIdx === 0 ? 'EN Edition' : 'JP Edition')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Copy Skill Button */}
            <button
              onClick={handleCopySkillText}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 transition pressable"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Card Text Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Card & Skill Text</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Card Stats, Skills, FAQs */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Title & Lore Name */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                {card.name}
              </h2>
              {card.kana && (
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {card.kana}
                </p>
              )}
            </div>

            {/* Stat Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 font-mono block">POWER</span>
                <span className="text-sm font-bold text-amber-300 font-mono">
                  {card.power ? card.power.toLocaleString() : '-'}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 font-mono block">SHIELD</span>
                <span className="text-sm font-bold text-cyan-300 font-mono">
                  {card.shield !== null && card.shield !== undefined ? `+${card.shield.toLocaleString()}` : '-'}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 font-mono block">CRITICAL</span>
                <span className="text-sm font-bold text-rose-300 font-mono">
                  {card.critical || (card.grade !== null ? 1 : '-')}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 font-mono block">NATION</span>
                <span className="text-xs font-semibold text-slate-200 truncate block">
                  {card.nation}
                </span>
              </div>
            </div>

            {/* Additional Meta Details */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300">
                <strong className="text-slate-400 font-normal">Clan: </strong>{card.clan}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300">
                <strong className="text-slate-400 font-normal">Race: </strong>{card.race}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300">
                <strong className="text-slate-400 font-normal">Type: </strong>{card.cardType}
              </span>
              {card.triggerType && (
                <span className="px-2 py-0.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-semibold">
                  {card.triggerType} Trigger
                </span>
              )}
            </div>

            {/* Skill Effect Text Card */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <span className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  CARD SKILL & ABILITY
                </span>
                {card.skillIcon && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
                    {card.skillIcon}
                  </span>
                )}
              </div>
              <div className="pt-1">
                {formatSkillText(card.skillText)}
              </div>
            </div>

            {/* Trigger Effect if applicable */}
            {card.triggerEffect && (
              <div className="rounded-xl bg-rose-950/30 border border-rose-800/40 p-3 space-y-1">
                <span className="text-[11px] font-mono font-bold text-rose-300 uppercase">
                  Trigger Effect ({card.triggerType})
                </span>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {card.triggerEffect}
                </p>
              </div>
            )}

            {/* Flavor Text */}
            {card.flavorText && (
              <div className="italic text-xs text-slate-400 border-l-2 border-amber-500/40 pl-3 py-0.5">
                "{card.flavorText}"
              </div>
            )}

            {/* Official FAQs & Rulings */}
            {card.faqs && card.faqs.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  Official Rulings & FAQs ({card.faqs.length})
                </span>
                <div className="space-y-2">
                  {card.faqs.map((faq, fIdx) => (
                    <div 
                      key={fIdx}
                      className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          playHapticClick(600);
                          setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx);
                        }}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.02] transition"
                      >
                        <span className="text-xs font-semibold text-slate-200 pr-2">
                          Q: {faq.question}
                        </span>
                        {openFaqIndex === fIdx ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaqIndex === fIdx && (
                        <div className="px-3 pb-3 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04] pt-2">
                          <strong className="text-amber-400 font-mono mr-1">A:</strong>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
