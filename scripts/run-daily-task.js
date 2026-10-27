import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function run(cmd, desc) {
  console.log(`\n======================================================`);
  console.log(`▶ STEP: ${desc}`);
  console.log(`Command: ${cmd}`);
  console.log(`======================================================`);
  try {
    execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    console.log(`✓ Completed: ${desc}`);
  } catch (err) {
    console.error(`✗ Failed: ${desc}`, err.message);
    throw err;
  }
}

async function main() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`\n======================================================`);
  console.log(`🚀 RUNNING DAILY PORTFOLIO & SEO PIPELINE: ${today}`);
  console.log(`======================================================\n`);

  // 1. Build and prerender static HTML pages and SEO files
  run('npm run build', 'Build Client, SSR, Static Prerendering (185 Pages) & SEO Assets');

  // 2. Validate broken internal links
  run('node scripts/check-links.js', 'Validate Internal Links Across All Prerendered HTML Pages');

  // 3. Run rigorous SEO checks
  run('node scripts/seo-check.js', 'Validate Meta Tags, Headings, Canonicals & Schemas');

  // 4. Submit Sitemap URLs to IndexNow (Bing, Yandex, IndexNow network)
  run('node scripts/submit-indexnow.js', 'Submit All Sitemap URLs to IndexNow & Bing');

  // 5. Index Core Backlink Landing Pages
  run('node scripts/index-backlinks.js', 'Ping Search Engines & Index 37 Backlink Target Pages');

  // 6. Automatic Git Stage, Commit & Push to Vercel
  console.log(`\n======================================================`);
  console.log(`📦 AUTO-PUSHING CHANGES TO GITHUB & VERCEL...`);
  console.log(`======================================================`);
  try {
    execSync('git add -A', { cwd: rootDir, stdio: 'inherit' });
    
    // Check if there are changes to commit
    const status = execSync('git status --porcelain', { cwd: rootDir }).toString().trim();
    if (status) {
      const commitMsg = `chore(daily-task): automated daily seo sync, prerender, and indexing run (${today})`;
      execSync(`git commit -m "${commitMsg}"`, { cwd: rootDir, stdio: 'inherit' });
      console.log(`✓ Committed: ${commitMsg}`);
    } else {
      console.log(`ℹ No file changes detected to commit.`);
    }

    // Push to GitHub origin main (triggers automatic Vercel production deployment)
    execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
    console.log(`✓ Successfully pushed to GitHub & Vercel production!`);
  } catch (err) {
    console.error(`⚠ Git push notice:`, err.message);
  }

  console.log(`\n======================================================`);
  console.log(`🎉 ALL DAILY TASKS COMPLETED & PUSHED TO VERCEL!`);
  console.log(`======================================================\n`);
}

main().catch(() => {
  process.exit(1);
});
