import { promises as fs } from 'fs';
import sharp from 'sharp';

export async function isValidLocalImage(filePath: string, minSizeKB: number = 50): Promise<boolean> {
  try {
    // Check if file exists
    await fs.access(filePath);
    
    // Check file size (minimum size in KB)
    const stats = await fs.stat(filePath);
    if (stats.size < minSizeKB * 1024) {
      return false;
    }
    
    // Check content-type by reading file header
    const buffer = await fs.readFile(filePath, { encoding: null });
    
    // Check for image magic bytes
    const isImage = (
      // JPEG
      (buffer[0] === 0xFF && buffer[1] === 0xD8) ||
      // PNG
      (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) ||
      // WebP (RIFF header)
      (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
       buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50)
    );
    
    if (!isImage) {
      return false;
    }
    
    // Try to decode with sharp to ensure it's a valid image
    try {
      await sharp(filePath).metadata();
      return true;
    } catch {
      return false;
    }
    
  } catch {
    return false;
  }
}
