const fs = require('fs');
const path = require('path');

// Load venues
const venuesPath = path.join(__dirname, '../public/venues.json');
const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

console.log(`\n🔍 PASS 2: Analyzing remaining "International" venues...`);

const internationalVenues = venues.filter(v => 
  v.cuisines && v.cuisines.some(c => c.toLowerCase() === 'international')
);

console.log(`📊 Found ${internationalVenues.length} venues still marked as "international"\n`);

// More aggressive recategorization based on Google Places types and common patterns
function aggressiveRecategorize(venue) {
  const name = venue.name.toLowerCase();
  const description = (venue.description || '').toLowerCase();
  const types = venue.types || [];
  const fullText = `${name} ${description}`.toLowerCase();
  
  // Expanded cuisine patterns with more keywords
  const cuisinePatterns = {
    'british': /british|english|gastropub|pub|fish and chips|sunday roast|pie|mash/i,
    'european': /european|continental/i,
    'mediterranean': /mediterranean|levantine/i,
    'middle eastern': /middle eastern|mezze|meze|shawarma|falafel|hummus/i,
    'asian': /asian|pan-asian/i,
    'fusion': /fusion/i,
    'seafood': /seafood|fish|oyster/i,
    'steakhouse': /steak|grill|meat|butcher/i,
    'indian': /indian|curry|tandoor|biryani|masala|tikka|dosa|naan|bengali|punjabi/i,
    'italian': /italian|pizza|pasta|trattoria|osteria|ristorante|risotto|antipasti/i,
    'japanese': /japanese|sushi|ramen|izakaya|yakitori|tempura|sake|bento/i,
    'chinese': /chinese|dim sum|szechuan|cantonese|peking|wonton|dumpling/i,
    'thai': /thai|pad thai|tom yum|massaman|green curry/i,
    'french': /french|bistro|brasserie|patisserie|croissant|crepe/i,
    'greek': /greek|souvlaki|gyros|taverna|moussaka/i,
    'turkish': /turkish|kebab|doner|mezze|baklava/i,
    'korean': /korean|kimchi|bibimbap|bulgogi|gochujang/i,
    'mexican': /mexican|taco|burrito|cantina|quesadilla|guacamole/i,
    'vietnamese': /vietnamese|pho|banh mi/i,
    'spanish': /spanish|tapas|paella|bodega|iberico/i,
    'lebanese': /lebanese/i,
    'persian': /persian|iranian/i,
    'american': /american|burger|diner|bbq|new york|chicago/i,
    'caribbean': /caribbean|jerk|jamaican/i,
    'african': /african|ethiopian|moroccan/i,
    'bar': /bar|cocktail|wine bar|pub/i,
    'cafe': /cafe|coffee|breakfast|brunch/i
  };
  
  // Check against full text
  for (const [cuisine, pattern] of Object.entries(cuisinePatterns)) {
    if (pattern.test(fullText)) {
      return cuisine;
    }
  }
  
  // Check Google Places types more thoroughly
  const typeMapping = {
    'bar': 'bar',
    'night_club': 'bar',
    'cafe': 'cafe',
    'bakery': 'cafe',
    'meal_takeaway': 'casual dining',
    'meal_delivery': 'casual dining'
  };
  
  for (const [type, cuisine] of Object.entries(typeMapping)) {
    if (types.includes(type)) {
      return cuisine;
    }
  }
  
  // If venue has "restaurant" in types but no specific cuisine, mark as "modern european"
  if (types.includes('restaurant') || types.includes('establishment')) {
    return 'modern european';
  }
  
  return 'international'; // Still keep as international if truly generic
}

// Sample first 10 to show what we'll do
console.log('📝 SAMPLE RECATEGORIZATIONS (first 10):');
internationalVenues.slice(0, 10).forEach(venue => {
  const newCuisine = aggressiveRecategorize(venue);
  const symbol = newCuisine !== 'international' ? '✓' : '○';
  console.log(`${symbol} ${venue.name}: international → ${newCuisine}`);
});

console.log(`\n🤔 Should I proceed with recategorizing all ${internationalVenues.length} venues?`);
console.log(`   This will categorize most as "modern european", "bar", "cafe", or specific cuisines.`);
console.log(`\n   TO PROCEED, run: node scripts/recategorize-cuisines-pass2.js --confirm\n`);

// Only proceed if --confirm flag is present
if (process.argv.includes('--confirm')) {
  let recategorized = 0;
  let kept = 0;
  
  const updatedVenues = venues.map(venue => {
    if (!venue.cuisines || !venue.cuisines.some(c => c.toLowerCase() === 'international')) {
      return venue;
    }
    
    const newCuisine = aggressiveRecategorize(venue);
    
    if (newCuisine !== 'international') {
      venue.cuisines = venue.cuisines.map(c => 
        c.toLowerCase() === 'international' ? newCuisine : c
      );
      recategorized++;
      return venue;
    }
    
    kept++;
    return venue;
  });
  
  console.log(`\n📈 PASS 2 RESULTS:`);
  console.log(`   ✓ Recategorized: ${recategorized}`);
  console.log(`   ○ Kept as international: ${kept}`);
  
  // Backup
  const backupPath = path.join(__dirname, '../data/venues-before-pass2.json');
  fs.writeFileSync(backupPath, JSON.stringify(venues, null, 2));
  console.log(`\n💾 Backup saved: ${backupPath}`);
  
  // Save
  fs.writeFileSync(venuesPath, JSON.stringify(updatedVenues, null, 2));
  console.log(`✅ Updated venues saved: ${venuesPath}`);
  
  // Show new breakdown
  console.log(`\n📊 CUISINE BREAKDOWN (after pass 2):`);
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
    .slice(0, 25)
    .forEach(([cuisine, count]) => {
      console.log(`   ${cuisine}: ${count}`);
    });
  
  console.log(`\n✨ Done! Venues recategorized.\n`);
}
