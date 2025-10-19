import React from 'react';
import ImageWithFallback from './ImageWithFallback';

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
  
  // Get the best available image - prioritize working images
  const getImageUrl = () => {
    // Use photos array first (has real Google Places API URLs)
    if (photos && photos[0] && photos[0].url) return photos[0].url;
    // Check if local image exists and is not a placeholder
    if (image_card_path && !image_card_path.includes('placeholder')) {
      return image_card_path;
    }
    // Fall back to original image URL if it exists
    if (image_url && !image_url.includes('PLACEHOLDER')) {
      return image_url;
    }
    return null;
  };
  
  const imageUrl = getImageUrl();
  const location = vicinity || borough || area;
  
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Image with standardized overlay */}
      <div className="relative h-48 overflow-hidden">
                {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} - ${cuisines?.join(', ')} restaurant in ${location || 'London'}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              e.target.style.opacity = '1';
            }}
            onError={(e) => {
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
            }}
            style={{ opacity: 0 }}
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
            {fsa_rating && (
              <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                🏆 FSA {fsa_rating}
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
