#!/usr/bin/env node
/**
 * Comprehensive SEO Enhancement for Page 1 Rankings
 * Optimizes keywords, meta tags, structured data, and content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Target keywords for page 1 rankings
const TARGET_KEYWORDS = {
  primary: [
    'best restaurants London',
    'London restaurants',
    'best restaurants in London',
    'top restaurants London',
    'London dining guide'
  ],
  secondary: [
    'restaurants near me',
    'halal restaurants London',
    'vegan restaurants London',
    'fine dining London',
    'indian restaurants London',
    'italian restaurants London',
    'japanese restaurants London'
  ],
  longTail: [
    'best halal restaurants London 2025',
    'best vegan restaurants London 2025',
    'restaurants London with reviews',
    'London restaurant guide',
    'where to eat in London',
    'best food in London'
  ]
};

function enhanceHomepageSEO() {
  console.log('📝 Enhancing homepage SEO...\n');
  
  const homepagePath = path.join(ROOT, 'pages/index.js');
  let content = fs.readFileSync(homepagePath, 'utf8');
  
  // Optimize title - include primary keyword
  const oldTitle = /<title>([^<]+)<\/title>/;
  const newTitle = '<title>Best Restaurants London 2025 | Top Rated London Restaurants | The Best in London</title>';
  
  // Optimize meta description - include keywords naturally
  const oldDesc = /<meta name="description" content="([^"]+)"/;
  const newDesc = '<meta name="description" content="Discover the best restaurants in London 2025. Find top-rated London restaurants, halal restaurants, vegan restaurants, and fine dining. 760+ verified restaurants with real reviews. Your complete London dining guide."';
  
  // Update keywords
  const oldKeywords = /<meta name="keywords" content="([^"]+)"/;
  const newKeywords = '<meta name="keywords" content="best restaurants London, London restaurants, best restaurants in London, top restaurants London, halal restaurants London, vegan restaurants London, fine dining London, Indian restaurants London, Italian restaurants London, Japanese restaurants London, restaurant guide London, where to eat London, best food London"';
  
  content = content.replace(oldTitle, newTitle);
  content = content.replace(oldDesc, newDesc);
  content = content.replace(oldKeywords, newKeywords);
  
  // Enhance H1 with keyword
  const oldH1 = /title="([^"]+)"/;
  content = content.replace(/title="Discover London's Finest Restaurants"/, 'title="Best Restaurants in London 2025"');
  
  fs.writeFileSync(homepagePath, content, 'utf8');
  console.log('✅ Homepage SEO enhanced');
}

function generateEnhancedStructuredData() {
  console.log('\n📊 Generating enhanced structured data...\n');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Best in London",
    "alternateName": "Best Restaurants London",
    "description": "London's premier dining guide featuring 760+ verified restaurants. Find the best restaurants in London, halal restaurants, vegan restaurants, and fine dining.",
    "url": "https://www.thebestinlondon.co.uk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.thebestinlondon.co.uk/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thebestinlondon.co.uk/logo-compact.svg",
        "width": 512,
        "height": 512
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Best Restaurants London",
          "url": "https://www.thebestinlondon.co.uk/restaurants"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Halal Restaurants London",
          "url": "https://www.thebestinlondon.co.uk/best-halal-restaurants-london"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Vegan Restaurants London",
          "url": "https://www.thebestinlondon.co.uk/vegan-restaurants-london"
        }
      ]
    }
  };
  
  console.log('✅ Enhanced structured data ready');
  return structuredData;
}

console.log('🚀 SEO ENHANCEMENT FOR PAGE 1 RANKINGS\n');
console.log('Target Keywords:');
console.log('  Primary:', TARGET_KEYWORDS.primary.join(', '));
console.log('  Secondary:', TARGET_KEYWORDS.secondary.join(', '));
console.log('\n');

enhanceHomepageSEO();
const structuredData = generateEnhancedStructuredData();

console.log('\n✅ SEO enhancement complete!');
console.log('\n📋 Next Steps:');
console.log('  1. Update homepage with enhanced structured data');
console.log('  2. Add semantic HTML (H1, H2) with keywords');
console.log('  3. Enhance internal linking');
console.log('  4. Add FAQ schema if applicable');
console.log('  5. Optimize cuisine/area pages with location keywords');

