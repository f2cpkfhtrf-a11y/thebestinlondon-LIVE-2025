#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Focus areas and cuisines for high-intent pages
const FOCUS_AREAS = [
  'Central London', 'Westminster', 'Camden', 'Islington', 'Greenwich', 
  'Hackney', 'Tower Hamlets', 'Southwark', 'Lambeth', 'Wandsworth',
  'Kensington & Chelsea', 'Hammersmith & Fulham', 'Ealing', 'Brent',
  'Haringey'
];

const FOCUS_CUISINES = [
  'Indian', 'Pakistani', 'Afghan', 'Turkish', 'Italian', 'Japanese', 
  'Chinese', 'Korean', 'Lebanese', 'Mediterranean', 'Modern European', 
  'Seafood', 'Burgers', 'Vegan'
];

// Generate collection page content
function generateCollectionPage(area, cuisine, venues) {
  const areaSlug = area.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const cuisineSlug = cuisine.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const pageSlug = `best-${cuisineSlug}-in-${areaSlug}-2025`;
  
  // Filter venues for this area and cuisine
  const filteredVenues = venues.filter(venue => {
    const venueArea = venue.area || venue.borough;
    const venueCuisines = venue.cuisines || [];
    
    // More flexible area matching
    const areaMatch = venueArea && (
      venueArea.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(venueArea.toLowerCase()) ||
      // Handle specific cases
      (area === 'Central London' && venueArea.toLowerCase().includes('central')) ||
      (area === 'Westminster' && venueArea.toLowerCase().includes('westminster')) ||
      (area === 'Kensington & Chelsea' && (venueArea.toLowerCase().includes('kensington') || venueArea.toLowerCase().includes('chelsea')))
    );
    
    return areaMatch && venueCuisines.some(c => c.toLowerCase() === cuisine.toLowerCase());
  });

  // Sort by rating and take top 10
  const topVenues = filteredVenues
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  if (topVenues.length === 0) {
    console.log(`Skipping ${pageSlug} - no venues found`);
    return null;
  }

  // Generate intro text
  const introText = `Discover the finest ${cuisine.toLowerCase()} restaurants in ${area} for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of ${cuisine.toLowerCase()} cuisine in ${area}.`;

  // Generate venue cards HTML
  const venueCards = topVenues.map((venue, index) => {
    const rating = venue.rating ? venue.rating.toFixed(1) : 'N/A';
    const reviewCount = venue.user_ratings_total ? venue.user_ratings_total.toLocaleString() : '0';
    const priceLevel = venue.price_level ? '£'.repeat(venue.price_level) : '££';
    
    // Generate blurb
    const blurb = `${venue.name} offers exceptional ${cuisine.toLowerCase()} cuisine in ${area}. With a ${rating}-star rating from ${reviewCount} reviews${venue.fsa_rating ? ` and a ${venue.fsa_rating}/5 FSA hygiene rating` : ''}, this restaurant delivers quality and authenticity.`;

    return `
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/${venue.slug}" className="hover:text-yellow-600 transition-colors">
                ${venue.name}
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ ${rating}</span>
              <span>📝 ${reviewCount} reviews</span>
              <span>💰 ${priceLevel}</span>
              ${venue.fsa_rating ? `<span className="text-green-400">🏥 FSA ${venue.fsa_rating}/5</span>` : ''}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          ${blurb}
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/${venue.slug}" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          ${venue.google_place_url ? `
            <a href="${venue.google_place_url}" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('\n');

  // Generate internal links
  const internalLinks = `
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/restaurants-${areaSlug}" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          More ${area} Restaurants
        </a>
        <a href="/${cuisineSlug}-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All ${cuisine} Restaurants
        </a>
        <a href="/areas" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Areas
        </a>
        <a href="/cuisines" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Cuisines
        </a>
      </div>
    </div>
  `;

  // Generate the complete page
  const pageContent = `import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { asCollectionPage } from '../../lib/factory/pageFactory';

export default function Best${cuisine.replace(/[^a-zA-Z0-9]/g, '')}In${area.replace(/[^a-zA-Z0-9]/g, '')}2025() {
  const venues = ${JSON.stringify(topVenues, null, 2)};

  return (
    <>
      <Head>
        <title>Best ${cuisine} Restaurants in ${area} (2025) | The Best in London</title>
        <meta name="description" content="${introText}" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/${pageSlug}" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best ${cuisine} Restaurants in ${area} (2025)" />
        <meta property="og:description" content="${introText}" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/${pageSlug}" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best ${cuisine} Restaurants in ${area} (2025)" />
        <meta name="twitter:description" content="${introText}" />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best ${cuisine} Restaurants in ${area} (2025)',
          url: 'https://www.thebestinlondon.co.uk/${pageSlug}',
          itemCount: venues.length,
          items: venues.map(venue => ({ name: venue.name, slug: venue.slug }))
        })) }} />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/cuisines" className="hover:text-white transition-colors">Cuisines</Link>
              <span>›</span>
              <Link href="/${cuisineSlug}-restaurants-london" className="hover:text-white transition-colors">${cuisine}</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-${areaSlug}" className="hover:text-white transition-colors">${area}</Link>
              <span>›</span>
              <span className="text-white">Best ${cuisine} in ${area} (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best ${cuisine} Restaurants in ${area} (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              ${introText}
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            ${venueCards}
          </div>

          {/* Internal Links */}
          ${internalLinks}

          {/* More to Explore */}
          ${topVenues.length < 10 ? `
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">More to Explore</h3>
              <p className="text-gray-300 mb-4">
                Discover more ${cuisine.toLowerCase()} restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/${cuisineSlug}-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All ${cuisine} Restaurants
                </a>
                <a href="/restaurants-${areaSlug}" className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors">
                  All ${area} Restaurants
                </a>
              </div>
            </div>
          ` : ''}
        </main>
        
        <Footer />
      </div>
    </>
  );
}`;

  return {
    slug: pageSlug,
    content: pageContent,
    venueCount: topVenues.length
  };
}

// Main execution
async function generateCollectionPages() {
  console.log('🚀 Generating high-intent collection pages...');
  
  // Load venues data
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues;

  const generatedPages = [];
  let pageCount = 0;

  // Generate pages for each area-cuisine combination
  for (const area of FOCUS_AREAS) {
    for (const cuisine of FOCUS_CUISINES) {
      if (pageCount >= 30) break;
      
      const page = generateCollectionPage(area, cuisine, venues);
      if (page) {
        const filePath = path.join(process.cwd(), 'pages', `${page.slug}.js`);
        fs.writeFileSync(filePath, page.content);
        generatedPages.push(page);
        pageCount++;
        console.log(`✅ Generated: ${page.slug} (${page.venueCount} venues)`);
      }
    }
    if (pageCount >= 30) break;
  }

  console.log(`\\n🎉 Generated ${generatedPages.length} collection pages`);
  
  // Generate summary report
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: generatedPages.length,
    pages: generatedPages.map(p => ({
      slug: p.slug,
      venueCount: p.venueCount
    })),
    areas: FOCUS_AREAS,
    cuisines: FOCUS_CUISINES
  };

  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(reportsDir, 'collection_pages_generated.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('📄 Report saved to: reports/collection_pages_generated.json');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateCollectionPages().catch(console.error);
}
