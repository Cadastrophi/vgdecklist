async function checkSubpages() {
  const cards = [
    'Chronojet_Dragon_(D_Series)',
    'Smokegear_Dragon_(D_Series)',
    'Masergear_Dragon_(D_Series)',
    'Chrono_Dran_(D_Series)',
    'Steam_Fighter,_Balih_(D_Series)',
    'Upstream_Dragon_(D_Series)',
    'Steam_Fighter,_Argandia',
    'Steam_Maiden,_Arlim_(D_Series)',
    'Steam_Breath_Dragon_(D_Series)',
    'Gear_Serow_of_Magnetic_Resonance',
    'Steam_Scara,_Gigi_(D_Series)',
    'Hades_Dragon_Deity_of_Resentment,_Gallmageheld',
    'Lively_Breath_Dragon',
    'Advanced_Clock_Dragon',
    'Steam_Gunner,_Ilushma',
    'Direful_Doll,_Alexandra',
    'Chronodragon_Nextage_(D_Series)',
    'Interdimensional_Dragon,_Faterider_Dragon_(D_Series)',
    'Chronojet_Dragon_(Crest)'
  ];

  const types = ['Tips', 'Rulings', 'Trivia', 'Lores'];
  for (const c of cards) {
    for (const t of types) {
      const page = `Card_${t}:${c}`;
      const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent(page) + '&format=json';
      try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const data = await res.json();
        if (data.parse && !data.error) {
          const text = data.parse.text['*'].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          if (text.length > 50 && !text.includes('does not exist')) {
            console.log(`Found ${page}: ${text.substring(0, 150)}...`);
          }
        }
      } catch (e) {}
    }
  }
}
checkSubpages().catch(console.error);
