# SEO Manual Action Guide: Next Steps for Live Verification & Indexing

All programmatic code foundations, static HTML prerendering, robots.txt bot allowances, verification tags, Schema.org JSON-LD graphs, sitemap generation, and GA4 tracking hooks have been implemented directly in the codebase.

The following steps require external platform dashboard access and cannot be automated from code. Complete these in order:

---

## 1. Google Search Console (GSC) Setup & Verification

### Step 1.1: Add Your Property
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your primary Google account (`contact.klikwise@gmail.com` or `riyansh.studio007@gmail.com`).
3. Select **Add Property**:
   - Recommended: **URL prefix** -> enter your production URL: `https://mayank-aggarwal.vercel.app` (or your custom domain if connected).

### Step 1.2: Verify Ownership in Google Search Console
Both verification methods are already built into the codebase:
- **Method A (HTML File)**: Select **HTML file** verification -> click **Verify**. (The file `google82f1f02845411ec0.html` is served at `https://mayank-aggarwal.vercel.app/google82f1f02845411ec0.html`).
- **Method B (HTML Tag - Active)**: Both verification tags are embedded into every page's `<head>`:
  - `<meta name="google-site-verification" content="pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc" />`
  - `<meta name="google-site-verification" content="10MtCl154U961mQNyVLU_cxYmyPz7sqMwxu5tpHmxvc" />`
- **In Vercel**: Add `VITE_GOOGLE_SITE_VERIFICATION=pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc` in your Vercel Environment Variables.
Click **Verify** in Google Search Console. Ownership will be confirmed instantly!

### Step 1.3: Submit Your XML Sitemap
1. In the left sidebar of Google Search Console, click on **Sitemaps**.
2. Under "Add a new sitemap", enter: `sitemap.xml`.
3. Click **Submit**.
4. Confirm that the status shows **Success** and all 79 URLs are discovered.

### Step 1.4: Request Priority Indexing for the Homepage
1. At the top of Search Console, paste your homepage URL: `https://mayank-aggarwal.vercel.app/` into the **Inspect any URL** search bar.
2. Click **Test Live URL**.
3. Once the live test confirms "URL is available to Google", click **Request Indexing**.

---

## 2. Bing Webmaster Tools Setup & IndexNow Verification

### Step 2.1: Create Account & Import from Search Console
1. Navigate to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Click **Get Started** and sign in with Microsoft or Google.
3. Choose **Import from Google Search Console** (fastest method — automatically imports your verified site, sitemap, and settings).
4. Alternatively, choose **Add your site manually** using URL prefix `https://mayank-aggarwal.vercel.app`:
   - Copy the verification code from the `msvalidate.01` meta tag.
   - Set in `.env`: `VITE_BING_SITE_VERIFICATION=YOUR_BING_CODE`.
   - Set in Vercel Environment Variables: `VITE_BING_SITE_VERIFICATION=YOUR_BING_CODE`.
   - Deploy and click **Verify**.

### Step 2.2: Verify Sitemap & IndexNow
1. Go to **Sitemaps** in the Bing Webmaster sidebar.
2. Ensure `https://mayank-aggarwal.vercel.app/sitemap.xml` is listed and status is **Success**.
3. Confirm **IndexNow** protocol:
   - The site codebase already contains your pre-configured IndexNow key file: `/8f1a23c5b4d7e901f2a34b56c7d8e90a.txt` and `/indexnow.txt`.
   - Bing uses this automatically to index newly published pages within minutes.

---

## 3. Google Analytics 4 (GA4) Status: Configured (G-99QPLF52NX)

Your Google tag `G-99QPLF52NX` is already embedded directly in `index.html` and wired to SPA transitions via `src/components/AnalyticsTracker.jsx`.

### Step 3.1: Set Environment Variable in Vercel
1. Go to your **Vercel Dashboard** -> Project Settings -> **Environment Variables**.
2. Add:
   - Key: `VITE_GA4_MEASUREMENT_ID`
   - Value: `G-99QPLF52NX`
3. Trigger a redeploy (or git push).

### Step 3.2: Verify Real-Time Hits
1. Open your live site: `https://mayank-aggarwal.vercel.app/`
2. In Google Analytics, navigate to **Reports** > **Realtime**.
3. You should see yourself as an active user within 5–10 seconds, and page_view events firing as you click around!

---

## 4. Google Business Profile (GMB) for Local SEO & Delhi NCR Authority

If operating as a regional performance marketing agency or consultancy in Delhi NCR:

### Step 4.1: Claim or Create Profile
1. Navigate to [Google Business Profile](https://www.google.com/business/).
2. Click **Manage now**.
3. Business Name: `Mayank Aggarwal — Klikwise Digital Marketing` (consistent with LocalBusiness schema).
4. Business Category:
   - Primary: `Marketing Agency` or `Internet Marketing Service`
   - Secondary: `Advertising Agency`, `Marketing Consultant`

### Step 4.2: Match NAP Exactly with Website
To build high local pack authority, your Google Business Profile details MUST match your website's footer and contact page:
- **Name**: Mayank Aggarwal (Klikwise)
- **Address / Service Area**: Delhi, New Delhi, Gurugram, Noida, National Capital Region (NCR), India.
- **Phone**: `+91 9217756033`
- **Website URL**: `https://mayank-aggarwal.vercel.app`
- **Hours**:
  - Monday – Friday: 9:00 AM – 7:00 PM
  - Saturday: 10:00 AM – 4:00 PM
  - Sunday: Closed

### Step 4.3: Complete Verification
1. Complete phone OTP or video verification as prompted by Google.
2. Add high-resolution photos: logo, workspace, and showreel thumbnails.
3. Link your website URL and contact inquiry page: `https://mayank-aggarwal.vercel.app/contact`.

---

## 5. PageSpeed Insights & Core Web Vitals Audit

1. Open [Google PageSpeed Insights](https://pagespeed.web.dev/).
2. Run your live deployment URL for these top landing pages:
   - Homepage: `https://mayank-aggarwal.vercel.app/`
   - Services Hub: `https://mayank-aggarwal.vercel.app/services`
   - Contact Page: `https://mayank-aggarwal.vercel.app/contact`
   - ROAS Calculator: `https://mayank-aggarwal.vercel.app/tools/meta-ads-roas-calculator`
   - High-Intent Regional Hub: `https://mayank-aggarwal.vercel.app/locations/delhi`
3. Verify that **Mobile** scores achieve:
   - Performance: **90+**
   - Accessibility: **95+**
   - Best Practices: **100**
   - SEO: **100**
4. Check [PAGESPEED-CHECKLIST.md](file:///c:/Users/pc/Desktop/MAYANK%20PORTFOLIO%20WEBSITE/PAGESPEED-CHECKLIST.md) for full metrics reference.
