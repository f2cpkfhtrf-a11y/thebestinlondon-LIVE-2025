import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const REPORT_FILE = path.join(ROOT, "reports/probe.json");

function probeImage(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    
    client.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: parseInt(res.headers['content-length'] || '0'),
        ok: res.statusCode === 200 && 
            res.headers['content-type']?.includes('image/webp') &&
            parseInt(res.headers['content-length'] || '0') >= 51200
      });
    }).on("error", () => {
      resolve({ url, status: 0, contentType: null, contentLength: 0, ok: false });
    }).end();
  });
}

async function probeImages() {
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    tiles: [],
    heroes: [],
    summary: { total: 0, pass: 0, fail: 0 }
  };
  
  // Sample tile URLs
  const tileUrls = [
    "/images/tiles/cuisines/british.webp",
    "/images/tiles/cuisines/indian.webp",
    "/images/tiles/areas/central-london.webp",
    "/images/tiles/areas/tower-hamlets.webp",
    "/images/blog/tiles/best-british-restaurants-in-london.webp"
  ];
  
  // Sample hero URLs
  const heroUrls = [
    "/images/heroes/site-default.webp",
    "/images/heroes/faq.webp"
  ];
  
  console.log("🔍 Probing tile images...");
  for (const tileUrl of tileUrls) {
    const result = await probeImage(`${BASE_URL}${tileUrl}`);
    report.tiles.push(result);
    report.summary.total++;
    if (result.ok) {
      report.summary.pass++;
    } else {
      report.summary.fail++;
    }
  }
  
  console.log("🔍 Probing hero images...");
  for (const heroUrl of heroUrls) {
    const result = await probeImage(`${BASE_URL}${heroUrl}`);
    report.heroes.push(result);
    report.summary.total++;
    if (result.ok) {
      report.summary.pass++;
    } else {
      report.summary.fail++;
    }
  }
  
  // Save report
  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log("✅ Image probe report:", report.summary);
  return report;
}

probeImages().catch(error => {
  console.error("❌ Image probe failed:", error);
  process.exit(1);
});
