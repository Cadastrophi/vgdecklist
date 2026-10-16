async function inspectEffects() {
  const cards = [
    'Chronojet_Dragon_(D_Series)',
    'Chronodragon_Nextage_(D_Series)',
    'Interdimensional_Dragon,_Faterider_Dragon_(D_Series)',
    'Steam_Maiden,_Arlim_(D_Series)',
    'Hades_Dragon_Deity_of_Resentment,_Gallmageheld',
    'Chronojet_Dragon_(Crest)'
  ];

  for (const page of cards) {
    const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent(page) + '&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    const html = data.parse.text['*'];

    const effectMatch = html.match(/<table class="effect">([\s\S]*?)<\/table>/);
    if (effectMatch) {
      console.log(`=== ${page} ===`);
      console.log(effectMatch[1].replace(/<th[\s\S]*?<\/th>/, '').trim());
    }
  }
}

inspectEffects().catch(console.error);
