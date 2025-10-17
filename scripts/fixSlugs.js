const fs = require('fs');
const path = require('path');

// Script to validate and fix slug issues
class SlugValidator {
  constructor() {
    this.venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    this.backupPath = path.join(process.cwd(), 'backups', `venues-slug-fix-${Date.now()}.json`);
  }

  // Create backup
  createBackup() {
    try {
      if (!fs.existsSync(path.dirname(this.backupPath))) {
        fs.mkdirSync(path.dirname(this.backupPath), { recursive: true });
      }
      fs.copyFileSync(this.venuesPath, this.backupPath);
      console.log(`✅ Backup created: ${this.backupPath}`);
      return true;
    } catch (error) {
      console.error('❌ Error creating backup:', error);
      return false;
    }
  }

  // Load venues data
  loadVenues() {
    try {
      const fileContent = fs.readFileSync(this.venuesPath, 'utf8');
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : (data.venues || []);
    } catch (error) {
      console.error('❌ Error loading venues:', error);
      return [];
    }
  }

  // Save venues data
  saveVenues(venues) {
    try {
      const data = {
        venues: venues,
        lastUpdated: new Date().toISOString(),
        totalVenues: venues.length,
        slugFixApplied: true
      };

      fs.writeFileSync(this.venuesPath, JSON.stringify(data, null, 2));
      console.log(`✅ Saved ${venues.length} venues with slug fixes`);
      return true;
    } catch (error) {
      console.error('❌ Error saving venues:', error);
      return false;
    }
  }

  // Generate proper slug with unique identifier
  generateProperSlug(name, placeId) {
    if (!name) return 'unknown';
    
    // Create base slug from name
    let slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Add unique identifier from place_id
    if (placeId) {
      const uniqueId = placeId.slice(-8); // Last 8 characters
      slug = `${slug}-${uniqueId}`;
    }
    
    return slug || 'venue';
  }

  // Validate and fix slugs
  validateAndFixSlugs() {
    console.log('🔍 Starting slug validation and fix...');
    
    // Create backup
    if (!this.createBackup()) {
      return false;
    }

    // Load venues
    const venues = this.loadVenues();
    if (venues.length === 0) {
      console.error('❌ No venues found');
      return false;
    }

    console.log(`📊 Loaded ${venues.length} venues`);

    // Track issues
    const issues = [];
    const fixes = [];
    const slugMap = new Map();

    // Process each venue
    venues.forEach((venue, index) => {
      const originalSlug = venue.slug;
      const expectedSlug = this.generateProperSlug(venue.name, venue.place_id);
      
      // Check if slug needs fixing
      if (!originalSlug || originalSlug !== expectedSlug) {
        issues.push({
          index,
          name: venue.name,
          placeId: venue.place_id,
          originalSlug,
          expectedSlug
        });
        
        // Fix the slug
        venue.slug = expectedSlug;
        fixes.push({
          name: venue.name,
          oldSlug: originalSlug,
          newSlug: expectedSlug
        });
      }

      // Check for duplicate slugs
      if (slugMap.has(venue.slug)) {
        console.warn(`⚠️ Duplicate slug found: ${venue.slug} for ${venue.name}`);
      } else {
        slugMap.set(venue.slug, venue.name);
      }
    });

    // Report results
    console.log(`\n📊 Slug Validation Results:`);
    console.log(`Total venues: ${venues.length}`);
    console.log(`Issues found: ${issues.length}`);
    console.log(`Fixes applied: ${fixes.length}`);
    console.log(`Unique slugs: ${slugMap.size}`);

    if (fixes.length > 0) {
      console.log(`\n🔧 Sample fixes:`);
      fixes.slice(0, 5).forEach(fix => {
        console.log(`  ${fix.name}: ${fix.oldSlug || 'missing'} → ${fix.newSlug}`);
      });
      
      if (fixes.length > 5) {
        console.log(`  ... and ${fixes.length - 5} more fixes`);
      }
    }

    // Save fixed data
    if (fixes.length > 0) {
      console.log(`\n💾 Saving fixed data...`);
      const saved = this.saveVenues(venues);
      if (saved) {
        console.log(`✅ Successfully fixed ${fixes.length} slug issues`);
        return true;
      } else {
        console.error('❌ Failed to save fixed data');
        return false;
      }
    } else {
      console.log(`✅ No slug issues found - all slugs are correct`);
      return true;
    }
  }

  // Test specific restaurant
  testRestaurant(restaurantName) {
    const venues = this.loadVenues();
    const restaurant = venues.find(v => 
      v.name.toLowerCase().includes(restaurantName.toLowerCase())
    );
    
    if (restaurant) {
      console.log(`\n🔍 Testing ${restaurant.name}:`);
      console.log(`  Current slug: ${restaurant.slug}`);
      console.log(`  Expected slug: ${this.generateProperSlug(restaurant.name, restaurant.place_id)}`);
      console.log(`  Slug correct: ${restaurant.slug === this.generateProperSlug(restaurant.name, restaurant.place_id)}`);
      return restaurant;
    } else {
      console.log(`❌ Restaurant "${restaurantName}" not found`);
      return null;
    }
  }
}

// CLI interface
if (require.main === module) {
  const validator = new SlugValidator();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'fix':
      validator.validateAndFixSlugs();
      break;

    case 'test':
      const restaurantName = args[1] || 'halal street kitchen';
      validator.testRestaurant(restaurantName);
      break;

    case 'validate':
      const venues = validator.loadVenues();
      const issues = venues.filter(v => !v.slug || v.slug.length < 10);
      console.log(`Total venues: ${venues.length}`);
      console.log(`Venues with issues: ${issues.length}`);
      if (issues.length > 0) {
        console.log('Sample issues:');
        issues.slice(0, 3).forEach(v => {
          console.log(`  ${v.name}: ${v.slug || 'missing slug'}`);
        });
      }
      break;

    default:
      console.log('Usage: node scripts/fixSlugs.js [fix|test|validate]');
      console.log('  fix      - Fix all slug issues');
      console.log('  test     - Test specific restaurant slug');
      console.log('  validate - Validate current slugs');
      break;
  }
}

module.exports = SlugValidator;
