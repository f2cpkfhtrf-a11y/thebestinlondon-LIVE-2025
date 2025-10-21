import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BLOG_IMAGES_PATH = path.join(ROOT, 'data/blog-images.json');
const BLOG_POOL_DIR = path.join(ROOT, 'public/images/blog_pool');
const BLOG_SPECIFIC_DIR = path.join(ROOT, 'public/images/blog');
const CONTENT_BLOG_DIR = path.join(ROOT, 'content/blog');
const REPORT_PATH = path.join(ROOT, 'reports/blog_tiles_uniqueness.json');

/**
 * Ensure blog tile uniqueness without external calls
 * Builds/refreshes data/blog-images.json with unique local images
 */
async function ensureUniqueBlogTiles() {
  console.log('🔍 Ensuring blog tile uniqueness...');
  
  try {
    // Ensure directories exist
    fs.mkdirSync(BLOG_POOL_DIR, { recursive: true });
    fs.mkdirSync(path.dirname(BLOG_IMAGES_PATH), { recursive: true });
    
    // Load existing blog images mapping
    let blogImages = {};
    if (fs.existsSync(BLOG_IMAGES_PATH)) {
      try {
        blogImages = JSON.parse(fs.readFileSync(BLOG_IMAGES_PATH, 'utf8'));
      } catch (error) {
        console.log('⚠️ Could not parse existing blog-images.json, starting fresh');
      }
    }
    
    // Get all blog slugs from content directory
    let blogSlugs = [];
    if (fs.existsSync(CONTENT_BLOG_DIR)) {
      const blogFiles = fs.readdirSync(CONTENT_BLOG_DIR).filter(f => f.endsWith('.json'));
      blogSlugs = blogFiles.map(f => f.replace('.json', ''));
    }
    
    console.log(`📝 Found ${blogSlugs.length} blog posts`);
    
    // Get available pool images
    let poolImages = [];
    if (fs.existsSync(BLOG_POOL_DIR)) {
      poolImages = fs.readdirSync(BLOG_POOL_DIR)
        .filter(f => f.endsWith('.webp'))
        .map(f => `/images/blog_pool/${f}`);
    }
    
    console.log(`🖼️ Found ${poolImages.length} pool images`);
    
    // Get cuisine and area tiles for fallback
    const cuisineTilesDir = path.join(ROOT, 'public/images/tiles/cuisines');
    const areaTilesDir = path.join(ROOT, 'public/images/tiles/areas');
    
    let fallbackImages = [];
    
    if (fs.existsSync(cuisineTilesDir)) {
      const cuisineTiles = fs.readdirSync(cuisineTilesDir)
        .filter(f => f.endsWith('.webp'))
        .map(f => `/images/tiles/cuisines/${f}`);
      fallbackImages.push(...cuisineTiles);
    }
    
    if (fs.existsSync(areaTilesDir)) {
      const areaTiles = fs.readdirSync(areaTilesDir)
        .filter(f => f.endsWith('.webp'))
        .map(f => `/images/tiles/areas/${f}`);
      fallbackImages.push(...areaTiles);
    }
    
    console.log(`🎨 Found ${fallbackImages.length} fallback tiles`);
    
    // Track used images to avoid duplicates
    const usedImages = new Set(Object.values(blogImages));
    const availablePoolImages = poolImages.filter(img => !usedImages.has(img));
    
    // Shuffle fallback images to avoid patterns
    const shuffledFallbacks = fallbackImages.sort(() => Math.random() - 0.5);
    
    const report = {
      timestamp: new Date().toISOString(),
      totalBlogs: blogSlugs.length,
      poolImagesAvailable: poolImages.length,
      fallbackImagesAvailable: fallbackImages.length,
      assignments: [],
      summary: {
        blogSpecific: 0,
        poolImages: 0,
        fallbackTiles: 0,
        siteDefault: 0
      }
    };
    
    // Process each blog slug
    for (const slug of blogSlugs) {
      let assignedImage = null;
      let reason = '';
      
      // Check if already mapped
      if (blogImages[slug]) {
        assignedImage = blogImages[slug];
        reason = 'already-mapped';
      } else {
        // Try blog-specific image first
        const blogSpecificPath = `/images/blog/${slug}.webp`;
        if (fs.existsSync(path.join(ROOT, 'public', blogSpecificPath.replace(/^\/+/, '')))) {
          assignedImage = blogSpecificPath;
          reason = 'blog-specific';
          report.summary.blogSpecific++;
        }
        // Try available pool image
        else if (availablePoolImages.length > 0) {
          assignedImage = availablePoolImages.shift();
          reason = 'pool-image';
          report.summary.poolImages++;
        }
        // Try fallback tiles (shuffled)
        else if (shuffledFallbacks.length > 0) {
          assignedImage = shuffledFallbacks.shift();
          reason = 'fallback-tile';
          report.summary.fallbackTiles++;
        }
        // Ultimate fallback
        else {
          assignedImage = '/images/heroes/site-default.webp';
          reason = 'site-default';
          report.summary.siteDefault++;
        }
        
        // Update mapping
        blogImages[slug] = assignedImage;
        usedImages.add(assignedImage);
      }
      
      report.assignments.push({
        slug,
        image: assignedImage,
        reason
      });
      
      console.log(`✅ ${slug}: ${assignedImage} (${reason})`);
    }
    
    // Save updated mapping
    fs.writeFileSync(BLOG_IMAGES_PATH, JSON.stringify(blogImages, null, 2));
    
    // Save report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    
    // Summary
    console.log('\n📊 Blog Tile Uniqueness Summary:');
    console.log(`✅ Total blogs processed: ${report.totalBlogs}`);
    console.log(`🖼️ Blog-specific images: ${report.summary.blogSpecific}`);
    console.log(`🎨 Pool images used: ${report.summary.poolImages}`);
    console.log(`🏷️ Fallback tiles used: ${report.summary.fallbackTiles}`);
    console.log(`🔧 Site default used: ${report.summary.siteDefault}`);
    
    // Check for duplicates
    const imageCounts = {};
    Object.values(blogImages).forEach(img => {
      imageCounts[img] = (imageCounts[img] || 0) + 1;
    });
    
    const duplicates = Object.entries(imageCounts).filter(([, count]) => count > 1);
    if (duplicates.length > 0) {
      console.log(`⚠️ Found ${duplicates.length} duplicate images:`);
      duplicates.forEach(([img, count]) => {
        console.log(`   - ${img}: used ${count} times`);
      });
    } else {
      console.log('✅ All blog tiles are unique!');
    }
    
    console.log(`\n💾 Blog images mapping saved to: ${BLOG_IMAGES_PATH}`);
    console.log(`📝 Report saved to: ${REPORT_PATH}`);
    
  } catch (error) {
    console.error(`❌ Error ensuring blog tile uniqueness: ${error.message}`);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ensureUniqueBlogTiles().catch(error => {
    console.error('Failed to ensure blog tile uniqueness:', error);
    process.exit(1);
  });
}

export { ensureUniqueBlogTiles };