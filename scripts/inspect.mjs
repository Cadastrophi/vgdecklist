async function inspectCard(page) {
  const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent(page) + '&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  const html = data.parse.text['*'];
  
  // Extract info-main table rows
  const infoMainMatch = html.match(/<div class="info-main">([\s\S]*?)<\/div>/);
  console.log('=== PAGE:', page, '===');
  if (infoMainMatch) {
    const rows = [...infoMainMatch[1].matchAll(/<tr>\s*<td>(.*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g)];
    for (const r of rows) {
      const label = r[1].replace(/<[^>]+>/g, '').trim();
      const val = r[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      console.log('  ', label, ':', val);
    }
  }

  // Extract effect
  const effectMatch = html.match(/<table class="effect">[\s\S]*?<td>([\s\S]*?)<\/td>/);
  if (effectMatch) {
    const eff = effectMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
    console.log('   Effect snippet:', eff.substring(0, 100));
  }
}

async function run() {
  await inspectCard('Chrono_Dran_(D_Series)');
  await inspectCard('Hades_Dragon_Deity_of_Resentment,_Gallmageheld');
  await inspectCard('Chronodragon_Nextage_(D_Series)');
  await inspectCard('Chronojet_Dragon_(Crest)');
}
run();
