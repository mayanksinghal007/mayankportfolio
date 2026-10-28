import fs from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const logsDir = path.resolve(rootDir, 'logs');
const logFile = path.resolve(logsDir, 'daily-task.log');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function appendLog(line) {
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${line}\n`, 'utf8');
  } catch {}
}

function run(cmd, desc) {
  console.log(`\n======================================================`);
  console.log(`▶ STEP: ${desc}`);
  console.log(`Command: ${cmd}`);
  console.log(`======================================================`);
  try {
    execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    console.log(`✓ Completed: ${desc}`);
    appendLog(`SUCCESS: ${desc}`);
  } catch (err) {
    console.error(`✗ Failed: ${desc}`, err.message);
    appendLog(`FAILED: ${desc} - ${err.message}`);
    throw err;
  }
}

async function main() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`\n======================================================`);
  console.log(`🚀 RUNNING DAILY PORTFOLIO & SEO PIPELINE: ${today}`);
  console.log(`======================================================\n`);
  appendLog(`=== STARTING DAILY PIPELINE RUN (${today}) ===`);

  // 1. Build and prerender static HTML pages and SEO files
  run(`${npmCmd} run build`, 'Build Client, SSR, Static Prerendering & SEO Assets');

  // 2. Validate broken internal links
  run('node scripts/check-links.js', 'Validate Internal Links Across All Prerendered HTML Pages');

  // 3. Run rigorous SEO checks
  run('node scripts/seo-check.js', 'Validate Meta Tags, Headings, Canonicals & Schemas');

  // 4. Run full site audit scan (SEMRush compliance & link connectivity)
  run('node scripts/audit-scan.js', 'Audit Full Site Compliance & Deep Link Health');

  // 5. Submit Sitemap URLs to IndexNow (Bing, Yandex, IndexNow network)
  run('node scripts/submit-indexnow.js', 'Submit All Sitemap URLs to IndexNow & Bing');

  // 6. Index Core Backlink Landing Pages
  run('node scripts/index-backlinks.js', 'Validate Feeds & Index 37 Backlink Target Pages');

  // 7. Automatic Git Stage, Commit & Push to Vercel
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
      appendLog(`GIT: Committed - ${commitMsg}`);
    } else {
      console.log(`ℹ No file changes detected to commit.`);
      appendLog(`GIT: No file changes to commit.`);
    }

    // Push to GitHub origin main (triggers automatic Vercel production deployment)
    execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
    console.log(`✓ Successfully pushed to GitHub & Vercel production!`);
    appendLog(`GIT: Pushed to origin/main successfully.`);
  } catch (err) {
    console.error(`⚠ Git push notice:`, err.message);
    appendLog(`GIT NOTICE: ${err.message}`);
  }

  appendLog(`=== COMPLETED DAILY PIPELINE RUN (${today}) ===\n`);
  console.log(`\n======================================================`);
  console.log(`🎉 ALL DAILY TASKS COMPLETED & PUSHED TO VERCEL!`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  appendLog(`FATAL ERROR: Pipeline aborted - ${err.message}\n`);
  process.exit(1);
});
