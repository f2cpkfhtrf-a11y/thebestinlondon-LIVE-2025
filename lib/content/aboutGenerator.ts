// Generate about text for venues
export function generateAboutText(venue: any): string {
  // If venue already has good about text, use it
  if (venue.about?.text && venue.about.text.split(' ').length >= 40) {
    return venue.about.text;
  }

  // If venue has description, use it if it's substantial
  if (venue.description && venue.description.split(' ').length >= 40) {
    return venue.description;
  }

  // Generate new about text from existing fields
  const cuisine = venue.cuisines?.[0] || 'restaurant';
  const area = venue.area || venue.borough || 'London';
  const rating = venue.rating;
  const reviewCount = venue.user_ratings_total;
  const fsaRating = venue.fsa_rating;
  const priceLevel = venue.price_level;
  const dietaryTags = venue.dietary_tags || [];

  let aboutText = `Located in ${area}, this ${cuisine} restaurant offers a distinctive dining experience`;

  // Add rating information
  if (rating && reviewCount) {
    aboutText += ` with a ${rating.toFixed(1)}-star rating based on ${reviewCount.toLocaleString()} reviews`;
  }

  // Add FSA rating if valid
  if (fsaRating && fsaRating > 0) {
    aboutText += `. The restaurant maintains a ${fsaRating}/5 Food Standards Agency hygiene rating`;
  }

  // Add price information
  if (priceLevel) {
    const priceText = '£'.repeat(priceLevel);
    aboutText += ` and offers ${priceText} pricing`;
  }

  // Add dietary information
  if (dietaryTags.length > 0) {
    const dietaryText = dietaryTags.join(', ');
    aboutText += `. The restaurant caters to ${dietaryText} dietary requirements`;
  }

  // Add cuisine-specific details
  const cuisineDetails = {
    'indian': 'featuring authentic spices and traditional cooking methods',
    'italian': 'serving classic Italian dishes with fresh ingredients',
    'chinese': 'offering traditional Chinese cuisine with modern presentation',
    'japanese': 'specializing in fresh sushi and traditional Japanese dishes',
    'turkish': 'serving authentic Turkish cuisine with Mediterranean influences',
    'lebanese': 'offering traditional Lebanese dishes with Middle Eastern flavors',
    'thai': 'featuring authentic Thai spices and traditional cooking techniques',
    'korean': 'specializing in Korean BBQ and traditional Korean dishes',
    'mexican': 'serving authentic Mexican cuisine with fresh ingredients',
    'french': 'offering classic French dishes with refined presentation',
    'modern european': 'featuring contemporary European cuisine with innovative techniques',
    'seafood': 'specializing in fresh seafood and ocean-inspired dishes',
    'vegan': 'offering plant-based cuisine with creative and nutritious options',
    'vegetarian': 'serving vegetarian dishes with fresh, locally-sourced ingredients'
  };

  const cuisineDetail = cuisineDetails[cuisine.toLowerCase()];
  if (cuisineDetail) {
    aboutText += `, ${cuisineDetail}`;
  }

  // Add area-specific context
  const areaContext = {
    'soho': 'in the heart of London\'s entertainment district',
    'mayfair': 'in one of London\'s most prestigious areas',
    'shoreditch': 'in the trendy East London neighborhood',
    'camden': 'in the vibrant Camden area',
    'covent garden': 'in the historic Covent Garden district',
    'kensington': 'in the elegant Kensington area',
    'chelsea': 'in the fashionable Chelsea district',
    'marylebone': 'in the charming Marylebone neighborhood',
    'islington': 'in the diverse Islington area',
    'greenwich': 'in the historic Greenwich area'
  };

  const areaContextText = areaContext[area.toLowerCase()];
  if (areaContextText) {
    aboutText += ` ${areaContextText}`;
  }

  // Add closing
  aboutText += '. The restaurant provides a welcoming atmosphere for both casual diners and special occasions, combining quality food with excellent service.';

  // Ensure minimum word count
  const wordCount = aboutText.split(' ').length;
  if (wordCount < 120) {
    aboutText += ' With its commitment to quality and customer satisfaction, this establishment has become a popular choice among locals and visitors alike.';
  }

  return aboutText;
}



