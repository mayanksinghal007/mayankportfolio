import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

const summary = {
  canonicalMissing: [],
  titlesOverLimit: [],
  metaDescOver155: [],
  h1Over70: [],
  h2Missing: [],
  h2Duplicate: [],
  imagesOver100k: [],
  imagesMissingSize: [],
  urlContainsSpace: [],
  urlUppercase: [],
  urlParameters: [],
  highExternalOutlinks: [],
};

function checkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      checkDir(full);
    } else if (f.name.endsWith('.html')) {
      const relPath = path.relative('dist', full);
      const content = fs.readFileSync(full, 'utf8');

      // Canonical
      const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
      if (!canonicalMatch) {
        summary.canonicalMissing.push(relPath);
      }

      // Title
      const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';
      if (title.length > 58) {
        summary.titlesOverLimit.push({ page: relPath, title, len: title.length });
      }

      // Meta Description
      const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
      const desc = descMatch ? descMatch[1] : '';
      if (desc.length > 155) {
        summary.metaDescOver155.push({ page: relPath, len: desc.length, desc });
      }

      // Headings
      const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
      for (const h1 of h1Matches) {
        const text = h1[1].replace(/<[^>]+>/g, '').trim();
        if (text.length > 70) {
          summary.h1Over70.push({ page: relPath, len: text.length, text });
        }
      }

      const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      if (h2Matches.length === 0 && !relPath.includes('404')) {
        summary.h2Missing.push(relPath);
      }

      // Duplicate H2s on same page
      const h2Seen = new Set();
      const pageDups = [];
      for (const h2 of h2Matches) {
        if (h2Seen.has(h2.toLowerCase())) {
          pageDups.push(h2);
        }
        h2Seen.add(h2.toLowerCase());
      }
      if (pageDups.length > 0) {
        summary.h2Duplicate.push({ page: relPath, dups: pageDups });
      }

      // Images missing width/height
      const imgMatches = [...content.matchAll(/<img\b([^>]*)>/gi)];
      for (const img of imgMatches) {
        const attrs = img[1];
        const hasWidth = /width=["']?\d+/i.test(attrs);
        const hasHeight = /height=["']?\d+/i.test(attrs);
        const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
        if (!hasWidth || !hasHeight) {
          summary.imagesMissingSize.push({ page: relPath, src: srcMatch ? srcMatch[1] : attrs.substring(0, 40) });
        }
      }

      // Links: check for space, uppercase, parameters in href
      const hrefMatches = [...content.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)];
      let externalCount = 0;
      for (const m of hrefMatches) {
        const href = m[1];
        if (href.startsWith('http') && !href.includes('mayank-aggarwal.vercel.app')) {
          externalCount++;
        }
        if ((href.includes(' ') || href.includes('%20')) && !href.startsWith('https://images.unsplash.com') && !href.startsWith('https://wa.me') && !href.startsWith('mailto:')) {
          if (!summary.urlContainsSpace.some(u => u.href === href)) {
            summary.urlContainsSpace.push({ page: relPath, href });
          }
        }
        if (href.startsWith('/contact?') || href.startsWith('tel:+91%20') || href.startsWith('tel:+91 ')) {
          if (!summary.urlUppercase.some(u => u.href === href)) {
            summary.urlUppercase.push({ page: relPath, href });
          }
          if (!summary.urlParameters.some(u => u.href === href)) {
            summary.urlParameters.push({ page: relPath, href });
          }
        }
      }
      if (externalCount > 8) {
        summary.highExternalOutlinks.push({ page: relPath, count: externalCount });
      }
    }
  }
}

function checkImageSizes(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      checkImageSizes(full);
    } else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(f.name)) {
      const stats = fs.statSync(full);
      if (stats.size > 100 * 1024) {
        summary.imagesOver100k.push({ file: path.relative('dist', full), sizeKB: Math.round(stats.size / 1024) });
      }
    }
  }
}

if (fs.existsSync(distDir)) {
  checkDir(distDir);
  checkImageSizes(distDir);
}

console.log('--- SUMMARY REPORT ---');
console.log('1. Canonicals Missing:', summary.canonicalMissing);
console.log('2. Titles > 58 chars:', summary.titlesOverLimit);
console.log('3. Meta Desc > 155 chars:', summary.metaDescOver155);
console.log('4. H1 > 70 chars:', summary.h1Over70);
console.log('5. H2 Missing:', summary.h2Missing);
console.log('6. H2 Duplicate:', summary.h2Duplicate);
console.log('7. Images > 100kB:', summary.imagesOver100k);
console.log('8. Images Missing Size count:', summary.imagesMissingSize.length, summary.imagesMissingSize.slice(0, 5));
console.log('9. URLs with Space:', summary.urlContainsSpace);
console.log('10. URLs with Uppercase/Params in internal links:', summary.urlUppercase);
console.log('11. High External Outlinks pages count:', summary.highExternalOutlinks.length);
