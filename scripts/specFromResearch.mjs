#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Firecrawl-informed prompting for Omar's Cursor method
 * Generates Claude-Code prompts based on target page types
 */

/**
 * Generate spec prompt for a target page type
 */
async function generateSpecPrompt(pageType) {
  console.log(`🔍 Generating spec prompt for: ${pageType}`);
  
  const reportsDir = path.join(process.cwd(), 'reports');
  const specDir = path.join(reportsDir, 'spec_prompts');
  
  // Ensure directories exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  if (!fs.existsSync(specDir)) {
    fs.mkdirSync(specDir, { recursive: true });
  }
  
  const specs = {
    restaurant: {
      title: 'Restaurant Detail Page',
      keywords: {
        primary: ['restaurant name', 'cuisine type', 'location', 'reviews', 'menu'],
        secondary: ['halal', 'FSA rating', 'price range', 'opening hours', 'contact'],
        volume: 'high',
        difficulty: 'low'
      },
      contentBlocks: [
        'Hero section with image and key stats',
        'About section with description',
        'Menu section with links',
        'Reviews section with ratings',
        'Location section with map and contact',
        'Similar restaurants recommendations'
      ],
      schemaFields: [
        'Restaurant schema with name, image, address, phone, cuisine, priceRange',
        'AggregateRating schema with ratingValue and reviewCount',
        'GeoCoordinates schema with latitude/longitude',
        'BreadcrumbList schema for navigation'
      ],
      internalLinks: [
        'Link to cuisine page',
        'Link to area page',
        'Link to similar restaurants',
        'Link to menu if available'
      ],
      uiComponents: [
        'shadcn/ui Card for restaurant info',
        'shadcn/ui Badge for ratings and badges',
        'shadcn/ui Button for actions',
        'shadcn/ui Separator for sections'
      ]
    },
    blog: {
      title: 'Blog Index Page',
      keywords: {
        primary: ['London restaurants', 'food blog', 'restaurant reviews', 'dining guide'],
        secondary: ['best restaurants', 'food recommendations', 'London dining', 'restaurant tips'],
        volume: 'medium',
        difficulty: 'medium'
      },
      contentBlocks: [
        'Hero section with blog title and description',
        'Featured blog post carousel',
        'Blog post grid with pagination',
        'Search and filter functionality',
        'Category tags and navigation'
      ],
      schemaFields: [
        'Blog schema with name, description, publisher',
        'BlogPosting schema for each post with headline, datePublished, author',
        'Organization schema for publisher info'
      ],
      internalLinks: [
        'Link to individual blog posts',
        'Link to restaurant pages mentioned',
        'Link to cuisine/area pages',
        'Link to related blog posts'
      ],
      uiComponents: [
        'shadcn/ui Card for blog post previews',
        'shadcn/ui Badge for tags and categories',
        'shadcn/ui Input for search',
        'shadcn/ui Select for filtering'
      ]
    },
    cuisine: {
      title: 'Cuisine Collection Page',
      keywords: {
        primary: ['cuisine type', 'restaurants', 'London', 'dining'],
        secondary: ['best cuisine restaurants', 'cuisine near me', 'cuisine delivery', 'cuisine reviews'],
        volume: 'high',
        difficulty: 'low'
      },
      contentBlocks: [
        'Hero section with cuisine title and description',
        'Featured restaurants carousel',
        'Restaurant grid with filtering',
        'Cuisine-specific information',
        'Related cuisines and areas'
      ],
      schemaFields: [
        'CollectionPage schema with name and description',
        'ItemList schema with restaurant items',
        'Restaurant schema for each venue'
      ],
      internalLinks: [
        'Link to individual restaurant pages',
        'Link to area pages',
        'Link to related cuisines',
        'Link to blog posts about cuisine'
      ],
      uiComponents: [
        'shadcn/ui Card for restaurant previews',
        'shadcn/ui Badge for cuisine tags',
        'shadcn/ui Tabs for filtering',
        'shadcn/ui Carousel for featured items'
      ]
    },
    area: {
      title: 'Area Collection Page',
      keywords: {
        primary: ['area name', 'restaurants', 'London', 'dining'],
        secondary: ['restaurants in area', 'area dining guide', 'best restaurants area', 'area food scene'],
        volume: 'high',
        difficulty: 'low'
      },
      contentBlocks: [
        'Hero section with area title and description',
        'Featured restaurants carousel',
        'Restaurant grid with cuisine filtering',
        'Area-specific information and highlights',
        'Related areas and cuisines'
      ],
      schemaFields: [
        'CollectionPage schema with name and description',
        'ItemList schema with restaurant items',
        'Place schema for the area'
      ],
      internalLinks: [
        'Link to individual restaurant pages',
        'Link to cuisine pages',
        'Link to related areas',
        'Link to blog posts about area'
      ],
      uiComponents: [
        'shadcn/ui Card for restaurant previews',
        'shadcn/ui Badge for area tags',
        'shadcn/ui Tabs for filtering',
        'shadcn/ui Map for area visualization'
      ]
    }
  };
  
  const spec = specs[pageType];
  if (!spec) {
    throw new Error(`Unknown page type: ${pageType}`);
  }
  
  // Generate Claude-Code prompt
  const prompt = `# ${spec.title} - Claude-Code Prompt

## Keywords Analysis
- **Primary Keywords**: ${spec.keywords.primary.join(', ')}
- **Secondary Keywords**: ${spec.keywords.secondary.join(', ')}
- **Search Volume**: ${spec.keywords.volume}
- **Keyword Difficulty**: ${spec.keywords.difficulty}

## Content Blocks Required
${spec.contentBlocks.map((block, index) => `${index + 1}. ${block}`).join('\n')}

## Schema.org Fields
${spec.schemaFields.map((field, index) => `${index + 1}. ${field}`).join('\n')}

## Internal Link Strategy
${spec.internalLinks.map((link, index) => `${index + 1}. ${link}`).join('\n')}

## UI Components (shadcn/ui)
${spec.uiComponents.map((component, index) => `${index + 1}. ${component}`).join('\n')}

## Implementation Notes
- Use programmatic SEO with dynamic content generation
- Ensure all images are venue-first (no generic tiles as primary)
- Implement proper schema.org markup for search engines
- Use shadcn/ui components for consistent design
- Ensure mobile-responsive design
- Include proper meta tags and Open Graph data

## Technical Requirements
- Next.js static generation with getStaticProps
- Image optimization with next/image
- Proper error handling and fallbacks
- Performance optimization (Core Web Vitals)
- Accessibility compliance (WCAG 2.1 AA)

## Content Guidelines
- Write compelling, keyword-rich content
- Include local business information
- Add user-generated content (reviews, ratings)
- Ensure content is fresh and regularly updated
- Include call-to-action elements

## SEO Checklist
- [ ] Title tag optimized for primary keywords
- [ ] Meta description under 155 characters
- [ ] Header tags (H1, H2, H3) properly structured
- [ ] Schema.org markup implemented
- [ ] Internal linking strategy executed
- [ ] Image alt tags optimized
- [ ] URL structure clean and descriptive
- [ ] Page load speed optimized
- [ ] Mobile-friendly design
- [ ] Social media meta tags included
`;

  // Write prompt to file
  const filename = `${pageType}_spec.md`;
  const filepath = path.join(specDir, filename);
  fs.writeFileSync(filepath, prompt);
  
  console.log(`✅ Spec prompt generated: ${filepath}`);
  return filepath;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const pageType = process.argv[2];
  if (!pageType) {
    console.error('Usage: node scripts/specFromResearch.mjs <pageType>');
    console.error('Available page types: restaurant, blog, cuisine, area');
    process.exit(1);
  }
  
  generateSpecPrompt(pageType).catch(console.error);
}

export default generateSpecPrompt;

