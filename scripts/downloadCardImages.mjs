import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cardsJsonPath = path.join(__dirname, '../src/data/cards.json');
const publicCardsDir = path.join(__dirname, '../public/cards');

async function downloadImages() {
  if (!fs.existsSync(publicCardsDir)) {
    fs.mkdirSync(publicCardsDir, { recursive: true });
  }

  const cards = JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8'));
  console.log(`Starting download of card images for ${cards.length} Vanguard cards...`);

  let downloadedCount = 0;
  let totalVariants = 0;

  for (const card of cards) {
    // Ensure card has localImageUrl fallback
    const baseCode = card.cardNo.replace('/', '-');

    if (card.artVariants && card.artVariants.length > 0) {
      for (let idx = 0; idx < card.artVariants.length; idx++) {
        const variant = card.artVariants[idx];
        totalVariants++;
        const suffix = idx === 0 ? 'EN' : 'JP';
        const filename = `${baseCode}_${suffix}.png`;
        const localFilePath = path.join(publicCardsDir, filename);

        if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).size > 1000) {
          variant.localImageUrl = `/cards/${filename}`;
          if (idx === 0) card.localImageUrl = `/cards/${filename}`;
          continue;
        }

        process.stdout.write(`  Downloading ${card.cardNo} (${suffix}) from ${variant.imageUrl}... `);
        try {
          const res = await fetch(variant.imageUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://cardfight.fandom.com/',
              'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            },
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(localFilePath, buffer);
          variant.localImageUrl = `/cards/${filename}`;
          if (idx === 0) card.localImageUrl = `/cards/${filename}`;
          downloadedCount++;
          console.log(`OK (${(buffer.length / 1024).toFixed(1)} KB)`);
        } catch (err) {
          console.log(`Failed: ${err.message}`);
        }
      }
    } else {
      // Single main image
      totalVariants++;
      const filename = `${baseCode}.png`;
      const localFilePath = path.join(publicCardsDir, filename);

      if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).size > 1000) {
        card.localImageUrl = `/cards/${filename}`;
        continue;
      }

      process.stdout.write(`  Downloading ${card.cardNo} from ${card.imageUrl}... `);
      try {
        const res = await fetch(card.imageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://cardfight.fandom.com/',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localFilePath, buffer);
        card.localImageUrl = `/cards/${filename}`;
        downloadedCount++;
        console.log(`OK (${(buffer.length / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.log(`Failed: ${err.message}`);
      }
    }
  }

  // Save updated cards.json with localImageUrl paths
  fs.writeFileSync(cardsJsonPath, JSON.stringify(cards, null, 2), 'utf8');
  console.log(`\nFinished: ${downloadedCount} new images downloaded (Total variants: ${totalVariants}) in ${publicCardsDir}`);
}

downloadImages().catch(console.error);
