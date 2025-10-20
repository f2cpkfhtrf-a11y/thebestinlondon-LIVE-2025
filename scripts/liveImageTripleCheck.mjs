import fs from "fs";
import path from "path";

const DOMAIN_WWW = process.env.DOMAIN_WWW || "https://www.thebestinlondon.co.uk";
const DOMAIN_APEX = process.env.DOMAIN_APEX || "https://thebestinlondon.co.uk";
const ROUTES = ["/", "/cuisines", "/areas", "/best-halal-restaurants-london"];
const MIN_SIZE = 50_000; // 50KB threshold
const EXPECTED_CUISINES = [
  "british","indian","italian","japanese","thai","turkish","french","chinese","spanish","korean","mexican","lebanese",
  "pakistani","bangladeshi","iranian","afghan","middle-eastern","vegan","vegetarian","halal","steakhouse","seafood",
  "pizza","burgers","cafe","bakery","desserts","mediterranean","modern-european","caribbean"
];
const EXPECTED_AREAS = [
  "central-london","tower-hamlets","westminster","camden","hackney","islington","kensington-and-chelsea","lambeth","southwark",
  "soho","shoreditch","covent-garden","mayfair","marylebone","fitzrovia","holborn","clerkenwell","whitechapel","spitalfields",
  "brick-lane","borough","london-bridge","canary-wharf","greenwich","redbridge","havering","newham","wimbledon","clapham","brixton","stratford"
];

function uniq(arr){return [...new Set(arr)]}
function extractUrls(html){
  const srcImgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m=>m[1]);
  const srcsets = [...html.matchAll(/<img[^>]+srcset=["']([^"']+)["']/gi)].flatMap(m=>m[1].split(",").map(s=>s.trim().split(" ")[0]));
  const cssBg  = [...html.matchAll(/url\((['"]?)(\/[^'")]+)\1\)/gi)].map(m=>m[2]);
  return uniq(srcImgs.concat(srcsets).concat(cssBg));
}
function isLocal(url){
  if (url.startsWith("data:")) return true; // ignore inline placeholders
  if (url.startsWith("/")) return true;
  if (url.startsWith(DOMAIN_WWW) || url.startsWith(DOMAIN_APEX)) return true;
  return false;
}
function absolute(url){
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return DOMAIN_WWW + url;
  return DOMAIN_WWW + "/" + url.replace(/^\/+/,'');
}
async function headOk(url){
  try{
    const res = await fetch(url, { method:"HEAD" });
    const ct = res.headers.get("content-type")||"";
    const cl = Number(res.headers.get("content-length")||"0");
    return { ok: res.ok, status: res.status, ct, cl, url };
  }catch(e){
    return { ok:false, status:0, ct:"", cl:0, url, err:String(e) };
  }
}
async function getHtml(url){
  const res = await fetch(url);
  const text = await res.text();
  return { status: res.status, html: text };
}
function hasVersion(url){
  // allow versioned query ?v=... or any ?cache=..., as long as query exists
  try{
    const u = new URL(url);
    return [...u.searchParams.keys()].length>0;
  }catch{
    return /\?v=/.test(url);
  }
}
function filename(u){
  try{ return new URL(u).pathname.split("/").pop() || ""; }catch{
    return u.split("?")[0].split("/").pop()||"";
  }
}
function loadVenuesSample(n=20){
  const p = path.join(process.cwd(),"public","venues.json");
  if(!fs.existsSync(p)) return [];
  const data = JSON.parse(fs.readFileSync(p,"utf8"));
  const venues = Array.isArray(data)?data:(data.venues||[]);
  const shuffled = venues.sort(()=>Math.random()-0.5);
  return shuffled.slice(0, n);
}

const report = {
  aliases: { www: null, apex: null },
  routes: {},
  tiles: { cuisines: {}, areas: {} },
  restaurantSamples: [],
  policy: { externalImages: [] },
  summary: {}
};

async function checkAliases(){
  // Expect apex to 301/307 to www; www should be 200 on /
  const rW = await fetch(DOMAIN_WWW+"/",{ method:"GET", redirect:"manual" });
  const rA = await fetch(DOMAIN_APEX+"/",{ method:"GET", redirect:"manual" });
  report.aliases.www = { status: rW.status };
  report.aliases.apex = { status: rA.status, location: rA.headers.get("location")||null };
}

async function checkRoute(urlPath){
  const full = DOMAIN_WWW+urlPath;
  const res = await fetch(full, { redirect:"manual" });
  const h = await res.text();
  const imgs = extractUrls(h);
  const locals = imgs.filter(isLocal);
  const externals = imgs.filter(u=>!isLocal(u));
  // HEAD probe the local images (limit to 80 per page to avoid rate limits)
  const toProbe = locals.slice(0,80).map(absolute);
  const heads = await Promise.all(toProbe.map(headOk));
  report.routes[urlPath] = {
    status: res.status,
    localCount: locals.length,
    externalCount: externals.length,
    versionedCount: locals.filter(u=>hasVersion(absolute(u))).length,
    probes: heads
  };
  report.policy.externalImages.push(...externals);
}

function coverageCheck(list, expectedSlugs){
  const names = list.map(filename);
  const found = new Set(names);
  const missing = expectedSlugs.filter(s=>!names.some(n=>n===`${s}.webp`));
  return { foundCount: found.size, missingCount: missing.length, missing };
}

async function checkTiles(){
  // /cuisines
  const c = report.routes["/cuisines"];
  const cuisineLocals = (c?.probes||[]).map(p=>p.url).filter(u=>/\/images\/tiles\/cuisines\//.test(u));
  report.tiles.cuisines = coverageCheck(cuisineLocals, EXPECTED_CUISINES);

  // /areas
  const a = report.routes["/areas"];
  const areaLocals = (a?.probes||[]).map(p=>p.url).filter(u=>/\/images\/tiles\/areas\//.test(u));
  report.tiles.areas = coverageCheck(areaLocals, EXPECTED_AREAS);
}

async function checkRestaurants(){
  const sample = loadVenuesSample(20);
  for (const v of sample){
    const p = `/restaurant/${v.slug}`;
    const { status, html } = await getHtml(DOMAIN_WWW+p);
    const imgs = extractUrls(html).filter(isLocal).map(absolute);
    const versioned = imgs.filter(hasVersion);
    const heroCandidates = imgs.filter(u=>/\/images\/(restaurants|tiles|heroes)\//.test(u));
    const probes = await Promise.all(heroCandidates.slice(0,10).map(headOk));
    const okCount = probes.filter(x=>x.ok && x.ct.startsWith("image/") && x.cl>=MIN_SIZE).length;
    report.restaurantSamples.push({
      slug: v.slug, status,
      totalLocalImgs: imgs.length,
      versionedLocalImgs: versioned.length,
      heroCandidates: heroCandidates.length,
      okImageCount: okCount
    });
  }
}

(async function main(){
  await checkAliases();
  // core routes
  for (const r of ROUTES){
    await checkRoute(r);
  }
  await checkTiles();
  await checkRestaurants();

  // Summaries
  const allProbes = Object.values(report.routes).flatMap(r=>r?.probes||[]);
  const badProbes = allProbes.filter(p=>!(p.ok && p.ct.startsWith("image/") && p.cl>=MIN_SIZE));
  const any404 = Object.values(report.routes).some(r=>!r || r.status!==200);
  const anyExternal = report.policy.externalImages.length>0;
  const restaurantsOk = report.restaurantSamples.every(s=>s.status===200 && s.okImageCount>=1);
  const cuisinesOk = report.tiles.cuisines.missingCount===0 || report.tiles.cuisines.foundCount>=14;
  const areasOk = report.tiles.areas.missingCount===0 || report.tiles.areas.foundCount>=12;

  report.summary = {
    aliases_ok: report.aliases.www?.status===200 && [301,302,307].includes(report.aliases.apex?.status||0),
    routes_ok: !any404,
    images_ok: badProbes.length===0,
    versioning_ok: Object.values(report.routes).every(r=>(r?.versionedCount||0) >= Math.min(8, r?.localCount||0)),
    external_policy_ok: !anyExternal,
    cuisines_tiles_ok: cuisinesOk,
    areas_tiles_ok: areasOk,
    restaurants_ok: restaurantsOk,
    bad_images: badProbes.slice(0,20) // sample
  };

  fs.writeFileSync(process.env.REPORT_FILE || "reports/live_image_triplecheck.json", JSON.stringify(report,null,2));
  // Console PASS/FAIL
  const toFlag = (b)=> b ? "✅ PASS" : "❌ FAIL";
  console.log("\n📊 LIVE IMAGE TRIPLE-CHECK SUMMARY");
  console.log("Aliases:", toFlag(report.summary.aliases_ok));
  console.log("Routes:", toFlag(report.summary.routes_ok));
  console.log("Images (200 + type + ≥50KB):", toFlag(report.summary.images_ok));
  console.log("Versioned URLs (?v=):", toFlag(report.summary.versioning_ok));
  console.log("External image policy:", toFlag(report.summary.external_policy_ok));
  console.log("Cuisine tiles coverage:", toFlag(report.summary.cuisines_tiles_ok), `(missing ${report.tiles.cuisines.missingCount})`);
  console.log("Area tiles coverage:", toFlag(report.summary.areas_tiles_ok), `(missing ${report.tiles.areas.missingCount})`);
  console.log("Restaurant heroes:", toFlag(report.summary.restaurants_ok));
  if (!report.summary.images_ok){
    console.log("\nFirst bad image samples:");
    for (const b of report.summary.bad_images){
      console.log(`- ${b.status} ${b.ct} ${b.cl}B ${b.url}`);
    }
  }
})();
