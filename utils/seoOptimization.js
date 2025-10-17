// SEO optimization utilities for titles, descriptions, and structured data
const optimizeTitle = (title, maxLength = 60) => {
  if (title.length <= maxLength) return title;
  
  // Try to truncate at word boundaries
  const truncated = title.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

const optimizeDescription = (description, maxLength = 155) => {
  if (description.length <= maxLength) return description;
  
  // Try to truncate at sentence boundaries
  const sentences = description.split(/[.!?]+/);
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence).length <= maxLength - 3) {
      result += sentence + '. ';
    } else {
      break;
    }
  }
  
  if (result.length > 0) {
    return result.trim() + '...';
  }
  
  // Fallback to word boundary truncation
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

// Generate SEO-optimized titles for different page types
const generateSEOTitle = (type, data) => {
  const baseTitle = 'The Best in London';
  
  switch (type) {
    case 'restaurant':
      return optimizeTitle(`${data.name} | ${data.cuisines?.[0] || 'Restaurant'} in ${data.borough || 'London'} | ${baseTitle}`);
    
    case 'cuisine':
      return optimizeTitle(`Best ${data.cuisine} Restaurants in London | ${data.count} Top ${data.cuisine} Places | ${baseTitle}`);
    
    case 'area':
      return optimizeTitle(`Best Restaurants in ${data.area} London | ${data.count} Top Places | ${baseTitle}`);
    
    case 'halal':
      return optimizeTitle(`Best Halal Restaurants in London | ${data.count} Halal-Friendly Places | ${baseTitle}`);
    
    case 'near-me':
      return optimizeTitle(`Restaurants Near Me in London | Find Local Dining | ${baseTitle}`);
    
    case 'home':
      return optimizeTitle(`${baseTitle} | London's Premier Restaurant Guide | 760+ Verified Venues`);
    
    default:
      return optimizeTitle(`${baseTitle} | London's Premier Restaurant Guide`);
  }
};

// Generate SEO-optimized descriptions
const generateSEODescription = (type, data) => {
  switch (type) {
    case 'restaurant':
      const cuisine = data.cuisines?.[0] || 'restaurant';
      const area = data.borough || 'London';
      const rating = data.rating ? `${data.rating.toFixed(1)}-star ` : '';
      return optimizeDescription(`Discover ${data.name}, a ${rating}${cuisine} restaurant in ${area}. Read reviews, view photos, check FSA ratings, and find the best ${cuisine} dining in London.`);
    
    case 'cuisine':
      return optimizeDescription(`Find the best ${data.cuisine} restaurants in London. Discover top-rated ${data.cuisine} places with reviews, photos, FSA ratings, and authentic ${data.cuisine} cuisine. ${data.count}+ verified venues.`);
    
    case 'area':
      return optimizeDescription(`Discover the best restaurants in ${data.area}, London. Find top-rated dining spots with reviews, photos, FSA ratings, and authentic cuisine. ${data.count}+ verified venues in ${data.area}.`);
    
    case 'halal':
      return optimizeDescription(`Find the best halal restaurants in London. Discover halal-friendly dining with authentic cuisine, reviews, photos, and FSA ratings. ${data.count}+ verified halal venues.`);
    
    case 'near-me':
      return optimizeDescription(`Find restaurants near your location in London. Discover top-rated dining options within walking distance with real reviews, FSA ratings, and authentic cuisine.`);
    
    case 'home':
      return optimizeDescription(`London's premier restaurant guide featuring 760+ verified venues. Find the best restaurants, cafes, and dining spots with reviews, photos, FSA ratings, and authentic cuisine.`);
    
    default:
      return optimizeDescription(`London's premier restaurant guide featuring verified venues with reviews, photos, FSA ratings, and authentic cuisine.`);
  }
};

// Generate comprehensive structured data
const generateStructuredData = (type, data) => {
  const baseUrl = 'https://thebestinlondon.co.uk';
  
  switch (type) {
    case 'restaurant':
      return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": data.name,
        "description": data.description,
        "url": `${baseUrl}/restaurant/${data.slug}`,
        "telephone": data.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address,
          "addressLocality": data.borough,
          "addressRegion": "London",
          "addressCountry": "GB"
        },
        "geo": data.latitude && data.longitude ? {
          "@type": "GeoCoordinates",
          "latitude": data.latitude,
          "longitude": data.longitude
        } : undefined,
        "servesCuisine": data.cuisines,
        "priceRange": data.price_level ? '£'.repeat(data.price_level) : undefined,
        "aggregateRating": data.rating ? {
          "@type": "AggregateRating",
          "ratingValue": data.rating,
          "reviewCount": data.review_count || 0,
          "bestRating": 5,
          "worstRating": 1
        } : undefined,
        "image": data.photos?.[0]?.url,
        "openingHours": data.opening_hours,
        "hasMenu": data.menu_url ? {
          "@type": "Menu",
          "url": data.menu_url
        } : undefined
      };
    
    case 'cuisine':
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Best ${data.cuisine} Restaurants in London`,
        "description": `Discover the best ${data.cuisine} restaurants in London with reviews, photos, and FSA ratings.`,
        "url": `${baseUrl}/${data.cuisine.replace(/\s+/g, '-')}`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": data.count,
          "itemListElement": data.venues?.slice(0, 10).map((venue, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Restaurant",
              "name": venue.name,
              "url": `${baseUrl}/restaurant/${venue.slug}`,
              "servesCuisine": venue.cuisines,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": venue.borough,
                "addressRegion": "London",
                "addressCountry": "GB"
              }
            }
          }))
        }
      };
    
    case 'area':
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Best Restaurants in ${data.area}, London`,
        "description": `Discover the best restaurants in ${data.area}, London with reviews, photos, and FSA ratings.`,
        "url": `${baseUrl}/restaurants-${data.area.toLowerCase().replace(/\s+/g, '-')}`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": data.count,
          "itemListElement": data.venues?.slice(0, 10).map((venue, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Restaurant",
              "name": venue.name,
              "url": `${baseUrl}/restaurant/${venue.slug}`,
              "servesCuisine": venue.cuisines,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": venue.borough,
                "addressRegion": "London",
                "addressCountry": "GB"
              }
            }
          }))
        }
      };
    
    case 'halal':
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Best Halal Restaurants in London",
        "description": "Discover the best halal restaurants in London with authentic cuisine, reviews, photos, and FSA ratings.",
        "url": `${baseUrl}/best-halal-restaurants-london`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": data.count,
          "itemListElement": data.venues?.slice(0, 10).map((venue, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Restaurant",
              "name": venue.name,
              "url": `${baseUrl}/restaurant/${venue.slug}`,
              "servesCuisine": venue.cuisines,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": venue.borough,
                "addressRegion": "London",
                "addressCountry": "GB"
              }
            }
          }))
        }
      };
    
    case 'website':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Best in London",
        "description": "London's premier restaurant guide featuring 760+ verified venues with reviews, photos, FSA ratings, and authentic cuisine.",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Best in London",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.svg`
          }
        }
      };
    
    default:
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": data.title || "The Best in London",
        "description": data.description || "London's premier restaurant guide",
        "url": data.url || baseUrl
      };
  }
};

// Generate breadcrumb structured data
const generateBreadcrumbData = (breadcrumbs) => {
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
};

// Generate FAQ structured data
const generateFAQData = (faqs) => {
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
};

module.exports = {
  optimizeTitle,
  optimizeDescription,
  generateSEOTitle,
  generateSEODescription,
  generateStructuredData,
  generateBreadcrumbData,
  generateFAQData
};
