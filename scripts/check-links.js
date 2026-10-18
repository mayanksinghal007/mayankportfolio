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
const existingRoutes = new Set(files.map(f => {
  let rel = path.relative('dist', f).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -11);
  if (rel.endsWith('.html')) return '/' + rel.slice(0, -5);
  return '/' + rel;
}));

console.log('Indexed routes count in dist:', existingRoutes.size);

const broken = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hrefs = [...content.matchAll(/href=["']([^"'#?]+)["']/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (
      h.startsWith('/') &&
      !h.startsWith('//') &&
      !h.startsWith('/assets') &&
      !h.startsWith('/Mayank_') &&
      !h.startsWith('/site.webmanifest') &&
      !h.startsWith('/rss.xml') &&
      !h.startsWith('/sitemap.xml') &&
      !h.startsWith('/robots.txt') &&
      !h.startsWith('/humans.txt') &&
      !h.startsWith('/llms') &&
      !h.startsWith('/indexnow') &&
      !h.startsWith('/8f1a23c5')
    ) {
      const cleanH = h.replace(/\/+$/, '') || '/';
      if (!existingRoutes.has(cleanH)) {
        broken.push({ from: path.relative('dist', file), to: h });
      }
    }
  }
}

console.log('Broken internal link count:', broken.length);
if (broken.length > 0) {
  console.log('Broken links sample:', broken.slice(0, 10));
} else {
  console.log('✓ All internal links resolve to valid, rendered pages!');
}
