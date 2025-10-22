import fs from 'fs';
import path from 'path';

// Read the venues data
const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = Array.isArray(data) ? data : (data.venues || []);

console.log('🔍 SYSTEMATIC CUISINE CATEGORIZATION FIX');
console.log(`📊 Processing ${venues.length} venues...\n`);

let updatedCount = 0;
const updates = [];

// Define categorization rules based on restaurant names and descriptions
const categorizationRules = [
  // Pakistani/Afghan restaurants
  {
    keywords: ['pakistani', 'afghan', 'nawaab', 'watan'],
    cuisine: 'pakistani',
    description: 'Pakistani/Afghan cuisine'
  },
  
  // Chinese restaurants
  {
    keywords: ['chinese', 'sichuan', 'dim sum', 'hutong', 'imperial treasure'],
    cuisine: 'chinese',
    description: 'Chinese cuisine'
  },
  
  // Indian restaurants (but check for Pakistani first)
  {
    keywords: ['indian', 'curry', 'tandoori', 'biryani'],
    cuisine: 'indian',
    description: 'Indian cuisine',
    excludeKeywords: ['pakistani', 'afghan', 'nawaab']
  },
  
  // Thai restaurants
  {
    keywords: ['thai', 'kolae', 'nua'],
    cuisine: 'thai',
    description: 'Thai cuisine'
  },
  
  // Vietnamese restaurants
  {
    keywords: ['vietnamese', 'viet', 'pho'],
    cuisine: 'vietnamese',
    description: 'Vietnamese cuisine'
  },
  
  // Korean restaurants
  {
    keywords: ['korean', 'kimchi', 'bulgogi'],
    cuisine: 'korean',
    description: 'Korean cuisine'
  },
  
  // Japanese restaurants
  {
    keywords: ['japanese', 'sushi', 'ramen', 'izakaya'],
    cuisine: 'japanese',
    description: 'Japanese cuisine'
  },
  
  // Italian restaurants
  {
    keywords: ['italian', 'pasta', 'pizza', 'trattoria'],
    cuisine: 'italian',
    description: 'Italian cuisine'
  },
  
  // French restaurants
  {
    keywords: ['french', 'bistro', 'brasserie'],
    cuisine: 'french',
    description: 'French cuisine'
  },
  
  // Spanish restaurants
  {
    keywords: ['spanish', 'tapas', 'paella'],
    cuisine: 'spanish',
    description: 'Spanish cuisine'
  },
  
  // Turkish restaurants
  {
    keywords: ['turkish', 'kebab', 'mezze'],
    cuisine: 'turkish',
    description: 'Turkish cuisine'
  },
  
  // Mediterranean restaurants
  {
    keywords: ['mediterranean', 'greek', 'lebanese', 'middle eastern'],
    cuisine: 'mediterranean',
    description: 'Mediterranean cuisine'
  },
  
  // Mexican restaurants
  {
    keywords: ['mexican', 'taco', 'burrito'],
    cuisine: 'mexican',
    description: 'Mexican cuisine'
  },
  
  // Caribbean restaurants
  {
    keywords: ['caribbean', 'jamaican', 'west indian'],
    cuisine: 'caribbean',
    description: 'Caribbean cuisine'
  }
];

// Function to determine cuisine based on rules
function determineCuisine(venue) {
  const name = (venue.name || '').toLowerCase();
  const description = (venue.description || '').toLowerCase();
  const text = `${name} ${description}`;
  
  // Check each rule
  for (const rule of categorizationRules) {
    const hasKeyword = rule.keywords.some(keyword => text.includes(keyword));
    const hasExcludeKeyword = rule.excludeKeywords && rule.excludeKeywords.some(keyword => text.includes(keyword));
    
    if (hasKeyword && !hasExcludeKeyword) {
      return rule.cuisine;
    }
  }
  
  // Default fallback
  return 'british';
}

// Process each venue
for (const venue of venues) {
  const currentCuisine = venue.cuisines?.[0] || 'unknown';
  const suggestedCuisine = determineCuisine(venue);
  
  if (currentCuisine !== suggestedCuisine) {
    venue.cuisines = [suggestedCuisine];
    updatedCount++;
    updates.push({
      name: venue.name,
      from: currentCuisine,
      to: suggestedCuisine
    });
    
    console.log(`✅ ${venue.name}: ${currentCuisine} → ${suggestedCuisine}`);
  }
}

// Write back the updated data
fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Updated ${updatedCount} venues`);
console.log(`📁 Data saved to ${venuesPath}`);

// Show some examples
console.log(`\n📋 SAMPLE UPDATES:`);
updates.slice(0, 10).forEach(update => {
  console.log(`   ${update.name}: ${update.from} → ${update.to}`);
});

if (updates.length > 10) {
  console.log(`   ... and ${updates.length - 10} more`);
}
