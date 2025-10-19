import React from 'react';
import Image from 'next/image';
import { assertLocalImage } from '../lib/assertLocalImage';
import { getBlurAndColor, getBlurDataUrl } from '../lib/imagePlaceholders';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  stats?: Array<{ label: string; value: string | number; testId?: string }>;
  image: { src: string; alt: string; srcMd?: string; srcLg?: string };
  priority?: boolean;
  center?: boolean;
}

export default function PageHero({ 
  title, 
  subtitle, 
  stats = [], 
  image, 
  priority = false,
  center = false 
}: PageHeroProps) {
  const [imageError, setImageError] = React.useState(false);
  const [fallbackSrc, setFallbackSrc] = React.useState('/images/heroes/site/default-list-hero.webp');

  // Assert local-only in development
  React.useEffect(() => {
    assertLocalImage(image.src);
  }, [image.src]);

  // Get blur and dominant color for the current image
  const currentSrc = imageError ? fallbackSrc : image.src;
  const { blurSrc, color } = getBlurAndColor(currentSrc);
  const blurDataUrl = blurSrc ? getBlurDataUrl(blurSrc) : undefined;

  const handleImageError = () => {
    if (!imageError && image.src !== fallbackSrc) {
      setImageError(true);
      setFallbackSrc('/images/heroes/site/default-list-hero.webp');
    }
  };

  // Generate srcSet for responsive variants
  const generateSrcSet = () => {
    const srcSet = [];
    if (image.srcMd && image.srcMd !== image.src) {
      srcSet.push(`${image.srcMd} 768w`);
    }
    if (image.srcLg && image.srcLg !== image.src) {
      srcSet.push(`${image.srcLg} 1280w`);
    }
    if (image.src) {
      srcSet.push(`${currentSrc} 0w`);
    }
    return srcSet.length > 1 ? srcSet.join(', ') : undefined;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-none lg:rounded-2xl">
      {/* Image */}
      <div 
        className="relative h-[60vh] min-h-[400px] max-h-[600px]"
        style={{ backgroundColor: color }}
      >
        <Image
          src={currentSrc}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover transition-opacity duration-300"
          priority={priority}
          onError={handleImageError}
          placeholder={blurDataUrl ? "blur" : "empty"}
          blurDataURL={blurDataUrl}
          {...(generateSrcSet() && { srcSet: generateSrcSet() })}
        />
        
        {/* Gradient overlay - enhanced for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Content */}
        <div className={`absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${center ? 'items-center text-center' : 'items-start'}`}>
          <div className={`max-w-4xl ${center ? 'mx-auto' : ''}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
            
            {/* Stats */}
            {stats.length > 0 && (
              <div className="flex flex-wrap gap-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span 
                      className="text-3xl sm:text-4xl font-serif font-bold text-gold"
                      data-testid={stat.testId}
                    >
                      {stat.value}
                    </span>
                    <span className="text-sm sm:text-base text-white/80 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
