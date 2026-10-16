import fs from 'fs';

const cards = [
  { no: 'D-SS03/001', page: 'Chronojet_Dragon_(D_Series)' },
  { no: 'D-SS03/002', page: 'Smokegear_Dragon_(D_Series)' },
  { no: 'D-SS03/003', page: 'Masergear_Dragon_(D_Series)' },
  { no: 'D-SS03/004', page: 'Chrono_Dran_(D_Series)' },
  { no: 'D-SS03/005', page: 'Steam_Fighter,_Balih_(D_Series)' },
  { no: 'D-SS03/006', page: 'Upstream_Dragon_(D_Series)' },
  { no: 'D-SS03/007', page: 'Steam_Fighter,_Argandia' },
  { no: 'D-SS03/008', page: 'Steam_Maiden,_Arlim_(D_Series)' },
  { no: 'D-SS03/009', page: 'Steam_Breath_Dragon_(D_Series)' },
  { no: 'D-SS03/010', page: 'Gear_Serow_of_Magnetic_Resonance' },
  { no: 'D-SS03/011', page: 'Steam_Scara,_Gigi_(D_Series)' },
  { no: 'D-SS03/012', page: 'Hades_Dragon_Deity_of_Resentment,_Gallmageheld' },
  { no: 'D-SS03/013', page: 'Lively_Breath_Dragon' },
  { no: 'D-SS03/014', page: 'Advanced_Clock_Dragon' },
  { no: 'D-SS03/015', page: 'Steam_Gunner,_Ilushma' },
  { no: 'D-SS03/016', page: 'Direful_Doll,_Alexandra' },
  { no: 'D-SS03/017', page: 'Chronodragon_Nextage_(D_Series)' },
  { no: 'D-SS03/018', page: 'Interdimensional_Dragon,_Faterider_Dragon_(D_Series)' },
  { no: 'D-SS03/T03', page: 'Chronojet_Dragon_(Crest)' }
];

function extractTabberImages(html) {
  const tabberMatch = html.match(/<div class="tabber wds-tabber">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="info-main">/);
  if (!tabberMatch) return [];

  const tabberHtml = tabberMatch[1];
  
  // Extract tab titles
  const tabsListMatch = tabberHtml.match(/<ul class="wds-tabs">([\s\S]*?)<\/ul>/);
  const tabLabels = [];
  if (tabsListMatch) {
    const liMatches = [...tabsListMatch[1].matchAll(/<li[^>]*>[\s\S]*?<a[^>]*>(.*?)<\/a>/g)];
    for (const m of liMatches) {
      tabLabels.push(m[1].replace(/<[^>]+>/g, '').trim());
    }
  }

  // Extract tab contents
  const contentMatches = [...tabberHtml.matchAll(/<div class="wds-tab__content[^"]*">([\s\S]*?)<\/div>/g)];
  const results = [];
  for (let i = 0; i < contentMatches.length; i++) {
    const cHtml = contentMatches[i][1];
    const aMatch = cHtml.match(/<a[^>]+href="([^"]+)"[^>]*>\s*<img[^>]+alt="([^"]+)"/);
    if (aMatch) {
      results.push({
        label: tabLabels[i] || `Tab ${i + 1}`,
        alt: aMatch[2],
        url: aMatch[1].replace(/\/scale-to-width-down\/\d+/, '')
      });
    }
  }
  return results;
}

async function run() {
  for (const c of cards) {
    const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent(c.page) + '&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    const html = data.parse.text['*'];
    const tabImgs = extractTabberImages(html);
    console.log(`[${c.no}] ${c.page}: found ${tabImgs.length} tab images:`);
    for (const t of tabImgs) {
      console.log(`   - [${t.label}] ${t.alt}: ${t.url}`);
    }
  }
}

run().catch(console.error);
