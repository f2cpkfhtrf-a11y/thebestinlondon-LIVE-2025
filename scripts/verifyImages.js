const fs = require('fs');
const path = require('path');

const MIN_SIZE_KB = 50;
const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 900;

// Directories to scan
const SCAN_DIRS = [
  'public/images/tiles/cuisines',
  'public/images/tiles/areas', 
  'public/images/tiles/stations',
  'public/images/heroes/site',
  'public/images/heroes/pages',
  'public/images/heroes/cuisines',
  'public/images/heroes/areas'
];

const MISSING_IMAGES = [];
const LOW_QUALITY_IMAGES = [];
const VERIFIED_IMAGES = [];

function scanDirectory(dirPath) {
  console.log(`📁 Scanning: ${dirPath}`);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return;
  }

  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith('.webp')) {
        const sizeKB = Math.round(stat.size / 1024);
        
        if (sizeKB < MIN_SIZE_KB) {
          LOW_QUALITY_IMAGES.push({
            path: fullPath,
            sizeKB,
            relativePath: path.relative(process.cwd(), fullPath)
          });
          console.log(`❌ Low quality: ${file} (${sizeKB}KB)`);
        } else {
          VERIFIED_IMAGES.push({
            path: fullPath,
            sizeKB,
            relativePath: path.relative(process.cwd(), fullPath)
          });
          console.log(`✅ Verified: ${file} (${sizeKB}KB)`);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dirPath}:`, error.message);
  }
}

// Check expected images from resolver maps
function checkExpectedImages() {
  console.log('\n🔍 Checking expected images from resolver maps...');
  
  // Cuisine tiles (from CUISINE_TILE_MAP)
  const expectedCuisines = [
    'british', 'mediterranean', 'modern-european', 'indian', 'turkish', 
    'japanese', 'italian', 'french', 'thai', 'mexican', 'korean', 
    'spanish', 'chinese', 'caribbean'
  ];
  
  // Area tiles (from AREA_TILE_MAP)  
  const expectedAreas = [
    'central-london', 'tower-hamlets', 'redbridge', 'havering', 'newham',
    'camden', 'hackney', 'southwark', 'westminster', 'kensington-and-chelsea'
  ];
  
  // Station tiles (from STATION_TILE_MAP)
  const expectedStations = [
    'liverpool-street', 'waterloo', 'kings-cross', 'london-bridge'
  ];
  
  const checkImage = (basePath, type, slug) => {
    const imagePath = `${basePath}/${slug}.webp`;
    if (!fs.existsSync(path.join(process.cwd(), imagePath))) {
      MISSING_IMAGES.push({
        expectedPath: imagePath,
        type,
        slug
      });
      console.log(`❌ Missing: ${imagePath}`);
    }
  };
  
  expectedCuisines.forEach(slug => {
    checkImage('public/images/tiles/cuisines', 'cuisine', slug);
  });
  
  expectedAreas.forEach(slug => {
    checkImage('public/images/tiles/areas', 'area', slug);
  });
  
  expectedStations.forEach(slug => {
    checkImage('public/images/tiles/stations', 'station', slug);
  });
  
  // Check hero pages
  const heroPages = [
    'areas-hero', 'cuisines-hero', 'halal-hero', 'restaurants-hero'
  ];
  
  heroPages.forEach(hero => {
    checkImage('public/images/heroes/pages', 'hero-page', hero);
  });
}

function main() {
  console.log('🖼️  Starting comprehensive image verification...\n');
  
  // Scan all directories
  SCAN_DIRS.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    scanDirectory(fullPath);
  });
  
  // Check expected images from resolver maps
  checkExpectedImages();
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    verified: VERIFIED_IMAGES.length,
    lowQuality: LOW_QUALITY_IMAGES.length, 
    missing: MISSING_IMAGES.length,
    verifiedImages: VERIFIED_IMAGES,
    lowQualityImages: LOW_QUALITY_IMAGES,
    missingImages: MISSING_IMAGES
  };
  
  // Write report
  fs.mkdirSync(path.join(process.cwd(), 'reports'), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), 'reports/image_verification.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Summary
  console.log('\n📊 VERIFICATION SUMMARY');
  console.log('======================');
  console.log(`✅ Verified images: ${VERIFIED_IMAGES.length}`);
  console.log(`⚠️  Low quality images: ${LOW_QUALITY_IMAGES.length}`);
  console.log(`❌ Missing images: ${MISSING_IMAGES.length}`);
  
  if (LOW_QUALITY_IMAGES.length > 0) {
    console.log('\n⚠️  LOW QUALITY IMAGES:');
    LOW_QUALITY_IMAGES.forEach(img => {
      console.log(`   ${img.relativePath} (${img.sizeKB}KB)`);
    });
  }
  
  if (MISSING_IMAGES.length > 0) {
    console.log('\n❌ MISSING IMAGES:');
    MISSING_IMAGES.forEach(img => {
      console.log(`   ${img.expectedPath}`);
    });
  }
  
  console.log(`\n📄 Report saved: reports/image_verification.json`);
  
  // Exit with appropriate code
  if (LOW_QUALITY_IMAGES.length > 0 || MISSING_IMAGES.length > 0) {
    console.log('\n❌ Verification failed - issues found');
    process.exit(1);
  } else {
    console.log('\n✅ All images verified successfully!');
    process.exit(0);
  }
}

main();
