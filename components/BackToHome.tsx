import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BackToHomeProps {
  className?: string;
}

export default function BackToHome({ className = '' }: BackToHomeProps) {
  const router = useRouter();
  
  // Don't show on home page
  if (router.pathname === '/') {
    return null;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Link
        href="/"
        className="group flex items-center justify-center w-14 h-14 bg-gold hover:bg-gold/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Back to Home"
      >
        <svg 
          className="w-6 h-6 text-black transition-transform duration-300 group-hover:-translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      </Link>
    </div>
  );
}
