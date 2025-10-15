/**
 * AI-Generated SEO Description Generator
 * Creates unique, keyword-rich descriptions for restaurants
 * Optimized for Google search rankings
 * FIXED: No random() - deterministic based on venue name for React hydration
 */

export function generateSEODescription(venue, category = 'general') {
  const parts = [];
  const name = venue.name || 'Restaurant';
  const area = venue.area || 'London';
  const rating = venue.rating || 0;
  const priceLevel = venue.price_level || 2;
  const reviewCount = venue.user_ratings_total || 0;
  
  // SEO Keywords by category
  const categoryKeywords = {
    vegan: ['plant-based', 'vegan dining', 'organic ingredients', 'sustainable', 'dairy-free'],
    halal: ['halal-certified', 'authentic halal', 'Muslim-friendly', 'traditional', 'premium halal meat'],
    vegetarian: ['vegetarian menu', 'meat-free', 'fresh vegetables', 'veggie-friendly', 'plant-based options'],
    general: ['quality dining', 'authentic cuisine', 'fresh ingredients', 'excellent service', 'local favorite']
  };
  
  // Area descriptions for local SEO
  const areaDescriptions = {
    'Shoreditch': 'in trendy East London\'s creative hub',
    'Camden': 'in vibrant Camden, near the markets',
    'Soho': 'in the heart of London\'s West End',
    'Covent Garden': 'in the theatre district',
    'Hackney': 'in fashionable East London',
    'Brixton': 'in South London\'s cultural quarter',
    'Islington': 'in North London\'s dining scene',
    'Borough': 'near iconic Borough Market',
    'London Eye': 'with stunning Thames views',
    'Canary Wharf': 'in London\'s financial district',
  };
  
  const areaDesc = areaDescriptions[area] || `in ${area}, London`;
  const keywords = categoryKeywords[category] || categoryKeywords.general;
  
  // Generate consistent index based on venue name (NO random - fixes hydration!)
  const getStyleIndex = (venueName) => {
    let hash = 0;
    for (let i = 0; i < venueName.length; i++) {
      hash = ((hash << 5) - hash) + venueName.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 3;
  };
  
  const styleIndex = getStyleIndex(name);
  const ctaIndex = getStyleIndex(name + area) % 4;
  
  // Opening - Brand + Location + Category
  const ratingPrefix = rating >= 4.7 ? 'exceptional' : rating >= 4.5 ? 'highly-rated' : rating >= 4.2 ? 'popular' : 'well-established';
  
  if (category === 'vegan') {
    parts.push(`${name} is an ${ratingPrefix} plant-based restaurant ${areaDesc}.`);
  } else if (category === 'halal') {
    parts.push(`${name} is an ${ratingPrefix} halal restaurant ${areaDesc}.`);
  } else if (category === 'vegetarian') {
    parts.push(`${name} is an ${ratingPrefix} vegetarian restaurant ${areaDesc}.`);
  } else {
    parts.push(`${name} is an ${ratingPrefix} restaurant ${areaDesc}.`);
  }
  
  // Menu & Cuisine - Include primary keywords (DETERMINISTIC - no random!)
  if (category === 'vegan') {
    const styles = [
      `Specializing in innovative ${keywords[0]}, their menu features ${keywords[2]} and seasonal produce. Perfect for vegans and curious diners alike, they prove plant-based food can be exceptional.`,
      `Their 100% vegan menu showcases creative dishes using ${keywords[2]} and ${keywords[1]} excellence. Known for transforming vegetables into culinary art with bold, satisfying flavors.`,
      `Featuring ${keywords[1]} at its finest, with ${keywords[4]} options throughout. Their seasonal menu celebrates ${keywords[3]} sourcing and ethical eating without compromising on taste.`
    ];
    parts.push(styles[styleIndex]);
  } else if (category === 'halal') {
    const styles = [
      `Serving authentic ${keywords[0]} cuisine with ${keywords[2]} dining standards. All meat is certified halal, prepared using ${keywords[3]} cooking methods with ${keywords[4]}.`,
      `Their 100% ${keywords[1]} menu combines ${keywords[3]} recipes with modern flair. Muslim diners can enjoy diverse dishes with complete confidence in ${keywords[0]} standards.`,
      `Offering ${keywords[0]} excellence with ${keywords[4]} and ${keywords[1]} recipes. Each dish is prepared following strict halal guidelines while delivering exceptional flavor.`
    ];
    parts.push(styles[styleIndex]);
  } else if (category === 'vegetarian') {
    const styles = [
      `Their extensive ${keywords[0]} features ${keywords[2]} and ${keywords[4]} bursting with flavor. Proving ${keywords[1]} dining can be creative, exciting and deeply satisfying.`,
      `Specializing in ${keywords[1]} cuisine with ${keywords[3]} appeal. The menu showcases international flavors using locally-sourced, seasonal produce at its peak freshness.`,
      `Known for innovative ${keywords[0]} that highlights ${keywords[2]} and ${keywords[4]}. Each dish celebrates the natural flavors of vegetables, grains and plant proteins.`
    ];
    parts.push(styles[styleIndex]);
  }
  
  // Social Proof & Reviews - Critical for SEO
  if (rating >= 4.7) {
    if (reviewCount > 1000) {
      parts.push(`With an outstanding ${rating}-star rating from over ${reviewCount.toLocaleString()} Google reviews, it's earned its place among London's finest restaurants.`);
    } else if (reviewCount > 300) {
      parts.push(`Customers rave about the quality, giving it a stellar ${rating}-star rating with ${reviewCount.toLocaleString()}+ reviews praising the food and service.`);
    } else {
      parts.push(`Diners love the exceptional quality and attention to detail, reflected in its impressive ${rating}-star rating from genuine customer reviews.`);
    }
  } else if (rating >= 4.4) {
    if (reviewCount > 500) {
      parts.push(`With ${reviewCount.toLocaleString()}+ Google reviews averaging ${rating} stars, it's a proven favorite among London diners.`);
    } else {
      parts.push(`Consistently rated ${rating} stars by customers who appreciate the quality food, great atmosphere and friendly service.`);
    }
  } else if (rating >= 4.0) {
    parts.push(`A solid ${rating}-star rating reflects its reliable quality and value for money.`);
  }
  
  // Price & Value - Important conversion factor
  const priceDescriptions = {
    1: 'Offering excellent value at £10-15 per person, it\'s perfect for regular dining and casual meals.',
    2: 'With mid-range pricing around £15-25 per person, it balances quality and affordability for special occasions and regular visits.',
    3: 'Premium dining at £25-40 per person delivers exceptional quality perfect for celebrations and important occasions.',
    4: 'Fine dining excellence at £40+ per person, offering a world-class culinary experience worth every penny.'
  };
  parts.push(priceDescriptions[priceLevel] || priceDescriptions[2]);
  
  // Location & Accessibility - Local SEO crucial
  if (area === 'Canary Wharf') {
    parts.push('Ideally located in Canary Wharf, it\'s perfect for business lunches and after-work dining, easily accessible via DLR and Jubilee Line.');
  } else if (area === 'London Eye' || venue.vicinity?.toLowerCase().includes('south bank')) {
    parts.push('With spectacular Thames views and proximity to the London Eye, it combines great food with iconic London scenery. Perfect for tourists and locals alike.');
  } else if (area && area !== 'London') {
    parts.push(`Conveniently located in ${area}, it's easily accessible by public transport and hugely popular with both locals and visitors exploring the area.`);
  } else {
    parts.push('Well-connected by London\'s extensive transport network, attracting diners from across the capital and beyond.');
  }
  
  // Call to Action - Booking encouragement (DETERMINISTIC!)
  const ctaPhrases = [
    'Reservations recommended, especially for weekends and evenings when it gets busy.',
    'Walk-ins welcome during quieter periods, but booking ahead guarantees your table.',
    'Book in advance for the best experience - this popular spot fills up quickly on Friday and Saturday nights.',
    'Advance booking strongly advised for dinner service, particularly during peak times and special occasions.'
  ];
  parts.push(ctaPhrases[ctaIndex]);
  
  return parts.join(' ');
}

// Generate category-specific meta descriptions (for <meta> tags)
export function generateMetaDescription(venue, category, venueCount = 0) {
  const name = venue.name;
  const area = venue.area || 'London';
  const rating = venue.rating || 0;
  const priceLevel = venue.price_level || 2;
  
  const priceRange = {
    1: '£10-15',
    2: '£15-25',
    3: '£25-40',
    4: '£40+'
  }[priceLevel] || '£15-25';
  
  if (category === 'vegan') {
    return `${name}: ${rating}⭐ plant-based restaurant in ${area}. ${priceRange}pp. Innovative vegan cuisine with organic ingredients. ${venueCount}+ London vegan restaurants reviewed.`;
  } else if (category === 'halal') {
    return `${name}: ${rating}⭐ halal-certified restaurant in ${area}. ${priceRange}pp. Authentic halal cuisine prepared to highest standards. ${venueCount}+ London halal restaurants.`;
  } else if (category === 'vegetarian') {
    return `${name}: ${rating}⭐ vegetarian restaurant in ${area}. ${priceRange}pp. Creative meat-free menu with fresh ingredients. ${venueCount}+ London vegetarian spots.`;
  }
  
  return `${name} in ${area}: ${rating}⭐ rated, ${priceRange} per person. Discover London's best restaurants with real reviews, ratings and prices.`;
}

// Determine category from venue data
export function detectCategory(venue) {
  if (!venue) return 'general';
  
  const name = (venue.name || '').toLowerCase();
  const types = ((venue.types || []).join(' ')).toLowerCase();
  const category = (venue.category || '').toLowerCase();
  
  // Check explicit category first
  if (category === 'vegan' || category.includes('vegan')) return 'vegan';
  if (category === 'halal' || category.includes('halal')) return 'halal';
  if (category === 'vegetarian' || category.includes('vegetarian')) return 'vegetarian';
  
  // Check name and types
  if (name.includes('vegan') || name.includes('plant') || types.includes('vegan')) {
    return 'vegan';
  }
  if (name.includes('halal') || types.includes('halal')) {
    return 'halal';
  }
  if (name.includes('vegetarian') || name.includes('veggie') || types.includes('vegetarian')) {
    return 'vegetarian';
  }
  
  return 'general';
}
