import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <nav className={`bg-white border-b border-grey-light ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = currentPath === tab.path || 
              (tab.path !== '/' && currentPath.startsWith(tab.path));
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'border-gold text-gold'
                    : 'border-transparent text-grey hover:text-gold hover:border-gold/50'
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
    <nav className={`bg-grey-light/10 border-b border-grey-light ${className}`}>
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
                    : 'border-transparent text-grey hover:text-gold hover:border-gold/50'
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

const BackButton = ({ onBack, className = '' }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Save scroll position when component mounts
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      setScrollPosition(parseInt(savedPosition));
    }
  }, []);
  
  const handleBack = () => {
    // Save current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    if (onBack) {
      onBack();
    } else {
      // Default back behavior
      window.history.back();
    }
  };
  
  // Restore scroll position when component mounts
  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
      sessionStorage.removeItem('scrollPosition');
    }
  }, [scrollPosition]);
  
  return (
    <button
      onClick={handleBack}
      className={`flex items-center space-x-2 px-4 py-2 bg-grey-light text-grey rounded-lg hover:bg-grey-light/80 transition-colors duration-200 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  );
};

const Breadcrumbs = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <nav className={`flex items-center space-x-2 text-sm text-grey ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {item.href ? (
            <Link href={item.href} className="hover:text-gold transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-gold font-medium' : ''}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

const MobileNavigation = ({ currentPath, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
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
    <div className={`lg:hidden ${className}`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gold text-black rounded-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Menu</span>
      </button>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
            <div className="p-4">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-8 h-8 bg-grey-light rounded-full ml-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Menu Items */}
              <nav className="mt-6 space-y-2">
                {tabs.map(tab => {
                  const isActive = currentPath === tab.path || 
                    (tab.path !== '/' && currentPath.startsWith(tab.path));
                  
                  return (
                    <Link
                      key={tab.path}
                      href={tab.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-gold text-black'
                          : 'text-grey hover:bg-grey-light/50'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavigationContainer = ({ children, currentPath, subTabs, breadcrumbs, showBackButton = false, onBack, className = '' }) => {
  return (
    <div className={`space-y-0 ${className}`}>
      {/* Global Tabs */}
      <GlobalTabs currentPath={currentPath} />
      
      {/* Sub Tabs */}
      {subTabs && <SubTabs tabs={subTabs} currentPath={currentPath} />}
      
      {/* Breadcrumbs */}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="px-4 sm:px-6 lg:px-8 py-3" />}
      
      {/* Back Button */}
      {showBackButton && <BackButton onBack={onBack} className="px-4 sm:px-6 lg:px-8 py-3" />}
      
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
  BackButton, 
  Breadcrumbs, 
  MobileNavigation, 
  NavigationContainer 
};
