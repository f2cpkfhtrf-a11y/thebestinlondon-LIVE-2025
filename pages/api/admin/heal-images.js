import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { stdout, stderr } = await execAsync('node scripts/healLocalImages.mjs');
    
    return res.status(200).json({
      success: true,
      message: 'Image healing completed',
      output: stdout,
      errors: stderr,
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




