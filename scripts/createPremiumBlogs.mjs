#!/usr/bin/env node

/**
 * Premium Editorial Blog Builder
 * Creates Time Out London style blog articles with proper internal linking
 * Analyzes restaurant data and creates comprehensive blog posts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Restaurant data analysis
function analyzeRestaurantData() {
  try {
    const venuesPath = path.join(__dirname, '..', 'data', 'venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    
    // Create restaurant lookup map
    const restaurantMap = new Map();
    venuesData.forEach(venue => {
      if (venue.name && venue.slug) {
        restaurantMap.set(venue.name.toLowerCase(), venue.slug);
        // Also map common variations
        const nameVariations = [
          venue.name.toLowerCase(),
          venue.name.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
          venue.name.toLowerCase().replace(/\s+/g, '-'),
          venue.name.toLowerCase().replace(/\s+/g, '')
        ];
        nameVariations.forEach(variation => {
          restaurantMap.set(variation, venue.slug);
        });
      }
    });
    
    return { restaurantMap, totalVenues: venuesData.length };
  } catch (error) {
    console.log('📊 Using fallback restaurant data...');
    // Fallback restaurant data for known restaurants
    const fallbackMap = new Map([
      ['dishoom covent garden', 'dishoom-covent-garden-OZ6OHOJw'],
      ['dishoom kensington', 'dishoom-kensington-1F6d_5-g'],
      ['gloria', 'gloria-fPFxdplY'],
      ['duck waffle', 'duck-waffle-SjiwV5LM'],
      ['royal nawaab', 'royal-nawaab-ilford-NPoY41cY'],
      ['kiln', 'kiln-soho'],
      ['hoppers', 'hoppers-soho'],
      ['blacklock', 'blacklock-soho'],
      ['bar italia', 'bar-italia-soho'],
      ['lina stores', 'lina-stores-soho'],
      ['flat iron covent garden', 'flat-iron-covent-garden'],
      ['seabird', 'seabird-southwark'],
      ['tyyabs', 'tyyabs-whitechapel']
    ]);
    
    return { restaurantMap: fallbackMap, totalVenues: fallbackMap.size };
  }
}

// Blog article templates
const blogArticles = [
  {
    filename: 'halal-restaurants-ilford-lane.md',
    title: 'Halal Heaven: A Local\'s Guide to Ilford Lane\'s Most Legendary Eats',
    description: 'From Royal Nawaab to Sahara Grill, discover Ilford Lane\'s best halal restaurants and sweet spots.',
    slug: '/blog/halal-restaurants-ilford-lane',
    hero: '/public/hero_v2/ilford-lane-halal.webp',
    schema: 'BlogPosting + LocalBusiness',
    restaurants: [
      'Royal Nawaab',
      'Sahara Grill',
      'Lahore Kebab House',
      'Chaiiwala'
    ],
    crossLinks: [
      { text: 'Best Halal Restaurants in London', url: '/best-halal-restaurants-london' }
    ],
    content: `# Halal Heaven: A Local's Guide to Ilford Lane's Most Legendary Eats

*Ilford Lane isn't just a street – it's a culinary pilgrimage site for anyone who knows their halal food. Forget the tourist traps; this is where London's real halal scene lives, breathes, and absolutely dominates.*

## The Ilford Lane Phenomenon

Walk down Ilford Lane on any given evening and you'll witness something magical: families queuing outside unassuming storefronts, the air thick with the scent of charcoal grills and aromatic spices, and the unmistakable buzz of a community that takes its food seriously. This isn't just dining – it's a cultural experience.

## The Legends of Ilford Lane

### Royal Nawaab: The Crown Jewel
**Royal Nawaab** isn't just a restaurant; it's an institution. This Pakistani powerhouse has been serving Ilford's finest for decades, and their biryani is the stuff of local legend. The lamb karahi here will make you question every other curry you've ever had.

### Sahara Grill: Where Tradition Meets Excellence
**Sahara Grill** brings authentic Middle Eastern flavors to the heart of Ilford Lane. Their mixed grill platter is a carnivore's dream, while the hummus is so smooth it could double as dessert.

### Lahore Kebab House: The Spice Masters
**Lahore Kebab House** has perfected the art of the kebab. Their seekh kebabs are legendary, and the naan bread is baked fresh throughout the day. This is comfort food elevated to an art form.

### Chaiiwala: The Sweet Spot
**Chaiiwala** isn't just about tea – though their masala chai is exceptional. Their dessert selection is where the magic happens, with traditional sweets that transport you straight to the streets of Lahore.

## The Ilford Lane Experience

What makes Ilford Lane special isn't just the food – it's the atmosphere. This is where London's South Asian community comes together, where families celebrate, where friends catch up over steaming plates of authentic cuisine.

The street comes alive in the evenings, with restaurants spilling onto the pavement, the sound of sizzling grills mixing with laughter and conversation. It's vibrant, it's authentic, and it's absolutely unmissable.

## Insider Tips for Ilford Lane

- **Timing is everything**: Most restaurants are busiest between 7-9 PM. Arrive early or be prepared to wait.
- **Cash is king**: Many establishments prefer cash payments.
- **Share the love**: Portions are generous – perfect for sharing and trying multiple dishes.
- **Parking**: Street parking can be challenging. Consider public transport or arrive early.

## Beyond the Plate

Ilford Lane offers more than just exceptional food. The area is home to traditional sweet shops, spice markets, and cultural centers that give you a real taste of London's diverse communities.

## The Verdict

Ilford Lane represents everything that makes London's food scene extraordinary. It's authentic, it's vibrant, and it's absolutely essential for anyone serious about halal cuisine in the capital.

*Ready to explore more of London's halal scene? Check out our guide to the [Best Halal Restaurants in London](/best-halal-restaurants-london) for more culinary adventures.*`
  },
  
  {
    filename: 'late-night-restaurants-london.md',
    title: 'Late Night Restaurants in London — Where to Eat After Midnight',
    description: 'London\'s best late-night restaurants from Brick Lane to Shoreditch and beyond. Real places, real food, zero regrets.',
    slug: '/blog/late-night-restaurants-london',
    hero: '/public/hero_v2/late-night-london.webp',
    schema: 'BlogPosting + LocalBusiness',
    restaurants: [
      'Duck & Waffle',
      'Dishoom Covent Garden',
      'Tyyabs'
    ],
    crossLinks: [
      { text: 'Areas > Soho', url: '/areas/soho' },
      { text: 'Areas > Shoreditch', url: '/areas/shoditch' }
    ],
    content: `# Late Night Restaurants in London — Where to Eat After Midnight

*When the sun goes down and the city lights up, London's late-night dining scene comes alive. From 24-hour curry houses to rooftop restaurants with views that never sleep, here's where to eat when normal people are dreaming of breakfast.*

## The London Late-Night Scene

London doesn't sleep, and neither should your appetite. The capital's late-night dining scene is as diverse as the city itself – from traditional curry houses that have been serving midnight feasts for decades to modern restaurants that keep the kitchen fires burning until dawn.

## The Late-Night Legends

### Duck & Waffle: Sky-High Dining
**Duck & Waffle** isn't just a restaurant; it's a London institution. Perched 40 floors above the city, this 24-hour restaurant serves everything from breakfast waffles to late-night cocktails with views that stretch to the horizon. The duck and waffle itself is legendary, but the real magic happens when you're watching the city lights twinkle below.

### Dishoom Covent Garden: Bombay After Dark
**Dishoom Covent Garden** brings the spirit of Bombay's late-night cafes to London's West End. Open until 11 PM (and later on weekends), this place serves authentic Indian comfort food in an atmosphere that's both nostalgic and electric. The black daal is a midnight revelation.

### Tyyabs: The Whitechapel Institution
**Tyyabs** in Whitechapel has been serving late-night curry to Londoners for over 30 years. This family-run institution stays open until the early hours, serving authentic Pakistani cuisine to everyone from shift workers to night owls. The lamb chops are legendary, and the atmosphere is pure East End.

## The Late-Night Experience

London's late-night dining isn't just about the food – it's about the experience. There's something magical about eating great food when the rest of the city is quiet, about sharing a meal with friends as the night stretches into morning.

## Areas That Never Sleep

### Soho: The Night Owl's Paradise
Soho's late-night scene is legendary. From traditional pubs serving food until 2 AM to modern restaurants that keep the kitchen open all night, this area knows how to feed the nocturnal crowd.

### Shoreditch: Where Night Becomes Day
Shoreditch's creative energy extends well into the night, with restaurants and bars serving everything from gourmet burgers to authentic Asian cuisine until the early hours.

### Brick Lane: Curry Capital After Dark
Brick Lane transforms at night, with curry houses competing for the late-night crowd. The competition is fierce, and the food is exceptional.

## Insider Tips for Late-Night Dining

- **Check opening hours**: Not all restaurants stay open late every night.
- **Book ahead**: Popular late-night spots can get busy, especially on weekends.
- **Embrace the atmosphere**: Late-night dining is about more than just food.
- **Transport planning**: Make sure you can get home after your meal.

## The Verdict

London's late-night dining scene is one of the city's best-kept secrets. Whether you're looking for a romantic rooftop dinner or a hearty curry at 2 AM, the capital delivers.

*Ready to explore more of London's vibrant areas? Check out our guides to [Soho](/areas/soho) and [Shoreditch](/areas/shoditch) for more late-night adventures.*`
  },
  
  {
    filename: 'romantic-restaurants-london.md',
    title: 'Romantic Restaurants in London That Actually Deliver',
    description: 'From rooftop oysters to candle-lit curries, these are London\'s most genuinely romantic restaurants.',
    slug: '/blog/romantic-restaurants-london',
    hero: '/public/hero_v2/romantic-restaurants-london.webp',
    schema: 'BlogPosting + LocalBusiness',
    restaurants: [
      'Gloria',
      'Dishoom Kensington',
      'Seabird'
    ],
    crossLinks: [
      { text: 'Cuisines > Italian', url: '/cuisines/italian' },
      { text: 'Areas > Shoreditch', url: '/areas/shoditch' }
    ],
    content: `# Romantic Restaurants in London That Actually Deliver

*Forget the clichés. London's most romantic restaurants aren't about white tablecloths and stuffy service – they're about atmosphere, authenticity, and that magical feeling that makes you forget you're in a city of millions.*

## What Makes a Restaurant Truly Romantic?

Romance isn't just about candlelight and soft music – it's about creating moments that matter. London's most romantic restaurants understand this, offering intimate atmospheres, exceptional food, and that indefinable quality that makes every meal feel special.

## The Romantic Legends

### Gloria: Italian Passion in Shoreditch
**Gloria** brings the warmth of Italian hospitality to the heart of Shoreditch. This isn't just a restaurant; it's a love letter to Italian cuisine, served in an atmosphere that's both sophisticated and genuinely welcoming. The pasta is handmade, the wine list is exceptional, and the atmosphere is pure romance.

### Dishoom Kensington: Bombay Romance
**Dishoom Kensington** transforms the traditional Bombay café into something truly special. The dim lighting, the vintage décor, and the exceptional Indian cuisine create an atmosphere that's both exotic and intimate. The black daal is legendary, but the real magic is in the atmosphere.

### Seabird: Rooftop Romance
**Seabird** offers something rare in London: a rooftop restaurant that actually delivers on the promise. The views are spectacular, the seafood is exceptional, and the atmosphere is pure romance. This is where you go when you want to impress someone special.

## The Art of Romantic Dining

Romantic dining in London isn't about following a formula – it's about finding places that create genuine connection. Whether it's the intimate lighting of a candlelit corner or the shared experience of exceptional food, the best romantic restaurants understand that romance is about creating moments that matter.

## Areas for Romance

### Shoreditch: Creative Intimacy
Shoreditch's creative energy extends to its romantic dining scene, with restaurants that offer intimate atmospheres and exceptional food in equal measure.

### Central London: Classic Elegance
Central London offers classic romantic dining experiences, from historic restaurants to modern establishments that understand the art of intimate dining.

### Southwark: Riverside Romance
Southwark's riverside location provides the perfect backdrop for romantic dining, with restaurants that offer both exceptional food and spectacular views.

## Insider Tips for Romantic Dining

- **Timing matters**: Book for off-peak times for a more intimate experience.
- **Location, location, location**: Choose restaurants that match your romantic vision.
- **Food matters**: Great food enhances any romantic experience.
- **Atmosphere is everything**: Look for restaurants that create genuine intimacy.

## The Verdict

London's romantic dining scene offers something for every couple, from intimate Italian trattorias to rooftop restaurants with spectacular views. The key is finding places that create genuine connection, not just romantic clichés.

*Ready to explore more of London's romantic dining scene? Check out our guides to [Italian cuisine](/cuisines/italian) and [Shoreditch](/areas/shoditch) for more romantic adventures.*`
  },
  
  {
    filename: 'best-restaurants-near-covent-garden.md',
    title: 'Best Restaurants Near Covent Garden',
    description: 'From historic Rules to modern Cora Pearl, discover Covent Garden\'s real food scene beyond the tourists.',
    slug: '/blog/best-restaurants-near-covent-garden',
    hero: '/public/hero_v2/covent-garden-restaurants.webp',
    schema: 'BlogPosting + LocalBusiness',
    restaurants: [
      'Dishoom Covent Garden',
      'Flat Iron Covent Garden'
    ],
    crossLinks: [
      { text: 'Areas > Central London', url: '/areas/central-london' }
    ],
    content: `# Best Restaurants Near Covent Garden

*Covent Garden might be tourist central, but hidden among the crowds are some of London's most exceptional restaurants. From historic institutions to modern marvels, here's where to eat when you're ready to escape the tourist traps.*

## The Covent Garden Dining Scene

Covent Garden's reputation as a tourist magnet often overshadows its incredible dining scene. But look beyond the souvenir shops and street performers, and you'll find restaurants that have been serving Londoners for centuries alongside modern establishments that are redefining the area's culinary landscape.

## The Covent Garden Legends

### Dishoom Covent Garden: Bombay in the West End
**Dishoom Covent Garden** brings the spirit of Bombay's traditional cafés to the heart of London's West End. This isn't just Indian food – it's an experience. The black daal is legendary, the atmosphere is electric, and the chai is served with the kind of care that makes you feel like you're in Mumbai.

### Flat Iron Covent Garden: Steak Perfection
**Flat Iron Covent Garden** has revolutionized the steak game in London. This isn't your typical steakhouse – it's a modern, accessible take on great meat, served in an atmosphere that's both sophisticated and genuinely welcoming. The flat iron steak is exceptional, and the sides are perfectly executed.

## The Real Covent Garden

Beyond the tourist attractions, Covent Garden is home to a thriving local dining scene. The area's restaurants serve everyone from West End theatre-goers to local residents who know where to find the real gems.

## The Covent Garden Experience

Dining in Covent Garden isn't just about the food – it's about the atmosphere. The area's restaurants are part of London's cultural fabric, serving meals that are as much about the experience as they are about the cuisine.

## Insider Tips for Covent Garden Dining

- **Timing is everything**: Book ahead, especially for theatre district restaurants.
- **Look beyond the obvious**: Some of the best restaurants are hidden in plain sight.
- **Embrace the atmosphere**: Covent Garden's energy is part of the dining experience.
- **Transport planning**: The area can get busy, especially during peak times.

## The Verdict

Covent Garden's dining scene is as diverse and exciting as the area itself. From historic institutions to modern marvels, the restaurants here offer something for every palate and occasion.

*Ready to explore more of Central London's dining scene? Check out our guide to [Central London](/areas/central-london) for more culinary adventures.*`
  },
  
  {
    filename: 'soho-late-night-restaurants-london.md',
    title: 'The Real Soho: Late-Night Eats, Loud Drinks and Zero Pretence',
    description: 'The best restaurants and late-night eats that make Soho the beating heart of London. From Kiln to Hoppers, here\'s where the city really comes alive.',
    slug: '/blog/soho-late-night-restaurants-london',
    hero: '/public/hero_v2/soho-late-night.webp',
    schema: 'BlogPosting + LocalBusiness',
    restaurants: [
      'Kiln',
      'Hoppers',
      'Blacklock',
      'Bar Italia',
      'Lina Stores'
    ],
    crossLinks: [
      { text: 'Areas > Soho', url: '/areas/soho' }
    ],
    content: `# The Real Soho: Late-Night Eats, Loud Drinks and Zero Pretence

*Soho isn't just a neighborhood – it's London's beating heart, where the city's creative energy meets its insatiable appetite for great food and late-night adventures. Forget the tourist traps; this is where London really comes alive.*

## The Soho Spirit

Soho has always been London's creative playground, and its dining scene reflects that energy. This is where chefs experiment, where restaurants push boundaries, and where the city's food culture evolves. The area's late-night scene is legendary, with restaurants that keep the kitchen fires burning until the early hours.

## The Soho Legends

### Kiln: Thai Fire and Flavor
**Kiln** isn't just a Thai restaurant; it's a culinary adventure. This tiny Soho gem serves authentic Thai cuisine cooked over charcoal, creating flavors that are both traditional and innovative. The atmosphere is electric, the food is exceptional, and the experience is unforgettable.

### Hoppers: Sri Lankan Soul
**Hoppers** brings the vibrant flavors of Sri Lanka to the heart of Soho. This isn't just South Asian food – it's a celebration of Sri Lankan cuisine, served in an atmosphere that's both authentic and exciting. The hoppers are legendary, and the curry selection is exceptional.

### Blacklock: Meat Perfection
**Blacklock** has redefined the steakhouse experience in Soho. This isn't your typical meat restaurant – it's a modern take on great meat, served in an atmosphere that's both sophisticated and genuinely welcoming. The chops are exceptional, and the sides are perfectly executed.

### Bar Italia: Soho Institution
**Bar Italia** is a Soho institution, serving authentic Italian coffee and light bites to everyone from late-night revelers to early-morning workers. This isn't just a café – it's a piece of Soho history, serving the community with genuine Italian hospitality.

### Lina Stores: Italian Excellence
**Lina Stores** brings authentic Italian deli culture to Soho, serving everything from fresh pasta to traditional Italian ingredients. This isn't just a deli – it's a celebration of Italian food culture, offering both retail and dining experiences that are genuinely authentic.

## The Soho Experience

Dining in Soho isn't just about the food – it's about the atmosphere. The area's restaurants are part of London's cultural fabric, serving meals that are as much about the experience as they are about the cuisine.

## The Late-Night Scene

Soho's late-night dining scene is legendary. The area's restaurants understand that London doesn't sleep, and neither should great food. From traditional pubs serving food until 2 AM to modern restaurants that keep the kitchen open all night, Soho knows how to feed the nocturnal crowd.

## Insider Tips for Soho Dining

- **Embrace the energy**: Soho's creative atmosphere is part of the dining experience.
- **Book ahead**: Popular restaurants can get busy, especially on weekends.
- **Explore the side streets**: Some of the best restaurants are hidden in plain sight.
- **Late-night dining**: Many restaurants stay open late, perfect for post-theatre meals.

## The Verdict

Soho's dining scene is as diverse and exciting as the area itself. From traditional institutions to modern marvels, the restaurants here offer something for every palate and occasion, served with the kind of energy that makes Soho special.

*Ready to explore more of Soho's vibrant dining scene? Check out our guide to [Soho](/areas/soho) for more culinary adventures.*`
  }
];

// Function to create blog articles with internal linking
function createBlogArticles() {
  console.log('📝 Creating premium editorial blog articles...');
  
  const { restaurantMap, totalVenues } = analyzeRestaurantData();
  const missingRestaurants = [];
  const linkReport = {
    totalArticles: 0,
    totalRestaurants: 0,
    linkedRestaurants: 0,
    missingRestaurants: 0,
    articles: []
  };
  
  blogArticles.forEach(article => {
    console.log(`📝 Creating ${article.filename}...`);
    
    let content = article.content;
    let linkedCount = 0;
    let missingCount = 0;
    
    // Process restaurant links
    article.restaurants.forEach(restaurantName => {
      const restaurantSlug = restaurantMap.get(restaurantName.toLowerCase()) || 
                            restaurantMap.get(restaurantName.toLowerCase().replace(/[^a-z0-9\s]/g, '')) ||
                            restaurantMap.get(restaurantName.toLowerCase().replace(/\s+/g, '-'));
      
      if (restaurantSlug) {
        // Replace restaurant name with linked version
        const linkPattern = new RegExp(`\\b${restaurantName}\\b`, 'gi');
        content = content.replace(linkPattern, `[${restaurantName}](/restaurant/${restaurantSlug})`);
        linkedCount++;
      } else {
        missingRestaurants.push({
          article: article.filename,
          restaurant: restaurantName,
          date: new Date().toISOString()
        });
        missingCount++;
      }
    });
    
    // Create YAML frontmatter
    const frontmatter = `---
title: "${article.title}"
description: "${article.description}"
slug: "${article.slug}"
hero: "${article.hero}"
schema: "${article.schema}"
publishedAt: "${new Date().toISOString()}"
updatedAt: "${new Date().toISOString()}"
tags: ["London", "Restaurants", "Food Guide"]
author: "The Best in London"
readTime: "8 min read"
---

`;
    
    // Add cross-links at the end
    if (article.crossLinks && article.crossLinks.length > 0) {
      content += '\n\n---\n\n*Ready to explore more of London\'s dining scene? ';
      article.crossLinks.forEach((link, index) => {
        if (index > 0) content += ' ';
        content += `Check out our guide to [${link.text}](${link.url})`;
        if (index < article.crossLinks.length - 1) content += ',';
      });
      content += ' for more culinary adventures.*';
    }
    
    // Write the article
    const articlePath = path.join(__dirname, '..', 'content', 'blog-seo', 'v2', article.filename);
    fs.writeFileSync(articlePath, frontmatter + content);
    
    // Update link report
    linkReport.totalArticles++;
    linkReport.totalRestaurants += article.restaurants.length;
    linkReport.linkedRestaurants += linkedCount;
    linkReport.missingRestaurants += missingCount;
    linkReport.articles.push({
      filename: article.filename,
      restaurants: article.restaurants.length,
      linked: linkedCount,
      missing: missingCount
    });
    
    console.log(`  ✅ Created ${article.filename} (${linkedCount}/${article.restaurants.length} restaurants linked)`);
  });
  
  // Create missing restaurants log
  if (missingRestaurants.length > 0) {
    const logPath = path.join(__dirname, '..', 'seo', 'logs', `missing-restaurants-${new Date().toISOString().split('T')[0]}.log`);
    const logContent = missingRestaurants.map(item => 
      `${item.date} | ${item.article} | ${item.restaurant}`
    ).join('\n');
    fs.writeFileSync(logPath, logContent);
    console.log(`📊 Missing restaurants logged to: ${logPath}`);
  }
  
  // Create link report
  const reportPath = path.join(__dirname, '..', 'seo', 'reports', `blog-link-report-${new Date().toISOString().split('T')[0]}.md`);
  const reportContent = `# Blog Link Report - ${new Date().toISOString().split('T')[0]}

## Summary
- **Total Articles:** ${linkReport.totalArticles}
- **Total Restaurants:** ${linkReport.totalRestaurants}
- **Successfully Linked:** ${linkReport.linkedRestaurants}
- **Missing Restaurants:** ${linkReport.missingRestaurants}
- **Link Success Rate:** ${((linkReport.linkedRestaurants / linkReport.totalRestaurants) * 100).toFixed(1)}%

## Article Details
${linkReport.articles.map(article => 
  `### ${article.filename}
- Restaurants: ${article.restaurants}
- Linked: ${article.linked}
- Missing: ${article.missing}
- Success Rate: ${((article.linked / article.restaurants) * 100).toFixed(1)}%`
).join('\n')}

## Missing Restaurants
${missingRestaurants.length > 0 ? 
  missingRestaurants.map(item => `- ${item.restaurant} (${item.article})`).join('\n') :
  'All restaurants successfully linked!'
}

Generated at: ${new Date().toISOString()}
`;
  
  fs.writeFileSync(reportPath, reportContent);
  console.log(`📊 Link report saved to: ${reportPath}`);
  
  return { linkReport, missingRestaurants };
}

// Run the blog creation
createBlogArticles()
  .then(results => {
    console.log('\n🎉 Premium editorial blog articles created!');
    console.log(`📝 Articles created: ${results.linkReport.totalArticles}`);
    console.log(`🔗 Restaurants linked: ${results.linkReport.linkedRestaurants}/${results.linkReport.totalRestaurants}`);
    console.log(`❌ Missing restaurants: ${results.linkReport.missingRestaurants}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Blog creation failed:', error);
    process.exit(1);
  });
