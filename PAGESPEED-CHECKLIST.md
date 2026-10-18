# PageSpeed Insights & Core Web Vitals Audit Checklist

This checklist provides prioritized, step-by-step instructions for testing and validating Core Web Vitals on both **Mobile** and **Desktop** using [Google PageSpeed Insights](https://pagespeed.web.dev/).

---

## 🎯 Target Core Web Vitals Thresholds (Google 2026 Standards)

| Metric | Target (Good) | Needs Improvement | Poor | What It Measures |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **≤ 2.5 s** | 2.5 s – 4.0 s | > 4.0 s | Perceived loading speed (hero headline or image) |
| **INP** (Interaction to Next Paint) | **≤ 200 ms** | 200 ms – 500 ms | > 500 ms | User responsiveness during taps, clicks, and keys |
| **CLS** (Cumulative Layout Shift) | **≤ 0.1** | 0.1 – 0.25 | > 0.25 | Visual stability (unexpected shifts or jumps) |
| **FCP** (First Contentful Paint) | **≤ 1.8 s** | 1.8 s – 3.0 s | > 3.0 s | Time when browser renders first DOM element |
| **TTFB** (Time to First Byte) | **≤ 0.8 s** | 0.8 s – 1.8 s | > 1.8 s | Server response time and edge caching speed |

---

## 🚀 High-Priority Landing Pages to Test First

Test these critical conversion routes first. Run each test twice (Mobile and Desktop) with browser extensions disabled.

### 1. Homepage (`/`)
- **URL**: `https://mayank-aggarwal.vercel.app/`
- **Primary Customer Intent**: Founder introduction, brand positioning, core proof points, showreel.
- **Key Elements to Verify**:
  - [ ] Hero headline (`H1`) renders immediately without FOIT (Flash of Invisible Text) via `font-display: swap`.
  - [ ] Showcase reel card displays with explicit aspect ratio preventing CLS.
  - [ ] Fast TTFB on Vercel Edge CDN (< 200ms).
  - [ ] Floating WhatsApp button does not trigger layout reflow.

### 2. Services Hub & Detail Pages (`/services`, `/services/:slug`)
- **URLs**:
  - `https://mayank-aggarwal.vercel.app/services`
  - `https://mayank-aggarwal.vercel.app/services/meta-ads-management`
  - `https://mayank-aggarwal.vercel.app/services/ai-video-ads-production`
- **Primary Customer Intent**: Service scope, deliverables, deliverables comparison, retainer inquiries.
- **Key Elements to Verify**:
  - [ ] FAQ accordions toggle with < 50ms INP response time.
  - [ ] Service icons render with lightweight SVG paths (zero image download overhead).
  - [ ] CTA banner button tap targets meet the 48x48px accessible minimum.

### 3. Contact & Inquiry Brief Page (`/contact`)
- **URL**: `https://mayank-aggarwal.vercel.app/contact`
- **Primary Customer Intent**: High-intent lead generation, budget selection, WhatsApp direct contact.
- **Key Elements to Verify**:
  - [ ] Form input focus states are instant without main thread blocking.
  - [ ] Channel cards (WhatsApp, Email, LinkedIn, Instagram) have clear tap targets on mobile screens.
  - [ ] Semantic NAP `<address>` block renders synchronously in static HTML.

### 4. Interactive Tools (High-Traffic Organic Landing Pages)
- **URLs**:
  - `https://mayank-aggarwal.vercel.app/tools/meta-ads-roas-calculator`
  - `https://mayank-aggarwal.vercel.app/tools/ai-video-prompt-generator`
  - `https://mayank-aggarwal.vercel.app/tools/reel-hook-generator`
- **Primary Customer Intent**: Free utility usage, bookmarking, algorithmic hook generation, backlink acquisition.
- **Key Elements to Verify**:
  - [ ] Dynamic slider/input calculations update smoothly in 60fps with zero layout thrashing.
  - [ ] Clipboard copy button triggers visual toast with zero INP delay.
  - [ ] Schema `WebApplication` and `FAQPage` are recognized without errors in Google Rich Results.

### 5. Regional Hubs (Local SEO Landing Pages)
- **URLs**:
  - `https://mayank-aggarwal.vercel.app/locations/delhi`
  - `https://mayank-aggarwal.vercel.app/locations/gurugram`
  - `https://mayank-aggarwal.vercel.app/locations/mumbai`
  - `https://mayank-aggarwal.vercel.app/locations/bangalore`
- **Key Elements to Verify**:
  - [ ] LocalBusiness JSON-LD schema with GeoCoordinates and NAP validated.
  - [ ] City selector pill bar scrolls horizontally on mobile with touch momentum.

### 6. Marketing Playbooks & Blog Post Detail (`/blog`, `/blog/:slug`)
- **URLs**:
  - `https://mayank-aggarwal.vercel.app/blog`
  - `https://mayank-aggarwal.vercel.app/blog/how-to-start-meta-ads-small-business-india`
  - `https://mayank-aggarwal.vercel.app/blog/roas-vs-mer-which-marketing-metric-matters-2026`
- **Key Elements to Verify**:
  - [ ] Static prerendered HTML loads article text instantly for search crawlers.
  - [ ] Reading progress bar transitions using GPU composited transforms (`scaleX`).
  - [ ] Table of contents and breadcrumb navigation are fully accessible.

---

## 🛠️ Codebase Optimizations Implemented for Speed

1. **Static HTML Prerendering**: All 79 public routes are prerendered into static HTML at build time (`dist/**/*.html`). Search engine bots and users receive full DOM content on the very first byte with 0ms client-side rendering delay.
2. **Bundle Chunk Splitting**:
   - `admin-bundle`: Isolated all heavy admin tabs (80KB+ AdminAds, AdminBlog, AdminMedia) so normal visitors never download admin code.
   - `lucide-icons`: Splitted into dedicated asynchronous chunk.
   - `confetti`: Loaded lazily only when interactive actions complete.
   - `react-vendor`: Cleanly separated for long-term immutable browser caching.
3. **Typography Optimization**:
   - Google Fonts preconnected to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin).
   - Preloaded stylesheet with `&display=swap` to eliminate FOIT (Flash of Invisible Text).
4. **Image & Asset Delivery**:
   - Explicit `width` and `height` dimensions on all images to guarantee CLS = 0.
   - Hero asset lightweight PNG compressed under 14KB.
   - SVG vector iconography for crisp, resolution-independent rendering with zero payload waste.
5. **Caching Headers Configured in `vercel.json` & `netlify.toml`**:
   - `/assets/*`: `public, max-age=31536000, immutable` (1 year browser cache).
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`: `public, max-age=3600, stale-while-revalidate=86400`.
