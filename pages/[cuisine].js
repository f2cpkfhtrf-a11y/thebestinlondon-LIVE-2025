import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';
import FilterBar from '../components/FilterBar';
import CuisineHero from '../components/CuisineHero';
import fs from 'fs';
import path from 'path';

export default function CuisinePage({ cuisine, venues, totalVenues }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cuisineTitle = cuisine.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Calculate stats
  const avgRating = venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : '0.0';
  const fsaVerified = venues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length;

  // Generate cuisine-specific description
  const getCuisineDescription = (cuisine) => {
    const descriptions = {
      'indian': 'From aromatic curries to tandoori specialties, London\'s Indian dining scene offers authentic flavors and modern interpretations that celebrate centuries of culinary tradition.',
      'italian': 'Experience the soul of Italy in London with handmade pasta, wood-fired pizzas, and regional specialties that transport you to the heart of Italian cuisine.',
      'japanese': 'Discover the precision and artistry of Japanese cuisine, from fresh sushi and sashimi to comforting ramen and delicate kaiseki experiences.',
      'chinese': 'Explore the diverse regions of Chinese cuisine, from Cantonese dim sum to Sichuan spice, showcasing the incredible depth of China\'s culinary heritage.',
      'thai': 'Savor the perfect balance of sweet, sour, salty, and spicy in London\'s Thai restaurants, where traditional recipes meet contemporary presentation.',
      'turkish': 'Indulge in the rich flavors of Turkish cuisine, from succulent kebabs to fresh meze, representing the crossroads of Middle Eastern and Mediterranean traditions.',
      'french': 'Experience the elegance of French cuisine in London, from classic bistro fare to haute cuisine, celebrating the artistry of French culinary tradition.',
      'spanish': 'Discover the vibrant flavors of Spain, from authentic tapas to paella, showcasing the regional diversity and passion of Spanish cooking.',
      'korean': 'Explore Korean cuisine\'s bold flavors and fermented traditions, from sizzling BBQ to comforting stews and the art of Korean table culture.',
      'vietnamese': 'Savor the fresh, aromatic flavors of Vietnamese cuisine, from pho to banh mi, celebrating the balance of herbs, spices, and textures.',
      'mexican': 'Experience authentic Mexican flavors beyond tacos, from mole to ceviche, showcasing the rich culinary traditions of Mexico\'s diverse regions.',
      'american': 'Discover American comfort food and modern interpretations, from classic burgers to innovative fusion, celebrating the melting pot of American cuisine.',
      'caribbean': 'Taste the vibrant flavors of the Caribbean, from jerk spices to coconut curries, representing the fusion of African, Indian, and indigenous traditions.',
      'african': 'Explore the diverse flavors of African cuisine, from Ethiopian injera to West African stews, celebrating the continent\'s rich culinary heritage.',
      'mediterranean': 'Savor the healthy, sun-kissed flavors of Mediterranean cuisine, from fresh seafood to olive oil-drenched vegetables and herbs.',
      'seafood': 'Dive into London\'s finest seafood offerings, from fresh oysters to sustainable catches, celebrating the ocean\'s bounty with expert preparation.',
      'vegetarian': 'Discover innovative vegetarian cuisine that celebrates plant-based ingredients with creativity and flavor, proving vegetables can be the star.',
      'vegan': 'Explore the growing world of vegan cuisine, from comfort food classics to innovative plant-based creations that satisfy every craving.',
      'modern european': 'Experience contemporary European cuisine that blends traditional techniques with modern innovation, creating sophisticated and memorable dining experiences.',
      'british': 'Discover modern British cuisine that celebrates local ingredients and traditional recipes while embracing contemporary techniques and global influences.'
    };
    
    return descriptions[cuisine.toLowerCase()] || `Explore London's finest ${cuisineTitle.toLowerCase()} restaurants, carefully curated for exceptional quality and authentic flavors.`;
  };

  return (
    <>
      <Head>
        <title>{cuisineTitle} Restaurants in London | The Best in London</title>
        <meta name="description" content={`Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily with real reviews and FSA ratings.`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${cuisineTitle} Restaurants in London`,
          "description": `Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London with real reviews and FSA ratings`,
          "url": `https://thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`
        }) }} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <CuisineHero
        title={`${cuisineTitle} Restaurants`}
        subtitle="London's Finest Selection"
        description={getCuisineDescription(cuisine)}
        venueCount={totalVenues}
        cuisine={cuisine}
      />

      {/* Filter Bar */}
      <FilterBar
        venues={venues}
        onFilteredVenues={setFilteredVenues}
        cuisine={cuisine}
        showAreaFilter={true}
        showCuisineFilter={false}
        showDietaryFilter={true}
        showRatingFilter={true}
      />

      {/* Main Content */}
      <main style={{ backgroundColor: theme.colors.bg.primary, minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-black-light rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gold mb-2">{totalVenues}</div>
              <div className="text-sm text-grey">Restaurants</div>
            </div>
            <div className="bg-black-light rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gold mb-2">{avgRating}</div>
              <div className="text-sm text-grey">Avg Rating</div>
            </div>
            <div className="bg-black-light rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gold mb-2">{fsaVerified}</div>
              <div className="text-sm text-grey">FSA Verified</div>
            </div>
            <div className="bg-black-light rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gold mb-2">100%</div>
              <div className="text-sm text-grey">Verified</div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-warmWhite">
              {filteredVenues.length} {cuisineTitle} Restaurants
            </h2>
            <div className="text-sm text-grey">
              Showing {filteredVenues.length} of {totalVenues} restaurants
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <Link key={venue.id || index} href={`/restaurant/${venue.slug}`}>
                <article
                  className="group bg-black-light rounded-xl overflow-hidden hover:bg-black-light/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onMouseEnter={() => setHoveredCard(venue.id || index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={venue.photos?.[0]?.url || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85'}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay Badges */}
                    <div className="absolute top-3 right-3">
                      <BestOfLondonBadge venue={venue} size="small" showTooltip={false} showExplanation={false} />
                    </div>
                    <div className="absolute top-3 left-3">
                      <FSABadge rating={venue.fsa_rating || 5} size="small" showLabel={false} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-warmWhite mb-2 group-hover:text-gold transition-colors duration-300">
                      {venue.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-gold text-lg">★</span>
                      <span className="text-warmWhite font-semibold">{venue.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-grey text-sm">({venue.review_count || 0} reviews)</span>
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
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-grey text-lg mb-4">No restaurants found matching your filters</div>
              <button
                onClick={() => setFilteredVenues(venues)}
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { paths: [], fallback: 'blocking' };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);

    if (!venues || venues.length === 0) {
      return { paths: [], fallback: 'blocking' };
    }

    const cuisines = new Set();
    venues.forEach(venue => {
      if (venue.cuisines && Array.isArray(venue.cuisines)) {
        venue.cuisines.forEach(cuisine => {
          if (cuisine) {
            cuisines.add(cuisine.toLowerCase().trim());
          }
        });
      }
    });

    const paths = Array.from(cuisines).map(cuisine => ({
      params: { cuisine: cuisine.replace(/\s+/g, '-') }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { notFound: true };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(data) ? data : (data.venues || []);

    if (!allVenues || allVenues.length === 0) {
      return { notFound: true };
    }

    const cuisineParam = params.cuisine.replace(/-/g, ' ').toLowerCase();

    const venues = allVenues.filter(venue => {
      if (!venue.cuisines || !Array.isArray(venue.cuisines)) return false;
      return venue.cuisines.some(c => c && c.toLowerCase().trim() === cuisineParam);
    });

    if (venues.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        cuisine: cuisineParam,
        venues,
        totalVenues: venues.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}