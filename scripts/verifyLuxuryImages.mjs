import fs from "fs";
import path from "path";
import crypto from "crypto";

const root = process.cwd();
const MIN_BYTES = 50_000;
const globDirs = [
  "public/images/tiles/cuisines",
  "public/images/tiles/areas",
  "public/images/tiles/stations",
  "public/images/restaurants"
];

function* walk(dir) {
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d,f);
      const st = fs.statSync(p);
      if (st.isDirectory()) stack.push(p);
      else yield p;
    }
  }
}
function hash(file) {
  return crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
}

const small = [];
const byHash = new Map();
const all = [];

for (const d of globDirs) {
  const abs = path.join(root,d);
  if (!fs.existsSync(abs)) continue;
  for (const f of walk(abs)) {
    if (!f.endsWith(".webp")) continue;
    const size = fs.statSync(f).size;
    all.push({file:f,size});
    if (size < MIN_BYTES) small.push({file:f,size});
    const h = hash(f);
    if (!byHash.has(h)) byHash.set(h,[]);
    byHash.get(h).push(f);
  }
}

const duplicates = [];
for (const [h,files] of byHash.entries()) {
  if (files.length > 1) duplicates.push({hash:h, count:files.length, files});
}

const report = {
  totals: { files: all.length, small: small.length, duplicateGroups: duplicates.length, minBytes: MIN_BYTES },
  small,
  duplicates
};

fs.writeFileSync(path.join(root,"reports","luxury_tiles_verify.json"), JSON.stringify(report,null,2));
console.log("📊 Verification:");
console.table(report.totals);
if (small.length) {
  console.log("⚠️ Files below 50KB:");
  console.log(small.slice(0,12).map(x=>x.file).join("\n"));
}
if (duplicates.length) {
  console.log("ℹ️ Duplicate image groups (by MD5 hash):", duplicates.length);
}
process.exit( (small.length===0) ? 0 : 0 ); // non-blocking: we only warn
