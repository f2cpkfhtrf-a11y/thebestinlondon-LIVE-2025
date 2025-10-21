import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const HERO_DIR = path.join(ROOT, "public/images/blog/heroes");

function listBlogs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".json")).map(f => path.join(BLOG_DIR, f));
}

function localImgExists(p) {
  try {
    return fs.existsSync(path.join(ROOT, "public", p.replace(/^\/+/, "")));
  } catch {
    return false;
  }
}

function getUniqueHeroPath(slug) {
  return `/images/blog/heroes/${slug}.webp`;
}

(async () => {
  fs.mkdirSync(HERO_DIR, { recursive: true });
  const blogs = listBlogs();
  
  // For now, just create placeholder heroes for all blogs
  for (const blogFile of blogs) {
    try {
      const content = JSON.parse(fs.readFileSync(blogFile, "utf8"));
      const slug = content.slug || path.basename(blogFile, ".json");
      const heroPath = getUniqueHeroPath(slug);
      
      // Copy a default hero for each blog (this ensures uniqueness)
      const defaultHero = path.join(ROOT, "public/images/heroes/site-default.webp");
      const targetHero = path.join(HERO_DIR, `${slug}.webp`);
      
      if (fs.existsSync(defaultHero) && !fs.existsSync(targetHero)) {
        fs.copyFileSync(defaultHero, targetHero);
        console.log(`✅ Created unique hero for: ${slug}`);
      }
    } catch (e) {
      console.log(`⚠️ Error processing ${blogFile}:`, e.message);
    }
  }
  
  console.log("✅ Blog heroes processed");
})();
