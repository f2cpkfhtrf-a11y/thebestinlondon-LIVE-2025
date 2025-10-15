import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import VenueCard from '../components/VenueCard';
import fs from 'fs';
import path from 'path';

export default function CuisinePage({ cuisine, venues, totalVenues }) {
  const [selectedDiet, setSelectedDiet] = useState('all');
  
  const filteredVenues = useMemo(() => {
    if (selectedDiet === 'all') return venues;
    return venues.filter(v => 
      v.dietaryTags?.some(tag => tag.toLowerCase() === selectedDiet.toLowerCase())
    );
  }, [venues, selectedDiet]);

  const cuisineTitle = cuisine.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const dietaryCounts = useMemo(() => ({
    halal: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'halal')).length,
    vegetarian: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'vegetarian')).length,
    vegan: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'vegan')).length,
    'gluten-free': venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'gluten-free')).length,
  }), [venues]);

  return (
    <>
      <Head>
        <title>{cuisineTitle} Restaurants in London | BestOfLondon</title>
        <meta name="description" content={`Discover the best ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily.`} />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
        {/* Header */}
        <header className="border-b" style={{ borderColor: '#1F1F1F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center space-x-3">
                  <img src="/logo.svg" alt="BestOfLondon" className="h-8" />
                  <span className="text-xl font-bold" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
                    BestOfLondon
                  </span>
                </a>
              </Link>
              <nav className="flex items-center space-x-8">
                <Link href="/restaurants">
                  <a style={{ color: '#9AA0A6' }} className="hover:opacity-80">Restaurants</a>
                </Link>
                <Link href="/">
                  <a style={{ color: '#9AA0A6' }} className="hover:opacity-80">Home</a>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="border-b" style={{ borderColor: '#1F1F1F', background: 'linear-gradient(180deg, #0B0B0B 0%, #161616 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
              {cuisineTitle} Restaurants
            </h1>
            <p className="text-xl mb-2" style={{ color: '#9AA0A6' }}>
              {totalVenues} curated {cuisineTitle.toLowerCase()} restaurants in London
            </p>
            <p className="text-sm" style={{ color: '#D4AF37' }}>
              Verified • FSA Rated • Updated Daily
            </p>
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="border-b" style={{ borderColor: '#1F1F1F', backgroundColor: '#0F0F0F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
              <button
                onClick={() => setSelectedDiet('all')}
                className="px-6 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: selectedDiet === 'all' ? '#D4AF37' : '#1F1F1F',
                  color: selectedDiet === 'all' ? '#0B0B0B' : '#FAFAFA',
                  fontWeight: selectedDiet === 'all' ? '600' : '400'
                }}
              >
                All ({totalVenues})
              </button>
              {dietaryCounts.halal > 0 && (
                <button
                  onClick={() => setSelectedDiet('halal')}
                  className="px-6 py-2 rounded-full transition-all"
                  style={{
                    backgroundColor: selectedDiet === 'halal' ? '#D4AF37' : '#1F1F1F',
                    color: selectedDiet === 'halal' ? '#0B0B0B' : '#FAFAFA',
                    fontWeight: selectedDiet === 'halal' ? '600' : '400'
                  }}
                >
                  Halal ({dietaryCounts.halal})
                </button>
              )}
              {dietaryCounts.vegetarian > 0 && (
                <button
                  onClick={() => setSelectedDiet('vegetarian')}
                  className="px-6 py-2 rounded-full transition-all"
                  style={{
                    backgroundColor: selectedDiet === 'vegetarian' ? '#D4AF37' : '#1F1F1F',
                    color: selectedDiet === 'vegetarian' ? '#0B0B0B' : '#FAFAFA',
                    fontWeight: selectedDiet === 'vegetarian' ? '600' : '400'
                  }}
                >
                  Vegetarian ({dietaryCounts.vegetarian})
                </button>
              )}
              {dietaryCounts.vegan > 0 && (
                <button
                  onClick={() => setSelectedDiet('vegan')}
                  className="px-6 py-2 rounded-full transition-all"
                  style={{
                    backgroundColor: selectedDiet === 'vegan' ? '#D4AF37' : '#1F1F1F',
                    color: selectedDiet === 'vegan' ? '#0B0B0B' : '#FAFAFA',
                    fontWeight: selectedDiet === 'vegan' ? '600' : '400'
                  }}
                >
                  Vegan ({dietaryCounts.vegan})
                </button>
              )}
              {dietaryCounts['gluten-free'] > 0 && (
                <button
                  onClick={() => setSelectedDiet('gluten-free')}
                  className="px-6 py-2 rounded-full transition-all"
                  style={{
                    backgroundColor: selectedDiet === 'gluten-free' ? '#D4AF37' : '#1F1F1F',
                    color: selectedDiet === 'gluten-free' ? '#0B0B0B' : '#FAFAFA',
                    fontWeight: selectedDiet === 'gluten-free' ? '600' : '400'
                  }}
                >
                  Gluten-Free ({dietaryCounts['gluten-free']})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl mb-4" style={{ color: '#9AA0A6' }}>
                No {selectedDiet !== 'all' ? selectedDiet : ''} restaurants found
              </p>
              <button
                onClick={() => setSelectedDiet('all')}
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: '#D4AF37', color: '#0B0B0B', fontWeight: '600' }}
              >
                View All {totalVenues} Restaurants
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map(venue => (
                <VenueCard key={venue.slug} venue={venue} />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t mt-16" style={{ borderColor: '#1F1F1F', backgroundColor: '#0F0F0F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <Link href="/">
                <a className="inline-flex items-center space-x-3 mb-4">
                  <img src="/logo.svg" alt="BestOfLondon" className="h-8" />
                  <span className="text-xl font-bold" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
                    BestOfLondon
                  </span>
                </a>
              </Link>
              <p style={{ color: '#9AA0A6' }} className="text-sm">
                Curated • Verified • Updated Daily
              </p>
              <p style={{ color: '#6B7280' }} className="text-xs mt-4">
                © 2025 BestOfLondon. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
  const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(data) ? data : (data.venues || []);

  // Get all unique cuisines
  const cuisines = new Set();
  venues.forEach(venue => {
    if (venue.cuisines) {
      venue.cuisines.forEach(cuisine => {
        cuisines.add(cuisine.toLowerCase().trim());
      });
    }
  });

  const paths = Array.from(cuisines).map(cuisine => ({
    params: { cuisine: cuisine.replace(/\s+/g, '-') }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
  const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const allVenues = Array.isArray(data) ? data : (data.venues || []);

  // Convert URL cuisine param back to match data format
  const cuisineParam = params.cuisine.replace(/-/g, ' ').toLowerCase();

  // Filter venues that have this cuisine in ANY of their cuisine tags
  const venues = allVenues.filter(venue => {
    if (!venue.cuisines || !Array.isArray(venue.cuisines)) return false;
    return venue.cuisines.some(c => c.toLowerCase().trim() === cuisineParam);
  });

  return {
    props: {
      cuisine: cuisineParam,
      venues,
      totalVenues: venues.length
    }
  };
}
