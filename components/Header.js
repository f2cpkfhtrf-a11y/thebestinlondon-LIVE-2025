import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-charcoal/98 backdrop-blur-lg shadow-lg' : 'bg-charcoal/95 backdrop-blur-md'
    } border-b border-grey-dark`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo - BestDubai Inspired */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 lg:w-14 lg:h-14">
              <Image
                src="/logo.svg"
                alt="The Best in London"
                width={56}
                height={56}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="logo-text text-xl lg:text-2xl">
                The Best in London
              </h1>
              <p className="text-xs text-grey font-nav font-medium uppercase tracking-wider">
                Premium Dining Guide
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/restaurants" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Restaurants
            </Link>
            <Link href="/restaurants-soho" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Areas
            </Link>
            <Link href="/indian-restaurants-london" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Cuisines
            </Link>
            <Link href="/best-halal-restaurants-london" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Halal
            </Link>
            <Link href="/search" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Search
            </Link>
            
            {/* CTA Button */}
            <Link 
              href="/search" 
              className="bg-gold text-black px-4 py-2 rounded-lg font-nav font-semibold hover:bg-gold/90 transition-colors duration-300"
            >
              Find Restaurants
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-warmWhite hover:text-gold transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-grey-dark bg-charcoal/98 backdrop-blur-lg">
            <nav className="py-4 space-y-2">
              <Link 
                href="/restaurants" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link 
                href="/restaurants-soho" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Areas
              </Link>
              <Link 
                href="/indian-restaurants-london" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Cuisines
              </Link>
              <Link 
                href="/best-halal-restaurants-london" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Halal Options
              </Link>
              <Link 
                href="/search" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              
              {/* Mobile CTA */}
              <div className="px-4 pt-2">
                <Link 
                  href="/search" 
                  className="block w-full bg-gold text-black px-4 py-3 rounded-lg font-nav font-semibold text-center hover:bg-gold/90 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Restaurants
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}