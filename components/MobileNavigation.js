import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Scroll position restoration
  useEffect(() => {
    const handleRouteChange = () => {
      // Store current scroll position
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    };

    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 100);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', restoreScrollPosition);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', restoreScrollPosition);
    };
  }, [router]);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black border-t border-grey-dark">
        <div className="grid grid-cols-5 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-grey hover:text-gold transition-colors duration-300">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-nav">Home</span>
          </Link>
          
          <Link href="/restaurants" className="flex flex-col items-center justify-center text-grey hover:text-gold transition-colors duration-300">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-nav">Areas</span>
          </Link>
          
          <Link href="/indian-restaurants-london" className="flex flex-col items-center justify-center text-grey hover:text-gold transition-colors duration-300">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-xs font-nav">Cuisines</span>
          </Link>
          
          <Link href="/best-halal-restaurants-london" className="flex flex-col items-center justify-center text-grey hover:text-gold transition-colors duration-300">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-nav">Halal</span>
          </Link>
          
          <Link href="/near-me" className="flex flex-col items-center justify-center text-grey hover:text-gold transition-colors duration-300">
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-nav">Near Me</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/95 backdrop-blur-md">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-grey-dark">
              <h2 className="text-xl font-serif font-semibold text-white">Search Restaurants</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-grey hover:text-gold transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Content */}
            <div className="flex-1 p-4 space-y-6 overflow-y-auto">
              {/* Quick Filters */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-white mb-4">Quick Filters</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/best-halal-restaurants-london" className="btn-secondary text-sm py-3">
                    Halal Restaurants
                  </Link>
                  <Link href="/vegan-restaurants-london" className="btn-secondary text-sm py-3">
                    Vegan Options
                  </Link>
                  <Link href="/restaurants-soho" className="btn-secondary text-sm py-3">
                    Soho Area
                  </Link>
                  <Link href="/indian-restaurants-london" className="btn-secondary text-sm py-3">
                    Indian Cuisine
                  </Link>
                </div>
              </div>

              {/* Popular Areas */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-white mb-4">Popular Areas</h3>
                <div className="space-y-2">
                  {['Soho', 'Covent Garden', 'Mayfair', 'Shoreditch', 'Camden', 'Islington'].map(area => (
                    <Link
                      key={area}
                      href={`/restaurants-${area.toLowerCase().replace(' ', '-')}`}
                      className="block p-3 bg-black-light rounded-lg text-white hover:text-gold transition-colors duration-300"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Cuisines */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-white mb-4">Popular Cuisines</h3>
                <div className="space-y-2">
                  {['Indian', 'Italian', 'Japanese', 'Turkish', 'Thai', 'Chinese'].map(cuisine => (
                    <Link
                      key={cuisine}
                      href={`/${cuisine.toLowerCase()}-restaurants-london`}
                      className="block p-3 bg-black-light rounded-lg text-white hover:text-gold transition-colors duration-300"
                    >
                      {cuisine}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 lg:hidden bg-gold text-black p-3 rounded-full shadow-gold-lg hover:shadow-gold transition-all duration-300"
        aria-label="Search"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </>
  );
}