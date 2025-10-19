/**
 * Assert that an image URL is local-only and throws in development if external
 */
export function assertLocalImage(url: string): void {
  if (process.env.NODE_ENV === 'development') {
    if (!url) return; // Allow empty URLs
    
    // Check if it's an external URL (starts with http/https and not our domain)
    if (url.startsWith('http') && !url.includes('thebestinlondon.co.uk') && !url.includes('localhost')) {
      throw new Error(`External image URL detected: ${url}. Use local paths only.`);
    }
    
    // Check for known external image hosts
    const externalHosts = [
      'unsplash.com',
      'images.unsplash.com',
      'googleusercontent.com',
      'googleapis.com',
      'yelp.com',
      'foursquare.com'
    ];
    
    const hasExternalHost = externalHosts.some(host => url.includes(host));
    if (hasExternalHost) {
      throw new Error(`External image host detected: ${url}. Use local paths only.`);
    }
  }
}
