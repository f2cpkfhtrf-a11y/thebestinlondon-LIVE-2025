const fs = require('fs');
const path = require('path');

// Generate AI description for a venue
async function generateDescription(venue) {
  const prompt = `Write a compelling 100-150 word restaurant description for:

Restaurant: ${venue.name}
Cuisine: ${venue.cuisines?.[0] || 'International'}
Area: ${venue.area || 'London'}
Rating: ${venue.rating || 'N/A'} stars
Price Range: ${venue.price_range || '££'}
${venue.fsa_rating ? `FSA Hygiene: ${venue.fsa_rating}/5` : ''}

Write in a professional, engaging tone. Focus on:
- Cuisine style and specialties
- Atmosphere and ambiance
- What makes it special
- Who it's perfect for

DO NOT mention specific menu items you don't know about.
DO NOT make up facts about the restaurant.
Be descriptive but honest based on the limited info provided.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    return data.content[0].text.trim();
  } catch (error) {
    console.error(`Error generating description for ${venue.name}:`, error.message);
    return generateFallbackDescription(venue);
  }
}

// Fallback description template
function generateFallbackDescription(venue) {
  const cuisine = venue.cuisines?.[0] || 'international';
  const area = venue.area || 'London';
  const rating = venue.rating || 4.0;
  
  return `${venue.name} is a ${cuisine} restaurant located in ${area}. With a ${rating}-star rating, this establishment offers an authentic dining experience in the heart of London. The venue combines quality ingredients with traditional cooking methods to deliver memorable meals. Whether you're seeking a casual dinner or special celebration, ${venue.name} provides a welcoming atmosphere for all occasions. Perfect for those looking to explore genuine ${cuisine} flavors in a comfortable setting.`;
}

// Main function
async function generateAllDescriptions() {
  const filePath = path.join(__dirname, '../public/venues.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log('🤖 GENERATING VENUE DESCRIPTIONS\n');
  console.log(`Total venues: ${data.venues.length}`);
  
  // Check existing descriptions
  const existing = data.venues.filter(v => v.description && v.description.length > 50).length;
  const needed = data.venues.filter(v => !v.description || v.description.length < 50);
  
  console.log(`Existing descriptions: ${existing}`);
  console.log(`Need descriptions: ${needed.length}\n`);
  
  if (needed.length === 0) {
    console.log('✅ All venues already have descriptions!');
    return;
  }
  
  console.log('⏱️  This will take about 15-20 minutes (2-3 per minute to avoid rate limits)\n');
  console.log('Starting generation...\n');
  
  let generated = 0;
  let failed = 0;
  
  for (const venue of needed) {
    try {
      console.log(`[${generated + failed + 1}/${needed.length}] Generating for: ${venue.name}`);
      
      const description = await generateDescription(venue);
      venue.description = description;
      
      console.log(`  ✓ Generated (${description.length} chars)`);
      generated++;
      
      // Save progress every 10 venues
      if ((generated + failed) % 10 === 0) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`  💾 Progress saved (${generated} done, ${failed} failed)\n`);
      }
      
      // Rate limit: 2 requests per second max
      await new Promise(resolve => setTimeout(resolve, 600));
      
    } catch (error) {
      console.log(`  ✗ Failed: ${error.message}`);
      venue.description = generateFallbackDescription(venue);
      failed++;
    }
  }
  
  // Final save
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('✅ DESCRIPTION GENERATION COMPLETE');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Generated: ${generated}`);
  console.log(`Failed (used fallback): ${failed}`);
  console.log(`Total venues with descriptions: ${data.venues.filter(v => v.description).length}`);
}

// Run
generateAllDescriptions().catch(console.error);
