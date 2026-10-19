# Complete SEO, AEO & GEO Manual Action Guide: External Logins & Setup

> **Current Code Status**: All programmatic code, static HTML prerendering (79 pages), Google Tag Manager (`GTM-M4LM5ZS2`), Google Analytics 4 (`G-99QPLF52NX`), Google Search Console verification meta tags and HTML file (`google82f1f02845411ec0.html`), robots.txt AI allowances, IndexNow keys, Schema.org JSON-LD graphs, automated event tracking, and XML sitemaps are **100% implemented and live in the codebase**.

This document outlines the **exact sequential steps** that require your manual login into third-party dashboards (Google Search Console, Bing, GA4, Google Business Profile, and citation platforms).

---

## 1. Google Search Console (GSC) — Verification & Priority Indexing

### Step 1.1: Sign In & Add Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your primary Google account (`contact.klikwise@gmail.com` or your admin email).
3. In the top-left dropdown, click **Add Property**.
4. Select **URL prefix** (recommended for Vercel deployments):
   - Enter: `https://mayank-aggarwal.vercel.app` (or your custom domain if DNS is mapped).
   - Click **Continue**.

### Step 1.2: Instant Ownership Verification
Your site already has both verification methods active:
- **Method A (HTML File - Active)**:
  - In the verification popup, select **HTML file**.
  - Google will check for `google82f1f02845411ec0.html` (which is already live at `https://mayank-aggarwal.vercel.app/google82f1f02845411ec0.html`).
  - Click **Verify**.
- **Method B (HTML Tag - Backup)**:
  - Select **HTML tag**. Both tags are embedded in every page's `<head>`:
    - `<meta name="google-site-verification" content="pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc" />`
    - `<meta name="google-site-verification" content="10MtCl154U961mQNyVLU_cxYmyPz7sqMwxu5tpHmxvc" />`
  - Click **Verify**.
  - Result: **Ownership verified successfully!**

### Step 1.3: Submit XML Sitemap
1. In the left sidebar of Google Search Console, click **Sitemaps**.
2. Under "Add a new sitemap", enter: `sitemap.xml`
3. Click **Submit**.
4. Refresh after 30 seconds: The status will display **Success** with **79 discovered pages**.

### Step 1.4: Request Priority Indexing for Top 7 Core Pages
To trigger Googlebot crawler priority right away:
1. Paste the URL into the top inspection search bar:
   - `https://mayank-aggarwal.vercel.app/`
2. Click **Test Live URL** (takes ~15–30 seconds).
3. Once the live test confirms green checkmarks, click **Request Indexing**.
4. Repeat for the primary commercial and tool pages:
   - `https://mayank-aggarwal.vercel.app/services`
   - `https://mayank-aggarwal.vercel.app/services/performance-marketing`
   - `https://mayank-aggarwal.vercel.app/services/ai-video-creation`
   - `https://mayank-aggarwal.vercel.app/services/email-marketing`
   - `https://mayank-aggarwal.vercel.app/portfolio`
   - `https://mayank-aggarwal.vercel.app/tools/meta-ads-roas-calculator`
   - `https://mayank-aggarwal.vercel.app/contact`

---

## 2. Bing Webmaster Tools & IndexNow Setup

### Step 2.1: 1-Click Import from Google Search Console
1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Click **Get Started** and sign in with your Google account.
3. Click **Import from Google Search Console**.
4. Grant read permissions. Bing will automatically import your verified property, sitemap, and settings instantly without needing manual DNS or meta tag verification!

### Step 2.2: Confirm IndexNow Status
- Bing utilizes the **IndexNow protocol** for instant discovery.
- Your project root already has the key configured:
  - File: `https://mayank-aggarwal.vercel.app/8f1a23c5b4d7e901f2a34b56c7d8e90a.txt`
  - Key: `8f1a23c5b4d7e901f2a34b56c7d8e90a`
- Bing and Yandex will crawl every updated URL within minutes.

---

## 3. Google Analytics 4 (GA4) — Real-Time Verification & Conversion Tracking

Your GA4 tag `G-99QPLF52NX` is already embedded and wired via `src/components/AnalyticsTracker.jsx`.

### Step 3.1: Confirm Live Traffic
1. Open [Google Analytics](https://analytics.google.com).
2. Select your property (`Mayank Aggarwal Portfolio` / `G-99QPLF52NX`).
3. Click **Reports** > **Realtime**.
4. Open `https://mayank-aggarwal.vercel.app/` in an incognito browser window.
5. Within 5 seconds, your session will show on the real-time globe.

### Step 3.2: Mark Custom Events as Key Conversions
Your site now automatically dispatches the following events on interaction:
- `form_submit` (when a user sends the contact form)
- `whatsapp_click` (when a user clicks any WhatsApp chat button)
- `call_click` (when a user clicks a phone call link)
- `cta_click` (when a user clicks primary CTA buttons or calculator links)
- `newsletter_signup` (when a user subscribes to the VIP Growth Dispatch)

**To configure them as Key Conversions in GA4**:
1. In GA4, click **Admin** (gear icon in lower left).
2. Under "Data display", click **Events**.
3. Under the list of incoming events, toggle the switch **Mark as key event** (or **Mark as conversion**) for:
   - `form_submit` (Primary Lead Conversion)
   - `whatsapp_click` (High-Intent Conversion)
   - `call_click` (Direct Phone Inquiry)
   - `newsletter_signup` (Subscriber Conversion)
4. These events will now report under your acquisition attribution reports and ROAS dashboards.

---

## 4. Google Business Profile (GBP) — Local SEO & Delhi NCR Authority

For commanding local search ("Performance marketer in Delhi", "Meta ads agency Delhi NCR", "AI video agency Delhi"):

### Step 4.1: Claim or Create Profile
1. Go to [Google Business Profile](https://www.google.com/business/).
2. Click **Manage now**.
3. Enter exact Business Name: `Mayank Aggarwal — Klikwise Digital Marketing`

### Step 4.2: Enter Exact NAP Information
Your GBP profile details **MUST MATCH** the Schema.org LocalBusiness data in code:
- **Business Name**: `Mayank Aggarwal — Klikwise Digital Marketing`
- **Primary Category**: `Marketing Agency`
- **Secondary Categories**: `Internet Marketing Service`, `Advertising Agency`, `Marketing Consultant`
- **Service Areas**:
  - Delhi, New Delhi
  - Gurugram (Cyber City, Golf Course Road)
  - Noida (Sector 62, Sector 18)
  - Faridabad, Ghaziabad
  - National Capital Region (NCR), India
- **Phone Number**: `+91 9217756033`
- **Website URL**: `https://mayank-aggarwal.vercel.app`
- **Appointment / Contact Link**: `https://mayank-aggarwal.vercel.app/contact`
- **Operating Hours**:
  - Monday – Friday: 09:00 AM – 07:00 PM IST
  - Saturday: 10:00 AM – 04:00 PM IST
  - Sunday: Closed

### Step 4.3: Profile Media & Verification
1. Complete phone OTP or video verification as required by Google.
2. Upload high-resolution visual assets:
   - Profile Logo (from `/assets/hero/mayank.png` or favicon)
   - Workspace photos / Showreel thumbnail
3. Publish your first Google Post announcing:
   - *"Scaling D2C brands and tech startups with Meta Ads & Generative AI video workflows. Explore our free ROAS calculator at mayank-aggarwal.vercel.app/tools/meta-ads-roas-calculator"*

---

## 5. Directory & Citation Submission Sequence (Top 25 Priority)

To build initial domain authority (DR 0 -> DR 35+) and entity signals for AI search engines, submit your business to these top platforms using the ready-to-copy text in `/seo/backlinks.md`:

### Week 1: Professional & Entity Profiles (Immediate Indexing)
- [ ] **LinkedIn Company Page**: Create `Klikwise Digital Marketing` linked to your personal profile.
- [ ] **Crunchbase**: Add company profile `Klikwise` (founder: Mayank Aggarwal, headquarters: Delhi).
- [ ] **Wellfound (AngelList)**: Create agency profile under Growth Marketing / Performance Ads.
- [ ] **GitHub**: Ensure profile `mayanksinghal007` links to `https://mayank-aggarwal.vercel.app`.
- [ ] **Behance**: Create agency portfolio showcase linking to `/portfolio`.
- [ ] **Dribbble**: Create designer/creative strategist profile.
- [ ] **Medium**: Setup publication for publishing syndicated articles.
- [ ] **Dev.to & Hashnode**: Setup developer / AI creator blog handles.

### Week 2: B2B Agency & Review Platforms (US / UK / Global)
- [ ] **Clutch.co**: Submit free agency profile under *Top Performance Marketing & Paid Advertising Agencies*.
- [ ] **Crunchbase**: Add company profile `Klikwise` (founder: Mayank Aggarwal, website: `https://mayank-aggarwal.vercel.app`).
- [ ] **GoodFirms**: Register under *Top PPC & Performance Marketing Agencies*.
- [ ] **DesignRush**: Submit listing for *AI Video Production & Creative Agencies*.
- [ ] **Sortlist**: Create service profile for *Meta Ads & Generative AI Commercials*.
- [ ] **Wellfound (AngelList)**: Create agency profile under Growth Marketing / Performance Media Buying.

### Week 3: High-Authority AI & Marketing Tool Directories (Viral Inbound Engine)
Your live interactive tools are high-leverage assets for gaining thousands of international visitors and DA 70-90+ editorial backlinks:
- [ ] **Product Hunt**: Submit free launch for *Meta Ads ROAS & Profit Calculator* (`/tools/meta-ads-roas-calculator`).
- [ ] **Toolify.ai**: Submit *AI Video Prompt Generator* (`/tools/ai-video-prompt-generator`).
- [ ] **There's An AI For That**: Submit *AI Video Ad Creative Prompt Engine*.
- [ ] **Futurepedia.io**: Submit under *Marketing & E-commerce Tools*.
- [ ] **AlternativeTo.net**: Add as a free alternative to paid ad calculators.
- [ ] **BetaList**: Submit *Mayank Aggarwal Performance & AI Creative Suite*.

### Ready-to-Copy Description (Use on Directory & Profile Forms):
> **Tagline**: Performance Marketing (Meta Ads) & AI Video Creative Partner | US, UK & Worldwide  
> **Short (50 words)**: Mayank Aggarwal is an international performance marketer and generative AI creative specialist. He partners with ambitious e-commerce brands, funded startups, and B2B companies across the US, UK, and worldwide to scale customer acquisition through high-ROAS Meta and Google ad campaigns, cinematic AI video commercials, and lifecycle email retention funnels.  
> **Contact**: `contact.klikwise@gmail.com` | `riyansh.studio007@gmail.com` | `https://mayank-aggarwal.vercel.app`

Track your live listing URLs in the table located in `/seo/backlinks.md` and `/seo/WORLDWIDE-CLIENT-ACQUISITION-PLAYBOOK.md`.

---

## 6. Cold Outreach & Link Building Execution

Use the **10 battle-tested email outreach templates** located in `/seo/backlinks.md#outreach-email-templates`:
1. Guest Post Pitch (for marketing blogs like Social Media Examiner, Marketing Land, YourStory)
2. Broken Link Outreach (finding 404 links on marketing resource pages)
3. Resource Page Link Request (suggesting your free Meta Ads ROAS Calculator)
4. Unlinked Brand Mention Request (converting mentions of "Klikwise" or "Mayank Aggarwal")
5. Podcast Guest Pitch (pitching your expertise on AI video advertising & Meta ROAS)
6. PR / Journalist Pitch via HARO / Connectively / Featured.com
7. Strategic Agency Partnership (cross-referral with web development agencies)
8. Testimonial Exchange (for SaaS ad tools like AdCreative, Motion, Foreplay)
9. Directory Profile Update / NAP Correction
10. Polite 4-Day Follow-Up Template

---

## 7. Ongoing Maintenance Cadence

| Cadence | Action Item | Platform |
| :--- | :--- | :--- |
| **Weekly (Tuesday)** | Publish 2 articles from `/seo/content-calendar.md` | Codebase & Vercel |
| **Weekly (Friday)** | Send 10 outreach emails from `/seo/backlinks.md` | Gmail / Hunter.io |
| **Bi-Weekly** | Inspect Search Console coverage & queries | Google Search Console |
| **Monthly** | Review GA4 conversion goals & ROAS attribution | Google Analytics 4 |
| **Monthly** | Run PageSpeed audit on core templates | PageSpeed Insights |
