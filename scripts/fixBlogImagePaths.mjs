#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fix blog image paths
function fixBlogImagePaths() {
  const blogDir = path.join(__dirname, '../content/blog');
  
  if (!fs.existsSync(blogDir)) {
    console.log('❌ Blog directory not found');
    return;
  }
  
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
  
  console.log(`🔧 FIXING BLOG IMAGE PATHS`);
  console.log(`=========================`);
  console.log(`Found ${files.length} JSON blog files to fix`);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    let needsUpdate = false;
    
    // Fix coverImage path
    if (data.coverImage && data.coverImage.startsWith('/images/blog/')) {
      const slug = data.slug || file.replace('.json', '');
      data.coverImage = `/hero_v2/${slug}.webp`;
      needsUpdate = true;
      console.log(`✅ Fixed coverImage for ${file}: ${data.coverImage}`);
    }
    
    // Fix hero path
    if (data.hero && data.hero.startsWith('/images/blog/')) {
      const slug = data.slug || file.replace('.json', '');
      data.hero = `/hero_v2/${slug}.webp`;
      needsUpdate = true;
      console.log(`✅ Fixed hero for ${file}: ${data.hero}`);
    }
    
    if (needsUpdate) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      fixedCount++;
    }
  });
  
  console.log(`\n📋 BLOG IMAGE PATH FIX COMPLETE`);
  console.log(`===============================`);
  console.log(`✅ Fixed ${fixedCount} blog files`);
  console.log('✅ All image paths now point to /hero_v2/ directory');
}

fixBlogImagePaths();
