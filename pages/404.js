import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | The Best in London</title>
        <meta name="description" content="The page you're looking for doesn't exist. Discover London's best restaurants instead." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo.svg"
                alt="The Best in London"
                width={80}
                height={80}
                className="mx-auto mb-6"
              />
            </div>

            {/* 404 Content */}
            <div className="mb-12">
              <h1 className="text-6xl lg:text-8xl font-serif font-bold text-gold mb-4">
                404
              </h1>
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-white mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-grey mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist. But don't worry - 
                we have plenty of amazing restaurants to discover instead.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Go Home
              </Link>
              <Link href="/restaurants" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Browse Restaurants
              </Link>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
              <Link href="/best-halal-restaurants-london" className="text-grey hover:text-gold transition-colors duration-300 text-sm">
                Halal Restaurants
              </Link>
              <Link href="/indian-restaurants-london" className="text-grey hover:text-gold transition-colors duration-300 text-sm">
                Indian Cuisine
              </Link>
              <Link href="/restaurants-soho" className="text-grey hover:text-gold transition-colors duration-300 text-sm">
                Soho Area
              </Link>
              <Link href="/vegan-restaurants-london" className="text-grey hover:text-gold transition-colors duration-300 text-sm">
                Vegan Options
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}