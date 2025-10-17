import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title = "The Best in London" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Discover London's finest restaurants, cafés, and bars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-yellow-600">
                  The Best in London
                </h1>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Home
                </Link>
                <Link href="/restaurants" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Restaurants
                </Link>
                <Link href="/cafes" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Cafés
                </Link>
                <Link href="/bars" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Bars
                </Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">The Best in London</h3>
                <p className="text-gray-300">
                  Discover London's finest dining experiences, from Michelin-starred restaurants to hidden gems.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/restaurants" className="text-gray-300 hover:text-yellow-400 transition-colors">Restaurants</Link></li>
                  <li><Link href="/cafes" className="text-gray-300 hover:text-yellow-400 transition-colors">Cafés</Link></li>
                  <li><Link href="/bars" className="text-gray-300 hover:text-yellow-400 transition-colors">Bars</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <p className="text-gray-300">
                  London, United Kingdom<br />
                  hello@thebestinlondon.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 The Best in London. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}



