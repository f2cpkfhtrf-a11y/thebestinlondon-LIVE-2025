#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Reliable backup URLs that should work
const backupUrlMap = {
  // Cuisine missing images
  'italian': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=1600&h=900&fit=crop',
  'mexican': 'https://images.unsplash.com/photo-1565299585323-38174c4a87d8?w=1600&h=900&fit=crop',
  'chinese': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1600&h=900&fit=crop',
  'modern-european': 'https://images.unsplash.com/photo-1553521041-d168efeecd30?w=1600&h=900&fit=crop',
  'pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&h=900&fit=crop',
  'seafood': 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=1600&h=900&fit=crop',
  
  // Area missing images  
  'tower-hamlets': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1600&h=900&fit=crop',
  'camden': 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop',
  'newham': 'https://images.unsplash.com/photo-1542344539-7c37f92e1b2e?w=1600&h=900&fit=crop',
  'soho': 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop',
  'covent-garden': 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop',
  'holborn': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop',
  'spitalfields': 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop',
  'canary-wharf': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1600&h=900&fit=crop'
};

async function downloadImage(url, outputPath) {
  try {
    console.log(`📥 Fetching: ${path.basename(outputPath)}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    
    await sharp(Buffer.from(buffer))
      .resize(1600, 900, { fit: 'cover', position: 'center' })
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const stats = await fs.promises.stat(outputPath);
    console.log(`✅ Generated: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)}KB)`);
    return true;
  } catch (error) {
    console.error(`❌ Failed ${path.basename(outputPath)}:`, error.message);
    return false;
  }
}

async function checkAndGenerateMissingImages() {
  console.log('🔍 Checking for missing images...\n');
  
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'tiles');
  let generated = 0;
  let skipped = 0;
  
  for (const [slug, url] of Object.entries(backupUrlMap)) {
    // Determine if it's cuisine or area based on slug patterns
    let type = 'cuisines';
    const areaSlugs = ['tower-hamlets', 'camden', 'newham', 'soho', 'covent-garden', 'holborn', 'spitalfields', 'canary-wharf'];
    if (areaSlugs.includes(slug)) {
      type = 'areas';
    }
    
    const outputPath = path.join(baseDir, type, `${slug}.webp`);
    
    // Check if file exists and is substantial
    try {
      const stats = await fs.promises.stat(outputPath);
      if (stats.size > 50000) {
        console.log(`⏭️  Skipping ${slug}.webp (already exists: ${(stats.size / 1024).toFixed(1)}KB)`);
        skipped++;
        continue;
      } else {
        console.log(`🔄 Regenerating ${slug}.webp (too small: ${(stats.size / 1024).toFixed(1)}KB)`);
      }
    } catch (error) {
      console.log(`📝 Missing ${slug}.webp, generating...`);
    }
    
    const success = await downloadImage(url, outputPath);
    if (success) generated++;
  }
  
  console.log(`\n📊 Completion:`);
  console.log(`   ✅ Generated: ${generated} images`);
  console.log(`   ⏭️  Skipped: ${skipped} images`);
}

// Run the script
checkAndGenerateMissingImages().catch(console.error);
