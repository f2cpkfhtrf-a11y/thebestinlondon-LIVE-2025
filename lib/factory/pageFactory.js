// JavaScript version of pageFactory functions for compatibility

export function withJsonLd(type, data) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
}

export function asWebSite({ name, url, searchUrl }) {
  return withJsonLd("WebSite", {
    name,
    url,
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: searchUrl,
        "query-input": "required name=search_term_string"
      }
    })
  });
}

export function asOrganization({ name, url, logo }) {
  return withJsonLd("Organization", {
    name,
    url,
    ...(logo && { logo })
  });
}

export function asCollectionPage({ name, url, itemCount, items }) {
  const baseData = {
    name,
    url,
    numberOfItems: itemCount
  };

  if (items && items.length > 0) {
    baseData.itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Restaurant",
        name: item.name,
        url: `${url}/${item.slug}`
      }
    }));
  }

  return withJsonLd("CollectionPage", baseData);
}

export function asRestaurant(venue) {
  return withJsonLd("Restaurant", {
    name: venue.name,
    image: venue.image_hero_path?.replace('/public', '') ? `https://www.thebestinlondon.co.uk${venue.image_hero_path.replace('/public', '')}` : undefined,
    description: venue.about?.text && venue.about.text.length > 60 ? venue.about.text : undefined,
    address: venue.address ? {
      "@type": "PostalAddress",
      streetAddress: venue.address.formatted,
      postalCode: venue.address.postcode,
      addressCountry: "GB"
    } : null,
    geo: venue.address?.lat && venue.address?.lng ? {
      "@type": "GeoCoordinates",
      latitude: venue.address.lat,
      longitude: venue.address.lng
    } : null,
    url: venue.website || `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
    telephone: venue.phone || '',
    servesCuisine: venue.cuisines?.[0] || '',
    priceRange: '£'.repeat(venue.price_level || 2),
    aggregateRating: venue.rating ? {
      "@type": "AggregateRating",
      ratingValue: venue.rating,
      reviewCount: venue.user_ratings_total || 0,
      bestRating: 5,
      worstRating: 1
    } : null
  });
}

export function asBlogPosting(post) {
  return withJsonLd("BlogPosting", {
    headline: post.title,
    description: post.description || post.dek,
    image: post.hero || post.coverImage,
    author: {
      "@type": "Person",
      name: post.author?.name || post.author_name || post.author || 'The Best in London Team'
    },
    publisher: {
      "@type": "Organization",
      name: "The Best in London",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thebestinlondon.co.uk/logo-compact.svg"
      }
    },
    datePublished: post.datePublished || post.publishedAt || post.date,
    dateModified: post.datePublished || post.publishedAt || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.thebestinlondon.co.uk/blog/${post.slug}`
    }
  });
}

export function asFAQPage(faq) {
  return withJsonLd("FAQPage", {
    mainEntity: faq.questions?.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer
      }
    })) || []
  });
}
