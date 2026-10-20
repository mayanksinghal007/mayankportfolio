import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

/**
 * Editorial Breadcrumbs Component
 * Accessible UI navigation with Schema.org BreadcrumbList microdata & JSON-LD
 */
export const Breadcrumbs = ({ items = [] }) => {
  const baseSiteUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    SITE_CONFIG.siteUrl ||
    'https://mayankaggarwal-one.vercel.app';
  const cleanBase = baseSiteUrl.replace(/\/+$/, '');

  const breadcrumbsList = [
    { name: 'Home', path: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsList.map((item, index) => {
      let itemUrl = cleanBase;
      if (item.path) {
        if (item.path.startsWith('http')) {
          itemUrl = item.path;
        } else {
          const cleanP = item.path.startsWith('/') ? item.path : `/${item.path}`;
          itemUrl = `${cleanBase}${cleanP === '/' ? '' : cleanP}`;
        }
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <nav
        aria-label="Breadcrumbs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          fontSize: '0.85rem',
          color: 'var(--mutedtext)',
        }}
      >
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap',
          }}
        >
          {breadcrumbsList.map((crumb, idx) => {
            const isLast = idx === breadcrumbsList.length - 1;

            return (
              <li
                key={crumb.path || idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {idx > 0 && (
                  <ChevronRight
                    size={13}
                    style={{ opacity: 0.5, flexShrink: 0 }}
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    style={{
                      color: 'var(--charcoal)',
                      fontWeight: 600,
                      maxWidth: '280px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    style={{
                      color: 'var(--mutedtext)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mutedtext)')}
                  >
                    {idx === 0 && <Home size={13} aria-hidden="true" />}
                    <span>{crumb.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
