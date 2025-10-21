import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Rate limiting store (in production, use Redis)
const rateLimit = new Map();

export default async function handler(req, res) {
  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed',
      startedAt: new Date().toISOString()
    });
  }

  // Check admin key
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_DASH_KEY;
  
  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).json({ 
      ok: false, 
      error: 'Unauthorized',
      startedAt: new Date().toISOString()
    });
  }

  // Rate limiting (10 requests per 60 seconds per IP)
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 1000; // 60 seconds
  const maxRequests = 10;

  if (!rateLimit.has(clientIP)) {
    rateLimit.set(clientIP, []);
  }

  const requests = rateLimit.get(clientIP);
  const recentRequests = requests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({ 
      ok: false, 
      error: 'Rate limit exceeded',
      startedAt: new Date().toISOString()
    });
  }

  recentRequests.push(now);
  rateLimit.set(clientIP, recentRequests);

  const startedAt = new Date().toISOString();
  const warnings = [];
  const errors = [];
  const reportPaths = [];

  try {
    // Run image audit with timeout
    const { stdout, stderr } = await execAsync('node scripts/verifyImages.js', {
      timeout: 120000 // 120 seconds
    });

    // Log to file
    const logPath = path.join(process.cwd(), 'reports', 'latest-image-audit.log');
    const logContent = `[${startedAt}] Image Audit\nOutput: ${stdout}\nErrors: ${stderr}\n\n`;
    fs.appendFileSync(logPath, logContent);

    // Check for report files
    const reportsDir = path.join(process.cwd(), 'reports');
    if (fs.existsSync(reportsDir)) {
      const files = fs.readdirSync(reportsDir);
      const reportFiles = files.filter(file => 
        file.includes('image') && (file.endsWith('.json') || file.endsWith('.md'))
      );
      reportPaths.push(...reportFiles.map(file => `/reports/${file}`));
    }

    if (stderr) {
      warnings.push('Script produced warnings');
    }

    return res.status(200).json({
      ok: true,
      startedAt,
      finishedAt: new Date().toISOString(),
      message: 'Image audit completed',
      output: stdout,
      warnings,
      errors,
      reportPaths
    });

  } catch (error) {
    errors.push(error.message);
    
    // Log error
    const logPath = path.join(process.cwd(), 'reports', 'latest-image-audit.log');
    const logContent = `[${startedAt}] Image Audit ERROR\n${error.message}\n\n`;
    fs.appendFileSync(logPath, logContent);

    return res.status(500).json({
      ok: false,
      startedAt,
      finishedAt: new Date().toISOString(),
      error: error.message,
      warnings,
      errors
    });
  }
}
