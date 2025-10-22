#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🔍 VALIDATING VENUE DATA CONSISTENCY\n');

async function validateVenueData() {
  try {
    // Check if the single source exists
    const venueFile = path.join(process.cwd(), 'data/venues.json');
    await fs.access(venueFile);
    
    const data = JSON.parse(await fs.readFile(venueFile, 'utf8'));
    const venues = Array.isArray(data) ? data : data.venues || [];
    
    console.log(`✅ Single source exists: data/venues.json`);
    console.log(`✅ Contains ${venues.length} venues`);
    console.log(`✅ All venues have images: ${venues.filter(v => v.image_hero_path && v.image_card_path).length === venues.length}`);
    
    // Check for any other venue files that might cause confusion
    const problematicFiles = [
      'public/venues.json',
      'data/venues-wrapped.json',
      'public/venues-corrupted.json',
      'data/venues-before-pass2.json',
      'data/venues-before-recategorization.json'
    ];
    
    let foundProblems = false;
    for (const file of problematicFiles) {
      try {
        await fs.access(file);
        console.log(`⚠️  Found old venue file: ${file} (should be removed or moved to backups)`);
        foundProblems = true;
      } catch (error) {
        // File doesn't exist, which is good
      }
    }
    
    if (!foundProblems) {
      console.log('✅ No conflicting venue files found');
    }
    
    // Check if pages are using the correct source
    const pagesDir = path.join(process.cwd(), 'pages');
    const files = await fs.readdir(pagesDir, { recursive: true });
    const jsFiles = files.filter(f => f.endsWith('.js'));
    
    let incorrectReferences = 0;
    for (const file of jsFiles) {
      const filePath = path.join(pagesDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      if (content.includes('public/venues.json') || 
          content.includes('data/venues-wrapped.json') ||
          content.includes('public/venues-corrupted.json')) {
        console.log(`❌ ${file} references old venue file`);
        incorrectReferences++;
      }
    }
    
    if (incorrectReferences === 0) {
      console.log('✅ All pages reference the correct venue file');
    } else {
      console.log(`❌ ${incorrectReferences} files reference old venue files`);
    }
    
    console.log('\n🎯 VALIDATION COMPLETE');
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateVenueData();
