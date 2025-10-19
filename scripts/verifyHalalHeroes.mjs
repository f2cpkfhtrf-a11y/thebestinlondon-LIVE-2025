import fs from "fs";
import path from "path";

// Read venues.json
const venuesData = fs.readFileSync(new URL("../public/venues.json", import.meta.url), 'utf8');
const venues = JSON.parse(venuesData).venues || JSON.parse(venuesData);

const root = process.cwd();
const exists = rel => fs.existsSync(path.join(root, rel.replace(/^\/+/, "")));
const isHalal = v => !!(v?.halal_verified || v?.dietary_tags?.halal === true);

const problems = [];

// 1) List page hero must exist
const listHeroCandidates = [
  "/public/images/heroes/halal/halal-hero.webp",
  "/public/images/heroes/halal.webp",
  "/public/images/heroes/site/default-hero.webp",
];
const listHeroFound = listHeroCandidates.find(p => exists(p));
if (!listHeroFound) {
  problems.push({ 
    scope: "halal-list", 
    issue: "Missing halal list hero candidate", 
    tried: listHeroCandidates 
  });
}

// 2) Venue heroes
for (const v of venues) {
  if (!isHalal(v)) continue;

  const candidates = [
    v?.image_hero_path,                                        // venue-specific
    v?.cuisine_slug ? `/public/images/heroes/cuisines/${v.cuisine_slug}.webp` : null,
    v?.area_slug ? `/public/images/heroes/areas/${v.area_slug}.webp` : null,
    "/public/images/heroes/halal/halal-hero.webp",             // halal fallback
    "/public/images/heroes/site/default-hero.webp",
  ].filter(Boolean);

  const hit = candidates.find(p => exists(p));
  if (!hit) {
    problems.push({
      scope: "venue",
      slug: v.slug,
      issue: "No usable hero image found in fallback chain",
      tried: candidates
    });
  }
}

if (problems.length) {
  console.error(JSON.stringify({ ok: false, problems }, null, 2));
  process.exit(1);
} else {
  console.log(JSON.stringify({ ok: true, checked: "halal heroes list+detail validated" }, null, 2));
}
