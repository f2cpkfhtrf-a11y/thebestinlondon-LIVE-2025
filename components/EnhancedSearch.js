import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const EnhancedSearch = ({ placeholder = "Search restaurants, cuisines, areas..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Load search data
    fetch('/search-data.json')
      .then(res => res.json())
      .then(data => {
        const searchResults = [];
        
        // Search restaurants
        data.restaurants.forEach(restaurant => {
          if (restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
              restaurant.cuisines.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
              restaurant.area.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
              type: 'restaurant',
              title: restaurant.name,
              subtitle: `${restaurant.cuisines.join(', ')} • ${restaurant.area}`,
              url: `/restaurant/${restaurant.slug}`,
              icon: '🍽️',
              rating: restaurant.rating,
              priceRange: restaurant.priceRange
            });
          }
        });
        
        // Search cuisines
        data.cuisines.forEach(cuisine => {
          if (cuisine.name.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
              type: 'cuisine',
              title: cuisine.name,
              subtitle: `${cuisine.count} restaurants`,
              url: `/${cuisine.slug}`,
              icon: '🍜'
            });
          }
        });
        
        // Search areas
        data.areas.forEach(area => {
          if (area.name.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
              type: 'area',
              title: area.name,
              subtitle: `${area.count} restaurants`,
              url: `/restaurants-${area.slug}`,
              icon: '📍'
            });
          }
        });
        
        setResults(searchResults.slice(0, 10)); // Limit to 10 results
        setIsOpen(searchResults.length > 0);
      })
      .catch(error => {
        console.error('Search error:', error);
        setResults([]);
        setIsOpen(false);
      });
  }, [query]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = results[selectedIndex].url;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(results.length > 0)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 bg-white/10 border border-gold/20 rounded-lg text-white placeholder-grey-light focus:outline-none focus:border-gold focus:bg-white/20 transition-all"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-light">
          🔍
        </div>
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-grey-dark border border-gold/20 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <Link
              key={index}
              href={result.url}
              className={`block px-4 py-3 hover:bg-grey-light transition-colors ${index === selectedIndex ? 'bg-grey-light' : ''}`}
              onClick={() => {
                setIsOpen(false);
                setSelectedIndex(-1);
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{result.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium">{result.title}</div>
                  <div className="text-grey-light text-sm">{result.subtitle}</div>
                </div>
                {result.rating && (
                  <div className="text-gold text-sm">
                    ⭐ {result.rating}
                  </div>
                )}
                {result.priceRange && (
                  <div className="text-gold text-sm">
                    {result.priceRange}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
