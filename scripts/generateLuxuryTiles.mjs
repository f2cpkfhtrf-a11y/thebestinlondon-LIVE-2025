import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const root = process.cwd();
const img = (...p) => path.join(root, "public", "images", ...p);
const tiles = {
  cuisines: img("tiles","cuisines"),
  areas:    img("tiles","areas"),
  stations: img("tiles","stations"),
};
const siteDefault = img("heroes","site-default.webp");
const restaurantsDir = img("restaurants");
const venuesPath = path.join(root,"public","venues.json");

const MIN_BYTES = 50_000;  // >50KB rule
const TILE_W = 1600, TILE_H = 900; // 16:9 across site

// ---- Helpers ----
function hashSlug(slug) {
  return crypto.createHash("md5").update(slug).digest("hex");
}
function paletteFor(slug) {
  // Deterministic luxury palette from slug hash
  const h = parseInt(hashSlug(slug).slice(0,2),16);
  const hues = [32, 38, 42, 45, 48, 50]; // warm golds/amber
  const accents = [215, 220, 225];       // cool slate accents
  const hue = hues[h % hues.length];
  const accent = accents[h % accents.length];
  // Return gradient stops (oklch via CSS is great, but sharp wants RGBA)
  // We'll approximate golds + charcoal with SRGB values
  return {
    bg1: {r: 22, g: 22, b: 24},           // deep charcoal
    bg2: {r: 34, g: 34, b: 38},           // charcoal gradient
    gold1: {r: 187, g: 160, b: 110},      // soft gold
    gold2: {r: 216, g: 190, b: 140},      // lighter gold
  };
}

function svgLuxury(slug, label) {
  const {bg1,bg2,gold1,gold2} = paletteFor(slug);
  const grad = (c) => `rgb(${c.r},${c.g},${c.b})`;
  const safe = (label||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return `
<svg width="${TILE_W}" height="${TILE_H}" viewBox="0 0 ${TILE_W} ${TILE_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${grad(bg1)}"/>
      <stop offset="100%" stop-color="${grad(bg2)}"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${grad(gold1)}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${grad(gold2)}" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.12"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#gold)" opacity="0.25"/>
  <rect width="100%" height="100%" filter="url(#grain)"/>
  <g transform="translate(64, ${TILE_H-96})">
    <rect x="-16" y="-56" rx="12" width="auto" height="64" fill="rgba(0,0,0,0.25)"/>
    <text x="0" y="0" fill="white" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto" font-weight="700" font-size="56" letter-spacing="0.5">
      ${safe}
    </text>
  </g>
</svg>`;
}

async function ensureWebp(outFile, slug, label) {
  // Skip if exists and >= MIN_BYTES
  if (fs.existsSync(outFile) && fs.statSync(outFile).size >= MIN_BYTES) return;
  
  // Remove any existing small/empty file
  if (fs.existsSync(outFile)) {
    fs.unlinkSync(outFile);
  }
  
  const svg = Buffer.from(svgLuxury(slug, label));
  const buf = await sharp(svg)
    .resize(TILE_W, TILE_H, { fit: "cover" })
    .webp({ quality: 92 })
    .toBuffer();
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

// Copy if exists & big enough
function safeCopy(src, dest) {
  try {
    if (fs.existsSync(src) && fs.statSync(src).size >= MIN_BYTES) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      return true;
    }
  } catch {}
  return false;
}

// ---- 1) Tiles: cuisines / areas / stations ----
const CUISINE_SLUGS = [
  "british","indian","italian","japanese","thai","turkish","french","chinese","spanish",
  "korean","mexican","lebanese","mediterranean","vegan","vegetarian","halal","seafood","steakhouse","pizza","burgers","cafe","bakery","desserts"
];
const AREA_SLUGS = [
  "soho","shoreditch","mayfair","westminster","covent-garden","whitechapel","spitalfields",
  "canary-wharf","fitzrovia","marylebone","holborn","clerkenwell","camden","southwark","greenwich","london-bridge","borough"
];
const STATION_SLUGS = [
  "liverpool-street","kings-cross","london-bridge","paddington","waterloo","euston","bank","monument","oxford-circus"
];

function titleFromSlug(s){return s.replace(/-/g," ").replace(/\b\w/g,m=>m.toUpperCase());}

async function ensureTileSet(dir, slugs, labelPrefix){
  let made = 0;
  for (const slug of slugs) {
    const file = path.join(dir, `${slug}.webp`);
    if (!fs.existsSync(file) || fs.statSync(file).size < MIN_BYTES) {
      await ensureWebp(file, slug, `${labelPrefix}: ${titleFromSlug(slug)}`);
      made++;
    }
  }
  return made;
}

const madeCuisine = await ensureTileSet(tiles.cuisines, CUISINE_SLUGS, "Cuisine");
const madeArea    = await ensureTileSet(tiles.areas,    AREA_SLUGS,    "Area");
const madeStation = await ensureTileSet(tiles.stations, STATION_SLUGS, "Station");

// ---- 2) Venue heroes: prefer card.webp → hero.webp; else cuisine/area themed; else generate luxury ----
let heroCopied = 0, heroGenerated = 0, heroFromCuisine = 0, heroFromArea = 0;
let venues = [];
if (fs.existsSync(venuesPath)) {
  const raw = JSON.parse(fs.readFileSync(venuesPath, "utf8"));
  venues = Array.isArray(raw) ? raw : raw.venues || [];
}
for (const v of venues) {
  if (!v?.slug) continue;
  const folder = path.join(restaurantsDir, v.slug);
  const hero = path.join(folder, "hero.webp");
  const card = path.join(folder, "card.webp");
  // If hero good, skip
  if (fs.existsSync(hero) && fs.statSync(hero).size >= MIN_BYTES) continue;

  // 1) copy card → hero if good
  if (safeCopy(card, hero)) { heroCopied++; continue; }

  // 2) fallback from cuisine tile
  const cuisineSlug = (v.cuisine_slug || v.cuisine || "").toString().toLowerCase().replace(/\s+/g,"-");
  const cuisineTile = cuisineSlug ? path.join(tiles.cuisines, `${cuisineSlug}.webp`) : "";
  if (cuisineSlug && fs.existsSync(cuisineTile) && fs.statSync(cuisineTile).size >= MIN_BYTES) {
    safeCopy(cuisineTile, hero); heroFromCuisine++; continue;
  }

  // 3) fallback from area tile
  const areaSlug = (v.area_slug || v.area || "").toString().toLowerCase().replace(/\s+/g,"-");
  const areaTile = areaSlug ? path.join(tiles.areas, `${areaSlug}.webp`) : "";
  if (areaSlug && fs.existsSync(areaTile) && fs.statSync(areaTile).size >= MIN_BYTES) {
    safeCopy(areaTile, hero); heroFromArea++; continue;
  }

  // 4) generate luxury hero with venue name
  await ensureWebp(hero, v.slug, (v.name||"Restaurant"));
  heroGenerated++;
}

// ---- 3) Report
const report = {
  summary: {
    createdCuisineTiles: madeCuisine,
    createdAreaTiles: madeArea,
    createdStationTiles: madeStation,
    heroCopiedFromCard: heroCopied,
    heroFromCuisineTile: heroFromCuisine,
    heroFromAreaTile: heroFromArea,
    heroLuxuryGenerated: heroGenerated,
    minBytes: MIN_BYTES,
    size: { width: TILE_W, height: TILE_H }
  },
  notes: [
    "No external images fetched. All assets created locally.",
    "Venue hero priority: card.webp → cuisine tile → area tile → generated luxury."
  ],
  timestamp: new Date().toISOString()
};
fs.writeFileSync(path.join(process.cwd(),"reports","luxury_tiles_run.json"), JSON.stringify(report,null,2));
console.log("✅ Luxury tile & hero generation complete.");
console.table(report.summary);
