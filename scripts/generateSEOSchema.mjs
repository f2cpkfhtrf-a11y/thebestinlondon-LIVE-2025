#!/usr/bin/env node

/**
 * SEO Schema Optimization Script
 * Adds JSON-LD structured data for cuisine and area pages
 * Improves search engine understanding and local SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cuisine-specific schema data
const CUISINE_SCHEMA = {
  'turkish': {
    name: 'Turkish Restaurants in London',
    description: 'Discover the best Turkish restaurants in London featuring authentic kebabs, mezze, and traditional Ottoman cuisine.',
    keywords: ['Turkish restaurants London', 'kebab London', 'mezze London', 'Turkish cuisine London']
  },
  'italian': {
    name: 'Italian Restaurants in London', 
    description: 'Find the finest Italian restaurants in London serving authentic pasta, pizza, and Mediterranean cuisine.',
    keywords: ['Italian restaurants London', 'pasta London', 'pizza London', 'Italian cuisine London']
  },
  'indian': {
    name: 'Indian Restaurants in London',
    description: 'Explore the best Indian restaurants in London featuring authentic curries, tandoori, and regional specialties.',
    keywords: ['Indian restaurants London', 'curry London', 'tandoori London', 'Indian cuisine London']
  },
  'japanese': {
    name: 'Japanese Restaurants in London',
    description: 'Discover top Japanese restaurants in London serving fresh sushi, ramen, and traditional izakaya cuisine.',
    keywords: ['Japanese restaurants London', 'sushi London', 'ramen London', 'Japanese cuisine London']
  },
  'french': {
    name: 'French Restaurants in London',
    description: 'Find the finest French restaurants in London offering elegant fine dining and classic bistro cuisine.',
    keywords: ['French restaurants London', 'fine dining London', 'French cuisine London', 'bistro London']
  }
};

function generateCuisineSchema(cuisine) {
  const schemaData = CUISINE_SCHEMA[cuisine];
  if (!schemaData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": schemaData.name,
    "description": schemaData.description,
    "url": `https://www.thebestinlondon.co.uk/${cuisine}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Best ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Restaurants in London`,
      "description": schemaData.description,
      "numberOfItems": "20+",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": `Top ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Restaurants`
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thebestinlondon.co.uk/"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Cuisines",
          "item": "https://www.thebestinlondon.co.uk/cuisines"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": schemaData.name,
          "item": `https://www.thebestinlondon.co.uk/${cuisine}`
        }
      ]
    },
    "keywords": schemaData.keywords.join(', '),
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "url": "https://www.thebestinlondon.co.uk",
      "logo": "https://www.thebestinlondon.co.uk/logo.png"
    }
  };
}

function generateAreaSchema(area, cuisine) {
  const areaName = area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const cuisineName = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best ${cuisineName} Restaurants in ${areaName}`,
    "description": `Discover the top ${cuisineName} restaurants in ${areaName}, London. Expert recommendations and reviews.`,
    "url": `https://www.thebestinlondon.co.uk/best-${cuisine}-in-${area}-2025`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Best ${cuisineName} Restaurants in ${areaName}`,
      "description": `Top-rated ${cuisineName} restaurants in ${areaName}, London`,
      "numberOfItems": "10+",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": `Top ${cuisineName} Restaurants in ${areaName}`
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thebestinlondon.co.uk/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Areas",
          "item": "https://www.thebestinlondon.co.uk/areas"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${cuisineName} in ${areaName}`,
          "item": `https://www.thebestinlondon.co.uk/best-${cuisine}-in-${area}-2025`
        }
      ]
    },
    "keywords": `${cuisineName} restaurants ${areaName}, best ${cuisineName} ${areaName}, ${cuisineName} cuisine ${areaName}`,
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "url": "https://www.thebestinlondon.co.uk",
      "logo": "https://www.thebestinlondon.co.uk/logo.png"
    }
  };
}

async function generateSchemaFiles() {
  console.log('🚀 Starting SEO Schema Optimization...');
  console.log('=====================================');
  
  // Create schema directory
  const schemaDir = path.join(__dirname, '..', 'public', 'schema');
  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir, { recursive: true });
    console.log('✅ Created /public/schema/ directory');
  }
  
  const results = {
    cuisineSchemas: [],
    areaSchemas: [],
    errors: []
  };
  
  // Generate cuisine schemas
  console.log('\n📊 Generating cuisine schemas...');
  for (const cuisine of Object.keys(CUISINE_SCHEMA)) {
    try {
      const schema = generateCuisineSchema(cuisine);
      if (schema) {
        const schemaPath = path.join(schemaDir, `${cuisine}-schema.json`);
        fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
        console.log(`  ✅ Generated ${cuisine}-schema.json`);
        results.cuisineSchemas.push(cuisine);
      }
    } catch (error) {
      console.log(`  ❌ Error generating ${cuisine} schema: ${error.message}`);
      results.errors.push(`${cuisine}: ${error.message}`);
    }
  }
  
  // Generate area schemas for high-priority combinations
  console.log('\n📊 Generating area schemas...');
  const areaCuisineCombos = [
    { area: 'central-london', cuisine: 'indian' },
    { area: 'central-london', cuisine: 'italian' },
    { area: 'tower-hamlets', cuisine: 'chinese' },
    { area: 'tower-hamlets', cuisine: 'indian' }
  ];
  
  for (const combo of areaCuisineCombos) {
    try {
      const schema = generateAreaSchema(combo.area, combo.cuisine);
      const filename = `best-${combo.cuisine}-in-${combo.area}-2025-schema.json`;
      const schemaPath = path.join(schemaDir, filename);
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
      console.log(`  ✅ Generated ${filename}`);
      results.areaSchemas.push(`${combo.cuisine}-${combo.area}`);
    } catch (error) {
      console.log(`  ❌ Error generating ${combo.cuisine}-${combo.area} schema: ${error.message}`);
      results.errors.push(`${combo.cuisine}-${combo.area}: ${error.message}`);
    }
  }
  
  // Generate report
  const reportPath = path.join(__dirname, '..', 'seo', 'reports', `schema-optimization-${new Date().toISOString().split('T')[0]}.md`);
  const report = `# SEO Schema Optimization Report - ${new Date().toISOString().split('T')[0]}

## 🎯 Schema Implementation Summary
**Target:** Improve search engine understanding and local SEO
**Focus:** Cuisine and area pages with structured data

## 📊 Generated Schemas
- **Cuisine Schemas:** ${results.cuisineSchemas.length}
- **Area Schemas:** ${results.areaSchemas.length}
- **Errors:** ${results.errors.length}

## ✅ Cuisine Schemas Generated
${results.cuisineSchemas.map(c => `- ✅ ${c}-schema.json`).join('\n')}

## ✅ Area Schemas Generated
${results.areaSchemas.map(a => `- ✅ ${a}-schema.json`).join('\n')}

## ❌ Errors
${results.errors.map(e => `- ❌ ${e}`).join('\n')}

## 📈 SEO Benefits Expected
- **Better Search Understanding:** Structured data helps search engines understand content
- **Rich Snippets:** Potential for enhanced search results
- **Local SEO Boost:** Area-specific schema improves local search visibility
- **Breadcrumb Navigation:** Improved site structure understanding

## 🔄 Next Steps
1. Integrate schema files into page components
2. Test schema validation with Google's Rich Results Test
3. Monitor search console for schema errors
4. Track organic traffic improvements

Generated at: ${new Date().toISOString()}
`;
  
  fs.writeFileSync(reportPath, report);
  console.log(`\n📊 Schema report saved to: ${reportPath}`);
  
  return results;
}

// Run the script
generateSchemaFiles()
  .then(results => {
    console.log('\n🎉 SEO Schema Optimization Completed!');
    console.log(`✅ Cuisine Schemas: ${results.cuisineSchemas.length}`);
    console.log(`✅ Area Schemas: ${results.areaSchemas.length}`);
    console.log(`❌ Errors: ${results.errors.length}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
