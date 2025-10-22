import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Run all audits in sequence
    const audits = [
      'npm run audit:images',
      'npm run audit:links',
      'npm run audit:schema'
    ];
    
    const results = {};
    
    for (const audit of audits) {
      try {
        const { stdout, stderr } = await execAsync(audit);
        results[audit] = {
          success: true,
          output: stdout,
          errors: stderr
        };
      } catch (error) {
        results[audit] = {
          success: false,
          error: error.message
        };
      }
    }
    
    return res.status(200).json({
      success: true,
      message: 'Full audit suite completed',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

