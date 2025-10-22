import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BACKUP_FILE = path.join(ROOT, 'backups', 'venues-before-image-replacement.json');
const CURRENT_FILE = path.join(ROOT, 'public', 'venues.json');
const REPORT_FILE = path.join(ROOT, 'reports', 'image_restoration_report.json');

console.log('🔄 RESTORING ORIGINAL RESTAURANT IMAGES');

// Read backup and current data
const backupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
const currentData = JSON.parse(fs.readFileSync(CURRENT_FILE, 'utf8'));

const backupVenues = backupData.venues || backupData;
const currentVenues = currentData.venues || currentData;

console.log(`📊 Backup venues: ${backupVenues.length}`);
console.log(`📊 Current venues: ${currentVenues.length}`);

// Create a map of current venues by slug for quick lookup
const currentVenueMap = new Map();
currentVenues.forEach(venue => {
  currentVenueMap.set(venue.slug, venue);
});

const results = [];
let restored = 0;
let skipped = 0;
let notFound = 0;

// Restore original image paths
for (const backupVenue of backupVenues) {
  const currentVenue = currentVenueMap.get(backupVenue.slug);
  
  if (!currentVenue) {
    notFound++;
    results.push({
      slug: backupVenue.slug,
      status: 'NOT_FOUND_IN_CURRENT',
      action: 'skipped'
    });
    continue;
  }

  // Check if we have original Google photos
  const hasGooglePhotos = backupVenue.photos && backupVenue.photos.length > 0;
  const hasImageUrl = backupVenue.image_url && !backupVenue.image_url.includes('placeholder');
  
  if (hasGooglePhotos || hasImageUrl) {
    // Restore original image paths
    if (hasGooglePhotos) {
      // Use the first Google photo
      const firstPhoto = backupVenue.photos[0];
      const photoPath = `/images/google/${backupVenue.slug}/hero.webp`;
      
      // Check if the local image file exists
      const localImagePath = path.join(ROOT, 'public', 'images', 'google', backupVenue.slug, 'hero.webp');
      const localImageExists = fs.existsSync(localImagePath);
      
      if (localImageExists) {
        currentVenue.image_card_path = photoPath;
        currentVenue.image_hero_path = photoPath;
        currentVenue.photos_local = backupVenue.photos;
        restored++;
        results.push({
          slug: backupVenue.slug,
          status: 'RESTORED_GOOGLE_PHOTO',
          image_path: photoPath,
          local_exists: true,
          action: 'restored'
        });
      } else {
        // Try restaurant directory
        const restaurantPath = `/images/restaurants/${backupVenue.slug}`;
        const restaurantImagePath = path.join(ROOT, 'public', 'images', 'restaurants', backupVenue.slug);
        
        if (fs.existsSync(restaurantImagePath)) {
          const files = fs.readdirSync(restaurantImagePath);
          const imageFile = files.find(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
          
          if (imageFile) {
            const fullPath = `${restaurantPath}/${imageFile}`;
            currentVenue.image_card_path = fullPath;
            currentVenue.image_hero_path = fullPath;
            currentVenue.photos_local = backupVenue.photos;
            restored++;
            results.push({
              slug: backupVenue.slug,
              status: 'RESTORED_RESTAURANT_IMAGE',
              image_path: fullPath,
              local_exists: true,
              action: 'restored'
            });
          } else {
            // Keep original image_url as fallback
            currentVenue.image_card_path = backupVenue.image_url;
            currentVenue.image_hero_path = backupVenue.image_url;
            currentVenue.photos_local = backupVenue.photos;
            restored++;
            results.push({
              slug: backupVenue.slug,
              status: 'RESTORED_IMAGE_URL',
              image_path: backupVenue.image_url,
              local_exists: false,
              action: 'restored'
            });
          }
        } else {
          // Keep original image_url as fallback
          currentVenue.image_card_path = backupVenue.image_url;
          currentVenue.image_hero_path = backupVenue.image_url;
          currentVenue.photos_local = backupVenue.photos;
          restored++;
          results.push({
            slug: backupVenue.slug,
            status: 'RESTORED_IMAGE_URL',
            image_path: backupVenue.image_url,
            local_exists: false,
            action: 'restored'
          });
        }
      }
    } else if (hasImageUrl) {
      // Use the original image_url
      currentVenue.image_card_path = backupVenue.image_url;
      currentVenue.image_hero_path = backupVenue.image_url;
      currentVenue.photos_local = backupVenue.photos || [];
      restored++;
      results.push({
        slug: backupVenue.slug,
        status: 'RESTORED_IMAGE_URL',
        image_path: backupVenue.image_url,
        local_exists: false,
        action: 'restored'
      });
    }
  } else {
    skipped++;
    results.push({
      slug: backupVenue.slug,
      status: 'NO_ORIGINAL_IMAGES',
      action: 'skipped'
    });
  }
}

// Write the restored venues.json
fs.writeFileSync(CURRENT_FILE, JSON.stringify(currentVenues, null, 2));

// Write restoration report
const report = {
  timestamp: new Date().toISOString(),
  total_backup_venues: backupVenues.length,
  total_current_venues: currentVenues.length,
  restored: restored,
  skipped: skipped,
  not_found: notFound,
  details: results
};

fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

console.log('✅ IMAGE RESTORATION COMPLETE');
console.log(`📸 Restored: ${restored} venues`);
console.log(`⏭️ Skipped: ${skipped} venues`);
console.log(`❌ Not found: ${notFound} venues`);
console.log(`📊 Report saved to: ${REPORT_FILE}`);





