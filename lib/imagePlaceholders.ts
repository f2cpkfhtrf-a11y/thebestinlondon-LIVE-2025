// Client-side safe image placeholder utilities

interface ColorMap {
  [relativePath: string]: string;
}

let colorMapCache: ColorMap | null = null;

// For client-side safety, we'll use a simpler approach
// The color map will be populated at build time or loaded via API
function loadColorMap(): ColorMap {
  // Return cached data or empty object for client-side safety
  return colorMapCache || {};
}

export function getBlurAndColor(src: string): { blurSrc?: string; color?: string } {
  if (!src) {
    return {};
  }

  // Convert src to relative path for lookup
  let relativePath = src;
  if (src.startsWith('/images/')) {
    relativePath = src.substring(1); // Remove leading slash
  } else if (src.startsWith('/public/images/')) {
    relativePath = src.substring(7); // Remove '/public/'
  }

  const colorMap = loadColorMap();
  const color = colorMap[relativePath];

  // Generate blur path
  const blurPath = src.replace(/\.webp$/, '.blur.webp');
  let blurSrc: string | undefined = blurPath;
  
  // For client-side safety, we assume blur files exist if they're referenced
  // The actual file existence check should happen at build time or server-side

  return {
    blurSrc,
    color: color || '#1E1B18' // Fallback dark color
  };
}

export function getBlurDataUrl(blurSrc: string): string | undefined {
  // Client-side safe: Next.js will handle the blur loading through the placeholder prop
  // We return undefined here and let Next.js handle the blur loading automatically
  return undefined;
}
