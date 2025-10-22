import fs from 'fs';
import path from 'path';

// Read the venues data
const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = Array.isArray(data) ? data : (data.venues || []);

console.log('🔍 COMPREHENSIVE CUISINE CATEGORIZATION FIX');
console.log(`📊 Processing ${venues.length} venues...\n`);

let updatedCount = 0;
const updates = [];

// More comprehensive categorization rules
const categorizationRules = [
  // Vietnamese restaurants
  {
    keywords: ['vietnamese', 'viet', 'pho', 'sen viet'],
    cuisine: 'vietnamese',
    description: 'Vietnamese cuisine'
  },
  
  // Korean restaurants
  {
    keywords: ['korean', 'kimchi', 'bulgogi', 'jang restaurant', 'bibimbop'],
    cuisine: 'korean',
    description: 'Korean cuisine'
  },
  
  // Thai restaurants
  {
    keywords: ['thai', 'kolae', 'nua', 'busaba', 'thai kitchen'],
    cuisine: 'thai',
    description: 'Thai cuisine'
  },
  
  // Chinese restaurants (more comprehensive)
  {
    keywords: ['chinese', 'sichuan', 'dim sum', 'hutong', 'imperial treasure', 'house of ming', 'peacock', 'noble palace', 'min jiang', 'ma la', 'golden dragon', 'speedboat', 'lucky cat', 'yauatcha', 'shezan', 'zu\'s', 'far east kitchen'],
    cuisine: 'chinese',
    description: 'Chinese cuisine'
  },
  
  // Japanese restaurants
  {
    keywords: ['japanese', 'sushi', 'ramen', 'izakaya', 'zuma', 'oita', 'maru', 'rai', 'inko nito', 'yiqi', 'shoryu', 'miyako', 'yokoso'],
    cuisine: 'japanese',
    description: 'Japanese cuisine'
  },
  
  // Italian restaurants
  {
    keywords: ['italian', 'pasta', 'pizza', 'trattoria', 'circolo popolare', 'grasso', 'gloria', 'bocca di lupo', 'padella', 'bancone', 'doppo', 'manteca', 'giulia', 'amor gastronomia', 'da mario', 'osteria napoletana', 'amerigo vespucci', 'fatto a mano', 'casa fofó', 'buon appetito', 'pizza room', 'perfetto pizza', 'la bella napoli'],
    cuisine: 'italian',
    description: 'Italian cuisine'
  },
  
  // French restaurants
  {
    keywords: ['french', 'bistro', 'brasserie', 'brasserie zedel', 'bouchon racine', 'galvin la chapelle', 'pavyllon', 'studio gauthier', 'the ledbury', 'restaurant 1890', 'hide', 'frog', 'scully', 'aux pains de papy', 'miel bakery', 'arôme bakery', '34 mayfair', 'no. fifty cheyne'],
    cuisine: 'french',
    description: 'French cuisine'
  },
  
  // Spanish restaurants
  {
    keywords: ['spanish', 'tapas', 'paella', 'el pirata', 'la gamba', 'salt yard', 'camino shoreditch', 'jamon jamon'],
    cuisine: 'spanish',
    description: 'Spanish cuisine'
  },
  
  // Turkish restaurants
  {
    keywords: ['turkish', 'kebab', 'mezze', 'masa turkish', 'ana turkish', 'gökyüzü', 'efes', 'cirrik', 'liman', 'dem restaurant', 'alanya turkish', 'fes restaurant', 'meteor meze', 'shish legends', 'kervan kitchen', 'kervan saray', 'ottomans', 'kasiba lounge', 'lokma', 'taş fırın', 'halal street kitchen', 'tanjia', 'tanjia garden', 'olives and oregano'],
    cuisine: 'turkish',
    description: 'Turkish cuisine'
  },
  
  // Mediterranean restaurants
  {
    keywords: ['mediterranean', 'greek', 'lebanese', 'middle eastern', 'andy\'s greek taverna', 'the yummy greek', 'tendril', 'unity diner', 'holy carrot', 'kin cafe', 'vegan planet', 'ekstedt', 'restaurant st. barts', 'kitchen table', 'l\'eto soho', 'london night cafe', 'old queen street cafe', 'e pellicci', 'dulce coffee', 'el&n', 'monmouth coffee', 'kiss the hippo', 'kaffeine', 'rosslyn coffee', 'chill house coffee', 'batch baby', 'attendant coffee', 'coffee island', 'chestnut bakery', 'common breads', 'toad bakery', 'gail\'s bakery', 'eggbreak', 'milk beach', 'the breakfast club', 'the table café', 'the little scarlet door', 'amazing grace', 'florattica rooftop', 'stereo covent garden', 'disrepute', 'pulse bar', 'soma soho', 'lyaness', 'bussey rooftop', 'wagtail', 'london bridge rooftop', 'mercer roof terrace', 'miradora rooftop', 'aviary', 'joia restaurant', 'pergola on the wharf', 'the orange room lebanese'],
    cuisine: 'mediterranean',
    description: 'Mediterranean cuisine'
  },
  
  // Mexican restaurants
  {
    keywords: ['mexican', 'taco', 'burrito', 'cu4tro restaurant', 'santo remedio', 'el pastor', 'los mochis', 'el cenote', 'cavita', 'yucca', 'wahaca', 'frida camden'],
    cuisine: 'mexican',
    description: 'Mexican cuisine'
  },
  
  // Caribbean restaurants
  {
    keywords: ['caribbean', 'jamaican', 'west indian', 'ivisecrets vegan fine dining lounge'],
    cuisine: 'caribbean',
    description: 'Caribbean cuisine'
  },
  
  // Pakistani/Afghan restaurants
  {
    keywords: ['pakistani', 'afghan', 'nawaab', 'watan', 'royal nawaab', 'afghan grill'],
    cuisine: 'pakistani',
    description: 'Pakistani/Afghan cuisine'
  },
  
  // Indian restaurants (but check for Pakistani first)
  {
    keywords: ['indian', 'curry', 'tandoori', 'biryani', 'dishoom', 'gymkhana', 'kricket', 'maharaja', 'aladin', 'brigadiers', 'cinnamon bazaar', 'pravaas', 'the india', 'kricket shoreditch', 'haweli restaurant', 'hyderabad darbar', 'punjab grill lounge', 'tawa grill', 'manjaros restaurant', 'sultan', 'colony restaurant', 'taste of lahore', 'shahs halal food', 'sultan sofrasi', 'baba\'s village restaurant'],
    cuisine: 'indian',
    description: 'Indian cuisine',
    excludeKeywords: ['pakistani', 'afghan', 'nawaab', 'watan']
  }
];

// Function to determine cuisine based on rules
function determineCuisine(venue) {
  const name = (venue.name || '').toLowerCase();
  const description = (venue.description || '').toLowerCase();
  const text = `${name} ${description}`;
  
  // Check each rule
  for (const rule of categorizationRules) {
    const hasKeyword = rule.keywords.some(keyword => text.includes(keyword.toLowerCase()));
    const hasExcludeKeyword = rule.excludeKeywords && rule.excludeKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    
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

// Show cuisine distribution
console.log(`\n📊 NEW CUISINE DISTRIBUTION:`);
const cuisineCounts = {};
venues.forEach(venue => {
  const cuisine = venue.cuisines?.[0] || 'unknown';
  cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
});

Object.entries(cuisineCounts)
  .sort(([,a], [,b]) => b - a)
  .forEach(([cuisine, count]) => {
    console.log(`   ${cuisine}: ${count} venues`);
  });
