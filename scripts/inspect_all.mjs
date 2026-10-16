async function inspectAllCards() {
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

  for (const c of cards) {
    const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent(c.page) + '&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    const html = data.parse.text['*'];

    // Get images
    const imgMatches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*class="[^"]*image[^"]*"[^>]*>\s*<img[^>]+alt="([^"]+)"/g)];
    const images = imgMatches.map(m => ({ alt: m[2], url: m[1] }));

    // Get sets table row mentioning D-SS03
    const setsMatch = html.match(/<table class="sets">([\s\S]*?)<\/table>/);
    let setsText = '';
    if (setsMatch) {
      setsText = setsMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    }

    console.log(`[${c.no}] ${c.page}: ${images.length} images. Sets: ${setsText.substring(0, 120)}`);
    for (const img of images) {
      console.log(`   Img: ${img.alt} -> ${img.url.substring(0, 80)}...`);
    }
  }
}

inspectAllCards().catch(console.error);
