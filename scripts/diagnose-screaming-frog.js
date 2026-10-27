import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = getAllHtmlFiles(distDir);
console.log(`Analyzing ${files.length} HTML files in dist/...\n`);

const issues = {
  canonicalised: [],
  pageTitleOver561Px: [],
  pageTitleSameAsH1: [],
  h2Multiple: [],
  h2Over70Chars: [],
  h2NonSequential: [],
  h2Duplicate: [],
  metaDescOver985Px: [],
  altTextOver100Chars: [],
  internalNofollow: [],
  highExternalOutlinks: [],
  external4xx: [],
};

// Check images over 100kb
function checkLargeImages(dir) {
  let largeImgs = [];
  function walk(d) {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(f.name)) {
        const sz = fs.statSync(p).size;
        if (sz > 100 * 1024) {
          largeImgs.push({ path: path.relative(distDir, p), sizeKb: (sz / 1024).toFixed(1) });
        }
      }
    }
  }
  walk(dir);
  return largeImgs;
}

const largeImages = checkLargeImages(distDir);

for (const filePath of files) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // Skip verification files
  if (/^(google|semrush|bing)[a-zA-Z0-9_-]*\.html$/i.test(relPath) || relPath.includes('verification')) {
    continue;
  }

  // Determine expected canonical URL
  let pagePath = relPath === 'index.html' ? '/' : '/' + relPath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  const expectedUrl = `https://mayankaggarwal-one.vercel.app${pagePath === '/' ? '' : pagePath}`;

  // 1. Canonical check
  const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                   html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  if (canMatch) {
    const canonical = canMatch[1];
    if (canonical !== expectedUrl && canonical !== expectedUrl + '/' && (canonical + '/') !== expectedUrl) {
      issues.canonicalised.push({ relPath, expectedUrl, canonical });
    }
  }

  // 2. Page Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  // Roughly in Google SERPs ~561px is ~60 characters (average ~9.3px per char in Arial 18px / 20px desktop SERP title)
  if (title.length > 58) {
    issues.pageTitleOver561Px.push({ relPath, title, len: title.length });
  }

  // 3. H1 headings
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1Texts = h1Matches.map(m => m[1].replace(/<[^>]*>/g, '').trim());

  if (title && h1Texts.length > 0) {
    for (const h1 of h1Texts) {
      if (title.toLowerCase() === h1.toLowerCase()) {
        issues.pageTitleSameAsH1.push({ relPath, title, h1 });
      }
    }
  }

  // 4. H2 headings
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2Texts = h2Matches.map(m => m[1].replace(/<[^>]*>/g, '').trim());

  if (h2Texts.length > 1) {
    issues.h2Multiple.push({ relPath, count: h2Texts.length });
  }

  // H2 duplicate on same page
  const h2Set = new Set();
  const dupH2s = [];
  for (const h2 of h2Texts) {
    const norm = h2.toLowerCase();
    if (h2Set.has(norm)) {
      dupH2s.push(h2);
    }
    h2Set.add(norm);
  }
  if (dupH2s.length > 0) {
    issues.h2Duplicate.push({ relPath, dupH2s });
  }

  // H2 over 70 characters
  for (const h2 of h2Texts) {
    if (h2.length > 70) {
      issues.h2Over70Chars.push({ relPath, h2: h2.slice(0, 80), len: h2.length });
    }
  }

  // 5. Heading hierarchy (Non-Sequential)
  // e.g. H3 before H2, or H1 missing, or jumping from H1 directly to H3/H4
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let hMatch;
  let levels = [];
  while ((hMatch = headingRegex.exec(html)) !== null) {
    levels.push(parseInt(hMatch[1], 10));
  }
  let isNonSequential = false;
  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i + 1] > levels[i] + 1) {
      isNonSequential = true;
      break;
    }
  }
  if (isNonSequential) {
    issues.h2NonSequential.push({ relPath, levels });
  }

  // 6. Meta Description length (985px is approx 155-160 characters in Google desktop snippet font)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  if (descMatch) {
    const desc = descMatch[1].trim();
    if (desc.length > 155) {
      issues.metaDescOver985Px.push({ relPath, len: desc.length, desc: desc.slice(0, 80) + '...' });
    }
  }

  // 7. Alt text over 100 characters
  const imgMatches = [...html.matchAll(/<img[^>]*alt=["']([^"']*)["'][^>]*>/gi)];
  for (const im of imgMatches) {
    if (im[1].length > 100) {
      issues.altTextOver100Chars.push({ relPath, len: im[1].length, alt: im[1] });
    }
  }

  // 8. Internal nofollow links
  const linkMatches = [...html.matchAll(/<a\s+([^>]*)>/gi)];
  let externalOutlinks = 0;
  for (const lm of linkMatches) {
    const attrs = lm[1];
    const hrefM = attrs.match(/href=["']([^"']+)["']/i);
    const relM = attrs.match(/rel=["']([^"']+)["']/i);
    if (!hrefM) continue;
    const href = hrefM[1];
    const isExternal = href.startsWith('http') && !href.includes('mayankaggarwal-one.vercel.app') && !href.includes('mayank-aggarwal.vercel.app');
    if (isExternal) {
      externalOutlinks++;
    } else {
      if (relM && /nofollow/i.test(relM[1])) {
        issues.internalNofollow.push({ relPath, href, tag: lm[0] });
      }
    }
  }
  if (externalOutlinks > 40) {
    issues.highExternalOutlinks.push({ relPath, count: externalOutlinks });
  }
}

console.log('--- DIAGNOSTIC RESULTS ---');
console.log('1. Canonicals Canonicalised count:', issues.canonicalised.length);
if (issues.canonicalised.length) console.log(JSON.stringify(issues.canonicalised, null, 2));

console.log('2. Images > 100kB count:', largeImages.length);
console.log(JSON.stringify(largeImages.slice(0, 10), null, 2));

console.log('3. Page Titles > 58 chars (~561px):', issues.pageTitleOver561Px.length);
console.log(JSON.stringify(issues.pageTitleOver561Px, null, 2));

console.log('4. Page Titles Same as H1:', issues.pageTitleSameAsH1.length);
console.log(JSON.stringify(issues.pageTitleSameAsH1.slice(0, 5), null, 2));

console.log('5. Multiple H2 count:', issues.h2Multiple.length);

console.log('6. Duplicate H2 on same page count:', issues.h2Duplicate.length);
console.log(JSON.stringify(issues.h2Duplicate.slice(0, 7), null, 2));

console.log('7. H2 > 70 characters count:', issues.h2Over70Chars.length);
console.log(JSON.stringify(issues.h2Over70Chars.slice(0, 7), null, 2));

console.log('8. Heading Non-Sequential count:', issues.h2NonSequential.length);
console.log(JSON.stringify(issues.h2NonSequential.slice(0, 10), null, 2));

console.log('9. Meta Description > 155 chars count:', issues.metaDescOver985Px.length);
console.log(JSON.stringify(issues.metaDescOver985Px, null, 2));

console.log('10. Image Alt Text > 100 chars count:', issues.altTextOver100Chars.length);
console.log(JSON.stringify(issues.altTextOver100Chars, null, 2));

console.log('11. Internal Nofollow Links count:', issues.internalNofollow.length);
console.log(JSON.stringify(issues.internalNofollow.slice(0, 5), null, 2));

console.log('12. High External Outlinks count:', issues.highExternalOutlinks.length);

