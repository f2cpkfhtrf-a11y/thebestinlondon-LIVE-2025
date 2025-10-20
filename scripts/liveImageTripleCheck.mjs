import fs from "fs";
import path from "path";
const DOMAIN_WWW = process.env.DOMAIN_WWW || "https://www.thebestinlondon.co.uk";
const DOMAIN_APEX = process.env.DOMAIN_APEX || "https://thebestinlondon.co.uk";
const ROUTES = ["/", "/cuisines", "/areas", "/best-halal-restaurants-london"];
const MIN_SIZE = 50_000;
const SVG_ALLOWLIST = [/\/images\/brand\//, /\.svg(\?.*)?$/i, /\/assets\/logos\//];

function uniq(a){return [...new Set(a)];}
function extractUrls(html){
  const img = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m=>m[1]);
  const set = [...html.matchAll(/<img[^>]+srcset=["']([^"']+)["']/gi)].flatMap(m=>m[1].split(",").map(s=>s.trim().split(" ")[0]));
  const css = [...html.matchAll(/url\((['"]?)(\/[^'")]+)\1\)/gi)].map(m=>m[2]);
  return uniq(img.concat(set).concat(css));
}
function isLocal(u){ return u.startsWith("/") || u.startsWith(DOMAIN_WWW) || u.startsWith(DOMAIN_APEX) || u.startsWith("data:"); }
function absolute(u){ if (u.startsWith("http")) return u; if (u.startsWith("/")) return DOMAIN_WWW+u; return DOMAIN_WWW+"/"+u.replace(/^\/+/,""); }
function hasVersion(u){ try{ const q=new URL(u).searchParams; return [...q.keys()].length>0; } catch { return /\?v=/.test(u); } }
async function head(u){ try{ const r=await fetch(u,{method:"HEAD"}); return {ok:r.ok,status:r.status,ct:r.headers.get("content-type")||"",cl:+(r.headers.get("content-length")||0),url:u}; }catch(e){return {ok:false,status:0,ct:"",cl:0,url:u,err:String(e)};} }
async function html(u){ const r=await fetch(u); return {status:r.status, html: await r.text()}; }

function allowSmall(url){
  return SVG_ALLOWLIST.some(re=>re.test(url));
}

const report={routes:{},summary:{}};

(async()=>{
  console.log("🔍 Starting live image triple-check...");
  
  // Aliases
  const rW = await fetch(DOMAIN_WWW+"/", {redirect:"manual"});
  const rA = await fetch(DOMAIN_APEX+"/", {redirect:"manual"});
  report.aliases={www:rW.status, apex:rA.status, apexLoc:rA.headers.get("location")||null};

  // Crawl routes
  for (const p of ROUTES){
    console.log(`Checking route: ${p}`);
    const { status, html:doc } = await html(DOMAIN_WWW+p);
    const urls = extractUrls(doc);
    const local = urls.filter(isLocal).map(absolute);
    const probes = await Promise.all(local.slice(0,120).map(head));
    report.routes[p] = {
      status,
      localCount: local.length,
      versionedCount: local.filter(hasVersion).length,
      bad: probes.filter(x=>{
        if (!x.ok) return true;
        if (!x.ct.startsWith("image/")) return allowSmall(x.url)?false:true;
        if (x.cl<MIN_SIZE) return allowSmall(x.url)?false:true;
        return false;
      }).slice(0,20),
      probes: probes.slice(0,30)
    };
  }

  // Summary
  const any404 = Object.values(report.routes).some(r=>r.status!==200);
  const anyBad = Object.values(report.routes).some(r=>r.bad.length>0);
  const versioningOK = Object.values(report.routes).every(r=>r.versionedCount >= Math.min(6, r.localCount||0));
  report.summary = {
    aliases_ok: report.aliases.www===200 && [301,302,307].includes(report.aliases.apex),
    routes_ok: !any404,
    images_ok: !anyBad,
    versioning_ok: versioningOK
  };

  fs.writeFileSync(process.env.REPORT_FILE || "reports/live_image_triplecheck.json", JSON.stringify(report,null,2));
  
  console.log("\n📊 LIVE IMAGE TRIPLE-CHECK SUMMARY");
  console.log("======================================");
  const toFlag = (b)=> b ? "✅ PASS" : "❌ FAIL";
  console.log("Aliases:", toFlag(report.summary.aliases_ok));
  console.log("Routes:", toFlag(report.summary.routes_ok));
  console.log("Images (200 + type + ≥50KB):", toFlag(report.summary.images_ok));
  console.log("Versioned URLs (?v=):", toFlag(report.summary.versioning_ok));
  
  if (!report.summary.images_ok){
    console.log("\nFirst bad samples:");
    for (const [p,r] of Object.entries(report.routes)){
      for (const b of r.bad.slice(0,3)){ 
        console.log(`- ${p}: ${b.status} ${b.ct} ${b.cl}B ${b.url}`); 
      }
    }
  }
})();