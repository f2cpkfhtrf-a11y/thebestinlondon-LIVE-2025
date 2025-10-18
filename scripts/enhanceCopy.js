const fs = require('fs');
const path = require('path');

// Witty, London-centric bios inspired by GuiltyChef style
const bioTemplates = {
  'british': [
    "London's answer to proper British grub. Think fish and chips that would make your nan proud, but with a modern twist that won't offend the food critics.",
    "Where traditional British cuisine meets contemporary London. Expect hearty portions, familiar flavors, and that comforting feeling you get from a proper Sunday roast.",
    "A proper British establishment that's been serving Londoners for years. Classic dishes done right, with a touch of modern flair that keeps things interesting.",
    "London's finest British fare, served with a side of nostalgia and a dash of innovation. Comfort food that's actually comfortable to eat."
  ],
  'mediterranean': [
    "Mediterranean magic in the heart of London. Fresh ingredients, bold flavors, and that unmistakable warmth that makes every meal feel like a holiday.",
    "Where the Mediterranean meets London's culinary scene. Expect vibrant flavors, fresh produce, and that laid-back vibe that makes everything taste better.",
    "London's Mediterranean escape. Fresh, flavorful, and utterly delicious. A taste of the Med without leaving the city.",
    "Mediterranean cuisine done right in London. Fresh ingredients, bold flavors, and that unmistakable Mediterranean charm."
  ],
  'indian': [
    "London's Indian cuisine at its finest. Spices that dance on your palate, flavors that tell a story, and dishes that make you forget you're in London.",
    "Where Indian tradition meets London innovation. Expect bold flavors, aromatic spices, and dishes that transport you to the streets of Mumbai.",
    "London's Indian culinary gem. Authentic flavors, modern presentation, and that unmistakable Indian hospitality that makes every meal special.",
    "Indian cuisine that's both traditional and innovative. Bold flavors, fresh ingredients, and that unmistakable Indian charm that London loves."
  ],
  'italian': [
    "London's Italian love affair continues here. Fresh pasta, authentic flavors, and that unmistakable Italian passion that makes every meal memorable.",
    "Where Italy meets London's culinary scene. Expect fresh ingredients, traditional recipes, and that Italian warmth that makes everything taste better.",
    "London's Italian gem. Fresh pasta, authentic flavors, and that unmistakable Italian charm that makes every meal feel like a celebration.",
    "Italian cuisine done right in London. Fresh ingredients, traditional recipes, and that Italian passion that makes every dish special."
  ],
  'japanese': [
    "London's Japanese culinary artistry. Fresh sushi, authentic flavors, and that unmistakable Japanese precision that makes every bite perfect.",
    "Where Japan meets London's dining scene. Expect fresh ingredients, traditional techniques, and that Japanese attention to detail that elevates every dish.",
    "London's Japanese gem. Fresh sushi, authentic flavors, and that unmistakable Japanese hospitality that makes every meal special.",
    "Japanese cuisine that's both traditional and innovative. Fresh ingredients, precise techniques, and that Japanese charm that London adores."
  ],
  'turkish': [
    "London's Turkish delight. Bold flavors, aromatic spices, and that unmistakable Turkish hospitality that makes every meal feel like a feast.",
    "Where Turkey meets London's culinary scene. Expect bold flavors, fresh ingredients, and that Turkish warmth that makes everything taste better.",
    "London's Turkish gem. Bold flavors, authentic recipes, and that unmistakable Turkish charm that makes every meal special.",
    "Turkish cuisine done right in London. Bold flavors, fresh ingredients, and that Turkish hospitality that makes every dish memorable."
  ],
  'french': [
    "London's French culinary elegance. Sophisticated flavors, refined techniques, and that unmistakable French charm that makes every meal feel special.",
    "Where France meets London's dining scene. Expect refined flavors, elegant presentation, and that French sophistication that elevates every dish.",
    "London's French gem. Sophisticated flavors, elegant presentation, and that unmistakable French charm that makes every meal memorable.",
    "French cuisine that's both elegant and accessible. Refined flavors, sophisticated techniques, and that French charm that London loves."
  ],
  'thai': [
    "London's Thai culinary adventure. Bold flavors, aromatic spices, and that unmistakable Thai balance that makes every dish perfectly harmonious.",
    "Where Thailand meets London's dining scene. Expect bold flavors, fresh ingredients, and that Thai balance that makes everything taste better.",
    "London's Thai gem. Bold flavors, authentic recipes, and that unmistakable Thai charm that makes every meal special.",
    "Thai cuisine done right in London. Bold flavors, fresh ingredients, and that Thai balance that makes every dish memorable."
  ],
  'spanish': [
    "London's Spanish culinary fiesta. Bold flavors, vibrant colors, and that unmistakable Spanish passion that makes every meal feel like a celebration.",
    "Where Spain meets London's dining scene. Expect bold flavors, fresh ingredients, and that Spanish warmth that makes everything taste better.",
    "London's Spanish gem. Bold flavors, authentic recipes, and that unmistakable Spanish charm that makes every meal special.",
    "Spanish cuisine done right in London. Bold flavors, fresh ingredients, and that Spanish passion that makes every dish memorable."
  ],
  'korean': [
    "London's Korean culinary journey. Bold flavors, unique techniques, and that unmistakable Korean balance that makes every dish perfectly harmonious.",
    "Where Korea meets London's dining scene. Expect bold flavors, fresh ingredients, and that Korean balance that makes everything taste better.",
    "London's Korean gem. Bold flavors, authentic recipes, and that unmistakable Korean charm that makes every meal special.",
    "Korean cuisine done right in London. Bold flavors, fresh ingredients, and that Korean balance that makes every dish memorable."
  ],
  'mexican': [
    "London's Mexican culinary fiesta. Bold flavors, vibrant colors, and that unmistakable Mexican passion that makes every meal feel like a celebration.",
    "Where Mexico meets London's dining scene. Expect bold flavors, fresh ingredients, and that Mexican warmth that makes everything taste better.",
    "London's Mexican gem. Bold flavors, authentic recipes, and that unmistakable Mexican charm that makes every meal special.",
    "Mexican cuisine done right in London. Bold flavors, fresh ingredients, and that Mexican passion that makes every dish memorable."
  ],
  'chinese': [
    "London's Chinese culinary artistry. Bold flavors, traditional techniques, and that unmistakable Chinese balance that makes every dish perfectly harmonious.",
    "Where China meets London's dining scene. Expect bold flavors, fresh ingredients, and that Chinese balance that makes everything taste better.",
    "London's Chinese gem. Bold flavors, authentic recipes, and that unmistakable Chinese charm that makes every meal special.",
    "Chinese cuisine done right in London. Bold flavors, fresh ingredients, and that Chinese balance that makes every dish memorable."
  ],
  'caribbean': [
    "London's Caribbean culinary escape. Bold flavors, tropical vibes, and that unmistakable Caribbean warmth that makes every meal feel like a holiday.",
    "Where the Caribbean meets London's dining scene. Expect bold flavors, fresh ingredients, and that Caribbean warmth that makes everything taste better.",
    "London's Caribbean gem. Bold flavors, authentic recipes, and that unmistakable Caribbean charm that makes every meal special.",
    "Caribbean cuisine done right in London. Bold flavors, fresh ingredients, and that Caribbean warmth that makes every dish memorable."
  ],
  'modern-european': [
    "London's modern European culinary innovation. Sophisticated flavors, contemporary techniques, and that unmistakable European elegance that makes every meal special.",
    "Where modern Europe meets London's dining scene. Expect sophisticated flavors, innovative techniques, and that European charm that elevates every dish.",
    "London's modern European gem. Sophisticated flavors, contemporary presentation, and that unmistakable European charm that makes every meal memorable.",
    "Modern European cuisine that's both innovative and accessible. Sophisticated flavors, contemporary techniques, and that European charm that London loves."
  ]
};

function generateBio(venue) {
  const cuisine = venue.cuisines?.[0] || 'modern-european';
  const templates = bioTemplates[cuisine] || bioTemplates['modern-european'];
  
  // Select template based on venue name hash for consistency
  const hash = venue.name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const templateIndex = Math.abs(hash) % templates.length;
  let bio = templates[templateIndex];
  
  // Customize based on venue characteristics
  if (venue.rating >= 4.5) {
    bio = bio.replace('London', 'London\'s finest');
  }
  
  if (venue.price_level >= 3) {
    bio = bio.replace('cuisine', 'culinary experience');
  }
  
  if (venue.user_ratings_total > 1000) {
    bio = bio.replace('London', 'London\'s beloved');
  }
  
  return bio;
}

function enhanceCopy() {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = data.venues || data;
    console.log(`🔍 Enhancing copy for ${venues.length} venues...`);
    
    let enhancedCount = 0;
    const enhancedVenues = venues.map(venue => {
      const enhanced = { ...venue };
      
      // Generate new bio if current one is generic or missing
      const currentBio = enhanced.description || '';
      const isGeneric = currentBio.includes('Discover') || 
                       currentBio.includes('fantastic dining experience') ||
                       currentBio.length < 50;
      
      if (isGeneric || !enhanced.description) {
        enhanced.description = generateBio(venue);
        enhancedCount++;
      }
      
      return enhanced;
    });
    
    // Update the data
    data.venues = enhancedVenues;
    
    // Save enhanced data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`\n✅ Enhanced ${enhancedCount} venue descriptions`);
    
    // Generate sample bios
    console.log('\n📝 Sample Enhanced Bios:');
    const samples = enhancedVenues.slice(0, 5);
    samples.forEach(venue => {
      console.log(`\n${venue.name}:`);
      console.log(`   ${venue.description}`);
    });
    
    return { success: true, enhancedCount };
    
  } catch (error) {
    console.error('❌ Error enhancing copy:', error);
    return { success: false, error: error.message };
  }
}

// Run the enhancement
const result = enhanceCopy();

if (result.success) {
  console.log('\n✅ Copy enhancement completed successfully!');
} else {
  console.log(`\n❌ Enhancement failed: ${result.error}`);
}
