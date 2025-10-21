#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Asset version bump script
async function bumpAssetVersion() {
  console.log('🔄 Bumping asset version...');
  
  const envPath = path.join(process.cwd(), '.env');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  const newVersion = Date.now().toString();
  
  // Try .env.local first, then .env
  let targetPath = envLocalPath;
  if (!fs.existsSync(envLocalPath)) {
    targetPath = envPath;
  }
  
  let envContent = '';
  if (fs.existsSync(targetPath)) {
    envContent = fs.readFileSync(targetPath, 'utf8');
  }
  
  // Update or add NEXT_PUBLIC_ASSET_VERSION
  const versionRegex = /NEXT_PUBLIC_ASSET_VERSION=.*/;
  if (versionRegex.test(envContent)) {
    envContent = envContent.replace(versionRegex, `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`);
  } else {
    envContent += `\nNEXT_PUBLIC_ASSET_VERSION=${newVersion}\n`;
  }
  
  fs.writeFileSync(targetPath, envContent);
  
  console.log(`✅ Asset version bumped to: ${newVersion}`);
  console.log(`   Updated file: ${targetPath}`);
  
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bumpAssetVersion().catch(() => process.exit(0));
}