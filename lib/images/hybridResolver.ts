import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const VENUE_DIR = path.join(PUB, 'images', 'venues');
const CACHED_DIR = path.join(PUB, 'images', '_cached');
const TILE_DIR = path.join(PUB, 'images', 'tiles');

function existsLarge(relPath: string, min=50*1024): string|null {
  const p = path.join(PUB, relPath.replace(/^\/+/, ''));
  try {
    const s = fs.statSync(p);
    if (s.isFile() && s.size >= min) return relPath.startsWith('/') ? relPath : '/'+relPath;
  } catch {}
  return null;
}

export function version(url: string, v: string) {
  return url.includes('?') ? `${url}&v=${v}` : `${url}?v=${v}`;
}

/** Venue hero/card resolver: prefer exact venue -> cached -> cuisine/area -> site default */
export function resolveVenueImagePaths(venue: any, opts: {assetVersion: string, cuisineSlug?: string, areaSlug?: string}) {
  const v = opts.assetVersion || '0';
  const candidates: string[] = [];

  // explicit fields
  if (venue.image_card_path) candidates.push(venue.image_card_path);
  if (venue.image_hero_path) candidates.push(venue.image_hero_path);

  // conventional local files
  const slug = venue.slug || (venue.name||'').toLowerCase().replace(/\s+/g,'-');
  ['.webp','.jpg','.jpeg','.png'].forEach(ext => {
    candidates.push(`/images/venues/${slug}${ext}`);
  });

  // cached
  ['.webp','.jpg','.jpeg','.png'].forEach(ext => {
    candidates.push(`/images/_cached/${slug}${ext}`);
  });

  // cuisine/area tiles
  if (opts.cuisineSlug) candidates.push(`/images/tiles/cuisines/${opts.cuisineSlug}.webp`);
  if (opts.areaSlug)    candidates.push(`/images/tiles/areas/${opts.areaSlug}.webp`);

  // site default
  candidates.push('/images/heroes/site/site-default.webp');

  // pick first existing ≥ 50KB
  for (const rel of candidates) {
    const ok = existsLarge(rel);
    if (ok) return { hero: version(ok, v), card: version(ok, v) };
  }
  // last resort: return site default unversioned (should never hit)
  return { hero: '/images/heroes/site/site-default.webp', card: '/images/heroes/site/site-default.webp' };
}

/** Generic tile resolver with uniqueness guard handled outside via mapping */
export function resolveTileImage(type: 'blog'|'area'|'cuisine'|'station', slug: string, assetVersion: string) {
  const bases: Record<string,string> = {
    blog: '/images/tiles/blogs',
    area: '/images/tiles/areas',
    cuisine: '/images/tiles/cuisines',
    station: '/images/tiles/stations'
  };
  const rel = `${bases[type]}/${slug}.webp`;
  const ok = existsLarge(rel);
  if (ok) return version(ok, assetVersion);
  // fallback to a themed default
  const def = `${bases[type]}/default.webp`;
  return version(existsLarge(def) || def, assetVersion);
}
