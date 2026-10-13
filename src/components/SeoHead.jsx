import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../config/site';

/**
 * Technical SEO Head Component
 * Provides per-route title, meta description, canonical, robots,
 * Open Graph, Twitter cards, and structured JSON-LD schemas.
 */
export const SeoHead = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
}) => {
  const baseSiteUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    SITE_CONFIG.siteUrl ||
    'https://example.com';

  // Normalize site URL without trailing slash
  const cleanBaseUrl = baseSiteUrl.replace(/\/+$/, '');

  // Normalize canonical path: ensure leading slash, no trailing slash (except root)
  let cleanPath = canonicalPath || '';
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  const canonicalUrl = `${cleanBaseUrl}${cleanPath === '/' ? '' : cleanPath}`;

  // Default fallback image
  const defaultImage = `${cleanBaseUrl}/assets/hero.png`;
  const finalImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${cleanBaseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
    : defaultImage;

  // Title formatting: keep title within 50-65 chars target
  const displayTitle = title
    ? title.includes('Mayank Aggarwal') || title.length > 48
      ? title
      : `${title} | Mayank Aggarwal`
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`;

  const metaDesc =
    description ||
    'Portfolio of Mayank Aggarwal — Digital Marketing & AI Specialist in Delhi, India. Performance Meta Ads, generative AI video creation, and creative direction.';

  const robotsDirective = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content="#FFFDF9" />
      <meta name="author" content={author || SITE_CONFIG.name} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Mayank Aggarwal Portfolio" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={finalImage} />

      {/* Article Specific Open Graph */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
