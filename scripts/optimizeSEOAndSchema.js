const fs = require('fs');
const path = require('path');

// SEO and Schema Optimization
function optimizeSEOAndSchema() {
  console.log('🔍 OPTIMIZING SEO & SCHEMA...\n');
  
  const seoOptimizations = {
    timestamp: new Date().toISOString(),
    metaTags: [],
    schemaMarkup: [],
    sitemapUpdates: [],
    robotsTxtUpdates: [],
    totalOptimizations: 0
  };
  
  // 1. Create comprehensive SEO head component
  const seoHeadPath = path.join(__dirname, '../components/SEOHead.js');
  const seoHeadContent = `import Head from 'next/head';

const SEOHead = ({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  venue = null,
  structuredData = null
}) => {
  // Ensure title is under 60 characters
  const optimizedTitle = title && title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is under 155 characters
  const optimizedDescription = description && description.length > 155 ? description.substring(0, 152) + '...' : description;
  
  // Default values
  const defaultTitle = 'The Best in London - Discover London\'s Finest Restaurants';
  const defaultDescription = 'Find the best restaurants, cafes, and dining experiences in London. From Michelin-starred fine dining to hidden gems, discover London\'s culinary scene.';
  const defaultImage = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=630&fit=crop&crop=center&q=85';
  const defaultUrl = 'https://www.thebestinlondon.co.uk';
  
  const finalTitle = optimizedTitle || defaultTitle;
  const finalDescription = optimizedDescription || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  
  // Generate keywords
  const defaultKeywords = [
    'London restaurants',
    'best restaurants London',
    'fine dining London',
    'restaurant guide London',
    'London food',
    'restaurant reviews London',
    'London dining',
    'restaurant recommendations London'
  ];
  
  const finalKeywords = [...defaultKeywords, ...keywords].join(', ');
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="The Best in London" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="The Best in London" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://maps.googleapis.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
`;
  
  fs.writeFileSync(seoHeadPath, seoHeadContent);
  seoOptimizations.metaTags.push('Created comprehensive SEOHead component');
  
  // 2. Create schema markup utilities
  const schemaMarkupPath = path.join(__dirname, '../utils/schemaMarkup.js');
  const schemaMarkupContent = `// Schema markup utilities for SEO
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Best in London",
    "url": "https://www.thebestinlondon.co.uk",
    "logo": "https://www.thebestinlondon.co.uk/logo.svg",
    "description": "Discover London's finest restaurants, cafes, and dining experiences. From Michelin-starred fine dining to hidden gems.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.thebestinlondon.co.uk/contact"
    },
    "sameAs": [
      "https://www.instagram.com/thebestinlondon",
      "https://www.twitter.com/thebestinlondon"
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Best in London",
    "url": "https://www.thebestinlondon.co.uk",
    "description": "Find the best restaurants, cafes, and dining experiences in London.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.thebestinlondon.co.uk/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateRestaurantSchema(venue) {
  if (!venue) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "description": venue.description || \`\${venue.name} - \${venue.cuisines?.join(', ')} restaurant in \${venue.borough || 'London'}\`,
    "url": \`https://www.thebestinlondon.co.uk/restaurant/\${venue.slug}\`,
    "image": venue.image_url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address?.formatted || venue.vicinity,
      "addressLocality": "London",
      "addressCountry": "GB",
      "postalCode": venue.postcode
    },
    "telephone": venue.phone,
    "website": venue.website,
    "servesCuisine": venue.cuisines || [],
    "priceRange": venue.price_range || "£",
    "aggregateRating": venue.rating ? {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.user_ratings_total || 0,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "openingHours": venue.opening_hours?.weekday_text || [],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": venue.lat,
      "longitude": venue.lng
    }
  };
}

export function generateBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateLocalBusinessSchema(venue) {
  if (!venue) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": venue.name,
    "description": venue.description || \`\${venue.name} - \${venue.cuisines?.join(', ')} restaurant in \${venue.borough || 'London'}\`,
    "url": \`https://www.thebestinlondon.co.uk/restaurant/\${venue.slug}\`,
    "image": venue.image_url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address?.formatted || venue.vicinity,
      "addressLocality": "London",
      "addressCountry": "GB",
      "postalCode": venue.postcode
    },
    "telephone": venue.phone,
    "website": venue.website,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": venue.lat,
      "longitude": venue.lng
    },
    "openingHours": venue.opening_hours?.weekday_text || []
  };
}

export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
`;
  
  fs.writeFileSync(schemaMarkupPath, schemaMarkupContent);
  seoOptimizations.schemaMarkup.push('Created comprehensive schema markup utilities');
  
  // 3. Generate updated sitemap
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://www.thebestinlondon.co.uk/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/restaurants</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/cuisines</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/areas</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/best-halal-restaurants-london</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/nearby</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Restaurant Pages -->
${venuesData.venues.map(venue => `  <url>
    <loc>https://www.thebestinlondon.co.uk/restaurant/${venue.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
  
  <!-- Cuisine Pages -->
  <url>
    <loc>https://www.thebestinlondon.co.uk/indian</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/italian</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/japanese</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/chinese</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/thai</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/turkish</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/vegan</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.thebestinlondon.co.uk/vegetarian</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(sitemapPath, sitemapContent);
  seoOptimizations.sitemapUpdates.push('Generated comprehensive sitemap.xml');
  
  // 4. Update robots.txt
  const robotsTxtPath = path.join(__dirname, '../public/robots.txt');
  const robotsTxtContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.thebestinlondon.co.uk/sitemap.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-pages.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-venues.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-images.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/

# Allow important pages
Allow: /restaurants
Allow: /cuisines
Allow: /areas
Allow: /best-halal-restaurants-london
Allow: /nearby
Allow: /about
Allow: /contact

# Crawl delay
Crawl-delay: 1`;
  
  fs.writeFileSync(robotsTxtPath, robotsTxtContent);
  seoOptimizations.robotsTxtUpdates.push('Updated robots.txt with comprehensive rules');
  
  // 5. Create SEO utilities
  const seoUtilsPath = path.join(__dirname, '../utils/seoUtils.js');
  const seoUtilsContent = `// SEO utility functions
export function generateMetaTitle(title, siteName = 'The Best in London') {
  if (!title) return siteName;
  if (title.length <= 60) return title;
  return title.substring(0, 57) + '...';
}

export function generateMetaDescription(description, maxLength = 155) {
  if (!description) return 'Discover London\'s finest restaurants, cafes, and dining experiences. From Michelin-starred fine dining to hidden gems.';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

export function generateKeywords(venue = null, additionalKeywords = []) {
  const baseKeywords = [
    'London restaurants',
    'best restaurants London',
    'fine dining London',
    'restaurant guide London',
    'London food',
    'restaurant reviews London',
    'London dining',
    'restaurant recommendations London'
  ];
  
  if (venue) {
    const venueKeywords = [
      \`\${venue.name} London\`,
      \`\${venue.name} restaurant\`,
      \`\${venue.cuisines?.join(' ')} restaurant London\`,
      \`restaurants \${venue.borough}\`,
      \`\${venue.borough} restaurants\`,
      \`\${venue.name} \${venue.borough}\`
    ];
    
    return [...baseKeywords, ...venueKeywords, ...additionalKeywords].join(', ');
  }
  
  return [...baseKeywords, ...additionalKeywords].join(', ');
}

export function generateCanonicalUrl(path, baseUrl = 'https://www.thebestinlondon.co.uk') {
  return \`\${baseUrl}\${path.startsWith('/') ? path : '/' + path}\`;
}

export function generateOpenGraphImage(venue = null, defaultImage = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=630&fit=crop&crop=center&q=85') {
  if (venue && venue.image_url) {
    // Convert to Open Graph format (1200x630)
    if (venue.image_url.includes('unsplash.com')) {
      return venue.image_url.replace(/w=\d+&h=\d+/, 'w=1200&h=630');
    }
    return venue.image_url;
  }
  return defaultImage;
}

export function generateBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ];
  
  let currentPath = '';
  segments.forEach(segment => {
    currentPath += \`/\${segment}\`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name: name,
      url: currentPath
    });
  });
  
  return breadcrumbs;
}

export function validateSEOData(data) {
  const errors = [];
  
  if (!data.title) {
    errors.push('Title is required');
  } else if (data.title.length > 60) {
    errors.push('Title should be under 60 characters');
  }
  
  if (!data.description) {
    errors.push('Description is required');
  } else if (data.description.length > 155) {
    errors.push('Description should be under 155 characters');
  }
  
  if (!data.url) {
    errors.push('URL is required');
  }
  
  if (!data.image) {
    errors.push('Image is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}
`;
  
  fs.writeFileSync(seoUtilsPath, seoUtilsContent);
  seoOptimizations.metaTags.push('Created SEO utility functions');
  
  // 6. Generate summary
  seoOptimizations.totalOptimizations = 
    seoOptimizations.metaTags.length + 
    seoOptimizations.schemaMarkup.length + 
    seoOptimizations.sitemapUpdates.length + 
    seoOptimizations.robotsTxtUpdates.length;
  
  console.log('\n📊 SEO & SCHEMA OPTIMIZATION SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Meta Tags Optimizations: ${seoOptimizations.metaTags.length}`);
  console.log(`Schema Markup Optimizations: ${seoOptimizations.schemaMarkup.length}`);
  console.log(`Sitemap Updates: ${seoOptimizations.sitemapUpdates.length}`);
  console.log(`Robots.txt Updates: ${seoOptimizations.robotsTxtUpdates.length}`);
  console.log(`Total Optimizations: ${seoOptimizations.totalOptimizations}`);
  
  console.log('\n🏷️ META TAGS:');
  seoOptimizations.metaTags.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n📋 SCHEMA MARKUP:');
  seoOptimizations.schemaMarkup.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n🗺️ SITEMAP UPDATES:');
  seoOptimizations.sitemapUpdates.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n🤖 ROBOTS.TXT UPDATES:');
  seoOptimizations.robotsTxtUpdates.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  // 7. Save report
  const reportPath = path.join(__dirname, '../reports/seo-schema.md');
  const reportContent = `# SEO & Schema Optimization Report

## Summary
- **Optimization Date**: ${seoOptimizations.timestamp}
- **Meta Tags Optimizations**: ${seoOptimizations.metaTags.length}
- **Schema Markup Optimizations**: ${seoOptimizations.schemaMarkup.length}
- **Sitemap Updates**: ${seoOptimizations.sitemapUpdates.length}
- **Robots.txt Updates**: ${seoOptimizations.robotsTxtUpdates.length}
- **Total Optimizations**: ${seoOptimizations.totalOptimizations}

## Meta Tags Optimizations
${seoOptimizations.metaTags.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Schema Markup Optimizations
${seoOptimizations.schemaMarkup.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Sitemap Updates
${seoOptimizations.sitemapUpdates.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Robots.txt Updates
${seoOptimizations.robotsTxtUpdates.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## SEO Targets
- **Title Length**: ≤ 60 characters
- **Description Length**: ≤ 155 characters
- **Meta Keywords**: Relevant and comprehensive
- **Open Graph**: Complete social media optimization
- **Twitter Cards**: Optimized for sharing
- **Canonical URLs**: Proper canonicalization
- **Structured Data**: Rich snippets for search engines

## Schema Types Implemented
- **Organization**: Company information
- **WebSite**: Site-wide search functionality
- **Restaurant**: Individual restaurant details
- **LocalBusiness**: Local business information
- **BreadcrumbList**: Navigation breadcrumbs
- **FAQPage**: Frequently asked questions
- **AggregateRating**: Review ratings

## Files Created/Updated
- \`components/SEOHead.js\` - Comprehensive SEO head component
- \`utils/schemaMarkup.js\` - Schema markup utilities
- \`utils/seoUtils.js\` - SEO utility functions
- \`public/sitemap.xml\` - Complete sitemap
- \`public/robots.txt\` - Search engine directives

## Next Steps
1. Test schema markup validation
2. Submit sitemap to Google Search Console
3. Monitor SEO performance
4. Implement additional structured data
5. Optimize for featured snippets
`;
  
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n💾 Report saved to: ${reportPath}`);
  console.log(`✅ SEO & schema optimization complete!`);
  
  return seoOptimizations;
}

// Run the optimization
optimizeSEOAndSchema();
