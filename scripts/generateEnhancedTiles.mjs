import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Omar's workflow configuration
const CUISINE_DESCRIPTIONS = {
  indian: "vibrant indian restaurant interior, colorful spices, traditional indian cuisine, warm golden lighting, authentic indian food",
  italian: "elegant italian restaurant, fresh pasta, wood-fired pizza, rustic italian interior, authentic italian cuisine",
  japanese: "minimalist japanese sushi bar, clean modern design, fresh sushi, traditional japanese restaurant interior",
  mediterranean: "mediterranean restaurant, fresh seafood, olive oil, bright mediterranean interior, healthy mediterranean cuisine",
  french: "sophisticated french bistro, elegant french cuisine, wine cellar, classic french restaurant interior",
  turkish: "traditional turkish restaurant, kebabs, mezze, warm turkish interior, authentic turkish cuisine"
};

const AREA_DESCRIPTIONS = {
  "central-london": "central london skyline, big ben, trafalgar square, iconic london landmarks, bustling central london",
  redbridge: "redbridge london, ilford high street, east london area, diverse london borough, local london community"
};

const LEXICA_API_URL = 'https://lexica.art/api/v1/search';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const UPSCALE_API_URL = 'https://api.upscale.media/v1/upscale';

// Check for API keys
const LEXICA_API_KEY = process.env.LEXICA_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UPSCALE_API_KEY = process.env.UPSCALE_API_KEY;

console.log('🎯 OMAR\'S WORKFLOW: ENHANCED TILE GENERATION');
console.log('==============================================');
console.log(`📊 API Keys Status:`);
console.log(`   Lexica.art: ${LEXICA_API_KEY ? '✅ Available' : '❌ Missing'}`);
console.log(`   Pexels: ${PEXELS_API_KEY ? '✅ Available' : '❌ Missing'}`);
console.log(`   Upscale.media: ${UPSCALE_API_KEY ? '✅ Available' : '❌ Missing'}`);
console.log('');

async function searchLexica(query) {
  if (!LEXICA_API_KEY) {
    console.log('⚠️  Lexica API key not found, skipping...');
    return null;
  }

  try {
    console.log(`🔍 Searching Lexica.art for: ${query}`);
    const response = await fetch(LEXICA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LEXICA_API_KEY}`
      },
      body: JSON.stringify({
        q: query,
        model: 'lexica-aperture-v3',
        searchMode: 'images',
        source: 'search',
        cursor: 0,
        nsfw: false
      })
    });

    if (!response.ok) {
      throw new Error(`Lexica API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.images && data.images.length > 0) {
      return data.images[0].src;
    }
    return null;
  } catch (error) {
    console.log(`❌ Lexica search failed: ${error.message}`);
    return null;
  }
}

async function searchPexels(query) {
  if (!PEXELS_API_KEY) {
    console.log('⚠️  Pexels API key not found, skipping...');
    return null;
  }

  try {
    console.log(`🔍 Searching Pexels for: ${query}`);
    const response = await fetch(`${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large2x;
    }
    return null;
  } catch (error) {
    console.log(`❌ Pexels search failed: ${error.message}`);
    return null;
  }
}

async function upscaleImage(imageUrl) {
  if (!UPSCALE_API_KEY) {
    console.log('⚠️  Upscale API key not found, using original image...');
    return imageUrl;
  }

  try {
    console.log(`🔧 Upscaling image with Upscale.media...`);
    const response = await fetch(UPSCALE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UPSCALE_API_KEY}`
      },
      body: JSON.stringify({
        image_url: imageUrl,
        width: 1920,
        height: 1080,
        style: 'warm',
        vignette: 'subtle'
      })
    });

    if (!response.ok) {
      throw new Error(`Upscale API error: ${response.status}`);
    }

    const data = await response.json();
    return data.upscaled_url;
  } catch (error) {
    console.log(`❌ Upscale failed: ${error.message}, using original`);
    return imageUrl;
  }
}

async function downloadAndSaveImage(imageUrl, outputPath, slug, type) {
  try {
    console.log(`📥 Downloading image for ${type}: ${slug}`);
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    const imageBuffer = await response.buffer();
    
    // Save as WebP
    const webpPath = outputPath.replace('.webp', '.webp');
    await fs.writeFile(webpPath, imageBuffer);
    
    // Save as AVIF (same content for now)
    const avifPath = outputPath.replace('.webp', '.avif');
    await fs.writeFile(avifPath, imageBuffer);
    
    console.log(`✅ Saved: ${webpPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    console.log(`✅ Saved: ${avifPath} (${Math.round(imageBuffer.length / 1024)}KB)`);
    
    return true;
  } catch (error) {
    console.log(`❌ Failed to save image for ${slug}: ${error.message}`);
    return false;
  }
}

async function generateTileForSlug(slug, description, type) {
  console.log(`\n🎨 Generating tile for ${type}: ${slug}`);
  console.log(`📝 Description: ${description}`);
  
  let imageUrl = null;
  
  // Step 1: Try Lexica.art first
  imageUrl = await searchLexica(description);
  
  // Step 2: Fallback to Pexels if Lexica fails
  if (!imageUrl) {
    imageUrl = await searchPexels(description);
  }
  
  // Step 3: Fallback to Picsum if both APIs fail
  if (!imageUrl) {
    console.log('⚠️  Both APIs failed, using Picsum fallback...');
    const randomSeed = slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    imageUrl = `https://picsum.photos/1920/1080?random=${randomSeed}`;
  }
  
  // Step 4: Upscale the image
  const upscaledUrl = await upscaleImage(imageUrl);
  
  // Step 5: Download and save
  const outputPath = path.join(__dirname, '..', 'public', 'tiles_v2', type, `${slug}-tile.webp`);
  const success = await downloadAndSaveImage(upscaledUrl, outputPath, slug, type);
  
  return success;
}

async function generateAllTiles() {
  console.log('🚀 Starting tile generation process...\n');
  
  const tilesDir = path.join(__dirname, '..', 'public', 'tiles_v2');
  await fs.mkdir(path.join(tilesDir, 'cuisines'), { recursive: true });
  await fs.mkdir(path.join(tilesDir, 'areas'), { recursive: true });
  
  let successCount = 0;
  let totalCount = 0;
  
  // Generate cuisine tiles
  console.log('🍽️ GENERATING CUISINE TILES');
  console.log('============================');
  for (const [slug, description] of Object.entries(CUISINE_DESCRIPTIONS)) {
    totalCount++;
    const success = await generateTileForSlug(slug, description, 'cuisines');
    if (success) successCount++;
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate area tiles
  console.log('\n🏙️ GENERATING AREA TILES');
  console.log('==========================');
  for (const [slug, description] of Object.entries(AREA_DESCRIPTIONS)) {
    totalCount++;
    const success = await generateTileForSlug(slug, description, 'areas');
    if (success) successCount++;
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 TILE GENERATION COMPLETE!');
  console.log('============================');
  console.log(`✅ Successfully generated: ${successCount}/${totalCount} tiles`);
  console.log(`📁 Tiles saved to: /public/tiles_v2/`);
  console.log(`🔧 Next step: Update tile import logic`);
}

// Run the generation
generateAllTiles().catch(console.error);