import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 FIXING ENHANCED TILES - CONVERTING TO PROPER WEBP');
console.log('====================================================');

async function fixEnhancedTiles() {
  const tilesDir = path.join(__dirname, '..', 'public', 'tiles_v2');
  
  // Fix cuisine tiles
  const cuisineDir = path.join(tilesDir, 'cuisines');
  const cuisineFiles = await fs.readdir(cuisineDir);
  
  console.log('🍽️ FIXING CUISINE TILES:');
  for (const file of cuisineFiles) {
    if (file.endsWith('.webp')) {
      const filePath = path.join(cuisineDir, file);
      console.log(`   Converting ${file}...`);
      
      try {
        // Read the JPEG file (even though it has .webp extension)
        const imageBuffer = await fs.readFile(filePath);
        
        // Convert to proper WebP using sharp
        const webpBuffer = await sharp(imageBuffer)
          .resize(1920, 1080, { fit: 'cover' })
          .webp({ quality: 85 })
          .toBuffer();
        
        // Write the proper WebP file
        await fs.writeFile(filePath, webpBuffer);
        
        console.log(`   ✅ Fixed ${file} (${Math.round(webpBuffer.length / 1024)}KB)`);
      } catch (error) {
        console.log(`   ❌ Failed to fix ${file}: ${error.message}`);
      }
    }
  }
  
  // Fix area tiles
  const areaDir = path.join(tilesDir, 'areas');
  const areaFiles = await fs.readdir(areaDir);
  
  console.log('\n🏙️ FIXING AREA TILES:');
  for (const file of areaFiles) {
    if (file.endsWith('.webp')) {
      const filePath = path.join(areaDir, file);
      console.log(`   Converting ${file}...`);
      
      try {
        // Read the JPEG file (even though it has .webp extension)
        const imageBuffer = await fs.readFile(filePath);
        
        // Convert to proper WebP using sharp
        const webpBuffer = await sharp(imageBuffer)
          .resize(1920, 1080, { fit: 'cover' })
          .webp({ quality: 85 })
          .toBuffer();
        
        // Write the proper WebP file
        await fs.writeFile(filePath, webpBuffer);
        
        console.log(`   ✅ Fixed ${file} (${Math.round(webpBuffer.length / 1024)}KB)`);
      } catch (error) {
        console.log(`   ❌ Failed to fix ${file}: ${error.message}`);
      }
    }
  }
  
  console.log('\n🎉 ENHANCED TILES FIXED!');
  console.log('   All tiles are now proper WebP format');
  console.log('   Ready for testing');
}

fixEnhancedTiles().catch(console.error);
