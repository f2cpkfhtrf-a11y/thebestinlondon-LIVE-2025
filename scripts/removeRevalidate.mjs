#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all JS files in pages directory
function findJSFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findJSFiles(fullPath));
    } else if (item.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Remove revalidate from a file
function removeRevalidate(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove revalidate: number lines
    content = content.replace(/,\s*revalidate:\s*\d+/g, '');
    
    // Remove standalone revalidate lines
    content = content.replace(/^\s*revalidate:\s*\d+,?\s*$/gm, '');
    
    // Clean up trailing commas
    content = content.replace(/,\s*}/g, '}');
    content = content.replace(/,\s*]/g, ']');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Removed revalidate from ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Main execution
const pagesDir = path.join(__dirname, '..', 'pages');
const jsFiles = findJSFiles(pagesDir);

console.log(`Found ${jsFiles.length} JS files in pages directory`);

let processedCount = 0;
for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('revalidate')) {
    removeRevalidate(file);
    processedCount++;
  }
}

console.log(`\n📊 Processed ${processedCount} files with revalidate settings`);
console.log('✅ All revalidate settings removed for static export');
