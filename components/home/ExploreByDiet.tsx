import React from 'react';
import Link from 'next/link';
import { getLiveStats } from '../../lib/siteStats';

interface ExploreByDietProps {
  venues?: any[];
}

export default function ExploreByDiet({ venues = [] }: ExploreByDietProps) {
  const stats = getLiveStats();
  
  // Calculate dietary stats from venues if provided, otherwise use live stats
  const dietaryStats = venues.length > 0 ? {
    halal: venues.filter(v => v.halal_verified || v.dietary_tags?.halal).length,
    vegetarian: venues.filter(v => v.vegetarian_options || v.dietary_tags?.vegetarian).length,
    vegan: venues.filter(v => v.vegan_friendly || v.dietary_tags?.vegan).length,
    glutenFree: venues.filter(v => v.gluten_free_options || v.dietary_tags?.gluten_free).length,
  } : {
    halal: stats.halal,
    vegetarian: Math.floor(stats.total * 0.3), // Estimated
    vegan: Math.floor(stats.total * 0.15), // Estimated
    glutenFree: Math.floor(stats.total * 0.25), // Estimated
  };

  const dietOptions = [
    {
      name: 'Halal',
      slug: 'halal',
      icon: '🕌',
      count: dietaryStats.halal,
      href: '/best-halal-restaurants-london',
      description: 'Verified halal options',
      gradient: 'from-green-600 to-emerald-500'
    },
    {
      name: 'Vegetarian',
      slug: 'vegetarian',
      icon: '🥬',
      count: dietaryStats.vegetarian,
      href: '#vegetarian', // Placeholder - would need vegetarian page
      description: 'Plant-based delights',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      name: 'Vegan',
      slug: 'vegan',
      icon: '🌱',
      count: dietaryStats.vegan,
      href: '#vegan', // Placeholder - would need vegan page
      description: 'Completely plant-based',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      name: 'Gluten-Free',
      slug: 'gluten-free',
      icon: '🌾',
      count: dietaryStats.glutenFree,
      href: '#gluten-free', // Placeholder - would need gluten-free page
      description: 'Safe for celiac diets',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Explore by Diet
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find restaurants that cater to your dietary preferences and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dietOptions.map((diet) => (
            <Link
              key={diet.slug}
              href={diet.href}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-neutral-900/70 backdrop-blur transition-all duration-300 group-hover:shadow-xl group-hover:border-gold/30 group-hover:scale-105">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${diet.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {diet.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {diet.name}
                  </h3>
                  
                  <div className="text-2xl font-serif font-bold text-gold mb-2">
                    {diet.count}+
                  </div>
                  
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {diet.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/best-halal-restaurants-london" 
            className="inline-flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300"
          >
            View All Halal Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
}
