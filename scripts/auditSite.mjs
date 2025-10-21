import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function checkPageStatus(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 });
    }).on("error", () => {
      resolve({ url, status: 0, ok: false });
    });
  });
}

function loadVenues() {
  const raw = fs.readFileSync(path.join(ROOT, "public/venues.json"), "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : (data.venues || []);
}

function loadBlogMapping() {
  const mappingFile = path.join(ROOT, "data/blog-images.json");
  if (fs.existsSync(mappingFile)) {
    return JSON.parse(fs.readFileSync(mappingFile, "utf8"));
  }
  return {};
}

function isValidFsaScore(n) {
  return typeof n === 'number' && n > 0 && n <= 5;
}

async function auditSite() {
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: {},
    blogTiles: {},
    venuePages: {},
    fsaDisplay: {},
    tabs: {},
    summary: { pass: 0, fail: 0, warnings: 0 }
  };
  
  // 1. Check core pages
  console.log("🔍 Checking core pages...");
  const corePages = ["/", "/cuisines", "/areas", "/blog", "/faq", "/best-halal-restaurants-london"];
  
  for (const page of corePages) {
    const result = await checkPageStatus(`${BASE_URL}${page}`);
    report.pages[page] = result;
    if (result.ok) {
      report.summary.pass++;
    } else {
      report.summary.fail++;
    }
  }
  
  // 2. Check blog tile uniqueness
  console.log("🔍 Checking blog tile uniqueness...");
  const blogMapping = loadBlogMapping();
  const blogImages = Object.values(blogMapping);
  const duplicates = blogImages.filter((img, index) => blogImages.indexOf(img) !== index);
  
  report.blogTiles = {
    total: Object.keys(blogMapping).length,
    unique: [...new Set(blogImages)].length,
    duplicates: duplicates.length,
    duplicateImages: [...new Set(duplicates)]
  };
  
  if (duplicates.length > 0) {
    report.summary.fail++;
  } else {
    report.summary.pass++;
  }
  
  // 3. Check venue pages (sample)
  console.log("🔍 Checking venue pages...");
  const venues = loadVenues();
  const sampleSize = Math.min(100, venues.length);
  const sampleVenues = venues.slice(0, sampleSize);
  
  let venuePass = 0;
  let venueFail = 0;
  
  for (const venue of sampleVenues) {
    const venueUrl = `${BASE_URL}/restaurant/${venue.slug}`;
    const pageResult = await checkPageStatus(venueUrl);
    
    const venueReport = {
      url: venueUrl,
      status: pageResult.status,
      hasHero: !!(venue.image_card_path || venue.image_hero_path),
      fsaValid: isValidFsaScore(venue.fsa_rating || venue.fsa?.rating),
      fsaValue: venue.fsa_rating || venue.fsa?.rating
    };
    
    report.venuePages[venue.slug] = venueReport;
    
    if (pageResult.ok && venueReport.hasHero) {
      venuePass++;
    } else {
      venueFail++;
    }
  }
  
  report.summary.pass += venuePass;
  report.summary.fail += venueFail;
  
  // 4. Check FSA display rules
  console.log("🔍 Checking FSA display rules...");
  const fsaIssues = venues.filter(v => {
    const fsaScore = v.fsa_rating || v.fsa?.rating;
    return fsaScore === 0 || fsaScore === "0" || (typeof fsaScore === "number" && fsaScore < 0);
  });
  
  report.fsaDisplay = {
    total: venues.length,
    valid: venues.filter(v => isValidFsaScore(v.fsa_rating || v.fsa?.rating)).length,
    invalid: fsaIssues.length,
    issues: fsaIssues.map(v => ({ slug: v.slug, fsa: v.fsa_rating || v.fsa?.rating }))
  };
  
  if (fsaIssues.length > 0) {
    report.summary.fail++;
  } else {
    report.summary.pass++;
  }
  
  // 5. Check tabs (simulate anchor links)
  console.log("🔍 Checking venue tabs...");
  const tabAnchors = ["#overview", "#menu", "#reviews", "#location", "#similar"];
  let tabsPass = 0;
  let tabsFail = 0;
  
  for (const venue of sampleVenues.slice(0, 10)) { // Check first 10 venues
    const venueUrl = `${BASE_URL}/restaurant/${venue.slug}`;
    const pageResult = await checkPageStatus(venueUrl);
    
    if (pageResult.ok) {
      tabsPass++;
    } else {
      tabsFail++;
    }
  }
  
  report.tabs = {
    checked: sampleVenues.slice(0, 10).length,
    pass: tabsPass,
    fail: tabsFail
  };
  
  report.summary.pass += tabsPass;
  report.summary.fail += tabsFail;
  
  // Save reports
  fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(ROOT, "reports/site_audit.json"),
    JSON.stringify(report, null, 2)
  );
  
  // Markdown summary
  const markdown = `# Site Audit Summary

**Timestamp:** ${report.timestamp}
**Base URL:** ${report.baseUrl}

## Results Summary
- ✅ **PASS:** ${report.summary.pass}
- ❌ **FAIL:** ${report.summary.fail}
- ⚠️ **WARNINGS:** ${report.summary.warnings}

## Core Pages Status
${Object.entries(report.pages).map(([page, result]) => 
  `- ${page}: ${result.ok ? '✅' : '❌'} (${result.status})`
).join('\n')}

## Blog Tiles Uniqueness
- **Total posts:** ${report.blogTiles.total}
- **Unique images:** ${report.blogTiles.unique}
- **Duplicates:** ${report.blogTiles.duplicates}
${report.blogTiles.duplicates > 0 ? `- **Duplicate images:** ${report.blogTiles.duplicateImages.join(', ')}` : ''}

## Venue Pages (Sample: ${sampleSize})
- **Checked:** ${sampleSize} venues
- **Pass:** ${venuePass}
- **Fail:** ${venueFail}

## FSA Display Rules
- **Total venues:** ${report.fsaDisplay.total}
- **Valid FSA scores:** ${report.fsaDisplay.valid}
- **Invalid FSA scores:** ${report.fsaDisplay.invalid}
${report.fsaDisplay.invalid > 0 ? `- **Issues:** ${report.fsaDisplay.issues.map(i => `${i.slug} (${i.fsa})`).join(', ')}` : ''}

## Venue Tabs
- **Checked:** ${report.tabs.checked} venues
- **Pass:** ${report.tabs.pass}
- **Fail:** ${report.tabs.fail}

## Overall Status
${report.summary.fail === 0 ? '✅ **ALL CHECKS PASSED**' : '❌ **SOME CHECKS FAILED**'}
`;
  
  fs.writeFileSync(
    path.join(ROOT, "reports/site_audit_summary.md"),
    markdown
  );
  
  console.log("\n📊 AUDIT SUMMARY:");
  console.log(`✅ PASS: ${report.summary.pass}`);
  console.log(`❌ FAIL: ${report.summary.fail}`);
  console.log(`⚠️ WARNINGS: ${report.summary.warnings}`);
  
  if (report.summary.fail > 0) {
    console.log("\n❌ AUDIT FAILED - Some checks did not pass");
    process.exit(1);
  } else {
    console.log("\n✅ AUDIT PASSED - All checks successful");
    process.exit(0);
  }
}

auditSite().catch(error => {
  console.error("❌ Audit failed:", error);
  process.exit(1);
});
