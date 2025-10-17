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
  const getCuisineHeroImage = (cuisine) => {
    const cuisineImages = {
      'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'italian': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1800&h=1200&q=85&fit=crop',
      'japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1800&h=1200&q=85&fit=crop',
      'chinese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'thai': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'turkish': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1800&h=1200&q=85&fit=crop',
      'french': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1800&h=1200&q=85&fit=crop',
      'spanish': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'korean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'vietnamese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'mexican': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'american': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'caribbean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'african': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'mediterranean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'seafood': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&h=1200&q=85&fit=crop',
      'vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&h=1200&q=85&fit=crop',
      'vegan': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&h=1200&q=85&fit=crop',
      'modern european': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&h=1200&q=85&fit=crop',
      'british': 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=1800&h=1200&q=85&fit=crop'
    };
    
    return cuisineImages[cuisine?.toLowerCase()] || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop';
  };

  // Generate area-specific hero images
  const getAreaHeroImage = (area) => {
    const areaImages = {
      'Central London': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Tower Hamlets': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Redbridge': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Havering': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Hackney': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Newham': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Camden': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Westminster': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Southwark': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop',
      'Kensington and Chelsea': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop'
    };
    
    return areaImages[area] || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop';
  };

  const heroImage = imageUrl || (cuisine ? getCuisineHeroImage(cuisine) : getAreaHeroImage(area));

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${title} restaurants in London`}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-4">
              <span className="text-gold text-sm font-medium uppercase tracking-wide">
                {venueCount} Restaurants
              </span>
            </div>

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
                <span className="text-warmWhite/80 text-sm">Verified Reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-warmWhite/80 text-sm">FSA Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CuisineHero;
