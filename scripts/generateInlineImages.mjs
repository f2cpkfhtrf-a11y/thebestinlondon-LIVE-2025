#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Inline image specifications for each blog post
const inlineImageSpecs = {
  'halal-restaurants-ilford-lane': [
    {
      alt: 'Ilford Lane street food stalls bustling with activity',
      caption: 'Ilford Lane\'s buzzing late-night dining scene',
      src: '/inline/ilford-food-market.webp',
      position: 'after-h2-ilford-phenomenon'
    },
    {
      alt: 'Traditional Pakistani restaurant interior with warm lighting',
      caption: 'The authentic atmosphere that makes Ilford Lane special',
      src: '/inline/ilford-restaurant-interior.webp',
      position: 'after-h2-legends'
    }
  ],
  'romantic-restaurants-london': [
    {
      alt: 'Candlelit romantic dinner table with elegant setting',
      caption: 'Intimate dining experiences that create lasting memories',
      src: '/inline/romantic-candlelit-table.webp',
      position: 'after-h2-romantic-experience'
    },
    {
      alt: 'London rooftop restaurant with city skyline view',
      caption: 'Breathtaking views that elevate the romantic dining experience',
      src: '/inline/london-rooftop-dining.webp',
      position: 'after-h2-location-matters'
    }
  ],
  'late-night-restaurants-london': [
    {
      alt: 'London night skyline with neon lights and bustling streets',
      caption: 'London\'s vibrant late-night dining scene comes alive after dark',
      src: '/inline/london-night-skyline.webp',
      position: 'after-h2-late-night-scene'
    },
    {
      alt: 'Busy late-night restaurant with warm lighting',
      caption: 'The energy and atmosphere of London\'s late-night dining',
      src: '/inline/late-night-restaurant.webp',
      position: 'after-h2-insider-tips'
    }
  ],
  'soho-late-night-restaurants-london': [
    {
      alt: 'Soho street scene with neon signs and vibrant nightlife',
      caption: 'Soho\'s electric atmosphere draws diners well into the night',
      src: '/inline/soho-nightlife.webp',
      position: 'after-h2-soho-experience'
    },
    {
      alt: 'Trendy Soho restaurant with modern interior design',
      caption: 'Contemporary dining spaces that define Soho\'s culinary identity',
      src: '/inline/soho-modern-restaurant.webp',
      position: 'after-h2-trendy-spots'
    }
  ],
  'best-restaurants-near-covent-garden': [
    {
      alt: 'Covent Garden terrace dining with elegant outdoor setting',
      caption: 'Al fresco dining in one of London\'s most picturesque locations',
      src: '/inline/covent-garden-terrace.webp',
      position: 'after-h2-covent-garden-charm'
    },
    {
      alt: 'Historic Covent Garden market with restaurant facades',
      caption: 'The historic charm that makes Covent Garden dining unforgettable',
      src: '/inline/covent-garden-historic.webp',
      position: 'after-h2-historic-elegance'
    }
  ]
};

// Create placeholder inline images
const createInlineImage = async (slug, imageSpec) => {
  const imagePath = path.join(projectRoot, 'public', 'inline', path.basename(imageSpec.src));
  const imageDir = path.dirname(imagePath);
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  
  // Create placeholder image data
  const placeholderData = `Inline Image: ${imageSpec.alt}`;
  
  try {
    fs.writeFileSync(imagePath, placeholderData);
    console.log(`✅ Created inline image: ${imageSpec.src}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating ${imageSpec.src}:`, error.message);
    return false;
  }
};

// Enhance blog content with inline images
const enhanceBlogContent = async (slug, imageSpecs) => {
  const blogPath = path.join(projectRoot, 'content', 'blog-seo', 'v2', `${slug}.md`);
  
  if (!fs.existsSync(blogPath)) {
    console.log(`⚠️  Blog file not found: ${blogPath}`);
    return false;
  }
  
  try {
    const content = fs.readFileSync(blogPath, 'utf8');
    let enhancedContent = content;
    
    // Add inline images at specified positions
    imageSpecs.forEach((imageSpec, index) => {
      const imageHtml = `
<figure class="my-10">
  <img 
    src="${imageSpec.src}" 
    alt="${imageSpec.alt}" 
    class="rounded-2xl shadow-lg border border-[#222] hover:scale-105 transition-all duration-500 ease-out"
  />
  <figcaption class="text-[#c6a04c]/80 italic text-sm mt-2 text-center">
    ${imageSpec.caption}
  </figcaption>
</figure>
`;
      
      // Insert after specific headings (simplified approach)
      if (index === 0) {
        // Insert after first h2
        enhancedContent = enhancedContent.replace(
          /(## [^\n]+\n)/,
          `$1\n${imageHtml}\n`
        );
      } else if (index === 1) {
        // Insert after second h2
        const h2Matches = enhancedContent.match(/## [^\n]+\n/g);
        if (h2Matches && h2Matches.length > 1) {
          const secondH2Index = enhancedContent.indexOf(h2Matches[1]) + h2Matches[1].length;
          enhancedContent = enhancedContent.slice(0, secondH2Index) + 
                          `\n${imageHtml}\n` + 
                          enhancedContent.slice(secondH2Index);
        }
      }
    });
    
    // Write enhanced content back
    fs.writeFileSync(blogPath, enhancedContent);
    console.log(`✅ Enhanced blog content: ${slug}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error enhancing ${slug}:`, error.message);
    return false;
  }
};

// Generate all inline images and enhance content
const generateInlineImages = async () => {
  console.log('🖼️  Starting inline image generation...');
  console.log('=====================================');
  
  const results = [];
  
  for (const [slug, imageSpecs] of Object.entries(inlineImageSpecs)) {
    console.log(`\n📝 Processing: ${slug}`);
    
    // Create inline images
    for (const imageSpec of imageSpecs) {
      const success = await createInlineImage(slug, imageSpec);
      results.push({ slug, imageSpec, success });
    }
    
    // Enhance blog content
    await enhanceBlogContent(slug, imageSpecs);
  }
  
  console.log('\n📊 Inline Image Summary:');
  console.log('========================');
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`🎯 Generated ${successCount}/${totalCount} inline images`);
  
  // Group by blog post
  const bySlug = {};
  results.forEach(({ slug, imageSpec, success }) => {
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push({ imageSpec, success });
  });
  
  Object.entries(bySlug).forEach(([slug, images]) => {
    const successCount = images.filter(img => img.success).length;
    console.log(`📄 ${slug}: ${successCount}/${images.length} images`);
  });
  
  return results;
};

// Run the generation
generateInlineImages().then(() => {
  console.log('\n🚀 Inline image generation complete!');
}).catch(error => {
  console.error('❌ Generation failed:', error);
  process.exit(1);
});
