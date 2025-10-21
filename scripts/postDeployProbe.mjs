import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const BASE_URL = process.env.BASE_URL || "https://www.thebestinlondon.co.uk";

function probeUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    
    client.get(url, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        resolve({
          url,
          status: res.statusCode,
          ok: res.statusCode === 200,
          hasHero: /PageHero|hero/i.test(body),
          hasLocalImages: /\/images\//.test(body),
          hasVersionedUrls: /\?v=/.test(body),
          hasJsonLd: /application\/ld\+json/.test(body),
          contentLength: body.length
        });
      });
    }).on("error", () => {
      resolve({ url, status: 0, ok: false, error: true });
    });
  });
}

async function probeLive() {
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: {},
    summary: {}
  };

  console.log(`🔍 Probing live site: ${BASE_URL}`);

  // Core pages
  const corePages = [
    "/",
    "/restaurants", 
    "/areas",
    "/cuisines",
    "/best-halal-restaurants-london",
    "/blog",
    "/faq"
  ];

  let corePass = 0;
  for (const page of corePages) {
    const result = await probeUrl(`${BASE_URL}${page}`);
    report.pages[page] = result;
    if (result.ok) corePass++;
  }

  // Sample venue pages
  console.log("🔍 Probing sample venue pages...");
  const venuesFile = path.join(ROOT, "public/venues.json");
  let venuePass = 0;
  
  if (fs.existsSync(venuesFile)) {
    try {
      const venuesData = JSON.parse(fs.readFileSync(venuesFile, "utf8"));
      const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
      
      const sampleVenues = venues.slice(0, 5);
      for (const venue of sampleVenues) {
        const result = await probeUrl(`${BASE_URL}/restaurant/${venue.slug}`);
        report.pages[`/restaurant/${venue.slug}`] = result;
        if (result.ok) venuePass++;
      }
    } catch (error) {
      console.log("Error reading venues:", error.message);
    }
  }

  // Sample area pages
  console.log("🔍 Probing sample area pages...");
  const areasFile = path.join(ROOT, "data/areas.json");
  let areaPass = 0;
  
  if (fs.existsSync(areasFile)) {
    try {
      const areasData = JSON.parse(fs.readFileSync(areasFile, "utf8"));
      const areas = areasData.areas || [];
      
      const sampleAreas = areas.slice(0, 3);
      for (const area of sampleAreas) {
        const result = await probeUrl(`${BASE_URL}/areas/${area.slug}`);
        report.pages[`/areas/${area.slug}`] = result;
        if (result.ok) areaPass++;
      }
    } catch (error) {
      console.log("Error reading areas:", error.message);
    }
  }

  // Sample cuisine pages
  console.log("🔍 Probing sample cuisine pages...");
  const cuisines = ["british", "indian", "italian"];
  let cuisinePass = 0;
  
  for (const cuisine of cuisines) {
    const result = await probeUrl(`${BASE_URL}/${cuisine}`);
    report.pages[`/${cuisine}`] = result;
    if (result.ok) cuisinePass++;
  }

  // Summary
  const totalPages = Object.keys(report.pages).length;
  const totalPass = Object.values(report.pages).filter(p => p.ok).length;
  
  report.summary = {
    totalPages: totalPages,
    totalPass: totalPass,
    totalFail: totalPages - totalPass,
    corePages: { total: corePages.length, pass: corePass },
    venuePages: { total: 5, pass: venuePass },
    areaPages: { total: 3, pass: areaPass },
    cuisinePages: { total: 3, pass: cuisinePass }
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "live_probe.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Live Site Probe Report

**Timestamp:** ${report.timestamp}
**Base URL:** ${report.baseUrl}

## Summary
- **Total Pages:** ${report.summary.totalPages}
- **Pass:** ${report.summary.totalPass}
- **Fail:** ${report.summary.totalFail}

## Breakdown
- **Core Pages:** ${report.summary.corePages.pass}/${report.summary.corePages.total}
- **Venue Pages:** ${report.summary.venuePages.pass}/${report.summary.venuePages.total}
- **Area Pages:** ${report.summary.areaPages.pass}/${report.summary.areaPages.total}
- **Cuisine Pages:** ${report.summary.cuisinePages.pass}/${report.summary.cuisinePages.total}

## Page Details
${Object.entries(report.pages).map(([path, result]) => 
  `### ${path}
- **Status:** ${result.ok ? '✅ 200' : '❌ ' + result.status}
- **Has Hero:** ${result.hasHero ? '✅' : '❌'}
- **Has Local Images:** ${result.hasLocalImages ? '✅' : '❌'}
- **Has Versioned URLs:** ${result.hasVersionedUrls ? '✅' : '❌'}
- **Has JSON-LD:** ${result.hasJsonLd ? '✅' : '❌'}
${result.error ? '- **Error:** Connection failed' : ''}`
).join('\n\n')}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "live_probe.md"),
    markdown
  );
}

(async () => {
  try {
    const report = await probeLive();
    saveReports(report);
    console.log("✅ Live probe complete:", report.summary);
  } catch (error) {
    console.error("❌ Live probe failed:", error);
    process.exit(1);
  }
})();
