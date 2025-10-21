import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bumpAssetVersion() {
  console.log('🔄 Bumping asset version...');
  
  const envPath = path.join(__dirname, '../../.env');
  const envLocalPath = path.join(__dirname, '../../.env.local');
  const newVersion = Date.now().toString();
  
  // Update .env file
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('NEXT_PUBLIC_ASSET_VERSION=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_ASSET_VERSION=.*/,
        `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`
      );
    } else {
      envContent += `\nNEXT_PUBLIC_ASSET_VERSION=${newVersion}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Updated .env with NEXT_PUBLIC_ASSET_VERSION=${newVersion}`);
  }
  
  // Update .env.local file
  if (fs.existsSync(envLocalPath)) {
    let envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
    
    if (envLocalContent.includes('NEXT_PUBLIC_ASSET_VERSION=')) {
      envLocalContent = envLocalContent.replace(
        /NEXT_PUBLIC_ASSET_VERSION=.*/,
        `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`
      );
    } else {
      envLocalContent += `\nNEXT_PUBLIC_ASSET_VERSION=${newVersion}\n`;
    }
    
    fs.writeFileSync(envLocalPath, envLocalContent);
    console.log(`✅ Updated .env.local with NEXT_PUBLIC_ASSET_VERSION=${newVersion}`);
  }
  
  // Write version to separate file for build scripts
  const versionPath = path.join(__dirname, '../../.env.version');
  fs.writeFileSync(versionPath, newVersion);
  
  console.log(`🚀 Asset version bumped to: ${newVersion}`);
  console.log('📝 All image URLs will now include cache-busting parameter');
}

// Run the script
bumpAssetVersion().catch(console.error);
