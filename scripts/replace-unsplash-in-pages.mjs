#!/usr/bin/env node
/**
 * Replace Unsplash URLs in page files with local image paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Local image fallbacks based on context
const FALLBACK_IMAGES = {
  default: '/images/heroes/site/default-list-hero.webp',
  card: '/images/heroes/site/default-card.webp',
  blog: '/images/heroes/site/default-blog-hero.webp',
  area: '/images/heroes/site/default-list-hero.webp',
  cuisine: '/images/heroes/site/default-list-hero.webp'
};

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function replaceUnsplashUrls() {
  console.log('🔧 Replacing Unsplash URLs in page files...\n');
  
  // Find all page files with Unsplash
  const pagesDir = path.join(ROOT, 'pages');
  const allPageFiles = findPageFiles(pagesDir);
  const pageFiles = allPageFiles.filter(file => {
    const content = fs.readFileSync(file, 'utf8');
    return content.includes('unsplash.com') || content.includes('images.unsplash');
  });
  
  console.log(`Found ${pageFiles.length} files with Unsplash URLs\n`);
  
  let totalReplaced = 0;
  let filesModified = 0;
  
  for (const filePath of pageFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let count = 0;
    
    // Pattern 1: Full Unsplash URLs
    const unsplashUrlPattern = /https?:\/\/images\.unsplash\.com\/photo-[^\s'"]+/g;
    const matches = content.match(unsplashUrlPattern);
    
    if (matches) {
      matches.forEach(url => {
        // Determine context and replace
        let replacement = FALLBACK_IMAGES.default;
        
        const fileName = path.basename(filePath);
        if (fileName.includes('restaurants-') || fileName.includes('area')) {
          // Extract area/cuisine from filename
          const areaMatch = fileName.match(/restaurants-([^.]+)/);
          if (areaMatch) {
            const areaSlug = areaMatch[1];
            replacement = `/images/heroes/areas/${areaSlug}.webp`;
          } else {
            replacement = FALLBACK_IMAGES.area;
          }
        } else if (fileName.includes('blog')) {
          replacement = FALLBACK_IMAGES.blog;
        } else if (fileName.includes('cafe') || fileName.includes('bar')) {
          replacement = FALLBACK_IMAGES.default;
        }
        
        // Replace in context - check if it's a background image, src, or other
        if (url.includes('w=2400') || url.includes('h=1200')) {
          // Hero/background image
          replacement = FALLBACK_IMAGES.default;
        } else if (url.includes('w=800') || url.includes('w=1600')) {
          // Card/thumbnail image
          replacement = FALLBACK_IMAGES.card;
        }
        
        content = content.replace(url, replacement);
        count++;
        modified = true;
      });
    }
    
    // Pattern 2: Template literal with Unsplash ID arrays (e.g., photo-${id}?w=800)
    const templatePattern = /`https:\/\/images\.unsplash\.com\/photo-\$\{[^}]+\}[^`]+`/g;
    content = content.replace(templatePattern, () => {
      modified = true;
      count++;
      return `'${FALLBACK_IMAGES.card}'`;
    });
    
    // Pattern 3: Unsplash ID arrays and functions returning Unsplash URLs
    const unsplashIdPattern = /const\s+unsplashIds\s*=\s*\[[^\]]+\]/g;
    if (unsplashIdPattern.test(content)) {
      // Replace functions that build Unsplash URLs from array
      const functionPattern = /return\s+`https:\/\/images\.unsplash\.com\/photo-\$\{[^\}]+\}[^`]+`/g;
      const oldContent = content;
      content = content.replace(functionPattern, () => {
        modified = true;
        count++;
        return `return '${FALLBACK_IMAGES.card}'`;
      });
      
      // Also remove unsplashIds array if function was replaced
      if (content !== oldContent) {
        content = content.replace(/const\s+unsplashIds\s*=\s*\[[^\]]+\];?\s*/g, '');
      }
    }
    
    // Pattern 4: Background image style with Unsplash
    const bgPattern = /background.*url\(['"]?https?:\/\/images\.unsplash\.com\/[^'")]+['"]?\)/gi;
    content = content.replace(bgPattern, (match) => {
      modified = true;
      count++;
      // Extract if it's a hero or card based on size
      if (match.includes('w=2400')) {
        return match.replace(/https?:\/\/images\.unsplash\.com\/[^'")]+/, FALLBACK_IMAGES.default);
      }
      return match.replace(/https?:\/\/images\.unsplash\.com\/[^'")]+/, FALLBACK_IMAGES.card);
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      const relativePath = path.relative(ROOT, filePath);
      console.log(`✅ ${relativePath}: Replaced ${count} Unsplash URL(s)`);
      filesModified++;
      totalReplaced += count;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Files modified: ${filesModified}`);
  console.log(`   Total URLs replaced: ${totalReplaced}`);
  console.log(`\n✅ Complete!`);
}

replaceUnsplashUrls().catch(console.error);

