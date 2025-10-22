#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Zero-cost content generation templates
 * Pure functions with no network calls
 */

/**
 * Generate witty about text for a venue (120-170 words)
 */
export function makeAboutText(venue) {
  const name = venue.name;
  const cuisine = venue.cuisines?.[0] || 'restaurant';
  const area = venue.area || venue.borough || 'London';
  const rating = venue.rating;
  const isHalal = venue.halal_certified || venue.dietary_tags?.includes('halal');
  const fsaRating = venue.fsa_rating;
  const priceLevel = venue.price_level;
  
  // Generate witty opening
  const openings = [
    `Nestled in the heart of ${area}, ${name} isn't just another ${cuisine} spot—it's a culinary adventure waiting to unfold.`,
    `${name} stands as a testament to ${cuisine} excellence in ${area}, where tradition meets innovation on every plate.`,
    `In the bustling streets of ${area}, ${name} has carved out its own niche in the ${cuisine} scene with flair and finesse.`,
    `${name} brings the authentic taste of ${cuisine} to ${area}, proving that great food knows no boundaries.`
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];
  
  // Generate middle section based on venue characteristics
  let middle = '';
  
  if (rating && rating >= 4.5) {
    middle += `With a stellar ${rating.toFixed(1)}-star rating, this establishment has earned its reputation through consistent quality and exceptional service. `;
  }
  
  if (isHalal) {
    middle += `As a halal-certified venue, ${name} ensures that every dish meets the highest standards of quality and authenticity. `;
  }
  
  if (fsaRating && fsaRating >= 4) {
    middle += `The Food Standards Agency rating of ${fsaRating}/5 reflects their commitment to hygiene and food safety. `;
  }
  
  if (priceLevel) {
    const priceDesc = priceLevel <= 2 ? 'affordable' : priceLevel <= 3 ? 'moderate' : 'premium';
    middle += `Offering ${priceDesc} pricing, ${name} delivers exceptional value for money. `;
  }
  
  // Generate closing
  const closings = [
    `Whether you're a ${cuisine} connoisseur or simply seeking a memorable dining experience, ${name} promises to deliver.`,
    `From the moment you step through the door, ${name} transports you to the heart of ${cuisine} culture.`,
    `${name} isn't just about food—it's about creating memories, one delicious bite at a time.`,
    `In a city known for its diverse culinary landscape, ${name} stands out as a true ${cuisine} gem.`
  ];
  
  const closing = closings[Math.floor(Math.random() * closings.length)];
  
  // Combine and ensure word count
  let aboutText = `${opening} ${middle}${closing}`;
  
  // Adjust length if needed
  const wordCount = aboutText.split(' ').length;
  if (wordCount < 120) {
    aboutText += ` The warm atmosphere and attentive staff make every visit a pleasure, while the carefully crafted menu showcases the best of ${cuisine} cuisine.`;
  } else if (wordCount > 170) {
    // Trim to fit
    const words = aboutText.split(' ');
    aboutText = words.slice(0, 170).join(' ') + '...';
  }
  
  return aboutText;
}

/**
 * Generate FAQ entry for a venue
 */
export function makeFaqEntry(venue) {
  const name = venue.name;
  const cuisine = venue.cuisines?.[0] || 'restaurant';
  const area = venue.area || venue.borough || 'London';
  const isHalal = venue.halal_certified || venue.dietary_tags?.includes('halal');
  
  const faqs = [
    {
      question: `Is ${name} halal?`,
      answer: isHalal 
        ? `Yes, ${name} is halal-certified and ensures all ingredients meet halal standards.`
        : `Please contact ${name} directly to confirm their halal certification status.`
    },
    {
      question: `What type of cuisine does ${name} serve?`,
      answer: `${name} specializes in ${cuisine} cuisine, offering authentic flavors and traditional dishes.`
    },
    {
      question: `Where is ${name} located?`,
      answer: `${name} is located in ${area}, making it easily accessible for diners in the area.`
    },
    {
      question: `Does ${name} take reservations?`,
      answer: `We recommend contacting ${name} directly to inquire about reservation policies and availability.`
    },
    {
      question: `What are the price ranges at ${name}?`,
      answer: venue.price_level 
        ? `${name} offers ${venue.price_level <= 2 ? 'affordable' : venue.price_level <= 3 ? 'moderate' : 'premium'} pricing.`
        : `Please contact ${name} directly for current pricing information.`
    }
  ];
  
  return faqs;
}

/**
 * Generate blog outline for a topic
 */
export function makeBlogOutline(topic, area, cuisine) {
  const outlines = [
    {
      title: `Best ${cuisine} Restaurants in ${area}`,
      dek: `Discover the top ${cuisine} dining spots in ${area}, from hidden gems to established favorites.`,
      tags: [cuisine, area, 'restaurants', 'dining'],
      sections: [
        'Introduction to the area',
        'Top 5 recommendations',
        'What makes each special',
        'Tips for dining',
        'Conclusion'
      ]
    },
    {
      title: `${area}'s ${cuisine} Scene: A Complete Guide`,
      dek: `Everything you need to know about ${cuisine} dining in ${area}, including the best spots and insider tips.`,
      tags: [cuisine, area, 'guide', 'dining'],
      sections: [
        'Area overview',
        'Restaurant categories',
        'Price ranges',
        'Best times to visit',
        'Local favorites'
      ]
    },
    {
      title: `Hidden ${cuisine} Gems in ${area}`,
      dek: `Uncover the lesser-known ${cuisine} restaurants in ${area} that locals love.`,
      tags: [cuisine, area, 'hidden gems', 'local'],
      sections: [
        'Why these spots are special',
        'Featured restaurants',
        'What to order',
        'Local insights',
        'How to find them'
      ]
    }
  ];
  
  return outlines[Math.floor(Math.random() * outlines.length)];
}

/**
 * Generate content for venues missing about text
 */
async function generateMissingContent() {
  console.log('📝 Generating missing venue content...');
  
  const publicDir = path.join(process.cwd(), 'public');
  const venuesPath = path.join(publicDir, 'venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    throw new Error('venues.json not found');
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || venuesData;
  
  let generated = 0;
  let skipped = 0;
  
  for (const venue of venues) {
    // Only generate if about text is missing or very short
    if (!venue.about?.text || venue.about.text.length < 50) {
      try {
        const aboutText = makeAboutText(venue);
        const faqs = makeFaqEntry(venue);
        
        // Update venue data
        if (!venue.about) venue.about = {};
        venue.about.text = aboutText;
        venue.about.generated = true;
        venue.about.generatedAt = new Date().toISOString();
        
        if (!venue.faqs) venue.faqs = faqs;
        
        generated++;
        console.log(`✅ Generated content for ${venue.name}`);
      } catch (error) {
        console.error(`❌ Failed to generate content for ${venue.name}:`, error.message);
      }
    } else {
      skipped++;
    }
  }
  
  // Write updated venues data
  if (generated > 0) {
    fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));
    console.log(`\n📊 Content Generation Summary:`);
    console.log(`   Generated: ${generated} venues`);
    console.log(`   Skipped: ${skipped} venues (already have content)`);
    console.log(`   Total: ${venues.length} venues`);
  } else {
    console.log(`\n📊 All venues already have content. No generation needed.`);
  }
  
  console.log('✅ Content generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMissingContent().catch(console.error);
}

export default generateMissingContent;

