import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import RadiusControl from '../../components/RadiusControl';
import Breadcrumbs from '../../components/Breadcrumbs';
import { resolveHeroImage } from '../../lib/resolveHeroImage';
import { haversineKm } from '../../lib/geo';
import { getVenueLatLng } from '../../lib/venueLocation';
import { getLiveStats } from '../../lib/siteStats';
import stationsData from '../../data/stations.json';
import venuesData from '../../public/venues.json';

interface Station {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  radiusKmDefault: number;
}

interface VenueWithDistance {
  distance: number;
  [key: string]: any;
}

interface Props {
  station: Station;
  nearbyVenues: VenueWithDistance[];
  commonCuisines: string[];
  stats: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stations = stationsData as Station[];
  
  const paths = stations.map((station) => ({
    params: { slug: station.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const stations = stationsData as Station[];
  const station = stations.find(s => s.slug === slug);

  if (!station) {
    return {
      notFound: true
    };
  }

  const venues = Array.isArray(venuesData) ? venuesData : (venuesData as any).venues || [];
  
  // Get venues within default radius and calculate distances
  const venuesWithDistance = venues
    .map(venue => {
      const venueCoords = getVenueLatLng(venue);
      if (!venueCoords) return null;
      
      const distance = haversineKm(
        { lat: station.lat, lng: station.lng },
        venueCoords
      );
      
      if (distance <= station.radiusKmDefault) {
        return { ...venue, distance };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance) as VenueWithDistance[];

  // Get common cuisines from nearby venues
  const cuisineCounts = venuesWithDistance.reduce((acc, venue) => {
    if (venue.cuisines) {
      venue.cuisines.forEach((cuisine: string) => {
        acc[cuisine] = (acc[cuisine] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const commonCuisines = Object.entries(cuisineCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([cuisine]) => cuisine);

  const stats = getLiveStats();

  return {
    props: {
      station,
      nearbyVenues: venuesWithDistance,
      commonCuisines,
      stats
    },
    revalidate: 3600
  };
};

export default function StationDetail({ station, nearbyVenues, commonCuisines, stats }: Props) {
  const [radius, setRadius] = useState(station.radiusKmDefault);
  const [filteredVenues, setFilteredVenues] = useState(nearbyVenues);

  // Filter venues based on radius
  const updateRadius = (newRadius: number) => {
    setRadius(newRadius);
    // In a real implementation, this would re-fetch or filter client-side
    // For now, we'll use the static data within the default radius
    const filtered = nearbyVenues.filter(venue => venue.distance <= newRadius);
    setFilteredVenues(filtered);
  };

  const hero = resolveHeroImage({ type: "station", stationSlug: station.slug });

  // JSON-LD for station page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": `Restaurants near ${station.name} Station`,
    "description": `Find the best restaurants near ${station.name} station in London`,
    "url": `https://www.thebestinlondon.co.uk/stations/${station.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": station.lat,
      "longitude": station.lng
    }
  };

  return (
    <>
      <Head>
        <title>Restaurants Near {station.name} Station | The Best in London</title>
        <meta name="description" content={`Discover ${filteredVenues.length} restaurants near ${station.name} station in London. Find dining options within walking distance.`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/stations/${station.slug}`} />
        
        <meta property="og:title" content={`Restaurants Near ${station.name} Station | The Best in London`} />
        <meta property="og:description" content={`Discover ${filteredVenues.length} restaurants near ${station.name} station in London.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Restaurants Near ${station.name} Station | The Best in London`} />
        <meta name="twitter:description" content={`Discover ${filteredVenues.length} restaurants near ${station.name} station in London.`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer 
          currentPath="/stations" 
          pageType="stations"
          venue={undefined}
          cuisine={undefined}
          area={undefined}
        >
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Stations', href: '/stations' },
              { label: station.name, href: `/stations/${station.slug}` }
            ]}
          />

          <PageHero
            title={`Restaurants Near ${station.name} Station`}
            subtitle={`Find the best dining options within walking distance of ${station.name} station`}
            stats={[
              { label: "Restaurants", value: `${filteredVenues.length}` },
              { label: "Default Radius", value: `${station.radiusKmDefault} km` },
              { label: "Cuisines", value: `${commonCuisines.length}+` }
            ]}
            image={hero}
          />

          {/* Radius Control */}
          <section className="py-8 bg-charcoal">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-grey-dark/50 rounded-lg p-6">
                <RadiusControl 
                  value={radius}
                  onChange={updateRadius}
                  min={0.3}
                  max={1.5}
                  className="text-white"
                />
                <p className="text-grey text-sm mt-2 text-center">
                  Showing restaurants within {radius.toFixed(1)} km of {station.name} station
                </p>
              </div>
            </div>
          </section>

          {/* Common Cuisines */}
          {commonCuisines.length > 0 && (
            <section className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-xl font-serif font-bold text-white mb-4">Popular Cuisines Near {station.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {commonCuisines.map((cuisine) => (
                    <Link
                      key={cuisine}
                      href={`/${cuisine.replace(/\s+/g, '-').toLowerCase()}`}
                      className="px-4 py-2 bg-grey-dark text-white rounded-lg hover:bg-gold hover:text-black transition-colors text-sm"
                    >
                      {cuisine}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Restaurants Grid */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  Nearby Restaurants
                </h2>
                <p className="text-lg text-grey">
                  {filteredVenues.length} restaurants found within {radius.toFixed(1)} km
                </p>
              </div>

              {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVenues.map((venue) => (
                    <Link key={venue.place_id || venue.slug} href={`/restaurant/${venue.slug}`} className="group">
                      <div className="card overflow-hidden h-full">
                        <div className="relative h-48">
                          {venue.image_card_path || venue.image_url ? (
                            <img
                              src={venue.image_card_path || venue.image_url}
                              alt={`${venue.name} restaurant near ${station.name} station`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                              📍 {venue.distance?.toFixed(2)} km
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif font-semibold text-white text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                            {venue.name}
                          </h3>
                          <p className="text-grey text-sm mb-3">
                            {venue.cuisines?.[0]} • {venue.area || venue.borough} • {venue.distance?.toFixed(2)} km away
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
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">🍽️</div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">
                    No restaurants found within {radius.toFixed(1)} km
                  </h3>
                  <p className="text-grey mb-6">
                    Try increasing your search radius to find more restaurants near {station.name} station.
                  </p>
                </div>
              )}
            </div>
          </section>
        </TabContainer>
      </main>

      <Footer stats={stats} />
    </>
  );
}
