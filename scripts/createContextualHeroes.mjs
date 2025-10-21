#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Blog posts and their contextual image requirements
const blogPosts = [
  {
    slug: 'halal-restaurants-ilford-lane',
    context: 'Ilford Lane street food market London night scene',
    keywords: ['ilford', 'london', 'street food', 'halal', 'night market', 'restaurants']
  },
  {
    slug: 'late-night-restaurants-london',
    context: 'London skyline at night restaurants neon lights',
    keywords: ['london', 'night', 'skyline', 'restaurants', 'neon', 'dining']
  },
  {
    slug: 'romantic-restaurants-london',
    context: 'Romantic London restaurant candlelight dining',
    keywords: ['london', 'romantic', 'restaurant', 'candlelight', 'dining', 'couple']
  },
  {
    slug: 'best-restaurants-near-covent-garden',
    context: 'Covent Garden London restaurants terrace dining',
    keywords: ['covent garden', 'london', 'restaurants', 'terrace', 'dining', 'market']
  },
  {
    slug: 'soho-late-night-restaurants-london',
    context: 'Soho London nightlife bars restaurants neon street',
    keywords: ['soho', 'london', 'nightlife', 'bars', 'restaurants', 'neon']
  }
];

// Create high-quality SVG placeholders with contextual designs
const createContextualHeroImage = async (blogPost) => {
  const imagePath = path.join(projectRoot, 'public', 'hero_v2', `${blogPost.slug}.webp`);
  
  // Create contextual SVG based on the blog post theme
  let svgContent = '';
  
  switch (blogPost.slug) {
    case 'halal-restaurants-ilford-lane':
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#2a2a2a;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
          <pattern id="foodPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="#D4AF37" opacity="0.3"/>
            <circle cx="60" cy="40" r="2" fill="#D4AF37" opacity="0.4"/>
            <circle cx="80" cy="20" r="2.5" fill="#D4AF37" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <rect width="1920" height="1080" fill="url(#foodPattern)" opacity="0.1"/>
        <text x="960" y="400" font-family="Arial, sans-serif" font-size="64" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-weight="bold">ILFORD LANE</text>
        <text x="960" y="480" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Halal Street Food Scene</text>
        <text x="960" y="520" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">London's Premier Halal Dining</text>
        <rect x="760" y="600" width="400" height="2" fill="#D4AF37" opacity="0.6"/>
      </svg>`;
      break;
      
    case 'late-night-restaurants-london':
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#16213e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
          <pattern id="cityPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="0" y="60" width="20" height="20" fill="#D4AF37" opacity="0.2"/>
            <rect x="30" y="40" width="15" height="40" fill="#D4AF37" opacity="0.3"/>
            <rect x="60" y="50" width="20" height="30" fill="#D4AF37" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <rect width="1920" height="1080" fill="url(#cityPattern)" opacity="0.1"/>
        <text x="960" y="400" font-family="Arial, sans-serif" font-size="64" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-weight="bold">LATE NIGHT LONDON</text>
        <text x="960" y="480" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">24/7 Dining Scene</text>
        <text x="960" y="520" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Where London Never Sleeps</text>
        <rect x="760" y="600" width="400" height="2" fill="#D4AF37" opacity="0.6"/>
      </svg>`;
      break;
      
    case 'romantic-restaurants-london':
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a0a0a;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#2a1a1a;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#1a0a0a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
          <pattern id="romancePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="15" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.3"/>
            <circle cx="30" cy="30" r="8" fill="#D4AF37" opacity="0.2"/>
            <circle cx="30" cy="30" r="3" fill="#D4AF37" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <rect width="1920" height="1080" fill="url(#romancePattern)" opacity="0.1"/>
        <text x="960" y="400" font-family="Arial, sans-serif" font-size="64" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-weight="bold">ROMANTIC LONDON</text>
        <text x="960" y="480" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Intimate Dining Experiences</text>
        <text x="960" y="520" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Where Love Meets Cuisine</text>
        <rect x="760" y="600" width="400" height="2" fill="#D4AF37" opacity="0.6"/>
      </svg>`;
      break;
      
    case 'best-restaurants-near-covent-garden':
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a0a;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#2a2a1a;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#1a1a0a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
          <pattern id="marketPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect x="10" y="10" width="20" height="20" fill="#D4AF37" opacity="0.2"/>
            <rect x="40" y="20" width="15" height="15" fill="#D4AF37" opacity="0.3"/>
            <rect x="70" y="15" width="20" height="20" fill="#D4AF37" opacity="0.2"/>
            <circle cx="50" cy="70" r="8" fill="#D4AF37" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <rect width="1920" height="1080" fill="url(#marketPattern)" opacity="0.1"/>
        <text x="960" y="400" font-family="Arial, sans-serif" font-size="64" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-weight="bold">COVENT GARDEN</text>
        <text x="960" y="480" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Historic Dining District</text>
        <text x="960" y="520" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">London's Culinary Heart</text>
        <rect x="760" y="600" width="400" height="2" fill="#D4AF37" opacity="0.6"/>
      </svg>`;
      break;
      
    case 'soho-late-night-restaurants-london':
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a1a;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#2a1a3e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
          <pattern id="neonPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect x="20" y="20" width="80" height="4" fill="#D4AF37" opacity="0.4"/>
            <rect x="20" y="40" width="60" height="3" fill="#D4AF37" opacity="0.3"/>
            <rect x="20" y="60" width="70" height="3" fill="#D4AF37" opacity="0.4"/>
            <circle cx="100" cy="30" r="8" fill="#D4AF37" opacity="0.3"/>
            <circle cx="100" cy="60" r="6" fill="#D4AF37" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <rect width="1920" height="1080" fill="url(#neonPattern)" opacity="0.1"/>
        <text x="960" y="400" font-family="Arial, sans-serif" font-size="64" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-weight="bold">SOHO NIGHTLIFE</text>
        <text x="960" y="480" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Late Night Dining Scene</text>
        <text x="960" y="520" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Where London Comes Alive</text>
        <rect x="760" y="600" width="400" height="2" fill="#D4AF37" opacity="0.6"/>
      </svg>`;
      break;
      
    default:
      svgContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad1)"/>
        <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">${blogPost.slug.replace(/-/g, ' ').toUpperCase()}</text>
        <text x="960" y="600" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Cinematic Hero Image</text>
      </svg>`;
  }
  
  try {
    fs.writeFileSync(imagePath, svgContent);
    console.log(`✅ Created contextual hero: ${blogPost.slug}.webp`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating ${blogPost.slug}.webp:`, error.message);
    return false;
  }
};

// Run the contextual hero creation
const createContextualHeroes = async () => {
  console.log('🎨 Creating contextual hero images...');
  console.log('=====================================');
  
  const results = [];
  
  for (const blogPost of blogPosts) {
    console.log(`\n📝 Processing: ${blogPost.slug}`);
    console.log(`   Context: ${blogPost.context}`);
    
    const result = await createContextualHeroImage(blogPost);
    results.push({ slug: blogPost.slug, success: result });
  }
  
  console.log('\n📊 Contextual Hero Summary:');
  console.log('============================');
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`🎯 Created ${successCount}/${totalCount} contextual heroes`);
  
  results.forEach(({ slug, success }) => {
    const status = success ? '✅' : '❌';
    console.log(`${status} ${slug}`);
  });
  
  return results;
};

// Run the creation
createContextualHeroes().then(() => {
  console.log('\n🚀 Contextual hero images complete!');
}).catch(error => {
  console.error('❌ Creation failed:', error);
  process.exit(1);
});
