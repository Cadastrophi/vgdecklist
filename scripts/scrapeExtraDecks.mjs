import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cardsJsonPath = path.join(__dirname, '../src/data/cards.json');
const publicCardsDir = path.join(__dirname, '../public/cards');

const overlordCards = [
  { cardNo: 'DZ-SS15/001', pageTitle: 'Dragonic Overlord (Fighter Icon)', defaultName: 'Dragonic Overlord' },
  { cardNo: 'DZ-SS15/002', pageTitle: 'Dragon Knight, Nehalem (Fighter Icon)', defaultName: 'Dragon Knight, Nehalem' },
  { cardNo: 'DZ-SS15/003', pageTitle: 'Embodiment of Armor, Bahr (Fighter Icon)', defaultName: 'Embodiment of Armor, Bahr' },
  { cardNo: 'DZ-SS15/004', pageTitle: 'Lizard Soldier, Conroe (D Series)', defaultName: 'Lizard Soldier, Conroe' },
  { cardNo: 'DZ-SS15/005', pageTitle: 'Energy Generator', defaultName: 'Energy Generator' },
  { cardNo: 'DZ-SS15/006', pageTitle: 'Vortex Dragon (D Series)', defaultName: 'Vortex Dragon' },
  { cardNo: 'DZ-SS15/007', pageTitle: 'Great Flame Axe of Ambitious Scales, Colgaflan', defaultName: 'Great Flame Axe of Ambitious Scales, Colgaflan' },
  { cardNo: 'DZ-SS15/008', pageTitle: 'Berserk Dragon (Fighter Icon)', defaultName: 'Berserk Dragon' },
  { cardNo: 'DZ-SS15/009', pageTitle: 'Wyvern Strike, Tejas (D Series)', defaultName: 'Wyvern Strike, Tejas' },
  { cardNo: 'DZ-SS15/010', pageTitle: 'Dragon Monk, Gojo (Fighter Icon)', defaultName: 'Dragon Monk, Gojo' },
  { cardNo: 'DZ-SS15/011', pageTitle: 'Wyvern Strike, Jarran (D Series)', defaultName: 'Wyvern Strike, Jarran' },
  { cardNo: 'DZ-SS15/012', pageTitle: 'Wyvern Guard, Barri (D Series)', defaultName: 'Wyvern Guard, Barri' },
  { cardNo: 'DZ-SS15/013', pageTitle: 'Dragon Deity King of Resurgence, Dragveda', defaultName: 'Dragon Deity King of Resurgence, Dragveda' },
  { cardNo: 'DZ-SS15/014', pageTitle: 'Demonic Dragon Mage, Rakshasa (D Series)', defaultName: 'Demonic Dragon Mage, Rakshasa' },
  { cardNo: 'DZ-SS15/015', pageTitle: 'Embodiment of Spear, Tahr (D Series)', defaultName: 'Embodiment of Spear, Tahr' },
  { cardNo: 'DZ-SS15/016', pageTitle: 'Dragon Dancer, Monica (D Series)', defaultName: 'Dragon Dancer, Monica' },
  { cardNo: 'DZ-SS15/017', pageTitle: 'Dragon Monk, Genjo (D Series)', defaultName: 'Dragon Monk, Genjo' },
  { cardNo: 'DZ-SS15/018', pageTitle: 'Forbidoll Surrogate', defaultName: 'Forbidoll Surrogate' },
];

const harriCards = [
  { cardNo: 'DZ-SS02/001', pageTitle: 'Masked Magician, Harri (D Series)', defaultName: 'Masked Magician, Harri' },
  { cardNo: 'DZ-SS02/002', pageTitle: 'Card Dealer, Jacqueline (D Series)', defaultName: 'Card Dealer, Jacqueline' },
  { cardNo: 'DZ-SS02/003', pageTitle: 'Moonlight Melody Tamer, Betty (D Series)', defaultName: 'Moonlight Melody Tamer, Betty' },
  { cardNo: 'DZ-SS02/004', pageTitle: 'Happiness Collector (D Series)', defaultName: 'Happiness Collector' },
  { cardNo: 'DZ-SS02/005', pageTitle: 'Flying Manticore (D Series)', defaultName: 'Flying Manticore' },
  { cardNo: 'DZ-SS02/006', pageTitle: 'Direful Doll, Orneta', defaultName: 'Direful Doll, Orneta' },
  { cardNo: 'DZ-SS02/007', pageTitle: 'Darkside Princess (D Series)', defaultName: 'Darkside Princess' },
  { cardNo: 'DZ-SS02/008', pageTitle: 'Cutie Paratrooper (D Series)', defaultName: 'Cutie Paratrooper' },
  { cardNo: 'DZ-SS02/009', pageTitle: 'Masquerade Bunny (D Series)', defaultName: 'Masquerade Bunny' },
  { cardNo: 'DZ-SS02/010', pageTitle: 'Lunging Assistant', defaultName: 'Lunging Assistant' },
  { cardNo: 'DZ-SS02/011', pageTitle: 'Darkside Mirror Master (D Series)', defaultName: 'Darkside Mirror Master' },
  { cardNo: 'DZ-SS02/012', pageTitle: 'Hades Dragon Deity of Resentment, Gallmageheld', defaultName: 'Hades Dragon Deity of Resentment, Gallmageheld' },
  { cardNo: 'DZ-SS02/013', pageTitle: 'Swanky Enthraller', defaultName: 'Swanky Enthraller' },
  { cardNo: 'DZ-SS02/014', pageTitle: 'Silky Sky Actress', defaultName: 'Silky Sky Actress' },
  { cardNo: 'DZ-SS02/015', pageTitle: 'Intrepid Spinner', defaultName: 'Intrepid Spinner' },
  { cardNo: 'DZ-SS02/016', pageTitle: 'Gambling Juggler', defaultName: 'Gambling Juggler' },
  { cardNo: 'DZ-SS02/017', pageTitle: 'Dragon Masquerade, Harri (D Series)', defaultName: 'Dragon Masquerade, Harri' },
  { cardNo: 'DZ-SS02/018', pageTitle: 'Jester Demonic Dragon, Lunatec Dragon (D Series)', defaultName: 'Jester Demonic Dragon, Lunatec Dragon' },
  { cardNo: 'DZ-SS02/T01', pageTitle: 'Masked Magician, Harri (Crest)', defaultName: 'Masked Magician, Harri (Crest)' },
];

function cleanWikitext(text) {
  if (!text) return '';
  return text
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/\{\{Ruby\|([^|]+)\|([^}]+)\}\}/g, '$1($2)')
    .replace(/\{\{Cost\|([^}]+)\}\}/g, 'COST [$1]')
    .replace(/\{\{Once\}\}/g, '[1/Turn]')
    .replace(/\{\{1\/Turn\}\}/g, '[1/Turn]')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;br\s*\/?&gt;/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseCardTable(wikitext) {
  const fields = {};
  const lines = wikitext.split('\n');
  let currentKey = null;
  let currentValue = '';

  for (const line of lines) {
    const match = line.match(/^\|([a-zA-Z0-9_-]+)\s*=\s*(.*)$/);
    if (match) {
      if (currentKey) fields[currentKey] = currentValue.trim();
      currentKey = match[1].trim();
      currentValue = match[2];
    } else if (currentKey) {
      if (line.startsWith('}}') || line.startsWith('{{')) {
        fields[currentKey] = currentValue.trim();
        currentKey = null;
      } else {
        currentValue += '\n' + line;
      }
    }
  }
  if (currentKey) fields[currentKey] = currentValue.trim();
  return fields;
}

async function getImageUrl(fileTitle) {
  if (!fileTitle) return null;
  const cleanTitle = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`;
  const url = `https://cardfight.fandom.com/api.php?action=query&titles=${encodeURIComponent(cleanTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  for (const pid in pages) {
    const info = pages[pid]?.imageinfo;
    if (info && info[0]?.url) return info[0].url;
  }
  return null;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://cardfight.fandom.com/',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  return buffer.length;
}

async function scrapeSet(list, packageName) {
  console.log(`\n================ Scraping ${packageName} ================`);
  const existingCards = fs.existsSync(cardsJsonPath) ? JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8')) : [];
  const existingMap = new Map(existingCards.map(c => [c.cardNo, c]));

  for (const item of list) {
    if (existingMap.has(item.cardNo)) {
      console.log(`Card ${item.cardNo} already exists, checking local image...`);
      continue;
    }

    console.log(`Fetching ${item.cardNo}: ${item.pageTitle}...`);
    try {
      const parseUrl = `https://cardfight.fandom.com/api.php?action=parse&page=${encodeURIComponent(item.pageTitle)}&prop=wikitext|images&format=json`;
      const res = await fetch(parseUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await res.json();

      if (!data.parse) {
        console.error(`Failed to parse ${item.pageTitle}:`, data.error);
        continue;
      }

      const wt = data.parse.wikitext['*'];
      const fields = parseCardTable(wt);

      const name = cleanWikitext(fields.name || item.defaultName);
      const kana = cleanWikitext(fields.kana || fields.kanji || '');
      const gradeVal = fields.grade !== undefined && fields.grade !== '' ? parseInt(fields.grade, 10) : (item.cardNo.includes('/005') || item.cardNo.includes('/T01') ? null : 0);
      const powerVal = fields.power ? parseInt(fields.power, 10) : null;
      const shieldVal = fields.shield ? parseInt(fields.shield, 10) : (gradeVal === 3 || gradeVal === null ? null : (fields.shield === '0' ? 0 : null));
      const critVal = fields.critical ? parseInt(fields.critical, 10) : (gradeVal !== null ? 1 : null);
      const nation = cleanWikitext(fields.nation || (packageName.includes('Overlord') ? 'Dragon Empire' : 'Dark States'));
      const clan = cleanWikitext(fields.clan || (packageName.includes('Overlord') ? 'Kagero' : 'Pale Moon'));
      const race = cleanWikitext(fields.race || (gradeVal === null ? 'Crest' : 'Dragon'));
      const skillText = cleanWikitext(fields.effect || '');
      const flavorText = cleanWikitext(fields.flavor || '');

      let cardType = 'Normal Unit';
      let triggerType = null;
      let triggerEffect = null;

      if (gradeVal === 4 || ['DZ-SS02/017', 'DZ-SS02/018'].includes(item.cardNo)) {
        cardType = 'G Unit';
      } else if (item.cardNo.includes('/T01') || item.cardNo.endsWith('/005')) {
        cardType = 'Crest';
      } else if (item.cardNo.endsWith('/018') && packageName.includes('Overlord')) {
        cardType = 'Normal Order';
      } else if (fields.triggereffect || ['DZ-SS15/013', 'DZ-SS15/014', 'DZ-SS15/015', 'DZ-SS15/016', 'DZ-SS15/017', 'DZ-SS02/012', 'DZ-SS02/013', 'DZ-SS02/014', 'DZ-SS02/015', 'DZ-SS02/016'].includes(item.cardNo)) {
        cardType = 'Trigger Unit';
        if (item.cardNo === 'DZ-SS15/013') {
          triggerType = 'Over';
          triggerEffect = 'Over Trigger: During that drive check, remove this card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn! Additional Effect: Stand your vanguard!';
        } else if (item.cardNo === 'DZ-SS02/012') {
          triggerType = 'Over';
          triggerEffect = 'Over Trigger: During that drive check, remove this card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn! Additional Effect: Choose one of your vanguards, and until end of turn, it gets [Critical]+1 and your opponent cannot call cards from hand to (GC)!';
        } else if (['DZ-SS15/014', 'DZ-SS15/015', 'DZ-SS02/013'].includes(item.cardNo)) {
          triggerType = 'Critical';
          triggerEffect = 'Critical +1 and Power +10000 to one unit.';
        } else if (['DZ-SS15/016', 'DZ-SS02/014'].includes(item.cardNo)) {
          triggerType = 'Draw';
          triggerEffect = 'Draw 1 card and Power +10000 to one unit.';
        } else if (['DZ-SS02/015'].includes(item.cardNo)) {
          triggerType = 'Front';
          triggerEffect = 'All front row units get Power +10000 until end of turn.';
        } else if (['DZ-SS15/017', 'DZ-SS02/016'].includes(item.cardNo)) {
          triggerType = 'Heal';
          triggerEffect = 'If you have equal or more damage than your opponent, heal 1 damage! Also Power +10000 to one unit.';
        }
      }

      let skillIcon = undefined;
      if (gradeVal === 4) skillIcon = 'Triple Drive';
      else if (gradeVal === 3) skillIcon = 'Twin Drive';
      else if (gradeVal === 2) skillIcon = 'Intercept';
      else if (gradeVal === 1 || gradeVal === 0) skillIcon = 'Boost';

      // Resolve images
      const enImageFile = fields.enimage || data.parse.images.find(img => img.includes('EN') && img.endsWith('.png'));
      const jpImageFile = fields.jpimage || data.parse.images.find(img => (img.includes('DZ-SS') || img.includes('Sample')) && img.endsWith('.png')) || data.parse.images.find(img => img.endsWith('.png'));

      const enUrl = await getImageUrl(enImageFile);
      const jpUrl = await getImageUrl(jpImageFile);

      const baseCode = item.cardNo.replace('/', '-');
      const enFilename = `${baseCode}_EN.png`;
      const jpFilename = `${baseCode}_JP.png`;

      const artVariants = [];
      let localImageUrl = undefined;

      if (enUrl) {
        const dest = path.join(publicCardsDir, enFilename);
        try {
          if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
            const sz = await downloadFile(enUrl, dest);
            console.log(`  Downloaded EN: ${(sz / 1024).toFixed(1)} KB`);
          }
          artVariants.push({
            rarity: 'EN Edition',
            imageUrl: enUrl,
            localImageUrl: `/cards/${enFilename}`,
            source: 'English Official'
          });
          localImageUrl = `/cards/${enFilename}`;
        } catch (e) {
          console.error(`  Failed EN:`, e.message);
        }
      }

      if (jpUrl) {
        const dest = path.join(publicCardsDir, jpFilename);
        try {
          if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
            const sz = await downloadFile(jpUrl, dest);
            console.log(`  Downloaded JP: ${(sz / 1024).toFixed(1)} KB`);
          }
          artVariants.push({
            rarity: 'JP Edition',
            imageUrl: jpUrl,
            localImageUrl: `/cards/${jpFilename}`,
            source: 'Japanese Release'
          });
          if (!localImageUrl) localImageUrl = `/cards/${jpFilename}`;
        } catch (e) {
          console.error(`  Failed JP:`, e.message);
        }
      }

      const primaryImgUrl = enUrl || jpUrl || (artVariants[0]?.imageUrl) || '';

      const cardObj = {
        cardNo: item.cardNo,
        name,
        kana,
        rarity: 'TD',
        grade: gradeVal,
        power: powerVal,
        shield: shieldVal,
        critical: critVal,
        nation,
        clan,
        race,
        cardType,
        triggerType,
        triggerEffect,
        skillIcon,
        skillText,
        flavorText,
        package: packageName,
        imageUrl: primaryImgUrl,
        localImageUrl,
        artVariants,
        faqs: [],
        isRideDeck: item.cardNo.endsWith('/001') || item.cardNo.endsWith('/002') || item.cardNo.endsWith('/003') || item.cardNo.endsWith('/004'),
        isCrest: cardType === 'Crest'
      };

      existingMap.set(item.cardNo, cardObj);
      console.log(`  Added: ${cardObj.name} (Grade ${cardObj.grade}, ${cardObj.cardType})`);
    } catch (err) {
      console.error(`Error processing ${item.cardNo}:`, err.message);
    }
  }

  const allCards = Array.from(existingMap.values());
  fs.writeFileSync(cardsJsonPath, JSON.stringify(allCards, null, 2), 'utf8');
  console.log(`Saved updated cards to ${cardsJsonPath}`);
}

async function main() {
  await scrapeSet(overlordCards, 'DZ-SS15: Break Away Start Deck - Dragonic Overlord');
  await scrapeSet(harriCards, 'DZ-SS02: Stride Deckset Harri');
}

main().catch(console.error);
