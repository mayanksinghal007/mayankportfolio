import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) results = results.concat(getHtmlFiles(full));
    else if (f.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const files = getHtmlFiles('dist');
const titles = new Map();
const descs = new Map();
const h1s = new Map();

for (const file of files) {
  const rel = path.relative('dist', file);
  if (rel.includes('admin')) continue;
  const content = fs.readFileSync(file, 'utf8');
  const tMatch = content.match(/<title>([^<]*)<\/title>/i);
  const t = tMatch ? tMatch[1].trim() : '';
  const dMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const d = dMatch ? dMatch[1].trim() : '';
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  if (titles.has(t)) titles.get(t).push(rel);
  else titles.set(t, [rel]);

  if (descs.has(d)) descs.get(d).push(rel);
  else descs.set(d, [rel]);

  if (h1s.has(h1)) h1s.get(h1).push(rel);
  else h1s.set(h1, [rel]);
}

console.log('Total checked public pages:', files.length);

let dupTitleCount = 0;
for (const [t, pages] of titles.entries()) {
  if (pages.length > 1) {
    dupTitleCount++;
    console.log(`Duplicate Title (${pages.length} pages): "${t}" ->`, pages);
  }
}
if (dupTitleCount === 0) console.log('✓ Zero duplicate titles!');

let dupDescCount = 0;
for (const [d, pages] of descs.entries()) {
  if (pages.length > 1) {
    dupDescCount++;
    console.log(`Duplicate Desc (${pages.length} pages): "${d.slice(0, 40)}..." ->`, pages);
  }
}
if (dupDescCount === 0) console.log('✓ Zero duplicate descriptions!');
