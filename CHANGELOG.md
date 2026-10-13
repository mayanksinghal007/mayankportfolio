# Changelog: Mayank Aggarwal Portfolio Upgrade (v3)

All notable changes and technical enhancements implemented during the comprehensive 8-phase upgrade on branch `upgrade/v3`.

---

## [Phase 1] — Honesty, Truthfulness & Brand Identity Cleanup
### Removed
- **Unverifiable / Inflated Metrics**: Removed all unsubstantiated claims (e.g. fabricated multi-crore ad spend figures, exaggerated follower growth statistics, or years of seniority that contradicted real records).
- **Public Admin Link**: Removed visible links to `/admin` from the public footer and navbar to maintain professional editorial presentation while preserving full accessibility at `/admin`.

### Added & Updated
- **Truthful Career Representation**: Standardized on Mayank Aggarwal's authentic background: 1 year of hands-on experience across Klikwise, ENKT AI, and DIDMIN in Delhi, India.
- **Sample / Concept Badging**: All portfolio case studies where client figures are not yet verified now display an explicit, transparent badge: `"Sample / Concept Project"`.
- **Centralized Site Configuration**: Created `src/config/site.js` (`SITE_CONFIG`) as the single source of truth for all brand parameters, verified company spellings (`Klikwise`, `Eleveon`, `Krum`, `ENKT AI`, `DIDMIN`, `Shaheed Bhagat Singh College`), contact information, and `PORTFOLIO_NOTE`.
- **Honest Hero Statistics**: Configured verified hero metrics: `1 Year` (Hands-on Experience), `Meta + AI Video` (Core Focus), `Delhi, India` (Location), and `< 12 Hours` (Response Time).

---

## [Phase 2] — Typography & Fluid Styling Upgrades
### Added
- **Fluid clamp() Type Tokens**: Replaced static pixel heading sizes in `src/index.css` with fluid clamp scales:
  - `--text-hero`: `clamp(2.8rem, 6.2vw + 1rem, 5.4rem)`
  - `--text-display`: `clamp(2.2rem, 4.4vw + 0.5rem, 3.8rem)`
  - `--text-h2`: `clamp(1.75rem, 2.6vw + 0.4rem, 2.5rem)`
  - `--text-h3`: `clamp(1.25rem, 1.5vw + 0.4rem, 1.75rem)`
  - `--text-lead`: `clamp(1.05rem, 0.4vw + 0.95rem, 1.25rem)`
- **Design Token Strictness**: Fully enforced the signature palette across all components:
  - Cream: `#FFFDF9`
  - Peach: `#FDF1E7`
  - Charcoal / Ink: `#1A1A1A` / `#191919`
  - Brand Orange: `#FF3D0A` / `#FF4A1C`
  - Gold Accent: `#FFB92E` (strictly reserved for dark charcoal surfaces)
- **Zero Forbidden Elements**: Strict adherence to design constraints: no preloader, no theme toggle, no custom cursor, and no generic logo replacement.

---

## [Phase 3] — Technical SEO & Static Pre-Rendering Engine
### Added
- **Static SSR Pre-Rendering Pipeline**:
  - `src/prerender-entry.jsx`: Clean React DOM server renderer wrapping `HelmetProvider` and `StaticRouter`.
  - `scripts/prerender.js`: Node.js build script generating pre-rendered static HTML files for all 26 application routes into `dist/`.
- **Dynamic SEO Header Management**:
  - `src/components/SeoHead.jsx`: Integrated `react-helmet-async` for route-level canonical paths, title tags, meta descriptions, OpenGraph, Twitter Cards, and injected JSON-LD schema arrays.
  - `src/components/Breadcrumbs.jsx`: Visual and semantic navigation breadcrumbs across service details, blog articles, and process pages.
- **Search Engine Discovery Assets**:
  - `scripts/generate-seo-files.js`: Automatically generates `dist/sitemap.xml`, `dist/robots.txt`, `dist/rss.xml`, `dist/llms.txt`, and `dist/humans.txt`.
  - `scripts/seo-check.js`: Automated post-build audit validating XML syntax, robots disallow rules, canonical links, and IndexNow key files (156 automated checks passing).
- **Seed Content**:
  - `src/data/blogData.js`: 8 exhaustive tactical growth marketing, generative AI video, and SEO playbooks.
  - `src/pages/Blog.jsx` and `src/pages/BlogPost.jsx`: Full-featured blog index and article reading templates.

---

## [Phase 4] — Structured Data, AEO & GEO Optimization
### Added
- **JSON-LD Schema Suite (`src/utils/seoSchemas.js`)**:
  - `Person`: Mayank Aggarwal, Digital Marketing Specialist, Delhi, India, alumni of Shaheed Bhagat Singh College, University of Delhi.
  - `ProfessionalService`: NAP consistency, opening hours, geolocation, price range, service catalog.
  - `WebSite`: Sitelinks Searchbox integration with SearchAction target.
  - `BreadcrumbList`: Structured path hierarchy for search result rich breadcrumbs.
  - `FAQPage`: Structured question/answer pairs for Google SERP expandable accordions.
  - `Service & OfferCatalog`: Machine-readable capability definitions.
  - `BlogPosting`: Authoritative authorship, word count, publication dates, and article bodies.
- **Answer Engine Optimization (AEO)**:
  - Added 40–60 word direct definition blocks in answer-first format at the top of each service detail page.
  - Formatted H2s as natural question queries for Perplexity, ChatGPT Search, and Google AI Overviews.
  - Added interactive "Specialist vs Traditional Agency vs In-House Hire" comparison table.
- **Generative Engine Optimization (GEO)**:
  - Published `llms.txt` and `llms-full.txt` mapping site capabilities and authoritative bio for AI crawlers.
  - Added verified IndexNow verification keys (`8f1a23c5b4d7e901f2a34b56c7d8e90a.txt`).

---

## [Phase 5] — Blog CMS Integration in Admin Dashboard
### Added
- **Admin Blog Management Tab (`src/components/AdminBlogTab.jsx`)**:
  - Integrated into `src/pages/Admin.jsx` with real-time stats count.
  - Modal editor supporting article creation, editing, category selection, and publishing toggles.
  - Auto-generating URL slug utility from article titles.
  - Full FAQ builder for adding custom question/answer pairs per article.
  - Real-time search filter and localStorage persistence.

---

## [Phase 6] — Lightweight 60fps Motion & Tools Marquee
### Added
- **Production Tools Marquee (`src/components/ToolsMarquee.jsx`)**:
  - Infinite 28s CSS linear marquee displaying all 8 core tools: Meta Ads, Google Ads, Runway Gen-3 Alpha, Kling AI, ElevenLabs, HeyGen, Midjourney v6.1, and Canva Pro.
  - Pauses automatically on user hover.
- **Scroll Progress Bar (`src/components/ScrollProgressBar.jsx`)**:
  - Ultra-thin top reading progress indicator rendered in brand orange (`#FF3D0A`).
- **Lightweight Scroll Reveal (`src/hooks/useScrollReveal.js`)**:
  - Native `IntersectionObserver` revealing `.reveal-on-scroll` elements via 60fps GPU transforms and opacity (`translateY(16px)` to `0`).
  - Automatically unobserves elements upon entry to ensure zero ongoing CPU overhead.
  - Full support for `@media (prefers-reduced-motion: reduce)`.
- **Editorial Micro-Interactions**:
  - Expanding animated underline on `.nav-link` on hover and active routes.
  - Micro-nudge translation on button arrow icons (`translate(2px, -2px)`).
  - Smooth expansion animation on FAQ accordion answers.

---

## [Phase 7] — User-Friendliness & Conversion Polish
### Added
- **Anti-Spam Honeypot Security**:
  - Hidden honeypot input (`website_bot_trap`) in `src/pages/Contact.jsx` that intercepts automated spam bots.
- **Accessible Form Validation**:
  - Unticked explicit consent checkbox with inline link to `/privacy-policy`.
  - Comprehensive ARIA attributes (`aria-required`, `aria-invalid`, `aria-describedby`) and live alert error nodes.
  - Prominent 12-hour turnaround guarantee note below submit button.
- **Hide-on-Scroll Sticky Navigation**:
  - Upgraded `src/components/Navbar.jsx` with scroll direction detection: scrolls down hide the header, scrolls up reveal it instantly.
- **Global Site Search Modal (`src/components/SearchModal.jsx`)**:
  - Triggered via `Cmd/Ctrl+K` keyboard shortcut or the navbar Search button.
  - Searches dynamically across all static pages, 7 specialized services, portfolio case studies, and 8 blog articles.
  - Full keyboard navigation (up/down arrow selection, enter to visit, escape to close).
- **Floating WhatsApp Reachout (`src/components/FloatingWhatsApp.jsx`)**:
  - Fixed floating chat action in bottom-right corner with pulsating online dot and hover tooltip.
- **Comprehensive Legal Compliance (`src/pages/Legal.jsx`)**:
  - **Privacy Policy**: Fully compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act), detailing Data Fiduciary identity, lawful basis, data retention (24 months), cookie policies, and grievance redressal.
  - **Terms of Service**: Detailed clauses covering project estimates, milestone/retainer payments, direct client ad spend responsibility, IP transfer upon full settlement, revision rounds (2 included), and New Delhi jurisdiction.
- **CV Download**:
  - Added "Download CV" action button in `src/pages/About.jsx` linking to `public/Mayank_Aggarwal_Resume.pdf`.

---

## [Phase 8] — Verification & Validation Summary
- **Static HTML Routes Built**: 26 of 26 routes successfully prerendered.
- **SEO Audit Results**: 156 checks passed, 0 warnings, 0 errors.
- **Branch**: `upgrade/v3`
