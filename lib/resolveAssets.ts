/**
 * Asset resolution utilities with versioning support
 * Ensures all asset URLs are properly cache-busted
 */

export const withVersion = (src: string): string => {
  if (!src) return src;
  if (src.includes('?v=')) return src;
  const version = process.env.NEXT_PUBLIC_ASSET_VERSION || process.env.ASSET_VERSION || '1';
  return `${src}?v=${version}`;
};

export const appendVersion = (url: string): string => {
  return withVersion(url);
};