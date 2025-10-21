import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';

export default function HalalCollectionPage() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Halal Restaurants Collection | The Best in London</title>
        <meta name="description" content="Browse our collection of halal restaurants in London. Find verified halal dining options across all areas of the capital." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/collections/halal" />
        
        {/* Redirect this page to main halal page */}
        <meta httpEquiv="refresh" content="0; url=/best-halal-restaurants-london" />
      </Head>
      
      <div className="min-h-screen bg-black">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-warmWhite mb-4">
            Halal Restaurants Collection
          </h1>
          <p className="text-lg text-grey mb-8">
            You are being redirected to our halal restaurants directory.
          </p>
          <Link 
            href="/best-halal-restaurants-london"
            className="inline-block bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
          >
            Go to Halal Restaurants →
          </Link>
          
          <div className="mt-12 p-6 bg-black-light rounded-xl text-left">
            <h2 className="text-2xl font-serif font-bold text-warmWhite mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/best-halal-restaurants-london" className="text-gold hover:text-gold/80 transition-colors">
                  → All Halal Restaurants
                </Link>
              </li>
              <li>
                <Link href="/best-halal-restaurants-london/by-area" className="text-gold hover:text-gold/80 transition-colors">
                  → Halal Restaurants by Area
                </Link>
              </li>
              <li>
                <Link href="/halal-near-stations-simple" className="text-gold hover:text-gold/80 transition-colors">
                  → Halal Restaurants Near Stations
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

