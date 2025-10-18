import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StandardizedCard from '../components/StandardizedCard';
import StandardizedHeader from '../components/StandardizedHeader';

export default function CuisineRestaurants({ venues = [], cuisine, cuisineImages }) {
  const [filterArea, setFilterArea] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const areas = ['all', ...new Set(venues.map(v => v.area || v.borough).filter(Boolean))].slice(0, 15);
  let filtered = filterArea === 'all' ? venues : venues.filter(v => (v.area || v.borough) === filterArea);
  
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const cuisineTitle = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  const headerImage = cuisineImages[cuisine] || cuisineImages['british'];

  return (
    <>
      <Head>
        <title>Best {cuisineTitle} Restaurants in London 2025 | The Best in London</title>
        <meta name="description" content={`Discover ${venues.length} top-rated ${cuisineTitle} restaurants in London. From fine dining to authentic local favorites.`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/${cuisine}-restaurants-london`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${cuisineTitle} Restaurants in London`,
          "description": `Discover ${venues.length} top-rated ${cuisineTitle} restaurants in London`,
          "url": `https://thebestinlondon.co.uk/${cuisine}-restaurants-london`
        }) }} />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Standardized Header */}
        <StandardizedHeader 
          title={`Best ${cuisineTitle} Restaurants in London`}
          subtitle={`Discover ${venues.length} top-rated ${cuisineTitle} restaurants in London. From fine dining to authentic local favorites.`}
          backgroundImage={headerImage}
        />

        {/* Filter Controls */}
        <div className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Area Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterArea('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterArea === 'all' 
                      ? 'bg-gold text-black' 
                      : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                  }`}
                >
                  All Areas ({venues.length})
                </button>
                {areas.slice(1).map((area) => (
                  <button
                    key={area}
                    onClick={() => setFilterArea(area)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterArea === area 
                        ? 'bg-gold text-black' 
                        : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                    }`}
                  >
                    {area} ({venues.filter(v => (v.area || v.borough) === area).length})
                  </button>
                ))}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="text-warmWhite/70 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-warmWhite/10 text-warmWhite border border-warmWhite/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                >
                  <option value="rating">Rating</option>
                  <option value="reviews">Reviews</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No restaurants found</h3>
              <p className="text-warmWhite/70 mb-8">Try adjusting your filters to see more results</p>
              <button
                onClick={() => setFilterArea('all')}
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
              >
                View All {cuisineTitle} Restaurants
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sorted.map((venue) => (
                <Link 
                  href={`/restaurant/${venue.slug}`} 
                  key={venue.place_id}
                  className="group"
                >
                  <StandardizedCard 
                    venue={venue}
                    className="h-full group-hover:scale-105 transition-transform duration-300"
                    showBadges={true}
                    showRating={true}
                    showLocation={true}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Cuisines */}
        <div className="bg-black-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Explore More Cuisines</h2>
              <p className="text-warmWhite/70">Discover other amazing cuisines in London</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['indian', 'italian', 'japanese', 'thai', 'turkish', 'chinese', 'french', 'spanish'].map((relatedCuisine) => (
                relatedCuisine !== cuisine && (
                  <Link 
                    key={relatedCuisine}
                    href={`/${relatedCuisine}-restaurants-london`}
                    className="group"
                  >
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                      <h3 className="font-serif font-semibold text-white text-lg mb-2 group-hover:text-gold transition-colors duration-300 capitalize">
                        {relatedCuisine}
                      </h3>
                      <p className="text-warmWhite/70 text-sm">
                        {venues.filter(v => v.cuisines?.includes(relatedCuisine)).length} restaurants
                      </p>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
