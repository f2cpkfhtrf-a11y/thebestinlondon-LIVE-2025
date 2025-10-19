import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assertLocalImage } from '../../lib/assertLocalImage';

interface ImageTileProps {
  title: string;
  subtitle?: string;
  href: string;
  src: string;
  alt: string;
  className?: string;
}

const ImageTile: React.FC<ImageTileProps> = ({
  title,
  subtitle,
  href,
  src,
  alt,
  className = ''
}) => {
  // Assert local-only image in development
  assertLocalImage(src);

  return (
    <Link href={href} className={`group block ${className}`}>
      <div className="relative h-[180px] sm:h-[220px] rounded-2xl overflow-hidden bg-black shadow-lg border border-grey-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Background Image */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 90vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        
        {/* Dark gradient overlay (top to bottom 0.6→0.9 opacity) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
        
        {/* Content - bottom left */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif font-semibold text-white text-lg mb-1 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          {subtitle && (
            <div className="flex items-center gap-2 text-sm text-warmWhite/80">
              <span>{subtitle}</span>
              {title && subtitle && <span className="w-1 h-1 bg-gold rounded-full"></span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ImageTile;
