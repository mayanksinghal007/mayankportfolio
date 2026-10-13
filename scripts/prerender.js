import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

// List of all public routes to statically prerender
const routes = [
  '/',
  '/about',
  '/services',
  '/services/performance-marketing',
  '/services/social-media-management',
  '/services/ai-video-creation',
  '/services/ai-voiceover',
  '/services/ai-creative-design',
  '/services/content-reel-strategy',
  '/services/seo-content',
  '/portfolio',
  '/ads',
  '/process',
  '/contact',
  '/blog',
  '/blog/how-to-start-meta-ads-small-business-india',
  '/blog/meta-ads-pixel-conversions-api-setup-checklist',
  '/blog/how-to-make-ai-video-ads-runway-kling-higgsfield',
  '/blog/elevenlabs-ai-voiceover-ads-natural-audio-tips',
  '/blog/instagram-reel-hooks-15-hook-formulas-you-can-use-today',
  '/blog/seo-vs-aeo-vs-geo-search-optimization-2026',
  '/blog/30-day-social-media-content-calendar-template',
  '/blog/digital-marketing-career-india-1-year-experience',
  '/privacy-policy',
  '/terms',
  '/admin',
  '/404',
];

async function prerender() {
  console.log(`Starting static HTML prerendering for ${routes.length} routes...`);

  const ssrEntryPath = path.resolve(distSsrDir, 'prerender-entry.js');
  if (!fs.existsSync(ssrEntryPath)) {
    console.error(`Error: SSR entry not found at ${ssrEntryPath}`);
    process.exit(1);
  }

  // Import the built SSR module
  const { render } = await import(`file://${ssrEntryPath.replace(/\\/g, '/')}`);

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

      let pageHtml = baseTemplate;

      // Replace root content with clean body HTML
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanHtml}</div>`
      );

      // Inject head tags into <head>
      const headTags = [
        extractedTitle,
        ...new Set(extractedMetas),
        ...new Set(extractedLinks),
        ...extractedScripts,
      ].filter(Boolean).join('\n    ');

      pageHtml = pageHtml.replace('</head>', `    ${headTags}\n  </head>`);

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
      console.log(`✓ Prerendered: ${route} -> ${path.relative(rootDir, outFilePath)}`);
    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err);
    }
  }

  // Remove temporary dist-ssr directory
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('✓ Prerendering successfully completed.');
}

prerender().catch((err) => {
  console.error('Prerender process error:', err);
  process.exit(1);
});
