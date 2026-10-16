async function testGallery() {
  const url = 'https://cardfight.fandom.com/api.php?action=parse&page=' + encodeURIComponent('Card_Gallery:Chronojet_Dragon_(D_Series)') + '&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  if (data.parse && data.parse.text) {
    const html = data.parse.text['*'];
    const imgs = [...html.matchAll(/href="(https:\/\/static\.wikia\.nocookie\.net\/cardfight\/images\/[^"]+)"/g)].map(m => m[1]);
    console.log('Gallery images count:', imgs.length);
    console.log(imgs.slice(0, 5));
  } else {
    console.log('No gallery page');
  }
}
testGallery().catch(console.error);
