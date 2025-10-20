#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base directory
const baseDir = path.join(__dirname, '..', 'public', 'images', 'tiles');

// Professional, high-quality image mappings for cuisine tiles with hyperspecific search terms
const cuisineImageMappings = {
  'british': {
    url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=900&fit=crop',
    prompt: 'British fish and chips traditional english breakfast roast dinner yorkshire pudding'
  },
  'indian': {
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=900&fit=crop',
    prompt: 'Chicken tikka masala curry indian restaurant naan bread indian spices'
  },
  'italian': {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=900&fit=crop',
    prompt: 'Spaghetti carbonara margherita pizza authentic italian pasta italian restaurant'
  },
  'japanese': {
    url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1600&h=900&fit=crop',
    prompt: 'Nigiri sushi sashimi ramen noodles japanese cuisine izakaya'
  },
  'turkish': {
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&h=900&fit=crop',
    prompt: 'Doner kebab shish turkish grill mezze turkish restaurant'
  },
  'thai': {
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1600&h=900&fit=crop',
    prompt: 'Pad thai noodles green curry thai restaurant thai cuisine'
  },
  'mexican': {
    url: 'https://images.unsplash.com/photo-1565299585323-38174c4a87d8?w=1600&h=900&fit=crop',
    prompt: 'Beef tacos authentic mexican restaurant mexican cuisine burritos'
  },
  'korean': {
    url: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=1600&h=900&fit=crop',
    prompt: 'Korean bbq bulgogi kimchi side dishes korean restaurant'
  },
  'french': {
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&h=900&fit=crop',
    prompt: 'Croissant french pastry paris cafe french cuisine bistro'
  },
  'chinese': {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=1600&h=900&fit=crop',
    prompt: 'Dim sum dumplings chinese noodles chinese restaurant stir fry'
  },
  'spanish': {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1600&h=900&fit=crop',
    prompt: 'Seafood paella spanish tapas spanish cuisine sangria'
  },
  'caribbean': {
    url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=1600&h=900&fit=crop',
    prompt: 'Jerk chicken rice peas caribbean cuisine caribbean restaurant'
  },
  'mediterranean': {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop',
    prompt: 'Greek salad mediterranean seafood mezze mediterranean restaurant'
  },
  'modern-european': {
    url: 'https://images.unsplash.com/photo-1553521041-d168efeecd30?w=1600&h=900&fit=crop',
    prompt: 'Fine dining plated dish michelin star modern european restaurant'
  },
  'lebanese': {
    url: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=1600&h=900&fit=crop',
    prompt: 'Lebanese mezze platters hummus falafel lebanese restaurant'
  },
  'vegan': {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop',
    prompt: 'Vegan cuisine plant based dishes fresh vegetables healthy'
  },
  'vegetarian': {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&h=900&fit=crop',
    prompt: 'Vegetarian dishes fresh vegetables plant based cuisine'
  },
  'halal': {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=900&fit=crop',
    prompt: 'Halal restaurant middle eastern food halal cuisine london'
  },
  'bakery': {
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600&h=900&fit=crop',
    prompt: 'Fresh bread artisan bakery pastries cakes bakery display'
  },
  'burgers': {
    url: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=1600&h=900&fit=crop',
    prompt: 'Gourmet burgers gourmet burger restaurant premium beef patty'
  },
  'cafe': {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop',
    prompt: 'Specialty coffee latte art cafe interior coffee shop'
  },
  'desserts': {
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&h=900&fit=crop',
    prompt: 'High end desserts pastries sweet treats dessert platter'
  },
  'pizza': {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=900&fit=crop',
    prompt: 'Traditional pizza wood fired oven fresh mozzarella pizza restaurant'
  },
  'seafood': {
    url: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=1600&h=900&fit=crop',
    prompt: 'Fresh fish shellfish seafood restaurant ocean to table'
  },
  'steakhouse': {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&h=900&fit=crop',
    prompt: 'Premium cuts steakhouse grilled to perfection fine dining steak'
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
    prompt: 'Canary wharf towers london docklands tower hamlets london financial district'
  },
  'camden': {
    url: 'https://images.unsplash.com/photo-1544919980-2a84fe0ee0af?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Camden lock market london stalls camden market london street scene'
  },
  'hackney': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Dalston london hackney street market hackney london neighborhood'
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
    prompt: 'Ilford high street london redbridge redbridge london neighborhood street'
  },
  'havering': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Romford market london havering havering borough london street'
  },
  'hackney': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&crop=center',
    prompt: 'Dalston london hackney street market hackney london neighborhood'
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

// Page hero image mappings for main pages
const heroImageMappings = {
  'restaurants-hero': {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
    prompt: 'London restaurant interior fine dining elegant restaurant dining room'
  },
  'areas-hero': {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop',
    prompt: 'London neighborhoods map aerial city london skyline overview'
  },
  'cuisines-hero': {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
    prompt: 'International food variety multicultural cuisine diverse restaurant foods'
  },
  'halal-hero': {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
    prompt: 'Halal restaurant london middle eastern food halal cuisine london'
  }
};

// Function to download and process image
async function downloadAndProcessImage(url, outputPath, prompt, isHero = false) {
  try {
    console.log(`📥 Downloading: ${outputPath.split('/').pop()}`);
    console.log(`   Prompt: ${prompt}`);
    
    // Use fetch to download the image
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    
    // Set dimensions based on whether it's a hero image or tile
    const width = isHero ? 1920 : 1600;
    const height = isHero ? 1080 : 900;
    
    // Process with Sharp to ensure proper format and size
    await sharp(Buffer.from(buffer))
      .resize(width, height, { fit: 'cover', position: 'center' })
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

// Function to generate page hero images
async function generatePageHeroes() {
  console.log('\n🖼️  Generating Page Hero Images...');
  
  // Ensure heroes directory exists
  const heroesDir = path.join(__dirname, '..', 'public', 'images', 'heroes', 'pages');
  ensureDir(heroesDir);
  
  let heroSuccessCount = 0;
  let heroErrorCount = 0;
  
  for (const [slug, config] of Object.entries(heroImageMappings)) {
    try {
      const outputPath = path.join(heroesDir, `${slug}.webp`);
      await downloadAndProcessImage(config.url, outputPath, config.prompt, true); // isHero = true
      heroSuccessCount++;
    } catch (error) {
      console.error(`Failed to generate hero ${slug}:`, error.message);
      heroErrorCount++;
    }
  }
  
  console.log(`\n📊 Hero Generation Complete:`);
  console.log(`   ✅ Successfully generated: ${heroSuccessCount} hero images`);
  console.log(`   ❌ Failed: ${heroErrorCount} hero images`);
  
  return { heroSuccessCount, heroErrorCount };
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
  
  // Generate page heroes
  const { heroSuccessCount, heroErrorCount } = await generatePageHeroes();
  
  console.log(`\n📊 Generation Complete:`);
  console.log(`   ✅ Tiles: ${successCount} images`);
  console.log(`   ✅ Heroes: ${heroSuccessCount} images`);
  console.log(`   ❌ Failed tiles: ${errorCount} images`);
  console.log(`   ❌ Failed heroes: ${heroErrorCount} images`);
  
  if (errorCount === 0 && heroErrorCount === 0) {
    console.log('\n🎉 All professional images generated successfully!');
    console.log('   Ready for commit and deployment.');
  } else {
    console.log(`\n⚠️  ${errorCount + heroErrorCount} images failed to generate. Please check the errors above.`);
  }
}

// Run the script
generateProfessionalTiles().catch(console.error);
