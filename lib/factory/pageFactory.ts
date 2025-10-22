// JSON-LD Schema helpers
export function withJsonLd(type: string, data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
}

export function asWebSite({ name, url, searchUrl }: { name: string; url: string; searchUrl?: string }) {
  return withJsonLd('WebSite', {
    name,
    url,
    ...(searchUrl && { potentialAction: {
      '@type': 'SearchAction',
      target: `${searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }})
  });
}

export function asOrganization({ name, url, logo }: { name: string; url: string; logo?: string }) {
  return withJsonLd('Organization', {
    name,
    url,
    ...(logo && { logo })
  });
}

export function asCollectionPage({ name, url, itemCount, items }: { name: string; url: string; itemCount: number; items?: any[] }) {
  return withJsonLd('CollectionPage', {
    name,
    url,
    numberOfItems: itemCount,
    ...(items && items.length > 0 && { mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Restaurant',
          name: item.name,
          url: `${url}/${item.slug}`,
          ...(item.image && { image: item.image }),
          ...(item.rating && { aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating,
            reviewCount: item.reviewCount || 0
          }})
        }
      }))
    }})
  });
}

export function asRestaurant(venue: any) {
  return withJsonLd('Restaurant', {
    name: venue.name,
    url: `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
    ...(venue.image_card_path && { image: venue.image_card_path }),
    ...(venue.rating && { aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.user_ratings_total || 0
    }}),
    ...(venue.cuisines && venue.cuisines.length > 0 && { servesCuisine: venue.cuisines }),
    ...(venue.area && { address: {
      '@type': 'PostalAddress',
      addressLocality: venue.area,
      addressRegion: 'London',
      addressCountry: 'GB'
    }}),
    ...(venue.price_level && { priceRange: '£'.repeat(venue.price_level) }),
    ...(venue.fsa_rating && { healthAndSafetyRating: {
      '@type': 'Rating',
      ratingValue: venue.fsa_rating,
      bestRating: 5
    }})
  });
}

export function asBlogPosting(post: any) {
  return withJsonLd('BlogPosting', {
    headline: post.title,
    url: `https://www.thebestinlondon.co.uk/blog/${post.slug}`,
    ...(post.description && { description: post.description }),
    ...(post.image && { image: post.image }),
    datePublished: post.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'The Best in London'
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Best in London',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.thebestinlondon.co.uk/logo.png'
      }
    }
  });
}

export function asFAQPage(faq: any) {
  return withJsonLd('FAQPage', {
    mainEntity: faq.questions?.map((q: any) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    })) || []
  });
}