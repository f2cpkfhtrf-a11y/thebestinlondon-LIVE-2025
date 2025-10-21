import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const IMAGES_DIR = path.join(ROOT, "public/images");

function scanImages(dir) {
  const images = [];
  if (!fs.existsSync(dir)) return images;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...scanImages(fullPath));
    } else if (entry.name.match(/\.(webp|jpg|jpeg|png|svg)$/i)) {
      images.push(fullPath);
    }
  }
  return images;
}

function getImageStats(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const buffer = fs.readFileSync(filePath);
    
    return {
      size: stats.size,
      isWebP: filePath.endsWith('.webp'),
      isValidSize: stats.size >= 51200, // ≥50KB
      isSolidColor: checkSolidColor(buffer),
      relativePath: path.relative(path.join(ROOT, "public"), filePath)
    };
  } catch (error) {
    return {
      size: 0,
      isWebP: false,
      isValidSize: false,
      isSolidColor: false,
      relativePath: path.relative(path.join(ROOT, "public"), filePath),
      error: error.message
    };
  }
}

function checkSolidColor(buffer) {
  // Simple heuristic: check if image has low variance (likely solid color)
  if (buffer.length < 100) return false;
  
  // For WebP, we'd need proper parsing, but for now use a simple check
  // This is a placeholder - in production you'd use sharp or similar
  return false;
}

function loadAreas() {
  const areasFile = path.join(ROOT, "data/areas.json");
  if (fs.existsSync(areasFile)) {
    const data = JSON.parse(fs.readFileSync(areasFile, "utf8"));
    return data.areas || [];
  }
  return [];
}

function loadBlogMapping() {
  const mappingFile = path.join(ROOT, "data/blog-images.json");
  if (fs.existsSync(mappingFile)) {
    return JSON.parse(fs.readFileSync(mappingFile, "utf8"));
  }
  return {};
}

function analyzeImages() {
  const report = {
    timestamp: new Date().toISOString(),
    images: {},
    tiles: {},
    blogTiles: {},
    issues: [],
    summary: {}
  };

  console.log("🔍 Scanning all images...");
  const allImages = scanImages(IMAGES_DIR);
  
  const imageStats = {
    total: allImages.length,
    webp: 0,
    validSize: 0,
    solidColor: 0,
    byFolder: {},
    totalSize: 0
  };

  const issues = [];
  const smallImages = [];
  const invalidWebP = [];

  for (const imagePath of allImages) {
    const stats = getImageStats(imagePath);
    
    if (stats.error) {
      issues.push(`Error reading ${stats.relativePath}: ${stats.error}`);
      continue;
    }

    imageStats.totalSize += stats.size;
    
    if (stats.isWebP) imageStats.webp++;
    if (stats.isValidSize) imageStats.validSize++;
    if (stats.isSolidColor) imageStats.solidColor++;

    const folder = stats.relativePath.split('/')[0];
    imageStats.byFolder[folder] = (imageStats.byFolder[folder] || 0) + 1;

    if (!stats.isValidSize && !stats.relativePath.includes('logo')) {
      smallImages.push(stats.relativePath);
    }

    if (stats.isWebP && !stats.isValidSize) {
      invalidWebP.push(stats.relativePath);
    }
  }

  report.images = imageStats;
  report.issues = issues;

  // Tile coverage analysis
  console.log("🔍 Checking tile coverage...");
  const areas = loadAreas();
  const expectedCuisines = ["british", "indian", "italian", "japanese", "thai", "turkish", "french", "chinese", "spanish", "korean", "mexican", "lebanese", "pakistani", "bangladeshi", "iranian", "afghan", "middle-eastern", "vegan", "vegetarian", "halal", "steakhouse", "seafood", "pizza", "burgers", "cafe", "bakery", "desserts", "mediterranean", "modern-european"];
  const expectedStations = ["liverpool-street", "kings-cross", "london-bridge", "victoria", "waterloo", "paddington", "euston", "bank", "canary-wharf", "oxford-circus"];

  const tileCoverage = {
    areas: { expected: areas.length, present: 0, missing: [] },
    cuisines: { expected: expectedCuisines.length, present: 0, missing: [] },
    stations: { expected: expectedStations.length, present: 0, missing: [] }
  };

  // Check area tiles
  for (const area of areas) {
    const tilePath = `/images/tiles/areas/${area.slug}.webp`;
    const fullPath = path.join(ROOT, "public", tilePath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).size >= 51200) {
      tileCoverage.areas.present++;
    } else {
      tileCoverage.areas.missing.push(area.slug);
    }
  }

  // Check cuisine tiles
  for (const cuisine of expectedCuisines) {
    const tilePath = `/images/tiles/cuisines/${cuisine}.webp`;
    const fullPath = path.join(ROOT, "public", tilePath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).size >= 51200) {
      tileCoverage.cuisines.present++;
    } else {
      tileCoverage.cuisines.missing.push(cuisine);
    }
  }

  // Check station tiles
  for (const station of expectedStations) {
    const tilePath = `/images/tiles/stations/${station}.webp`;
    const fullPath = path.join(ROOT, "public", tilePath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).size >= 51200) {
      tileCoverage.stations.present++;
    } else {
      tileCoverage.stations.missing.push(station);
    }
  }

  report.tiles = tileCoverage;

  // Blog tile uniqueness
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

  // Summary
  report.summary = {
    totalImages: imageStats.total,
    totalSizeMB: Math.round(imageStats.totalSize / 1024 / 1024),
    webpPercentage: Math.round((imageStats.webp / imageStats.total) * 100),
    validSizePercentage: Math.round((imageStats.validSize / imageStats.total) * 100),
    tileCoverage: {
      areas: Math.round((tileCoverage.areas.present / tileCoverage.areas.expected) * 100),
      cuisines: Math.round((tileCoverage.cuisines.present / tileCoverage.cuisines.expected) * 100),
      stations: Math.round((tileCoverage.stations.present / tileCoverage.stations.expected) * 100)
    },
    blogTileDuplicates: report.blogTiles.duplicates,
    issuesFound: issues.length + smallImages.length + invalidWebP.length
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_images.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Images Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Total Images:** ${report.summary.totalImages} (${report.summary.totalSizeMB}MB)
- **WebP Percentage:** ${report.summary.webpPercentage}%
- **Valid Size Percentage:** ${report.summary.validSizePercentage}%
- **Issues Found:** ${report.summary.issuesFound}

## Tile Coverage
- **Areas:** ${report.tiles.areas.present}/${report.tiles.areas.expected} (${report.summary.tileCoverage.areas}%)
- **Cuisines:** ${report.tiles.cuisines.present}/${report.tiles.cuisines.expected} (${report.summary.tileCoverage.cuisines}%)
- **Stations:** ${report.tiles.stations.present}/${report.tiles.stations.expected} (${report.summary.tileCoverage.stations}%)

## Blog Tiles
- **Total:** ${report.blogTiles.total}
- **Unique:** ${report.blogTiles.unique}
- **Duplicates:** ${report.blogTiles.duplicates}

## Missing Tiles
### Areas (${report.tiles.areas.missing.length})
${report.tiles.areas.missing.map(slug => `- ${slug}`).join('\n')}

### Cuisines (${report.tiles.cuisines.missing.length})
${report.tiles.cuisines.missing.map(slug => `- ${slug}`).join('\n')}

### Stations (${report.tiles.stations.missing.length})
${report.tiles.stations.missing.map(slug => `- ${slug}`).join('\n')}

## Image Breakdown by Folder
${Object.entries(report.images.byFolder).map(([folder, count]) => `- **${folder}:** ${count} files`).join('\n')}

## Issues
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_images.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeImages();
    saveReports(report);
    console.log("✅ Images audit complete:", report.summary);
  } catch (error) {
    console.error("❌ Images audit failed:", error);
    process.exit(1);
  }
})();
