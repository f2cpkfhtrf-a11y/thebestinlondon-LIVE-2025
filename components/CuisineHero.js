import Image from 'next/image';

const CuisineHero = ({ 
  title, 
  subtitle, 
  description, 
  venueCount, 
  imageUrl, 
  cuisine = null,
  area = null 
}) => {
  // Generate cuisine-specific hero images
  // Using local fallback images instead of external Unsplash URLs
  const getCuisineHeroImage = (cuisine) => {
    const cuisineSlug = cuisine?.toLowerCase().replace(/\s+/g, '-');
    // Use local cuisine hero images from our image system
    if (cuisineSlug) {
      return `/images/heroes/cuisines/${cuisineSlug}.webp`;
    }
    // Default fallback to generic hero
    return '/images/heroes/site/default-list-hero.webp';
  };

  // Generate area-specific hero images
  // Using local fallback images instead of external Unsplash URLs
  const getAreaHeroImage = (area) => {
    const areaSlug = area?.toLowerCase().replace(/\s+/g, '-');
    // Use local area hero images from our image system
    if (areaSlug) {
      return `/images/heroes/areas/${areaSlug}.webp`;
    }
    // Default fallback to generic hero
    return '/images/heroes/site/default-list-hero.webp';
  };

  const heroImage = imageUrl || (cuisine ? getCuisineHeroImage(cuisine) : getAreaHeroImage(area));

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title || 'Restaurant Hero'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Badge */}
        {venueCount !== undefined && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-4">
            <span className="text-gold text-sm font-medium uppercase tracking-wide">
              {venueCount} Restaurants
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <h2 className="text-xl lg:text-2xl text-gold font-medium mb-4">
            {subtitle}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-lg text-warmWhite/90 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span className="text-warmWhite/80 text-sm">Premium Selection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span className="text-warmWhite/80 text-sm">Verified Ratings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span className="text-warmWhite/80 text-sm">Updated Daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuisineHero;
