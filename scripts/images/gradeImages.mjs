import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get file size in KB
function getFileSizeKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024);
  } catch {
    return 0;
  }
}

// Helper function to check if image meets requirements
async function gradeImage(filePath, requirements) {
  if (!fs.existsSync(filePath)) {
    return {
      exists: false,
      sizeKB: 0,
      width: 0,
      height: 0,
      aspectRatio: 0,
      needs_upgrade: true,
      issues: ['File not found']
    };
  }
  
  try {
    const sizeKB = getFileSizeKB(filePath);
    const metadata = await sharp(filePath).metadata();
    
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    const aspectRatio = width && height ? width / height : 0;
    
    const issues = [];
    let needsUpgrade = false;
    
    // Check dimensions
    if (width < requirements.minWidth) {
      issues.push(`Width too small: ${width} < ${requirements.minWidth}`);
      needsUpgrade = true;
    }
    
    if (height < requirements.minHeight) {
      issues.push(`Height too small: ${height} < ${requirements.minHeight}`);
      needsUpgrade = true;
    }
    
    // Check file size
    if (sizeKB < requirements.minSizeKB) {
      issues.push(`File too small: ${sizeKB}KB < ${requirements.minSizeKB}KB`);
      needsUpgrade = true;
    }
    
    // Check aspect ratio
    const aspectDiff = Math.abs(aspectRatio - requirements.targetAspect);
    if (aspectDiff > requirements.aspectTolerance) {
      issues.push(`Aspect ratio off: ${aspectRatio.toFixed(2)} (target: ${requirements.targetAspect}±${requirements.aspectTolerance})`);
      needsUpgrade = true;
    }
    
    // Basic solid color detection (simple heuristic)
    const buffer = await sharp(filePath)
      .resize(50, 50)
      .raw()
      .toBuffer();
    
    const uniqueColors = new Set();
    for (let i = 0; i < buffer.length; i += 3) {
      const r = buffer[i];
      const g = buffer[i + 1];
      const b = buffer[i + 2];
      uniqueColors.add(`${r},${g},${b}`);
    }
    
    const colorPercent = (uniqueColors.size / 2500) * 100; // 50x50 pixels
    if (colorPercent < requirements.minColorVariety) {
      issues.push(`Likely solid color: only ${colorPercent.toFixed(1)}% color variety`);
      needsUpgrade = true;
    }
    
    return {
      exists: true,
      sizeKB,
      width,
      height,
      aspectRatio,
      colorVariety: colorPercent,
      needs_upgrade: needsUpgrade,
      issues: issues.length > 0 ? issues : ['Passes all requirements']
    };
    
  } catch (error) {
    return {
      exists: true,
      sizeKB: getFileSizeKB(filePath),
      width: 0,
      height: 0,
      aspectRatio: 0,
      needs_upgrade: true,
      issues: [`Error reading image: ${error.message}`]
    };
  }
}

async function gradeImages() {
  console.log('📊 Starting image quality grading...');
  
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  const publicPath = path.join(__dirname, '../../public');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  console.log(`📊 Grading images for ${venues.length} venues...`);
  
  const results = {
    generated_at: new Date().toISOString(),
    summary: {
      total_venues: venues.length,
      hero_passed: 0,
      hero_failed: 0,
      card_passed: 0,
      card_failed: 0,
      tile_passed: 0,
      tile_failed: 0
    },
    venues: [],
    tiles: {
      cuisines: {},
      areas: {},
      stations: {}
    },
    failing_heroes: [],
    failing_cards: [],
    failing_tiles: []
  };
  
  // Grade venue images
  for (const venue of venues) {
    const venueImages = {
      slug: venue.slug,
      name: venue.name,
      hero: null,
      card: null
    };
    
    // Grade hero image
    if (venue.image_hero_path) {
      const heroPath = path.join(publicPath, venue.image_hero_path.replace('/public', ''));
      const heroGrade = await gradeImage(heroPath, {
        minWidth: 1600,
        minHeight: 900,
        minSizeKB: 90,
        targetAspect: 16/9,
        aspectTolerance: 0.05,
        minColorVariety: 30
      });
      
      venueImages.hero = heroGrade;
      
      if (heroGrade.needs_upgrade) {
        results.failing_heroes.push({
          slug: venue.slug,
          name: venue.name,
          path: venue.image_hero_path,
          issues: heroGrade.issues
        });
        results.summary.hero_failed++;
      } else {
        results.summary.hero_passed++;
      }
    } else {
      results.failing_heroes.push({
        slug: venue.slug,
        name: venue.name,
        path: null,
        issues: ['No hero image path']
      });
      results.summary.hero_failed++;
    }
    
    // Grade card image
    if (venue.image_card_path) {
      const cardPath = path.join(publicPath, venue.image_card_path.replace('/public', ''));
      const cardGrade = await gradeImage(cardPath, {
        minWidth: 1200,
        minHeight: 750,
        minSizeKB: 65,
        targetAspect: 16/10,
        aspectTolerance: 0.05,
        minColorVariety: 30
      });
      
      venueImages.card = cardGrade;
      
      if (cardGrade.needs_upgrade) {
        results.failing_cards.push({
          slug: venue.slug,
          name: venue.name,
          path: venue.image_card_path,
          issues: cardGrade.issues
        });
        results.summary.card_failed++;
      } else {
        results.summary.card_passed++;
      }
    } else {
      results.failing_cards.push({
        slug: venue.slug,
        name: venue.name,
        path: null,
        issues: ['No card image path']
      });
      results.summary.card_failed++;
    }
    
    results.venues.push(venueImages);
  }
  
  // Grade tiles
  const tileCategories = [
    { dir: 'cuisines', type: 'cuisine' },
    { dir: 'areas', type: 'area' },
    { dir: 'stations', type: 'station' }
  ];
  
  for (const category of tileCategories) {
    const tileDir = path.join(publicPath, 'images', 'tiles', category.dir);
    
    if (fs.existsSync(tileDir)) {
      const files = fs.readdirSync(tileDir).filter(f => f.endsWith('.webp'));
      
      for (const file of files) {
        const filePath = path.join(tileDir, file);
        const tileGrade = await gradeImage(filePath, {
          minWidth: 800,
          minHeight: 600,
          minSizeKB: 50,
          targetAspect: 4/3,
          aspectTolerance: 0.1,
          minColorVariety: 20
        });
        
        const slug = file.replace('.webp', '');
        results.tiles[category.dir][slug] = tileGrade;
        
        if (tileGrade.needs_upgrade) {
          results.failing_tiles.push({
            type: category.type,
            slug,
            path: filePath.replace(publicPath, ''),
            issues: tileGrade.issues
          });
          results.summary.tile_failed++;
        } else {
          results.summary.tile_passed++;
        }
      }
    }
  }
  
  // Create reports directory
  const reportsDir = path.join(__dirname, '../../reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  
  // Write results
  const resultsPath = path.join(reportsDir, 'images_quality.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('📊 Image grading complete:');
  console.log(`   🖼️  Hero images: ${results.summary.hero_passed} passed, ${results.summary.hero_failed} failed`);
  console.log(`   🃏 Card images: ${results.summary.card_passed} passed, ${results.summary.card_failed} failed`);
  console.log(`   🎯 Tiles: ${results.summary.tile_passed} passed, ${results.summary.tile_failed} failed`);
  console.log(`   📄 Full report: ${resultsPath}`);
  
  // Calculate percentages
  const heroFailRate = results.summary.hero_failed / venues.length * 100;
  const cardFailRate = results.summary.card_failed / venues.length * 100;
  
  if (heroFailRate > 8) {
    console.log(`⚠️  Hero fail rate (${heroFailRate.toFixed(1)}%) exceeds 8% threshold`);
  }
  
  if (cardFailRate > 5) {
    console.log(`⚠️  Card fail rate (${cardFailRate.toFixed(1)}%) exceeds 5% threshold`);
  }
}

// Run the script
gradeImages().catch(console.error);
