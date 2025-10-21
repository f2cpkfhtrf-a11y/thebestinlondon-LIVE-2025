import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(e?.message || e);
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const BASE = 'https://www.thebestinlondon.co.uk';
const REPORT_DIR = path.join(process.cwd(), 'reports', 'lighthouse');
ensureDir(REPORT_DIR);

const urls = [
  `${BASE}/`,
  `${BASE}/indian-restaurants-london`,
  `${BASE}/nearby`,
];

console.log('Running Lighthouse on key URLs...');

for (const url of urls) {
  const slug = url.replace(BASE, '').replace(/^\/+/, '').replace(/\//g, '-') || 'home';
  const out = path.join(REPORT_DIR, `lh-${slug}.json`);
  const cmd = `npx --yes lighthouse ${url} --quiet --chrome-flags="--headless" --output=json --output-path=${out} --only-categories=performance,seo,accessibility,best-practices`;
  console.log(`\n➡️  Auditing: ${url}`);
  run(cmd);
}

console.log(`\n✅ Lighthouse reports saved to: ${REPORT_DIR}`);
