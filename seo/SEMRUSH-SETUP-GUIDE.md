# Semrush Complete Setup & Integration Guide

This guide walks you through connecting **Semrush** to your website (`https://mayank-aggarwal.vercel.app`) for automated SEO site audits, Core Web Vitals monitoring, position tracking, and backlink analysis.

---

## 🛠️ 1. What Has Been Integrated in Your Codebase

1. **Crawler Access in `robots.txt`**:
   Configured explicit allowances for all Semrush crawler user-agents so audits never get blocked or throttled:
   - `SemrushBot` (General web crawler)
   - `SemrushBot-SA` (Site Audit bot)
   - `SemrushBot-BA` (Backlink Audit bot)
   - `SemrushBot-SI` (Site Intelligence bot)
2. **Verification Meta Tag in `index.html`**:
   Added `<meta name="semrush-site-verification" content="%VITE_SEMRUSH_SITE_VERIFICATION%" />` directly in the `<head>` of your website.
3. **Environment Variable in `.env`**:
   Added `VITE_SEMRUSH_SITE_VERIFICATION` for one-step token injection.

---

## 🚀 2. Step-by-Step Semrush Setup

### Step 2.1: Create a Project in Semrush
1. Log in to [Semrush](https://www.semrush.com/).
2. In the left navigation menu, click **Projects** > **Create Project**.
3. **Domain**: `mayank-aggarwal.vercel.app`
4. **Project Name**: `Mayank Aggarwal Portfolio & Growth Hub`
5. Click **Create Project**.

---

### Step 2.2: Verify Domain Ownership (Choose Any Method)

#### Option A: 1-Click Google Search Console (Recommended & Fastest)
* Since Google Search Console is already verified on your domain with `pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc`, click **Verify with Google Search Console**.
* Sign in with your Google account (`contact.klikwise@gmail.com` or `riyansh.studio007@gmail.com`).
* Instant verification complete!

#### Option B: HTML Meta Tag
* If Semrush provides an HTML tag like:
  ```html
  <meta name="semrush-site-verification" content="abc123xyz456" />
  ```
* Copy the code inside `content=""` (e.g. `abc123xyz456`).
* Put it in your `.env` file:
  ```env
  VITE_SEMRUSH_SITE_VERIFICATION=abc123xyz456
  ```
* Also add `VITE_SEMRUSH_SITE_VERIFICATION` in your **Vercel Project Settings > Environment Variables**.
* Click **Verify** in Semrush.

#### Option C: HTML File Upload
* If Semrush offers downloading a verification file (e.g. `semrush-xxxx.html`):
* Drop the downloaded file into your `public/` directory:
  `c:\Users\pc\Desktop\MAYANK PORTFOLIO WEBSITE\public\semrush-xxxx.html`
* Run `cmd /c "npm run build"` and push to Git. It will be live at `https://mayank-aggarwal.vercel.app/semrush-xxxx.html`.

---

## 🔍 3. Recommended Semrush Tool Configurations

### A. Site Audit Setup
1. In your Semrush Project dashboard, click **Set Up** on **Site Audit**.
2. **Domain & Limit of Pages**:
   - Scope: `mayank-aggarwal.vercel.app`
   - Limit: **100 pages** (Your site currently has 79 prerendered static pages).
3. **Crawler Settings**:
   - Crawler: **SemrushBot-Desktop** and **SemrushBot-Mobile**
   - Crawl delay: **Minimum delay** (your site is prerendered HTML on Vercel Edge CDN and handles fast crawls effortlessly).
4. **JS Rendering**: Enable **JS execution** (ensures all dynamic widgets and calculators render).
5. Click **Start Site Audit**.
   *Target: **98%+ Health Score**.*

### B. Position Tracking Setup
1. Click **Set Up** on **Position Tracking**.
2. **Location**:
   - Primary: **India > Delhi NCR** (or **United States** for international outreach).
3. **Device**: Desktop & Mobile.
4. **Keywords to Track** (Add these 15 high-intent keywords):
   - `meta ads agency delhi`
   - `freelance performance marketer delhi`
   - `ai video production agency india`
   - `meta ads roas calculator`
   - `generative ai commercial video`
   - `direct response creative strategist`
   - `meta advantage plus shopping campaign guide`
   - `runway gen-3 video prompts`
   - `reel hook generator`
   - `performance marketing consultant gurugram`
   - `creative fatigue meta ads`
   - `hire meta media buyer`
   - `ecommerce roas calculator`
   - `delhi digital marketing consultant`
   - `mayank aggarwal marketing`

### C. Connect Google Analytics 4 & Google Search Console
1. Under your Semrush Project settings, click **Integrations**.
2. Connect **Google Analytics**: Link property **`G-99QPLF52NX`**.
3. Connect **Google Search Console**: Link URL-prefix property `https://mayank-aggarwal.vercel.app`.
   *This unlocks combined Organic Search Traffic, Click-Through Rates, and Real User Search Queries directly inside Semrush!*

### D. Backlink Audit Tool
1. In the left menu, select **Backlink Audit**.
2. Monitor new incoming links from your **2,222 Backlinks Database** (`https://mayank-aggarwal.vercel.app/MAYANK-WEBSITE-2222-BACKLINKS.csv`).
3. Semrush will track your Domain Authority (Authority Score) growth and verify clean, penalty-free backlink acquisition.
