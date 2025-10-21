import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const TILES_DIR = path.join(ROOT, "public/images/blog/tiles");
const POOL_DIR = path.join(ROOT, "public/images/blog/pool");
const MAPPING_FILE = path.join(ROOT, "data/blog-images.json");
const REPORT_FILE = path.join(ROOT, "reports/blog_tile_uniqueness.json");

const WIKIMEDIA_ENABLE = process.env.WIKIMEDIA_ENABLE === "1";
const ASSET_VERSION = process.env.ASSET_VERSION || Date.now();

function listBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".json"))
    .map(f => {
      const filePath = path.join(BLOG_DIR, f);
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return {
        slug: content.slug || path.basename(f, ".json"),
        title: content.title || "",
        tags: content.tags || [],
        currentImage: content.coverImage || content.image || "",
        filePath
      };
    });
}

function getExistingTiles() {
  const tiles = new Map();
  if (fs.existsSync(TILES_DIR)) {
    fs.readdirSync(TILES_DIR)
      .filter(f => f.endsWith(".webp"))
      .forEach(f => {
        const filePath = path.join(TILES_DIR, f);
        const stats = fs.statSync(filePath);
        if (stats.size >= 51200) { // ≥50KB
          tiles.set(path.basename(f, ".webp"), `/images/blog/tiles/${f}`);
        }
      });
  }
  return tiles;
}

function getPoolImages() {
  const pool = [];
  if (fs.existsSync(POOL_DIR)) {
    fs.readdirSync(POOL_DIR)
      .filter(f => f.endsWith(".webp"))
      .forEach(f => {
        const filePath = path.join(POOL_DIR, f);
        const stats = fs.statSync(filePath);
        if (stats.size >= 51200) {
          pool.push({
            path: `/images/blog/pool/${f}`,
            filePath: filePath
          });
        }
      });
  }
  return pool;
}

async function fetchWikimediaTile(query, outputPath) {
  if (!WIKIMEDIA_ENABLE) return false;
  
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.query?.search?.length > 0) {
      const file = data.query.search[0].title;
      const imageUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(file)}&prop=imageinfo&iiprop=url|size&iiurlwidth=1600`;
      
      const imageResponse = await fetch(imageUrl);
      const imageData = await imageResponse.json();
      
      const pages = Object.values(imageData.query.pages);
      if (pages.length > 0 && pages[0].imageinfo) {
        const imageInfo = pages[0].imageinfo[0];
        const imageUrl = imageInfo.url;
        
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();
        
        const webpBuffer = await sharp(Buffer.from(buffer))
          .resize(1600, 900, { fit: "cover" })
          .webp({ quality: 88 })
          .toBuffer();
        
        if (webpBuffer.length >= 51200) {
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, webpBuffer);
          return true;
        }
      }
    }
  } catch (error) {
    console.log(`⚠️ Wikimedia fetch failed for ${query}:`, error.message);
  }
  
  return false;
}

async function generatePlaceholderTile(slug, title, outputPath) {
  try {
    const width = 1600;
    const height = 900;
    
    // Create a luxury gradient background
    const gradient = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="45%" text-anchor="middle" fill="#D4AF37" font-family="serif" font-size="48" font-weight="bold">${title}</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#9AA0A6" font-family="sans-serif" font-size="24">The Best in London</text>
    </svg>`);
    
    const webpBuffer = await sharp(gradient)
      .webp({ quality: 88 })
      .toBuffer();
    
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, webpBuffer);
    return true;
  } catch (error) {
    console.log(`⚠️ Placeholder generation failed for ${slug}:`, error.message);
    return false;
  }
}

async function ensureUniqueBlogTiles() {
  const posts = listBlogPosts();
  const existingTiles = getExistingTiles();
  const poolImages = getPoolImages();
  const mapping = {};
  const usedImages = new Set();
  const report = {
    total: posts.length,
    unique: 0,
    duplicates: 0,
    wikimedia: 0,
    pool: 0,
    generated: 0,
    needsImages: []
  };
  
  fs.mkdirSync(TILES_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MAPPING_FILE), { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  
  for (const post of posts) {
    let assignedImage = null;
    
    // Try current image if it's unique
    if (post.currentImage && !usedImages.has(post.currentImage)) {
      assignedImage = post.currentImage;
    } else {
      // Find unused image from existing tiles
      for (const [slug, path] of existingTiles) {
        if (!usedImages.has(path)) {
          assignedImage = path;
          break;
        }
      }
    }
    
    // Try pool images if no unique image found
    if (!assignedImage) {
      for (const poolImg of poolImages) {
        if (!usedImages.has(poolImg.path)) {
          // Copy from pool to tiles directory
          const targetPath = path.join(TILES_DIR, `${post.slug}.webp`);
          fs.copyFileSync(poolImg.filePath, targetPath);
          assignedImage = `/images/blog/tiles/${post.slug}.webp`;
          report.pool++;
          break;
        }
      }
    }
    
    // Try Wikimedia fetch if enabled
    if (!assignedImage && WIKIMEDIA_ENABLE) {
      const outputPath = path.join(TILES_DIR, `${post.slug}.webp`);
      const success = await fetchWikimediaTile(`${post.title} London restaurant`, outputPath);
      if (success) {
        assignedImage = `/images/blog/tiles/${post.slug}.webp`;
        report.wikimedia++;
      }
    }
    
    // Generate placeholder as last resort
    if (!assignedImage) {
      const outputPath = path.join(TILES_DIR, `${post.slug}.webp`);
      const success = await generatePlaceholderTile(post.slug, post.title, outputPath);
      if (success) {
        assignedImage = `/images/blog/tiles/${post.slug}.webp`;
        report.generated++;
      } else {
        report.needsImages.push(post.slug);
      }
    }
    
    mapping[post.slug] = assignedImage;
    usedImages.add(assignedImage);
    
    if (assignedImage !== post.currentImage) {
      report.duplicates++;
    } else {
      report.unique++;
    }
  }
  
  // Save mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  
  // Save report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log("✅ Blog tiles uniqueness report:", report);
  return report;
}

(async () => {
  try {
    await ensureUniqueBlogTiles();
  } catch (error) {
    console.error("❌ Blog tiles script failed:", error);
    process.exit(1);
  }
})();