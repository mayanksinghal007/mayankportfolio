import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sitemapPath = path.resolve(rootDir, 'public', 'sitemap.xml');
const keyPath = path.resolve(rootDir, 'public', 'indexnow.txt');

if (!fs.existsSync(sitemapPath) || !fs.existsSync(keyPath)) {
  console.error('Error: sitemap.xml or indexnow.txt not found.');
  process.exit(1);
}

const key = fs.readFileSync(keyPath, 'utf8').trim();
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const urlMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`Found ${urlMatches.length} URLs in sitemap.xml`);

const host = 'mayankaggarwal-one.vercel.app';
const payload = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList: urlMatches,
};

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

async function submitIndexNow() {
  for (const endpoint of endpoints) {
    try {
      console.log(`Submitting ${urlMatches.length} URLs to ${endpoint}...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      console.log(`Response status from ${endpoint}: ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✓ Successfully submitted to ${endpoint}`);
      } else {
        const text = await res.text();
        console.log(`Response body: ${text}`);
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, err.message);
    }
  }
}

submitIndexNow();
