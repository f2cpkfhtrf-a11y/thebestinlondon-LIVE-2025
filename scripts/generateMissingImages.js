const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LOW_QUALITY_IMAGES = [
  // Cuisine tiles that need replacement
  { path: 'public/images/tiles/cuisines/afghan.webp', type: 'cuisine', theme: 'afghan', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/bangladeshi.webp', type: 'cuisine', theme: 'bangladeshi', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/iranian.webp', type: 'cuisine', theme: 'iranian', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/italian.webp', type: 'cuisine', theme: 'italian', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/mexican.webp', type: 'cuisine', theme: 'mexican', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/middle-eastern.webp', type: 'cuisine', theme: 'middle-eastern', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/modern-european.webp', type: 'cuisine', theme: 'modern-european', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/pakistani.webp', type: 'cuisine', theme: 'pakistani', dimensions: [800, 600] },
  { path: 'public/images/tiles/cuisines/seafood.webp', type: 'cuisine', theme: 'seafood', dimensions: [800, 600] },
  
  // Area tiles that need replacement
  { path: 'public/images/tiles/areas/brick-lane.webp', type: 'area', theme: 'brick-lane', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/brixton.webp', type: 'area', theme: 'brixton', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/camden.webp', type: 'area', theme: 'camden', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/canary-wharf.webp', type: 'area', theme: 'canary-wharf', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/clapham.webp', type: 'area', theme: 'clapham', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/islington.webp', type: 'area', theme: 'islington', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/lambeth.webp', type: 'area', theme: 'lambeth', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/newham.webp', type: 'area', theme: 'newham', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/soho.webp', type: 'area', theme: 'soho', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/spitalfields.webp', type: 'area', theme: 'spitalfields', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/stratford.webp', type: 'area', theme: 'stratford', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/tower-hamlets.webp', type: 'area', theme: 'tower-hamlets', dimensions: [800, 600] },
  { path: 'public/images/tiles/areas/wimbledon.webp', type: 'area', theme: 'wimbledon', dimensions: [800, 600] }
];

const MISSING_IMAGES = [
  { path: 'public/images/tiles/stations/waterloo.webp', type: 'station', theme: 'waterloo', dimensions: [800, 600] }
];

function createGradientImage(type, theme, dimensions) {
  const [width, height] = dimensions;
  
  // Color schemes based on type and theme
  let colors;
  if (type === 'cuisine') {
    colors = getCuisineColors(theme);
  } else if (type === 'area') {
    colors = getAreaColors(theme);
  } else if (type === 'station') {
    colors = getStationColors(theme);
  } else {
    colors = { primary: '#1E1B18', secondary: '#D4AF37' }; // Default gold/charcoal
  }
  
  // Create SVG with gradient
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}"/>
          <stop offset="100%" style="stop-color:${colors.secondary}"/>
        </linearGradient>
        <pattern id="texture" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#FFFFFF" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#texture)"/>
      <text x="50%" y="40%" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 8}" font-weight="bold">THE BEST</text>
      <text x="50%" y="60%" text-anchor="middle" fill="#D4AF37" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 12}" font-weight="bold">${theme.toUpperCase().replace('-', ' ')}</text>
    </svg>
  `;
  
  return Buffer.from(svg);
}

function getCuisineColors(theme) {
  const colorMap = {
    'afghan': { primary: '#8B4513', secondary: '#DAA520' },
    'bangladeshi': { primary: '#228B22', secondary: '#FFD700' },
    'iranian': { primary: '#800080', secondary: '#FFD700' },
    'italian': { primary: '#DC143C', secondary: '#32CD32' },
    'mexican': { primary: '#FF6347', secondary: '#FFD700' },
    'middle-eastern': { primary: '#654321', secondary: '#FFD700' },
    'modern-european': { primary: '#696969', secondary: '#D4AF37' },
    'pakistani': { primary: '#006400', secondary: '#FFD700' },
    'seafood': { primary: '#4169E1', secondary: '#98FB98' }
  };
  return colorMap[theme] || { primary: '#1E1B18', secondary: '#D4AF37' };
}

function getAreaColors(theme) {
  const colorMap = {
    'brick-lane': { primary: '#FF6B35', secondary: '#FFF3CD' },
    'brixton': { primary: '#8B0000', secondary: '#FFD700' },
    'camden': { primary: '#2F4F4F', secondary: '#FF6347' },
    'canary-wharf': { primary: '#4682B4', secondary: '#F0F8FF' },
    'clapham': { primary: '#228B22', secondary: '#F0FFF0' },
    'islington': { primary: '#8B008B', secondary: '#FFD700' },
    'lambeth': { primary: '#32CD32', secondary: '#FFFFFF' },
    'newham': { primary: '#DC143C', secondary: '#FFE4B5' },
    'soho': { primary: '#FF1493', secondary: '#FFB6C1' },
    'spitalfields': { primary: '#8B4513', secondary: '#FFFFE0' },
    'stratford': { primary: '#006400', secondary: '#F0FFF0' },
    'tower-hamlets': { primary: '#B22222', secondary: '#FFD700' },
    'wimbledon': { primary: '#556B2F', secondary: '#F0FFF0' }
  };
  return colorMap[theme] || { primary: '#1E1B18', secondary: '#D4AF37' };
}

function getStationColors(theme) {
  const colorMap = {
    'waterloo': { primary: '#4682B4', secondary: '#F0F8FF' }
  };
  return colorMap[theme] || { primary: '#1E1B18', secondary: '#D4AF37' };
}

async function generateImage(imageInfo) {
  const { path: imagePath, type, theme, dimensions } = imageInfo;
  const fullPath = path.join(process.cwd(), imagePath);
  const dir = path.dirname(fullPath);
  
  // Ensure directory exists
  fs.mkdirSync(dir, { recursive: true });
  
  try {
    // Create SVG buffer
    const svgBuffer = createGradientImage(type, theme, dimensions);
    
    // Convert to high-quality WebP
    await sharp(svgBuffer)
      .resize(dimensions[0], dimensions[1])
      .webp({ 
        quality: 90,
        effort: 6,
        smartSubsample: true
      })
      .toFile(fullPath);
    
    // Verify the file was created and meets size requirements
    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    
    if (sizeKB >= 50) {
      console.log(`✅ Generated: ${imagePath} (${sizeKB}KB)`);
      return true;
    } else {
      console.log(`⚠️  Generated but too small: ${imagePath} (${sizeKB}KB)`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Failed to generate ${imagePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🎨 Starting image generation for missing and low-quality images...\n');
  
  let successCount = 0;
  let totalCount = LOW_QUALITY_IMAGES.length + MISSING_IMAGES.length;
  
  // Generate missing images first
  console.log('📸 Generating missing images...');
  for (const imageInfo of MISSING_IMAGES) {
    const success = await generateImage(imageInfo);
    if (success) successCount++;
  }
  
  // Generate replacements for low-quality images
  console.log('\n🔄 Replacing low-quality images...');
  for (const imageInfo of LOW_QUALITY_IMAGES) {
    const success = await generateImage(imageInfo);
    if (success) successCount++;
  }
  
  console.log(`\n📊 SUMMARY`);
  console.log(`✅ Generated: ${successCount}/${totalCount} images`);
  
  if (successCount === totalCount) {
    console.log('🎉 All images generated successfully!');
    process.exit(0);
  } else {
    console.log('⚠️  Some images failed to generate');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Generation failed:', error);
  process.exit(1);
});
