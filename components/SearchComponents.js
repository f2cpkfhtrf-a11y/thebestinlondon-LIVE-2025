import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ venues, onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const router = useRouter();

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const results = [];
    const queryLower = query.toLowerCase();
    
    // Search restaurants
    const restaurantMatches = venues
      .filter(venue => 
        venue.name.toLowerCase().includes(queryLower) ||
        venue.description?.toLowerCase().includes(queryLower)
      )
      .slice(0, 5)
      .map(venue => ({
        type: 'restaurant',
        title: venue.name,
        subtitle: `${venue.area || venue.borough} • ${venue.cuisines?.[0] || 'Restaurant'}`,
        url: `/restaurant/${venue.slug}`,
        icon: '🍴'
      }));
    
    // Search cuisines
    const cuisineMatches = [...new Set(venues.map(v => v.cuisines).flat())]
      .filter(cuisine => cuisine.toLowerCase().includes(queryLower))
      .slice(0, 3)
      .map(cuisine => ({
        type: 'cuisine',
        title: cuisine,
        subtitle: `${venues.filter(v => v.cuisines?.includes(cuisine)).length} restaurants`,
        url: `/cuisine/${cuisine.toLowerCase().replace(/\s+/g, '-')}`,
        icon: '🥘'
      }));
    
    // Search areas
    const areaMatches = [...new Set(venues.map(v => v.area || v.borough).filter(Boolean))]
      .filter(area => area.toLowerCase().includes(queryLower))
      .slice(0, 3)
      .map(area => ({
        type: 'area',
        title: area,
        subtitle: `${venues.filter(v => (v.area || v.borough) === area).length} restaurants`,
        url: `/area/${area.toLowerCase().replace(/\s+/g, '-')}`,
        icon: '📍'
      }));
    
    return [...restaurantMatches, ...cuisineMatches, ...areaMatches];
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(generateSuggestions(value));
    setShowSuggestions(value.length >= 2);
    setSelectedIndex(-1);
  };

  // Handle key navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    
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
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
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
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    router.push(suggestion.url);
  };

  // Handle search
  const handleSearch = () => {
    if (!query.trim()) return;
    
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(query);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants, cuisines, areas..."
          className="w-full px-4 py-3 pl-12 pr-16 bg-charcoal border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-warmWhite placeholder-grey"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gold text-black font-medium rounded-md hover:bg-gold/90 transition-colors duration-200"
        >
          Search
        </button>
      </div>
      
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
  );
};

const SearchResults = ({ query, venues, onFilterChange }) => {
  const [filters, setFilters] = useState({
    cuisine: '',
    area: '',
    rating: '',
    price: '',
    dietary: ''
  });
  
  // Filter venues based on query and filters
  const filteredVenues = venues.filter(venue => {
    // Text search
    if (query) {
      const queryLower = query.toLowerCase();
      const matchesName = venue.name.toLowerCase().includes(queryLower);
      const matchesDescription = venue.description?.toLowerCase().includes(queryLower);
      const matchesCuisine = venue.cuisines?.some(c => c.toLowerCase().includes(queryLower));
      const matchesArea = (venue.area || venue.borough)?.toLowerCase().includes(queryLower);
      
      if (!matchesName && !matchesDescription && !matchesCuisine && !matchesArea) {
        return false;
      }
    }
    
    // Cuisine filter
    if (filters.cuisine && !venue.cuisines?.includes(filters.cuisine)) {
      return false;
    }
    
    // Area filter
    if (filters.area && (venue.area || venue.borough) !== filters.area) {
      return false;
    }
    
    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (venue.rating < minRating) {
        return false;
      }
    }
    
    // Price filter
    if (filters.price && venue.price_level !== parseInt(filters.price)) {
      return false;
    }
    
    // Dietary filter
    if (filters.dietary && !venue.dietary_tags?.[filters.dietary]) {
      return false;
    }
    
    return true;
  });
  
  // Handle filter change
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Get unique values for filters
  const cuisines = [...new Set(venues.map(v => v.cuisines).flat())].filter(Boolean);
  const areas = [...new Set(venues.map(v => v.area || v.borough).filter(Boolean))];
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gradient-to-r from-charcoal via-black-light to-charcoal rounded-lg p-4 shadow-sm border border-gold/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Cuisine Filter */}
          <select
            value={filters.cuisine}
            onChange={(e) => handleFilterChange('cuisine', e.target.value)}
            className="px-3 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-charcoal text-warmWhite"
          >
            <option value="">All Cuisines</option>
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
          
          {/* Area Filter */}
          <select
            value={filters.area}
            onChange={(e) => handleFilterChange('area', e.target.value)}
            className="px-3 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-charcoal text-warmWhite"
          >
            <option value="">All Areas</option>
            {areas.map(area => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          
          {/* Rating Filter */}
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="px-3 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-charcoal text-warmWhite"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
          
          {/* Price Filter */}
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="px-3 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-charcoal text-warmWhite"
          >
            <option value="">All Prices</option>
            <option value="1">£</option>
            <option value="2">££</option>
            <option value="3">£££</option>
            <option value="4">££££</option>
          </select>
          
          {/* Dietary Filter */}
          <select
            value={filters.dietary}
            onChange={(e) => handleFilterChange('dietary', e.target.value)}
            className="px-3 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-charcoal text-warmWhite"
          >
            <option value="">All Dietary</option>
            <option value="halal">Halal</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten_free">Gluten Free</option>
          </select>
        </div>
      </div>
      
      {/* Results */}
      <div className="space-y-4">
        <div className="text-lg font-semibold text-warmWhite">
          {filteredVenues.length} restaurants found
          {query && (
            <span className="text-grey font-normal">
              {' '}for "{query}"
            </span>
          )}
        </div>
        
        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <div key={venue.place_id} className="bg-gradient-to-br from-charcoal via-black-light to-charcoal rounded-lg shadow-sm border border-gold/20 overflow-hidden hover:shadow-md hover:border-gold/40 transition-all duration-200">
              {/* Image */}
              <div className="aspect-w-16 aspect-h-9 bg-grey-light">
                <img
                  src={venue.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85'}
                  alt={venue.image_alt || `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-warmWhite mb-2">
                  {venue.name}
                </h3>
                
                <div className="space-y-2 text-sm text-grey">
                  <div className="flex items-center space-x-1">
                    <span>📍</span>
                    <span>{venue.area || venue.borough}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span>🥘</span>
                    <span>{venue.cuisines?.[0] || 'Restaurant'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{venue.rating} ({venue.user_ratings_total} reviews)</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gold font-semibold">
                      {venue.price_level ? '£'.repeat(venue.price_level) : '££'}
                    </span>
                  </div>
                  
                  <a
                    href={`/restaurant/${venue.slug}`}
                    className="text-gold hover:text-gold/80 font-medium"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SearchBar, SearchResults };
