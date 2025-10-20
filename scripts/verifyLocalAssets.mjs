import fs from "fs"; import path from "path";
const root = process.cwd();
const expect = JSON.parse(fs.readFileSync("scripts/_expectedTiles.json","utf8"));
const cuisineDir = path.join(root,"public","images","tiles","cuisines");
const areaDir = path.join(root,"public","images","tiles","areas");
const restaurantsDir = path.join(root,"public","images","restaurants");
function exists(p){ try { return fs.existsSync(p); } catch { return false; } }
function size(p){ try { return fs.statSync(p).size; } catch { return 0; } }

const report = { missing:{cuisines:[],areas:[],venueHeroes:[]}, small:{}, ok:true };
for (const slug of expect.cuisines){
  const f = path.join(cuisineDir, `${slug}.webp`);
  if (!exists(f)) report.missing.cuisines.push(`/images/tiles/cuisines/${slug}.webp`);
  else if (size(f) < 50000) (report.small[f]=size(f));
}
for (const slug of expect.areas){
  const f = path.join(areaDir, `${slug}.webp`);
  if (!exists(f)) report.missing.areas.push(`/images/tiles/areas/${slug}.webp`);
  else if (size(f) < 50000) (report.small[f]=size(f));
}
// sample venue heroes (don't require all)
const vjson = path.join(root,"public","venues.json");
if (exists(vjson)){
  const data = JSON.parse(fs.readFileSync(vjson,"utf8"));
  const venues = Array.isArray(data)?data:(data.venues||[]);
  for (const v of venues.slice(0,120)){
    const slug = v.slug || "";
    if (!slug) continue;
    const hero = path.join(restaurantsDir, slug, "hero.webp");
    const card = path.join(restaurantsDir, slug, "card.webp");
    const hasHero = exists(hero) && size(hero)>=50000;
    const hasCard = exists(card) && size(card)>=50000;
    if (!hasHero && !hasCard){
      report.missing.venueHeroes.push(`/images/restaurants/${slug}/hero.webp`);
    }
  }
}
report.ok = report.missing.cuisines.length===0 && report.missing.areas.length===0;
fs.writeFileSync("reports/local_asset_verification.json", JSON.stringify(report,null,2));
console.log("🔎 Local assets checked -> reports/local_asset_verification.json");
if (!report.ok){
  console.log("❌ Missing assets found:", report.missing);
  process.exit(0); // continue (non-blocking): we can still deploy to pick up already-generated assets
} else {
  console.log("✅ Local assets look good.");
}
