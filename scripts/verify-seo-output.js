import fs from 'node:fs';

const pages = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/services/index.html',
  'dist/portfolio/index.html',
  'dist/contact/index.html',
  'dist/blog/index.html',
  'dist/tools/meta-ads-roas-calculator/index.html',
  'dist/tools/ai-video-prompt-generator/index.html',
  'dist/tools/reel-hook-generator/index.html',
  'dist/locations/delhi/index.html',
  'dist/glossary/index.html',
  'dist/press/index.html',
];

for (const p of pages) {
  const content = fs.readFileSync(p, 'utf8');
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canon = canonMatch ? canonMatch[1] : 'NONE';
  const googleMatch = content.match(/<meta\s+name=["']google-site-verification["']\s+content=["']([^"']*)["']/i);
  const google = googleMatch ? googleMatch[1] : 'NONE';
  const bingMatch = content.match(/<meta\s+name=["']msvalidate\.01["']\s+content=["']([^"']*)["']/i);
  const bing = bingMatch ? bingMatch[1] : 'NONE';
  console.log(`${p.padEnd(48)} | Canonical: ${canon} | Google: ${google} | Bing: ${bing}`);
}
