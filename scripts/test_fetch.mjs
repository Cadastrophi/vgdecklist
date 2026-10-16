import fs from 'fs';

async function test() {
  const url = 'https://cardfight.fandom.com/api.php?action=parse&page=Chronojet_Dragon_(D_Series)&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  const text = data.parse.text['*'];
  
  fs.writeFileSync('scripts/chronojet_sample.html', text);
  console.log('Saved chronojet_sample.html, length:', text.length);
}
test().catch(console.error);
