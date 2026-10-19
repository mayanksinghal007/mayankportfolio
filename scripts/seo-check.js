import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('\n=============================================');
console.log('--- RUNNING AUDIT: npm run seo:check ---');
console.log('=============================================\n');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory not found. Please run "npm run build" first.\n');
  process.exit(1);
}

let errorsCount = 0;
let warningsCount = 0;
let passedChecks = 0;

// Helper to crawl directory for all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} rendered HTML pages to validate in dist/.\n`);

htmlFiles.forEach((filePath) => {
  const relPath = path.relative(distDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip admin from public SEO checks
  if (relPath.includes('admin')) {
    const hasNoIndex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(content);
    if (hasNoIndex) {
      console.log(`✓ [PRIVATE ROUTE] ${relPath}: Correctly protected with noindex`);
      passedChecks++;
    } else {
      console.error(`✗ [ERROR] ${relPath}: Admin route is missing noindex meta tag!`);
      errorsCount++;
    }
    return;
  }

  // Skip verification files (e.g. Google & Semrush Site Verification)
  if (/^(google|semrush|bing)[a-zA-Z0-9_-]*\.html$/i.test(relPath) || relPath.includes('verification')) {
    console.log(`✓ [VERIFICATION FILE] ${relPath}: Skipped from public content SEO checks`);
    return;
  }


  // 1. Title Check
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`✗ [ERROR] ${relPath}: Missing <title> tag`);
    errorsCount++;
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 30 || title.length > 70) {
      console.warn(`! [WARN] ${relPath}: Title length (${title.length} chars) - "${title}"`);
      warningsCount++;
    } else {
      passedChecks++;
    }
  }

  // 2. Meta Description Check
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`✗ [ERROR] ${relPath}: Missing meta description`);
    errorsCount++;
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 100 || desc.length > 175) {
      console.warn(`! [WARN] ${relPath}: Meta description length (${desc.length} chars)`);
      warningsCount++;
    } else {
      passedChecks++;
    }
  }

  // 3. Canonical URL Check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  if (!canonicalMatch || !canonicalMatch[1].trim()) {
    console.error(`✗ [ERROR] ${relPath}: Missing canonical <link>`);
    errorsCount++;
  } else {
    passedChecks++;
  }

  // 4. Exactly one H1 per page
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length === 0) {
    console.error(`✗ [ERROR] ${relPath}: Missing <h1> heading`);
    errorsCount++;
  } else if (h1Matches.length > 1) {
    console.warn(`! [WARN] ${relPath}: Multiple <h1> tags found (${h1Matches.length})`);
    warningsCount++;
  } else {
    passedChecks++;
  }

  // 5. Image Alt attributes check
  const imgTags = content.match(/<img[^>]*>/gi) || [];
  imgTags.forEach((img) => {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      console.warn(`! [WARN] ${relPath}: Image tag missing alt attribute: ${img.slice(0, 50)}...`);
      warningsCount++;
    }
  });

  // 6. JSON-LD validation
  const jsonLdMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  jsonLdMatches.forEach((tag) => {
    const jsonContent = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
    try {
      JSON.parse(jsonContent);
      passedChecks++;
    } catch (e) {
      console.error(`✗ [ERROR] ${relPath}: Malformed JSON-LD structured data (${e.message})`);
      errorsCount++;
    }
  });
});

// Check sitemap.xml
const sitemapPath = path.resolve(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  if (sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset')) {
    console.log(`✓ [SITEMAP] dist/sitemap.xml is valid XML format`);
    passedChecks++;
  } else {
    console.error(`✗ [ERROR] dist/sitemap.xml is malformed`);
    errorsCount++;
  }
} else {
  console.error(`✗ [ERROR] dist/sitemap.xml is missing`);
  errorsCount++;
}

// Check robots.txt
const robotsPath = path.resolve(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('Disallow: /admin') && robotsContent.includes('Sitemap:')) {
    console.log(`✓ [ROBOTS] dist/robots.txt correctly disallows /admin and defines Sitemap`);
    passedChecks++;
  } else {
    console.error(`✗ [ERROR] dist/robots.txt missing Disallow: /admin or Sitemap`);
    errorsCount++;
  }
} else {
  console.error(`✗ [ERROR] dist/robots.txt is missing`);
  errorsCount++;
}

// Check IndexNow key file
const indexNowKey = '8f1a23c5b4d7e901f2a34b56c7d8e90a';
const indexNowPath = path.resolve(distDir, `${indexNowKey}.txt`);
if (fs.existsSync(indexNowPath)) {
  const keyContent = fs.readFileSync(indexNowPath, 'utf8').trim();
  if (keyContent === indexNowKey) {
    console.log(`✓ [INDEXNOW] dist/${indexNowKey}.txt exists and key matches`);
    passedChecks++;
  } else {
    console.error(`✗ [ERROR] dist/${indexNowKey}.txt content does not match expected key`);
    errorsCount++;
  }
} else {
  console.error(`✗ [ERROR] dist/${indexNowKey}.txt IndexNow key file is missing`);
  errorsCount++;
}

console.log('\n=============================================');
console.log(`AUDIT COMPLETE: ${passedChecks} checks passed, ${warningsCount} warnings, ${errorsCount} errors.`);
console.log('=============================================\n');

if (errorsCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
