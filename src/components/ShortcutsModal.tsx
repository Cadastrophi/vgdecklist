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
    { key: '1', desc: 'Go to Deck Cockpit' },
    { key: '2', desc: 'Go to Filter Decks / Directory' },
    { key: '3', desc: 'Go to Card Explorer' },
    { key: '4', desc: 'Go to Piloting Guides' },
    { key: 'D', desc: 'Cycle Decks (Chronojet ↔ Blaster ↔ Overlord ↔ Harri)' },
    { key: '/', desc: 'Focus card search bar in Card Explorer' },
    { key: 'ESC', desc: 'Close any active modal' },
    { key: '← / →', desc: 'Browse Previous / Next card inside Card Modal' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md backdrop-enter"
      onClick={() => {
        playHapticClick(500);
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#0f1322] border border-white/[0.1] p-6 shadow-2xl modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08]">
              <Keyboard className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Browser navigation & power-user hotkeys</p>
            </div>
          </div>
          <button
            onClick={() => {
              playHapticClick(500);
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition pressable"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-xs text-slate-300">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-[#171c2e] border border-white/[0.12] text-[11px] font-mono font-semibold text-amber-300 shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-slate-400 font-mono">
            Optimized for keyboard power-users on all browsers
          </p>
        </div>
      </div>
    </div>
  );
};
