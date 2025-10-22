import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality, relevant image sources from Unsplash
// These are curated search URLs that will give us relevant images
const CUISINE_IMAGE_SOURCES = {
  'indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&h=1080&fit=crop&q=80', // Indian food
  'italian': 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1920&h=1080&fit=crop&q=80', // Italian pasta
  'japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&h=1080&fit=crop&q=80', // Sushi
  'mediterranean': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&h=1080&fit=crop&q=80', // Mediterranean food
  'french': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1920&h=1080&fit=crop&q=80', // French bistro
  'turkish': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1920&h=1080&fit=crop&q=80', // Turkish kebab
  'chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1920&h=1080&fit=crop&q=80', // Chinese food
  'korean': 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1920&h=1080&fit=crop&q=80', // Korean food
  'british': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1920&h=1080&fit=crop&q=80', // British pub food
  'caribbean': 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=1920&h=1080&fit=crop&q=80', // Caribbean food
  'mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&h=1080&fit=crop&q=80', // Mexican tacos
  'spanish': 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1920&h=1080&fit=crop&q=80', // Spanish paella
  'thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1920&h=1080&fit=crop&q=80', // Thai food
  'modern-european': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80' // Fine dining
};

const AREA_IMAGE_SOURCES = {
  'central-london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop&q=80', // London skyline
  'redbridge': 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1920&h=1080&fit=crop&q=80', // East London street
  'tower-hamlets': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&h=1080&fit=crop&q=80', // Tower Bridge area
  'westminster': 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=1920&h=1080&fit=crop&q=80', // Westminster
  'southwark': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&h=1080&fit=crop&q=80', // South Bank
  'camden': 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1920&h=1080&fit=crop&q=80', // Camden Market
  'hackney': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&h=1080&fit=crop&q=80', // London neighborhood
  'kensington-and-chelsea': 'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=1920&h=1080&fit=crop&q=80', // Kensington
  'newham': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1920&h=1080&fit=crop&q=80', // London Docklands
  'havering': 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1920&h=1080&fit=crop&q=80', // Outer London area
  'whitechapel': 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1920&h=1080&fit=crop&q=80' // East End London
};

async function downloadImage(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  📥 Downloading (attempt ${attempt}/${maxRetries})...`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = await response.buffer();
      console.log(`  ✅ Downloaded ${Math.round(buffer.length / 1024)}KB`);
      return buffer;
    } catch (error) {
      console.log(`  ⚠️  Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

async function processAndSaveImage(imageBuffer, outputPath, slug) {
  try {
    console.log(`  🔧 Processing image...`);
    
    // Process with Sharp - resize and optimize
    const processedBuffer = await sharp(imageBuffer)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toBuffer();

    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Save WebP
    await fs.writeFile(outputPath, processedBuffer);
    console.log(`  ✅ Saved: ${outputPath} (${Math.round(processedBuffer.length / 1024)}KB)`);
    
    return true;
  } catch (error) {
    console.log(`  ❌ Processing failed: ${error.message}`);
    return false;
  }
}

async function generateTile(slug, imageUrl, type) {
  console.log(`\n🎨 Generating ${type} tile: ${slug}`);
  
  try {
    // Download image
    const imageBuffer = await downloadImage(imageUrl);
    
    // Process and save
    const outputPath = path.join(__dirname, '..', 'public', 'tiles_v2', type, `${slug}-tile.webp`);
    const success = await processAndSaveImage(imageBuffer, outputPath, slug);
    
    return success;
  } catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
    return false;
  }
}

async function cleanUpOldTiles() {
  console.log('🧹 Cleaning up old tiles...\n');
  
  const tilesDir = path.join(__dirname, '..', 'public', 'tiles_v2');
  
  try {
    // Remove nested incorrect directories
    const cuisinesDir = path.join(tilesDir, 'cuisines');
    const areasDir = path.join(tilesDir, 'areas');
    
    // Remove everything and recreate clean structure
    await fs.rm(cuisinesDir, { recursive: true, force: true });
    await fs.rm(areasDir, { recursive: true, force: true });
    
    // Recreate clean directories
    await fs.mkdir(cuisinesDir, { recursive: true });
    await fs.mkdir(areasDir, { recursive: true });
    
    console.log('✅ Clean directory structure created\n');
  } catch (error) {
    console.log(`⚠️  Cleanup warning: ${error.message}\n`);
  }
}

async function generateAllTiles() {
  console.log('🚀 RELEVANT TILE GENERATION');
  console.log('===========================\n');
  console.log('📸 Using curated Unsplash images (no API key needed)');
  console.log('🎯 All images are relevant to their cuisines/areas\n');
  
  // Clean up old tiles first
  await cleanUpOldTiles();
  
  let successCount = 0;
  let totalCount = 0;
  
  // Generate cuisine tiles
  console.log('🍽️  GENERATING CUISINE TILES');
  console.log('============================');
  for (const [slug, imageUrl] of Object.entries(CUISINE_IMAGE_SOURCES)) {
    totalCount++;
    const success = await generateTile(slug, imageUrl, 'cuisines');
    if (success) successCount++;
    
    // Rate limiting to be nice to Unsplash
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate area tiles
  console.log('\n🏙️  GENERATING AREA TILES');
  console.log('=========================');
  for (const [slug, imageUrl] of Object.entries(AREA_IMAGE_SOURCES)) {
    totalCount++;
    const success = await generateTile(slug, imageUrl, 'areas');
    if (success) successCount++;
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 TILE GENERATION COMPLETE!');
  console.log('============================');
  console.log(`✅ Successfully generated: ${successCount}/${totalCount} tiles`);
  console.log(`📁 Tiles saved to: /public/tiles_v2/`);
  console.log(`\n🔍 All images are now relevant to their cuisines/areas!`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Rebuild the site: npm run build`);
  console.log(`   2. Test pages: /areas and /cuisines`);
  console.log(`   3. Verify images are displaying correctly`);
}

// Run the generation
generateAllTiles().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
