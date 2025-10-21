import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, 'reports/audit_images_light.json');
const MARKDOWN_PATH = path.join(ROOT, 'reports/audit_images_light.md');

async function auditImagesLight() {
  console.log('🔍 Running light image audit...');
  
  const results = {
    timestamp: new Date().toISOString(),
    venues: {
      sampled: 0,
      withCardImages: 0,
      withHeroImages: 0,
      fallbackReasons: {}
    },
    tiles: {
      cuisine: 0,
      area: 0,
      station: 0
    },
    issues: []
  };

  try {
    // Sample 50 venues
    const venuesPath = path.join(ROOT, 'public/venues.json');
    if (fs.existsSync(venuesPath)) {
      const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
      const sampleSize = Math.min(50, venues.length);
      const sampledVenues = venues.slice(0, sampleSize);
      
      results.venues.sampled = sampleSize;
      
      for (const venue of sampledVenues) {
        // Check card image
        if (venue.image_card_path) {
          results.venues.withCardImages++;
        }
        
        // Check hero image
        if (venue.image_hero_path) {
          results.venues.withHeroImages++;
        }
        
        // Track fallback reasons (simplified)
        const slug = venue.slug;
        if (slug) {
          const cardPath = `/images/venues/${slug}/card.webp`;
          const heroPath = `/images/venues/${slug}/hero.webp`;
          
          if (fs.existsSync(path.join(ROOT, 'public', cardPath.replace(/^\//, '')))) {
            results.venues.fallbackReasons[slug] = 'venue-specific';
          } else if (venue.cuisines?.[0]) {
            const cuisine = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const cuisinePath = `/images/tiles/cuisines/${cuisine}.webp`;
            if (fs.existsSync(path.join(ROOT, 'public', cuisinePath.replace(/^\//, '')))) {
              results.venues.fallbackReasons[slug] = 'cuisine-tile';
            }
          }
        }
      }
    }

    // Check tile coverage
    const tilesDir = path.join(ROOT, 'public/images/tiles');
    if (fs.existsSync(tilesDir)) {
      const cuisineDir = path.join(tilesDir, 'cuisines');
      const areaDir = path.join(tilesDir, 'areas');
      const stationDir = path.join(tilesDir, 'stations');
      
      if (fs.existsSync(cuisineDir)) {
        results.tiles.cuisine = fs.readdirSync(cuisineDir).filter(f => f.endsWith('.webp')).length;
      }
      
      if (fs.existsSync(areaDir)) {
        results.tiles.area = fs.readdirSync(areaDir).filter(f => f.endsWith('.webp')).length;
      }
      
      if (fs.existsSync(stationDir)) {
        results.tiles.station = fs.readdirSync(stationDir).filter(f => f.endsWith('.webp')).length;
      }
    }

    // Check for common issues
    if (results.venues.withCardImages < results.venues.sampled * 0.5) {
      results.issues.push('Low card image coverage');
    }
    
    if (results.venues.withHeroImages < results.venues.sampled * 0.5) {
      results.issues.push('Low hero image coverage');
    }

    // Write reports
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
    
    const markdown = `# Light Image Audit Report

**Timestamp:** ${results.timestamp}

## Summary
- **Venues Sampled:** ${results.venues.sampled}
- **With Card Images:** ${results.venues.withCardImages} (${Math.round(results.venues.withCardImages/results.venues.sampled*100)}%)
- **With Hero Images:** ${results.venues.withHeroImages} (${Math.round(results.venues.withHeroImages/results.venues.sampled*100)}%)

## Tile Coverage
- **Cuisine Tiles:** ${results.tiles.cuisine}
- **Area Tiles:** ${results.tiles.area}
- **Station Tiles:** ${results.tiles.station}

## Issues Found
${results.issues.length > 0 ? results.issues.map(issue => `- ${issue}`).join('\n') : '- None'}

## Fallback Reasons (Sample)
${Object.entries(results.venues.fallbackReasons).slice(0, 10).map(([slug, reason]) => `- ${slug}: ${reason}`).join('\n')}
`;

    fs.writeFileSync(MARKDOWN_PATH, markdown);
    
    console.log(`✅ Light image audit complete`);
    console.log(`📊 Sampled ${results.venues.sampled} venues`);
    console.log(`🖼️ Card coverage: ${Math.round(results.venues.withCardImages/results.venues.sampled*100)}%`);
    console.log(`🖼️ Hero coverage: ${Math.round(results.venues.withHeroImages/results.venues.sampled*100)}%`);
    console.log(`📁 Issues: ${results.issues.length}`);
    
  } catch (error) {
    console.error(`❌ Light image audit failed: ${error.message}`);
    results.error = error.message;
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
    process.exit(1);
  }
}

auditImagesLight();