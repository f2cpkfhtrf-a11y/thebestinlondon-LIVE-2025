import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const router = useRouter();

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    const suggestions = [];
    
    // Restaurant suggestions (mock data - in real app, this would come from API)
    const restaurants = [
      'Dishoom', 'Gymkhana', 'Tayyabs', 'Franco Manca', 'Honest Burgers',
      'Flat Iron', 'Bao', 'Padella', 'Polpo', 'The Ledbury'
    ];
    
    // Cuisine suggestions
    const cuisines = [
      'Indian', 'Italian', 'Japanese', 'Chinese', 'Thai', 'French', 'Turkish',
      'Korean', 'Mexican', 'Spanish', 'Mediterranean', 'British', 'Vietnamese'
    ];
    
    // Area suggestions
    const areas = [
      'Soho', 'Covent Garden', 'Shoreditch', 'Camden', 'Notting Hill',
      'Mayfair', 'Clerkenwell', 'Borough', 'Brick Lane', 'King\'s Cross'
    ];
    
    // Add matching restaurants
    restaurants.forEach(restaurant => {
      if (restaurant.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'restaurant',
          title: restaurant,
          subtitle: 'Restaurant',
          icon: '🍴',
          url: `/search?q=${encodeURIComponent(restaurant)}`
        });
      }
    });
    
    // Add matching cuisines
    cuisines.forEach(cuisine => {
      if (cuisine.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'cuisine',
          title: cuisine,
          subtitle: 'Cuisine',
          icon: '🥘',
          url: `/${cuisine.toLowerCase()}-restaurants-london`
        });
      }
    });
    
    // Add matching areas
    areas.forEach(area => {
      if (area.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'area',
          title: area,
          subtitle: 'Area',
          icon: '📍',
          url: `/restaurants-${area.toLowerCase().replace(/\s+/g, '-')}`
        });
      }
    });
    
    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    router.push(suggestion.url);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-charcoal/98 backdrop-blur-lg shadow-lg' : 'bg-charcoal/95 backdrop-blur-md'
    } border-b border-grey-dark`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo - Premium Crown + Skyline */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12 lg:w-14 lg:h-14'
            }`}>
              <Image
                src="/assets/logos/logo-compact.svg"
                alt="The Best in London"
                width={isScrolled ? 40 : 56}
                height={isScrolled ? 40 : 56}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`logo-text transition-all duration-300 ${
                isScrolled ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
              }`}>
                The Best in London
              </h1>
              <p className={`text-xs text-grey font-nav font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? 'opacity-0 h-0' : 'opacity-100'
              }`}>
                Premium Dining Guide
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/restaurants" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Restaurants
            </Link>
            <Link href="/areas" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Areas
            </Link>
            <Link href="/cuisines" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Cuisines
            </Link>
            <Link href="/best-halal-restaurants-london" className="text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300">
              Halal
            </Link>
            
            {/* Search Input */}
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="bg-charcoal-light border border-grey-dark rounded-lg px-4 py-2 pr-10 text-warmWhite placeholder-grey focus:border-gold focus:outline-none transition-colors duration-300 w-64"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-grey hover:text-gold transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-gradient-to-b from-charcoal via-black-light to-charcoal border border-gold/20 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto backdrop-blur-sm"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.title}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors duration-200 ${
                        index === selectedIndex
                          ? 'bg-gold/20 border-l-4 border-gold'
                          : 'hover:bg-gold/10'
                      }`}
                    >
                      <span className="text-lg">{suggestion.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-warmWhite truncate">
                          {suggestion.title}
                        </div>
                        <div className="text-sm text-grey truncate">
                          {suggestion.subtitle}
                        </div>
                      </div>
                      <div className="text-xs text-gold uppercase tracking-wide">
                        {suggestion.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/search" 
              className="bg-gold text-black px-4 py-2 rounded-lg font-nav font-semibold hover:bg-gold/90 transition-colors duration-300"
            >
              Browse All
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
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <div className="relative" ref={searchRef}>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search restaurants..."
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-charcoal-light border border-grey-dark rounded-lg px-4 py-3 pr-12 text-warmWhite placeholder-grey focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey hover:text-gold transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                  
                  {/* Mobile Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute top-full left-0 right-0 mt-1 bg-gradient-to-b from-charcoal via-black-light to-charcoal border border-gold/20 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto backdrop-blur-sm"
                    >
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={`mobile-${suggestion.type}-${suggestion.title}`}
                          onClick={() => {
                            handleSuggestionClick(suggestion);
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors duration-200 ${
                            index === selectedIndex
                              ? 'bg-gold/20 border-l-4 border-gold'
                              : 'hover:bg-gold/10'
                          }`}
                        >
                          <span className="text-lg">{suggestion.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-warmWhite truncate">
                              {suggestion.title}
                            </div>
                            <div className="text-sm text-grey truncate">
                              {suggestion.subtitle}
                            </div>
                          </div>
                          <div className="text-xs text-gold uppercase tracking-wide">
                            {suggestion.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Link 
                href="/restaurants" 
                className="block px-4 py-2 text-warmWhite hover:text-gold font-nav font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link 
                href="/areas" 
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
              
              {/* Mobile CTA */}
              <div className="px-4 pt-2">
                <Link 
                  href="/search" 
                  className="block w-full bg-gold text-black px-4 py-3 rounded-lg font-nav font-semibold text-center hover:bg-gold/90 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse All Restaurants
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}