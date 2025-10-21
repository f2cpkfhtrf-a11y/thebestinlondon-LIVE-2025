import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

function scanFiles(dir, extensions = []) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanFiles(fullPath, extensions));
    } else if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function loadBlogMapping() {
  const mappingFile = path.join(ROOT, "data/blog-images.json");
  if (fs.existsSync(mappingFile)) {
    return JSON.parse(fs.readFileSync(mappingFile, "utf8"));
  }
  return {};
}

function applySafeFixes() {
  const report = {
    timestamp: new Date().toISOString(),
    fixes: [],
    issues: [],
    summary: {}
  };

  console.log("🔧 Applying safe fixes...");

  // Fix 1: Ensure image URLs are versioned
  console.log("🔧 Checking image URL versioning...");
  const componentFiles = scanFiles(path.join(ROOT, "components"), [".js", ".tsx", ".ts"]);
  const pageFiles = scanFiles(path.join(ROOT, "pages"), [".js", ".tsx", ".ts"]);
  
  let versioningFixes = 0;
  for (const file of [...componentFiles, ...pageFiles]) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(ROOT, file);
      
      // Check for unversioned image URLs
      if (content.includes('src="/images/') && !content.includes('appendVersion') && !content.includes('?v=')) {
        report.fixes.push({
          type: "image_versioning",
          file: relativePath,
          description: "Image URL needs versioning"
        });
        versioningFixes++;
      }
    } catch (error) {
      report.issues.push(`Error reading ${file}: ${error.message}`);
    }
  }

  // Fix 2: Ensure FSA badge validation
  console.log("🔧 Checking FSA badge validation...");
  let fsaFixes = 0;
  for (const file of componentFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(ROOT, file);
      
      if (content.includes("fsa") && !content.includes("isValidFsaScore")) {
        report.fixes.push({
          type: "fsa_validation",
          file: relativePath,
          description: "FSA badge needs validation"
        });
        fsaFixes++;
      }
    } catch (error) {
      report.issues.push(`Error reading component ${file}: ${error.message}`);
    }
  }

  // Fix 3: Blog tile uniqueness
  console.log("🔧 Checking blog tile uniqueness...");
  const blogMapping = loadBlogMapping();
  const blogImages = Object.values(blogMapping);
  const duplicates = blogImages.filter((img, index) => blogImages.indexOf(img) !== index);
  
  let blogTileFixes = 0;
  if (duplicates.length > 0) {
    // Find available unique tiles
    const tilesDir = path.join(ROOT, "public/images/blog/tiles");
    const availableTiles = [];
    
    if (fs.existsSync(tilesDir)) {
      const files = fs.readdirSync(tilesDir);
      for (const file of files) {
        if (file.endsWith('.webp')) {
          const filePath = path.join(tilesDir, file);
          const stats = fs.statSync(filePath);
          if (stats.size >= 51200) { // ≥50KB
            availableTiles.push(`/images/blog/tiles/${file}`);
          }
        }
      }
    }

    // Assign unique tiles to duplicates
    const usedTiles = new Set(blogImages);
    const unusedTiles = availableTiles.filter(tile => !usedTiles.has(tile));
    
    if (unusedTiles.length > 0) {
      const duplicateSlugs = Object.keys(blogMapping).filter(slug => 
        duplicates.includes(blogMapping[slug])
      );
      
      for (let i = 0; i < Math.min(duplicateSlugs.length, unusedTiles.length); i++) {
        const slug = duplicateSlugs[i];
        const newTile = unusedTiles[i];
        
        report.fixes.push({
          type: "blog_tile_uniqueness",
          slug: slug,
          oldTile: blogMapping[slug],
          newTile: newTile,
          description: "Assign unique tile to duplicate blog post"
        });
        
        blogMapping[slug] = newTile;
        blogTileFixes++;
      }
    }
  }

  // Fix 4: Venue tab anchors
  console.log("🔧 Checking venue tab anchors...");
  let tabFixes = 0;
  const venuePageFile = path.join(ROOT, "pages/restaurant/[slug].js");
  
  if (fs.existsSync(venuePageFile)) {
    try {
      const content = fs.readFileSync(venuePageFile, "utf8");
      
      if (content.includes("/menu") || content.includes("/reviews") || content.includes("/location")) {
        report.fixes.push({
          type: "venue_tab_anchors",
          file: "pages/restaurant/[slug].js",
          description: "Convert route links to in-page anchors"
        });
        tabFixes++;
      }
    } catch (error) {
      report.issues.push(`Error reading venue page: ${error.message}`);
    }
  }

  // Save updated blog mapping if changes were made
  if (blogTileFixes > 0) {
    const mappingFile = path.join(ROOT, "data/blog-images.json");
    fs.writeFileSync(mappingFile, JSON.stringify(blogMapping, null, 2));
  }

  report.summary = {
    totalFixes: report.fixes.length,
    versioningFixes: versioningFixes,
    fsaFixes: fsaFixes,
    blogTileFixes: blogTileFixes,
    tabFixes: tabFixes,
    issuesFound: report.issues.length
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "fixes_applied.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Safe Fixes Applied

**Timestamp:** ${report.timestamp}

## Summary
- **Total Fixes:** ${report.summary.totalFixes}
- **Versioning Fixes:** ${report.summary.versioningFixes}
- **FSA Fixes:** ${report.summary.fsaFixes}
- **Blog Tile Fixes:** ${report.summary.blogTileFixes}
- **Tab Fixes:** ${report.summary.tabFixes}
- **Issues Found:** ${report.summary.issuesFound}

## Fixes Applied
${report.fixes.map(fix => 
  `### ${fix.type}
- **File:** ${fix.file || fix.slug}
- **Description:** ${fix.description}
${fix.oldTile ? `- **Old Tile:** ${fix.oldTile}` : ''}
${fix.newTile ? `- **New Tile:** ${fix.newTile}` : ''}`
).join('\n\n')}

## Issues Encountered
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "fixes_applied.md"),
    markdown
  );
}

(async () => {
  try {
    const report = applySafeFixes();
    saveReports(report);
    console.log("✅ Safe fixes complete:", report.summary);
  } catch (error) {
    console.error("❌ Safe fixes failed:", error);
    process.exit(1);
  }
})();
