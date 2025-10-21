import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const VENUES_FILE = path.join(ROOT, 'public', 'venues.json');
const REPORT_FILE = path.join(ROOT, 'reports', 'image_verification.json');

// Image verification with non-blocking approach
function verifyImages() {
  console.log('🔍 Verifying image health (non-blocking)...');
  
  const venues = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf8'));
  const LOW_QUALITY_IMAGES = [];
  const MISSING_IMAGES = [];
  
  for (const venue of venues) {
    const slug = venue.slug || venue.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    
    // Check if venue has any image path
    const hasImage = venue.image_card_path || venue.image_hero_path;
    if (!hasImage) {
      MISSING_IMAGES.push({
        slug,
        name: venue.name,
        reason: 'No image paths set'
      });
      continue;
    }
    
    // Check image file existence and size
    const imagePath = venue.image_card_path || venue.image_hero_path;
    if (imagePath) {
      const fullPath = path.join(ROOT, 'public', imagePath.replace(/^\//, ''));
      try {
        const stats = fs.statSync(fullPath);
        if (stats.size < 50 * 1024) { // Less than 50KB
          LOW_QUALITY_IMAGES.push({
            slug,
            name: venue.name,
            path: imagePath,
            size: stats.size,
            reason: 'Image too small (<50KB)'
          });
        }
      } catch (error) {
        MISSING_IMAGES.push({
          slug,
          name: venue.name,
          path: imagePath,
          reason: 'File not found'
        });
      }
    }
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    totalVenues: venues.length,
    lowQualityImages: LOW_QUALITY_IMAGES,
    missingImages: MISSING_IMAGES,
    summary: {
      totalIssues: LOW_QUALITY_IMAGES.length + MISSING_IMAGES.length,
      lowQualityCount: LOW_QUALITY_IMAGES.length,
      missingCount: MISSING_IMAGES.length
    }
  };
  
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log(`📊 Image verification complete:`);
  console.log(`   Total venues: ${venues.length}`);
  console.log(`   Low quality images: ${LOW_QUALITY_IMAGES.length}`);
  console.log(`   Missing images: ${MISSING_IMAGES.length}`);
  
  // Do NOT fail builds; we warn and proceed. Hybrid strategy will heal gaps.
  if (LOW_QUALITY_IMAGES.length > 0 || MISSING_IMAGES.length > 0) {
    console.log('\n⚠️  Verification found issues (non-blocking). See reports/image_verification.json');
    process.exit(0);
  } else {
    console.log('\n✅ All images verified successfully!');
    process.exit(0);
  }
}

verifyImages();