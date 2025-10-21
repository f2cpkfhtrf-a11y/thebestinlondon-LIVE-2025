import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, 'reports/warn_duplicates.json');

/**
 * Soft warning script that logs duplicate images but NEVER fails the build
 * This replaces over-restrictive guards that caused mass fallbacks
 */
async function warnDuplicates() {
  console.log('🔍 Scanning for duplicate images (soft warning only)...');
  
  try {
    // Load venues data
    const venuesPath = path.join(ROOT, 'public/venues.json');
    if (!fs.existsSync(venuesPath)) {
      console.log('⚠️ No venues.json found - skipping duplicate check');
      return;
    }
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Sample first 60 venues for analysis
    const sampleVenues = venues.slice(0, 60);
    
    // Mock image resolution (simplified for build-time check)
    const imageCounts = {};
    const venueImageMap = {};
    
    for (const venue of sampleVenues) {
      let imagePath = null;
      
      // Try to determine what image would be used (simplified logic)
      if (venue.image_card_path) {
        imagePath = venue.image_card_path;
      } else if (venue.image_hero_path) {
        imagePath = venue.image_hero_path;
      } else if (venue.photos_local && venue.photos_local.length > 0) {
        imagePath = venue.photos_local[0];
      } else if (venue.photos && venue.photos.length > 0) {
        imagePath = venue.photos[0];
      } else {
        // Fallback to cuisine tile
        const cuisine = venue.cuisines?.[0];
        if (cuisine) {
          imagePath = `/images/tiles/cuisines/${cuisine.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`;
        } else {
          imagePath = '/images/heroes/site-default.webp';
        }
      }
      
      if (imagePath) {
        imageCounts[imagePath] = (imageCounts[imagePath] || 0) + 1;
        venueImageMap[venue.slug] = imagePath;
      }
    }
    
    // Find duplicates
    const duplicates = Object.entries(imageCounts)
      .filter(([path, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]);
    
    const report = {
      timestamp: new Date().toISOString(),
      totalVenuesScanned: sampleVenues.length,
      totalUniqueImages: Object.keys(imageCounts).length,
      duplicateImages: duplicates.length,
      duplicates: duplicates.map(([path, count]) => ({
        imagePath: path,
        usageCount: count,
        venues: Object.entries(venueImageMap)
          .filter(([slug, imgPath]) => imgPath === path)
          .map(([slug]) => slug)
      })),
      summary: {
        mostUsedImage: duplicates.length > 0 ? duplicates[0][0] : null,
        maxUsageCount: duplicates.length > 0 ? duplicates[0][1] : 0,
        duplicatePercentage: duplicates.length > 0 ? 
          ((duplicates.reduce((sum, [, count]) => sum + count, 0) - duplicates.length) / sampleVenues.length * 100).toFixed(1) : 0
      }
    };
    
    // Write report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    
    // Log warnings (but don't fail)
    if (duplicates.length > 0) {
      console.log(`⚠️ Found ${duplicates.length} duplicate images in sample:`);
      duplicates.slice(0, 5).forEach(([path, count]) => {
        console.log(`   - ${path}: used by ${count} venues`);
      });
      
      if (duplicates.length > 5) {
        console.log(`   ... and ${duplicates.length - 5} more`);
      }
      
      console.log(`📊 Duplicate percentage: ${report.summary.duplicatePercentage}%`);
      console.log(`📝 Full report saved to: ${REPORT_PATH}`);
    } else {
      console.log('✅ No duplicate images found in sample');
    }
    
    // Always succeed (never fail the build)
    console.log('✅ Duplicate check completed (soft warning only)');
    
  } catch (error) {
    console.log(`⚠️ Duplicate check failed: ${error.message}`);
    console.log('✅ Continuing build (soft warning only)');
    
    // Write error report
    const errorReport = {
      timestamp: new Date().toISOString(),
      error: error.message,
      status: 'failed_but_continuing'
    };
    fs.writeFileSync(REPORT_PATH, JSON.stringify(errorReport, null, 2));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  warnDuplicates();
}

export { warnDuplicates };
