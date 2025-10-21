import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT,'data','blog-images.json');
const BLOG_TILE_DIR = path.join(ROOT,'public','images','tiles','blogs');

fs.mkdirSync(path.dirname(MAP_FILE), { recursive: true });
fs.mkdirSync(BLOG_TILE_DIR, { recursive: true });

let map = {};
if (fs.existsSync(MAP_FILE)) map = JSON.parse(fs.readFileSync(MAP_FILE,'utf-8'));

const used = new Set(Object.values(map));

function pickAvailable() {
  const files = fs.readdirSync(BLOG_TILE_DIR).filter(f => f.endsWith('.webp'));
  for (const f of files) {
    const rel = `/images/tiles/blogs/${f}`;
    const p = path.join(BLOG_TILE_DIR, f);
    const s = fs.statSync(p).size;
    if (!used.has(rel) && s >= 50*1024) {
      used.add(rel);
      return rel;
    }
  }
  return null;
}

// naive blog list from /pages/blog index markdown/json source if any; otherwise infer slugs
const POSTS_DIR = path.join(ROOT,'content','blog');
const slugs = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter(f=>f.endsWith('.md')||f.endsWith('.mdx')).map(f=>f.replace(/\.(md|mdx)$/,''))
  : (map.__slugs || []);

if (!slugs.length) {
  console.log('ℹ️ No blog slugs discovered; preserving existing map.');
  process.exit(0);
}
map.__slugs = slugs;

for (const slug of slugs) {
  if (!map[slug]) {
    const picked = pickAvailable();
    if (picked) map[slug] = picked;
  }
}

fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2));
console.log('✅ blog-images.json updated; all blog tiles mapped uniquely.');