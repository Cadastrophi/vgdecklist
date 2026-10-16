import React, { useState } from 'react';
import { VanguardCard } from '../types/card';
import { 
  X, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, Shield
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
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<boolean>(false);

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
                <span key={pIdx} className="inline-block px-1.5 py-0.2 mr-1 text-[10px] font-mono font-bold rounded bg-purple-600/90 text-purple-100 border border-purple-400/50">
                  1/TURN
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
            return part;
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
        className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto rounded-3xl bg-[#0c0f1c] border border-white/[0.12] p-4 sm:p-7 shadow-2xl modal-enter text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Navigation & Close Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border truncate ${gradeInfo.bg}`}>
              {gradeInfo.text}
            </span>
            <span className="font-mono text-xs text-slate-400 truncate">
              {card.cardNo}
            </span>
            {currentIndex !== undefined && totalCards !== undefined && (
              <span className="text-xs font-mono text-slate-400 hidden xs:inline">
                ({currentIndex + 1} of {totalCards})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {onPrev && (
              <button
                onClick={() => {
                  playHapticClick(600);
                  onPrev();
                }}
                aria-label="Previous Card"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] flex items-center justify-center transition pressable"
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
                aria-label="Next Card"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] flex items-center justify-center transition pressable"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                playHapticClick(500);
                onClose();
              }}
              aria-label="Close Modal"
              className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 border border-white/[0.08] flex items-center justify-center transition pressable ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7">
          
          {/* Left Column: Card Scan & Artwork Switcher */}
          <div className="md:col-span-5 flex flex-col items-center space-y-3">
            <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-[7/10] rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.15] shadow-2xl relative group">
              <img 
                src={currentImageUrl} 
                alt={card.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] font-mono text-slate-200">
                  {activeVariant ? activeVariant.rarity : 'Standard Art'}
                </span>
              </div>
            </div>

            {/* Language / Edition Art Variant Switcher */}
            {card.artVariants && card.artVariants.length > 1 && (
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
                {card.artVariants.map((v, vIdx) => (
                  <button
                    key={v.rarity || vIdx}
                    onClick={() => {
                      playHapticClick(650);
                      setSelectedVariantIndex(vIdx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition pressable ${
                      selectedVariantIndex === vIdx
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {v.rarity || 'Variant'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Card Attributes, Skills, Flavor & Rulings */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Title & Key Meta */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-wide break-words">
                {card.name}
              </h2>
              {card.kana && (
                <p className="text-xs text-slate-400 font-mono mt-0.5">{card.kana}</p>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block font-mono">POWER</span>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  {card.power ? card.power.toLocaleString() : '—'}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block font-mono">SHIELD</span>
                <span className="text-sm font-bold text-cyan-300 font-mono">
                  {card.shield !== null && card.shield !== undefined ? `+${card.shield.toLocaleString()}` : '—'}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block font-mono">CRITICAL</span>
                <span className="text-sm font-bold text-rose-400 font-mono">
                  {card.critical !== null ? card.critical : '—'}
                </span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block font-mono">TYPE</span>
                <span className="text-xs font-bold text-emerald-400 font-mono truncate block">
                  {card.cardType}
                </span>
              </div>
            </div>

            {/* Secondary Attributes */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                Nation: <strong className="text-white">{card.nation}</strong>
              </span>
              {card.clan && (
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  Clan: <strong className="text-white">{card.clan}</strong>
                </span>
              )}
              {card.race && (
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  Race: <strong className="text-white">{card.race}</strong>
                </span>
              )}
              {card.triggerType && (
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {card.triggerType} Trigger
                </span>
              )}
            </div>

            {/* Skill Text Box */}
            <div className="rounded-2xl bg-black/40 border border-white/[0.08] p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" /> Card Skill Text
                </span>
                <button
                  onClick={handleCopySkillText}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition pressable"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 border-t border-white/[0.06]">
                {formatSkillText(card.skillText)}
              </div>
            </div>

            {/* Flavor Text */}
            {card.flavorText && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs italic text-slate-400 leading-relaxed">
                "{card.flavorText}"
              </div>
            )}

            {/* Official Wiki Cardfight Link */}
            <div className="pt-2">
              <a
                href={`https://cardfight.fandom.com/wiki/Special:Search?query=${encodeURIComponent(card.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition"
              >
                <span>View Cardfight Wiki Rulings & Printings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
