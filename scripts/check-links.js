import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const distFiles = getFiles('dist');
console.log('Total HTML files scanned:', distFiles.length);

const allHrefs = new Map();
const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;

for (const file of distFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (!allHrefs.has(href)) {
      allHrefs.set(href, []);
    }
    allHrefs.get(href).push(file);
  }
}

console.log('Total unique hrefs found:', allHrefs.size);

const httpLinks = [];
const brokenInternal = [];
const externalLinks = [];

for (const [href, files] of allHrefs.entries()) {
  if (href.startsWith('http://')) {
    httpLinks.push({ href, count: files.length, sampleFile: files[0] });
    continue;
  }
  
  if (href.startsWith('https://')) {
    try {
      const urlObj = new URL(href);
      if (urlObj.hostname === 'mayankaggarwal-one.vercel.app') {
        const cleanPath = urlObj.pathname;
        const testHtml = path.join('dist', cleanPath + '.html');
        const testIndex = path.join('dist', cleanPath, 'index.html');
        const testDirect = path.join('dist', cleanPath);
        let exists = fs.existsSync(testIndex) || fs.existsSync(testHtml) || (fs.existsSync(testDirect) && !fs.statSync(testDirect).isDirectory());
        if (!exists && cleanPath !== '/') {
          brokenInternal.push({ href, cleanPath, count: files.length, sampleFile: files[0] });
        }
      } else {
        externalLinks.push({ href, count: files.length, sampleFile: files[0] });
      }
    } catch (e) {
      // ignore
    }
    continue;
  }
  
  if (href.startsWith('/') && !href.startsWith('//')) {
    const cleanPath = href.split('?')[0].split('#')[0];
    if (cleanPath === '' || cleanPath === '/') {
      continue;
    }
    const testHtml = path.join('dist', cleanPath + '.html');
    const testIndex = path.join('dist', cleanPath, 'index.html');
    const testDirect = path.join('dist', cleanPath);
    let exists = fs.existsSync(testIndex) || fs.existsSync(testHtml) || (fs.existsSync(testDirect) && !fs.statSync(testDirect).isDirectory());
    if (!exists) {
      brokenInternal.push({ href, cleanPath, count: files.length, sampleFile: files[0] });
    }
  }
}

console.log('\n--- HTTP (non-secure) Links ---');
console.log(JSON.stringify(httpLinks, null, 2));

console.log('\n--- Broken Internal Links ---');
console.log(JSON.stringify(brokenInternal, null, 2));

console.log('\n--- External Links Count ---', externalLinks.length);
console.log('\n--- All External Links Sample ---');
console.log(externalLinks.map(e => e.href));
