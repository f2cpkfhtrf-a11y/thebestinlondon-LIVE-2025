#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base directory
const baseDir = path.join(__dirname, '..', 'public', 'images', 'tiles');

// Professional, high-quality image mappings for cuisine tiles
const cuisineImageMappings = {
  'british': {
    url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=900&fit=crop',
    prompt: 'Professional British food photography: fish and chips with golden crispy batter, roast dinner with yorkshire pudding, traditional English pub food'
  },
  'indian': {
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=900&fit=crop',
    prompt: 'Professional Indian cuisine photography: aromatic curry dishes with naan bread, colorful spices'
  },
  'italian': {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=900&fit=crop',
    prompt: 'Professional Italian food photography: fresh pasta dishes, authentic pizza'
  },
  'japanese': {
    url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1600&h=900&fit=crop',
    prompt: 'Professional Japanese cuisine photography: fresh sushi rolls, ramen bowls'
  },
  'turkish': {
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&h=900&fit=crop',
    prompt: 'Professional Turkish cuisine photography: kebabs, mezze platters'
  },
  'thai': {
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1600&h=900&fit=crop',
    prompt: 'Professional Thai cuisine photography: pad thai, green curry'
  },
  'mexican': {
    url: 'https://images.unsplash.com/photo-1565299585323-38174c4a87d8?w=1600&h=900&fit=crop',
    prompt: 'Professional Mexican cuisine photography: tacos, burritos, fresh ingredients'
  },
  'korean': {
    url: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=1600&h=900&fit=crop',
    prompt: 'Professional Korean cuisine photography: bibimbap, Korean BBQ'
  },
  'french': {
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&h=900&fit=crop',
    prompt: 'Professional French cuisine photography: classic French dishes, fine dining'
  },
  'chinese': {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=1600&h=900&fit=crop',
    prompt: 'Professional Chinese cuisine photography: dumplings, stir-fry dishes'
  },
  'spanish': {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1600&h=900&fit=crop',
    prompt: 'Professional Spanish cuisine photography: paella, tapas'
  },
  'caribbean': {
    url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=1600&h=900&fit=crop',
    prompt: 'Professional Caribbean cuisine photography: jerk chicken, tropical flavors'
  },
  'mediterranean': {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop',
    prompt: 'Professional Mediterranean cuisine photography: fresh seafood, olive oil'
  },
  'modern-european': {
    url: 'https://images.unsplash.com/photo-1553521041-d168efeecd30?w=1600&h=900&fit=crop',
    prompt: 'Professional fine dining photography: modern European cuisine, elegant plating'
  },
  'lebanese': {
    url: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=1600&h=900&fit=crop',
    prompt: 'Professional Lebanese cuisine photography: mezze platters'
  },
  'vegan': {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop',
    prompt: 'Professional vegan cuisine photography: fresh plant-based dishes'
  },
  'vegetarian': {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&h=900&fit=crop',
    prompt: 'Professional vegetarian cuisine photography: fresh vegetables'
  },
  'halal': {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=900&fit=crop',
    prompt: 'Professional halal cuisine photography: traditional halal food'
  },
  'bakery': {
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600&h=900&fit=crop',
    prompt: 'Professional bakery photography: fresh bread, pastries'
  },
  'burgers': {
    url: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=1600&h=900&fit=crop',
    prompt: 'Professional burger photography: gourmet burgers'
  },
  'cafe': {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop',
    prompt: 'Professional coffee photography: specialty coffee, latte art'
  },
  'desserts': {
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&h=900&fit=crop',
    prompt: 'Professional dessert photography: high-end desserts'
  },
  'pizza': {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=900&fit=crop',
    prompt: 'Professional pizza photography: traditional pizza'
  },
  'seafood': {
    url: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=1600&h=900&fit=crop',
    prompt: 'Professional seafood photography: fresh fish, shellfish'
  },
  'steakhouse': {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&h=900&fit=crop',
    prompt: 'Professional steak photography: premium cuts'
  }
};

// Professional, high-quality image mappings for area tiles
const areaImageMappings = {
  'central-london': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional London photography: Big Ben, Houses of Parliament, iconic London landmarks, golden hour lighting'
  },
  'tower-hamlets': {
    url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Canary Wharf photography: modern skyscrapers, financial district, contemporary London architecture'
  },
  'camden': {
    url: 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Camden photography: Camden Market, vibrant street scenes, alternative London culture'
  },
  'hackney': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Shoreditch photography: street art, trendy cafes, hipster culture, creative district'
  },
  'southwark': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Borough Market photography: food market, historic buildings, vibrant atmosphere'
  },
  'westminster': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Westminster photography: Parliament Square, government buildings, historic architecture'
  },
  'kensington-and-chelsea': {
    url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Kensington photography: elegant residential streets, museums, upscale neighborhood'
  },
  'newham': {
    url: 'https://images.unsplash.com/photo-1542344539-7c37f92e1b2e?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Olympic Park photography: Queen Elizabeth Olympic Park, modern architecture, sports venues'
  },
  'redbridge': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional suburban London photography: residential areas, parks, local community'
  },
  'havering': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional outer London photography: suburban areas, green spaces, residential neighborhoods'
  },
  'shoreditch': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Shoreditch nightlife photography: trendy bars, street art, creative scene, urban vibe'
  },
  'soho': {
    url: 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Soho photography: neon lights, entertainment district, vibrant nightlife'
  },
  'covent-garden': {
    url: 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Covent Garden photography: historic market, street performers, cultural hub'
  },
  'mayfair': {
    url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Mayfair photography: luxury boutiques, upscale restaurants, elegant architecture'
  },
  'clerkenwell': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Clerkenwell photography: design district, creative spaces, modern architecture'
  },
  'fitzrovia': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Fitzrovia photography: media district, trendy cafes, creative atmosphere'
  },
  'holborn': {
    url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Holborn photography: legal district, historic buildings, business center'
  },
  'london-bridge': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional London Bridge photography: iconic bridge, Thames views, historic architecture'
  },
  'marylebone': {
    url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Marylebone photography: elegant streets, boutique shopping, upscale neighborhood'
  },
  'spitalfields': {
    url: 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Spitalfields Market photography: historic market, street food, creative atmosphere'
  },
  'whitechapel': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Whitechapel photography: diverse community, historic area, cultural mix'
  },
  'borough': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Borough photography: Borough Market, historic buildings, food culture'
  },
  'greenwich': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Greenwich photography: Royal Observatory, historic maritime sites, Greenwich Park'
  },
  'canary-wharf': {
    url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Professional Canary Wharf photography: modern skyscrapers, financial hub, contemporary architecture'
  }
};

// Function to download and process image
async function downloadAndProcessImage(url, outputPath, prompt) {
  try {
    console.log(`📥 Downloading: ${outputPath.split('/').pop()}`);
    console.log(`   Prompt: ${prompt}`);
    
    // Use fetch to download the image
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    
    // Process with Sharp to ensure proper format and size
    await sharp(Buffer.from(buffer))
      .resize(1600, 900, { fit: 'cover', position: 'center' })
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    // Verify file size (should be > 50KB as per requirements)
    const stats = await fs.promises.stat(outputPath);
    if (stats.size < 50000) {
      console.warn(`⚠️  Warning: ${outputPath} is only ${stats.size} bytes, may be too small`);
    } else {
      console.log(`✅ Generated: ${outputPath} (${(stats.size / 1024).toFixed(1)}KB)`);
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${outputPath}:`, error.message);
    throw error;
  }
}

// Function to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Main execution
async function generateProfessionalTiles() {
  console.log('🎨 Generating Professional Tile Images...\n');
  
  // Ensure directories exist
  ensureDir(path.join(baseDir, 'cuisines'));
  ensureDir(path.join(baseDir, 'areas'));
  
  let successCount = 0;
  let errorCount = 0;
  
  // Process cuisine tiles
  console.log('🍽️  Processing Cuisine Tiles...');
  for (const [slug, config] of Object.entries(cuisineImageMappings)) {
    try {
      const outputPath = path.join(baseDir, 'cuisines', `${slug}.webp`);
      await downloadAndProcessImage(config.url, outputPath, config.prompt);
      successCount++;
    } catch (error) {
      console.error(`Failed to generate ${slug}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n🏙️  Processing Area Tiles...');
  // Process area tiles
  for (const [slug, config] of Object.entries(areaImageMappings)) {
    try {
      const outputPath = path.join(baseDir, 'areas', `${slug}.webp`);
      await downloadAndProcessImage(config.url, outputPath, config.prompt);
      successCount++;
    } catch (error) {
      console.error(`Failed to generate ${slug}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Generation Complete:`);
  console.log(`   ✅ Successfully generated: ${successCount} images`);
  console.log(`   ❌ Failed: ${errorCount} images`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All professional tile images generated successfully!');
    console.log('   Ready for commit and deployment.');
  } else {
    console.log(`\n⚠️  ${errorCount} images failed to generate. Please check the errors above.`);
  }
}

// Run the script
generateProfessionalTiles().catch(console.error);
