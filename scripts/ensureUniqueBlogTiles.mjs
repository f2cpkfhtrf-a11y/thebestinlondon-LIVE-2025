import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const TILES_DIR = path.join(ROOT, "public/images/blog/tiles");
const MAPPING_FILE = path.join(ROOT, "data/blog-images.json");

const EXTERNAL_FETCH = process.env.EXTERNAL_IMAGE_FETCH === "1";
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";

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

function getAvailableImages() {
  const images = [];
  const dirs = [
    "/public/images/blog/tiles",
    "/public/images/heroes", 
    "/public/images/tiles/cuisines",
    "/public/images/tiles/areas"
  ];
  
  for (const dir of dirs) {
    const fullPath = path.join(ROOT, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath)
        .filter(f => f.endsWith(".webp") || f.endsWith(".jpg") || f.endsWith(".jpeg"))
        .map(f => path.join(dir, f));
      images.push(...files);
    }
  }
  return images;
}

async function fetchExternalImage(query, outputPath) {
  if (!EXTERNAL_FETCH || !GOOGLE_API_KEY) return false;
  
  try {
    // Use Google Places Photo API
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (searchData.results && searchData.results.length > 0) {
      const placeId = searchData.results[0].place_id;
      const photoRef = searchData.results[0].photos?.[0]?.photo_reference;
      
      if (photoRef) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
        const photoResponse = await fetch(photoUrl);
        
        if (photoResponse.ok) {
          const buffer = await photoResponse.arrayBuffer();
          const webpBuffer = await sharp(Buffer.from(buffer))
            .resize(1600, 900, { fit: "cover" })
            .webp({ quality: 88 })
            .toBuffer();
          
          if (webpBuffer.length >= 51200) { // ≥50KB
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, webpBuffer);
            return true;
          }
        }
      }
    }
  } catch (error) {
    console.log(`⚠️ External fetch failed for ${query}:`, error.message);
  }
  
  return false;
}

async function ensureUniqueBlogTiles() {
  const posts = listBlogPosts();
  const availableImages = getAvailableImages();
  const mapping = {};
  const usedImages = new Set();
  const report = {
    total: posts.length,
    unique: 0,
    duplicates: 0,
    external: 0,
    needsImages: []
  };
  
  fs.mkdirSync(TILES_DIR, { recursive: true });
  
  for (const post of posts) {
    let assignedImage = null;
    
    // Try current image if it's unique
    if (post.currentImage && !usedImages.has(post.currentImage)) {
      assignedImage = post.currentImage;
    } else {
      // Find unused image from pool
      for (const img of availableImages) {
        if (!usedImages.has(img)) {
          assignedImage = img;
          break;
        }
      }
    }
    
    // If no unique image available, try external fetch
    if (!assignedImage && EXTERNAL_FETCH) {
      const outputPath = path.join(TILES_DIR, `${post.slug}.webp`);
      const success = await fetchExternalImage(`${post.title} restaurant London`, outputPath);
      if (success) {
        assignedImage = `/images/blog/tiles/${post.slug}.webp`;
        report.external++;
      }
    }
    
    // Fallback to default if still no image
    if (!assignedImage) {
      assignedImage = "/images/heroes/site-default.webp";
      report.needsImages.push(post.slug);
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
  fs.mkdirSync(path.dirname(MAPPING_FILE), { recursive: true });
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  
  // Save report
  fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "reports/blog_tiles_uniqueness.json"),
    JSON.stringify(report, null, 2)
  );
  
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
