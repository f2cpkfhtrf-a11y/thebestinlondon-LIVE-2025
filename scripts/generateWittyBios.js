const fs = require('fs');
const path = require('path');

// Witty bio templates inspired by GuiltyChef.com style
const BIO_TEMPLATES = {
  'modern european': [
    "Where contemporary London meets European flair - think Michelin-starred techniques with a side of British charm.",
    "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship.",
    "Modern European dining that doesn't take itself too seriously, but takes your taste buds very seriously indeed.",
    "Where innovation meets tradition - expect the unexpected in every beautifully plated creation.",
    "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing."
  ],
  'british': [
    "Proper British grub with a modern twist - where Sunday roasts meet culinary innovation.",
    "A celebration of British ingredients done right, with a side of London attitude.",
    "Where traditional pub fare gets a gourmet makeover - comfort food elevated to art.",
    "British classics reimagined for the modern palate - hearty, honest, and absolutely delicious.",
    "A proper British experience with contemporary flair - fish and chips never tasted so sophisticated."
  ],
  'italian': [
    "Authentic Italian passion meets London sophistication - where every pasta tells a story.",
    "From Nonna's kitchen to London's tables - traditional recipes with contemporary presentation.",
    "Italian soul food that transports you to the streets of Rome, one bite at a time.",
    "Where Italian tradition meets British innovation - expect the unexpected in every dish.",
    "Authentic Italian flavors with a London twist - because sometimes you need a taste of la dolce vita."
  ],
  'french': [
    "French elegance meets London energy - where every meal is a celebration of joie de vivre.",
    "A taste of Paris in the heart of London - sophisticated, romantic, and utterly delicious.",
    "French culinary artistry with British practicality - expect excellence without the pretension.",
    "Where French technique meets London innovation - classic dishes with contemporary flair.",
    "A sophisticated French experience that's as charming as it is delicious."
  ],
  'indian': [
    "Spice-laden journeys from the streets of Mumbai to London's tables - authentic flavors, modern presentation.",
    "Where Indian tradition meets London sophistication - expect fireworks in every bite.",
    "Authentic Indian cuisine that's as vibrant as the streets of Delhi - bold, beautiful, and delicious.",
    "From royal kitchens to London tables - Indian cuisine elevated to an art form.",
    "A celebration of Indian flavors with contemporary London style - expect the unexpected."
  ],
  'turkish': [
    "Turkish hospitality meets London sophistication - where every meal is a celebration.",
    "From Istanbul's spice markets to London's tables - authentic flavors with modern flair.",
    "Turkish cuisine that's as warm and welcoming as the culture itself - expect to be charmed.",
    "Where Turkish tradition meets London innovation - bold flavors, beautiful presentation.",
    "A taste of Turkey in the heart of London - sophisticated, authentic, and absolutely delicious."
  ],
  'japanese': [
    "Japanese precision meets London creativity - where every dish is a work of art.",
    "From Tokyo's finest to London's tables - authentic Japanese cuisine with contemporary style.",
    "Japanese culinary artistry that's as beautiful as it is delicious - expect perfection.",
    "Where Japanese tradition meets London innovation - fresh, authentic, and utterly satisfying.",
    "A sophisticated Japanese experience that's as elegant as it is flavorful."
  ],
  'korean': [
    "Korean flavors that pack a punch - from Seoul's streets to London's tables.",
    "Where Korean tradition meets London sophistication - bold, beautiful, and delicious.",
    "Korean cuisine that's as vibrant as Seoul itself - expect fireworks in every bite.",
    "From Korean BBQ to contemporary fusion - authentic flavors with modern presentation.",
    "A celebration of Korean flavors with London style - expect the unexpected."
  ],
  'chinese': [
    "Chinese culinary mastery meets London innovation - where tradition meets contemporary style.",
    "From Beijing's finest to London's tables - authentic Chinese cuisine with modern flair.",
    "Chinese flavors that transport you to the streets of Shanghai - bold, beautiful, and delicious.",
    "Where Chinese tradition meets London sophistication - expect excellence in every dish.",
    "A sophisticated Chinese experience that's as authentic as it is innovative."
  ],
  'thai': [
    "Thai flavors that dance on your palate - from Bangkok's streets to London's tables.",
    "Where Thai tradition meets London sophistication - expect fireworks in every bite.",
    "Thai cuisine that's as vibrant as Bangkok itself - bold, beautiful, and delicious.",
    "From Thai street food to contemporary dining - authentic flavors with modern presentation.",
    "A celebration of Thai flavors with London style - expect the unexpected."
  ],
  'mexican': [
    "Mexican flavors that bring the fiesta to London - bold, beautiful, and absolutely delicious.",
    "Where Mexican tradition meets London innovation - expect fireworks in every bite.",
    "Mexican cuisine that's as vibrant as Mexico City itself - authentic flavors, modern style.",
    "From Mexican street food to contemporary dining - bold flavors with sophisticated presentation.",
    "A celebration of Mexican flavors with London sophistication - expect the unexpected."
  ],
  'american': [
    "American comfort food with London sophistication - where big flavors meet contemporary style.",
    "From American classics to contemporary innovation - expect excellence in every bite.",
    "American cuisine that's as bold as New York itself - hearty, honest, and delicious.",
    "Where American tradition meets London innovation - comfort food elevated to art.",
    "A celebration of American flavors with London style - expect the unexpected."
  ],
  'cafe': [
    "Where coffee culture meets London sophistication - expect excellence in every cup.",
    "A cozy escape from the city bustle - where great coffee meets great conversation.",
    "Coffee culture that's as vibrant as London itself - expect perfection in every sip.",
    "Where coffee meets community - a London institution that's as welcoming as it is delicious.",
    "A celebration of coffee culture with London style - expect the unexpected."
  ],
  'bar': [
    "Where London's nightlife meets culinary excellence - expect sophistication in every sip.",
    "A sophisticated escape from the ordinary - where great drinks meet great atmosphere.",
    "Bar culture that's as vibrant as London itself - expect excellence in every experience.",
    "Where cocktails meet cuisine - a London institution that's as stylish as it is delicious.",
    "A celebration of bar culture with London sophistication - expect the unexpected."
  ]
};

// Area-specific additions
const AREA_ADDITIONS = {
  'soho': "in the heart of London's entertainment district",
  'covent garden': "amidst the buzz of London's cultural quarter",
  'mayfair': "in one of London's most prestigious neighborhoods",
  'kensington': "in the elegant surroundings of Kensington",
  'chelsea': "in the chic surroundings of Chelsea",
  'shoreditch': "in the creative heart of East London",
  'camden': "in the vibrant atmosphere of Camden",
  'islington': "in the charming streets of Islington",
  'hackney': "in the trendy surroundings of Hackney",
  'greenwich': "in the historic setting of Greenwich",
  'richmond': "in the leafy surroundings of Richmond",
  'wimbledon': "in the prestigious setting of Wimbledon"
};

function generateWittyBio(venue) {
  const cuisine = venue.cuisines?.[0]?.toLowerCase() || 'modern european';
  const area = venue.borough?.toLowerCase() || 'london';
  
  // Get template for cuisine
  const templates = BIO_TEMPLATES[cuisine] || BIO_TEMPLATES['modern european'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Add area-specific touch
  const areaAddition = AREA_ADDITIONS[area] || "in the heart of London";
  
  // Combine template with area
  let bio = template;
  if (!bio.includes(areaAddition)) {
    bio = bio.replace(/in the heart of London/g, areaAddition);
  }
  
  // Ensure bio is 160-220 characters
  if (bio.length < 160) {
    bio += ` Located ${areaAddition}, this is where London's food scene comes alive.`;
  }
  
  if (bio.length > 220) {
    bio = bio.substring(0, 217) + '...';
  }
  
  return bio;
}

async function generateWittyBios() {
  console.log('✍️ Starting witty bio generation...');
  
  try {
    // Read current data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    console.log(`📊 Processing ${venues.length} venues...`);
    
    // Generate bios for venues that need them
    const enhancedVenues = venues.map(venue => {
      const enhanced = { ...venue };
      
      // Check if venue needs a bio
      const needsBio = !enhanced.description || 
                      enhanced.description.length < 20 ||
                      enhanced.description.toLowerCase().includes('experience exceptional dining') ||
                      enhanced.description.toLowerCase().includes('fine dining experience');
      
      if (needsBio) {
        enhanced.description = generateWittyBio(venue);
        enhanced.bioGenerated = true;
      }
      
      return enhanced;
    });
    
    // Create backup
    const backupPath = path.join(process.cwd(), `backups/venues-pre-bio-generation-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Create enhanced data structure
    const enhancedData = {
      venues: enhancedVenues,
      lastUpdated: new Date().toISOString(),
      version: '2.2',
      metadata: {
        totalVenues: enhancedVenues.length,
        bioGenerationDate: new Date().toISOString(),
        bioStats: {
          venuesWithBios: enhancedVenues.filter(v => v.description && v.description.length > 20).length,
          generatedBios: enhancedVenues.filter(v => v.bioGenerated).length
        }
      }
    };
    
    // Write enhanced data
    fs.writeFileSync(filePath, JSON.stringify(enhancedData, null, 2));
    console.log('✅ Witty bio generation complete!');
    
    // Generate report
    const venuesWithBios = enhancedVenues.filter(v => v.description && v.description.length > 20).length;
    const generatedBios = enhancedVenues.filter(v => v.bioGenerated).length;
    
    console.log('\\n📈 BIO GENERATION REPORT:');
    console.log(`Venues with bios: ${venuesWithBios}`);
    console.log(`Generated bios: ${generatedBios}`);
    console.log(`Total venues: ${enhancedVenues.length}`);
    console.log(`Coverage: ${Math.round((venuesWithBios / enhancedVenues.length) * 100)}%`);
    
    // Show sample generated bios
    console.log('\\n📝 SAMPLE GENERATED BIOS:');
    const sampleGenerated = enhancedVenues.filter(v => v.bioGenerated).slice(0, 3);
    sampleGenerated.forEach(venue => {
      console.log(`\\n${venue.name} (${venue.cuisines?.[0]}, ${venue.borough}):`);
      console.log(`"${venue.description}"`);
    });
    
    return enhancedData;
    
  } catch (error) {
    console.error('❌ Error during bio generation:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateWittyBios().catch(console.error);
}

module.exports = { generateWittyBio, generateWittyBios };
