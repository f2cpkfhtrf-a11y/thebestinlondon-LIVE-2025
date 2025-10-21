#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '..', 'pages');

// Files to remove (old/duplicate pages)
const filesToRemove = [
  'best-halal-restaurants-london-old.js',
  'indian-restaurants-london-old.js', 
  'restaurants-old.js',
  'restaurants-new.js',
  'seo-demo.js',
  'test-data.js'
];

console.log('🗑️ Removing duplicate/old pages...\n');

filesToRemove.forEach(fileName => {
  const filePath = path.join(pagesDir, fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed: ${fileName}`);
    } catch (error) {
      console.error(`✗ Error removing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\n✅ Duplicate page cleanup complete!');
