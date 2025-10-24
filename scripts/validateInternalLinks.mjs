#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Valid internal link patterns
const validLinkPatterns = [
  /\/areas\/[a-z0-9-]+/g,
  /\/restaurants\/[a-z0-9-]+/g,
  /\/cuisines\/[a-z0-9-]+/g,
  /\/blog\/[a-z0-9-]+/g,
  /\/best-halal-restaurants-london/g,
  /\/near-me/g,
  /\/search/g
];

// Common link fixes
const linkFixes = {
  '/restaurants-central-london': '/areas/central-london',
  '/restaurants-soho': '/areas/soho',
  '/restaurants-shoreditch': '/areas/shoreditch',
  '/indian-restaurants': '/cuisines/indian',
  '/italian-restaurants': '/cuisines/italian',
  '/halal-restaurants': '/best-halal-restaurants-london'
};

function validateAndFixLinks(content, filePath) {
  let fixedContent = content;
  let fixes = [];
  
  // Find all markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    
    // Check if it's an internal link
    if (linkUrl.startsWith('/') && !linkUrl.startsWith('http')) {
      // Check if link needs fixing
      if (linkFixes[linkUrl]) {
        const newUrl = linkFixes[linkUrl];
        fixedContent = fixedContent.replace(fullMatch, `[${linkText}](${newUrl})`);
        fixes.push({
          original: fullMatch,
          fixed: `[${linkText}](${newUrl})`,
          reason: 'Updated to correct URL structure'
        });
      }
      
      // Check if link text needs improvement
      if (linkText.toLowerCase().includes('click here') || 
          linkText.toLowerCase().includes('read more') ||
          linkText.toLowerCase().includes('here')) {
        const improvedText = generateBetterLinkText(linkUrl);
        if (improvedText !== linkText) {
          fixedContent = fixedContent.replace(fullMatch, `[${improvedText}](${linkUrl})`);
          fixes.push({
            original: fullMatch,
            fixed: `[${improvedText}](${linkUrl})`,
            reason: 'Improved link text for SEO'
          });
        }
      }
    }
  }
  
  return { content: fixedContent, fixes };
}

function generateBetterLinkText(url) {
  if (url.includes('/areas/')) {
    const area = url.split('/areas/')[1].replace(/-/g, ' ');
    return `best restaurants in ${area}`;
  }
  if (url.includes('/cuisines/')) {
    const cuisine = url.split('/cuisines/')[1].replace(/-/g, ' ');
    return `best ${cuisine} restaurants in London`;
  }
  if (url.includes('/restaurants/')) {
    return 'restaurant details';
  }
  if (url.includes('/blog/')) {
    return 'read our guide';
  }
  if (url.includes('halal')) {
    return 'best halal restaurants in London';
  }
  return 'learn more';
}

function processBlogFiles() {
  const directories = [
    'content/blog/',
    'content/blog-seo/',
    'content/blog-seo/v2/'
  ];
  
  let totalFiles = 0;
  let totalFixes = 0;
  const allFixes = [];
  
  directories.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      files.forEach(file => {
        if (file.endsWith('.md')) {
          totalFiles++;
          const filePath = path.join(fullPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          
          const { content: fixedContent, fixes } = validateAndFixLinks(content, filePath);
          
          if (fixes.length > 0) {
            fs.writeFileSync(filePath, fixedContent);
            totalFixes += fixes.length;
            allFixes.push({
              file: filePath,
              fixes: fixes
            });
            console.log(`✅ Fixed ${fixes.length} links in: ${file}`);
          }
        }
      });
    }
  });
  
  return { totalFiles, totalFixes, allFixes };
}

// Main execution
console.log('🔗 INTERNAL LINK VALIDATION & SEO FORMATTING');
console.log('============================================');

const results = processBlogFiles();

console.log(`\n📊 RESULTS:`);
console.log(`Files processed: ${results.totalFiles}`);
console.log(`Links fixed: ${results.totalFixes}`);
console.log(`Files modified: ${results.allFixes.length}`);

if (results.allFixes.length > 0) {
  console.log(`\n📝 DETAILED FIXES:`);
  results.allFixes.forEach(fileResult => {
    console.log(`\nFile: ${fileResult.file}`);
    fileResult.fixes.forEach(fix => {
      console.log(`  - ${fix.reason}`);
      console.log(`    ${fix.original} → ${fix.fixed}`);
    });
  });
}

console.log('\n✅ Internal link validation complete!');
