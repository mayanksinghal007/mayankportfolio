import { SITE_CONFIG, COMPANIES } from '../config/site';

/**
 * Technical JSON-LD Schema Generators for SEO, AEO, and GEO.
 * Follows Google Rich Results and Schema.org standards.
 */

export const getBaseSiteUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return (SITE_CONFIG.siteUrl || 'https://mayankaggarwal-one.vercel.app').replace(/\/+$/, '');
};

/**
 * 1. Person Schema: Mayank Aggarwal (E-E-A-T entity foundation)
 */
export const getPersonSchema = (siteUrl = getBaseSiteUrl()) => ({
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: SITE_CONFIG.name,
  alternateName: ['Mayank', 'Mayank Aggarwal Delhi'],
  jobTitle: SITE_CONFIG.title,
  description: 'Digital Marketing & AI Specialist in Delhi, India with 1 year of hands-on experience in Meta Ads, AI video creation, and creative strategy.',
  url: siteUrl,
  image: `${siteUrl}/images/mayank-aggarwal.jpg`,
  email: `mailto:${SITE_CONFIG.email}`,
  telephone: SITE_CONFIG.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  sameAs: [
    SITE_CONFIG.linkedin,
    SITE_CONFIG.instagram,
  ],
  worksFor: {
    '@type': 'Organization',
    name: COMPANIES.KLIKWISE,
    url: siteUrl,
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: COMPANIES.COLLEGE,
  },
  knowsAbout: [
    'Meta Ads Management',
    'Facebook and Instagram Advertising',
    'Generative AI Video Production',
    'Runway Gen-3 Alpha',
    'Kling AI',
    'Higgsfield AI',
    'ElevenLabs Voice Synthesis',
    'Midjourney Creative Prompting',
    'Performance Marketing',
    'Content Strategy & Retention Hooks',
    'Social Media Marketing',
  ],
});

/**
 * 2. LocalBusiness / ProfessionalService Schema (NAP consistency, Local SEO & GEO)
 */
export const getLocalBusinessSchema = (siteUrl = getBaseSiteUrl()) => ({
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#localbusiness`,
  name: `${SITE_CONFIG.name} — ${SITE_CONFIG.brandName}`,
  alternateName: [COMPANIES.KLIKWISE, 'Mayank Aggarwal', 'Klikwise Digital Marketing', 'Mayank Aggarwal Performance Marketing & AI Creative'],
  description: 'Performance Marketing & AI Video Creative Partner providing Meta & Google Ads management, generative AI video commercials, UGC creative strategy, and lifecycle email marketing for US, UK, and global brands.',
  url: siteUrl,
  logo: `${siteUrl}/images/mayank-aggarwal.jpg`,
  image: `${siteUrl}/images/mayank-aggarwal.jpg`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Connaught Place / South Delhi Hub',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6139,
    longitude: 77.2090,
  },
  sameAs: [
    SITE_CONFIG.linkedin,
    SITE_CONFIG.instagram,
    'https://github.com/mayanksinghal007',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marketing & AI Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing Strategy' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Generative AI Video Production' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Direct-Response UGC Ad Creatives' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lifecycle Email Marketing & Retention' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Voiceover Production' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Strategy & Management' } },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
});

// Backward-compatible alias
export const getProfessionalServiceSchema = getLocalBusinessSchema;

/**
 * 2b. Organization Schema (Brand authority & structured knowledge graph)
 */
export const getOrganizationSchema = (siteUrl = getBaseSiteUrl()) => ({
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: COMPANIES.KLIKWISE,
  legalName: 'Klikwise Digital Marketing',
  alternateName: `${SITE_CONFIG.name} — Performance Marketing & AI Creative`,
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/assets/hero.png`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'customer service',
    email: SITE_CONFIG.email,
    areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'IN'],
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    SITE_CONFIG.linkedin,
    SITE_CONFIG.instagram,
    'https://github.com/mayanksinghal007',
  ],
});

/**
 * 3. WebSite with SearchAction Schema
 */
export const getWebSiteSchema = (siteUrl = getBaseSiteUrl()) => ({
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: `${SITE_CONFIG.name} — ${COMPANIES.KLIKWISE}`,
  url: siteUrl,
  description: 'International growth platform, performance marketing playbooks, and generative AI video creative services by Mayank Aggarwal.',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * 4. BreadcrumbList Schema
 */
export const getBreadcrumbSchema = (items = [], siteUrl = getBaseSiteUrl()) => {
  const fullItems = [
    { name: 'Home', path: '/' },
    ...items,
  ];

  return {
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => {
      let cleanPath = item.path || '';
      let fullUrl = siteUrl;
      if (cleanPath) {
        if (cleanPath.startsWith('http')) {
          fullUrl = cleanPath;
        } else {
          if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
          fullUrl = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
        }
      } else {
        fullUrl = siteUrl;
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
};

/**
 * 5. FAQPage Schema
 */
export const getFaqSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
};

/**
 * 6. Service Schema per service
 */
export const getServiceSchema = (service, siteUrl = getBaseSiteUrl()) => {
  if (!service) return null;
  return {
    '@type': 'Service',
    '@id': `${siteUrl}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.intro || service.overview,
    provider: {
      '@id': `${siteUrl}/#person`,
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Deliverables`,
      itemListElement: (service.includes || []).map((inc, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: inc,
        },
      })),
    },
  };
};

/**
 * 7. BlogPosting Schema
 */
export const getBlogPostingSchema = (post, siteUrl = getBaseSiteUrl()) => {
  if (!post) return null;
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `${siteUrl}${post.coverImage?.startsWith('/') ? '' : '/'}${post.coverImage || 'assets/hero.png'}`;

  return {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.metaDescription || post.summary || post.description || post.title,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: post.author || SITE_CONFIG.name,
      jobTitle: SITE_CONFIG.title,
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: COMPANIES.COLLEGE,
      },
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: COMPANIES.KLIKWISE,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/hero.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    inLanguage: 'en',
  };
};

/**
 * 8. CollectionPage Schema for Blog Index
 */
export const getCollectionPageSchema = (siteUrl = getBaseSiteUrl()) => ({
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/blog#collection`,
  name: 'Digital Marketing & AI Insights Blog | Mayank Aggarwal',
  description: 'Practical playbooks, guides, and workflows on Meta Ads, generative AI video, and short-form content for global brands.',
  url: `${siteUrl}/blog`,
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: COMPANIES.KLIKWISE,
  },
  inLanguage: 'en',
});

/**
 * Helper to build standard @graph wrapper containing all valid schema objects
 */
export const buildSchemaGraph = (schemas = []) => {
  const valid = schemas.filter(Boolean).map(item => {
    if (item && typeof item === 'object') {
      const { '@context': _, ...cleanItem } = item;
      return cleanItem;
    }
    return item;
  });
  if (valid.length === 0) return null;
  if (valid.length === 1 && !valid[0]['@graph']) {
    return {
      '@context': 'https://schema.org',
      ...valid[0],
    };
  }
  return {
    '@context': 'https://schema.org',
    '@graph': valid,
  };
};
