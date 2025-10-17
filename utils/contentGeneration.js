// Content generation utilities for witty, London-centric restaurant descriptions
const generateRestaurantBio = (venue) => {
  const { name, cuisines, borough, rating, price_level } = venue;
  
  // Better cuisine detection - check name and description for clues
  let primaryCuisine = cuisines && cuisines[0] ? cuisines[0].toLowerCase() : 'restaurant';
  
  // Override based on restaurant name clues
  const nameLower = name.toLowerCase();
  if (nameLower.includes('dishoom') || nameLower.includes('gymkhana') || nameLower.includes('maharaja') || 
      nameLower.includes('kricket') || nameLower.includes('aladin') || nameLower.includes('brigadiers') ||
      nameLower.includes('chettinad') || nameLower.includes('india')) {
    primaryCuisine = 'indian';
  } else if (nameLower.includes('pizza') || nameLower.includes('pasta') || nameLower.includes('italia')) {
    primaryCuisine = 'italian';
  } else if (nameLower.includes('sushi') || nameLower.includes('ramen') || nameLower.includes('japan')) {
    primaryCuisine = 'japanese';
  } else if (nameLower.includes('thai') || nameLower.includes('pad thai')) {
    primaryCuisine = 'thai';
  } else if (nameLower.includes('turkish') || nameLower.includes('kebab')) {
    primaryCuisine = 'turkish';
  } else if (nameLower.includes('chinese') || nameLower.includes('dim sum')) {
    primaryCuisine = 'chinese';
  } else if (nameLower.includes('korean') || nameLower.includes('bbq')) {
    primaryCuisine = 'korean';
  } else if (nameLower.includes('vietnamese') || nameLower.includes('pho')) {
    primaryCuisine = 'vietnamese';
  } else if (nameLower.includes('mexican') || nameLower.includes('taco')) {
    primaryCuisine = 'mexican';
  } else if (nameLower.includes('french') || nameLower.includes('bistro')) {
    primaryCuisine = 'french';
  } else if (nameLower.includes('spanish') || nameLower.includes('tapas')) {
    primaryCuisine = 'spanish';
  } else if (nameLower.includes('caribbean') || nameLower.includes('jerk')) {
    primaryCuisine = 'caribbean';
  } else if (nameLower.includes('african') || nameLower.includes('ethiopian')) {
    primaryCuisine = 'african';
  } else if (nameLower.includes('mediterranean') || nameLower.includes('greek')) {
    primaryCuisine = 'mediterranean';
  } else if (nameLower.includes('seafood') || nameLower.includes('fish')) {
    primaryCuisine = 'seafood';
  } else if (nameLower.includes('vegetarian') || nameLower.includes('veggie')) {
    primaryCuisine = 'vegetarian';
  } else if (nameLower.includes('vegan')) {
    primaryCuisine = 'vegan';
  } else if (nameLower.includes('british') || nameLower.includes('pub')) {
    primaryCuisine = 'british';
  }
  
  // Base templates for different cuisine types
  const cuisineTemplates = {
    'indian': [
      "Spice levels that'll make your taste buds dance and your nose run. This {borough} gem serves up {cuisine} that's been perfected over generations.",
      "Where traditional recipes meet London's modern palate. Expect bold flavors, aromatic spices, and portions that'll have you planning your next visit before you've finished.",
      "Not your average curry house. This {borough} institution elevates {cuisine} cuisine with techniques that would make grandmothers proud and food critics weep."
    ],
    'italian': [
      "Handmade pasta that's so fresh, you can practically taste the Italian countryside. This {borough} trattoria brings authentic {cuisine} flavors to London's streets.",
      "Where every dish tells a story of Italian heritage. From wood-fired pizzas to silky risottos, this {borough} spot proves that simple ingredients can create magic.",
      "A slice of Italy in the heart of {borough}. Expect rustic charm, generous portions, and flavors that transport you straight to a Tuscan villa."
    ],
    'japanese': [
      "Precision meets passion in every bite. This {borough} sushi bar serves up {cuisine} cuisine with the attention to detail that Tokyo's finest would applaud.",
      "Where the art of {cuisine} cooking meets London's dining scene. Fresh fish, perfect rice, and techniques that showcase centuries of culinary tradition.",
      "A minimalist approach to maximum flavor. This {borough} gem proves that {cuisine} cuisine doesn't need complexity to create unforgettable experiences."
    ],
    'chinese': [
      "From dim sum to Peking duck, this {borough} institution showcases the incredible diversity of {cuisine} cuisine. Every dish tells a different regional story.",
      "Where traditional {cuisine} techniques meet London's cosmopolitan tastes. Expect bold flavors, fresh ingredients, and portions that'll satisfy even the heartiest appetites.",
      "A journey through China's culinary regions without leaving {borough}. This spot proves that {cuisine} cuisine is as diverse as the country itself."
    ],
    'thai': [
      "The perfect balance of sweet, sour, salty, and spicy. This {borough} kitchen masters the art of {cuisine} cuisine with flavors that'll have you coming back for more.",
      "Where every dish is a symphony of flavors. This {borough} gem serves up {cuisine} cuisine that's authentic enough to make Bangkok proud.",
      "A taste of Thailand in the heart of {borough}. Fresh herbs, bold spices, and techniques that showcase the complexity of {cuisine} cooking."
    ],
    'turkish': [
      "From succulent kebabs to fresh meze, this {borough} spot celebrates the rich flavors of {cuisine} cuisine. Every dish tells a story of Ottoman heritage.",
      "Where East meets West in perfect harmony. This {borough} gem serves up {cuisine} cuisine that's been refined over centuries of culinary tradition.",
      "A feast for the senses in the heart of {borough}. Expect generous portions, bold flavors, and hospitality that makes you feel like family."
    ],
    'french': [
      "Where French elegance meets London sophistication. This {borough} bistro serves up {cuisine} cuisine with the finesse that Parisian chefs would envy.",
      "Classic techniques, modern presentation. This {borough} gem proves that {cuisine} cuisine doesn't need to be stuffy to be absolutely divine.",
      "A taste of France in the heart of {borough}. From buttery pastries to rich sauces, every dish celebrates the artistry of {cuisine} cooking."
    ],
    'spanish': [
      "Tapas, paella, and pure Spanish passion. This {borough} spot brings the vibrant flavors of {cuisine} cuisine to London's dining scene.",
      "Where every meal feels like a fiesta. This {borough} gem serves up {cuisine} cuisine that's bold, colorful, and absolutely irresistible.",
      "A celebration of Spanish culinary heritage in the heart of {borough}. Expect bold flavors, fresh ingredients, and portions that'll have you planning your next visit."
    ],
    'korean': [
      "From sizzling BBQ to comforting stews, this {borough} spot masters the art of {cuisine} cuisine. Every dish showcases the bold flavors of Korean cooking.",
      "Where fermentation meets innovation. This {borough} gem serves up {cuisine} cuisine that's authentic enough to make Seoul proud.",
      "A journey through Korea's culinary traditions without leaving {borough}. Expect bold flavors, fresh ingredients, and techniques that showcase centuries of heritage."
    ],
    'vietnamese': [
      "Fresh herbs, aromatic spices, and flavors that dance on your palate. This {borough} gem serves up {cuisine} cuisine that's light, fresh, and absolutely addictive.",
      "Where every bowl tells a story of Vietnamese heritage. This {borough} spot proves that {cuisine} cuisine doesn't need complexity to create unforgettable experiences.",
      "A taste of Vietnam in the heart of {borough}. From pho to banh mi, every dish celebrates the balance of flavors that makes {cuisine} cuisine so special."
    ],
    'mexican': [
      "From authentic tacos to rich moles, this {borough} spot celebrates the incredible diversity of {cuisine} cuisine. Every dish tells a different regional story.",
      "Where traditional {cuisine} techniques meet London's modern tastes. Expect bold flavors, fresh ingredients, and portions that'll satisfy even the heartiest appetites.",
      "A fiesta of flavors in the heart of {borough}. This gem proves that {cuisine} cuisine is as diverse as Mexico itself, with every dish showcasing different regional traditions."
    ],
    'american': [
      "From classic burgers to innovative fusion, this {borough} spot celebrates the melting pot of {cuisine} cuisine. Every dish tells a story of American culinary innovation.",
      "Where comfort food meets culinary creativity. This {borough} gem serves up {cuisine} cuisine that's familiar yet surprising, satisfying yet sophisticated.",
      "A taste of America in the heart of {borough}. Expect generous portions, bold flavors, and techniques that showcase the diversity of {cuisine} cooking."
    ],
    'caribbean': [
      "From jerk spices to coconut curries, this {borough} spot celebrates the vibrant flavors of {cuisine} cuisine. Every dish tells a story of Caribbean heritage.",
      "Where tropical flavors meet London's cosmopolitan tastes. This {borough} gem serves up {cuisine} cuisine that's bold, colorful, and absolutely irresistible.",
      "A taste of the Caribbean in the heart of {borough}. Expect bold spices, fresh ingredients, and portions that'll have you dreaming of island life."
    ],
    'african': [
      "From Ethiopian injera to West African stews, this {borough} spot showcases the incredible diversity of {cuisine} cuisine. Every dish tells a different regional story.",
      "Where traditional {cuisine} techniques meet London's modern palate. Expect bold flavors, fresh ingredients, and techniques that showcase centuries of culinary heritage.",
      "A journey through Africa's culinary traditions without leaving {borough}. This gem proves that {cuisine} cuisine is as diverse as the continent itself."
    ],
    'mediterranean': [
      "Fresh seafood, olive oil-drenched vegetables, and flavors that celebrate the sun-kissed Mediterranean. This {borough} spot brings coastal cuisine to London's streets.",
      "Where healthy meets delicious in perfect harmony. This {borough} gem serves up {cuisine} cuisine that's light, fresh, and absolutely satisfying.",
      "A taste of the Mediterranean in the heart of {borough}. Expect fresh ingredients, bold flavors, and techniques that showcase the simplicity and elegance of coastal cooking."
    ],
    'seafood': [
      "From fresh oysters to sustainable catches, this {borough} spot celebrates the ocean's bounty with expert preparation. Every dish showcases the incredible diversity of {cuisine} cuisine.",
      "Where the sea meets the city in perfect harmony. This {borough} gem serves up {cuisine} cuisine that's fresh, flavorful, and absolutely irresistible.",
      "A celebration of the ocean's treasures in the heart of {borough}. Expect fresh catches, expert preparation, and flavors that showcase the incredible diversity of {cuisine} cooking."
    ],
    'vegetarian': [
      "Where vegetables are the star of the show. This {borough} spot proves that {cuisine} cuisine doesn't need meat to create unforgettable dining experiences.",
      "Innovative plant-based cooking that celebrates the incredible diversity of vegetables. This {borough} gem serves up {cuisine} cuisine that's creative, flavorful, and absolutely satisfying.",
      "A celebration of plant-based cuisine in the heart of {borough}. Expect creative preparations, fresh ingredients, and flavors that showcase the incredible potential of {cuisine} cooking."
    ],
    'vegan': [
      "Plant-based perfection that'll make even carnivores question their choices. This {borough} spot serves up {cuisine} cuisine that's creative, flavorful, and absolutely satisfying.",
      "Where innovation meets compassion in every dish. This {borough} gem proves that {cuisine} cuisine doesn't need animal products to create unforgettable experiences.",
      "A celebration of plant-based cuisine in the heart of {borough}. Expect creative preparations, fresh ingredients, and flavors that showcase the incredible potential of {cuisine} cooking."
    ],
    'modern european': [
      "Where traditional European techniques meet contemporary innovation. This {borough} spot serves up {cuisine} cuisine that's sophisticated, creative, and absolutely memorable.",
      "A celebration of European culinary heritage with a modern twist. This {borough} gem proves that {cuisine} cuisine can be both traditional and innovative.",
      "Where classic meets contemporary in perfect harmony. This {borough} spot showcases the incredible diversity of {cuisine} cuisine with techniques that honor tradition while embracing innovation."
    ],
    'british': [
      "Modern British cuisine that celebrates local ingredients and traditional recipes. This {borough} spot proves that {cuisine} cuisine can be both comforting and sophisticated.",
      "Where heritage meets innovation in every dish. This {borough} gem serves up {cuisine} cuisine that's familiar yet surprising, satisfying yet sophisticated.",
      "A celebration of British culinary traditions in the heart of {borough}. Expect local ingredients, traditional techniques, and flavors that showcase the incredible potential of {cuisine} cooking."
    ]
  };

  // Get templates for this cuisine
  const templates = cuisineTemplates[primaryCuisine] || cuisineTemplates['modern european'];
  
  // Select a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace placeholders
  let bio = template
    .replace(/{cuisine}/g, primaryCuisine)
    .replace(/{borough}/g, borough || 'London');
  
  // Add rating-based enhancements
  if (rating >= 4.5) {
    bio += " With ratings this high, it's no wonder locals keep coming back for more.";
  } else if (rating >= 4.0) {
    bio += " Consistently excellent reviews prove this spot knows what it's doing.";
  } else if (rating >= 3.5) {
    bio += " Solid reviews and loyal customers speak to the quality here.";
  }
  
  // Add price-based context
  if (price_level >= 4) {
    bio += " Worth every penny for the exceptional experience.";
  } else if (price_level >= 3) {
    bio += " Great value for the quality you'll receive.";
  } else if (price_level <= 2) {
    bio += " Incredible value that won't break the bank.";
  }
  
  // Ensure bio is within character limit
  if (bio.length > 220) {
    bio = bio.substring(0, 217) + '...';
  }
  
  return bio;
};

// Generate editorial content for cuisine pages
const generateCuisineEditorial = (cuisine) => {
  const editorials = {
    'indian': {
      title: "The Spice Route to London's Heart",
      content: "London's love affair with Indian cuisine runs deep, from the curry houses of Brick Lane to the modern interpretations gracing Mayfair's streets. Our curated selection showcases the incredible diversity of Indian cooking, from the fiery vindaloos of Goa to the delicate biryanis of Hyderabad. Each restaurant tells a story of migration, adaptation, and culinary innovation that has shaped London's dining scene for generations."
    },
    'italian': {
      title: "La Dolce Vita in London",
      content: "From the rolling hills of Tuscany to the bustling streets of London, Italian cuisine has found a second home in the capital. Our selection celebrates the regional diversity of Italy, from the fresh seafood of the Amalfi Coast to the hearty pastas of Emilia-Romagna. Each restaurant brings authentic Italian techniques and ingredients to London's cosmopolitan dining scene."
    },
    'japanese': {
      title: "The Art of Japanese Cuisine",
      content: "Japanese cuisine represents the perfect marriage of tradition and innovation, where centuries-old techniques meet contemporary presentation. Our curated selection showcases the incredible diversity of Japanese cooking, from the precision of sushi to the comfort of ramen. Each restaurant brings the meticulous attention to detail that defines Japanese culinary culture."
    },
    'chinese': {
      title: "A Journey Through China's Culinary Regions",
      content: "Chinese cuisine is as diverse as the country itself, with each region offering unique flavors and techniques. Our selection celebrates this incredible diversity, from the delicate dim sum of Cantonese cuisine to the bold spices of Sichuan cooking. Each restaurant tells a story of regional heritage and culinary innovation."
    },
    'thai': {
      title: "The Perfect Balance of Thai Flavors",
      content: "Thai cuisine is a masterclass in balance, where sweet, sour, salty, and spicy flavors dance together in perfect harmony. Our selection showcases the incredible diversity of Thai cooking, from the fiery curries of the south to the fresh salads of the north. Each restaurant brings authentic Thai techniques and ingredients to London's dining scene."
    },
    'turkish': {
      title: "Where East Meets West",
      content: "Turkish cuisine represents the crossroads of civilizations, where Middle Eastern spices meet Mediterranean freshness. Our selection celebrates the incredible diversity of Turkish cooking, from the succulent kebabs of Anatolia to the fresh meze of the Aegean coast. Each restaurant brings the warmth and hospitality that defines Turkish culinary culture."
    },
    'french': {
      title: "L'Art de la Cuisine Française",
      content: "French cuisine represents the pinnacle of culinary artistry, where technique meets creativity in perfect harmony. Our selection showcases the incredible diversity of French cooking, from the rustic charm of provincial cuisine to the sophisticated elegance of haute cuisine. Each restaurant brings the finesse and artistry that defines French culinary culture."
    },
    'spanish': {
      title: "La Fiesta de Sabores Españoles",
      content: "Spanish cuisine is a celebration of life, where bold flavors and vibrant colors come together in perfect harmony. Our selection showcases the incredible diversity of Spanish cooking, from the fresh seafood of the Mediterranean coast to the hearty stews of the interior. Each restaurant brings the passion and vibrancy that defines Spanish culinary culture."
    },
    'korean': {
      title: "The Bold Flavors of Korea",
      content: "Korean cuisine is a masterclass in fermentation and bold flavors, where traditional techniques meet contemporary innovation. Our selection showcases the incredible diversity of Korean cooking, from the sizzling BBQ of Seoul to the comforting stews of the countryside. Each restaurant brings the bold flavors and techniques that define Korean culinary culture."
    },
    'vietnamese': {
      title: "Fresh Flavors from Vietnam",
      content: "Vietnamese cuisine is a celebration of freshness and balance, where herbs and spices create complex flavors with elegant simplicity. Our selection showcases the incredible diversity of Vietnamese cooking, from the aromatic pho of the north to the fresh salads of the south. Each restaurant brings the lightness and freshness that defines Vietnamese culinary culture."
    },
    'mexican': {
      title: "The Vibrant Flavors of Mexico",
      content: "Mexican cuisine is a celebration of color, flavor, and tradition, where ancient techniques meet contemporary innovation. Our selection showcases the incredible diversity of Mexican cooking, from the fresh ceviches of the coast to the rich moles of the interior. Each restaurant brings the vibrancy and tradition that defines Mexican culinary culture."
    },
    'american': {
      title: "The Melting Pot of American Cuisine",
      content: "American cuisine is a celebration of diversity and innovation, where influences from around the world come together to create something uniquely American. Our selection showcases the incredible diversity of American cooking, from the comfort food classics to the innovative fusion creations. Each restaurant brings the creativity and innovation that defines American culinary culture."
    },
    'caribbean': {
      title: "Tropical Flavors from the Caribbean",
      content: "Caribbean cuisine is a celebration of tropical flavors and cultural fusion, where African, Indian, and indigenous traditions come together in perfect harmony. Our selection showcases the incredible diversity of Caribbean cooking, from the jerk spices of Jamaica to the coconut curries of Trinidad. Each restaurant brings the warmth and vibrancy that defines Caribbean culinary culture."
    },
    'african': {
      title: "The Rich Heritage of African Cuisine",
      content: "African cuisine represents the incredible diversity of a continent, where each region offers unique flavors and techniques. Our selection showcases the incredible diversity of African cooking, from the injera of Ethiopia to the stews of West Africa. Each restaurant brings the rich heritage and bold flavors that define African culinary culture."
    },
    'mediterranean': {
      title: "The Sun-Kissed Flavors of the Mediterranean",
      content: "Mediterranean cuisine celebrates the bounty of the sea and the sun, where fresh ingredients and simple techniques create extraordinary flavors. Our selection showcases the incredible diversity of Mediterranean cooking, from the fresh seafood of the coast to the olive oil-drenched vegetables of the interior. Each restaurant brings the health and flavor that defines Mediterranean culinary culture."
    },
    'seafood': {
      title: "The Ocean's Bounty",
      content: "Seafood cuisine celebrates the incredible diversity of the ocean, where fresh catches and expert preparation create unforgettable dining experiences. Our selection showcases the incredible diversity of seafood cooking, from the delicate flavors of fresh oysters to the bold preparations of sustainable catches. Each restaurant brings the freshness and expertise that defines seafood culinary culture."
    },
    'vegetarian': {
      title: "Plant-Based Perfection",
      content: "Vegetarian cuisine celebrates the incredible potential of plant-based ingredients, where creativity and technique create satisfying and flavorful dishes. Our selection showcases the incredible diversity of vegetarian cooking, from innovative preparations to classic comfort foods. Each restaurant brings the creativity and flavor that defines vegetarian culinary culture."
    },
    'vegan': {
      title: "Innovation Meets Compassion",
      content: "Vegan cuisine represents the cutting edge of plant-based cooking, where innovation and compassion come together to create extraordinary dining experiences. Our selection showcases the incredible diversity of vegan cooking, from comfort food classics to innovative creations. Each restaurant brings the creativity and innovation that defines vegan culinary culture."
    },
    'modern european': {
      title: "Contemporary European Excellence",
      content: "Modern European cuisine represents the evolution of traditional techniques, where classic methods meet contemporary innovation. Our selection showcases the incredible diversity of modern European cooking, from the sophisticated techniques of haute cuisine to the rustic charm of provincial cooking. Each restaurant brings the artistry and innovation that defines modern European culinary culture."
    },
    'british': {
      title: "Modern British Culinary Heritage",
      content: "British cuisine celebrates the incredible potential of local ingredients and traditional recipes, where heritage meets innovation in perfect harmony. Our selection showcases the incredible diversity of modern British cooking, from the comfort food classics to the innovative contemporary creations. Each restaurant brings the creativity and tradition that defines British culinary culture."
    }
  };

  return editorials[cuisine.toLowerCase()] || editorials['modern european'];
};

// Generate area-specific editorial content
const generateAreaEditorial = (area) => {
  const areaEditorials = {
    'Central London': {
      title: "The Heart of London's Dining Scene",
      content: "Central London represents the epicenter of the capital's culinary revolution, where historic institutions meet cutting-edge innovation. From the grand dining rooms of Mayfair to the hidden gems of Covent Garden, this area showcases the incredible diversity of London's dining scene. Each restaurant tells a story of the city's evolution, from traditional British fare to the latest culinary trends from around the world."
    },
    'Tower Hamlets': {
      title: "Where Tradition Meets Innovation",
      content: "Tower Hamlets represents the perfect blend of London's historic past and its dynamic present, where traditional communities meet contemporary innovation. From the authentic flavors of Brick Lane to the modern interpretations gracing Canary Wharf, this area showcases the incredible diversity of London's multicultural dining scene. Each restaurant tells a story of migration, adaptation, and culinary innovation."
    },
    'Redbridge': {
      title: "A Hidden Gem of London's Dining Scene",
      content: "Redbridge represents the hidden gems of London's dining scene, where local favorites and family-run establishments create a unique culinary landscape. From traditional British pubs to authentic international cuisine, this area showcases the incredible diversity of London's suburban dining scene. Each restaurant brings the warmth and authenticity that defines local London dining."
    },
    'Havering': {
      title: "Local Flavors in London's Suburbs",
      content: "Havering represents the authentic local dining scene that makes London's suburbs so special, where family-run establishments and local favorites create a unique culinary landscape. From traditional British fare to authentic international cuisine, this area showcases the incredible diversity of London's suburban dining scene. Each restaurant brings the warmth and authenticity that defines local London dining."
    },
    'Hackney': {
      title: "The Creative Heart of London's Dining Scene",
      content: "Hackney represents the creative heart of London's dining scene, where innovation and authenticity come together in perfect harmony. From the trendy restaurants of Shoreditch to the hidden gems of Dalston, this area showcases the incredible diversity of London's creative dining scene. Each restaurant brings the innovation and authenticity that defines Hackney's culinary culture."
    },
    'Newham': {
      title: "Cultural Diversity on Every Plate",
      content: "Newham represents the incredible cultural diversity that defines London's dining scene, where authentic flavors from around the world come together in perfect harmony. From the traditional cuisines of immigrant communities to the modern interpretations gracing the area's streets, this area showcases the incredible diversity of London's multicultural dining scene. Each restaurant tells a story of cultural heritage and culinary innovation."
    },
    'Camden': {
      title: "Alternative Flavors in London's Creative Quarter",
      content: "Camden represents the alternative heart of London's dining scene, where creativity and authenticity come together in perfect harmony. From the trendy restaurants of Camden Market to the hidden gems of the area's streets, this area showcases the incredible diversity of London's creative dining scene. Each restaurant brings the innovation and authenticity that defines Camden's culinary culture."
    },
    'Westminster': {
      title: "Historic Elegance Meets Modern Innovation",
      content: "Westminster represents the historic heart of London's dining scene, where grand institutions meet cutting-edge innovation. From the traditional dining rooms of historic hotels to the modern interpretations gracing the area's streets, this area showcases the incredible diversity of London's historic dining scene. Each restaurant tells a story of London's evolution, from traditional British fare to the latest culinary trends."
    },
    'Southwark': {
      title: "Riverside Dining with a Modern Twist",
      content: "Southwark represents the modern face of London's dining scene, where riverside locations meet cutting-edge innovation. From the trendy restaurants of Borough Market to the modern interpretations gracing the area's streets, this area showcases the incredible diversity of London's contemporary dining scene. Each restaurant brings the innovation and authenticity that defines Southwark's culinary culture."
    },
    'Kensington and Chelsea': {
      title: "Sophisticated Dining in London's Most Elegant Quarter",
      content: "Kensington and Chelsea represent the sophisticated heart of London's dining scene, where elegance and innovation come together in perfect harmony. From the grand dining rooms of historic institutions to the modern interpretations gracing the area's streets, this area showcases the incredible diversity of London's upscale dining scene. Each restaurant brings the sophistication and innovation that defines this area's culinary culture."
    }
  };

  return areaEditorials[area] || areaEditorials['Central London'];
};

module.exports = {
  generateRestaurantBio,
  generateCuisineEditorial,
  generateAreaEditorial
};
