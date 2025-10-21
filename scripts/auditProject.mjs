import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

function scanDirectory(dir, extensions = []) {
  const items = [];
  if (!fs.existsSync(dir)) return items;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      items.push(...scanDirectory(fullPath, extensions));
    } else if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
      items.push(fullPath);
    }
  }
  return items;
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function analyzeProject() {
  const report = {
    timestamp: new Date().toISOString(),
    pages: {},
    components: {},
    images: {},
    data: {},
    issues: [],
    summary: {}
  };

  // Scan pages
  console.log("🔍 Scanning pages...");
  const pageFiles = scanDirectory(path.join(ROOT, "pages"), [".js", ".tsx", ".ts"]);
  report.pages = {
    total: pageFiles.length,
    static: pageFiles.filter(f => !f.includes("[")).length,
    dynamic: pageFiles.filter(f => f.includes("[")).length,
    files: pageFiles.map(f => path.relative(ROOT, f))
  };

  // Scan components
  console.log("🔍 Scanning components...");
  const componentFiles = scanDirectory(path.join(ROOT, "components"), [".js", ".tsx", ".ts"]);
  report.components = {
    total: componentFiles.length,
    files: componentFiles.map(f => path.relative(ROOT, f))
  };

  // Scan images
  console.log("🔍 Scanning images...");
  const imageFiles = scanDirectory(path.join(ROOT, "public/images"), [".webp", ".jpg", ".jpeg", ".png", ".svg"]);
  const imageStats = {
    total: imageFiles.length,
    webp: imageFiles.filter(f => f.endsWith(".webp")).length,
    totalSize: 0,
    byFolder: {}
  };

  for (const file of imageFiles) {
    const size = getFileSize(file);
    imageStats.totalSize += size;
    
    const relativePath = path.relative(path.join(ROOT, "public/images"), file);
    const folder = relativePath.split(path.sep)[0];
    imageStats.byFolder[folder] = (imageStats.byFolder[folder] || 0) + 1;
  }

  report.images = imageStats;

  // Scan data
  console.log("🔍 Scanning data...");
  const dataFiles = scanDirectory(path.join(ROOT, "data"), [".json", ".ts", ".js"]);
  const venuesFile = path.join(ROOT, "public/venues.json");
  
  let venuesCount = 0;
  if (fs.existsSync(venuesFile)) {
    try {
      const venuesData = JSON.parse(fs.readFileSync(venuesFile, "utf8"));
      venuesCount = Array.isArray(venuesData) ? venuesData.length : (venuesData.venues?.length || 0);
    } catch (e) {
      report.issues.push("Failed to parse venues.json");
    }
  }

  const blogFiles = scanDirectory(path.join(ROOT, "content/blog"), [".json"]);
  const faqFiles = scanDirectory(path.join(ROOT, "content/faq"), [".json"]);

  report.data = {
    venues: venuesCount,
    blogs: blogFiles.length,
    faqs: faqFiles.length,
    dataFiles: dataFiles.map(f => path.relative(ROOT, f))
  };

  // Check for missing index files
  const expectedIndexes = [
    "pages/index.js",
    "pages/blog/index.js",
    "pages/faq/index.js"
  ];

  for (const indexFile of expectedIndexes) {
    if (!fs.existsSync(path.join(ROOT, indexFile))) {
      report.issues.push(`Missing index file: ${indexFile}`);
    }
  }

  // Summary
  report.summary = {
    totalPages: report.pages.total,
    totalComponents: report.components.total,
    totalImages: report.images.total,
    totalImageSizeMB: Math.round(report.images.totalSize / 1024 / 1024),
    totalVenues: report.data.venues,
    totalBlogs: report.data.blogs,
    totalFaqs: report.data.faqs,
    issuesFound: report.issues.length
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_project.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Project Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Pages:** ${report.summary.totalPages} (${report.pages.static} static, ${report.pages.dynamic} dynamic)
- **Components:** ${report.summary.totalComponents}
- **Images:** ${report.summary.totalImages} (${report.summary.totalImageSizeMB}MB total)
- **Venues:** ${report.summary.totalVenues}
- **Blogs:** ${report.summary.totalBlogs}
- **FAQs:** ${report.summary.totalFaqs}
- **Issues:** ${report.summary.issuesFound}

## Image Breakdown
${Object.entries(report.images.byFolder).map(([folder, count]) => `- **${folder}:** ${count} files`).join('\n')}

## Issues Found
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}

## Files Structure
### Pages (${report.pages.total})
${report.pages.files.map(f => `- ${f}`).join('\n')}

### Components (${report.components.total})
${report.components.files.map(f => `- ${f}`).join('\n')}

### Data Files (${report.data.dataFiles.length})
${report.data.dataFiles.map(f => `- ${f}`).join('\n')}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_project.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeProject();
    saveReports(report);
    console.log("✅ Project audit complete:", report.summary);
  } catch (error) {
    console.error("❌ Project audit failed:", error);
    process.exit(1);
  }
})();
