import React, { useState, useEffect } from 'react';
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
    <div className={`${isSticky ? 'fixed top-0 left-0 right-0 z-40' : 'relative'} bg-grey-dark/95 backdrop-blur-sm border-b border-gold/20`}>
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${activeTab === tab.href ? 'bg-gold text-grey-dark font-semibold' : 'text-white hover:bg-grey-light hover:text-gold'}`}
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
