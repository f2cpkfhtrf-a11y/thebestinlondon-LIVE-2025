import React from 'react';

// Simple FSABadge component without external dependencies
export default function FSABadge({ rating }: { rating: string | number }) {
  const ratingValue = typeof rating === 'number' ? rating.toString() : rating || 'N/A';
  
  return (
    <span className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
      FSA: {ratingValue}
    </span>
  );
}

