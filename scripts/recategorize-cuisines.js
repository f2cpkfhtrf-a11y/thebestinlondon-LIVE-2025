const fs = require('fs');
const path = require('path');

// Load venues
const venuesPath = path.join(__dirname, '../public/venues.json');
const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

console.log(`\n🔍 Analyzing ${venues.length} venues...`);

// Count current "International" restaurants
const internationalCount = venues.filter(v => 
  v.cuisines && v.cuisines.some(c => c.toLowerCase() === 'international')
).length;

console.log(`📊 Found ${internationalCount} venues with "International" cuisine\n`);

// Smart recategorization logic
function recategorizeCuisine(venue) {
  const name = venue.name.toLowerCase();
  const description = (venue.description || '').toLowerCase();
  const types = venue.types || [];
  
  // Check name for cuisine clues
  const cuisinePatterns = {
    'indian': /indian|tandoor|curry|biryani|masala|dosa|naan/i,
    'italian': /italian|pizza|pasta|trattoria|osteria|ristorante/i,
    'japanese': /japanese|sushi|ramen|izakaya|yakitori|tempura/i,
    'chinese': /chinese|dim sum|szechuan|cantonese|peking/i,
    'thai': /thai|pad thai|tom yum/i,
    'french': /french|bistro|brasserie|patisserie/i,
    'greek': /greek|souvlaki|gyros|taverna/i,
    'turkish': /turkish|kebab|mezze|meze/i,
    'korean': /korean|kimchi|bibimbap|bulgogi/i,
    'mexican': /mexican|taco|burrito|cantina/i,
    'vietnamese': /vietnamese|pho|banh mi/i,
    'spanish': /spanish|tapas|paella|bodega/i,
    'lebanese': /lebanese|shawarma|falafel/i,
    'persian': /persian|iranian/i,
    'american': /american|burger|diner|bbq/i,
    'caribbean': /caribbean|jerk|jamaican/i,
    'african': /african|ethiopian|moroccan/i,
    'middle eastern': /middle eastern|mezze/i
  };
  
  // Check against name and description
  for (const [cuisine, pattern] of Object.entries(cuisinePatterns)) {
    if (pattern.test(name) || pattern.test(description)) {
      return cuisine;
    }
  }
  
  // Check Google Places types
  const typeMapping = {
    'indian_restaurant': 'indian',
    'italian_restaurant': 'italian',
    'japanese_restaurant': 'japanese',
    'chinese_restaurant': 'chinese',
    'thai_restaurant': 'thai',
    'french_restaurant': 'french',
    'greek_restaurant': 'greek',
    'turkish_restaurant': 'turkish',
    'korean_restaurant': 'korean',
    'mexican_restaurant': 'mexican',
    'vietnamese_restaurant': 'vietnamese',
    'spanish_restaurant': 'spanish',
    'middle_eastern_restaurant': 'middle eastern',
    'american_restaurant': 'american'
  };
  
  for (const [type, cuisine] of Object.entries(typeMapping)) {
    if (types.includes(type)) {
      return cuisine;
    }
  }
  
  // If still international, try to infer from other cuisines present
  if (venue.cuisines && venue.cuisines.length > 1) {
    const otherCuisines = venue.cuisines.filter(c => c.toLowerCase() !== 'international');
    if (otherCuisines.length > 0) {
      return null; // Keep other cuisines, just remove "international"
    }
  }
  
  return 'international'; // Keep as international if no better match
}

// Recategorize venues
let recategorized = 0;
let removed = 0;
let kept = 0;

const updatedVenues = venues.map(venue => {
  if (!venue.cuisines || !venue.cuisines.some(c => c.toLowerCase() === 'international')) {
    return venue; // No change needed
  }
  
  const newCuisine = recategorizeCuisine(venue);
  
  if (newCuisine === null) {
    // Remove "international", keep other cuisines
    venue.cuisines = venue.cuisines.filter(c => c.toLowerCase() !== 'international');
    removed++;
    return venue;
  }
  
  if (newCuisine !== 'international') {
    // Replace "international" with specific cuisine
    venue.cuisines = venue.cuisines.map(c => 
      c.toLowerCase() === 'international' ? newCuisine : c
    );
    recategorized++;
    console.log(`✓ ${venue.name}: international → ${newCuisine}`);
    return venue;
  }
  
  // Keep as international
  kept++;
  return venue;
});

console.log(`\n📈 RESULTS:`);
console.log(`   ✓ Recategorized: ${recategorized}`);
console.log(`   ✓ Removed (had other cuisines): ${removed}`);
console.log(`   ✓ Kept as international: ${kept}`);
console.log(`   ✓ Total processed: ${recategorized + removed + kept}`);

// Backup original
const backupPath = path.join(__dirname, '../data/venues-before-recategorization.json');
fs.writeFileSync(backupPath, JSON.stringify(venues, null, 2));
console.log(`\n💾 Backup saved: ${backupPath}`);

// Save updated venues
fs.writeFileSync(venuesPath, JSON.stringify(updatedVenues, null, 2));
console.log(`✅ Updated venues saved: ${venuesPath}`);

// Show breakdown by cuisine
console.log(`\n📊 CUISINE BREAKDOWN (after recategorization):`);
const cuisineCounts = {};
updatedVenues.forEach(v => {
  if (v.cuisines) {
    v.cuisines.forEach(c => {
      const lower = c.toLowerCase();
      cuisineCounts[lower] = (cuisineCounts[lower] || 0) + 1;
    });
  }
});

Object.entries(cuisineCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([cuisine, count]) => {
    console.log(`   ${cuisine}: ${count}`);
  });

console.log(`\n✨ Done! Refresh your dev server to see changes.\n`);
