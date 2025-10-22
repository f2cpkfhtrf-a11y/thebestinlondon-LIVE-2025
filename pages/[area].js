import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../../utils/theme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { generateSEOTitle, generateSEODescription, generateStructuredData, generateBreadcrumbData } from '../../utils/seoOptimization';
import { resolveHeroImage } from '../../lib/resolveHeroImage';
import { getBlurAndColor } from '../../lib/imagePlaceholders';
import { isValidFsaScore, getFsaDisplayValue } from '../../lib/fsa';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  try {
    const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { paths: [], fallback: false };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);

    // Get unique areas
    const areaCounts = {};
    venues.forEach(venue => {
      if (venue.area || venue.borough) {
        const area = venue.area || venue.borough;
        const normalized = area.toLowerCase().replace(/\s+/g, '-');
        areaCounts[normalized] = (areaCounts[normalized] || 0) + 1;
      }
    });

    const paths = Object.keys(areaCounts).map(areaSlug => ({
      params: { area: areaSlug }
    }));

    return {
      paths,
      fallback: false
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { notFound: true };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(data) ? data : (data.venues || []);

    if (!allVenues || allVenues.length === 0) {
      return { notFound: true };
    }

    const areaParam = params.area.replace(/-/g, ' ').toLowerCase();

    const venues = allVenues.filter(venue => {
      const venueArea = (venue.area || venue.borough || '').toLowerCase();
      return venueArea.includes(areaParam) || areaParam.includes(venueArea);
    });

    if (venues.length === 0) {
      return { notFound: true };
    }

    // Calculate average rating
    const validRatings = venues.filter(v => v.rating && v.rating > 0);
    const avgRating = validRatings.length > 0 
      ? validRatings.reduce((sum, v) => sum + v.rating, 0) / validRatings.length 
      : 0;

    // Count FSA verified venues
    const fsaVerified = venues.filter(v => isValidFsaScore(v.fsa_rating)).length;

    return {
      props: {
        venues,
        area: params.area,
        totalVenues: venues.length,
        avgRating,
        fsaVerified,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}

export default function AreaPage({ area, venues, totalVenues, avgRating, fsaVerified }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const areaTitle = area.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const areaSlug = area.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const hero = resolveHeroImage({
    type: "list-area",
    areaSlug: areaSlug,
  });

  const seoTitle = generateSEOTitle({
    type: "area",
    area: areaTitle,
    totalVenues,
    avgRating
  });

  const seoDescription = generateSEODescription({
    type: "area",
    area: areaTitle,
    totalVenues,
    avgRating
  });

  const structuredData = generateStructuredData({
    type: "area",
    area: areaTitle,
    venues: filteredVenues,
    totalVenues,
    avgRating
  });

  const breadcrumbData = generateBreadcrumbData({
    type: "area",
    area: areaTitle
  });

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      </Head>

      <Header />
      
      <main style={{ backgroundColor: theme.colors.bg.primary, minHeight: '100vh' }}>
        {/* Page Hero */}
        <PageHero 
          title={`Best Restaurants in ${areaTitle}`}
          subtitle={`Discover ${totalVenues} exceptional restaurants in ${areaTitle}, carefully curated for quality and authenticity.`}
          stats={[
            { label: "Restaurants", value: totalVenues },
            { label: "Avg Rating", value: avgRating.toFixed(1) },
            { label: "FSA Verified", value: fsaVerified },
            { label: "Area", value: areaTitle }
          ]}
          image={hero}
        />

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-warmWhite">
              {filteredVenues.length} Restaurants in {areaTitle}
            </h2>
            <div className="text-sm text-grey">
              {filteredVenues.length === venues.length 
                ? 'All restaurants in this area' 
                : 'Filtered results'
              }
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => {
              return (
              <Link key={venue.id || index} href={`/restaurant/${venue.slug}`}>
                <article
                  className="group bg-black-light rounded-xl overflow-hidden hover:bg-black-light/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onMouseEnter={() => setHoveredCard(venue.id || index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={venue.image_card_path?.replace('/public', '') || '/images/heroes/site/default-card.webp'}
                      alt={`${venue.name} - ${venue.cuisines?.[0] || 'Restaurant'} in ${venue.borough || 'London'}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-serif font-bold text-warmWhite mb-2 group-hover:text-gold transition-colors duration-300">
                        {venue.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-gold text-lg">★</span>
                        <span className="text-warmWhite font-semibold">{venue.rating?.toFixed(1) || 'N/A'}</span>
                        <span className="text-grey text-sm">({venue.user_ratings_total || 0} reviews)</span>
                      </div>
                      <div className="text-grey text-sm mb-3">
                        {venue.borough && <span>{venue.borough}</span>}
                        {venue.cuisines && venue.cuisines.length > 0 && (
                          <span className="ml-2">• {venue.cuisines[0]}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-grey">
                          {venue.price_level && '£'.repeat(venue.price_level)}
                        </div>
                        <div className="text-sm text-gold font-medium group-hover:text-gold/80 transition-colors duration-300">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
            })}
          </div>

          {/* Empty State */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-grey text-lg mb-4">No restaurants found in {areaTitle}</div>
              <p className="text-grey text-sm mb-6">
                Try browsing other areas or check back later for new additions.
              </p>
              <Link
                href="/areas"
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-300"
              >
                Browse All Areas
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
