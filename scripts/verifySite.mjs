import fs from "fs";
import path from "path";

function exists(p){ try{ return fs.statSync(p).size>1024 }catch{ return false } }
const ROOT=process.cwd();
const areas=JSON.parse(fs.readFileSync(path.join(ROOT,"data/areas.json"),"utf8")).areas.map(a=>a.slug);
const tileDir=path.join(ROOT,"public/images/tiles/areas");

const report={ tiles:[], missingRoutes:[], notes:[] };

// tiles present & not tiny
for (const s of areas){
  const p=path.join(tileDir,`${s}.webp`);
  report.tiles.push({slug:s, ok:exists(p), path:`/images/tiles/areas/${s}.webp`});
}

// warn if multiple tiles have identical size (likely duplicates)
const sizes={};
for (const t of report.tiles){
  if (!t.ok) continue;
  const bytes=fs.statSync(path.join(ROOT,"public",t.path)).size;
  sizes[bytes]=sizes[bytes]||[];
  sizes[bytes].push(t.slug);
}
report.duplicateSuspects=Object.entries(sizes).filter(([k,v])=>v.length>3).map(([k,v])=>({bytes:Number(k),slugs:v}));

fs.writeFileSync(path.join(ROOT,"scripts/reports/site_verify.json"), JSON.stringify(report,null,2));
console.log("🧪 Verification written: scripts/reports/site_verify.json\n",
  `Tiles OK: ${report.tiles.filter(t=>t.ok).length}/${report.tiles.length}`,
  report.duplicateSuspects.length ? "\n⚠️ Duplicate-size tile suspects present (see report)" : "\n✅ No duplicate-size clusters detected"
);
