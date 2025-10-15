const fs = require('fs');
const path = require('path');

/**
 * Generate SEO-optimized descriptions for restaurants
 * These descriptions target high-value keywords and rank well in search
 */

// SEO keyword phrases to naturally incorporate
const seoKeywords = {
  vegan: [
    'best vegan restaurant',
    'plant-based dining',
    'vegan menu',
    'dairy-free options',
    'sustainable dining',
    'organic ingredients',
    'vegan-friendly'
  ],
  halal: [
    'halal certified',
    'authentic halal food',
    'halal meat',
    'muslim-friendly dining',
    'halal restaurant',
    'traditional halal cuisine'
  ],
  vegetarian: [
    'vegetarian restaurant',
    'meat-free menu',
    'vegetarian options',
    'veggie-friendly',
    'plant-based dishes'
  ],
  location: [
    'in the heart of',
    'located in',
    'nestled in',
    'situated in',
    'found in'
  ],
  ambiance: [
    'cosy atmosphere',
    'modern interior',
    'intimate setting',
    'contemporary design',
    'warm ambiance',
    'stylish decor',
    'vibrant atmosphere',
    'elegant dining space',
    'casual vibe',
    'upscale experience'
  ],
  experience: [
    'perfect for',
    'ideal for',
    'great for',
    'popular with',
    'loved by',
    'recommended for'
  ],
  occasions: [
    'date nights',
    'family meals',
    'business lunches',
    'special occasions',
    'casual dining',
    'weekend brunch',
    'celebration dinners'
  ]
};

// Area-specific details
const areaInfo = {
  'Shoreditch': 'in trendy East London',
  'Camden': 'in the vibrant Camden area',
  'Soho': 'in the heart of central London',
  'Covent Garden': 'near London\'s theatre district',
  'Hackney': 'in fashionable East London',
  'Brixton': 'in South London\'s cultural hub',
  'Notting Hill': 'in the charming Notting Hill neighborhood',
  'Clapham': 'in popular South London',
  'Islington': 'in North London\'s dining scene',
  'Peckham': 'in up-and-coming South London',
  'Borough': 'near Borough Market',
  'Fitzrovia': 'in central London',
  'Marylebone': 'in elegant Marylebone',
  'Mayfair': 'in upscale Mayfair',
  'Chelsea': 'in sophisticated Chelsea',
  'Kensington': 'in prestigious Kensington'
};

// Price point descriptions
const priceDescriptions = {
  1: 'offering excellent value with affordable prices',
  2: 'with mid-range pricing perfect for regular dining',
  3: 'providing premium dining at competitive prices',
  4: 'delivering fine dining excellence'
};

// Rating descriptions
const ratingDescriptions = {
  high: 'consistently praised by diners',
  veryHigh: 'earning rave reviews from customers',
  excellent: 'rated as one of London\'s finest'
};

function generateDescription(venue, category) {
  const parts = [];
  const name = venue.name;
  const area = venue.area || 'London';
  const rating = venue.rating || 0;
  const priceLevel = venue.price_level || 2;
  const reviewCount = venue.user_ratings_total || 0;
  
  // Opening sentence - brand name + category + location
  const locationPhrase = areaInfo[area] || `in ${area}`;
  let categoryPhrase = '';
  
  if (category === 'vegan') {
    categoryPhrase = 'plant-based restaurant';
  } else if (category === 'halal') {
    categoryPhrase = 'halal restaurant';
  } else if (category === 'vegetarian') {
    categoryPhrase = 'vegetarian restaurant';
  } else {
    categoryPhrase = 'restaurant';
  }
  
  parts.push(`${name} is a ${rating >= 4.5 ? 'highly-rated' : 'popular'} ${categoryPhrase} ${locationPhrase}.`);
  
  // Second sentence - menu/cuisine focus
  if (category === 'vegan') {
    const veganStyles = [
      'Specializing in innovative plant-based cuisine, they offer a diverse menu featuring organic, locally-sourced ingredients.',
      'Their 100% vegan menu showcases creative plant-based dishes that appeal to vegans and non-vegans alike.',
      'Known for their inventive vegan dishes, they transform fresh vegetables and plant proteins into culinary masterpieces.',
      'The menu features seasonal vegan fare with bold flavors, using sustainable and ethically-sourced ingredients.'
    ];
    parts.push(veganStyles[Math.floor(Math.random() * veganStyles.length)]);
  } else if (category === 'halal') {
    const halalStyles = [
      'Serving authentic halal-certified cuisine, they maintain the highest standards of preparation and quality.',
      'All meat is halal-certified, ensuring Muslim diners can enjoy a diverse menu with complete confidence.',
      'Their halal menu features traditional recipes prepared with premium ingredients and authentic cooking methods.',
      'Offering 100% halal food, they combine traditional flavors with modern culinary techniques.'
    ];
    parts.push(halalStyles[Math.floor(Math.random() * halalStyles.length)]);
  } else if (category === 'vegetarian') {
    const veggieStyles = [
      'Their extensive vegetarian menu features fresh, seasonal dishes bursting with flavor.',
      'Specializing in creative meat-free cuisine, they prove vegetarian food can be exciting and satisfying.',
      'The vegetarian menu showcases international flavors with locally-sourced produce.',
      'Known for innovative vegetarian dishes that highlight the natural flavors of vegetables and grains.'
    ];
    parts.push(veggieStyles[Math.floor(Math.random() * veggieStyles.length)]);
  }
  
  // Third sentence - ambiance and experience
  const ambianceIdx = Math.floor(Math.random() * seoKeywords.ambiance.length);
  const occasionIdx = Math.floor(Math.random() * seoKeywords.occasions.length);
  parts.push(`With a ${seoKeywords.ambiance[ambianceIdx]}, it's ${seoKeywords.experience[2]} ${seoKeywords.occasions[occasionIdx]}.`);
  
  // Fourth sentence - reviews and social proof
  if (rating >= 4.5) {
    if (reviewCount > 500) {
      parts.push(`With a ${rating}-star rating from over ${reviewCount.toLocaleString()} Google reviews, it's earned its reputation as one of London's best.`);
    } else if (reviewCount > 100) {
      parts.push(`Customers consistently rate it ${rating} stars, praising the quality of food and friendly service.`);
    } else {
      parts.push(`Diners love the exceptional quality, reflected in its impressive ${rating}-star rating.`);
    }
  } else if (rating >= 4.0) {
    parts.push(`With a solid ${rating}-star rating, it's a reliable choice for quality dining.`);
  }
  
  // Fifth sentence - pricing and value
  const priceDesc = priceDescriptions[priceLevel] || priceDescriptions[2];
  parts.push(`${priceDesc.charAt(0).toUpperCase() + priceDesc.slice(1)}, making it accessible for ${priceLevel <= 2 ? 'regular visits' : 'special occasions'}.`);
  
  // Sixth sentence - location convenience
  if (area !== 'London') {
    parts.push(`Conveniently located in ${area}, it's easily accessible by public transport and popular with both locals and visitors.`);
  } else {
    parts.push(`Well-connected by London's transport network, it attracts diners from across the city.`);
  }
  
  // Final sentence - call to action / booking
  const ctaPhrases = [
    'Reservations recommended for weekends and evenings.',
    'Walk-ins welcome during off-peak hours.',
    'Book ahead for the best experience, especially on busy nights.',
    'Popular with locals, so booking in advance is advisable.'
  ];
  parts.push(ctaPhrases[Math.floor(Math.random() * ctaPhrases.length)]);
  
  return parts.join(' ');
}

// Main function
async function addSEODescriptions() {
  try {
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    
    console.log(`📝 Generating SEO descriptions for ${venuesData.length} venues...`);
    
    // Determine category for each venue
    const processedVenues = venuesData.map((venue, index) => {
      if (!venue || !venue.name) return venue;
      
      const name = venue.name.toLowerCase();
      const types = (venue.types || []).join(' ').toLowerCase();
      const category = venue.category || '';
      
      // Determine primary category
      let mainCategory = 'general';
      if (category === 'vegan' || name.includes('vegan') || name.includes('plant')) {
        mainCategory = 'vegan';
      } else if (category === 'halal' || name.includes('halal')) {
        mainCategory = 'halal';
      } else if (category === 'vegetarian' || name.includes('vegetarian') || name.includes('veggie')) {
        mainCategory = 'vegetarian';
      }
      
      // Generate SEO description
      const seoDescription = generateDescription(venue, mainCategory);
      
      if ((index + 1) % 50 === 0) {
        console.log(`   Generated ${index + 1} descriptions...`);
      }
      
      return {
        ...venue,
        seoDescription,
        seoCategory: mainCategory
      };
    });
    
    // Save updated venues
    fs.writeFileSync(venuesPath, JSON.stringify(processedVenues, null, 2));
    
    console.log(`✅ Successfully added SEO descriptions to all venues!`);
    console.log(`📊 Stats:`);
    console.log(`   - Total venues: ${processedVenues.length}`);
    console.log(`   - Vegan: ${processedVenues.filter(v => v.seoCategory === 'vegan').length}`);
    console.log(`   - Halal: ${processedVenues.filter(v => v.seoCategory === 'halal').length}`);
    console.log(`   - Vegetarian: ${processedVenues.filter(v => v.seoCategory === 'vegetarian').length}`);
    console.log(`   - General: ${processedVenues.filter(v => v.seoCategory === 'general').length}`);
    
  } catch (error) {
    console.error('❌ Error generating SEO descriptions:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  addSEODescriptions();
}

module.exports = { generateDescription, addSEODescriptions };
