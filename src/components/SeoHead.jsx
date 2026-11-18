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
  keywords,
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

  // Professional Title Formatting: Strict 60 char threshold so with &amp; it stays <= 65 chars
  let displayTitle = (title || `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`).trim();
  if (!displayTitle.includes('Mayank Aggarwal') && displayTitle.length + 18 <= 58) {
    displayTitle = `${displayTitle} | Mayank Aggarwal`;
  }
  if (displayTitle.length > 60) {
    // Graceful word boundary cut instead of mid-character truncation
    displayTitle = displayTitle.slice(0, 58).replace(/\s+\S*$/, '').trim();
  }

  // Professional Meta Description: Clean, complete sentences within 155 chars
  let metaDesc = (
    description ||
    'Mayank Aggarwal is a Digital Marketing & AI Specialist providing high-converting Meta Ads, generative AI video commercials, and full-funnel creative growth.'
  ).trim();
  if (metaDesc.length > 155) {
    metaDesc = metaDesc.slice(0, 150).replace(/\s+(and|or|with|in|the|by|for|to|\S*)$/i, '').trim();
    if (!metaDesc.endsWith('.')) {
      metaDesc += '.';
    }
  }

  // Keywords formatting (Core SEO & Search Console Intent)
  const defaultKeywords = [
    'Mayank Aggarwal',
    'Performance Marketing',
    'Meta Ads Expert',
    'Generative AI Video',
    'AI Video Commercials',
    'Facebook Ads Specialist',
    'Instagram Ads Consultant',
    'Runway Gen-3 Alpha',
    'Kling AI Video',
    'Klikwise',
    'ROAS Calculator',
    'Digital Marketing Specialist Delhi',
  ];

  let displayKeywords = '';
  if (Array.isArray(keywords) && keywords.length > 0) {
    displayKeywords = [...new Set([...keywords, ...defaultKeywords.slice(0, 4)])].join(', ');
  } else if (typeof keywords === 'string' && keywords.trim()) {
    displayKeywords = keywords.trim();
  } else {
    displayKeywords = defaultKeywords.join(', ');
  }

  const robotsDirective = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={displayKeywords} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="bingbot" content={robotsDirective} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content="#FFFDF9" />
      <meta name="author" content={author || SITE_CONFIG.name} />

      {/* AI Overview, Search Console & GEO Signals */}
      <meta name="ai-content-declarations" content="original-human-authored" />
      <meta name="revisit-after" content="2 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="language" content="English" />

      {/* Search Engine Verification Meta Tags */}
      <meta
        name="google-site-verification"
        content={
          (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) ||
          SITE_CONFIG.googleVerification ||
          'google-site-verification-placeholder-code'
        }
      />
      {SITE_CONFIG.googleVerificationPrevious && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerificationPrevious} />
      )}
      {SITE_CONFIG.googleVerificationWithPrefix && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerificationWithPrefix} />
      )}
      {SITE_CONFIG.googleVerificationBackup && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerificationBackup} />
      )}
      {SITE_CONFIG.googleCnameHost && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleCnameHost} />
      )}
      {SITE_CONFIG.googleCnameVerification && (
        <meta name="google-site-verification" content={SITE_CONFIG.googleCnameVerification} />
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
              ? {
                  '@context': 'https://schema.org',
                  '@graph': jsonLd.filter(Boolean).map((item) => {
                    if (item && typeof item === 'object') {
                      const { '@context': _, ...cleanItem } = item;
                      return cleanItem;
                    }
                    return item;
                  }),
                }
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
