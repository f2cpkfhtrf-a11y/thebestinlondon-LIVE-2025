import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assertLocalImage } from '../lib/assertLocalImage';

interface CuisineTileProps {
  slug: string;
  name: string;
  count?: number;
  className?: string;
}

export default function CuisineTile({ slug, name, count = 0, className = '' }: CuisineTileProps) {
  // Construct the image path with fallback
  const imageSrc = `/images/heroes/cuisines/${slug}.webp`;
  const fallbackSrc = '/images/heroes/cuisines-default.webp';
  
  // Assert local-only images in development
  React.useEffect(() => {
    assertLocalImage(imageSrc);
    assertLocalImage(fallbackSrc);
  }, [imageSrc, fallbackSrc]);

  return (
    <Link
      href={`/${slug}`}
      className={`group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${name} restaurants in London`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback to default cuisine image if the specific one fails
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackSrc) {
              target.src = fallbackSrc;
            }
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          {count > 0 && (
            <p className="text-sm text-white/90 group-hover:text-gold/90 transition-colors duration-300">
              {count} restaurants
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
