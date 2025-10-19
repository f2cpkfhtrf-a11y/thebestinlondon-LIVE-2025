import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import { resolveHeroImage } from '../../lib/resolveHeroImage';
import { getLiveStats } from '../../lib/siteStats';
import stationsData from '../../data/stations.json';
import venuesData from '../../public/venues.json';
import { haversineKm } from '../../lib/geo';
import { getVenueLatLng } from '../../lib/venueLocation';

interface Station {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  radiusKmDefault: number;
  venueCount: number;
}

interface Props {
  stations: Station[];
  stats: ReturnType<typeof getLiveStats>;
}

export const getStaticProps: GetStaticProps = async () => {
  const stations = stationsData as Station[];
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];
  const stats = getLiveStats();

  // Calculate venue counts for each station within default radius
  const stationsWithCounts = stations.map(station => {
    const venuesNearStation = venues.filter(venue => {
      const venueCoords = getVenueLatLng(venue);
      if (!venueCoords) return false;
      
      const distance = haversineKm(
        { lat: station.lat, lng: station.lng },
        venueCoords
      );
      
      return distance <= station.radiusKmDefault;
    });

    return {
      ...station,
      venueCount: venuesNearStation.length
    };
  });

  return {
    props: {
      stations: stationsWithCounts,
      stats
    },
    revalidate: 3600
  };
};

export default function StationsIndex({ stations, stats }: Props) {
  const hero = resolveHeroImage({ type: "station" });

  return (
    <>
      <Head>
        <title>Restaurants Near London Stations | The Best in London</title>
        <meta name="description" content="Find the best restaurants near major London train stations. Discover dining options within walking distance of Liverpool Street, Waterloo, King's Cross, and London Bridge." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/stations" />
        
        <meta property="og:title" content="Restaurants Near London Stations | The Best in London" />
        <meta property="og:description" content="Find the best restaurants near major London train stations." />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Restaurants Near London Stations | The Best in London" />
        <meta name="twitter:description" content="Find the best restaurants near major London train stations." />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
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
          <PageHero
            title="Restaurants Near London Stations"
            subtitle="Find the best dining options within walking distance of major train stations"
            stats={[
              { label: "Stations", value: `${stations.length}` },
              { label: "Total Restaurants", value: `${stats.total}+` },
              { label: "Areas Covered", value: `${stats.areas}+` }
            ]}
            image={hero}
          />

          {/* Stations Grid */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  Popular Station Areas
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto">
                  Discover restaurants near London's busiest transport hubs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stations.map((station) => {
                  const stationHero = resolveHeroImage({ type: "station", stationSlug: station.slug });
                  
                  return (
                    <Link key={station.slug} href={`/stations/${station.slug}`} className="group">
                      <div className="card overflow-hidden h-full">
                        <div className="relative h-48">
                          <img
                            src={stationHero.src}
                            alt={`${station.name} restaurants in London`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/heroes/station-default.webp';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white text-xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">
                              {station.name}
                            </h3>
                            <p className="text-white/90 text-sm">
                              {station.venueCount} restaurants within {station.radiusKmDefault} km
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-grey text-sm mb-2">
                                Walking distance from {station.name} station
                              </p>
                              <p className="text-grey-light text-sm">
                                Search radius: {station.radiusKmDefault} km
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-gold text-2xl font-bold">
                                {station.venueCount}
                              </div>
                              <div className="text-grey text-xs">venues</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </TabContainer>
      </main>

      <Footer stats={stats} />
    </>
  );
}
