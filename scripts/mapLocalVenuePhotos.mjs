import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const CACHE_PATH = path.join(ROOT, '.cache/venues_with_local_photos.json');
const REPORT_PATH = path.join(ROOT, 'reports/local_photos_mapping.json');

/**
 * Map existing local venue photos to enrich venue data
 * This script probes local folders and updates venue objects with found photos
 */
async function mapLocalVenuePhotos() {
  console.log('🔍 Mapping local venue photos...');
  
  try {
    // Ensure cache directory exists
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    
    // Load venues data
    if (!fs.existsSync(VENUES_PATH)) {
      console.log('❌ No venues.json found');
      return;
    }
    
    const venuesData = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`📊 Processing ${venues.length} venues...`);
    
    const enrichedVenues = [];
    const mappingReport = {
      timestamp: new Date().toISOString(),
      totalVenues: venues.length,
      venuesWithPhotos: 0,
      venuesWithCardPath: 0,
      venuesWithHeroPath: 0,
      photoSources: {},
      venues: []
    };
    
    for (const venue of venues) {
      const enrichedVenue = { ...venue };
      const slug = venue.slug;
      
      if (!slug) {
        console.log(`⚠️ Skipping venue without slug: ${venue.name}`);
        enrichedVenues.push(enrichedVenue);
        continue;
      }
      
      // Probe local folders for this venue
      const photoPaths = [];
      const possiblePaths = [
        // Venue-specific paths
        `/images/venues/${slug}/card.webp`,
        `/images/venues/${slug}/hero.webp`,
        `/images/venues/${slug}/1.webp`,
        `/images/venues/${slug}/2.webp`,
        `/images/venues/${slug}/3.webp`,
        
        // Sourced paths
        `/images/sourced/${slug}/card.webp`,
        `/images/sourced/${slug}/hero.webp`,
        `/images/sourced/${slug}/1.webp`,
        `/images/sourced/${slug}/2.webp`,
        `/images/sourced/${slug}/3.webp`,
        
        // Google photos
        `/images/google/${slug}/card.webp`,
        `/images/google/${slug}/hero.webp`,
        `/images/google/${slug}/1.webp`,
        `/images/google/${slug}/2.webp`,
        `/images/google/${slug}/3.webp`,
        
        // Alternative naming patterns
        `/images/venues/${slug}/${slug}-card.webp`,
        `/images/venues/${slug}/${slug}-hero.webp`,
        `/images/sourced/${slug}/${slug}-card.webp`,
        `/images/sourced/${slug}/${slug}-hero.webp`,
        `/images/google/${slug}/${slug}-card.webp`,
        `/images/google/${slug}/${slug}-hero.webp`,
      ];
      
      // Check each possible path
      for (const photoPath of possiblePaths) {
        const fullPath = path.join(ROOT, 'public', photoPath.replace(/^\/+/, ''));
        if (fs.existsSync(fullPath)) {
          photoPaths.push(photoPath);
          
          // Track source
          if (photoPath.includes('/venues/')) {
            mappingReport.photoSources.venues = (mappingReport.photoSources.venues || 0) + 1;
          } else if (photoPath.includes('/sourced/')) {
            mappingReport.photoSources.sourced = (mappingReport.photoSources.sourced || 0) + 1;
          } else if (photoPath.includes('/google/')) {
            mappingReport.photoSources.google = (mappingReport.photoSources.google || 0) + 1;
          }
        }
      }
      
      // Update venue with found photos
      if (photoPaths.length > 0) {
        enrichedVenue.photos_local = photoPaths;
        mappingReport.venuesWithPhotos++;
        
        // Set card path if not already set
        if (!enrichedVenue.image_card_path) {
          const cardPath = photoPaths.find(p => p.includes('card.webp')) || photoPaths[0];
          enrichedVenue.image_card_path = cardPath;
          mappingReport.venuesWithCardPath++;
        }
        
        // Set hero path if not already set
        if (!enrichedVenue.image_hero_path) {
          const heroPath = photoPaths.find(p => p.includes('hero.webp')) || photoPaths[0];
          enrichedVenue.image_hero_path = heroPath;
          mappingReport.venuesWithHeroPath++;
        }
        
        console.log(`✅ ${slug}: found ${photoPaths.length} photos`);
      } else {
        console.log(`⚠️ ${slug}: no local photos found`);
      }
      
      // Add venue to report
      mappingReport.venues.push({
        slug: slug,
        name: venue.name,
        photosFound: photoPaths.length,
        photos: photoPaths,
        hasCardPath: !!enrichedVenue.image_card_path,
        hasHeroPath: !!enrichedVenue.image_hero_path
      });
      
      enrichedVenues.push(enrichedVenue);
    }
    
    // Save enriched data to cache
    fs.writeFileSync(CACHE_PATH, JSON.stringify(enrichedVenues, null, 2));
    
    // Save mapping report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(mappingReport, null, 2));
    
    // Summary
    console.log('\n📊 Local Photos Mapping Summary:');
    console.log(`✅ Total venues processed: ${mappingReport.totalVenues}`);
    console.log(`📸 Venues with photos: ${mappingReport.venuesWithPhotos} (${(mappingReport.venuesWithPhotos/mappingReport.totalVenues*100).toFixed(1)}%)`);
    console.log(`🃏 Venues with card path: ${mappingReport.venuesWithCardPath}`);
    console.log(`🖼️ Venues with hero path: ${mappingReport.venuesWithHeroPath}`);
    console.log(`📁 Photo sources:`);
    Object.entries(mappingReport.photoSources).forEach(([source, count]) => {
      console.log(`   - ${source}: ${count} photos`);
    });
    
    console.log(`\n💾 Enriched data saved to: ${CACHE_PATH}`);
    console.log(`📝 Mapping report saved to: ${REPORT_PATH}`);
    
  } catch (error) {
    console.error(`❌ Error mapping local photos: ${error.message}`);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  mapLocalVenuePhotos().catch(error => {
    console.error('Failed to map local photos:', error);
    process.exit(1);
  });
}

export { mapLocalVenuePhotos };
