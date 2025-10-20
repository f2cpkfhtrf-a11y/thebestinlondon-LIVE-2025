#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyExternalFreeze() {
  console.log('🧊 Verifying external content is properly frozen...');
  
  const imagesDir = path.join(__dirname, '../public/images');
  const creditsFile = path.join(imagesDir, '_credits.json');
  
  if (!fs.existsSync(creditsFile)) {
    console.log('✅ No external images found');
    return;
  }
  
  const credits = JSON.parse(fs.readFileSync(creditsFile, 'utf8'));
  let verified = 0;
  let errors = [];
  
  for (const [imagePath, credit] of Object.entries(credits)) {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing external image: ${imagePath}`);
      continue;
    }
    
    const stats = fs.statSync(fullPath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB < 50) {
      errors.push(`External image too small: ${imagePath} (${sizeKB.toFixed(1)}KB)`);
    }
    
    if (!imagePath.endsWith('.webp')) {
      errors.push(`External image not WebP: ${imagePath}`);
    }
    
    verified++;
  }
  
  console.log(`✅ Verified ${verified} external images`);
  
  if (errors.length > 0) {
    console.log('\n❌ External freeze verification errors:');
    errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All external content properly frozen!');
    process.exit(0);
  }
}

verifyExternalFreeze();
