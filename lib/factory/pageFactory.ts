// JSON-LD Schema helpers for programmatic SEO
export function asWebSite({ name, url, searchUrl }: {
  name: string;
  url: string;
  searchUrl?: string;
}) {
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "url": "https://www.thebestinlondon.co.uk"
    }
  };

  if (searchUrl) {
    jsonLd.potentialAction = {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${searchUrl}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    };
  }

  return jsonLd;
}

export function asOrganization({ name, url, logo }: {
  name: string;
  url: string;
  logo?: string;
}) {
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url
  };

  if (logo) {
    jsonLd.logo = logo;
  }

  return jsonLd;
}

export function asCollectionPage({ name, url, itemCount, items }: {
  name: string;
  url: string;
  itemCount: number;
  items?: any[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": itemCount,
      "itemListElement": items?.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Restaurant",
          "name": item.name,
          "url": `https://www.thebestinlondon.co.uk/restaurant/${item.slug}`
        }
      })) || []
    }
  };
}

export function asRestaurant(venue: any) {
  const baseUrl = 'https://www.thebestinlondon.co.uk';
  
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "url": `${baseUrl}/restaurant/${venue.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address?.formatted || venue.address,
      "addressLocality": venue.area || venue.borough,
      "addressRegion": "London",
      "addressCountry": "GB"
    }
  };

  // Add telephone if available
  if (venue.phone) {
    jsonLd.telephone = venue.phone;
  }

  // Add website if available
  if (venue.website) {
    jsonLd.url = venue.website;
    jsonLd.sameAs = venue.website;
  }

  // Add cuisine information
  if (venue.cuisines && venue.cuisines.length > 0) {
    jsonLd.servesCuisine = venue.cuisines;
  }

  // Add price range if available
  if (venue.price_level) {
    jsonLd.priceRange = '£'.repeat(venue.price_level);
  }

  // Add aggregate rating ONLY if real data exists
  if (venue.rating && venue.user_ratings_total && venue.rating > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.user_ratings_total,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  // Add image if available
  if (venue.image_hero_path || venue.image_card_path) {
    const imagePath = venue.image_hero_path || venue.image_card_path;
    jsonLd.image = `${baseUrl}${imagePath}`;
  }

  // Add menu if available
  if (venue.menu_url) {
    jsonLd.hasMenu = {
      "@type": "Menu",
      "url": venue.menu_url
    };
  }

  // Add opening hours if available
  if (venue.opening_hours?.weekday_text) {
    jsonLd.openingHours = venue.opening_hours.weekday_text;
  }

  return jsonLd;
}

export function asBlogPosting(post: any) {
  const baseUrl = 'https://www.thebestinlondon.co.uk';
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || post.excerpt,
    "url": `${baseUrl}/blog/${post.slug}`,
    "datePublished": post.datePublished || post.publishedAt,
    "dateModified": post.dateModified || post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "The Best in London"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`
      }
    },
    "image": post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/heroes/site-default.webp`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    }
  };
}

export function asFAQPage(faq: any) {
  const baseUrl = 'https://www.thebestinlondon.co.uk';
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": faq.title,
    "description": faq.description,
    "url": `${baseUrl}/faq/${faq.slug}`,
    "mainEntity": faq.questions?.map((q: any) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    })) || []
  };
}