const fs = require('fs');
const path = require('path');

// Required schema for each venue
const requiredSchema = {
  place_id: 'string',
  slug: 'string', 
  name: 'string',
  description: 'string',
  cuisines: 'array',
  categories: 'array',
  dietary_tags: 'object',
  rating: 'number',
  user_ratings_total: 'number',
  price_level: 'number',
  photos: 'array',
  address: 'object',
  fsa_rating: 'number',
  opening_hours: 'object',
  website: 'string',
  phone: 'string',
  borough: 'string'
};

// Dietary tags that should be normalized
const dietaryTags = ['halal', 'vegan', 'vegetarian', 'gluten_free'];

// Cuisine normalization mapping
const cuisineNormalization = {
  'modern european': 'modern-european',
  'modern-european': 'modern-european',
  'modern_european': 'modern-european',
  'indian': 'indian',
  'italian': 'italian',
  'japanese': 'japanese',
  'chinese': 'chinese',
  'thai': 'thai',
  'turkish': 'turkish',
  'french': 'french',
  'spanish': 'spanish',
  'korean': 'korean',
  'mexican': 'mexican',
  'british': 'british',
  'mediterranean': 'mediterranean',
  'vietnamese': 'vietnamese',
  'caribbean': 'caribbean'
};

function validateVenueSchema(venue) {
  const issues = [];
  
  // Check required fields
  Object.entries(requiredSchema).forEach(([field, type]) => {
    if (!venue[field]) {
      issues.push(`Missing required field: ${field}`);
    } else if (type === 'array' && !Array.isArray(venue[field])) {
      issues.push(`Field ${field} should be array`);
    } else if (type === 'object' && typeof venue[field] !== 'object') {
      issues.push(`Field ${field} should be object`);
    } else if (type === 'number' && typeof venue[field] !== 'number') {
      issues.push(`Field ${field} should be number`);
    } else if (type === 'string' && typeof venue[field] !== 'string') {
      issues.push(`Field ${field} should be string`);
    }
  });
  
  // Validate specific fields
  if (venue.rating && (venue.rating < 0 || venue.rating > 5)) {
    issues.push('Rating should be between 0 and 5');
  }
  
  if (venue.price_level && (venue.price_level < 0 || venue.price_level > 4)) {
    issues.push('Price level should be between 0 and 4');
  }
  
  if (venue.fsa_rating && (venue.fsa_rating < 0 || venue.fsa_rating > 5)) {
    issues.push('FSA rating should be between 0 and 5');
  }
  
  if (venue.cuisines && !Array.isArray(venue.cuisines)) {
    issues.push('Cuisines should be an array');
  }
  
  if (venue.dietary_tags && typeof venue.dietary_tags !== 'object') {
    issues.push('Dietary tags should be an object');
  }
  
  return issues;
}

function normalizeVenueData(venue) {
  const normalized = { ...venue };
  
  // Normalize cuisines
  if (normalized.cuisines && Array.isArray(normalized.cuisines)) {
    normalized.cuisines = normalized.cuisines.map(cuisine => {
      const normalizedCuisine = cuisineNormalization[cuisine.toLowerCase()];
      return normalizedCuisine || cuisine.toLowerCase();
    });
  }
  
  // Normalize dietary tags
  if (normalized.dietary_tags) {
    const normalizedDietary = {};
    dietaryTags.forEach(tag => {
      if (normalized.dietary_tags[tag] !== undefined) {
        normalizedDietary[tag] = Boolean(normalized.dietary_tags[tag]);
      }
    });
    normalized.dietary_tags = normalizedDietary;
  }
  
  // Ensure description is not empty
  if (!normalized.description || normalized.description.trim() === '') {
    normalized.description = `Experience exceptional ${normalized.cuisines?.[0] || 'cuisine'} in the heart of London.`;
  }
  
  // Ensure slug is present and valid
  if (!normalized.slug || normalized.slug.trim() === '') {
    normalized.slug = generateSlug(normalized.name);
  }
  
  // Normalize address
  if (normalized.address && typeof normalized.address === 'object') {
    if (!normalized.address.formatted && normalized.address.street) {
      normalized.address.formatted = `${normalized.address.street}, London`;
    }
  }
  
  return normalized;
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'venue';
}

function auditAndNormalizeData() {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = data.venues || data;
    const auditResults = {
      totalVenues: venues.length,
      schemaIssues: [],
      normalizationCount: 0,
      cuisineDistribution: {},
      dietaryDistribution: {},
      duplicates: [],
      missingFields: {}
    };
    
    console.log('🔍 Starting data audit and normalization...');
    
    // Track processed venues to detect duplicates
    const processedVenues = new Set();
    
    venues.forEach((venue, index) => {
      // Check for duplicates
      const venueKey = `${venue.name}-${venue.borough}`;
      if (processedVenues.has(venueKey)) {
        auditResults.duplicates.push({
          name: venue.name,
          borough: venue.borough,
          index
        });
      } else {
        processedVenues.add(venueKey);
      }
      
      // Validate schema
      const schemaIssues = validateVenueSchema(venue);
      if (schemaIssues.length > 0) {
        auditResults.schemaIssues.push({
          venue: venue.name,
          issues: schemaIssues
        });
      }
      
      // Count missing fields
      Object.keys(requiredSchema).forEach(field => {
        if (!venue[field]) {
          auditResults.missingFields[field] = (auditResults.missingFields[field] || 0) + 1;
        }
      });
      
      // Normalize venue data
      const normalizedVenue = normalizeVenueData(venue);
      
      // Check if normalization changed anything
      if (JSON.stringify(venue) !== JSON.stringify(normalizedVenue)) {
        auditResults.normalizationCount++;
        venues[index] = normalizedVenue;
      }
      
      // Count cuisines
      if (normalizedVenue.cuisines && normalizedVenue.cuisines.length > 0) {
        const cuisine = normalizedVenue.cuisines[0];
        auditResults.cuisineDistribution[cuisine] = (auditResults.cuisineDistribution[cuisine] || 0) + 1;
      }
      
      // Count dietary options
      if (normalizedVenue.dietary_tags) {
        Object.entries(normalizedVenue.dietary_tags).forEach(([tag, value]) => {
          if (value) {
            auditResults.dietaryDistribution[tag] = (auditResults.dietaryDistribution[tag] || 0) + 1;
          }
        });
      }
    });
    
    // Save normalized data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    // Generate report
    console.log('\n📊 AUDIT RESULTS:');
    console.log(`   Total venues: ${auditResults.totalVenues}`);
    console.log(`   Schema issues: ${auditResults.schemaIssues.length}`);
    console.log(`   Normalized venues: ${auditResults.normalizationCount}`);
    console.log(`   Duplicates found: ${auditResults.duplicates.length}`);
    
    console.log('\n🍽️  Cuisine Distribution:');
    Object.entries(auditResults.cuisineDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([cuisine, count]) => {
        console.log(`   ${cuisine}: ${count} restaurants`);
      });
    
    console.log('\n🥗 Dietary Distribution:');
    Object.entries(auditResults.dietaryDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([tag, count]) => {
        console.log(`   ${tag}: ${count} restaurants`);
      });
    
    console.log('\n❌ Missing Fields:');
    Object.entries(auditResults.missingFields)
      .sort(([,a], [,b]) => b - a)
      .forEach(([field, count]) => {
        console.log(`   ${field}: ${count} missing`);
      });
    
    if (auditResults.duplicates.length > 0) {
      console.log('\n🔄 Duplicates Found:');
      auditResults.duplicates.forEach(dup => {
        console.log(`   ${dup.name} (${dup.borough})`);
      });
    }
    
    if (auditResults.schemaIssues.length > 0) {
      console.log('\n⚠️  Schema Issues:');
      auditResults.schemaIssues.slice(0, 5).forEach(issue => {
        console.log(`   ${issue.venue}: ${issue.issues.join(', ')}`);
      });
      if (auditResults.schemaIssues.length > 5) {
        console.log(`   ... and ${auditResults.schemaIssues.length - 5} more`);
      }
    }
    
    return auditResults;
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
    return { success: false, error: error.message };
  }
}

// Run the audit
const results = auditAndNormalizeData();

if (results.success !== false) {
  console.log('\n✅ Data audit and normalization completed successfully!');
} else {
  console.log(`\n❌ Audit failed: ${results.error}`);
}
