import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { generateCuisineEditorial } from '../utils/contentGeneration';
import { theme } from '../utils/theme';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import { getCuisineData } from '../lib/cuisineData';
import { TabContainer } from '../components/HeroTabs';
import PageHero from '../components/PageHero';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToHome from '../components/BackToHome';
import Breadcrumbs from '../components/Breadcrumbs';
import { asCollectionPage } from '../lib/factory/pageFactory';
import fs from 'fs';
import path from 'path';

export default function CuisinePage({ cuisineSlug, venues, totalVenues, editorial }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cuisineTitle = cuisineSlug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const normalizedSlug = cuisineSlug.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Get enhanced cuisine data with hero image and intro
  const cuisineData = getCuisineData(normalizedSlug);
  
  // Get hero image for cuisine page (fallback to existing resolver)
  const hero = resolveHeroImage({ type: "list-cuisine", cuisineSlug: normalizedSlug });
  
  // Calculate stats
  const avgRating = venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : '0.0';
  const fsaVerified = venues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length;

  // Use enhanced cuisine data for description
  const cuisineDescription = cuisineData.intro;

  return (
    <>
      <Head>
        <title>{cuisineTitle} Restaurants in London | The Best in London</title>
        <meta name="description" content={`Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily with real reviews and FSA ratings.`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${cuisineTitle} Restaurants in London | The Best in London`} />
        <meta property="og:description" content={`Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily with real reviews and FSA ratings.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`} />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${cuisineTitle} Restaurants in London | The Best in London`} />
        <meta name="twitter:description" content={`Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily with real reviews and FSA ratings.`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`} />
        
        {/* JSON-LD via factory */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: `${cuisineTitle} Restaurants in London`,
          url: `https://www.thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`,
          itemCount: venues?.length || 0,
          items: venues?.map(venue => ({ name: venue.name, slug: venue.slug }))
        })) }} />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black text-warmWhite">
        <TabContainer currentPath={`/${cuisineSlug}`} pageType="list-cuisine">
          {/* Breadcrumbs */}
          <div className="pt-20 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumbs />
            </div>
          </div>
          
          {/* Enhanced Cuisine Hero Section */}
          <section className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
            <Image
              src={cuisineData.heroImage || hero.src}
              alt={cuisineData.heroAlt || `${cuisineTitle} cuisine in London`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-lg mb-4">
                {cuisineTitle} Restaurants in London
              </h1>
              <div className="flex flex-wrap gap-4 text-white">
                <span className="bg-gold/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {totalVenues} Restaurants
                </span>
                <span className="bg-gold/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Avg Rating: {avgRating}
                </span>
                <span className="bg-gold/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {fsaVerified} FSA Verified
                </span>
              </div>
            </div>
          </section>

          {/* Cuisine Introduction */}
          {cuisineDescription && (
            <section className="py-12 bg-charcoal-light">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-lg md:text-xl leading-relaxed text-warmWhite max-w-3xl mx-auto">
                    {cuisineDescription}
                  </p>
                </div>
              </div>
            </section>
          )}

      {/* Editorial Content */}
      {editorial && (
        <section className="py-12 bg-black-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-warmWhite mb-4">
                {editorial.title}
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-grey leading-relaxed text-center">
                {editorial.content}
              </p>
            </div>
          </div>
        </section>
      )}

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
            {filteredVenues.map((venue, index) => {
              // DEBUG: Log venue data to see what's actually being passed
              if (index === 0) {
                console.log('First venue data:', venue.name, venue.user_ratings_total, venue.rating);
              }
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
                      <span className="text-grey text-sm">({venue.user_ratings_total || 0} reviews)</span>
                      {/* DEBUG: {console.log('Venue data:', venue.name, venue.user_ratings_total)} */}
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
              );
            })}
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
        </TabContainer>
      </main>
      <Footer />
      <BackToHome />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
    
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
      params: { cuisineSlug: cuisine.replace(/\s+/g, '-') }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
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

    const cuisineParam = params.cuisineSlug.replace(/-/g, ' ').toLowerCase();

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
        totalVenues: venues.length,
        editorial: generateCuisineEditorial(cuisineParam)
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}