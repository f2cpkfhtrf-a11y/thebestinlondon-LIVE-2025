import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const CACHED = path.join(PUB, 'images', '_cached');
const VENUES_FILE = path.join(PUB, 'venues.json');

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const DAILY_CAP  = Number(process.env.FREE_FETCH_DAILY_CAP || 150);

function getJSON(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let d=''; res.on('data', c=>d+=c);
      res.on('end', ()=>{ try { resolve(JSON.parse(d)); } catch { resolve(null); }});
    }).on('error', ()=>resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', ()=>f.close(()=>resolve(true)));
    }).on('error', ()=>resolve(false));
  });
}

function existsLarge(rel, min=50000) {
  const p = path.join(PUB, rel.replace(/^\/+/, ''));
  try { const s = fs.statSync(p); return s.isFile() && s.size >= min; } catch { return false; }
}

async function fetchFromWikimedia(q, dest) {
  // Try a reasonably generic food/place query
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json&origin=*`;
  const json = await getJSON(api);
  const pages = json?.query?.pages || {};
  const first = Object.values(pages)[0];
  const url = first?.imageinfo?.[0]?.url;
  if (!url) return false;
  return download(url, dest);
}

async function fetchFromGooglePlaces(venue, dest) {
  if (!GOOGLE_KEY) return false;
  // Use photo_reference if present; else skip (we won't run Find Place to avoid costs)
  const ref = venue?.google_photo_reference;
  if (!ref) return false;
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${encodeURIComponent(ref)}&key=${GOOGLE_KEY}`;
  return download(url, dest);
}

async function main() {
  console.log('🧪 Starting image healing process...');
  fs.mkdirSync(CACHED, { recursive: true });
  const venues = JSON.parse(fs.readFileSync(VENUES_FILE,'utf-8'));
  let fetches = 0, healed = 0;

  for (const v of venues) {
    const slug = v.slug || (v.name||'').toLowerCase().replace(/\s+/g,'-');
    // already OK?
    const candidates = [
      v.image_card_path, v.image_hero_path,
      `/images/venues/${slug}.webp`, `/images/venues/${slug}.jpg`,
      `/images/_cached/${slug}.webp`, `/images/_cached/${slug}.jpg`,
    ].filter(Boolean);

    if (candidates.some(rel => existsLarge(rel))) continue;

    const dest = path.join(CACHED, `${slug}.webp`);
    if (existsLarge(dest)) {
      v.image_card_path = v.image_card_path || dest.replace(PUB, '');
      v.image_hero_path = v.image_hero_path || dest.replace(PUB, '');
      continue;
    }

    if (fetches >= DAILY_CAP) continue;

    // Try Google (if ref present & key set), else Wikimedia fallback
    let ok = false;
    if (v.google_photo_reference && GOOGLE_KEY) {
      console.log(`🔍 Trying Google Places for ${slug}...`);
      ok = await fetchFromGooglePlaces(v, dest);
    }
    if (!ok) {
      // Try name + cuisine or area for better match
      const q = [v.name, (v.cuisines||[])[0], v.area, 'restaurant london'].filter(Boolean).join(' ');
      console.log(`🔍 Trying Wikimedia for ${slug} with query: ${q}...`);
      ok = await fetchFromWikimedia(q, dest);
    }
    if (ok) {
      fetches++; healed++;
      const rel = dest.replace(PUB,'');
      v.image_card_path = v.image_card_path || rel;
      v.image_hero_path = v.image_hero_path || rel;
      console.log(`✅ Healed ${slug} (${fetches}/${DAILY_CAP} fetches used)`);
    }
  }

  fs.writeFileSync(VENUES_FILE, JSON.stringify(venues, null, 2));
  const report = { healed, attempted: fetches, total: venues.length, ts: new Date().toISOString() };
  fs.writeFileSync(path.join(ROOT,'reports','heal_images_report.json'), JSON.stringify(report, null, 2));
  console.log('🧪 Heal report:', report);
}

main();
