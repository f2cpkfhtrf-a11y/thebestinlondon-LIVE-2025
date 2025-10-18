// Schema markup utilities for SEO
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
    "description": venue.description || `${venue.name} - ${venue.cuisines?.join(', ')} restaurant in ${venue.borough || 'London'}`,
    "url": `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
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
    "description": venue.description || `${venue.name} - ${venue.cuisines?.join(', ')} restaurant in ${venue.borough || 'London'}`,
    "url": `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
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
