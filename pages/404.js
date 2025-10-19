import Link from 'next/link';
import Head from 'next/head';
import { TabContainer } from '../components/HeroTabs';
import PageHero from '../components/PageHero';
import { resolveHeroImage } from '../lib/resolveHeroImage';

export default function Custom404() {
  const hero = resolveHeroImage({ type: "list-all" });

  return (
    <>
      <Head>
        <title>404 - Page Not Found | The Best in London</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our restaurant guides, cuisine collections, and area guides instead." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/404" />
      </Head>
      
      <TabContainer>
        <PageHero
          title="Page Not Found"
          subtitle="The page you're looking for doesn't exist, but we have plenty of amazing restaurants to discover!"
          stats={[
            { label: "Restaurants", value: "500+" },
            { label: "Areas", value: "20+" },
            { label: "Cuisines", value: "15+" }
          ]}
          image={hero}
          center={true}
        />

        <main className="py-16 bg-charcoal">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Let's Get You Back on Track
              </h2>
              <p className="text-xl text-grey-light mb-8 max-w-2xl mx-auto">
                While that page doesn't exist, we have amazing restaurants waiting for you to discover.
              </p>
            </div>
          
            {/* Popular destinations grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Link href="/restaurants" className="bg-grey-dark hover:bg-gold hover:text-charcoal rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-3">🍽️</div>
                <h3 className="font-semibold mb-2">All Restaurants</h3>
                <p className="text-sm opacity-75">Browse our complete collection</p>
              </Link>
              
              <Link href="/areas" className="bg-grey-dark hover:bg-gold hover:text-charcoal rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-3">📍</div>
                <h3 className="font-semibold mb-2">Areas</h3>
                <p className="text-sm opacity-75">Find restaurants by location</p>
              </Link>
              
              <Link href="/cuisines" className="bg-grey-dark hover:bg-gold hover:text-charcoal rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-3">🍜</div>
                <h3 className="font-semibold mb-2">Cuisines</h3>
                <p className="text-sm opacity-75">Explore different cuisines</p>
              </Link>
            </div>

            {/* Search CTA */}
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-8 border border-gold/20">
              <h3 className="text-xl font-semibold text-white mb-4">Can't find what you're looking for?</h3>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                Start Fresh from Home
              </Link>
            </div>
          </div>
        </main>
      </TabContainer>
    </>
  );
}
