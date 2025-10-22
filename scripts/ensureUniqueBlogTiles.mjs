#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Ensure unique blog tiles by mapping blog slugs to unique images
 */
async function ensureUniqueBlogTiles() {
  console.log('🔍 Ensuring unique blog tiles...');
  
  const contentDir = path.join(process.cwd(), 'content');
  const blogDir = path.join(contentDir, 'blog');
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images', 'blog');
  const dataDir = path.join(process.cwd(), 'data');
  
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const blogImagesPath = path.join(dataDir, 'blog-images.json');
  
  // Load existing mapping
  let existingMapping = {};
  if (fs.existsSync(blogImagesPath)) {
    try {
      existingMapping = JSON.parse(fs.readFileSync(blogImagesPath, 'utf8'));
      console.log(`📋 Loaded existing mapping with ${Object.keys(existingMapping).length} entries`);
    } catch (error) {
      console.warn('⚠️  Could not load existing blog-images.json, starting fresh');
    }
  }
  
  // Get all blog posts
  let blogs = [];
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
    blogs = blogFiles.map(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      return JSON.parse(content);
    });
  }
  
  console.log(`📝 Found ${blogs.length} blog posts`);
  
  // Get available blog images
  let availableImages = [];
  if (fs.existsSync(imagesDir)) {
    availableImages = fs.readdirSync(imagesDir)
      .filter(file => file.endsWith('.webp'))
      .map(file => `/images/blog/${file}`);
  }
  
  console.log(`🖼️  Found ${availableImages.length} available blog images`);
  
  // Build mapping
  const newMapping = { ...existingMapping };
  const usedImages = new Set(Object.values(newMapping));
  
  for (const blog of blogs) {
    const slug = blog.slug;
    
    // Skip if already mapped
    if (newMapping[slug]) {
      continue;
    }
    
    // Try to find an unused image
    const unusedImage = availableImages.find(img => !usedImages.has(img));
    
    if (unusedImage) {
      newMapping[slug] = unusedImage;
      usedImages.add(unusedImage);
      console.log(`✅ Mapped ${slug} → ${unusedImage}`);
    } else {
      // Fallback to default
      newMapping[slug] = '/images/heroes/site-default.webp';
      console.log(`⚠️  No unique image available for ${slug}, using default`);
    }
  }
  
  // Write mapping
  fs.writeFileSync(blogImagesPath, JSON.stringify(newMapping, null, 2));
  
  const newMappings = Object.keys(newMapping).length - Object.keys(existingMapping).length;
  console.log(`📊 Updated mapping: ${newMappings} new entries, ${Object.keys(newMapping).length} total`);
  
  // Check for duplicates
  const values = Object.values(newMapping);
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  
  if (duplicates.length > 0) {
    console.warn(`⚠️  Found ${duplicates.length} duplicate image assignments:`);
    duplicates.forEach(dup => {
      const slugs = Object.keys(newMapping).filter(slug => newMapping[slug] === dup);
      console.warn(`   ${dup}: ${slugs.join(', ')}`);
    });
  } else {
    console.log('✅ All blog tiles are unique!');
  }
  
  // Write report
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, 'blog_tiles.json');
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalBlogs: blogs.length,
      totalMappings: Object.keys(newMapping).length,
      newMappings: newMappings,
      duplicates: duplicates.length
    },
    mapping: newMapping,
    duplicates: duplicates
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('🎉 Blog tile uniqueness check complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ensureUniqueBlogTiles().catch(console.error);
}

export default ensureUniqueBlogTiles;