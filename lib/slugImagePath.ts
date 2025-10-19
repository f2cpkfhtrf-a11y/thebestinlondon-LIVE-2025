import crypto from 'crypto';

/**
 * Normalize image path to lowercase, slugified format with safe characters
 */
export function normaliseImagePath(input: string): string {
  if (!input) return '';
  
  let path = input.trim();
  
  // Decode URI components
  try {
    path = decodeURIComponent(path);
  } catch {
    // Continue if decode fails
  }
  
  // Ensure it starts with /images/
  if (!path.startsWith('/images/')) {
    // Remove leading slash or public prefix if present
    path = path.replace(/^\/?(public\/)?/, '');
    path = '/' + path;
    if (!path.startsWith('/images/')) {
      path = '/images/' + path.replace(/^\//, '');
    }
  }
  
  // Convert to lowercase
  path = path.toLowerCase();
  
  // Replace spaces and underscores with hyphens
  path = path.replace(/[\s_]+/g, '-');
  
  // Remove non-allowed characters (keep a-z, 0-9, -, ., /)
  path = path.replace(/[^a-z0-9.\/-]/g, '');
  
  // Collapse multiple hyphens
  path = path.replace(/-+/g, '-');
  
  // Remove trailing hyphens
  path = path.replace(/-+$/, '');
  
  return path;
}

/**
 * Add hash to filename if not already present, return new path
 */
export function withHashIfMissing(filePath: string, fileBuffer: Buffer): string {
  if (!filePath || !fileBuffer) return filePath;
  
  // Check if filename already has hash pattern "-{8hex}.webp"
  const hashPattern = /-[a-f0-9]{8}\.webp$/i;
  if (hashPattern.test(filePath)) {
    return filePath;
  }
  
  // Compute 8-character hash of file content
  const hash = crypto.createHash('sha1')
    .update(fileBuffer)
    .digest('hex')
    .substring(0, 8);
  
  // Insert hash before file extension
  const pathParts = filePath.split('.');
  if (pathParts.length > 1) {
    const extension = pathParts.pop();
    const nameWithoutExt = pathParts.join('.');
    return `${nameWithoutExt}-${hash}.${extension}`;
  }
  
  // Fallback if no extension
  return `${filePath}-${hash}`;
}
