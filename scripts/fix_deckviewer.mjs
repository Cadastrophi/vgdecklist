import fs from 'fs';

let content = fs.readFileSync('src/components/DeckViewer.tsx', 'utf8');

const target = `{copied ? (\\n                <>\\n                  <Check className="w-4 h-4 text-emerald-400" />\\n                  <span className="text-emerald-400 font-semibold">Decklist Copied!</span>\\n                </>\\n              ) : (\\n                <>\\n                  <Copy className="w-4 h-4 text-amber-400" />\\n                  <span>Copy Text Decklist</span>\\n                </>\\n              )}`;

const replacement = `{copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Decklist Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Text Decklist</span>
                </>
              )}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/DeckViewer.tsx', content, 'utf8');
  console.log('Successfully replaced broken JSX in DeckViewer.tsx');
} else {
  console.log('Target string not found in DeckViewer.tsx');
}
