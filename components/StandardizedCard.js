import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { assertLocalImage } from '../lib/assertLocalImage';
import { getBlurAndColor } from '../lib/imagePlaceholders';
import { isValidFsaScore, getFsaDisplayValue } from '../lib/fsa';
import { resolveCardImageSync } from '../lib/resolveHeroImage';
import { getVenueGooglePhotoUrl } from '../lib/getGooglePhotoUrl';

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
    image_hero_path,
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
  } = venue || {};
  
            // Get the best available image using the new resolver
            const getImageUrl = () => {
              try {
                const resolved = resolveCardImageSync({ venue });
                return resolved;
              } catch (error) {
                console.warn(`Failed to resolve image for venue ${venue.slug || venue.name}:`, error);
                // Fallback to old logic if resolver fails
                if (image_card_path && !image_card_path.includes('placeholder')) {
                  const localPath = image_card_path.replace('/public', '');
                  return localPath + (localPath.includes('?') ? '&' : '?') + 'v=' + (process.env.NEXT_PUBLIC_ASSET_VERSION || '1');
                }
                return '/images/heroes/site-default.webp?v=' + (process.env.NEXT_PUBLIC_ASSET_VERSION || '1');
              }
            };
  
  const imageUrl = getImageUrl();
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
    <div className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer ${className}`}>
      {/* Image with standardized overlay - larger and optimized */}
      <div 
        className="relative h-64 overflow-hidden aspect-[16/10]"
        style={{ backgroundColor: blurAndColor.color }}
      >
                {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} - ${cuisines?.join(', ')} restaurant in ${location || 'London'}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-out"
            loading="lazy"
            decoding="async"
            style={{ 
              filter: 'brightness(0.9) contrast(1.1)',
              transition: 'transform 0.5s ease-out, filter 0.3s ease-out'
            }}
            onError={(e) => {
              // Prevent infinite loop
              if (e.target.dataset.fallbackAttempted === 'true') {
                // Already tried fallback - show gradient placeholder instead of black
                e.target.style.display = 'none';
                if (!e.target.parentElement.querySelector('.fallback-gradient')) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'fallback-gradient w-full h-full bg-gradient-to-br from-gold/20 via-gold/10 to-black flex items-center justify-center';
                  fallbackDiv.innerHTML = `
                    <div class="text-center text-gold/60">
                      <div class="text-4xl mb-2">🍽️</div>
                      <div class="text-sm">${cuisines?.[0] || 'Restaurant'}</div>
                    </div>
                  `;
                  e.target.parentElement.appendChild(fallbackDiv);
                }
                return;
              }
              
              e.target.dataset.fallbackAttempted = 'true';
              const currentSrc = e.target.src.split('?')[0]; // Remove version params
              
              // First try: Google Places Photo API (REAL restaurant images!)
              try {
                const googlePhotoUrl = getVenueGooglePhotoUrl(venue, 800);
                if (googlePhotoUrl && !currentSrc.includes('maps.googleapis.com')) {
                  e.target.src = googlePhotoUrl;
                  return;
                }
              } catch (err) {
                // Continue to fallbacks if Google photo fails
              }
              
              // Fallback chain: cuisine tile → area tile → default
              let nextFallback = null;
              
              // Try cuisine tile first (most relevant)
              if (cuisines && cuisines[0]) {
                const cuisineSlug = cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
                nextFallback = `/images/tiles/cuisines/${cuisineSlug}.webp?v=fallback`;
                
                // Try hero version too
                if (!nextFallback || currentSrc.includes(cuisineSlug)) {
                  nextFallback = `/images/heroes/cuisines/${cuisineSlug}.webp?v=fallback`;
                }
              }
              
              // Try area tile
              if (!nextFallback && (area || borough)) {
                const areaSlug = (area || borough).toLowerCase().replace(/[^a-z0-9]/g, '-');
                nextFallback = `/images/tiles/areas/${areaSlug}.webp?v=fallback`;
              }
              
              // Final fallback - always use cuisine default to avoid black tiles
              if (!nextFallback || currentSrc === nextFallback.split('?')[0]) {
                nextFallback = '/images/tiles/cuisines/default.webp?v=fallback';
                // Last resort
                if (currentSrc.includes('default')) {
                  nextFallback = '/images/heroes/site/default-card.webp?v=fallback';
                }
              }
              
              // Only try next fallback if it's different from current
              if (nextFallback && !currentSrc.includes(nextFallback.split('/').pop().split('?')[0])) {
                e.target.src = nextFallback;
              } else {
                // Already tried all fallbacks - show gradient
                e.target.style.display = 'none';
                if (!e.target.parentElement.querySelector('.fallback-gradient')) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'fallback-gradient w-full h-full bg-gradient-to-br from-gold/20 via-gold/10 to-black flex items-center justify-center';
                  fallbackDiv.innerHTML = `
                    <div class="text-center text-gold/60">
                      <div class="text-4xl mb-2">🍽️</div>
                      <div class="text-sm">${cuisines?.[0] || 'Restaurant'}</div>
                    </div>
                  `;
                  e.target.parentElement.appendChild(fallbackDiv);
                }
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
        
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-500"></div>
        
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
