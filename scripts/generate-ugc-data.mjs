import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/data/analytics.json');
const destinationDirectory = resolve(root, 'public/analytics');
await mkdir(destinationDirectory, { recursive: true });
await copyFile(source, resolve(destinationDirectory, 'analytics.json'));
console.log('Copied verified analytics data to public/analytics/analytics.json');
