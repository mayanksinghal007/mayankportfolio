import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function getAllFiles(dir, ext = '.html') {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(full, ext));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getAllFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

const report = {
  missingTitle: [],
  duplicateTitle: {},
  shortTitle: [],
  longTitle: [],
  missingDesc: [],
  duplicateDesc: {},
  shortDesc: [],
  longDesc: [],
  missingH1: [],
  multipleH1: [],
  missingCanonical: [],
  multipleCanonical: [],
  canonicalMismatch: [],
  missingAlt: [],
  brokenInternalLinks: [],
  trailingSlashLinks: [],
  wordCountLow: [],
};

const knownRoutes = new Set();
for (const f of htmlFiles) {
  let rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel === 'index.html') {
    knownRoutes.add('/');
  } else if (rel.endsWith('/index.html')) {
    knownRoutes.add('/' + rel.replace(/\/index\.html$/, ''));
  } else {
    knownRoutes.add('/' + rel);
  }
}

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatches = [...html.matchAll(/<title>([^<]*)<\/title>/gi)];
  if (titleMatches.length === 0) {
    report.missingTitle.push(relPath);
  } else {
    if (titleMatches.length > 1) {
      report.duplicateTitle[relPath] = titleMatches.length;
    }
    const t = titleMatches[0][1].trim();
    if (t.length < 30) report.shortTitle.push({ relPath, length: t.length, t });
    if (t.length > 65) report.longTitle.push({ relPath, length: t.length, t });
  }

  // Meta description
  const descMatches = [...html.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
  // Also check order where content comes before name
  const descMatchesRev = [...html.matchAll(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/gi)];
  const allDescMatches = [...descMatches, ...descMatchesRev];
  if (allDescMatches.length === 0) {
    report.missingDesc.push(relPath);
  } else {
    if (allDescMatches.length > 1) {
      report.duplicateDesc[relPath] = allDescMatches.length;
    }
    const d = allDescMatches[0][1].trim();
    if (d.length < 70) report.shortDesc.push({ relPath, length: d.length, d });
    if (d.length > 160) report.longDesc.push({ relPath, length: d.length, d });
  }

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    report.missingH1.push(relPath);
  } else if (h1Matches.length > 1) {
    report.multipleH1.push({ relPath, count: h1Matches.length });
  }

  // Canonical
  const canonicalMatches = [...html.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/gi)];
  const canonicalMatchesRev = [...html.matchAll(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/gi)];
  const allCanonicals = [...canonicalMatches, ...canonicalMatchesRev];
  if (allCanonicals.length === 0) {
    report.missingCanonical.push(relPath);
  } else if (allCanonicals.length > 1) {
    report.multipleCanonical.push({ relPath, count: allCanonicals.length });
  }

  // Images without alt
  const imgMatches = [...html.matchAll(/<img\s+([^>]*)\/?>/gi)];
  for (const m of imgMatches) {
    const attrs = m[1];
    if (!/alt=["'][^"']*["']/i.test(attrs)) {
      report.missingAlt.push({ relPath, img: m[0].slice(0, 80) });
    }
  }

  // Internal Links
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)];
  for (const lm of linkMatches) {
    const href = lm[1].split('#')[0].split('?')[0];
    if (!href || href === '' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('https://mayank-aggarwal.vercel.app')) {
      const clean = href.replace('https://mayank-aggarwal.vercel.app', '') || '/';
      if (clean.length > 1 && clean.endsWith('/')) {
        report.trailingSlashLinks.push({ relPath, href });
      }
      if (!knownRoutes.has(clean) && !knownRoutes.has(clean + '/index.html') && !fs.existsSync(path.join(distDir, clean.replace(/^\//, '')))) {
        report.brokenInternalLinks.push({ relPath, href });
      }
    } else if (href.startsWith('/')) {
      if (href.length > 1 && href.endsWith('/')) {
        report.trailingSlashLinks.push({ relPath, href });
      }
      if (!knownRoutes.has(href) && !knownRoutes.has(href + '/index.html') && !fs.existsSync(path.join(distDir, href.replace(/^\//, '')))) {
        report.brokenInternalLinks.push({ relPath, href });
      }
    }
  }
}

console.log('--- AUDIT REPORT SUMMARY ---');
console.log('Missing Title:', report.missingTitle.length);
console.log('Multiple Titles on page:', Object.keys(report.duplicateTitle).length);
console.log('Short Title (<30):', report.shortTitle.length);
console.log('Long Title (>65):', report.longTitle.length);
console.log('Missing Description:', report.missingDesc.length);
console.log('Multiple Descriptions on page:', Object.keys(report.duplicateDesc).length);
console.log('Short Description (<70):', report.shortDesc.length);
console.log('Long Description (>160):', report.longDesc.length);
console.log('Missing H1:', report.missingH1.length);
console.log('Multiple H1:', report.multipleH1.length);
console.log('Missing Canonical:', report.missingCanonical.length);
console.log('Multiple Canonicals on page:', report.multipleCanonical.length);
console.log('Images missing alt attribute:', report.missingAlt.length);
console.log('Broken Internal Links:', report.brokenInternalLinks.length);
console.log('Trailing Slash Links:', report.trailingSlashLinks.length);

// Cross-page duplicate title & description checks
const titleMap = {};
const descMap = {};
const h1Map = {};

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  const tm = html.match(/<title>([^<]*)<\/title>/i);
  if (tm) {
    const t = tm[1].trim();
    if (!titleMap[t]) titleMap[t] = [];
    titleMap[t].push(relPath);
  }

  const dm = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
             html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  if (dm) {
    const d = dm[1].trim();
    if (!descMap[d]) descMap[d] = [];
    descMap[d].push(relPath);
  }

  const hm = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (hm) {
    const h = hm[1].replace(/<[^>]*>/g, '').trim();
    if (!h1Map[h]) h1Map[h] = [];
    h1Map[h].push(relPath);
  }
}

console.log('\n--- CROSS-PAGE DUPLICATES (SEMRUSH ERRORS/WARNINGS) ---');
for (const [t, pages] of Object.entries(titleMap)) {
  if (pages.length > 1) {
    console.log(`[DUPLICATE TITLE] "${t}" across ${pages.length} pages:`, pages);
  }
}

for (const [d, pages] of Object.entries(descMap)) {
  if (pages.length > 1) {
    console.log(`[DUPLICATE DESCRIPTION] "${d.slice(0, 50)}..." across ${pages.length} pages:`, pages);
  }
}

for (const [h, pages] of Object.entries(h1Map)) {
  if (pages.length > 1) {
    console.log(`[DUPLICATE H1] "${h}" across ${pages.length} pages:`, pages);
  }
}

// Internal link connectivity check
const incomingLinks = {};
for (const r of knownRoutes) {
  incomingLinks[r] = 0;
}

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const matches = [...html.matchAll(/<a\s+[^>]*href=["']([^"'#?]+)["']/gi)];
  for (const m of matches) {
    let href = m[1];
    if (href.startsWith('https://mayank-aggarwal.vercel.app')) {
      href = href.replace('https://mayank-aggarwal.vercel.app', '') || '/';
    }
    if (incomingLinks[href] !== undefined) {
      incomingLinks[href]++;
    }
  }
}

console.log('\n--- INTERNAL LINKING ANALYSIS (SEMRUSH 89% -> 100%) ---');
const orphaned = [];
const lowLinks = [];
for (const [r, count] of Object.entries(incomingLinks)) {
  if (count === 0) orphaned.push(r);
  else if (count < 3) lowLinks.push({ r, count });
}

console.log('Orphaned pages (0 incoming links):', orphaned);
console.log('Pages with fewer than 3 incoming links:', lowLinks.length);
if (lowLinks.length > 0) {
  console.log('Sample low link pages:', lowLinks.slice(0, 10));
}
