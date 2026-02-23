/**
 * Fix canonical URL mismatch across all page files.
 * Replaces all instances of `https://thebestinlondon.co.uk` (no www)
 * with `https://www.thebestinlondon.co.uk` (with www).
 * 
 * This does NOT double-replace URLs that already have www because
 * we only match the exact non-www pattern.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const WRONG_URL = 'https://thebestinlondon.co.uk';
const CORRECT_URL = 'https://www.thebestinlondon.co.uk';

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function fixUrls() {
  const pagesDir = join(process.cwd(), 'pages');
  const files = await getAllFiles(pagesDir);
  
  let totalFixed = 0;
  const fixedFiles = [];

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf-8');
    
    // Only match non-www URLs (the regex ensures we don't match URLs already having www)
    // We use a negative lookahead to avoid matching `https://www.thebestinlondon.co.uk`
    const regex = /https:\/\/thebestinlondon\.co\.uk/g;
    const matches = content.match(regex);
    
    if (matches && matches.length > 0) {
      // Double-check: make sure we're not inside an already-correct www URL
      // The string `https://www.thebestinlondon.co.uk` contains `https://thebestinlondon.co.uk`
      // as a substring, so we need to be careful.
      // Strategy: first replace www version with a placeholder, then fix non-www, then restore.
      const placeholder = '___WWW_PLACEHOLDER___';
      const step1 = content.replace(/https:\/\/www\.thebestinlondon\.co\.uk/g, placeholder);
      const step2 = step1.replace(/https:\/\/thebestinlondon\.co\.uk/g, CORRECT_URL);
      const step3 = step2.replace(new RegExp(placeholder, 'g'), CORRECT_URL);
      
      if (step3 !== content) {
        await writeFile(filePath, step3, 'utf-8');
        const count = (step2.match(/https:\/\/www\.thebestinlondon\.co\.uk/g) || []).length - 
                      (step1.match(new RegExp(placeholder, 'g')) || []).length;
        // Simpler count: just count non-www occurrences that aren't part of www
        const nonWwwCount = (step1.match(/https:\/\/thebestinlondon\.co\.uk/g) || []).length;
        totalFixed += nonWwwCount;
        fixedFiles.push({ file: filePath.replace(process.cwd() + '/', ''), replacements: nonWwwCount });
      }
    }
  }

  console.log(`\n=== Canonical URL Fix Complete ===`);
  console.log(`Files updated: ${fixedFiles.length}`);
  console.log(`Total replacements: ${totalFixed}`);
  console.log(`\nFixed files:`);
  fixedFiles.forEach(f => console.log(`  ${f.file} (${f.replacements} replacements)`));
}

fixUrls().catch(console.error);
