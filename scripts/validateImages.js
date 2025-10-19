#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

// Load environment variables
require('dotenv').config();

const MIN_FILE_KB = parseInt(process.env.PIPELINE_MIN_FILE_KB || '50');

async function validateImages() {
  console.log('🔍 IMAGE VALIDATION REPORT');
  console.log('==========================');
  
  const imagesDir = path.join(process.cwd(), 'public/images/restaurants');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('❌ Images directory does not exist');
    return { total: 0, valid: 0, invalid: 0 };
  }
  
  // Get all WebP files
  const command = `find "${imagesDir}" -type f -name '*.webp'`;
  let allImages = [];
  try {
    const output = execSync(command, { encoding: 'utf8' });
    allImages = output.trim().split('\n').filter(p => p);
  } catch (error) {
    console.log('No WebP images found');
    return { total: 0, valid: 0, invalid: 0 };
  }
  
  console.log(`📁 Scanning ${allImages.length} WebP files...`);
  
  let validCount = 0;
  let invalidCount = 0;
  const invalidFiles = [];
  
  for (const imagePath of allImages) {
    try {
      // Check file size first
      const stats = fs.statSync(imagePath);
      const sizeKB = stats.size / 1024;
      
      if (sizeKB < MIN_FILE_KB) {
        invalidCount++;
        invalidFiles.push({ path: imagePath, reason: `Size too small: ${sizeKB.toFixed(1)}KB` });
        continue;
      }
      
      // Try to decode with Sharp
      await sharp(imagePath).metadata();
      validCount++;
      
    } catch (error) {
      invalidCount++;
      invalidFiles.push({ path: imagePath, reason: `Decode failed: ${error.message.slice(0, 50)}` });
    }
  }
  
  // Summary
  console.log(`✅ Valid images: ${validCount}`);
  console.log(`❌ Invalid images: ${invalidCount}`);
  console.log(`📊 Total images: ${allImages.length}`);
  
  if (invalidFiles.length > 0) {
    console.log('\n❌ Invalid files:');
    invalidFiles.slice(0, 10).forEach(file => {
      console.log(`  ${path.basename(file.path)} - ${file.reason}`);
    });
    if (invalidFiles.length > 10) {
      console.log(`  ... and ${invalidFiles.length - 10} more`);
    }
  }
  
  return { total: allImages.length, valid: validCount, invalid: invalidCount };
}

if (require.main === module) {
  validateImages().catch(console.error);
}

module.exports = { validateImages };