import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '1', desc: 'Deck View' },
    { key: '2', desc: 'Deck Catalog' },
    { key: '3', desc: 'Card Database' },
    { key: '4', desc: 'Strategy Guide' },
    { key: 'ESC', desc: 'Close open modal' },
    { key: '← / →', desc: 'Browse Previous / Next card inside Card Modal' },
    { key: '?', desc: 'Toggle keyboard shortcuts guide' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in"
      onClick={() => {
        playHapticClick(500);
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#0c0d10] border border-white/[0.1] p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <Keyboard className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Keyboard Shortcuts</h3>
              <p className="text-xs text-zinc-500">Quick keys for desktop browsing</p>
            </div>
          </div>
          <button
            onClick={() => {
              playHapticClick(500);
              onClose();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors pressable"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-xs text-zinc-300">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-black/60 border border-white/[0.1] text-[11px] font-mono font-medium text-zinc-200">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-zinc-500 font-mono">
            Press ESC to dismiss anytime
          </p>
        </div>
      </div>
    </div>
  );
};
