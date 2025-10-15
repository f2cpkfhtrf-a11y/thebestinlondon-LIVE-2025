// SEO META HELPER
// Centralized SEO logic: indexability, canonicals, pagination

export const SEO_CONFIG = {
  siteName: 'The Best in London',
  siteUrl: 'https://thebestinlondon.co.uk',
  defaultTitle: "London's Finest Restaurants | Curated Dining Guide 2025",
  defaultDescription: "Discover 500+ of London's best restaurants. Michelin-starred venues, hidden gems, and culinary excellence. Real reviews, FSA verified, updated daily.",
  twitterHandle: '@thebestinlondon',
  locale: 'en_GB'
};

// Determine if a page should be indexed
export const shouldIndexPage = (path, query = {}) => {
  // Always index core pages
  const indexablePaths = [
    '/',
    '/indian-restaurants-london',
    '/italian-restaurants-london',
    '/japanese-restaurants-london',
    '/chinese-restaurants-london',
    '/thai-restaurants-london',
    '/turkish-restaurants-london',
    '/best-halal-restaurants-london',
    '/best-vegan-restaurants-london',
    '/best-vegetarian-restaurants-london'
  ];

  if (indexablePaths.includes(path)) {
    // Allow pagination up to page 10
    if (query.page && parseInt(query.page) > 10) {
      return false;
    }
    // Block if multiple filters applied
    const filterCount = Object.keys(query).filter(k => 
      ['cuisine', 'area', 'price', 'diet'].includes(k)
    ).length;
    return filterCount <= 1;
  }

  // Block search results
  if (path.startsWith('/search')) return false;

  // Block admin/api
  if (path.startsWith('/admin') || path.startsWith('/api')) return false;

  // Individual venue pages always indexed
  if (path.startsWith('/restaurants/')) return true;

  return false;
};

// Generate canonical URL
export const getCanonicalUrl = (path, query = {}) => {
  const cleanPath = path.split('?')[0];
  
  // Base canonical (no query params for listing pages)
  if ([
    '/',
    '/indian-restaurants-london',
    '/italian-restaurants-london',
    // ... other listing pages
  ].includes(cleanPath)) {
    // Include page number if present
    if (query.page && parseInt(query.page) > 1) {
      return `${SEO_CONFIG.siteUrl}${cleanPath}?page=${query.page}`;
    }
    return `${SEO_CONFIG.siteUrl}${cleanPath}`;
  }

  // For other pages, use full path
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};

// Generate robots meta tag
export const getRobotsMeta = (path, query = {}) => {
  const shouldIndex = shouldIndexPage(path, query);
  
  if (!shouldIndex) {
    return 'noindex, follow';
  }

  // Deep pagination: index but discourage
  if (query.page && parseInt(query.page) > 5) {
    return 'index, follow, max-snippet:-1, max-image-preview:standard';
  }

  return 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
};

// Generate pagination link tags
export const getPaginationLinks = (currentPage, totalPages, basePath) => {
  const links = [];
  const current = parseInt(currentPage) || 1;

  if (current > 1) {
    links.push({
      rel: 'prev',
      href: current === 2 
        ? `${SEO_CONFIG.siteUrl}${basePath}`
        : `${SEO_CONFIG.siteUrl}${basePath}?page=${current - 1}`
    });
  }

  if (current < totalPages) {
    links.push({
      rel: 'next',
      href: `${SEO_CONFIG.siteUrl}${basePath}?page=${current + 1}`
    });
  }

  return links;
};

// Generate structured breadcrumbs
export const getBreadcrumbs = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SEO_CONFIG.siteUrl}${item.path}`
    }))
  };
};

// Generate FAQ schema
export const getFAQSchema = (faqs) => {
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
