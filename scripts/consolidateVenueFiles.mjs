#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🔄 UPDATING ALL VENUE FILE REFERENCES TO SINGLE SOURCE OF TRUTH\n');

// Define the old patterns and the new single source
const OLD_PATTERNS = [
  'public/venues.json',
  'data/venues-wrapped.json',
  'public/venues-corrupted.json',
  'data/venues-before-pass2.json',
  'data/venues-before-recategorization.json'
];

const NEW_SOURCE = 'data/venues.json';

// Find all files that reference venue data
const pagesDir = path.join(process.cwd(), 'pages');
const filesToUpdate = [];

async function findFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await findFiles(fullPath);
    } else if (entry.name.endsWith('.js')) {
      filesToUpdate.push(fullPath);
    }
  }
}

await findFiles(pagesDir);

console.log(`📁 Found ${filesToUpdate.length} files to check`);

let updatedFiles = 0;
let totalReplacements = 0;

for (const filePath of filesToUpdate) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let updatedContent = content;
    let fileReplacements = 0;

    // Replace all old venue file references with the new single source
    for (const oldPattern of OLD_PATTERNS) {
      const regex = new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = updatedContent.match(regex);
      
      if (matches) {
        updatedContent = updatedContent.replace(regex, NEW_SOURCE);
        fileReplacements += matches.length;
      }
    }

    // Only write if changes were made
    if (fileReplacements > 0) {
      await fs.writeFile(filePath, updatedContent);
      console.log(`✅ Updated ${path.relative(process.cwd(), filePath)} (${fileReplacements} replacements)`);
      updatedFiles++;
      totalReplacements += fileReplacements;
    }

  } catch (error) {
    console.log(`❌ Error updating ${path.relative(process.cwd(), filePath)}: ${error.message}`);
  }
}

console.log(`\n📊 SUMMARY:`);
console.log(`   Files updated: ${updatedFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);
console.log(`   New single source: ${NEW_SOURCE}`);

// Create a backup of old files and clean up
console.log(`\n🧹 CLEANING UP OLD VENUE FILES...`);

const backupDir = path.join(process.cwd(), 'backups', 'venue-files');
await fs.mkdir(backupDir, { recursive: true });

for (const oldFile of OLD_PATTERNS) {
  const oldPath = path.join(process.cwd(), oldFile);
  try {
    await fs.access(oldPath);
    const backupPath = path.join(backupDir, path.basename(oldFile));
    await fs.copyFile(oldPath, backupPath);
    console.log(`   📦 Backed up ${oldFile} to backups/venue-files/`);
  } catch (error) {
    // File doesn't exist, skip
  }
}

console.log(`\n✅ SINGLE SOURCE OF TRUTH ESTABLISHED!`);
console.log(`   All pages now use: data/venues.json`);
console.log(`   Old files backed up to: backups/venue-files/`);
console.log(`   This prevents future confusion and ensures consistency.`);