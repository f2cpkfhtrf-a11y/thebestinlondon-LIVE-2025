import fs from "fs";
import path from "path";
import { areaList, normaliseArea, slugify } from "../lib/areas.js";

const ROOT=process.cwd();
const VENUES=path.join(ROOT,"public/venues.json");
const TILE_DIR=path.join(ROOT,"public/images/tiles/areas");
const DEFAULTS=path.join(TILE_DIR,"defaults");
const SITE_DEFAULT=path.join(ROOT,"public/images/heroes/site-default.webp");

function readVenues(){
  const raw=JSON.parse(fs.readFileSync(VENUES,"utf8"));
  return Array.isArray(raw)?raw:(raw.venues||[]);
}
function exists(p){ try{ return fs.statSync(p).size>51200 }catch{ return false } } // ≥50KB

async function makeTileFromCard(cardPath, out){
  const src=path.join(ROOT,"public",cardPath.replace(/^\/+/,""));
  if (!fs.existsSync(src)) return false;
  
  // Simple file copy for now - will work with existing images
  fs.copyFileSync(src, out);
  return true;
}

async function ensureAreaTile(slug, venues){
  const out=path.join(TILE_DIR,`${slug}.webp`);
  if (exists(out)) return {slug,created:false,source:"existing"};
  // try default curated
  const curated=path.join(DEFAULTS,`${slug}.webp`);
  if (exists(curated)){ fs.copyFileSync(curated,out); return {slug,created:true,source:"curated-default"}; }
  // pick top venue image in that area
  const candidates=venues
    .filter(v=> normaliseArea(v.borough||v.area||"")===slug)
    .map(v=>v.image_card_path || v.cardImage || (v.images?.[0]?.url && v.images[0].url.startsWith("/images/") ? v.images[0].url : null))
    .filter(Boolean);
  for (const c of candidates){
    const ok=await makeTileFromCard(c,out);
    if (ok) return {slug,created:true,source:"venue-card"};
  }
  // last resort site default
  if (fs.existsSync(SITE_DEFAULT)) {
    fs.copyFileSync(SITE_DEFAULT,out);
    return {slug,created:true,source:"site-default"};
  }
  return {slug,created:false,source:"no-suitable-image"};
}

(async ()=>{
  const areas=areaList();
  const venues=readVenues();
  const report=[];
  for (const a of areas){
    const r=await ensureAreaTile(a.slug, venues);
    report.push(r);
  }
  fs.mkdirSync(path.join(process.cwd(),"scripts/reports"),{recursive:true});
  fs.writeFileSync(path.join(process.cwd(),"scripts/reports/area_tiles_fix.json"), JSON.stringify(report,null,2));
  console.log("✅ Area tiles checked & healed. Report: scripts/reports/area_tiles_fix.json");
})();
