/**
 * Dynamic Component Loader
 * Lazy load heavy components for better performance
 * Only loads when needed - reduces initial bundle size
 */

import dynamic from 'next/dynamic';

// Lazy load NearMeFeature (only needed on Near Me page)
export const DynamicNearMeFeature = dynamic(
  () => import('./NearMeFeature'),
  {
    loading: () => (
      <div className="bg-charcoal/95 backdrop-blur-md border-b border-grey-dark sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-semibold text-warmWhite">
              Loading Near Me feature...
            </h3>
          </div>
        </div>
      </div>
    ),
    ssr: false // Only load on client side
  }
);

// Lazy load NewsletterSignup (only needed at bottom of pages)
export const DynamicNewsletterSignup = dynamic(
  () => import('./NewsletterSignup'),
  {
    loading: () => (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 bg-charcoal-light rounded-2xl mx-6 md:mx-10">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gold/20 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-grey-dark/20 rounded w-64 mx-auto mb-8"></div>
            <div className="h-12 bg-grey-dark/20 rounded max-w-md mx-auto"></div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
);

// Lazy load EnhancedImageGallery (only on restaurant detail pages)
export const DynamicImageGallery = dynamic(
  () => import('./EnhancedImageGallery'),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-grey-dark/20 rounded-xl animate-pulse"></div>
        ))}
      </div>
    ),
    ssr: false
  }
);

// Lazy load RichMarkdown (only on blog/FAQ detail pages)
export const DynamicRichMarkdown = dynamic(
  () => import('./content/RichMarkdown'),
  {
    loading: () => (
      <div className="prose prose-invert max-w-none">
        <div className="space-y-4">
          <div className="h-4 bg-grey-dark/20 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-grey-dark/20 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-grey-dark/20 rounded w-4/6 animate-pulse"></div>
        </div>
      </div>
    ),
    ssr: true
  }
);

// Lazy load search suggestions (heavy component)
export const DynamicSearchSuggestions = dynamic(
  () => import('./SearchSuggestions').catch(() => ({ default: () => null })),
  {
    loading: () => null,
    ssr: false
  }
);

