import fs from "fs";
import path from "path";

const ROOT = process.cwd();

function bumpAssetVersion() {
  const envFile = path.join(ROOT, ".env");
  const envLocalFile = path.join(ROOT, ".env.local");
  
  const newVersion = Date.now().toString();
  
  // Try .env.local first, then .env
  let targetFile = envLocalFile;
  if (!fs.existsSync(envLocalFile)) {
    targetFile = envFile;
  }
  
  let content = "";
  if (fs.existsSync(targetFile)) {
    content = fs.readFileSync(targetFile, "utf8");
  }
  
  // Update or add NEXT_PUBLIC_ASSET_VERSION
  const versionRegex = /^NEXT_PUBLIC_ASSET_VERSION=.*$/m;
  if (versionRegex.test(content)) {
    content = content.replace(versionRegex, `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`);
  } else {
    content += (content ? "\n" : "") + `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`;
  }
  
  fs.writeFileSync(targetFile, content);
  
  console.log(`✅ Asset version bumped to: ${newVersion}`);
  console.log(`📁 Updated file: ${path.relative(ROOT, targetFile)}`);
  
  return newVersion;
}

bumpAssetVersion();
