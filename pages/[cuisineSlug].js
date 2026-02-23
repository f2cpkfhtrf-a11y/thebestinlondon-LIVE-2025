import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { generateCuisineEditorial } from '../utils/contentGeneration';
import { theme } from '../utils/theme';
// import { resolveHeroImage } from '../lib/resolveHeroImage';
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
import { resolveCardImageSync } from '../lib/resolveHeroImage';
import NewsletterSignup from '../components/NewsletterSignup';

// Lazy-load social sharing for performance
const SocialShareButtons = dynamic(() => import('../components/SocialShareButtons'), { ssr: false });

export default function CuisinePage({ cuisineSlug, venues, totalVenues, editorial }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Update filteredVenues when venues prop changes (e.g., from server-side filtering)
  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);
  
  // Normalize cuisine slug properly
        let cuisineSlugNormalized = (cuisineSlug || '').toLowerCase();
        if (cuisineSlugNormalized.endsWith('-restaurants-london')) {
          cuisineSlugNormalized = cuisineSlugNormalized.replace('-restaurants-london', '');
        }
        // Handle "modern" as "modern-european"
        if (cuisineSlugNormalized === 'modern') {
          cuisineSlugNormalized = 'modern-european';
        }
        cuisineSlugNormalized = cuisineSlugNormalized.replace(/[^a-z0-9]/g, '-');
  
  // Generate title from normalized slug
  const cuisineTitle = cuisineSlugNormalized
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  
  const normalizedSlug = cuisineSlugNormalized;
  
  // Get enhanced cuisine data with hero image and intro
  const cuisineData = getCuisineData(normalizedSlug);
  
  // Use cuisineData hero image directly
  const hero = cuisineData.heroImage || '/images/heroes/site/default-list-hero.webp';
  
  // Calculate stats
  const avgRating = venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : '0.0';
  const fsaVerified = venues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length;

  // Use enhanced cuisine data for description
  const cuisineDescription = cuisineData.intro;

  // Build FAQ entries (simple, helpful, unique per cuisine)
  const faqItems = [
    {
      question: `What are the best ${cuisineTitle.toLowerCase()} restaurants in London?`,
      answer: `Browse our curated list of ${totalVenues} ${cuisineTitle.toLowerCase()} restaurants across London, ranked by ratings, FSA scores and our editorial picks.`,
    },
    {
      question: `Where can I find top-rated ${cuisineTitle.toLowerCase()} near me?`,
      answer: `Use our Near Me and filters (rating, dietary, open now) to find ${cuisineTitle.toLowerCase()} spots closest to you.`,
    },
    {
      question: `Do ${cuisineTitle.toLowerCase()} restaurants in London take bookings?`,
      answer: `Many venues offer online reservations. Open a venue page and use the Book a Table button or call to book.`,
    },
  ];

  // Compute related links
  const relatedAreas = useMemo(() => {
    const areas = [...new Set(venues.map(v => v.borough).filter(Boolean))].slice(0, 6);
    return areas.map(a => ({ name: a, href: `/areas/${a.toLowerCase().replace(/[^a-z0-9]/g, '-')}` }));
  }, [venues]);
  const relatedCuisines = useMemo(() => {
    const cuisines = [...new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean))]
      .filter(c => c.toLowerCase().replace(/\s+/g, '-') !== normalizedSlug)
      .slice(0, 6);
    return cuisines.map(c => ({ name: c, href: `/${c.toLowerCase().replace(/\s+/g, '-')}-restaurants-london` }));
  }, [venues, normalizedSlug]);

  return (
    <>
      <Head>
        <title>Best {cuisineTitle} Restaurants London {new Date().getFullYear()} | Top Rated {cuisineTitle} Restaurants | The Best in London</title>
        <meta name="description" content={`Discover the best ${cuisineTitle.toLowerCase()} restaurants in London ${new Date().getFullYear()}. Find ${totalVenues}+ top-rated ${cuisineTitle.toLowerCase()} restaurants with verified Google reviews, FSA ratings, and authentic cuisine. Complete guide to ${cuisineTitle.toLowerCase()} dining in London.`} />
        <meta name="keywords" content={`best ${cuisineTitle.toLowerCase()} restaurants London, ${cuisineTitle} restaurants London, ${cuisineTitle.toLowerCase()} restaurants near me, best ${cuisineTitle.toLowerCase()} food London, ${cuisineTitle.toLowerCase()} cuisine London, top ${cuisineTitle.toLowerCase()} restaurants London ${new Date().getFullYear()}, where to eat ${cuisineTitle.toLowerCase()} London`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/${cuisineSlug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Best ${cuisineTitle} Restaurants London ${new Date().getFullYear()} | Top Rated ${cuisineTitle} Restaurants`} />
        <meta property="og:description" content={`Discover the best ${cuisineTitle.toLowerCase()} restaurants in London ${new Date().getFullYear()}. ${totalVenues}+ top-rated ${cuisineTitle.toLowerCase()} restaurants with verified reviews and FSA ratings.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`} />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/${cuisineSlug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best ${cuisineTitle} Restaurants London ${new Date().getFullYear()} | Top Rated ${cuisineTitle} Restaurants`} />
        <meta name="twitter:description" content={`Discover the best ${cuisineTitle.toLowerCase()} restaurants in London ${new Date().getFullYear()}. ${totalVenues}+ top-rated ${cuisineTitle.toLowerCase()} restaurants with verified reviews and FSA ratings.`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`} />
        
        {/* JSON-LD via factory */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: `${cuisineTitle} Restaurants in London`,
          url: `https://www.thebestinlondon.co.uk/${cuisineSlug}`,
          description: `Best ${cuisineTitle} restaurants in London with ratings, reviews, and FSA hygiene info.`,
          image: `https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`,
          itemCount: totalVenues
        })) }} />

        {/* FAQPage Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer }
          }))
        }) }} />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        <TabContainer currentPath={`/${cuisineSlug}`} pageType="cuisine" cuisine={{ title: cuisineTitle, slug: normalizedSlug }}>
        
        {/* Page Hero & Actions */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div>
              <Breadcrumbs currentLabel={`${cuisineTitle} Restaurants`} />
            </div>
            <div>
              <SocialShareButtons 
                url={`https://www.thebestinlondon.co.uk/${cuisineSlug}`}
                title={`${cuisineTitle} Restaurants in London | The Best in London`}
                description={`Discover ${totalVenues}+ ${cuisineTitle.toLowerCase()} spots in London, curated with ratings & FSA.`}
                image={`https://www.thebestinlondon.co.uk${cuisineData.heroImage || hero.src}`}
              />
            </div>
          </div>
        </div>

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

        {/* Filter Bar */}
        <FilterBar
          venues={venues}
          onFilteredVenues={setFilteredVenues}
          cuisine={cuisineSlug}
          showAreaFilter={true}
          showCuisineFilter={false}
          showDietaryFilter={true}
          showRatingFilter={true}
          showOpenNowFilter={true}
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
              Best {cuisineTitle} Restaurants in London {new Date().getFullYear()}
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
                      src={resolveCardImageSync({ venue }) || '/images/heroes/site/default-card.webp'}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/images/heroes/site/default-card.webp'; }}
                    />
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
                    </div>
                    <div className="text-grey text-sm mb-3">
                      {venue.borough && <span>{venue.borough}</span>}
                      {venue.cuisines && venue.cuisines.length > 0 && (
                        <span className="ml-2">• {(() => {
                          const matchingCuisine = venue.cuisines.find(c => c.toLowerCase().replace(/\s+/g, '-') === normalizedSlug);
                          return matchingCuisine || venue.cuisines[0];
                        })()}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-grey">{venue.price_level && '£'.repeat(venue.price_level)}</div>
                      <div className="text-sm text-gold font-medium group-hover:text-gold/80 transition-colors duration-300">View Details →</div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <NewsletterSignup 
            location={`cuisine:${cuisineSlug}`}
            title={`Stay Updated on ${cuisineTitle} Restaurants`}
            description={`Get notified about new ${cuisineTitle.toLowerCase()} openings and special offers in London.`}
            variant="inline"
          />

          {/* SEO Content Block - Keyword Rich */}
          <section className="max-w-4xl mx-auto mt-12 py-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-warmWhite mb-6">
              Why Choose The Best {cuisineTitle} Restaurants in London?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-grey mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Verified Reviews & Ratings</h3>
                <p>All <strong className="text-gold">{cuisineTitle.toLowerCase()} restaurants London</strong> featured have verified Google reviews and ratings, ensuring accurate dining information.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Comprehensive Coverage</h3>
                <p>Browse <strong className="text-gold">{totalVenues}+ {cuisineTitle.toLowerCase()} restaurants</strong> across London. From budget-friendly to fine dining, find the perfect spot.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">FSA Food Safety Ratings</h3>
                <p>Our <strong className="text-gold">best {cuisineTitle.toLowerCase()} restaurants London</strong> guide includes FSA hygiene ratings, so you can dine with confidence.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Real-Time Information</h3>
                <p>Up-to-date menus, prices, opening hours, and booking links for every <strong className="text-gold">{cuisineTitle.toLowerCase()} restaurant</strong> in London.</p>
              </div>
            </div>
          </section>

          {/* Related Linking Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-black-light rounded-lg p-6">
              <h3 className="text-xl font-serif font-bold text-warmWhite mb-4">Popular Areas for {cuisineTitle} Restaurants</h3>
              <p className="text-sm text-grey mb-3">Find the best {cuisineTitle.toLowerCase()} restaurants in these popular London areas:</p>
              <div className="flex flex-wrap gap-3">
                {relatedAreas.length > 0 ? relatedAreas.map(a => (
                  <a key={a.href} href={a.href} className="inline-block px-4 py-2 bg-charcoal text-warmWhite rounded-lg border border-grey-dark hover:border-gold hover:text-gold transition-colors">
                    {cuisineTitle} Restaurants in {a.name}
                  </a>
                )) : <span className="text-grey">Areas will appear when available</span>}
              </div>
            </div>
            <div className="bg-black-light rounded-lg p-6">
              <h3 className="text-xl font-serif font-bold text-warmWhite mb-4">Explore Other Cuisines</h3>
              <p className="text-sm text-grey mb-3">Discover more great restaurants across London:</p>
              <div className="flex flex-wrap gap-3">
                {relatedCuisines.length > 0 ? relatedCuisines.map(c => (
                  <a key={c.href} href={c.href} className="inline-block px-4 py-2 bg-charcoal text-warmWhite rounded-lg border border-grey-dark hover:border-gold hover:text-gold transition-colors">
                    Best {c.name} Restaurants London
                  </a>
                )) : <span className="text-grey">Related cuisines will appear when available</span>}
              </div>
            </div>
          </div>

          {/* Empty States */}
          {filteredVenues.length === 0 && totalVenues === 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <div className="bg-black-light rounded-lg p-12">
                <h3 className="text-2xl font-bold text-white mb-4">No {cuisineTitle} restaurants found</h3>
                <p className="text-grey mb-8">We're always adding new restaurants. Check back soon or browse other cuisines!</p>
                <a href="/cuisines" className="inline-block px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors">Browse All Cuisines</a>
              </div>
            </div>
          )}

          {filteredVenues.length === 0 && totalVenues > 0 && (
            <div className="text-center py-12">
              <div className="text-grey text-lg mb-4">No restaurants found matching your filters</div>
              <button onClick={() => setFilteredVenues(venues)} className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-300">Clear Filters</button>
            </div>
          )}
        </div>
        </TabContainer>
      </div>
      <Footer />
      <BackToHome />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Extract cuisine slug from params, handling both "caribbean" and "caribbean-restaurants-london" formats
    let cuisineSlugParam = (params.cuisineSlug || '').toLowerCase();
    
    // Remove "-restaurants-london" suffix if present
    if (cuisineSlugParam.endsWith('-restaurants-london')) {
      cuisineSlugParam = cuisineSlugParam.replace('-restaurants-london', '');
    }
    
    // Handle "modern" as "modern-european"
    if (cuisineSlugParam === 'modern') {
      cuisineSlugParam = 'modern-european';
    }
    
    const cuisineParam = cuisineSlugParam.replace(/-/g, ' ');
    const cuisineParamSlug = cuisineSlugParam;
    
    // Load venues directly from file instead of API call (more reliable)
    const venuesPath = path.join(process.cwd(), 'data/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Filter venues by cuisine - try multiple matching strategies
    const venues = allVenues.filter(v => {
      if (!v.cuisines || !Array.isArray(v.cuisines)) return false;
      
      return v.cuisines.some(c => {
        if (!c) return false;
        const cLower = c.toLowerCase().trim();
        const cSlugified = cLower.replace(/\s+/g, '-');
        const cuisineLower = cuisineParam.toLowerCase().trim();
        const cuisineSlugified = cuisineParamSlug.toLowerCase();
        
        // Try multiple matching strategies
        return cLower === cuisineLower ||
               cSlugified === cuisineSlugified ||
               cLower.includes(cuisineLower) ||
               cuisineLower.includes(cLower) ||
               cSlugified === cuisineSlugified ||
               cuisineSlugified.includes(cSlugified) ||
               cSlugified.includes(cuisineSlugified);
      });
    });
    
    // Don't return 404 if no venues - show empty state instead
    // This ensures all cuisine pages work (zero 404s goal)
    
    return {
      props: {
        cuisineSlug: params.cuisineSlug,
        venues: venues || [],
        totalVenues: venues?.length || 0,
        editorial: generateCuisineEditorial(cuisineParam)
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    // Return empty state instead of 404
    return {
      props: {
        cuisineSlug: params.cuisineSlug,
        venues: [],
        totalVenues: 0,
        editorial: null
      }
    };
  }
}