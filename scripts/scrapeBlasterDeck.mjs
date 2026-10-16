import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cardsJsonPath = path.join(__dirname, '../src/data/cards.json');
const publicCardsDir = path.join(__dirname, '../public/cards');

const cardList = [
  { cardNo: 'DZ-SS14/001', pageTitle: 'King of Knights, Alfred (Fighter Icon)', defaultName: 'King of Knights, Alfred', copies: 4 },
  { cardNo: 'DZ-SS14/002', pageTitle: 'Blaster Blade (Fighter Icon)', defaultName: 'Blaster Blade', copies: 4 },
  { cardNo: 'DZ-SS14/003', pageTitle: 'Wingal (D Series)', defaultName: 'Wingal', copies: 3 },
  { cardNo: 'DZ-SS14/004', pageTitle: 'Barcgal (D Series)', defaultName: 'Barcgal', copies: 1 },
  { cardNo: 'DZ-SS14/005', pageTitle: 'Energy Generator', defaultName: 'Energy Generator', copies: 1 },
  { cardNo: 'DZ-SS14/006', pageTitle: 'Soul Saver Dragon (D Series)', defaultName: 'Soul Saver Dragon', copies: 4 },
  { cardNo: 'DZ-SS14/007', pageTitle: 'Knight of Truth, Gordon (D Series)', defaultName: 'Knight of Truth, Gordon', copies: 4 },
  { cardNo: 'DZ-SS14/008', pageTitle: 'Knight of Silence, Gallatin (D Series)', defaultName: 'Knight of Silence, Gallatin', copies: 4 },
  { cardNo: 'DZ-SS14/009', pageTitle: 'Cerrgaon', defaultName: 'Cerrgaon', copies: 1 },
  { cardNo: 'DZ-SS14/010', pageTitle: 'Little Sage, Marron (Fighter Icon)', defaultName: 'Little Sage, Marron', copies: 4 },
  { cardNo: 'DZ-SS14/011', pageTitle: 'Lake Maiden, Lien (D Series)', defaultName: 'Lake Maiden, Lien', copies: 4 },
  { cardNo: 'DZ-SS14/012', pageTitle: 'Flash Shield, Iseult (D Series)', defaultName: 'Flash Shield, Iseult', copies: 4 },
  { cardNo: 'DZ-SS14/013', pageTitle: 'Light Dragon Deity of Honors, Amartinoa', defaultName: 'Light Dragon Deity of Honors, Amartinoa', copies: 1 },
  { cardNo: 'DZ-SS14/014', pageTitle: 'Bringer of Good Luck, Epona (D Series)', defaultName: 'Bringer of Good Luck, Epona', copies: 4 },
  { cardNo: 'DZ-SS14/015', pageTitle: 'Flogal (D Series)', defaultName: 'Flogal', copies: 4 },
  { cardNo: 'DZ-SS14/016', pageTitle: 'Margal (D Series)', defaultName: 'Margal', copies: 3 },
  { cardNo: 'DZ-SS14/017', pageTitle: 'Yggdrasil Maiden, Elaine (D Series)', defaultName: 'Yggdrasil Maiden, Elaine', copies: 4 },
  { cardNo: 'DZ-SS14/018', pageTitle: 'Protection: Twincast', defaultName: 'Protection: Twincast', copies: 1 },
];

function cleanWikitext(text) {
  if (!text) return '';
  return text
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1') // [[Link|Label]] -> Label
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
      if (currentKey) {
        fields[currentKey] = currentValue.trim();
      }
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
  if (currentKey) {
    fields[currentKey] = currentValue.trim();
  }
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

async function scrape() {
  console.log('--- Scraping DZ Special Series 14: Blaster Blade Deck ---');
  if (!fs.existsSync(publicCardsDir)) fs.mkdirSync(publicCardsDir, { recursive: true });

  const existingCards = fs.existsSync(cardsJsonPath) ? JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8')) : [];
  const existingMap = new Map(existingCards.map(c => [c.cardNo, c]));

  const newCards = [];

  for (const item of cardList) {
    console.log(`\nFetching ${item.cardNo}: ${item.pageTitle}...`);
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
    const gradeVal = fields.grade !== undefined && fields.grade !== '' ? parseInt(fields.grade, 10) : (item.cardNo === 'DZ-SS14/005' ? null : 0);
    const powerVal = fields.power ? parseInt(fields.power, 10) : null;
    const shieldVal = fields.shield ? parseInt(fields.shield, 10) : (gradeVal === 3 || gradeVal === null ? null : (fields.shield === '0' ? 0 : null));
    const critVal = fields.critical ? parseInt(fields.critical, 10) : (gradeVal !== null ? 1 : null);
    const nation = cleanWikitext(fields.nation || 'Keter Sanctuary');
    const clan = cleanWikitext(fields.clan || 'Royal Paladin');
    const race = cleanWikitext(fields.race || (item.cardNo === 'DZ-SS14/005' ? 'Crest' : 'Human'));
    const skillText = cleanWikitext(fields.effect || '');
    const flavorText = cleanWikitext(fields.flavor || '');

    // Card Type
    let cardType = 'Normal Unit';
    let triggerType = null;
    let triggerEffect = null;

    if (item.cardNo === 'DZ-SS14/005') {
      cardType = 'Crest';
    } else if (item.cardNo === 'DZ-SS14/018') {
      cardType = 'Blitz Order';
    } else if (fields.triggereffect || ['DZ-SS14/013', 'DZ-SS14/014', 'DZ-SS14/015', 'DZ-SS14/016', 'DZ-SS14/017'].includes(item.cardNo)) {
      cardType = 'Trigger Unit';
      if (item.cardNo === 'DZ-SS14/013') {
        triggerType = 'Over';
        triggerEffect = 'Over Trigger: During that drive check, remove this card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn! If revealed on drive check, activate its additional effect: [CONT]: During this turn, your vanguard drive check gives all your rear-guards [Power]+10000 and additional drive checks!';
      } else if (['DZ-SS14/014', 'DZ-SS14/015'].includes(item.cardNo)) {
        triggerType = 'Critical';
        triggerEffect = 'Critical +1 and Power +10000 to one unit.';
      } else if (item.cardNo === 'DZ-SS14/016') {
        triggerType = 'Draw';
        triggerEffect = 'Draw 1 card and Power +10000 to one unit.';
      } else if (item.cardNo === 'DZ-SS14/017') {
        triggerType = 'Heal';
        triggerEffect = 'If you have equal or more damage than your opponent, heal 1 damage! Also Power +10000 to one unit.';
      }
    }

    let skillIcon = undefined;
    if (gradeVal === 3) skillIcon = 'Twin Drive';
    else if (gradeVal === 2) skillIcon = 'Intercept';
    else if (gradeVal === 1) skillIcon = 'Boost';
    else if (gradeVal === 0) skillIcon = 'Boost';

    // Rarity
    const rarity = 'SD';

    // Resolve images
    const enImageFile = fields.enimage || data.parse.images.find(img => img.includes('EN') && img.endsWith('.png'));
    const jpImageFile = fields.jpimage || data.parse.images.find(img => img.includes('DZ-SS14') && img.endsWith('.png')) || data.parse.images.find(img => img.endsWith('.png'));

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
          rarity: 'SD (EN)',
          imageUrl: enUrl,
          localImageUrl: `/cards/${enFilename}`,
          source: 'English Release'
        });
        localImageUrl = `/cards/${enFilename}`;
      } catch (e) {
        console.error(`  Failed EN download:`, e.message);
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
          rarity: 'SD (JP)',
          imageUrl: jpUrl,
          localImageUrl: `/cards/${jpFilename}`,
          source: 'Japanese Release'
        });
        if (!localImageUrl) localImageUrl = `/cards/${jpFilename}`;
      } catch (e) {
        console.error(`  Failed JP download:`, e.message);
      }
    }

    // Default primary imageUrl
    const primaryImgUrl = enUrl || jpUrl || (artVariants[0]?.imageUrl) || '';

    // FAQs
    const faqs = [];
    if (item.cardNo === 'DZ-SS14/001') {
      faqs.push({
        question: 'How does King of Knights, Alfred\'s Persona Ride skill work with other Grade 3 cards?',
        answer: 'Alfred\'s [CONT] skill specifies that normal riding this card over any Grade 3 unit with an Aichi icon (such as Soul Saver Dragon) also becomes a Persona Ride, triggering the +10,000 power and draw effect!'
      });
      faqs.push({
        question: 'When Alfred attacks, can I call cards into rear-guard circles that are already occupied?',
        answer: 'Yes! When calling up to two units with an Aichi icon to the same column, you can call over existing units, which are retired.'
      });
    } else if (item.cardNo === 'DZ-SS14/002') {
      faqs.push({
        question: 'Can I pay either Counter Blast 1 OR Energy Blast 3 for Blaster Blade\'s retire skill?',
        answer: 'Yes! The cost is flexible: {{Cost|Counter Blast (1) or Energy Blast (3)}}. If placed on (VC), you also get to draw a card.'
      });
      faqs.push({
        question: 'Does Blaster Blade\'s rear-guard skill trigger every time it attacks?',
        answer: 'It has [1/Turn], triggering when it attacks a grade 3 or greater unit while having an Aichi icon vanguard, giving it +10000 Power for the entire turn.'
      });
    } else if (item.cardNo === 'DZ-SS14/005') {
      faqs.push({
        question: 'What is an Energy Generator Crest?',
        answer: 'The Energy Generator is placed in your Crest zone at the start of the game if you ride Barcgal. At the start of each of your ride phases and when you go second, you gain Energy counters up to 10 max to pay Energy Blast costs.'
      });
    } else if (item.cardNo === 'DZ-SS14/006') {
      faqs.push({
        question: 'How does Soul Saver Dragon\'s Holy Charging Roar work?',
        answer: 'When placed on (VC) or (RC), by paying Soul Blast (5) or Energy Blast (5), choose up to five of your rear-guards, and they get [Power]+10000 until end of turn! An incredible multi-column booster.'
      });
    }

    const cardObj = {
      cardNo: item.cardNo,
      name,
      kana,
      rarity,
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
      package: 'DZ-SS14: Break Away Start Deck - Blaster Blade',
      imageUrl: primaryImgUrl,
      localImageUrl,
      artVariants,
      faqs,
      isRideDeck: ['DZ-SS14/001', 'DZ-SS14/002', 'DZ-SS14/003', 'DZ-SS14/004'].includes(item.cardNo),
      isCrest: item.cardNo === 'DZ-SS14/005',
      rideDeckOrder: item.cardNo === 'DZ-SS14/004' ? 0 : (item.cardNo === 'DZ-SS14/003' ? 1 : (item.cardNo === 'DZ-SS14/002' ? 2 : (item.cardNo === 'DZ-SS14/001' ? 3 : undefined)))
    };

    existingMap.set(item.cardNo, cardObj);
    newCards.push(cardObj);
    console.log(`  Added: ${cardObj.name} (Grade ${cardObj.grade}, ${cardObj.cardType})`);
  }

  // Save merged cards.json
  const allCards = Array.from(existingMap.values());
  fs.writeFileSync(cardsJsonPath, JSON.stringify(allCards, null, 2), 'utf8');
  console.log(`\nSuccessfully saved ${allCards.length} cards to ${cardsJsonPath}`);
}

scrape().catch(console.error);
