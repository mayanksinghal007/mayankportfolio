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
import { AI_VIDEO_BLOGS } from './blogs/aiVideoBlogs.js';
import { AI_AUDIO_BLOGS } from './blogs/aiAudioBlogs.js';
import { CONTENT_STRATEGY_BLOGS } from './blogs/contentStrategyBlogs.js';
import { SEO_AEO_GEO_BLOGS } from './blogs/seoAeoGeoBlogs.js';
import { ECOMMERCE_CRO_BLOGS } from './blogs/ecommerceCroBlogs.js';
import { CAREER_PERSPECTIVES_BLOGS } from './blogs/careerPerspectivesBlogs.js';
import { INTERNATIONAL_BLOGS } from './blogs/internationalBlogs.js';

export const DEFAULT_BLOG_POSTS = [
  ...META_ADS_BLOGS,          // Posts 1 - 10
  ...AI_VIDEO_BLOGS,          // Posts 11 - 18
  ...AI_AUDIO_BLOGS,          // Posts 19 - 24
  ...CONTENT_STRATEGY_BLOGS,  // Posts 25 - 32
  ...SEO_AEO_GEO_BLOGS,       // Posts 33 - 40
  ...ECOMMERCE_CRO_BLOGS,     // Posts 41 - 45
  ...CAREER_PERSPECTIVES_BLOGS, // Posts 46 - 50
  ...INTERNATIONAL_BLOGS      // Posts 51 - 54 (US, UK, UAE, Russia International Series)
];

export const BLOG_CATEGORIES = [
  "All",
  "Meta Ads",
  "AI Video",
  "AI Voiceover",
  "Content Strategy",
  "SEO & AEO",
  "E-Commerce & CRO",
  "Career & Strategy",
  "International Strategy"
];
