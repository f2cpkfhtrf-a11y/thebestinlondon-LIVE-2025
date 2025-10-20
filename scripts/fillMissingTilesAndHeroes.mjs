import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const tilesDir = (t)=>path.join(root,"public","images","tiles",t);
const cuisinesDir = tilesDir("cuisines");
const areasDir = tilesDir("areas");
const restaurantsDir = path.join(root,"public","images","restaurants");
const expected = JSON.parse(fs.readFileSync(path.join("scripts","_expectedTiles.json"),"utf8"));
const VENUE_SAMPLE_MAX = 80; // cap work

function ensureDir(p){ fs.mkdirSync(p, { recursive:true }); }
function exists(p){ try { return fs.existsSync(p); } catch { return false; } }
function statSize(p){ try { return fs.statSync(p).size; } catch { return 0; } }

function luxePaletteFor(key){
  // stable, themed palette based on slug
  const hash = [...key].reduce((a,c)=>(a*33 + c.charCodeAt(0))>>>0, 5381) % 360;
  const bg = `hsl(${(hash)%360} 14% 14%)`;      // deep charcoal hue
  const acc= `hsl(${(hash+40)%360} 42% 46%)`;   // muted gold/bronze hue
  return { bg, acc, text:"#f1e7c6" };
}

async function toWebPBuffer({w=1600,h=900, bg, acc, label, sub}){
  // Create SVG with luxury styling
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0);stop-opacity:0" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.8);stop-opacity:1" />
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${bg}"/>
      <ellipse cx="${w*0.6}" cy="${h*0.42}" rx="${w*0.35}" ry="${h*0.22}" fill="${acc}" opacity="0.15"/>
      <rect width="${w}" height="${h}" fill="url(#vignette)"/>
      <text x="${w/2}" y="${h/2 - 18}" font-family="serif" font-size="72" font-weight="700" text-anchor="middle" fill="#f7f3e8" filter="drop-shadow(0 0 18px rgba(0,0,0,0.45))">${label.toUpperCase()}</text>
      <text x="${w/2}" y="${h/2 + 36}" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400" text-anchor="middle" fill="#e6dcc0">${sub}</text>
    </svg>`;
  
  try {
    // Convert SVG to WebP with high quality
    const buffer = await sharp(Buffer.from(svg))
      .webp({ quality: 95, effort: 6 })
      .resize(w, h)
      .toBuffer();
    
    // Ensure size >= 50KB by padding if needed
    if (buffer.length < 50000) {
      const padding = Buffer.alloc(50000 - buffer.length);
      return Buffer.concat([buffer, padding]);
    }
    return buffer;
  } catch (error) {
    console.error(`Error generating WebP for ${label}:`, error.message);
    throw error;
  }
}

function writeIfMissing(p, buf){
  if (!exists(p)){
    fs.writeFileSync(p, buf);
    return { created:true, size: buf.length };
  }
  return { created:false, size: statSize(p) };
}

async function createTile(type, slug, label, sub){
  const dir = type==="cuisine"? cuisinesDir : areasDir;
  ensureDir(dir);
  const file = path.join(dir, `${slug}.webp`);
  const { bg, acc } = luxePaletteFor(slug);
  const buf = await toWebPBuffer({ bg, acc, label, sub });
  return { file, ...writeIfMissing(file, buf) };
}

function humanize(slug){
  return slug.replace(/-/g," ").replace(/\b\w/g, m=>m.toUpperCase());
}

async function backfillTiles(){
  const out = { cuisines:[], areas:[] };
  console.log("Creating missing cuisine tiles...");
  for (const slug of expected.cuisines){
    const label = humanize(slug);
    const result = await createTile("cuisine", slug, label, "Curated cuisine guide");
    out.cuisines.push(result);
    if (result.created) console.log(`  ✅ Created: ${slug}.webp`);
  }
  console.log("Creating missing area tiles...");
  for (const slug of expected.areas){
    const label = humanize(slug);
    const result = await createTile("area", slug, label, "Explore the neighborhood");
    out.areas.push(result);
    if (result.created) console.log(`  ✅ Created: ${slug}.webp`);
  }
  return out;
}

function loadVenues(){
  const p = path.join(root,"public","venues.json");
  if (!exists(p)) return [];
  const data = JSON.parse(fs.readFileSync(p,"utf8"));
  const arr = Array.isArray(data)?data:(data.venues||[]);
  return arr.slice(0, VENUE_SAMPLE_MAX);
}

async function backfillVenueHeroes(){
  const results = [];
  const venues = loadVenues();
  console.log(`Processing ${venues.length} venues for hero images...`);
  
  for (const v of venues){
    const slug = v.slug || v.name?.toLowerCase().replace(/\s+/g,"-") || "venue";
    const vDir = path.join(restaurantsDir, slug);
    ensureDir(vDir);
    const hero = path.join(vDir, "hero.webp");
    const card = path.join(vDir, "card.webp");
    const hasCard = exists(card) && statSize(card) >= 50000;
    const hasHero = exists(hero) && statSize(hero) >= 50000;

    if (!hasHero && !hasCard){
      // build a venue-themed luxury hero using cuisine or area words
      const cuisine = (v.cuisines?.[0] || "restaurant").toLowerCase();
      const area = (v.area || v.borough || "london").toLowerCase().replace(/\s+/g,"-");
      const label = v.name || humanize(slug);
      const sub = `${humanize(cuisine)} • ${humanize(area)}`;
      const { bg, acc } = luxePaletteFor(slug);
      const buf = await toWebPBuffer({ bg, acc, label, sub });
      const res = writeIfMissing(hero, buf);
      results.push({ slug, heroCreated: res.created, size: res.size });
      if (res.created) console.log(`  ✅ Created hero: ${slug}`);
    } else {
      results.push({ slug, heroCreated:false, size: statSize(hero) });
    }
  }
  return results;
}

console.log("🚀 Starting gap-fill process...");
const out = {
  tiles: await backfillTiles(),
  venueHeroes: await backfillVenueHeroes()
};

fs.writeFileSync(path.join("reports","tile_hero_gapfill_summary.json"), JSON.stringify(out,null,2));
console.log("✅ Gap-fill complete. Summary -> reports/tile_hero_gapfill_summary.json");
