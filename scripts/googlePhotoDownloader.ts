import { promises as fs } from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import fetch from 'node-fetch';

// Load environment variables
require('dotenv').config();

export function buildPhotoUrl(photoReference: string, apiKey: string, maxWidth = 1600): string {
  const params = new URLSearchParams({
    maxwidth: maxWidth.toString(),
    photoreference: photoReference,
    key: apiKey
  });
  
  return `https://maps.googleapis.com/maps/api/place/photo?${params.toString()}`;
}

export async function downloadGooglePhoto({ 
  photoUrl, 
  outPath 
}: { 
  photoUrl: string; 
  outPath: string; 
}): Promise<void> {
  let actualUrl = photoUrl;
  let response: any;
  
  // First, try to get the redirect URL
  try {
    response = await fetch(photoUrl, { 
      redirect: 'manual',
      headers: {
        'User-Agent': 'thebestinlondon/1.0'
      }
    } as any);
    
    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('location');
      if (!location) {
        throw new Error(`Redirect response missing Location header`);
      }
      actualUrl = location;
      
      // Follow the redirect
      response = await fetch(actualUrl, {
        headers: {
          'User-Agent': 'thebestinlondon/1.0'
        }
      } as any);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Invalid content-type: ${contentType}`);
    }
    
  } catch (error) {
    throw new Error(`Failed to fetch photo: ${error}`);
  }
  
  // Stream to temporary file first
  const tempPath = outPath + '.part';
  
  try {
    const body = response.body;
    if (!body) {
      throw new Error('Response body is null');
    }
    
    // For node-fetch, body is already a readable stream
    const readable = body as NodeJS.ReadableStream;
    const writable = createWriteStream(tempPath);
    
    await pipeline(readable, writable);
    
    // Validate file size using environment variable
    const stats = await fs.stat(tempPath);
    const minSizeKB = parseInt(process.env.PIPELINE_MIN_FILE_KB || '50');
    if (stats.size < minSizeKB * 1024) {
      throw new Error(`File too small: ${stats.size} bytes (minimum: ${minSizeKB}KB)`);
    }
    
    // Atomically replace the target file
    await fs.rename(tempPath, outPath);
    
  } catch (error) {
    // Clean up temp file on error
    try {
      await fs.unlink(tempPath);
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}

export async function refreshPhotoRefs(placeId: string, apiKey: string): Promise<string[]> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
  
  try {
    const response = await fetch(url) as any;
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }
    
    if (!data.result?.photos) {
      return [];
    }
    
    return data.result.photos.slice(0, 5).map((photo: any) => photo.photo_reference);
    
  } catch (error) {
    throw new Error(`Failed to refresh photo references: ${error}`);
  }
}
