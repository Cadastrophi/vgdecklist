import React, { useEffect, useState } from 'react';
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
  const [selectedArtIndex, setSelectedArtIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Reset selected art on card change
  useEffect(() => {
    setSelectedArtIndex(0);
    setCopiedText(false);
  }, [card]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!card) return;
      if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onPrev, onNext]);

  if (!card) return null;

  // Available image variants
  const artVariants = [
    { label: 'Standard', url: card.localImageUrl || card.imageUrl }
  ];
  if (card.artVariants && card.artVariants.length > 0) {
    card.artVariants.forEach((v) => {
      artVariants.push({
        label: v.rarity || 'Alternate',
        url: v.localImageUrl || v.imageUrl
      });
    });
  }

  const currentDisplayUrl = artVariants[selectedArtIndex]?.url || card.localImageUrl || card.imageUrl;

  const handleCopySkillText = () => {
    playHapticClick(850);
    const content = `${card.name} (${card.cardNo})\n${card.cardType} | Grade ${card.grade ?? 0} | Nation: ${card.nation}${card.clan ? ` | Clan: ${card.clan}` : ''}\nPower: ${card.power ?? 'N/A'} | Shield: ${card.shield ?? 'N/A'}\n\n[Skill Text]\n${card.skillText}\n\n[Flavor]\n"${card.flavorText || 'None'}"`;
    navigator.clipboard.writeText(content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Clean, editorial skill tag formatter (no garish rainbow blocks)
  const formatSkillText = (text: string) => {
    if (!text) return null;
    
    const parts = text.split(/(\[[A-Z0-9\s/+-]+\]|\([^)]+\))/g);
    return parts.map((part, index) => {
      if (!part) return null;

      // Special Keyword brackets
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span 
            key={index} 
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/[0.08] border border-white/[0.12] text-zinc-200 mr-1 my-0.5 align-baseline"
          >
            {part.slice(1, -1)}
          </span>
        );
      }

      // Cost or reminder parentheses
      if (part.startsWith('(') && part.endsWith(')')) {
        return (
          <span key={index} className="text-zinc-500 text-xs italic font-sans">
            {part}{' '}
          </span>
        );
      }

      return <span key={index} className="text-zinc-300 text-xs leading-relaxed">{part}</span>;
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in"
      onClick={() => {
        playHapticClick(500);
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto rounded-2xl bg-[#0c0d10] border border-white/[0.1] shadow-2xl p-5 sm:p-7 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white/[0.06] border border-white/[0.1] text-zinc-300">
              {card.cardNo}
            </span>
            {currentIndex !== undefined && totalCards !== undefined && (
              <span className="text-[11px] font-mono text-zinc-500">
                Card {currentIndex + 1} of {totalCards}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onPrev && (
              <button
                onClick={() => {
                  playHapticClick(600);
                  onPrev();
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors pressable"
                title="Previous card (Left Arrow)"
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
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors pressable"
                title="Next card (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                playHapticClick(500);
                onClose();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors ml-1 pressable"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* Card Image Column */}
          <div className="sm:col-span-5 space-y-3">
            <div className="relative aspect-[7/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.08] shadow-lg">
              <img 
                src={currentDisplayUrl} 
                alt={card.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Art switcher if multiple variants exist */}
            {artVariants.length > 1 && (
              <div className="flex rounded-lg bg-black/40 border border-white/[0.08] p-0.5">
                {artVariants.map((art, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playHapticClick(650);
                      setSelectedArtIndex(idx);
                    }}
                    className={`flex-1 py-1 rounded text-xs font-mono transition-colors ${
                      selectedArtIndex === idx
                        ? 'bg-zinc-100 text-zinc-950 font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {art.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Card Details Column */}
          <div className="sm:col-span-7 space-y-4">
            
            {/* Title & Kana */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {card.name}
              </h3>
              {card.kana && (
                <p className="text-xs font-mono text-zinc-500">
                  {card.kana}
                </p>
              )}
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-2.5 text-center">
                <span className="text-[10px] text-zinc-500 font-mono block uppercase">Grade</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                  {card.grade !== null ? `G${card.grade}` : '—'}
                </span>
              </div>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-2.5 text-center">
                <span className="text-[10px] text-zinc-500 font-mono block uppercase">Power</span>
                <span className="text-sm sm:text-base font-bold text-zinc-100 font-mono mt-0.5">
                  {card.power ? card.power.toLocaleString() : '—'}
                </span>
              </div>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-2.5 text-center">
                <span className="text-[10px] text-zinc-500 font-mono block uppercase">Shield</span>
                <span className="text-sm sm:text-base font-bold text-zinc-100 font-mono mt-0.5">
                  {card.shield ? `+${card.shield.toLocaleString()}` : '—'}
                </span>
              </div>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-2.5 text-center">
                <span className="text-[10px] text-zinc-500 font-mono block uppercase">Critical</span>
                <span className="text-sm sm:text-base font-bold text-zinc-100 font-mono mt-0.5">
                  {card.critical ?? '—'}
                </span>
              </div>
            </div>

            {/* Metadata tags */}
            <div className="flex flex-wrap gap-1.5 text-xs text-zinc-400 font-mono">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                Type: <strong className="text-zinc-200 font-sans">{card.cardType}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                Nation: <strong className="text-zinc-200 font-sans">{card.nation}</strong>
              </span>
              {card.clan && (
                <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                  Clan: <strong className="text-zinc-200 font-sans">{card.clan}</strong>
                </span>
              )}
              {card.race && (
                <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                  Race: <strong className="text-zinc-200 font-sans">{card.race}</strong>
                </span>
              )}
              {card.triggerType && (
                <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.12] text-zinc-200 font-semibold">
                  {card.triggerType} Trigger
                </span>
              )}
            </div>

            {/* Skill Text Box */}
            <div className="rounded-xl bg-black/40 border border-white/[0.08] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-zinc-400 uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-400" /> Skill Text
                </span>
                <button
                  onClick={handleCopySkillText}
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors pressable"
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

              <div className="pt-2 border-t border-white/[0.06] leading-relaxed">
                {formatSkillText(card.skillText)}
              </div>
            </div>

            {/* Flavor Text */}
            {card.flavorText && (
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs italic text-zinc-400 leading-relaxed">
                "{card.flavorText}"
              </div>
            )}

            {/* Wiki Link */}
            <div className="pt-1">
              <a
                href={`https://cardfight.fandom.com/wiki/Special:Search?query=${encodeURIComponent(card.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
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
