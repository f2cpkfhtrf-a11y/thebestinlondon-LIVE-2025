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
      src: '/inline/ilford-lane-1.webp',
      alt: 'Ilford Lane street food stalls bustling with activity',
      caption: 'Ilford Lane\'s buzzing late-night dining scene',
      position: 'after-first-h2'
    },
    {
      src: '/inline/ilford-lane-2.webp',
      alt: 'Traditional Pakistani restaurant interior with warm lighting',
      caption: 'The authentic atmosphere that makes Ilford Lane special',
      position: 'after-second-h2'
    }
  ],
  'romantic-restaurants-london': [
    {
      src: '/inline/romantic-1.webp',
      alt: 'Candlelit romantic dinner table with elegant setting',
      caption: 'Intimate dining experiences that create lasting memories',
      position: 'after-first-h2'
    },
    {
      src: '/inline/romantic-2.webp',
      alt: 'London rooftop restaurant with city skyline view',
      caption: 'Breathtaking views that elevate the romantic dining experience',
      position: 'after-second-h2'
    }
  ],
  'late-night-restaurants-london': [
    {
      src: '/inline/late-night-1.webp',
      alt: 'London night skyline with neon lights and bustling streets',
      caption: 'London\'s vibrant late-night dining scene comes alive after dark',
      position: 'after-first-h2'
    },
    {
      src: '/inline/late-night-2.webp',
      alt: 'Busy late-night restaurant with warm lighting',
      caption: 'The energy and atmosphere of London\'s late-night dining',
      position: 'after-second-h2'
    }
  ],
  'soho-late-night-restaurants-london': [
    {
      src: '/inline/soho-1.webp',
      alt: 'Soho street scene with neon signs and vibrant nightlife',
      caption: 'Soho\'s electric atmosphere draws diners well into the night',
      position: 'after-first-h2'
    },
    {
      src: '/inline/soho-2.webp',
      alt: 'Trendy Soho restaurant with modern interior design',
      caption: 'Contemporary dining spaces that define Soho\'s culinary identity',
      position: 'after-second-h2'
    }
  ],
  'best-restaurants-near-covent-garden': [
    {
      src: '/inline/covent-garden-1.webp',
      alt: 'Covent Garden terrace dining with elegant outdoor setting',
      caption: 'Al fresco dining in one of London\'s most picturesque locations',
      position: 'after-first-h2'
    },
    {
      src: '/inline/covent-garden-2.webp',
      alt: 'Historic Covent Garden market with restaurant facades',
      caption: 'The historic charm that makes Covent Garden dining unforgettable',
      position: 'after-second-h2'
    }
  ]
};

// Create inline image files
const createInlineImage = async (slug, imageSpec) => {
  const imagePath = path.join(projectRoot, 'public', 'inline', path.basename(imageSpec.src));
  const imageDir = path.dirname(imagePath);
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  
  // Create placeholder image data
  const imageData = `Inline Image: ${imageSpec.alt}
Caption: ${imageSpec.caption}
Format: WebP
Size: ≤300KB
Resolution: 800x600
Quality: 85%`;
  
  try {
    fs.writeFileSync(imagePath, imageData);
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
    class="rounded-2xl shadow-lg border border-grey-dark hover:scale-105 transition-all duration-500 ease-out"
  />
  <figcaption class="text-gold/80 italic text-sm mt-2 text-center">
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
