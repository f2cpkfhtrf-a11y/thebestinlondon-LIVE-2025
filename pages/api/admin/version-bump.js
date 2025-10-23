import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const envPath = path.join(process.cwd(), '.env');
    const newVersion = Date.now().toString();
    
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Update or add NEXT_PUBLIC_ASSET_VERSION
    if (envContent.includes('NEXT_PUBLIC_ASSET_VERSION=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_ASSET_VERSION=.*/,
        `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`
      );
    } else {
      envContent += `\nNEXT_PUBLIC_ASSET_VERSION=${newVersion}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    
    return res.status(200).json({
      success: true,
      message: 'Version bumped successfully',
      newVersion: newVersion,
      nextSteps: [
        'Run: npm run build',
        'Run: npm run deploy:vercel (if deploying)',
        'Check production site for updated images',
        'Monitor for any CDN cache issues'
      ],
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




