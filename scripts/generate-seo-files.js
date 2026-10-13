import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SERVICES } from '../src/data/initialData.js';
import { DEFAULT_BLOG_POSTS } from '../src/data/blogData.js';
import { SITE_CONFIG } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');

const siteUrl = (process.env.VITE_SITE_URL || SITE_CONFIG.siteUrl || 'https://example.com').replace(/\/+$/, '');
const today = new Date().toISOString().split('T')[0];

// 1. SITEMAP.XML
function generateSitemap() {
  const staticRoutes = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services', changefreq: 'weekly', priority: '0.9' },
    { loc: '/portfolio', changefreq: 'weekly', priority: '0.8' },
    { loc: '/ads', changefreq: 'weekly', priority: '0.8' },
    { loc: '/process', changefreq: 'monthly', priority: '0.7' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  ];

  const serviceRoutes = DEFAULT_SERVICES.map((s) => ({
    loc: `/services/${s.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const blogRoutes = DEFAULT_BLOG_POSTS.map((b) => ({
    loc: `/blog/${b.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: b.updated || b.date,
  }));

  const allUrls = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${siteUrl}${item.loc}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

// 2. ROBOTS.TXT
function generateRobots() {
  return `# Robots.txt for Mayank Aggarwal Portfolio (${siteUrl})
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

# Explicit permissions for search and generative AI answer crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

// 3. RSS.XML FEED
function generateRss() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name} — Marketing &amp; AI Playbooks</title>
    <link>${siteUrl}/blog</link>
    <description>Tactical guides on Meta Ads, generative AI video workflows, short-form reel hooks, and modern SEO/AEO/GEO strategies by Mayank Aggarwal.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${DEFAULT_BLOG_POSTS.map(
  (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      <category>${post.category}</category>
    </item>`
).join('\n')}
  </channel>
</rss>`;
}

// 4. LLMS.TXT (Generative Engine Optimization)
function generateLlms() {
  return `# Mayank Aggarwal — Digital Marketing & AI Specialist

> Professional portfolio, services, and technical guides of Mayank Aggarwal, based in Delhi, India.

## About
Mayank Aggarwal is a Digital Marketing & AI Specialist with 1 year of hands-on experience in performance marketing, Meta Ads management, generative AI video production (Runway Gen-3, Kling AI), and short-form content strategy. He holds a B.Com (Hons) degree from Shaheed Bhagat Singh College, University of Delhi, and operates under the agency brand Klikwise.

## Core Services
- **Performance Marketing (Meta Ads):** Account structure, Pixel/CAPI setup, Advantage+ campaigns, and creative testing for D2C and service businesses.
- **Social Media Management:** 30-day content calendar execution, reel scripting, and brand authority positioning.
- **AI Video & Filmmaking:** Generative promotional videos and UGC ads using Runway Gen-3 Alpha, Kling AI, and sound design.
- **AI Voiceover & Audio Design:** Neural voice narration using ElevenLabs Multilingual v2 with commercial audio clearance.
- **AI Images & Creative Branding:** Midjourney v6.1 prompt engineering, static ad variations, and graphic design assets.
- **Content & Reel Strategy:** 3-second hook formulas, retention pacing, and short-form video frameworks.
- **SEO & Content Support:** Keyword mapping, on-page schema structuring, and high-intent blog content.

## Key URLs
- Homepage: ${siteUrl}/
- About Mayank: ${siteUrl}/about
- Services Directory: ${siteUrl}/services
- Portfolio Case Studies: ${siteUrl}/portfolio
- Ads Showcase: ${siteUrl}/ads
- Working Process: ${siteUrl}/process
- Marketing & AI Blog: ${siteUrl}/blog
- Contact & Inquiries: ${siteUrl}/contact

## Published Playbooks & Articles
${DEFAULT_BLOG_POSTS.map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.summary}`).join('\n')}

## Contact Details
- Location: Delhi, India
- Email: ${SITE_CONFIG.email}
- WhatsApp: +${SITE_CONFIG.whatsapp}
- LinkedIn: ${SITE_CONFIG.linkedin}
- Instagram: ${SITE_CONFIG.instagram}
`;
}

// 5. HUMANS.TXT
function generateHumans() {
  return `/* TEAM */
Founder & Developer: Mayank Aggarwal
Role: Digital Marketing & AI Specialist
Location: Delhi, India
Website: ${siteUrl}

/* TECH STACK */
Frontend: React 19, React Router 7, Vite 8
Styling: Vanilla CSS Design Tokens, Bricolage Grotesque, Instrument Serif, DM Sans, JetBrains Mono
Prerendering: Static SSR HTML via renderToString
SEO: Schema.org JSON-LD, Open Graph, Twitter Cards, llms.txt
`;
}

export function writeSeoFiles() {
  const sitemapContent = generateSitemap();
  const robotsContent = generateRobots();
  const rssContent = generateRss();
  const llmsContent = generateLlms();
  const humansContent = generateHumans();

  const targets = [publicDir];
  if (fs.existsSync(distDir)) {
    targets.push(distDir);
  }

  for (const dir of targets) {
    if (!fs.existsSync(dir)) continue;
    fs.writeFileSync(path.resolve(dir, 'sitemap.xml'), sitemapContent, 'utf8');
    fs.writeFileSync(path.resolve(dir, 'robots.txt'), robotsContent, 'utf8');
    fs.writeFileSync(path.resolve(dir, 'rss.xml'), rssContent, 'utf8');
    fs.writeFileSync(path.resolve(dir, 'llms.txt'), llmsContent, 'utf8');
    fs.writeFileSync(path.resolve(dir, 'llms-full.txt'), llmsContent, 'utf8');
    fs.writeFileSync(path.resolve(dir, 'humans.txt'), humansContent, 'utf8');
  }

  console.log('✓ Generated sitemap.xml, robots.txt, rss.xml, llms.txt, and humans.txt');
}

writeSeoFiles();
