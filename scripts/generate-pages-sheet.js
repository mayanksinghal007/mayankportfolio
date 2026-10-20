import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SERVICES } from '../src/data/initialData.js';
import { DEFAULT_BLOG_POSTS } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const baseUrl = 'https://mayank-aggarwal.vercel.app';

const staticPages = [
  { url: `${baseUrl}/`, name: 'Homepage (Founder Brand & Reel)', category: 'Core Pages', priority: '1.0', freq: 'Weekly', intent: 'Brand positioning, proof points, portfolio introduction' },
  { url: `${baseUrl}/about`, name: 'About Mayank Aggarwal', category: 'Core Pages', priority: '0.8', freq: 'Monthly', intent: 'Founder background, education, philosophy' },
  { url: `${baseUrl}/services`, name: 'Services Hub Directory', category: 'Core Pages', priority: '0.9', freq: 'Weekly', intent: 'Overview of all performance & AI creative services' },
  { url: `${baseUrl}/portfolio`, name: 'Portfolio & Case Studies', category: 'Core Pages', priority: '0.8', freq: 'Weekly', intent: 'Commercial proof, client work, campaigns' },
  { url: `${baseUrl}/ads`, name: 'Video Ads Showcase', category: 'Core Pages', priority: '0.8', freq: 'Weekly', intent: 'Showreel, vertical ad reels, video creative' },
  { url: `${baseUrl}/process`, name: '4-Step Working Process', category: 'Core Pages', priority: '0.7', freq: 'Monthly', intent: 'Audit, creative sandbox, launch, scale' },
  { url: `${baseUrl}/contact`, name: 'Contact & Project Inquiry', category: 'Core Pages', priority: '0.8', freq: 'Monthly', intent: 'High-intent lead generation, WhatsApp chat' },
  { url: `${baseUrl}/blog`, name: 'Marketing & AI Playbooks Hub', category: 'Core Pages', priority: '0.9', freq: 'Daily', intent: 'Knowledge hub, guides, 50 playbooks' },
  { url: `${baseUrl}/tools/meta-ads-roas-calculator`, name: 'Meta Ads ROAS & Margin Calculator', category: 'Interactive Tools', priority: '0.9', freq: 'Weekly', intent: 'Free profit calculation, break-even ROAS' },
  { url: `${baseUrl}/tools/ai-video-prompt-generator`, name: 'AI Video Prompt Generator', category: 'Interactive Tools', priority: '0.9', freq: 'Weekly', intent: 'Commercial camera prompt generation (Runway/Kling)' },
  { url: `${baseUrl}/tools/reel-hook-generator`, name: 'Viral Reel 3-Second Hook Generator', category: 'Interactive Tools', priority: '0.9', freq: 'Weekly', intent: 'High-retention video hooks for Instagram & TikTok' },
  { url: `${baseUrl}/locations/delhi`, name: 'Delhi Performance Marketing Hub', category: 'Local SEO Hubs', priority: '0.8', freq: 'Monthly', intent: 'D2C fashion & luxury brand ad scaling in Delhi' },
  { url: `${baseUrl}/locations/gurugram`, name: 'Gurugram Performance Marketing Hub', category: 'Local SEO Hubs', priority: '0.8', freq: 'Monthly', intent: 'B2B SaaS & high-ticket pipeline generation' },
  { url: `${baseUrl}/locations/noida`, name: 'Noida Performance Marketing Hub', category: 'Local SEO Hubs', priority: '0.8', freq: 'Monthly', intent: 'IT services & export manufacturing leads' },
  { url: `${baseUrl}/locations/mumbai`, name: 'Mumbai Performance Marketing Hub', category: 'Local SEO Hubs', priority: '0.8', freq: 'Monthly', intent: 'Consumer goods, fintech & beauty brand ads' },
  { url: `${baseUrl}/locations/bangalore`, name: 'Bengaluru AI Performance Marketing Hub', category: 'Local SEO Hubs', priority: '0.8', freq: 'Monthly', intent: 'Tech startups, apps & generative video ads' },
  { url: `${baseUrl}/glossary`, name: 'Digital Marketing & AI Glossary (50+ Terms)', category: 'Authority & Press', priority: '0.8', freq: 'Weekly', intent: 'Topical authority & definitions for SEO/AEO' },
  { url: `${baseUrl}/press`, name: 'Press & Authority Hub', category: 'Authority & Press', priority: '0.8', freq: 'Monthly', intent: '20 digital profiles, backlinks, external verification' },
  { url: `${baseUrl}/privacy-policy`, name: 'Privacy Policy', category: 'Legal Pages', priority: '0.3', freq: 'Yearly', intent: 'Legal compliance & cookie disclosures' },
  { url: `${baseUrl}/terms`, name: 'Terms of Service', category: 'Legal Pages', priority: '0.3', freq: 'Yearly', intent: 'Engagement terms & service boundaries' },
];

const servicePages = DEFAULT_SERVICES.map((s) => ({
  url: `${baseUrl}/services/${s.slug}`,
  name: `${s.name}: ${s.headline}`,
  category: 'Service Detail Pages',
  priority: '0.8',
  freq: 'Monthly',
  intent: s.intro || s.overview || 'Service scope, deliverables & retainer inquiries',
}));

const blogPages = DEFAULT_BLOG_POSTS.map((b) => ({
  url: `${baseUrl}/blog/${b.slug}`,
  name: b.title,
  category: `Blog: ${b.category || 'Strategy'}`,
  priority: '0.8',
  freq: 'Monthly',
  intent: b.excerpt || b.metaDesc || 'In-depth playbook & actionable marketing guide',
}));

const allRows = [...staticPages, ...servicePages, ...blogPages];

// Generate CSV string with proper quotes
const escapeCsv = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;

const csvHeader = ['#', 'Category', 'Page Name / Title', 'Live URL', 'Search Intent / Description', 'Priority', 'Crawl Frequency'];
const csvLines = [
  csvHeader.join(','),
  ...allRows.map((r, i) =>
    [
      i + 1,
      escapeCsv(r.category),
      escapeCsv(r.name),
      escapeCsv(r.url),
      escapeCsv(r.intent),
      escapeCsv(r.priority),
      escapeCsv(r.freq),
    ].join(',')
  ),
];

const csvContent = csvLines.join('\n');

// Write to Root, Public and Dist
const rootPath = path.resolve(rootDir, 'MAYANK-WEBSITE-ALL-PAGES.csv');
const publicPath = path.resolve(rootDir, 'public', 'MAYANK-WEBSITE-ALL-PAGES.csv');
const distPath = path.resolve(rootDir, 'dist', 'MAYANK-WEBSITE-ALL-PAGES.csv');

fs.writeFileSync(rootPath, csvContent, 'utf8');
fs.writeFileSync(publicPath, csvContent, 'utf8');
if (fs.existsSync(path.resolve(rootDir, 'dist'))) {
  fs.writeFileSync(distPath, csvContent, 'utf8');
}

console.log(`✓ Successfully generated Google Sheets compatible CSV with ${allRows.length} pages:`);
console.log(`📁 Local File: ${rootPath}`);
console.log(`🌐 Live URL: ${baseUrl}/MAYANK-WEBSITE-ALL-PAGES.csv`);
