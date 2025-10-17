import { useState, useEffect } from 'react';
import Link from 'next/link';

const FilterBar = ({ 
  venues = [], 
  onFilteredVenues, 
  cuisine = null, 
  area = null,
  showAreaFilter = true,
  showCuisineFilter = true,
  showDietaryFilter = true,
  showRatingFilter = true
}) => {
  const [filters, setFilters] = useState({
    area: area || '',
    cuisine: cuisine || '',
    dietary: '',
    rating: '',
    sortBy: 'rating'
  });

  // Get unique values for filter options
  const uniqueAreas = [...new Set(venues.map(v => v.borough).filter(Boolean))].sort();
  const uniqueCuisines = [...new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean))].sort();
  const uniqueDietary = [...new Set(venues.flatMap(v => Object.keys(v.dietary_tags || {}).filter(tag => v.dietary_tags[tag])))];

  // Apply filters
  useEffect(() => {
    let filtered = [...venues];

    // Area filter
    if (filters.area) {
      filtered = filtered.filter(v => v.borough === filters.area);
    }

    // Cuisine filter
    if (filters.cuisine) {
      filtered = filtered.filter(v => v.cuisines && v.cuisines.includes(filters.cuisine));
    }

    // Dietary filter
    if (filters.dietary) {
      filtered = filtered.filter(v => v.dietary_tags && v.dietary_tags[filters.dietary]);
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(v => v.rating && v.rating >= minRating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
        break;
      case 'bil_score':
        filtered.sort((a, b) => {
          const scoreA = calculateBILScore(a);
          const scoreB = calculateBILScore(b);
          return scoreB - scoreA;
        });
        break;
    }

    onFilteredVenues(filtered);
  }, [filters, venues, onFilteredVenues]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      area: area || '',
      cuisine: cuisine || '',
      dietary: '',
      rating: '',
      sortBy: 'rating'
    });
  };

  const calculateBILScore = (venue) => {
    const googleRating = venue.google_rating || 0;
    const reviewCount = venue.review_count || 0;
    const fsaRating = venue.fsa_rating || 0;
    
    const googleWeight = 0.6;
    const reviewWeight = 0.2;
    const fsaWeight = 0.2;
    
    const reviewScore = Math.min(10, (reviewCount / 50) * 5 + 5);
    const bilScore = (googleRating * googleWeight) + (reviewScore * reviewWeight) + (fsaRating * fsaWeight);
    
    return Math.min(10, Math.max(0, bilScore));
  };

  return (
    <div className="bg-charcoal/95 backdrop-blur-md border-b border-grey-dark sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Area Filter */}
          {showAreaFilter && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-grey">Area:</label>
              <select
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
              >
                <option value="">All Areas</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          )}

          {/* Cuisine Filter */}
          {showCuisineFilter && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-grey">Cuisine:</label>
              <select
                value={filters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
              >
                <option value="">All Cuisines</option>
                {uniqueCuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
          )}

          {/* Dietary Filter */}
          {showDietaryFilter && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-grey">Dietary:</label>
              <select
                value={filters.dietary}
                onChange={(e) => handleFilterChange('dietary', e.target.value)}
                className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
              >
                <option value="">All Options</option>
                {uniqueDietary.map(dietary => (
                  <option key={dietary} value={dietary}>{dietary}</option>
                ))}
              </select>
            </div>
          )}

          {/* Rating Filter */}
          {showRatingFilter && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-grey">Min Rating:</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>
          )}

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-grey">Sort:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
            >
              <option value="rating">Rating</option>
              <option value="bil_score">BIL Score</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-sm text-grey hover:text-gold transition-colors duration-300 underline"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
