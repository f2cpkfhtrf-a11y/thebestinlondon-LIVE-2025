const fs = require('fs');
const path = require('path');

// Search and Navigation System
function buildSearchAndNavigation() {
  console.log('🔍 BUILDING SEARCH & NAVIGATION SYSTEM...\n');
  
  const searchData = {
    timestamp: new Date().toISOString(),
    restaurants: [],
    cuisines: [],
    areas: [],
    totalEntries: 0
  };
  
  // 1. Load venue data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  console.log(`📊 Processing ${venuesData.venues.length} venues for search data...`);
  
  // 2. Build restaurant search data
  venuesData.venues.forEach(venue => {
    searchData.restaurants.push({
      name: venue.name,
      slug: venue.slug,
      cuisines: venue.cuisines || [],
      area: venue.borough || venue.address?.formatted || 'London',
      rating: venue.rating || 0,
      priceRange: venue.price_range || '£',
      address: venue.address?.formatted || venue.vicinity || '',
      phone: venue.phone || '',
      website: venue.website || '',
      image: venue.image_url || '',
      tags: venue.dietary_tags || {}
    });
  });
  
  // 3. Build cuisine search data
  const cuisineSet = new Set();
  venuesData.venues.forEach(venue => {
    if (venue.cuisines) {
      venue.cuisines.forEach(cuisine => {
        cuisineSet.add(cuisine.toLowerCase());
      });
    }
  });
  
  searchData.cuisines = Array.from(cuisineSet).map(cuisine => ({
    name: cuisine,
    slug: cuisine.toLowerCase().replace(/\s+/g, '-'),
    count: venuesData.venues.filter(v => v.cuisines?.some(c => c.toLowerCase() === cuisine)).length
  }));
  
  // 4. Build area search data
  const areaSet = new Set();
  venuesData.venues.forEach(venue => {
    const area = venue.borough || venue.address?.formatted || 'London';
    areaSet.add(area);
  });
  
  searchData.areas = Array.from(areaSet).map(area => ({
    name: area,
    slug: area.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    count: venuesData.venues.filter(v => (v.borough || v.address?.formatted || 'London') === area).length
  }));
  
  searchData.totalEntries = searchData.restaurants.length + searchData.cuisines.length + searchData.areas.length;
  
  // 5. Create search data file
  const searchDataPath = path.join(__dirname, '../public/search-data.json');
  fs.writeFileSync(searchDataPath, JSON.stringify(searchData, null, 2));
  
  // 6. Create enhanced search component
  const searchComponentPath = path.join(__dirname, '../components/EnhancedSearch.js');
  const searchComponentContent = `import React, { useState, useEffect, useRef } from 'react';
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
              subtitle: \`\${restaurant.cuisines.join(', ')} • \${restaurant.area}\`,
              url: \`/restaurant/\${restaurant.slug}\`,
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
              subtitle: \`\${cuisine.count} restaurants\`,
              url: \`/\${cuisine.slug}\`,
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
              subtitle: \`\${area.count} restaurants\`,
              url: \`/restaurants-\${area.slug}\`,
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
              className={\`block px-4 py-3 hover:bg-grey-light transition-colors \${index === selectedIndex ? 'bg-grey-light' : ''}\`}
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
`;
  
  fs.writeFileSync(searchComponentPath, searchComponentContent);
  
  // 7. Create navigation tabs component
  const tabsComponentPath = path.join(__dirname, '../components/NavigationTabs.js');
  const tabsComponentContent = `import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavigationTabs = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);

  const tabs = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Restaurants', href: '/restaurants', icon: '🍽️' },
    { name: 'Cuisines', href: '/cuisines', icon: '🍜' },
    { name: 'Areas', href: '/areas', icon: '📍' },
    { name: 'Halal', href: '/best-halal-restaurants-london', icon: '🕌' },
    { name: 'Near Me', href: '/nearby', icon: '📍' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📞' }
  ];

  return (
    <div className={\`\${isSticky ? 'fixed top-0 left-0 right-0 z-40' : 'relative'} bg-grey-dark/95 backdrop-blur-sm border-b border-gold/20\`}>
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={\`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all \${activeTab === tab.href ? 'bg-gold text-grey-dark font-semibold' : 'text-white hover:bg-grey-light hover:text-gold'}\`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="text-white hover:text-gold transition-colors"
            >
              🔍 Search
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;
`;
  
  fs.writeFileSync(tabsComponentPath, tabsComponentContent);
  
  // 8. Generate summary
  console.log('\n📊 SEARCH & NAVIGATION SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Restaurants: ${searchData.restaurants.length}`);
  console.log(`Cuisines: ${searchData.cuisines.length}`);
  console.log(`Areas: ${searchData.areas.length}`);
  console.log(`Total Search Entries: ${searchData.totalEntries}`);
  
  console.log('\n🍽️ TOP RESTAURANTS:');
  searchData.restaurants.slice(0, 5).forEach((restaurant, index) => {
    console.log(`${index + 1}. ${restaurant.name} (${restaurant.cuisines.join(', ')}) - ${restaurant.area}`);
  });
  
  console.log('\n🍜 CUISINES:');
  searchData.cuisines.slice(0, 10).forEach((cuisine, index) => {
    console.log(`${index + 1}. ${cuisine.name} (${cuisine.count} restaurants)`);
  });
  
  console.log('\n📍 AREAS:');
  searchData.areas.slice(0, 10).forEach((area, index) => {
    console.log(`${index + 1}. ${area.name} (${area.count} restaurants)`);
  });
  
  // 9. Save report
  const reportPath = path.join(__dirname, '../reports/search-navigation.md');
  const reportContent = `# Search & Navigation System Report

## Summary
- **Build Date**: ${searchData.timestamp}
- **Restaurants**: ${searchData.restaurants.length}
- **Cuisines**: ${searchData.cuisines.length}
- **Areas**: ${searchData.areas.length}
- **Total Search Entries**: ${searchData.totalEntries}

## Components Created
- \`components/EnhancedSearch.js\` - Predictive search with autocomplete
- \`components/NavigationTabs.js\` - Global navigation tabs
- \`public/search-data.json\` - Search index data

## Search Features
- **Predictive Search**: Real-time suggestions as you type
- **Multi-category**: Restaurants, cuisines, and areas
- **Keyboard Navigation**: Arrow keys, Enter, Escape
- **Visual Indicators**: Icons, ratings, price ranges
- **Responsive Design**: Mobile-friendly interface

## Navigation Features
- **Global Tabs**: Home, Restaurants, Cuisines, Areas, Halal, Near Me, About, Contact
- **Sticky Navigation**: Sticks to top when scrolling
- **Active State**: Highlights current page
- **Mobile Responsive**: Collapses on small screens
- **Smooth Transitions**: Hover effects and animations

## Top Restaurants
${searchData.restaurants.slice(0, 10).map((restaurant, index) => `
${index + 1}. **${restaurant.name}**
   - Cuisines: ${restaurant.cuisines.join(', ')}
   - Area: ${restaurant.area}
   - Rating: ${restaurant.rating}
   - Price: ${restaurant.priceRange}
`).join('')}

## Cuisines Available
${searchData.cuisines.map((cuisine, index) => `
${index + 1}. **${cuisine.name}** (${cuisine.count} restaurants)
`).join('')}

## Areas Covered
${searchData.areas.map((area, index) => `
${index + 1}. **${area.name}** (${area.count} restaurants)
`).join('')}

## Next Steps
1. Integrate search component into header
2. Add navigation tabs to all pages
3. Test search functionality
4. Implement "Near Me" geolocation
5. Add search analytics
`;
  
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n💾 Report saved to: ${reportPath}`);
  console.log(`✅ Search & navigation system complete!`);
  
  return searchData;
}

// Run the build
buildSearchAndNavigation();
