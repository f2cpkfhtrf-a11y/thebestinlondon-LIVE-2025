/**
 * Batch Add Hero Images to All Pages
 * Adds cinematic hero images with relevant backgrounds to all category, cuisine, and location pages
 */

const fs = require('fs');
const path = require('path');

// Hero image mappings - high-res Unsplash images
const HERO_IMAGES = {
  // Category pages
  'best-cafes-london': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=2400&q=90', // Cozy cafe interior
  'best-coffee-shops-london': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=2400&q=90', // Coffee shop vibes
  'best-halal-restaurants-london': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2400&q=90', // Halal food spread
  'halal-restaurants-london': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2400&q=90', // Halal cuisine
  
  // Cuisine-specific pages
  'italian-restaurants-london': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=2400&q=90', // Italian pasta
  'indian-restaurants-london': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=2400&q=90', // Indian curry
  'japanese-restaurants-london': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=2400&q=90', // Sushi
  'chinese-restaurants-london': 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=2400&q=90', // Chinese dim sum
  'thai-restaurants-london': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=2400&q=90', // Thai food
  'turkish-restaurants-london': 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=2400&q=90', // Turkish kebab
  'vegan-restaurants-london': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=2400&q=90', // Vegan bowl
  'vegetarian-restaurants-london': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=2400&q=90', // Vegetarian salad
  
  // Location pages - iconic London landmarks + food
  'restaurants-soho': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=2400&q=90', // Urban dining
  'restaurants-covent-garden': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=90', // Fine dining
  'restaurants-shoreditch': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=2400&q=90', // Trendy food
  'restaurants-mayfair': 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=2400&q=90', // Luxury dining
  'restaurants-camden': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2400&q=90', // Street food
  'restaurants-notting-hill': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2400&q=90', // Elegant food
  'restaurants-chelsea': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90', // Upscale restaurant
};

// Default fallback image
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=90';

function getHeroSection(pageKey, title, description, stats = {}) {
  const imageUrl = HERO_IMAGES[pageKey] || DEFAULT_IMAGE;
  
  return `
        {/* Hero Section - Cinematic Image Background */}
        <section style={{
          position: 'relative',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: \`linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,0.75)), url('${imageUrl}')\`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '140px 20px 100px',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.7) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Gradient fade to content below */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: \`linear-gradient(to bottom, transparent, \${theme.colors.bg.primary})\`,
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              ${title}
            </h1>
            
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'rgba(250, 250, 250, 0.95)',
              marginBottom: theme.spacing['3xl'],
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)'
            }}>
              ${description}
            </p>

            {/* Stats Pills */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '12px'
            }}>
              ${stats.venues ? `<span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: \`1px solid rgba(212, 175, 55, 0.4)\`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                ${stats.venues} Venues
              </span>` : ''}
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: \`1px solid rgba(212, 175, 55, 0.4)\`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                Curated & Verified
              </span>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: \`1px solid rgba(212, 175, 55, 0.4)\`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                Updated Daily
              </span>
            </div>
          </div>
        </section>
`;
}

// Pages to update - format: [filename (without .js), display title, description]
const PAGES_TO_UPDATE = [
  // Category pages
  ['best-cafes-london', "London's Best Cafés", "From specialty coffee roasters to cozy neighborhood spots — discover exceptional cafés curated and verified daily"],
  ['best-coffee-shops-london', "Best Coffee Shops in London", "Artisan coffee, perfect pour-overs, and exceptional espresso — London's finest coffee destinations"],
  ['best-halal-restaurants-london', "Best Halal Restaurants in London", "Discover authentic halal cuisine from around the world — rigorously verified and curated for quality"],
  
  // Cuisine pages
  ['italian-restaurants-london', "Best Italian Restaurants in London", "From authentic pasta to wood-fired pizza — London's finest Italian dining experiences"],
  ['indian-restaurants-london', "Best Indian Restaurants in London", "Authentic curries, tandoori classics, and regional specialties — London's top Indian venues"],
  ['japanese-restaurants-london', "Best Japanese Restaurants in London", "Fresh sushi, ramen, and izakaya favorites — London's finest Japanese cuisine"],
  ['chinese-restaurants-london', "Best Chinese Restaurants in London", "Dim sum, Peking duck, and regional Chinese flavors — discover London's top Chinese restaurants"],
  ['thai-restaurants-london', "Best Thai Restaurants in London", "Authentic pad thai, green curry, and street food favorites — London's finest Thai venues"],
  ['turkish-restaurants-london', "Best Turkish Restaurants in London", "Kebabs, mezze, and traditional Turkish delights — discover London's best Turkish cuisine"],
  ['vegan-restaurants-london', "Best Vegan Restaurants in London", "Plant-based perfection — from casual eateries to fine dining vegan experiences"],
  ['vegetarian-restaurants-london', "Best Vegetarian Restaurants in London", "Fresh, flavorful vegetarian cuisine — London's finest meat-free dining"],
];

// Function to check if file needs updating
function needsHeroUpdate(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it already has a hero section with background image
  return !content.includes('backgroundAttachment: \'fixed\'') && 
         !content.includes('COMING SOON');
}

// Function to add hero to a file
function addHeroToFile(filePath, pageKey, title, description) {
  console.log(`📝 Processing: ${path.basename(filePath)}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`   ⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has hero image
  if (!needsHeroUpdate(filePath)) {
    console.log(`   ✅ Already has hero image`);
    return false;
  }

  // Find the opening <div> after closing </Head>
  const headerMatch = content.match(/<header[^>]*>/);
  if (!headerMatch) {
    console.log(`   ⚠️  No header found`);
    return false;
  }

  const heroSection = getHeroSection(pageKey, title, description);
  
  // Replace the old header with the new hero section
  const headerRegex = /<header[\s\S]*?<\/header>/;
  content = content.replace(headerRegex, heroSection);

  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`   ✅ Hero added successfully`);
  return true;
}

// Main execution
console.log('🚀 Starting batch hero image addition...\n');

let updated = 0;
let skipped = 0;
let errors = 0;

const pagesDir = path.join(__dirname, '..', 'pages');

PAGES_TO_UPDATE.forEach(([filename, title, description]) => {
  const filePath = path.join(pagesDir, `${filename}.js`);
  try {
    const result = addHeroToFile(filePath, filename, title, description);
    if (result) {
      updated++;
    } else {
      skipped++;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    errors++;
  }
  console.log('');
});

console.log('\n📊 SUMMARY:');
console.log(`   ✅ Updated: ${updated}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   ❌ Errors: ${errors}`);
console.log('\n✨ Done! Test with: npm run dev\n');
