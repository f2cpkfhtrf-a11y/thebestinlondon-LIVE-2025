import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GlobalTabs = ({ currentPath, className = '' }) => {
  const tabs = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Restaurants', path: '/restaurants', icon: '🍴' },
    { name: 'Cuisines', path: '/cuisines', icon: '🥘' },
    { name: 'Areas', path: '/areas', icon: '📍' },
    { name: 'Halal', path: '/best-halal-restaurants-london', icon: '🕌' },
    { name: 'Near Me', path: '/nearby', icon: '📍' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📞' }
  ];

  return (
    <nav className={`bg-gradient-to-r from-charcoal via-black-light to-charcoal border-b border-gold/20 sticky top-0 z-40 backdrop-blur-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = currentPath === tab.path || 
              (tab.path !== '/' && currentPath && currentPath.startsWith(tab.path));
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'border-gold text-gold'
                    : 'border-transparent text-warmWhite hover:text-gold hover:border-gold/50'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const SubTabs = ({ tabs, currentPath, className = '' }) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <nav className={`bg-gradient-to-r from-black-light/80 via-charcoal/90 to-black-light/80 border-b border-gold/10 sticky top-16 z-30 backdrop-blur-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-6 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = currentPath === tab.path;
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'border-gold text-gold'
                    : 'border-transparent text-warmWhite hover:text-gold hover:border-gold/50'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const RestaurantDetailTabs = ({ venue, currentPath, className = '' }) => {
  const tabs = [
    { name: 'Overview', path: `/restaurant/${venue.slug}`, icon: '📋' },
    { name: 'Menu', path: `/restaurant/${venue.slug}/menu`, icon: '🍽️' },
    { name: 'Reviews', path: `/restaurant/${venue.slug}/reviews`, icon: '⭐' },
    { name: 'Location', path: `/restaurant/${venue.slug}/location`, icon: '📍' },
    { name: 'Similar', path: `/restaurant/${venue.slug}/similar`, icon: '🔍' }
  ];

  return <SubTabs tabs={tabs} currentPath={currentPath} className={className} />;
};

const CuisinePageTabs = ({ cuisine, currentPath, className = '' }) => {
  const tabs = [
    { name: 'Top Rated', path: `/cuisine/${cuisine}`, icon: '⭐' },
    { name: 'Trending', path: `/cuisine/${cuisine}/trending`, icon: '🔥' },
    { name: 'New', path: `/cuisine/${cuisine}/new`, icon: '🆕' }
  ];

  return <SubTabs tabs={tabs} currentPath={currentPath} className={className} />;
};

const AreaPageTabs = ({ area, currentPath, className = '' }) => {
  const tabs = [
    { name: 'Top Rated', path: `/area/${area}`, icon: '⭐' },
    { name: 'New', path: `/area/${area}/new`, icon: '🆕' },
    { name: 'Map', path: `/area/${area}/map`, icon: '🗺️' }
  ];

  return <SubTabs tabs={tabs} currentPath={currentPath} className={className} />;
};

const HalalPageTabs = ({ currentPath, className = '' }) => {
  const tabs = [
    { name: 'All', path: '/best-halal-restaurants-london', icon: '🕌' },
    { name: 'By Area', path: '/best-halal-restaurants-london/by-area', icon: '📍' },
    { name: 'By Cuisine', path: '/best-halal-restaurants-london/by-cuisine', icon: '🥘' },
    { name: 'Map', path: '/best-halal-restaurants-london/map', icon: '🗺️' }
  ];

  return <SubTabs tabs={tabs} currentPath={currentPath} className={className} />;
};

const MobileTabs = ({ tabs, currentPath, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`lg:hidden ${className}`}>
      {/* Mobile Tab Scroller */}
      <div className="bg-gradient-to-r from-charcoal via-black-light to-charcoal border-b border-gold/20 overflow-x-auto backdrop-blur-sm">
        <div className="flex space-x-4 px-4 py-3 min-w-max">
          {tabs.map(tab => {
            const isActive = currentPath === tab.path;
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gold text-black'
                    : 'bg-black-light/50 text-warmWhite hover:bg-gold/20 hover:text-gold'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TabContainer = ({ children, currentPath, pageType, venue, cuisine, area, className = '' }) => {
  const router = useRouter();
  
  // Global tabs for all pages
  const globalTabs = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Restaurants', path: '/restaurants', icon: '🍴' },
    { name: 'Cuisines', path: '/cuisines', icon: '🥘' },
    { name: 'Areas', path: '/areas', icon: '📍' },
    { name: 'Halal', path: '/best-halal-restaurants-london', icon: '🕌' },
    { name: 'Near Me', path: '/nearby', icon: '📍' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📞' }
  ];

  return (
    <div className={`space-y-0 ${className}`}>
      {/* Global Tabs - Desktop */}
      <div className="hidden lg:block">
        <GlobalTabs currentPath={currentPath} />
      </div>
      
      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <MobileTabs tabs={globalTabs} currentPath={currentPath} />
      </div>
      
      {/* Page-Specific Sub-Tabs */}
      {pageType === 'restaurant' && venue && (
        <RestaurantDetailTabs venue={venue} currentPath={currentPath} />
      )}
      
      {pageType === 'cuisine' && cuisine && (
        <CuisinePageTabs cuisine={cuisine} currentPath={currentPath} />
      )}
      
      {pageType === 'area' && area && (
        <AreaPageTabs area={area} currentPath={currentPath} />
      )}
      
      {pageType === 'halal' && (
        <HalalPageTabs currentPath={currentPath} />
      )}
      
      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export { 
  GlobalTabs, 
  SubTabs, 
  RestaurantDetailTabs, 
  CuisinePageTabs, 
  AreaPageTabs, 
  HalalPageTabs, 
  MobileTabs, 
  TabContainer 
};
