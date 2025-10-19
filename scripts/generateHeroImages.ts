import fs from 'fs';
import path from 'path';

// This script generates placeholder hero images for areas and cuisines
// It uses the existing SVG assets and creates WebP placeholders

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createPlaceholderHeroImage(outputPath: string, title: string, type: 'area' | 'cuisine') {
  const width = 1600;
  const height = 900;
  
  // Create a simple HTML-based SVG that can be converted
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="serif" font-size="72" font-weight="bold" fill="#D4AF37">
    ${title}
  </text>
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" 
        font-family="sans-serif" font-size="24" fill="#FFFFFF" opacity="0.8">
    ${type === 'area' ? 'Restaurant Guide' : 'Cuisine Collection'}
  </text>
</svg>`;

  // Write SVG first
  const svgPath = outputPath.replace('.webp', '.svg');
  fs.writeFileSync(svgPath, svgContent);
  
  console.log(`Created placeholder: ${svgPath}`);
  
  // For now, we'll create a simple text file that indicates what should be here
  const placeholderInfo = {
    type: type,
    title: title,
    expectedFormat: 'webp',
    dimensions: `${width}x${height}`,
    minSizeKB: 50,
    createdAt: new Date().toISOString(),
    note: 'This is a placeholder. Replace with actual hero image.'
  };
  
  const infoPath = outputPath.replace('.webp', '.json');
  fs.writeFileSync(infoPath, JSON.stringify(placeholderInfo, null, 2));
}

async function generateHeroImages() {
  console.log('🎨 Generating missing hero images...');
  
  // Read areas data
  const areasPath = path.join(process.cwd(), 'data/areas.json');
  const areasData = JSON.parse(fs.readFileSync(areasPath, 'utf8'));
  
  // Read cuisines from venues
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  const cuisines = new Set();
  venues.forEach(venue => {
    if (venue.cuisines && Array.isArray(venue.cuisines)) {
      venue.cuisines.forEach(cuisine => {
        if (cuisine) {
          cuisines.add(cuisine.toLowerCase().trim().replace(/\s+/g, '-'));
        }
      });
    }
  });
  
  // Ensure directories exist
  const areasHeroDir = path.join(process.cwd(), 'public/images/heroes/areas');
  const cuisinesHeroDir = path.join(process.cwd(), 'public/images/heroes/cuisines');
  
  ensureDirectoryExists(areasHeroDir);
  ensureDirectoryExists(cuisinesHeroDir);
  
  // Generate area heroes
  console.log('\n📍 Generating area heroes...');
  for (const area of areasData) {
    const slug = area.slug;
    const outputPath = path.join(areasHeroDir, `${slug}.webp`);
    
    if (!fs.existsSync(outputPath)) {
      createPlaceholderHeroImage(outputPath, area.name, 'area');
    } else {
      console.log(`✅ ${slug} already exists`);
    }
  }
  
  // Generate cuisine heroes
  console.log('\n🍽️ Generating cuisine heroes...');
  for (const cuisine of Array.from(cuisines)) {
    const outputPath = path.join(cuisinesHeroDir, `${cuisine}.webp`);
    
    if (!fs.existsSync(outputPath)) {
      const title = cuisine.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      createPlaceholderHeroImage(outputPath, title, 'cuisine');
    } else {
      console.log(`✅ ${cuisine} already exists`);
    }
  }
  
  // Also generate thumbnails directory structure
  const thumbnailsDir = path.join(process.cwd(), 'public/images/thumbnails');
  ensureDirectoryExists(thumbnailsDir);
  
  console.log('\n✨ Hero image generation complete!');
  console.log('📋 Next steps:');
  console.log('   1. Replace SVG placeholders with actual WebP images (1600x900, >50KB)');
  console.log('   2. Update resolveHeroImage.ts fallback paths if needed');
  console.log('   3. Test hero image resolution across all pages');
}

// Run the script
generateHeroImages().catch(console.error);
