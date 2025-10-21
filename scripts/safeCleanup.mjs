import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const QUARANTINE_DIR = path.join(ROOT, "_quarantine");

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

function getFileReferences(filePath) {
  const references = [];
  const content = fs.readFileSync(filePath, "utf8");
  
  // Look for image references
  const imagePatterns = [
    /src=["']([^"']*\.(webp|jpg|jpeg|png|svg))["']/gi,
    /url\(["']?([^"')]*\.(webp|jpg|jpeg|png|svg))["']?\)/gi,
    /href=["']([^"']*\.(webp|jpg|jpeg|png|svg))["']/gi
  ];
  
  for (const pattern of imagePatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let refPath = match[1];
      if (refPath.startsWith('/')) {
        refPath = refPath.substring(1);
      }
      references.push(refPath);
    }
  }
  
  return references;
}

function getAllReferencedAssets() {
  const referencedAssets = new Set();
  
  // Scan all source files
  const sourceFiles = [
    ...scanFiles(path.join(ROOT, "pages"), [".js", ".tsx", ".ts"]),
    ...scanFiles(path.join(ROOT, "components"), [".js", ".tsx", ".ts"]),
    ...scanFiles(path.join(ROOT, "lib"), [".js", ".tsx", ".ts"]),
    ...scanFiles(path.join(ROOT, "styles"), [".css"])
  ];
  
  for (const file of sourceFiles) {
    try {
      const refs = getFileReferences(file);
      refs.forEach(ref => referencedAssets.add(ref));
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  // Scan data files for image references
  const dataFiles = scanFiles(path.join(ROOT, "data"), [".json"]);
  const venuesFile = path.join(ROOT, "public/venues.json");
  
  if (fs.existsSync(venuesFile)) {
    try {
      const venuesData = JSON.parse(fs.readFileSync(venuesFile, "utf8"));
      const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
      
      for (const venue of venues) {
        if (venue.image_hero_path) referencedAssets.add(venue.image_hero_path.replace(/^\/+/, ""));
        if (venue.image_card_path) referencedAssets.add(venue.image_card_path.replace(/^\/+/, ""));
        if (venue.images) {
          venue.images.forEach(img => {
            if (typeof img === 'string') {
              referencedAssets.add(img.replace(/^\/+/, ""));
            } else if (img.url) {
              referencedAssets.add(img.url.replace(/^\/+/, ""));
            }
          });
        }
      }
    } catch (error) {
      console.log("Error reading venues.json:", error.message);
    }
  }
  
  return referencedAssets;
}

function stageCleanup() {
  const report = {
    timestamp: new Date().toISOString(),
    candidates: [],
    staged: [],
    issues: [],
    summary: {}
  };

  console.log("🔍 Identifying unused assets...");
  
  // Get all referenced assets
  const referencedAssets = getAllReferencedAssets();
  console.log(`Found ${referencedAssets.size} referenced assets`);
  
  // Scan all assets in public directory
  const allAssets = scanFiles(path.join(ROOT, "public"), [".webp", ".jpg", ".jpeg", ".png", ".svg", ".json", ".css", ".js"]);
  
  const candidates = [];
  for (const asset of allAssets) {
    const relativePath = path.relative(path.join(ROOT, "public"), asset);
    
    // Skip certain files that should never be quarantined
    const skipPatterns = [
      "venues.json",
      "manifest.json",
      "robots.txt",
      "sitemap",
      "sw.js",
      "version.json"
    ];
    
    if (skipPatterns.some(pattern => relativePath.includes(pattern))) {
      continue;
    }
    
    // Check if asset is referenced
    if (!referencedAssets.has(relativePath)) {
      const stats = fs.statSync(asset);
      
      // Only quarantine files that are reasonably sized (not tiny config files)
      if (stats.size > 1024) { // >1KB
        candidates.push({
          path: relativePath,
          fullPath: asset,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024)
        });
      }
    }
  }
  
  report.candidates = candidates;
  
  // Stage candidates to quarantine (copy, don't move)
  console.log(`🔍 Staging ${candidates.length} candidates for quarantine...`);
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const quarantinePath = path.join(QUARANTINE_DIR, timestamp);
  
  let stagedCount = 0;
  for (const candidate of candidates) {
    try {
      const destPath = path.join(quarantinePath, candidate.path);
      const destDir = path.dirname(destPath);
      
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(candidate.fullPath, destPath);
      
      report.staged.push({
        originalPath: candidate.path,
        quarantinePath: path.relative(ROOT, destPath),
        sizeKB: candidate.sizeKB
      });
      
      stagedCount++;
    } catch (error) {
      report.issues.push(`Failed to stage ${candidate.path}: ${error.message}`);
    }
  }
  
  report.summary = {
    totalCandidates: candidates.length,
    stagedCount: stagedCount,
    issuesFound: report.issues.length,
    quarantinePath: path.relative(ROOT, quarantinePath)
  };
  
  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "cleanup_candidates.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Safe Cleanup Staging Report

**Timestamp:** ${report.timestamp}

## Summary
- **Total Candidates:** ${report.summary.totalCandidates}
- **Staged Count:** ${report.summary.stagedCount}
- **Issues Found:** ${report.summary.issuesFound}
- **Quarantine Path:** ${report.summary.quarantinePath}

## Staged Assets (${report.staged.length})
${report.staged.map(asset => 
  `- **${asset.originalPath}** (${asset.sizeKB}KB) → ${asset.quarantinePath}`
).join('\n')}

## All Candidates (${report.candidates.length})
${report.candidates.map(candidate => 
  `- **${candidate.path}** (${candidate.sizeKB}KB)`
).join('\n')}

## Issues
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}

## Note
All assets have been **copied** to quarantine, not moved. Original files remain intact.
Review the quarantined assets and manually delete originals if confirmed unused.
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "cleanup_summary.md"),
    markdown
  );
}

(async () => {
  try {
    const report = stageCleanup();
    saveReports(report);
    console.log("✅ Safe cleanup staging complete:", report.summary);
  } catch (error) {
    console.error("❌ Safe cleanup failed:", error);
    process.exit(1);
  }
})();
