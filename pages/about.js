import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | The Best in London | Premium Dining Guide</title>
        <meta name="description" content="Learn about The Best in London - London's premier dining guide featuring 760+ verified restaurants with detailed reviews, FSA ratings, and authentic cuisine." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us | The Best in London" />
        <meta property="og:description" content="Learn about The Best in London - London's premier dining guide." />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | The Best in London" />
        <meta name="twitter:description" content="Learn about The Best in London - London's premier dining guide." />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer currentPath="/about" pageType="about">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal opacity-90"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">
              About The Best in London
            </h1>
            <p className="text-xl sm:text-2xl text-grey font-sans font-medium mb-4">
              London's Premier Dining Guide
            </p>
            <p className="text-lg text-grey-light max-w-3xl mx-auto leading-relaxed">
              We're passionate about showcasing London's incredible culinary scene, 
              from hidden gems to Michelin-starred establishments.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-grey-light mb-6 leading-relaxed">
                  At The Best in London, we believe that great food deserves great discovery. 
                  Our mission is to connect Londoners and visitors with the city's most exceptional 
                  dining experiences through comprehensive, verified, and beautifully presented guides.
                </p>
                <p className="text-lg text-grey-light mb-6 leading-relaxed">
                  We meticulously curate our restaurant database, ensuring every venue meets our 
                  high standards for quality, authenticity, and customer satisfaction. From street 
                  food stalls to fine dining establishments, we celebrate London's diverse culinary landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/restaurants" className="btn-primary text-lg px-8 py-4">
                    Explore Restaurants
                  </Link>
                  <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                    Get in Touch
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-2xl flex items-center justify-center">
                  <Image
                    src="/assets/logos/logo-primary.svg"
                    alt="The Best in London Logo"
                    width={200}
                    height={120}
                    className="w-48 h-28 opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Our Values
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-4">
                  Accuracy
                </h3>
                <p className="text-grey-light">
                  Every restaurant is verified with up-to-date information, 
                  real reviews, and accurate ratings.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-4">
                  Excellence
                </h3>
                <p className="text-grey-light">
                  We only feature restaurants that meet our high standards 
                  for quality, service, and authenticity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-4">
                  Community
                </h3>
                <p className="text-grey-light">
                  We support local businesses and celebrate London's 
                  diverse culinary traditions and cultures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Numbers that reflect our commitment to London's dining scene
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  760+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  50+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Areas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  15+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  100%
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Verified</div>
              </div>
            </div>
          </div>
        </section>
        </TabContainer>
      </main>

      <Footer />
    </>
  );
}
