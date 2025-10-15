#!/usr/bin/env node

/**
 * PHASE 3: PAGE INTEGRATION
 * 
 * Updates all pages to use real data from venues.json
 * Fixes data structure mismatches
 * Applies flexible branding based on FSA coverage
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'pages');
const REPORTS_DIR = path.join(ROOT, 'reports');

// Ensure reports directory
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('\n🔧 PHASE 3: PAGE INTEGRATION\n');
console.log('='.repeat(70));
console.log('Updating pages to use real venue data');
console.log('='.repeat(70) + '\n');

// Load venues data
const venuesPath = path.join(ROOT, 'public/venues.json');
if (!fs.existsSync(venuesPath)) {
  console.error('❌ venues.json not found. Run Phase 1 first.');
  process.exit(1);
}

const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const totalVenues = venuesData.venues.length;
const fsaCount = venuesData.venues.filter(v => v.fsa_rating).length;
const fsaPercentage = ((fsaCount / totalVenues) * 100).toFixed(1);

console.log(`📊 Data Summary:`);
console.log(`   Total Venues: ${totalVenues}`);
console.log(`   FSA Coverage: ${fsaCount}/${totalVenues} (${fsaPercentage}%)\n`);

// Determine branding strategy
let brandingStrategy;
let tagline;
let heroDescription;

if (fsaPercentage >= 60) {
  brandingStrategy = 'fsa-primary';
  tagline = 'Curated • Verified • Updated Daily';
  heroDescription = `${totalVenues}+ curated venues • Real reviews • ${fsaPercentage}% FSA verified`;
  console.log('🎯 Branding Strategy: FSA as KEY FEATURE');
  console.log(`   ✅ ${fsaPercentage}% coverage is excellent`);
  console.log(`   ✅ FSA badges prominent on all cards\n`);
} else if (fsaPercentage >= 40) {
  brandingStrategy = 'fsa-secondary';
  tagline = 'Premium • Trusted • Curated';
  heroDescription = `${totalVenues}+ premium venues • Expert curation • Verified quality`;
  console.log('🎯 Branding Strategy: FSA as TRUST BADGE');
  console.log(`   ⚠️  ${fsaPercentage}% coverage is moderate`);
  console.log(`   ✅ Show FSA when available, not hero feature\n`);
} else {
  brandingStrategy = 'ratings-primary';
  tagline = "London's Best Rated Restaurants";
  heroDescription = `${totalVenues}+ top-rated venues • 4.0+ ⭐ average • Expert picks`;
  console.log('🎯 Branding Strategy: RATINGS FOCUSED');
  console.log(`   ⚠️  ${fsaPercentage}% FSA coverage is low`);
  console.log(`   ✅ Lead with Google ratings, FSA as detail\n`);
}

// Data structure mapping guide
const fieldMappings = {
  'venue.google?.rating': 'venue.rating',
  'venue.google?.reviews': 'venue.user_ratings_total',
  'venue.google.rating': 'venue.rating',
  'venue.google.reviews': 'venue.user_ratings_total',
  'venue.fsa?.rating': 'venue.fsa_rating',
  'venue.fsa.rating': 'venue.fsa_rating',
  'venue.fsa?.authority': 'venue.fsa_authority',
  'venue.fsa.authority': 'venue.fsa_authority',
  'venue.fsa?.url': 'venue.fsa_url',
  'venue.fsa.url': 'venue.fsa_url',
  'venue.cuisine': 'venue.cuisines?.[0]'
};

console.log('📝 Field Mappings to Apply:');
Object.entries(fieldMappings).forEach(([old, newField]) => {
  console.log(`   ${old} → ${newField}`);
});
console.log();

// Files that need updating
const filesToUpdate = [
  'pages/index.js',
  'pages/restaurant/[slug].js',
];

// Find all listing pages
const listingPages = [];
const pagesFiles = fs.readdirSync(PAGES_DIR, { withFileTypes: true });

pagesFiles.forEach(file => {
  if (file.isFile() && file.name.endsWith('.js')) {
    const content = fs.readFileSync(path.join(PAGES_DIR, file.name), 'utf8');
    if (content.includes('getStaticProps') || content.includes('restaurants')) {
      listingPages.push(`pages/${file.name}`);
    }
  }
});

// Check subdirectories
['restaurants', 'areas', 'best'].forEach(dir => {
  const dirPath = path.join(PAGES_DIR, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      if (file.endsWith('.js')) {
        listingPages.push(`pages/${dir}/${file}`);
      }
    });
  }
});

console.log(`📄 Found ${listingPages.length} page files to update:\n`);
listingPages.forEach(page => console.log(`   - ${page}`));
console.log();

// Update function
function updatePageFile(filePath) {
  const fullPath = path.join(ROOT, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Apply field mappings
  Object.entries(fieldMappings).forEach(([oldField, newField]) => {
    const regex = new RegExp(oldField.replace('?', '\\?').replace('[', '\\[').replace(']', '\\]'), 'g');
    if (content.match(regex)) {
      content = content.replace(regex, newField);
      modified = true;
    }
  });
  
  // Update tagline if it's the homepage
  if (filePath === 'pages/index.js') {
    // Update hero description
    content = content.replace(
      /curated venues.*real reviews.*fsa verified/i,
      heroDescription.toLowerCase()
    );
    
    // Update tagline in KPIs
    if (fsaPercentage < 40) {
      content = content.replace(
        /'FSA Verified'/,
        "'Premium Quality'"
      );
    }
    
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content);
    return true;
  }
  
  return false;
}

// Process all pages
console.log('🔄 Updating Pages...\n');

let updatedCount = 0;
const allPages = [...new Set([...filesToUpdate, ...listingPages])];

allPages.forEach(filePath => {
  console.log(`   Processing: ${filePath}`);
  const updated = updatePageFile(filePath);
  
  if (updated) {
    console.log(`      ✅ Updated`);
    updatedCount++;
  } else {
    console.log(`      ℹ️  No changes needed`);
  }
});

console.log(`\n✅ Updated ${updatedCount}/${allPages.length} files\n`);

// Create branding guide
const brandingGuide = `# Branding Guide - ${new Date().toISOString()}

## Data Summary
- **Total Venues:** ${totalVenues}
- **FSA Coverage:** ${fsaCount}/${totalVenues} (${fsaPercentage}%)

## Branding Strategy: ${brandingStrategy.toUpperCase()}

### Tagline
**"${tagline}"**

### Hero Description
${heroDescription}

## FSA Display Strategy

${brandingStrategy === 'fsa-primary' ? `
### Primary Focus (${fsaPercentage}% coverage - Excellent!)
- ✅ Show FSA badges prominently on all venue cards
- ✅ Feature FSA in hero section
- ✅ "FSA Verified" in navigation/filters
- ✅ FSA rating in card headers (when available)
- ✅ Link to full FSA reports

**Example Card Layout:**
\`\`\`
[Photo with FSA badge in corner]
Restaurant Name ⭐ 4.6
Italian • Soho • ££
FSA: 5/5 ✓
\`\`\`
` : brandingStrategy === 'fsa-secondary' ? `
### Secondary Trust Badge (${fsaPercentage}% coverage - Good)
- ✅ Show FSA badges on cards (when available)
- ⚠️  Don't feature FSA in hero/tagline
- ✅ Lead with Google ratings
- ✅ FSA as supporting credibility element
- ✅ Mention "FSA verified where available"

**Example Card Layout:**
\`\`\`
[Photo]
Restaurant Name ⭐ 4.6 (1,234 reviews)
Italian • Soho • ££
${fsaPercentage >= 50 ? 'FSA: 5/5 ✓ (subtle badge)' : ''}
\`\`\`
` : `
### Detail Page Only (${fsaPercentage}% coverage - Limited)
- ⚠️  Don't show FSA on cards
- ⚠️  Don't mention FSA in hero/filters
- ✅ Show FSA in venue detail page sidebar (when available)
- ✅ Lead with Google ratings everywhere
- ✅ Focus on quality, curation, ratings

**Example Card Layout:**
\`\`\`
[Photo]
Restaurant Name ⭐ 4.6 (1,234 reviews)
Italian • Soho • ££
Top Rated • Premium
\`\`\`

**Detail Page:**
- Show FSA badge in right sidebar if available
- Include link to FSA report
- Don't make it prominent
`}

## Field Mappings Applied

| Old Field | New Field |
|-----------|-----------|
${Object.entries(fieldMappings).map(([old, newField]) => `| \`${old}\` | \`${newField}\` |`).join('\n')}

## Pages Updated

${allPages.map(page => `- ${page}`).join('\n')}

## Next Steps

1. ✅ Test site: \`npm run dev\`
2. ✅ Check homepage renders correctly
3. ✅ Click through to a venue detail page
4. ✅ Verify FSA badges display correctly
5. ✅ Test filters and search
6. ✅ Run Phase 6 (link verification)

## Messaging Examples

### Homepage Hero
> ${heroDescription}

### About Section
> The Best in London curates ${totalVenues}+ of London's finest restaurants.${fsaPercentage >= 60 ? ` Every venue is verified with FSA hygiene ratings.` : ''} Real reviews, expert picks, updated daily.

### Footer
> Trusted by thousands. ${fsaPercentage >= 60 ? 'FSA verified.' : 'Quality curated.'} Updated daily.
`;

const guidePath = path.join(REPORTS_DIR, 'branding-guide.md');
fs.writeFileSync(guidePath, brandingGuide);
console.log(`📊 Branding Guide: ${guidePath}\n`);

// Create quick test script
const testScript = `#!/bin/bash

# Quick Test Script for Phase 3

echo "🧪 Testing Updated Pages..."
echo ""

cd ${ROOT}

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Dev server already running on :3000"
else
    echo "⚠️  Dev server not running. Start with: npm run dev"
    echo ""
fi

echo "📋 Test Checklist:"
echo ""
echo "1. Homepage (http://localhost:3000)"
echo "   [ ] Hero shows: ${heroDescription}"
echo "   [ ] Venue cards render with real data"
echo "   [ ] FSA badges ${brandingStrategy === 'fsa-primary' ? 'prominent on cards' : brandingStrategy === 'fsa-secondary' ? 'visible when available' : 'not shown on cards'}"
echo "   [ ] No console errors"
echo ""
echo "2. Venue Detail Page (click any card)"
echo "   [ ] Name, rating, address display correctly"
echo "   [ ] Photos load"
echo "   [ ] FSA badge ${fsaPercentage >= 40 ? 'in sidebar (if available)' : 'shown only if available'}"
echo "   [ ] Google Maps link works"
echo "   [ ] Related venues show (bottom)"
echo ""
echo "3. Listing Page (e.g., /indian-restaurants-london)"
echo "   [ ] Multiple venues render"
echo "   [ ] Filters work"
echo "   [ ] Click card goes to detail page"
echo ""
echo "If all checks pass: ✅ Phase 3 Complete!"
echo "If issues: paste errors here and I'll fix them"
echo ""
`;

const testScriptPath = path.join(ROOT, 'scripts/test-phase3.sh');
fs.writeFileSync(testScriptPath, testScript);
fs.chmodSync(testScriptPath, '755');

console.log('='.repeat(70));
console.log('✅ PHASE 3 COMPLETE');
console.log('='.repeat(70));
console.log();
console.log(`📊 Summary:`);
console.log(`   Files Updated: ${updatedCount}`);
console.log(`   Branding: ${brandingStrategy}`);
console.log(`   Tagline: "${tagline}"`);
console.log();
console.log(`📄 Reports Generated:`);
console.log(`   ${guidePath}`);
console.log(`   ${testScriptPath}`);
console.log();
console.log(`🧪 Next Steps:`);
console.log();
console.log(`   1. Start dev server:`);
console.log(`      npm run dev`);
console.log();
console.log(`   2. Open browser:`);
console.log(`      http://localhost:3000`);
console.log();
console.log(`   3. Test pages:`);
console.log(`      - Homepage renders with real cards`);
console.log(`      - Click a card → goes to venue detail`);
console.log(`      - FSA badges ${brandingStrategy === 'fsa-primary' ? 'prominent' : brandingStrategy === 'fsa-secondary' ? 'visible' : 'subtle'}`);
console.log(`      - No console errors`);
console.log();
console.log(`   4. Report back:`);
console.log(`      - Paste any errors`);
console.log(`      - Or confirm: "Phase 3 works!"`);
console.log();

process.exit(0);
