import fs from 'fs';

// 1. Update CardModal.tsx
let modal = fs.readFileSync('src/components/CardModal.tsx', 'utf8');
const oldModalImg = `  const currentImageUrl = 
    card.artVariants && card.artVariants.length > selectedVariantIndex
      ? card.artVariants[selectedVariantIndex].imageUrl
      : card.imageUrl;`;

const newModalImg = `  const activeVariant = card.artVariants && card.artVariants.length > selectedVariantIndex
    ? card.artVariants[selectedVariantIndex]
    : undefined;

  const currentImageUrl = activeVariant
    ? (activeVariant.localImageUrl || activeVariant.imageUrl)
    : (card.localImageUrl || card.imageUrl);`;

if (modal.includes(oldModalImg)) {
  modal = modal.replace(oldModalImg, newModalImg);
  fs.writeFileSync('src/components/CardModal.tsx', modal, 'utf8');
  console.log('Updated CardModal.tsx with localImageUrl');
} else {
  console.log('CardModal.tsx target pattern not found');
}

// 2. Update CardExplorer.tsx
let explorer = fs.readFileSync('src/components/CardExplorer.tsx', 'utf8');
explorer = explorer.replaceAll('src={card.imageUrl}', 'src={card.localImageUrl || card.imageUrl}');
fs.writeFileSync('src/components/CardExplorer.tsx', explorer, 'utf8');
console.log('Updated CardExplorer.tsx with localImageUrl');

// 3. Update DeckViewer.tsx
let viewer = fs.readFileSync('src/components/DeckViewer.tsx', 'utf8');
viewer = viewer.replaceAll('src={deck.crest.imageUrl}', 'src={deck.crest.localImageUrl || deck.crest.imageUrl}');
viewer = viewer.replaceAll('src={card.imageUrl}', 'src={card.localImageUrl || card.imageUrl}');
fs.writeFileSync('src/components/DeckViewer.tsx', viewer, 'utf8');
console.log('Updated DeckViewer.tsx with localImageUrl');
