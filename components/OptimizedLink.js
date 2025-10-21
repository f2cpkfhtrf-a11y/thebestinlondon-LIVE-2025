/**
 * Optimized Link Component
 * Adds intelligent prefetching for better navigation performance
 * Prefetches links when they appear in viewport
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function OptimizedLink({ 
  href, 
  children, 
  prefetch = true,
  className = '',
  ...props 
}) {
  const router = useRouter();
  const linkRef = useRef(null);
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  useEffect(() => {
    if (!prefetch || !linkRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPrefetch(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px'
      }
    );

    observer.observe(linkRef.current);

    return () => observer.disconnect();
  }, [prefetch]);

  // Prefetch on hover for instant navigation
  const handleMouseEnter = () => {
    if (prefetch && href) {
      router.prefetch(href);
    }
  };

  return (
    <Link 
      href={href} 
      ref={linkRef}
      className={className}
      prefetch={shouldPrefetch}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
}

