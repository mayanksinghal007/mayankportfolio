import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SERVICES } from '../src/data/initialData.js';
import { DEFAULT_BLOG_POSTS } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');
const templatePath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf8');

// Inline critical stylesheet directly into HTML head to eliminate render-blocking CSS
const assetsDir = path.resolve(distDir, 'assets');
let inlinedCss = '';
let cssLinkRegex = null;
if (fs.existsSync(assetsDir)) {
  const cssFile = fs.readdirSync(assetsDir).find((f) => f.startsWith('index-') && f.endsWith('.css'));
  if (cssFile) {
    const fullCssPath = path.resolve(assetsDir, cssFile);
    inlinedCss = fs.readFileSync(fullCssPath, 'utf8');
    cssLinkRegex = new RegExp(`<link[^>]*href=["'][^"']*${cssFile}["'][^>]*>`, 'i');
  }
}

let preparedTemplate = baseTemplate;
if (inlinedCss && cssLinkRegex) {
  preparedTemplate = preparedTemplate.replace(
    cssLinkRegex,
    `<style id="critical-brand-css">${inlinedCss}</style>`
  );
}

// List of core public routes
const coreRoutes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/ads',
  '/process',
  '/contact',
  '/blog',
  '/tools/meta-ads-roas-calculator',
  '/tools/ai-video-prompt-generator',
  '/tools/reel-hook-generator',
  '/locations/delhi',
  '/locations/gurugram',
  '/locations/noida',
  '/locations/mumbai',
  '/locations/bangalore',
  '/locations/new-york',
  '/locations/london',
  '/locations/dubai',
  '/locations/los-angeles',
  '/locations/san-francisco',
  '/locations/singapore',
  '/locations/sydney',
  '/locations/toronto',
  '/glossary',
  '/press',
  '/privacy-policy',
  '/terms',
  '/admin',
  '/404',
];

// Service routes
const serviceRoutes = DEFAULT_SERVICES.map((s) => `/services/${s.slug}`);

// Dynamic 50 blog post routes
const blogRoutes = DEFAULT_BLOG_POSTS.map((b) => `/blog/${b.slug}`);

// All combined public routes to statically prerender
const routes = [...coreRoutes, ...serviceRoutes, ...blogRoutes];

async function prerender() {
  console.log(`Starting static HTML prerendering for ${routes.length} total pages...`);

  const ssrEntryPath = path.resolve(distSsrDir, 'prerender-entry.js');
  if (!fs.existsSync(ssrEntryPath)) {
    console.error(`Error: SSR entry not found at ${ssrEntryPath}`);
    process.exit(1);
  }

  // Import the built SSR module
  const { render } = await import(`file://${ssrEntryPath.replace(/\\/g, '/')}`);

  let successCount = 0;

  for (const route of routes) {
    try {
      const { html, helmet } = await render(route);

      let cleanHtml = html;
      let extractedTitle = '';
      const extractedMetas = [];
      const extractedLinks = [];
      const extractedScripts = [];

      // Extract <title>
      cleanHtml = cleanHtml.replace(/<title>([^<]*)<\/title>/gi, (match, titleText) => {
        extractedTitle = `<title>${titleText}</title>`;
        return '';
      });

      // Extract <meta>
      cleanHtml = cleanHtml.replace(/<meta[^>]*>/gi, (match) => {
        extractedMetas.push(match);
        return '';
      });

      // Extract canonical and preload <link> tags rendered by head
      cleanHtml = cleanHtml.replace(/<link[^>]*>/gi, (match) => {
        if (/rel=["'](canonical|preload|alternate)["']/i.test(match)) {
          extractedLinks.push(match);
          return '';
        }
        return match;
      });

      // Extract JSON-LD scripts
      cleanHtml = cleanHtml.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, (match) => {
        extractedScripts.push(match);
        return '';
      });

      // Check helmetContext for any additional tags
      if (helmet) {
        if (!extractedTitle && helmet.title?.toString()) {
          extractedTitle = helmet.title.toString();
        }
        if (helmet.meta?.toString()) {
          extractedMetas.push(helmet.meta.toString());
        }
        if (helmet.link?.toString()) {
          extractedLinks.push(helmet.link.toString());
        }
        if (helmet.script?.toString()) {
          extractedScripts.push(helmet.script.toString());
        }
      }

      // Fallback title if none was extracted
      if (!extractedTitle) {
        extractedTitle = '<title>Mayank Aggarwal | Digital Marketing & AI Specialist</title>';
      }

      let pageHtml = preparedTemplate;

      // Replace root content with clean body HTML
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanHtml}</div>`
      );

      // International SEO hreflang tags
      const currentUrl = `https://mayankaggarwal-one.vercel.app${route === '/' ? '' : route}`;
      const hreflangTags = [
        `<link rel="alternate" hreflang="en-US" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="en-GB" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="en-AE" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="en-IN" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="en" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="x-default" href="${currentUrl}" />`,
      ];

      // Deduplicate verification meta tags that are already configured in baseTemplate
      const filteredMetas = extractedMetas.filter((meta) => {
        if (/name=["'](google-site-verification|msvalidate\.01|semrush-site-verification)["']/i.test(meta)) {
          return false;
        }
        return true;
      });

      // Inject head tags into <head>
      const headTags = [
        extractedTitle,
        ...new Set(filteredMetas),
        ...new Set(extractedLinks),
        ...hreflangTags,
        ...extractedScripts,
      ].filter(Boolean).join('\n    ');

      pageHtml = pageHtml.replace('</head>', `    ${headTags}\n  </head>`);

      // Ensure verification tokens are properly populated if template has unexpanded placeholders
      const googleToken = process.env.VITE_GOOGLE_SITE_VERIFICATION || 'pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc';
      const bingToken = process.env.VITE_BING_SITE_VERIFICATION || 'bing-webmaster-verification-placeholder-code';
      const semrushToken = process.env.VITE_SEMRUSH_SITE_VERIFICATION || 'semrush-verification-code';
      pageHtml = pageHtml.replace(/%VITE_GOOGLE_SITE_VERIFICATION%/g, googleToken);
      pageHtml = pageHtml.replace(/%VITE_BING_SITE_VERIFICATION%/g, bingToken);
      pageHtml = pageHtml.replace(/%VITE_SEMRUSH_SITE_VERIFICATION%/g, semrushToken);

      // Determine output file path
      let outFilePath;
      if (route === '/') {
        outFilePath = path.resolve(distDir, 'index.html');
      } else if (route === '/404') {
        outFilePath = path.resolve(distDir, '404.html');
      } else {
        const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        outFilePath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, pageHtml, 'utf8');
      successCount++;
    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err);
    }
  }

  // Remove temporary dist-ssr directory
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch (e) {}

  console.log(`✓ Successfully prerendered ${successCount} / ${routes.length} static HTML pages.`);
}

prerender().catch((err) => {
  console.error('Prerender process error:', err);
  process.exit(1);
});
