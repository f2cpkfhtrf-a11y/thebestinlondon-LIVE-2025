#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Blog posts and their correct hero image paths
const blogPosts = [
  'halal-restaurants-ilford-lane',
  'late-night-restaurants-london', 
  'romantic-restaurants-london',
  'best-restaurants-near-covent-garden',
  'soho-late-night-restaurants-london'
];

// Create proper placeholder hero images
const createHeroImage = async (slug) => {
  const imagePath = path.join(projectRoot, 'public', 'hero_v2', `${slug}.webp`);
  
  // Create a simple SVG placeholder that represents a cinematic hero
  const svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#grad1)"/>
    <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">${slug.replace(/-/g, ' ').toUpperCase()}</text>
    <text x="960" y="600" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Cinematic Hero Image</text>
  </svg>`;
  
  try {
    fs.writeFileSync(imagePath, svgContent);
    console.log(`✅ Created hero image: ${slug}.webp`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating ${slug}.webp:`, error.message);
    return false;
  }
};

// Fix blog frontmatter hero paths
const fixBlogFrontmatter = async (slug) => {
  const blogPath = path.join(projectRoot, 'content', 'blog-seo', 'v2', `${slug}.md`);
  
  if (!fs.existsSync(blogPath)) {
    console.log(`⚠️  Blog file not found: ${blogPath}`);
    return false;
  }
  
  try {
    const content = fs.readFileSync(blogPath, 'utf8');
    
    // Fix the hero path by removing /public/ prefix
    const fixedContent = content.replace(
      /hero: "\/public\/hero_v2\/([^"]+)"/,
      'hero: "/hero_v2/$1"'
    );
    
    // Also fix ogImage if it exists
    const finalContent = fixedContent.replace(
      /ogImage: "\/public\/hero_v2\/([^"]+)"/,
      'ogImage: "/hero_v2/$1"'
    );
    
    fs.writeFileSync(blogPath, finalContent);
    console.log(`✅ Fixed frontmatter: ${slug}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error fixing ${slug}:`, error.message);
    return false;
  }
};

// Run the fix process
const runHeroFix = async () => {
  console.log('🔧 Starting hero image and path fixes...');
  console.log('=========================================');
  
  const results = [];
  
  for (const slug of blogPosts) {
    console.log(`\n📝 Processing: ${slug}`);
    
    // Create hero image
    const imageResult = await createHeroImage(slug);
    results.push({ slug, type: 'image', success: imageResult });
    
    // Fix frontmatter
    const frontmatterResult = await fixBlogFrontmatter(slug);
    results.push({ slug, type: 'frontmatter', success: frontmatterResult });
  }
  
  console.log('\n📊 Fix Summary:');
  console.log('===============');
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`🎯 Fixed ${successCount}/${totalCount} items`);
  
  // Group by blog post
  const bySlug = {};
  results.forEach(({ slug, type, success }) => {
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push({ type, success });
  });
  
  Object.entries(bySlug).forEach(([slug, items]) => {
    const successCount = items.filter(item => item.success).length;
    console.log(`📄 ${slug}: ${successCount}/${items.length} fixes`);
  });
  
  return results;
};

// Run the fixes
runHeroFix().then(() => {
  console.log('\n🚀 Hero image fixes complete!');
}).catch(error => {
  console.error('❌ Fix failed:', error);
  process.exit(1);
});
