import React from 'react';
import Link from 'next/link';

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
  // Ensure we have a valid src
  if (!src) {
    return null;
  }

  return (
    <Link href={href} className={`group block ${className}`}>
      <div 
        className="relative h-[180px] sm:h-[220px] rounded-2xl overflow-hidden shadow-lg border border-grey-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-black"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Hidden img for accessibility */}
        <img
          src={src}
          alt={alt}
          className="sr-only"
        />
        
        {/* Enhanced dark gradient overlay with hover effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 group-hover:from-black/65 group-hover:via-black/50 group-hover:to-black/95 transition-all duration-300"></div>
        
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
