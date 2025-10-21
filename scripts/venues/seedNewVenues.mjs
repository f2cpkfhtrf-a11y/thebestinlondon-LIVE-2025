import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to create a slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to generate place_id-like identifier
function generatePlaceId() {
  return 'ChIJ' + Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase();
}

// Helper function to normalize venue data
function normalizeVenue(venue, index) {
  const slug = createSlug(venue.name);
  const placeId = generatePlaceId();
  
  // Area mapping as specified
  let areaSlug = venue.area?.toLowerCase().replace(/\s+/g, '-') || venue.borough?.toLowerCase().replace(/\s+/g, '-') || 'london';
  let borough = venue.borough || 'London';
  
  // Specific area mappings
  if (venue.area?.toLowerCase().includes('ilford') || borough.toLowerCase().includes('redbridge')) {
    areaSlug = 'ilford';
    borough = 'Redbridge';
  } else if (venue.area?.toLowerCase().includes('romford') || borough.toLowerCase().includes('havering')) {
    areaSlug = 'romford';
    borough = 'Havering';
  } else if (venue.area?.toLowerCase().includes('central') || 
             ['Mayfair', 'Soho', 'Covent Garden', 'St. James\'s', 'Knightsbridge', 'Chelsea'].some(area => venue.area?.includes(area))) {
    areaSlug = 'central-london';
  } else if (venue.area?.toLowerCase().includes('slough')) {
    areaSlug = 'slough';
    borough = 'Slough';
  } else if (venue.area?.toLowerCase().includes('southall')) {
    areaSlug = 'southall';
    borough = 'Ealing';
  }

  return {
    place_id: placeId,
    slug: `${slug}-${placeId.slice(-8)}`,
    name: venue.name,
    address: venue.address || '',
    postcode: venue.postcode || '',
    area: areaSlug,
    borough: borough,
    vicinity: venue.address || venue.area || borough,
    cuisines: Array.isArray(venue.cuisines) ? venue.cuisines : [venue.cuisines].filter(Boolean),
    categories: ['restaurant'],
    dietary_tags: venue.dietary_tags || {},
    halal_verified: venue.halal_verified || false,
    phone: venue.phone || '',
    website: venue.website || '',
    latitude: venue.latitude || null,
    longitude: venue.longitude || null,
    price_level: null,
    price_range_tbd: true,
    menu_tbd: true,
    busy_hours_tbd: true,
    rating: null,
    user_ratings_total: null,
    reviews_count: null,
    created_at: new Date().toISOString(),
    image_card_path: null,
    image_hero_path: null,
    photos: []
  };
}

// Helper function to check for duplicates
function isDuplicate(newVenue, existingVenues) {
  return existingVenues.some(existing => {
    // Check by slug
    if (existing.slug === newVenue.slug) return true;
    
    // Check by name + postcode fuzzy match
    const nameMatch = existing.name?.toLowerCase().trim() === newVenue.name?.toLowerCase().trim();
    const postcodeMatch = existing.postcode?.toLowerCase().trim() === newVenue.postcode?.toLowerCase().trim();
    
    return nameMatch && postcodeMatch;
  });
}

async function seedNewVenues() {
  console.log('🌱 Starting venue seeding...');
  
  const seedFiles = [
    'central_london.json',
    'ilford_romford_east.json', 
    'slough_southall.json'
  ];
  
  let newVenues = [];
  
  // Load seed files
  for (const fileName of seedFiles) {
    const filePath = path.join(__dirname, '../../data/seed', fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping missing seed file: ${fileName}`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const venues = JSON.parse(content);
      
      if (Array.isArray(venues)) {
        const normalized = venues.map((venue, index) => normalizeVenue(venue, index));
        newVenues.push(...normalized);
        console.log(`✅ Loaded ${venues.length} venues from ${fileName}`);
      } else {
        console.log(`⚠️  Invalid format in ${fileName}, skipping`);
      }
    } catch (error) {
      console.log(`⚠️  Error loading ${fileName}: ${error.message}`);
    }
  }
  
  if (newVenues.length === 0) {
    console.log('❌ No venues loaded from seed files');
    return;
  }
  
  // Load existing venues
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ Existing venues.json not found');
    return;
  }
  
  const existingData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const existingVenues = Array.isArray(existingData) ? existingData : (existingData.venues || []);
  
  console.log(`📊 Existing venues: ${existingVenues.length}`);
  
  // Filter out duplicates
  const uniqueNewVenues = newVenues.filter(newVenue => !isDuplicate(newVenue, existingVenues));
  
  console.log(`🆕 New unique venues: ${uniqueNewVenues.length} (filtered from ${newVenues.length})`);
  
  if (uniqueNewVenues.length === 0) {
    console.log('✅ No new venues to add');
    return;
  }
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(__dirname, '../../reports', `venues_backup_${timestamp}.json`);
  
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify(existingData, null, 2));
  console.log(`💾 Backup created: ${backupPath}`);
  
  // Merge venues
  const updatedVenues = [...existingVenues, ...uniqueNewVenues];
  
  // Update the data structure
  const updatedData = Array.isArray(existingData) ? updatedVenues : {
    ...existingData,
    venues: updatedVenues,
    lastUpdated: new Date().toISOString()
  };
  
  // Atomic write
  fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
  
  // Create diff report
  const diffPath = path.join(__dirname, '../../reports', `venues_diff_${timestamp}.md`);
  const diffContent = `# Venue Seeding Report - ${new Date().toISOString()}

## Summary
- **Existing venues**: ${existingVenues.length}
- **New venues added**: ${uniqueNewVenues.length}
- **Total venues**: ${updatedVenues.length}

## New Venues Added

${uniqueNewVenues.map(venue => `- **${venue.name}** (${venue.area}, ${venue.borough}) - ${venue.cuisines.join(', ')}`).join('\n')}

## Files Modified
- \`public/venues.json\` - Added ${uniqueNewVenues.length} new venues

## Backup
- Backup saved to: \`${backupPath}\`
`;
  
  fs.writeFileSync(diffPath, diffContent);
  
  console.log(`✅ Successfully added ${uniqueNewVenues.length} new venues`);
  console.log(`📊 Total venues now: ${updatedVenues.length}`);
  console.log(`📝 Diff report: ${diffPath}`);
}

// Run the script
seedNewVenues().catch(console.error);
