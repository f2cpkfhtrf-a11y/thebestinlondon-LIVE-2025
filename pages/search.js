import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BILScore from '../components/BILScore';
import { fetchVenuesData } from '../utils/venueDataUtils';

export async function getStaticProps() {
  const venues = await fetchVenuesData();
  
  return {
    props: {
      venues
    },
    revalidate: 3600
  };
}

export default function Search({ venues }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredVenues([]);
      return;
    }

    setIsSearching(true);
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = venues.filter(venue => 
      venue.name.toLowerCase().includes(query) ||
      venue.cuisines?.some(cuisine => cuisine.toLowerCase().includes(query)) ||
      venue.borough?.toLowerCase().includes(query) ||
      venue.description?.toLowerCase().includes(query)
    ).slice(0, 20); // Limit to 20 results

    setFilteredVenues(filtered);
    setIsSearching(false);
  }, [searchQuery, venues]);

  return (
    <>
      <Head>
        <title>Search Restaurants | The Best in London</title>
        <meta name="description" content="Search London's best restaurants by name, cuisine, area, or description." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/search" />
      </Head>

      <div className="min-h-screen bg-charcoal">
        <Header />
        
        <main className="pt-16">
          {/* Search Section */}
          <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-warmWhite mb-4">
                  Search Restaurants
                </h1>
                <p className="text-lg text-grey max-w-2xl mx-auto">
                  Find your perfect dining experience in London
                </p>
              </div>

              {/* Search Input */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search by name, cuisine, area, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-charcoal-light border border-grey-dark rounded-xl text-warmWhite placeholder-grey focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Search Results */}
          {searchQuery && (
            <section className="py-12 bg-charcoal-light">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-semibold text-warmWhite">
                    Search Results
                  </h2>
                  <span className="text-grey">
                    {isSearching ? 'Searching...' : `${filteredVenues.length} results`}
                  </span>
                </div>

                {isSearching ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : filteredVenues.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVenues.map((venue) => (
                      <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                        <div className="card overflow-hidden h-full">
                          <div className="relative h-48">
                            {venue.photos && venue.photos[0] ? (
                              <Image
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
                              <BILScore score={venue.rating} size="card" />
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-serif font-semibold text-warmWhite text-xl mb-2 group-hover:text-gold transition-colors duration-300">
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
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-grey-dark rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-warmWhite mb-2">
                      No results found
                    </h3>
                    <p className="text-grey mb-6">
                      Try searching with different keywords or browse our categories
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/restaurants" className="btn-primary">
                        Browse All Restaurants
                      </Link>
                      <Link href="/best-halal-restaurants-london" className="btn-secondary">
                        Halal Restaurants
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Quick Categories */}
          {!searchQuery && (
            <section className="py-20 bg-charcoal">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-warmWhite mb-4">
                    Popular Categories
                  </h2>
                  <p className="text-lg text-grey max-w-2xl mx-auto">
                    Explore London's diverse culinary landscape
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Link href="/best-halal-restaurants-london" className="group">
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                      <h3 className="font-serif font-semibold text-warmWhite text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                        Halal
                      </h3>
                      <p className="text-grey text-sm">
                        Verified halal restaurants
                      </p>
                    </div>
                  </Link>
                  
                  <Link href="/indian-restaurants-london" className="group">
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                      <h3 className="font-serif font-semibold text-warmWhite text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                        Indian
                      </h3>
                      <p className="text-grey text-sm">
                        Authentic Indian cuisine
                      </p>
                    </div>
                  </Link>
                  
                  <Link href="/restaurants-soho" className="group">
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                      <h3 className="font-serif font-semibold text-warmWhite text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                        Soho
                      </h3>
                      <p className="text-grey text-sm">
                        Central London dining
                      </p>
                    </div>
                  </Link>
                  
                  <Link href="/vegan-restaurants-london" className="group">
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300">
                      <h3 className="font-serif font-semibold text-warmWhite text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                        Vegan
                      </h3>
                      <p className="text-grey text-sm">
                        Plant-based options
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
