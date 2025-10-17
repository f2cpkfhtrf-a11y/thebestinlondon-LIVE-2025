import Head from 'next/head';

export default function SEOHead({ 
  title, 
  description, 
  canonical, 
  keywords = [],
  image = '/logo.svg',
  type = 'website',
  structuredData = null 
}) {
  const fullTitle = title ? `${title} | The Best in London` : 'The Best in London | Premium Dining Guide';
  const fullDescription = description || 'Discover London\'s finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas.';
  const fullImage = image.startsWith('http') ? image : `https://www.thebestinlondon.co.uk${image}`;
  
  return (
    <Head>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonical || 'https://www.thebestinlondon.co.uk'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={canonical || 'https://www.thebestinlondon.co.uk'} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="The Best in London" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@thebestinlondon" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="GB-LND" />
      <meta name="geo.placename" content="London" />
      <meta name="geo.position" content="51.5074;-0.1278" />
      <meta name="ICBM" content="51.5074, -0.1278" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
}

// Structured Data Templates
export const structuredDataTemplates = {
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Best in London",
    "description": "London's premier dining guide featuring 760+ verified restaurants",
    "url": "https://www.thebestinlondon.co.uk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.thebestinlondon.co.uk/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thebestinlondon.co.uk/logo.svg"
      }
    }
  },
  
  restaurant: (venue) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "description": venue.description,
    "url": `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
    "image": venue.photos?.[0]?.url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address?.formatted || venue.vicinity,
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "telephone": venue.phone,
    "website": venue.website,
    "servesCuisine": venue.cuisines,
    "priceRange": venue.price_range || `£${'£'.repeat(venue.price_level || 2)}`,
    "aggregateRating": venue.rating ? {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.user_ratings_total || 0
    } : undefined,
    "openingHours": venue.opening_hours?.weekday_text?.map(hours => 
      hours.replace(/^\w+\s/, '')
    ),
    "geo": venue.lat && venue.lng ? {
      "@type": "GeoCoordinates",
      "latitude": venue.lat,
      "longitude": venue.lng
    } : undefined
  }),
  
  collectionPage: (title, description, items) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": `https://www.thebestinlondon.co.uk/${title.toLowerCase().replace(/\s+/g, '-')}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": items.length,
      "itemListElement": items.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Restaurant",
          "name": item.name,
          "url": `https://www.thebestinlondon.co.uk/restaurant/${item.slug}`
        }
      }))
    }
  }),
  
  breadcrumbList: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),
  
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Best in London",
    "description": "London's premier dining guide featuring 760+ verified restaurants",
    "url": "https://www.thebestinlondon.co.uk",
    "logo": "https://www.thebestinlondon.co.uk/logo.svg",
    "sameAs": [
      "https://twitter.com/thebestinlondon",
      "https://instagram.com/thebestinlondon"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@thebestinlondon.co.uk"
    }
  }
};
