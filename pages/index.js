import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Link from 'next/link';
import OptimizedImage from '../components/OptimizedImage';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get top venues for featured section
    const topVenues = venues
      .filter(v => v.rating && v.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
    
    // Calculate stats
    const stats = {
      totalVenues: venues.length,
      areas: new Set(venues.map(v => v.borough).filter(Boolean)).size,
      cuisines: new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean)).size,
      halalVenues: venues.filter(v => v.dietary_tags?.halal).length
    };
    
    // Get popular cuisines
    const cuisineCounts = {};
    venues.forEach(v => {
      if (v.cuisines && v.cuisines.length > 0) {
        v.cuisines.forEach(cuisine => {
          const lower = cuisine.toLowerCase();
          cuisineCounts[lower] = (cuisineCounts[lower] || 0) + 1;
        });
      }
    });
    
    const popularCuisines = Object.entries(cuisineCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([cuisine, count]) => ({ cuisine, count }));
    
    return {
      props: {
        topVenues,
        stats,
        popularCuisines
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        topVenues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 },
        popularCuisines: []
      }
    };
  }
}

export default function Home({ topVenues, stats, popularCuisines }) {
  return (
    <>
      <Head>
        <title>The Best in London | Premium Dining Guide</title>
        <meta name="description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas. From street food to fine dining." />
        <meta name="keywords" content="London restaurants, best restaurants London, dining guide, halal restaurants, fine dining London" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Best in London | Premium Dining Guide" />
        <meta property="og:description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas." />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Best in London | Premium Dining Guide" />
        <meta name="twitter:description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas." />
        <meta name="twitter:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Best in London",
              "description": "London's premier dining guide featuring 760+ verified restaurants",
              "url": "https://www.thebestinlondon.co.uk",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.thebestinlondon.co.uk/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        <HeroSection />
        
        {/* Featured Restaurants */}
        <section className="py-20 bg-black-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Featured Restaurants
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Handpicked establishments that define London's culinary excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topVenues.map((venue) => (
                <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                  <div className="card overflow-hidden h-full">
                    <div className="relative h-48">
                      {venue.photos && venue.photos[0] ? (
                        <OptimizedImage
                          src={venue.photos[0].url}
                          alt={venue.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                          <span className="text-grey text-sm">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <div className="bg-gold text-black px-2 py-1 rounded-lg text-sm font-semibold">
                          ⭐ {venue.rating?.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-semibold text-white text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                        {venue.name}
                      </h3>
                      <p className="text-grey text-sm mb-3">
                        {venue.cuisines?.[0]} • {venue.borough}
                      </p>
                      <p className="text-grey-light text-sm line-clamp-2">
                        {venue.description || 'Experience exceptional dining in the heart of London.'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/restaurants" className="btn-primary text-lg px-8 py-4">
                View All Restaurants
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Cuisines */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Popular Cuisines
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Explore London's diverse culinary landscape
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCuisines.map(({ cuisine, count }) => (
                <Link 
                  key={cuisine} 
                  href={`/${cuisine}-restaurants-london`}
                  className="group"
                >
                  <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                    <h3 className="font-serif font-semibold text-white text-lg mb-2 group-hover:text-gold transition-colors duration-300 capitalize">
                      {cuisine}
                    </h3>
                    <p className="text-grey text-sm">
                      {count} restaurants
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-gold/10 to-gold-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                London's Dining Scene
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Comprehensive coverage of the capital's culinary landscape
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {stats.totalVenues}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider text-sm">
                  Restaurants
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {stats.areas}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider text-sm">
                  Areas
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {stats.cuisines}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider text-sm">
                  Cuisines
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {stats.halalVenues}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider text-sm">
                  Halal Options
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}