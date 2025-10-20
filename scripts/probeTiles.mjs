import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE = 'https://www.thebestinlondon.co.uk';
const ver = process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1';

function getJSON(p){
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), p),'utf8'));
}

function request(url){
  return new Promise((resolve) => {
    https.get(url, res => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 });
    }).on('error', () => resolve({ url, status: 0, ok: false }));
  });
}

(async () => {
  const cuisines = ['british','mediterranean','modern-european','indian','turkish','japanese','italian','french','thai','mexican','korean','spanish','chinese','caribbean'];
  const areas = ['central-london','tower-hamlets','redbridge','havering','newham','camden','hackney','southwark','westminster','kensington-and-chelsea'];

  const urls = [];
  for (const c of cuisines) {
    urls.push(`${BASE}/images/tiles/cuisines/${c}.webp?v=${ver}`);
  }
  for (const a of areas) {
    urls.push(`${BASE}/images/tiles/areas/${a}.webp?v=${ver}`);
  }
  urls.push(`${BASE}/images/heroes/site-default.webp?v=${ver}`);

  const results = await Promise.all(urls.map(request));
  const bad = results.filter(r => !r.ok);

  const outDir = path.join(process.cwd(),'reports');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'probe_tiles.json'), JSON.stringify(results,null,2));

  console.log(`✅ OK: ${results.length - bad.length}  ❌ FAIL: ${bad.length}`);
  if (bad.length) {
    console.log('First few failures:');
    bad.slice(0,5).forEach(b => console.log('  •', b.status, b.url));
    process.exit(1);
  }
})();
