// SEO utility functions
export function generateMetaTitle(title, siteName = 'The Best in London') {
  if (!title) return siteName;
  if (title.length <= 60) return title;
  return title.substring(0, 57) + '...';
}

export function generateMetaDescription(description, maxLength = 155) {
  if (!description) return 'Discover London's finest restaurants, cafes, and dining experiences. From Michelin-starred fine dining to hidden gems.';
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
      `${venue.name} London`,
      `${venue.name} restaurant`,
      `${venue.cuisines?.join(' ')} restaurant London`,
      `restaurants ${venue.borough}`,
      `${venue.borough} restaurants`,
      `${venue.name} ${venue.borough}`
    ];
    
    return [...baseKeywords, ...venueKeywords, ...additionalKeywords].join(', ');
  }
  
  return [...baseKeywords, ...additionalKeywords].join(', ');
}

export function generateCanonicalUrl(path, baseUrl = 'https://www.thebestinlondon.co.uk') {
  return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
}

export function generateOpenGraphImage(venue = null, defaultImage = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=630&fit=crop&crop=center&q=85') {
  if (venue && venue.image_url) {
    // Convert to Open Graph format (1200x630)
    if (venue.image_url.includes('unsplash.com')) {
      return venue.image_url.replace(/w=d+&h=d+/, 'w=1200&h=630');
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
    currentPath += `/${segment}`;
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
