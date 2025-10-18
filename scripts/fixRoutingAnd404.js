const fs = require('fs');
const path = require('path');

// Routing and 404 fixes
function fixRoutingAnd404() {
  console.log('🔧 FIXING ROUTING & 404 ISSUES...\n');
  
  const fixes = {
    timestamp: new Date().toISOString(),
    slugFixes: [],
    redirectFixes: [],
    missingFields: [],
    totalFixes: 0
  };
  
  // 1. Load venue data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  console.log(`🏢 Processing ${venuesData.venues.length} venues for routing fixes...`);
  
  // 2. Fix slug issues
  const slugCounts = {};
  const updatedVenues = venuesData.venues.map((venue, index) => {
    let updatedVenue = { ...venue };
    
    // Fix missing or invalid slugs
    if (!venue.slug || venue.slug.length < 3) {
      const newSlug = generateSlug(venue.name, venue.address?.formatted || '');
      updatedVenue.slug = newSlug;
      fixes.slugFixes.push({
        venue: venue.name,
        oldSlug: venue.slug,
        newSlug: newSlug,
        reason: 'Missing or invalid slug'
      });
    }
    
    // Fix duplicate slugs
    if (slugCounts[updatedVenue.slug]) {
      slugCounts[updatedVenue.slug]++;
      const newSlug = `${updatedVenue.slug}-${slugCounts[updatedVenue.slug]}`;
      updatedVenue.slug = newSlug;
      fixes.slugFixes.push({
        venue: venue.name,
        oldSlug: venue.slug,
        newSlug: newSlug,
        reason: 'Duplicate slug'
      });
    } else {
      slugCounts[updatedVenue.slug] = 1;
    }
    
    // Fix missing required fields
    if (!updatedVenue.cuisines || updatedVenue.cuisines.length === 0) {
      updatedVenue.cuisines = ['british']; // Default cuisine
      fixes.missingFields.push({
        venue: venue.name,
        field: 'cuisines',
        value: 'british'
      });
    }
    
    if (!updatedVenue.address || !updatedVenue.address.formatted) {
      updatedVenue.address = {
        formatted: venue.vicinity || 'London, UK',
        components: {
          locality: 'London',
          country: 'United Kingdom'
        }
      };
      fixes.missingFields.push({
        venue: venue.name,
        field: 'address',
        value: venue.vicinity || 'London, UK'
      });
    }
    
    return updatedVenue;
  });
  
  // 3. Create redirects for legacy routes
  const redirects = [
    { from: '/halal-near-stations-simple', to: '/best-halal-restaurants-london' },
    { from: '/areas/index', to: '/areas' },
    { from: '/restaurants/index', to: '/restaurants' }
  ];
  
  fixes.redirectFixes = redirects;
  
  // 4. Save updated venue data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  // 5. Create next.config.js redirects
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  let nextConfig = '';
  
  if (fs.existsSync(nextConfigPath)) {
    nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  }
  
  // Add redirects to next.config.js
  if (!nextConfig.includes('redirects')) {
    const redirectConfig = `
module.exports = {
  async redirects() {
    return [
      ${redirects.map(r => `{ source: '${r.from}', destination: '${r.to}', permanent: true }`).join(',\n      ')}
    ];
  },
};
`;
    
    if (nextConfig.trim()) {
      nextConfig = nextConfig.replace('module.exports = {', `module.exports = {${redirectConfig}`);
    } else {
      nextConfig = redirectConfig;
    }
    
    fs.writeFileSync(nextConfigPath, nextConfig);
  }
  
  // 6. Create comprehensive 404 page
  const custom404Path = path.join(__dirname, '../pages/404.js');
  const custom404Content = `import Link from 'next/link';
import { TabContainer } from '../components/HeroTabs';

export default function Custom404() {
  return (
    <TabContainer>
      <div className="min-h-screen bg-gradient-to-br from-grey-dark to-grey-darker flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-grey-light mb-8">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/" className="block w-full bg-gold text-grey-dark font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors">
              🏠 Return Home
            </Link>
            
            <Link href="/restaurants" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              🍽️ Browse Restaurants
            </Link>
            
            <Link href="/cuisines" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              🍜 Explore Cuisines
            </Link>
            
            <Link href="/areas" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              📍 Find by Area
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-grey">
            <p>Need help? <Link href="/contact" className="text-gold hover:underline">Contact us</Link></p>
          </div>
        </div>
      </div>
    </TabContainer>
  );
}
`;
  
  fs.writeFileSync(custom404Path, custom404Content);
  
  // 7. Generate summary
  fixes.totalFixes = fixes.slugFixes.length + fixes.redirectFixes.length + fixes.missingFields.length;
  
  console.log('\n📊 ROUTING FIXES SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Slug Fixes: ${fixes.slugFixes.length}`);
  console.log(`Redirect Fixes: ${fixes.redirectFixes.length}`);
  console.log(`Missing Field Fixes: ${fixes.missingFields.length}`);
  console.log(`Total Fixes Applied: ${fixes.totalFixes}`);
  
  console.log('\n🔗 SLUG FIXES:');
  fixes.slugFixes.slice(0, 10).forEach((fix, index) => {
    console.log(`${index + 1}. ${fix.venue}: ${fix.oldSlug} → ${fix.newSlug} (${fix.reason})`);
  });
  
  if (fixes.slugFixes.length > 10) {
    console.log(`... and ${fixes.slugFixes.length - 10} more slug fixes`);
  }
  
  console.log('\n🔄 REDIRECTS CREATED:');
  fixes.redirectFixes.forEach((redirect, index) => {
    console.log(`${index + 1}. ${redirect.from} → ${redirect.to}`);
  });
  
  console.log('\n📝 MISSING FIELD FIXES:');
  fixes.missingFields.slice(0, 10).forEach((fix, index) => {
    console.log(`${index + 1}. ${fix.venue}: Added ${fix.field} = "${fix.value}"`);
  });
  
  if (fixes.missingFields.length > 10) {
    console.log(`... and ${fixes.missingFields.length - 10} more field fixes`);
  }
  
  // 8. Save report
  const reportPath = path.join(__dirname, '../reports/links.md');
  const reportContent = `# Routing & 404 Fixes Report

## Summary
- **Fix Date**: ${fixes.timestamp}
- **Slug Fixes**: ${fixes.slugFixes.length}
- **Redirect Fixes**: ${fixes.redirectFixes.length}
- **Missing Field Fixes**: ${fixes.missingFields.length}
- **Total Fixes**: ${fixes.totalFixes}

## Slug Fixes
${fixes.slugFixes.map((fix, index) => `
${index + 1}. **${fix.venue}**
   - Old Slug: ${fix.oldSlug}
   - New Slug: ${fix.newSlug}
   - Reason: ${fix.reason}
`).join('')}

## Redirects
${fixes.redirectFixes.map((redirect, index) => `
${index + 1}. **${redirect.from}** → **${redirect.to}**
`).join('')}

## Missing Field Fixes
${fixes.missingFields.map((fix, index) => `
${index + 1}. **${fix.venue}**
   - Field: ${fix.field}
   - Value: ${fix.value}
`).join('')}

## Files Updated
- \`public/venues.json\` - Updated venue data with fixed slugs and fields
- \`next.config.js\` - Added redirects for legacy routes
- \`pages/404.js\` - Created comprehensive 404 page with navigation

## Next Steps
1. Test all internal links
2. Verify redirects work correctly
3. Check 404 page functionality
4. Run comprehensive link integrity test
`;
  
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n💾 Report saved to: ${reportPath}`);
  console.log(`✅ Routing fixes complete!`);
  
  return fixes;
}

function generateSlug(name, address) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
    .substring(0, 50);
}

// Run the fixes
fixRoutingAnd404();
