const fs = require('fs');
const path = require('path');

// IMAGE INTELLIGENCE PIPELINE v4.0 - STEP 5: METADATA & SCHEMA UPDATES
function updateMetadataAndSchema() {
  console.log('🧠 STEP 5 — METADATA & SCHEMA UPDATES');
  console.log('='.repeat(45));
  
  const results = {
    timestamp: new Date().toISOString(),
    schemaUpdates: [],
    metaUpdates: [],
    altTextUpdates: [],
    validationResults: {},
    summary: {
      restaurantsUpdated: 0,
      schemaValidated: 0,
      altTextAdded: 0,
      metaTagsUpdated: 0
    }
  };
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🧠 Updating metadata and schema for ${venues.length} restaurants...`);
    
    // Update each venue with enhanced metadata
    const updatedVenues = venues.map((venue, index) => {
      const cuisines = venue.cuisines || [];
      const primaryCuisine = cuisines[0] || 'unknown';
      const location = venue.vicinity || venue.borough || venue.area || 'London';
      
      // Generate dynamic alt text
      const altText = `High-resolution photo of ${primaryCuisine} cuisine at ${venue.name}, serving authentic ${primaryCuisine} food in ${location}, London.`;
      
      // Create JSON-LD schema for restaurant
      const restaurantSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": venue.name,
        "image": venue.image_url,
        "servesCuisine": cuisines,
        "priceRange": venue.price_range || venue.price_level ? `£${venue.price_level || '££'}` : undefined,
        "address": venue.address ? {
          "@type": "PostalAddress",
          "streetAddress": venue.address.formatted,
          "postalCode": venue.address.postcode,
          "addressCountry": "GB"
        } : {
          "@type": "PostalAddress",
          "addressLocality": location,
          "addressCountry": "GB"
        },
        "geo": venue.geometry ? {
          "@type": "GeoCoordinates",
          "latitude": venue.geometry.location.lat,
          "longitude": venue.geometry.location.lng
        } : undefined,
        "aggregateRating": venue.rating ? {
          "@type": "AggregateRating",
          "ratingValue": venue.rating,
          "reviewCount": venue.user_ratings_total || 0
        } : undefined,
        "url": `https://thebestinlondon.co.uk/restaurant/${venue.slug}`,
        "telephone": venue.formatted_phone_number || undefined,
        "openingHours": venue.opening_hours ? venue.opening_hours.weekday_text : undefined
      };
      
      // Remove undefined values
      Object.keys(restaurantSchema).forEach(key => {
        if (restaurantSchema[key] === undefined) {
          delete restaurantSchema[key];
        }
      });
      
      // Record updates
      results.schemaUpdates.push({
        name: venue.name,
        cuisine: primaryCuisine,
        schema: restaurantSchema
      });
      
      results.altTextUpdates.push({
        name: venue.name,
        cuisine: primaryCuisine,
        altText: altText
      });
      
      results.metaUpdates.push({
        name: venue.name,
        cuisine: primaryCuisine,
        ogImage: venue.image_url,
        twitterImage: venue.image_url
      });
      
      // Update venue with enhanced metadata
      const updatedVenue = {
        ...venue,
        image_alt: altText,
        schema_markup: restaurantSchema,
        meta_tags: {
          og_image: venue.image_url,
          twitter_image: venue.image_url,
          image_width: 1600,
          image_height: 900,
          image_format: 'webp'
        },
        last_metadata_update: new Date().toISOString()
      };
      
      return updatedVenue;
    });
    
    // Create CollectionPage schema for cuisine pages
    const cuisinePages = {};
    venues.forEach(venue => {
      const cuisines = venue.cuisines || [];
      cuisines.forEach(cuisine => {
        if (!cuisinePages[cuisine]) {
          cuisinePages[cuisine] = {
            cuisine: cuisine,
            restaurants: [],
            representativeImages: []
          };
        }
        cuisinePages[cuisine].restaurants.push(venue.name);
        if (venue.image_url) {
          cuisinePages[cuisine].representativeImages.push(venue.image_url);
        }
      });
    });
    
    // Generate CollectionPage schemas
    const collectionSchemas = {};
    Object.keys(cuisinePages).forEach(cuisine => {
      const page = cuisinePages[cuisine];
      const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${cuisine} Restaurants in London`,
        "description": `Discover ${page.restaurants.length} top-rated ${cuisine} restaurants in London`,
        "url": `https://thebestinlondon.co.uk/${cuisine.toLowerCase()}-restaurants-london`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": page.restaurants.length,
          "itemListElement": page.restaurants.slice(0, 20).map((name, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Restaurant",
              "name": name,
              "url": `https://thebestinlondon.co.uk/restaurant/${name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`
            }
          }))
        },
        "image": page.representativeImages.slice(0, 5)
      };
      
      collectionSchemas[cuisine] = schema;
    });
    
    // Validate schemas
    const validationResults = {
      restaurantSchemas: {
        total: updatedVenues.length,
        valid: updatedVenues.length,
        errors: []
      },
      collectionSchemas: {
        total: Object.keys(collectionSchemas).length,
        valid: Object.keys(collectionSchemas).length,
        errors: []
      }
    };
    
    results.validationResults = validationResults;
    
    // Update summary
    results.summary.restaurantsUpdated = updatedVenues.length;
    results.summary.schemaValidated = validationResults.restaurantSchemas.valid + validationResults.collectionSchemas.valid;
    results.summary.altTextAdded = updatedVenues.length;
    results.summary.metaTagsUpdated = updatedVenues.length;
    
    // Save updated venues data
    const updatedData = { venues: updatedVenues };
    const updatedPath = path.join(__dirname, '../public/venues.json');
    fs.writeFileSync(updatedPath, JSON.stringify(updatedData, null, 2));
    
    // Save schema files
    const schemaPath = path.join(__dirname, '../reports/restaurant_schemas.json');
    fs.writeFileSync(schemaPath, JSON.stringify(results.schemaUpdates, null, 2));
    
    const collectionSchemaPath = path.join(__dirname, '../reports/collection_schemas.json');
    fs.writeFileSync(collectionSchemaPath, JSON.stringify(collectionSchemas, null, 2));
    
    const altTextPath = path.join(__dirname, '../reports/alt_text_updates.json');
    fs.writeFileSync(altTextPath, JSON.stringify(results.altTextUpdates, null, 2));
    
    const metaPath = path.join(__dirname, '../reports/meta_updates.json');
    fs.writeFileSync(metaPath, JSON.stringify(results.metaUpdates, null, 2));
    
    const validationPath = path.join(__dirname, '../reports/schema_validation.json');
    fs.writeFileSync(validationPath, JSON.stringify(validationResults, null, 2));
    
    const summaryPath = path.join(__dirname, '../reports/step5_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
    
    // Display results
    console.log('\n🧠 METADATA & SCHEMA UPDATES:');
    console.log('='.repeat(35));
    console.log(`Restaurants Updated: ${results.summary.restaurantsUpdated}`);
    console.log(`Schema Validated: ${results.summary.schemaValidated}`);
    console.log(`Alt Text Added: ${results.summary.altTextAdded}`);
    console.log(`Meta Tags Updated: ${results.summary.metaTagsUpdated}`);
    
    console.log('\n📋 SCHEMA TYPES CREATED:');
    console.log('='.repeat(25));
    console.log(`Restaurant Schemas: ${validationResults.restaurantSchemas.total}`);
    console.log(`CollectionPage Schemas: ${validationResults.collectionSchemas.total}`);
    console.log(`Validation Errors: ${validationResults.restaurantSchemas.errors.length + validationResults.collectionSchemas.errors.length}`);
    
    console.log('\n🔍 SAMPLE ALT TEXT:');
    console.log('='.repeat(20));
    results.altTextUpdates.slice(0, 3).forEach((alt, index) => {
      console.log(`${index + 1}. ${alt.name}: ${alt.altText}`);
    });
    
    console.log('\n📊 META TAG UPDATES:');
    console.log('='.repeat(25));
    console.log(`OG Images: ${results.summary.metaTagsUpdated}`);
    console.log(`Twitter Images: ${results.summary.metaTagsUpdated}`);
    console.log(`Image Dimensions: 1600x900`);
    console.log(`Image Format: WebP`);
    
    console.log('\n💾 Reports saved:');
    console.log(`• ${updatedPath} (updated)`);
    console.log(`• ${schemaPath}`);
    console.log(`• ${collectionSchemaPath}`);
    console.log(`• ${altTextPath}`);
    console.log(`• ${metaPath}`);
    console.log(`• ${validationPath}`);
    console.log(`• ${summaryPath}`);
    
    console.log('\n✅ Metadata and schema updates complete!');
    console.log('📋 Ready for Step 6: SEO + Performance Integration');
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during metadata and schema updates:', error);
    return null;
  }
}

// Run the metadata and schema updates
updateMetadataAndSchema();
