const fs = require('fs');
const path = require('path');

// Cuisine classification rules based on restaurant name patterns
const cuisinePatterns = {
  indian: [
    'masala', 'tandoori', 'biryani', 'curry', 'dhaba', 'dosa', 'punjabi', 
    'bengali', 'indian', 'mumbai', 'delhi', 'kolkata', 'madras', 'dishoom',
    'gymkhana', 'tamarind', 'roti', 'naan', 'vindaloo', 'tikka', 'samosa'
  ],
  italian: [
    'pizza', 'pasta', 'trattoria', 'osteria', 'ristorante', 'italian',
    'romano', 'venezia', 'napoli', 'sicilian', 'tuscan', 'carbonara',
    'parmigiana', 'margherita', 'padella', 'barrafina', 'bocca', 'polpo'
  ],
  japanese: [
    'sushi', 'ramen', 'izakaya', 'yakitori', 'tempura', 'teriyaki', 
    'japanese', 'tokyo', 'osaka', 'kyoto', 'udon', 'sashimi', 'wagyu',
    'tonkatsu', 'nobu', 'zuma', 'sake', 'shochu', 'bento', 'miso'
  ],
  chinese: [
    'chinese', 'dim sum', 'dumpling', 'noodle', 'wok', 'canton', 'szechuan',
    'peking', 'beijing', 'shanghai', 'hong kong', 'hakkasan', 'yauatcha',
    'dumplings', 'bao', 'chow mein', 'kung pao', 'sweet and sour'
  ],
  thai: [
    'thai', 'pad thai', 'tom yum', 'massaman', 'bangkok', 'phuket',
    'green curry', 'red curry', 'som tam', 'papaya', 'lemongrass'
  ],
  korean: [
    'korean', 'kimchi', 'bibimbap', 'bulgogi', 'seoul', 'bbq', 'kbbq',
    'gogi', 'banchan', 'soju', 'makgeolli', 'jjigae', 'galbi'
  ],
  turkish: [
    'turkish', 'kebab', 'istanbul', 'meze', 'ottoman', 'anatolian',
    'doner', 'shawarma', 'baklava', 'lahmacun', 'pide'
  ],
  french: [
    'french', 'bistro', 'brasserie', 'patisserie', 'croissant', 'paris',
    'provencal', 'lyon', 'bordeaux', 'escargot', 'foie gras', 'roux'
  ],
  spanish: [
    'spanish', 'tapas', 'paella', 'barcelona', 'madrid', 'basque',
    'pintxos', 'jamon', 'chorizo', 'sangria', 'rioja', 'barrafina'
  ],
  greek: [
    'greek', 'taverna', 'souvlaki', 'moussaka', 'athens', 'santorini',
    'gyros', 'feta', 'tzatziki', 'halloumi', 'meze'
  ],
  mexican: [
    'mexican', 'taco', 'burrito', 'tequila', 'salsa', 'nacho', 'fajita',
    'enchilada', 'quesadilla', 'guacamole', 'mariachi', 'wahaca'
  ],
  lebanese: [
    'lebanese', 'shawarma', 'falafel', 'hummus', 'beirut', 'mezze',
    'tabbouleh', 'kibbeh', 'fattoush', 'manakish'
  ],
  vietnamese: [
    'vietnamese', 'pho', 'banh mi', 'hanoi', 'saigon', 'spring roll',
    'bun cha', 'nem', 'vietnamese'
  ],
  persian: [
    'persian', 'iranian', 'tehran', 'kebab', 'tahdig', 'saffron',
    'pomegranate', 'rose water'
  ],
  british: [
    'fish and chips', 'pie and mash', 'sunday roast', 'pub', 'gastropub',
    'english', 'british', 'afternoon tea', 'scotch', 'yorkshire'
  ],
  american: [
    'burger', 'bbq', 'steakhouse', 'grill', 'diner', 'american',
    'wings', 'ribs', 'mac and cheese', 'hot dog'
  ]
};

// Load venues
const filePath = path.join(__dirname, '../public/venues.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔍 Starting cuisine reclassification...\n');
console.log(`Total venues: ${data.venues.length}`);

let reclassified = 0;
let unchanged = 0;

// Process each venue
data.venues.forEach(venue => {
  const name = venue.name.toLowerCase();
  const currentCuisine = venue.cuisines?.[0]?.toLowerCase();
  
  // Skip if already has a specific cuisine (not international)
  if (currentCuisine && currentCuisine !== 'international') {
    unchanged++;
    return;
  }
  
  // Try to match cuisine patterns
  let bestMatch = null;
  let maxMatches = 0;
  
  for (const [cuisine, patterns] of Object.entries(cuisinePatterns)) {
    const matches = patterns.filter(pattern => name.includes(pattern)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = cuisine;
    }
  }
  
  // Update cuisine if we found a match
  if (bestMatch && maxMatches > 0) {
    venue.cuisines = [bestMatch];
    reclassified++;
    console.log(`✓ ${venue.name} → ${bestMatch}`);
  } else {
    unchanged++;
  }
});

// Save updated data
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log('\n═══════════════════════════════════════════════════');
console.log('✅ RECLASSIFICATION COMPLETE');
console.log('═══════════════════════════════════════════════════');
console.log(`Reclassified: ${reclassified}`);
console.log(`Unchanged: ${unchanged}`);

// Calculate new cuisine counts
const newCounts = {};
data.venues.forEach(v => {
  if (v.cuisines && v.cuisines.length > 0) {
    const cuisine = v.cuisines[0].toLowerCase();
    newCounts[cuisine] = (newCounts[cuisine] || 0) + 1;
  }
});

console.log('\n📊 NEW CUISINE DISTRIBUTION:');
Object.entries(newCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cuisine, count]) => {
    console.log(`  ${cuisine}: ${count}`);
  });
