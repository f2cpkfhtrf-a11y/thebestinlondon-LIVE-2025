import fs from "fs";
import { setTimeout as wait } from "timers/promises";
const WWW = "https://www.thebestinlondon.co.uk";
const ROUTES = ["/","/cuisines","/areas","/best-halal-restaurants-london"];
const MIN_SIZE = 50000;
const SVG_ALLOW = [/\/images\/brand\//, /\.svg(\?.*)?$/i];

function uniq(a){return [...new Set(a)];}
function abs(u){ if (u.startsWith("http")) return u; if (u.startsWith("/")) return WWW+u; return WWW+"/"+u.replace(/^\/+/,""); }
function isLocal(u){ return u.startsWith("/") || u.startsWith(WWW) || u.startsWith("data:"); }
function hasV(u){ try{ return new URL(u).searchParams.has("v"); } catch { return /\?v=/.test(u); } }

async function head(u){ try{ const r=await fetch(u,{method:"HEAD"}); return {u,ok:r.ok,sc:r.status,ct:r.headers.get("content-type")||"",cl:+(r.headers.get("content-length")||0)}; }catch(e){ return {u,ok:false,sc:0,ct:"",cl:0,err:String(e)}; } }
async function html(p){ const r=await fetch(WWW+p); return {sc:r.status,body:await r.text()}; }
function extract(html){
  const imgs=[...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m=>m[1]);
  const sets=[...html.matchAll(/srcset=["']([^"']+)["']/gi)].flatMap(m=>m[1].split(",").map(s=>s.trim().split(" ")[0]));
  const css=[...html.matchAll(/url\((['"]?)(\/[^'")]+)\1\)/gi)].map(m=>m[2]);
  return uniq(imgs.concat(sets).concat(css).filter(Boolean));
}

const report={routes:{},summary:{}};
(async()=>{
  // give CDN a beat after alias move
  await wait(1500);
  for (const p of ROUTES){
    const {sc,body} = await html(p);
    const urls = extract(body).filter(isLocal).map(abs);
    const probes = await Promise.all(urls.slice(0,150).map(head));
    const bad = probes.filter(h=>{
      if (!h.ok) return true;
      if (!h.ct.startsWith("image/")) {
        // ignore small SVG/logo
        if (SVG_ALLOW.some(re=>re.test(h.u))) return false;
        return false;
      }
      if (h.cl < MIN_SIZE && !SVG_ALLOW.some(re=>re.test(h.u))) return true;
      return false;
    });
    const versioned = urls.filter(hasV).length;
    report.routes[p] = {status:sc,total:urls.length,versioned,bad:bad.slice(0,20)};
  }
  const all200 = Object.values(report.routes).every(r=>r.status===200);
  const noBad = Object.values(report.routes).every(r=>r.bad.length===0);
  const versioningOK = Object.values(report.routes).every(r=>r.versioned >= Math.min(8, r.total||0));
  report.summary = {all200,noBad,versioningOK};
  fs.writeFileSync("reports/live_verify_after_alias.json", JSON.stringify(report,null,2));
  console.log("📊 LIVE SUMMARY:", report.summary);
  if (!noBad){
    console.log("Samples of bad assets:");
    for (const [p,r] of Object.entries(report.routes)){
      for (const b of r.bad.slice(0,3)){ console.log("-", p, b.sc, b.ct, b.cl, b.u); }
    }
  }
})();
