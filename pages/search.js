import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import BILScore from '../components/BILScore';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import { fetchVenuesData } from '../utils/venueDataUtils';
import { dietaryFlags } from '../lib/dietary';
import { haversineKm } from '../lib/geo';
import { getVenueLatLng } from '../lib/venueLocation';

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  // Advanced filters
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isHalalFilter, setIsHalalFilter] = useState(false);
  const [isNearMe, setIsNearMe] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearMeRadius, setNearMeRadius] = useState(5);
  
  // Get unique values for filters
  const uniqueCuisines = [...new Set(venues.map(v => v.cuisine_slug || v.cuisines?.[0]).filter(Boolean))].sort();
  const uniqueAreas = [...new Set(venues.map(v => v.area_slug || v.area || v.borough).filter(Boolean))].sort();
  
  // Get hero image for search page
  const hero = resolveHeroImage({ type: "search" });

  // Handle URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  // Get user location for "Near Me" filter
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      // Fallback to Central London coordinates
      setUserLocation({ lat: 51.5074, lng: -0.1278 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Fallback to Central London coordinates
        setUserLocation({ lat: 51.5074, lng: -0.1278 });
      }
    );
  };

  // Toggle Near Me filter
  const toggleNearMe = () => {
    if (!isNearMe) {
      getCurrentLocation();
    }
    setIsNearMe(!isNearMe);
  };

  // Handle search with advanced filters
  useEffect(() => {
    if (searchQuery.trim().length === 0 && !isHalalFilter && !selectedCuisine && !selectedArea && !priceRange && !isNearMe) {
      setFilteredVenues([]);
      return;
    }

    setIsSearching(true);
    
    let filtered = venues;
    
    // Apply search query filter
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(venue => 
        venue.name.toLowerCase().includes(query) ||
        venue.cuisines?.some(cuisine => cuisine.toLowerCase().includes(query)) ||
        venue.borough?.toLowerCase().includes(query) ||
        venue.description?.toLowerCase().includes(query) ||
        venue.address?.formatted?.toLowerCase().includes(query) ||
        venue.formatted_address?.toLowerCase().includes(query)
      );
    }

    // Apply cuisine filter
    if (selectedCuisine) {
      filtered = filtered.filter(venue => 
        venue.cuisine_slug === selectedCuisine || 
        venue.cuisines?.some(c => c.toLowerCase() === selectedCuisine.toLowerCase())
      );
    }

    // Apply area filter
    if (selectedArea) {
      filtered = filtered.filter(venue => 
        venue.area_slug === selectedArea || 
        venue.area?.toLowerCase() === selectedArea.toLowerCase() ||
        venue.borough?.toLowerCase() === selectedArea.toLowerCase()
      );
    }

    // Apply price range filter
    if (priceRange) {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter(v => v.price_level <= 2);
          break;
        case 'moderate':
          filtered = filtered.filter(v => v.price_level === 3);
          break;
        case 'expensive':
          filtered = filtered.filter(v => v.price_level >= 4);
          break;
      }
    }

    // Apply halal filter using dietaryFlags
    if (isHalalFilter) {
      filtered = filtered.filter(venue => {
        const flags = dietaryFlags(venue);
        return flags.halal === true;
      });
    }

    // Apply legacy filters for backward compatibility
    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'halal':
          filtered = filtered.filter(venue => {
            const flags = dietaryFlags(venue);
            return flags.halal === true;
          });
          break;
        case 'vegan':
          filtered = filtered.filter(venue => {
            const flags = dietaryFlags(venue);
            return flags.vegan === true;
          });
          break;
        case 'vegetarian':
          filtered = filtered.filter(venue => {
            const flags = dietaryFlags(venue);
            return flags.vegetarian === true;
          });
          break;
        case 'top-rated':
          filtered = filtered.filter(v => v.rating >= 4.5);
          break;
      }
    }

    // Apply Near Me filter
    if (isNearMe && userLocation) {
      filtered = filtered.map(venue => {
        const venueCoords = getVenueLatLng(venue);
        if (venueCoords) {
          const distance = haversineKm(userLocation, venueCoords);
          return { ...venue, distance };
        }
        return null;
      }).filter(Boolean);
      
      filtered = filtered.filter(v => v.distance <= nearMeRadius);
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered = filtered.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'distance':
        if (isNearMe && userLocation) {
          filtered = filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        }
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredVenues(filtered.slice(0, 50)); // Limit to 50 results
    setIsSearching(false);
  }, [searchQuery, venues, activeFilter, sortBy, selectedCuisine, selectedArea, priceRange, isHalalFilter, isNearMe, userLocation, nearMeRadius]);

  return (
    <>
      <Head>
        <title>Search Restaurants | The Best in London</title>
        <meta name="description" content="Search London's best restaurants by name, cuisine, area, or description." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/search" />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
      </Head>

      <div className="min-h-screen bg-charcoal">
        <Header />
        
        <main className="pt-16">
          {/* Page Hero */}
          <PageHero 
            title="Search Restaurants"
            subtitle="Find your perfect dining experience in London"
            image={hero}
            center={true}
          />

          {/* Search Input */}
          <section className="py-8 bg-charcoal-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Advanced Filters */}
          <section className="py-8 bg-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-medium text-grey mb-2">Cuisine</label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full bg-charcoal-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="">All Cuisines</option>
                    {uniqueCuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                {/* Area Filter */}
                <div>
                  <label className="block text-sm font-medium text-grey mb-2">Area</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-charcoal-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="">All Areas</option>
                    {uniqueAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-grey mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-charcoal-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="">Any Price</option>
                    <option value="budget">Budget (£)</option>
                    <option value="moderate">Moderate (££)</option>
                    <option value="expensive">Expensive (£££+)</option>
                  </select>
                </div>

                {/* Special Filters */}
                <div>
                  <label className="block text-sm font-medium text-grey mb-2">Special</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsHalalFilter(!isHalalFilter)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isHalalFilter 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal-light text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      ☪️ Halal
                    </button>
                    <button
                      onClick={toggleNearMe}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isNearMe 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal-light text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      📍 Near Me
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips */}
              {(selectedCuisine || selectedArea || priceRange || isHalalFilter || isNearMe) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-grey text-sm">Active filters:</span>
                  {selectedCuisine && (
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Cuisine: {selectedCuisine}
                      <button onClick={() => setSelectedCuisine('')} className="hover:bg-black/20 rounded-full p-0.5">×</button>
                    </span>
                  )}
                  {selectedArea && (
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Area: {selectedArea}
                      <button onClick={() => setSelectedArea('')} className="hover:bg-black/20 rounded-full p-0.5">×</button>
                    </span>
                  )}
                  {priceRange && (
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Price: {priceRange}
                      <button onClick={() => setPriceRange('')} className="hover:bg-black/20 rounded-full p-0.5">×</button>
                    </span>
                  )}
                  {isHalalFilter && (
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      ☪️ Halal
                      <button onClick={() => setIsHalalFilter(false)} className="hover:bg-black/20 rounded-full p-0.5">×</button>
                    </span>
                  )}
                  {isNearMe && (
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      📍 Near Me ({nearMeRadius}km)
                      <button onClick={() => setIsNearMe(false)} className="hover:bg-black/20 rounded-full p-0.5">×</button>
                    </span>
                  )}
                </div>
              )}

              {/* Near Me Radius Control */}
              {isNearMe && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-grey mb-2">
                    Search Radius: {nearMeRadius} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={nearMeRadius}
                    onChange={(e) => setNearMeRadius(Number(e.target.value))}
                    className="w-full max-w-md h-2 bg-grey-dark rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-xs text-grey mt-1 max-w-md">
                    <span>1km</span>
                    <span>25km</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Search Results */}
          {(searchQuery || selectedCuisine || selectedArea || priceRange || isHalalFilter || isNearMe) && (
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

                {/* Advanced Filters & Sort */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'all' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      All Results
                    </button>
                    <button
                      onClick={() => setActiveFilter('halal')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'halal' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      ☪️ Halal
                    </button>
                    <button
                      onClick={() => setActiveFilter('vegan')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'vegan' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      🌱 Vegan
                    </button>
                    <button
                      onClick={() => setActiveFilter('top-rated')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'top-rated' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      ⭐ Top Rated
                    </button>
                    <button
                      onClick={() => setActiveFilter('budget')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'budget' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      💰 Budget
                    </button>
                    <button
                      onClick={() => setActiveFilter('fine-dining')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === 'fine-dining' 
                          ? 'bg-gold text-black' 
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      🍽️ Fine Dining
                    </button>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-grey text-sm">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-charcoal border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="rating">Rating</option>
                      <option value="reviews">Most Reviews</option>
                      <option value="name">Name A-Z</option>
                      {isNearMe && userLocation && <option value="distance">Distance</option>}
                    </select>
                  </div>
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
                            {venue.distance && (
                              <div className="absolute bottom-4 left-4">
                                <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                  📍 {venue.distance.toFixed(1)} km
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="font-serif font-semibold text-warmWhite text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                              {venue.name}
                            </h3>
                            <p className="text-grey text-sm mb-3">
                              {venue.cuisines?.[0]} • {venue.borough}
                              {venue.distance && ` • ${venue.distance.toFixed(1)} km away`}
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
          {!searchQuery && !selectedCuisine && !selectedArea && !priceRange && !isHalalFilter && !isNearMe && (
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
