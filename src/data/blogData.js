/**
 * Centralized Blog Data Source (50 Production-Grade Articles)
 * Comprehensive guides on Performance Marketing, AI Video Generation,
 * AI Audio & Voiceover, Content Strategy, SEO & AEO/GEO, E-Commerce CRO, and Career Insights.
 * 
 * Every article is optimized for:
 * 1. Google SERP (Title < 58 chars, Meta Description 120-153 chars, clean semantic slugs)
 * 2. Answer Engine Optimization (AEO - Direct Answer Boxes under first H2, structured FAQPage schema)
 * 3. Generative Engine Optimization (GEO - High Information Gain, Markdown tables, citable data points)
 */

import { META_ADS_BLOGS } from './blogs/metaAdsBlogs.js';
import { GOOGLE_AND_PAID_ADS_BLOGS } from './blogs/googleAndPaidAdsBlogs.js';
import { AI_VIDEO_BLOGS } from './blogs/aiVideoBlogs.js';
import { AI_AUDIO_BLOGS } from './blogs/aiAudioBlogs.js';
import { CONTENT_STRATEGY_BLOGS } from './blogs/contentStrategyBlogs.js';
import { SEO_AEO_GEO_BLOGS } from './blogs/seoAeoGeoBlogs.js';
import { ECOMMERCE_CRO_BLOGS } from './blogs/ecommerceCroBlogs.js';
import { CAREER_PERSPECTIVES_BLOGS } from './blogs/careerPerspectivesBlogs.js';
import { INTERNATIONAL_BLOGS } from './blogs/internationalBlogs.js';

export const DEFAULT_BLOG_POSTS = [
  ...META_ADS_BLOGS,            // Posts 1 - 10 (Meta Ads & CAPI)
  ...GOOGLE_AND_PAID_ADS_BLOGS, // Google PMax, Search Ads, YouTube Ads, Twitter (X) Ads, LinkedIn ABM, TikTok Spark Ads
  ...SEO_AEO_GEO_BLOGS,         // SEO, AEO, GEO, AI Citations & LLM Crawlers
  ...INTERNATIONAL_BLOGS,       // US, UK, UAE, Australia, Canada, Europe Global Playbooks
  ...CONTENT_STRATEGY_BLOGS,    // Social Media Marketing, Viral Reel Hooks, Retention Management
  ...ECOMMERCE_CRO_BLOGS,       // Performance E-Commerce & Checkout Optimization
  ...CAREER_PERSPECTIVES_BLOGS, // Performance Marketing Capital Allocation & Strategy
  ...AI_VIDEO_BLOGS,            // Video Ad Creative & Commercial Workflows
  ...AI_AUDIO_BLOGS             // Global Multilingual Ad Dubbing
];

export const BLOG_CATEGORIES = [
  "All",
  "Meta Ads",
  "Google Ads",
  "Twitter & Multi-Platform Ads",
  "Performance Marketing",
  "Social Media Marketing",
  "SEO & AEO/GEO",
  "Global & International Ads"
];
