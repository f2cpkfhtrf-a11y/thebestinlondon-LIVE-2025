import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { assertLocalImage } from '../lib/assertLocalImage';
import { getBlurAndColor } from '../lib/imagePlaceholders';
import { isValidFsaScore, getFsaDisplayValue } from '../lib/fsa';
import { appendVersion } from '../lib/resolveAssets';

const StandardizedCard = ({ 
  venue, 
  className = '',
  showBadges = true,
  showRating = true,
  showLocation = true
}) => {
  const {
    name,
    image_card_path,
    image_url,
    photos,
    cuisines,
    rating,
    user_ratings_total,
    vicinity,
    borough,
    area,
    price_range,
    price_level,
    halal_certified,
    fsa_rating,
    dietary_tags
  } = venue;
  
  // Get the best available image using the same resolver chain as PageHero
  const getImageUrl = () => {
    // Primary: Use provided venue card path if available
    if (image_card_path && !image_card_path.includes('placeholder')) {
      const localPath = image_card_path.replace('/public', '');
      assertLocalImage(localPath);
      return localPath;
    }
    
    // Secondary: Try venue-specific card (this would be resolved at build time ideally)
    const venueSlug = venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (venueSlug) {
      const venueCardPath = `/images/restaurants/${venueSlug}/${venueSlug}-card.webp`;
      // Note: We can't check file existence client-side, but this path will work if the file exists
      return venueCardPath;
    }
    
    // Tertiary: Try cuisine-based card/hero fallback
    if (cuisines && cuisines[0]) {
      const cuisineSlug = cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `/images/cuisines/${cuisineSlug}-card.webp`;
    }
    
    // Quaternary: Try area-based fallback
    if (area || borough) {
      const areaSlug = (area || borough).toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `/images/areas/${areaSlug}-card.webp`;
    }
    
    // Fallback to default card
    return "/images/heroes/site/default-card.webp";
  };
  
  const imageUrl = appendVersion(getImageUrl());
  const location = vicinity || borough || area;
  
  // Get blur and dominant color for the image (with error handling for JS)
  let blurAndColor = {};
  try {
    blurAndColor = getBlurAndColor(imageUrl);
  } catch (e) {
    // Fallback if getBlurAndColor fails
    blurAndColor = { color: '#1E1B18' };
  }
  
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Image with standardized overlay */}
      <div 
        className="relative h-48 overflow-hidden aspect-[16/10]"
        style={{ backgroundColor: blurAndColor.color }}
      >
                {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} - ${cuisines?.join(', ')} restaurant in ${location || 'London'}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-opacity duration-300"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Try fallback chain: cuisine default → site default
              const currentSrc = e.target.src;
              const fallbacks = [];
              
              // Try cuisine fallback
              if (cuisines && cuisines[0]) {
                const cuisineSlug = cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
                fallbacks.push(`/images/heroes/cuisines/${cuisineSlug}.webp`);
              }
              
              // Try area fallback
              if (area || borough) {
                const areaSlug = (area || borough).toLowerCase().replace(/[^a-z0-9]/g, '-');
                fallbacks.push(`/images/heroes/areas/${areaSlug}.webp`);
              }
              
              // Final fallback
              fallbacks.push('/images/heroes/site/default-list-hero.webp');
              
              const nextFallback = fallbacks.find(fallback => !currentSrc.includes(fallback.split('/').pop()));
              
              if (nextFallback && nextFallback !== currentSrc) {
                e.target.src = nextFallback;
              } else {
                // Show cuisine icon fallback
                e.target.style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-gold/20 to-black flex items-center justify-center';
                fallbackDiv.innerHTML = `
                  <div class="text-center text-gold/60">
                    <div class="text-4xl mb-2">🍽️</div>
                    <div class="text-sm">${cuisines?.[0] || 'Restaurant'}</div>
                  </div>
                `;
                e.target.parentElement.appendChild(fallbackDiv);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-black flex items-center justify-center">
            <div className="text-center text-gold/60">
              <div className="text-4xl mb-2">🍽️</div>
              <div className="text-sm">{cuisines?.[0] || 'Restaurant'}</div>
            </div>
          </div>
        )}
        
        {/* Standardized dark-to-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        {/* Badges positioned consistently */}
        {showBadges && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {halal_certified && (
              <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                🕌 Halal
              </span>
            )}
            {isValidFsaScore(fsa_rating) && (
              <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded" data-fsa="visible">
                🏆 FSA {getFsaDisplayValue(fsa_rating)}
              </span>
            )}
            {dietary_tags?.vegan && (
              <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                🌱 Vegan
              </span>
            )}
            {dietary_tags?.vegetarian && (
              <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                🥗 Vegetarian
              </span>
            )}
          </div>
        )}
        
        {/* Rating badge */}
        {showRating && rating && (
          <div className="absolute top-3 right-3">
            <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
              ⭐ {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      {/* Content with standardized spacing */}
      <div className="p-4">
        {/* Title with consistent spacing */}
        <h3 className="text-xl font-bold text-white mb-2 mt-4 line-clamp-2">
          {name}
        </h3>
        
        {/* Cuisine tags */}
        {cuisines && cuisines.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {cuisines.slice(0, 2).map((cuisine, index) => (
              <span 
                key={index}
                className="text-xs text-warmWhite/90 bg-warmWhite/10 px-2 py-1 rounded"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}
        
        {/* Location with consistent styling */}
        {showLocation && location && (
          <p className="text-sm text-warmWhite/90 mb-2">
            📍 {location}
          </p>
        )}
        
        {/* Price range */}
        {(price_range || price_level) && (
          <p className="text-sm text-warmWhite/90">
            💰 {price_range || '£'.repeat(price_level || 1)}
          </p>
        )}
        
        {/* Reviews count */}
        {user_ratings_total && (
          <p className="text-xs text-warmWhite/70 mt-2">
            {user_ratings_total.toLocaleString()} reviews
          </p>
        )}
      </div>
    </div>
  );
};

export default StandardizedCard;
