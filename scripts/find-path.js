import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('CWD:', process.cwd());
console.log('__dirname would be:', import.meta.url);

// Check common paths
const paths = [
  '/vercel/share/v0-project/pages',
  '/home/user/pages',
  './pages',
  '../pages',
  'pages',
];

for (const p of paths) {
  const resolved = resolve(p);
  console.log(`\n${p} -> ${resolved} exists: ${existsSync(resolved)}`);
  if (existsSync(resolved)) {
    try {
      const entries = readdirSync(resolved);
      console.log(`  Contents (first 10): ${entries.slice(0, 10).join(', ')}`);
    } catch(e) {
      console.log(`  Error reading: ${e.message}`);
    }
  }
}

// Also check the parent directories
for (const d of ['/home/user', '/vercel', '/vercel/share']) {
  console.log(`\n${d} exists: ${existsSync(d)}`);
  if (existsSync(d)) {
    try {
      console.log(`  Contents: ${readdirSync(d).join(', ')}`);
    } catch(e) {
      console.log(`  Error: ${e.message}`);
    }
  }
}
