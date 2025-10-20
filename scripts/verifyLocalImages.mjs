#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyLocalImages() {
  console.log('🖼️  Verifying local images...');
  
  const imagesDir = path.join(__dirname, '../public/images');
  const report = {
    timestamp: new Date().toISOString(),
    tiles: { total: 0, valid: 0, invalid: 0 },
    heroes: { total: 0, valid: 0, invalid: 0 },
    restaurants: { total: 0, valid: 0, invalid: 0 },
    errors: []
  };
  
  // Verify tiles
  const tileDirs = ['tiles/cuisines', 'tiles/areas', 'tiles/stations'];
  for (const dir of tileDirs) {
    const fullPath = path.join(imagesDir, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.webp'));
      report.tiles.total += files.length;
      
      for (const file of files) {
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);
        const sizeKB = stats.size / 1024;
        
        if (sizeKB >= 50) {
          report.tiles.valid++;
        } else {
          report.tiles.invalid++;
          report.errors.push(`Tile too small: ${path.relative(process.cwd(), filePath)} (${sizeKB.toFixed(1)}KB)`);
        }
      }
    }
  }
  
  // Verify heroes
  const heroesDir = path.join(imagesDir, 'heroes');
  if (fs.existsSync(heroesDir)) {
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.isDirectory()) {
          scanDir(path.join(dir, item.name));
        } else if (item.name.endsWith('.webp')) {
          report.heroes.total++;
          const filePath = path.join(dir, item.name);
          const stats = fs.statSync(filePath);
          const sizeKB = stats.size / 1024;
          
          if (sizeKB >= 50) {
            report.heroes.valid++;
          } else {
            report.heroes.invalid++;
            report.errors.push(`Hero too small: ${path.relative(process.cwd(), filePath)} (${sizeKB.toFixed(1)}KB)`);
          }
        }
      }
    };
    scanDir(heroesDir);
  }
  
  // Verify restaurant images (sample)
  const restaurantsDir = path.join(imagesDir, 'restaurants');
  if (fs.existsSync(restaurantsDir)) {
    const sampleDirs = fs.readdirSync(restaurantsDir).slice(0, 50); // Sample first 50
    for (const dir of sampleDirs) {
      const dirPath = path.join(restaurantsDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.webp'));
        report.restaurants.total += files.length;
        
        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stats = fs.statSync(filePath);
          const sizeKB = stats.size / 1024;
          
          if (sizeKB >= 50) {
            report.restaurants.valid++;
          } else {
            report.restaurants.invalid++;
            report.errors.push(`Restaurant image too small: ${path.relative(process.cwd(), filePath)} (${sizeKB.toFixed(1)}KB)`);
          }
        }
      }
    }
  }
  
  // Save report
  const reportPath = path.join(__dirname, '../reports/live_image_triplecheck.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('📊 Image verification results:');
  console.log(`  Tiles: ${report.tiles.valid}/${report.tiles.total} valid`);
  console.log(`  Heroes: ${report.heroes.valid}/${report.heroes.total} valid`);
  console.log(`  Restaurants: ${report.restaurants.valid}/${report.restaurants.total} valid`);
  
  if (report.errors.length > 0) {
    console.log('\n❌ Image verification errors:');
    report.errors.slice(0, 10).forEach(error => console.log(`  - ${error}`));
    if (report.errors.length > 10) {
      console.log(`  ... and ${report.errors.length - 10} more`);
    }
    console.log(`\n📄 Full report saved: ${reportPath}`);
    process.exit(1);
  } else {
    console.log('\n✅ All images verified successfully!');
    process.exit(0);
  }
}

verifyLocalImages();
