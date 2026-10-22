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
  canonical = '',
  ogType = 'website',
  type,
  ogImage,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
  children,
}) => {
  const baseSiteUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    SITE_CONFIG.siteUrl ||
    'https://mayankaggarwal-one.vercel.app';

  // Normalize site URL without trailing slash
  const cleanBaseUrl = baseSiteUrl.replace(/\/+$/, '');

  // Normalize canonical path: accept canonicalPath or canonical (extracting path if absolute URL)
  let cleanPath = canonicalPath || '';
  if (!cleanPath && canonical) {
    if (canonical.startsWith('http')) {
      try {
        const parsed = new URL(canonical);
        cleanPath = parsed.pathname;
      } catch (e) {
        cleanPath = canonical;
      }
    } else {
      cleanPath = canonical;
    }
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  const canonicalUrl = `${cleanBaseUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const effectiveOgType = ogType || type || 'website';

  // Default fallback image
  const defaultImage = `${cleanBaseUrl}/assets/hero.png`;
  const finalImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${cleanBaseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
    : defaultImage;

  // Title formatting: strictly keep within 58 chars max for zero SEO audit truncation
  let displayTitle = title || `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`;
  if (!displayTitle.includes('Mayank Aggarwal') && displayTitle.length + 18 <= 58) {
    displayTitle = `${displayTitle} | Mayank Aggarwal`;
  }
  if (displayTitle.length > 58) {
    displayTitle = displayTitle.slice(0, 58).trim();
  }

  let metaDesc =
    description ||
    'Portfolio of Mayank Aggarwal — Digital Marketing & AI Specialist in Delhi, India. Performance Meta Ads, generative AI video creation, and creative direction.';
  if (metaDesc.length > 153) {
    metaDesc = metaDesc.slice(0, 150).replace(/\s+\S*$/, '') + '.';
  }

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

      {/* Search Engine Verification Meta Tags */}
      <meta
        name="google-site-verification"
        content={
          (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) ||
          SITE_CONFIG.googleVerification ||
          'google-site-verification-placeholder-code'
        }
      />
      {SITE_CONFIG.googleVerificationWithPrefix && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerificationWithPrefix} />
      )}
      {SITE_CONFIG.googleVerificationBackup && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerificationBackup} />
      )}
      <meta
        name="msvalidate.01"
        content={
          (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BING_SITE_VERIFICATION) ||
          SITE_CONFIG.bingVerification ||
          'bing-webmaster-verification-placeholder-code'
        }
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={effectiveOgType} />
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
      {effectiveOgType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {effectiveOgType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {effectiveOgType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(jsonLd)
              ? { '@context': 'https://schema.org', '@graph': jsonLd.filter(Boolean) }
              : jsonLd['@context']
              ? jsonLd
              : { '@context': 'https://schema.org', ...jsonLd }
          )}
        </script>
      )}

      {children}
    </Helmet>
  );
};
