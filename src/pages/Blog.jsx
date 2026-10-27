import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BLOG_CATEGORIES, DEFAULT_BLOG_POSTS } from '../data/blogData';
import { Search, Clock, ArrowRight, Tag, BookOpen, Sparkles, Globe, Filter, X, CheckCircle2, ChevronRight, Calculator, MessageCircle } from 'lucide-react';
import { getCollectionPageSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

const REGIONAL_FILTERS = [
  { id: 'all', label: 'All Regions', flag: '🌐' },
  { id: 'us', label: 'United States ($)', flag: '🇺🇸', query: 'us' },
  { id: 'uk', label: 'United Kingdom (£)', flag: '🇬🇧', query: 'uk' },
  { id: 'uae', label: 'UAE / Dubai (AED)', flag: '🇦🇪', query: 'dubai' },
  { id: 'aus', label: 'Australia (A$)', flag: '🇦🇺', query: 'australi' },
  { id: 'global', label: 'Global / Cross-Border', flag: '🌍', query: 'cross-border' },
];

export const Blog = () => {
  const { blogPosts = [] } = useSite();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  const blogSchemas = [
    getCollectionPageSchema(),
    getBreadcrumbSchema([{ name: 'Blog', path: '/blog' }]),
  ];

  const activePosts = blogPosts && blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;

  // Filter posts by published status, category, region, and search query
  const filteredPosts = useMemo(() => {
    return activePosts.filter((post) => {
      if (post.published === false) return false;

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' ||
        post.category === selectedCategory ||
        (selectedCategory === 'Meta Ads' && (post.category?.includes('Meta') || post.tags?.some(t => /meta|facebook|instagram/i.test(t)))) ||
        (selectedCategory === 'Google Ads' && (post.category?.includes('Google') || post.tags?.some(t => /google|pmax|youtube/i.test(t)))) ||
        (selectedCategory === 'Twitter & Multi-Platform Ads' && (post.category?.includes('Twitter') || post.tags?.some(t => /twitter|x ads|linkedin|tiktok/i.test(t)))) ||
        (selectedCategory === 'Performance Marketing' && (post.category?.includes('Performance') || post.category?.includes('CRO') || post.category?.includes('E-Commerce') || post.tags?.some(t => /roas|mer|cac|cro/i.test(t)))) ||
        (selectedCategory === 'Social Media Marketing' && (post.category?.includes('Social') || post.category?.includes('Content') || post.category?.includes('Video') || post.tags?.some(t => /reels|hook|video|retention/i.test(t)))) ||
        (selectedCategory === 'SEO & AEO/GEO' && (post.category?.includes('SEO') || post.tags?.some(t => /seo|aeo|geo|crawler|llms/i.test(t)))) ||
        (selectedCategory === 'Global & International Ads' && (post.category?.includes('International') || post.category?.includes('Global') || post.tags?.some(t => /international|global|us|uk|uae|dubai|cross-border/i.test(t))));

      // Region matching
      let matchesRegion = true;
      if (selectedRegion !== 'all') {
        const regObj = REGIONAL_FILTERS.find(r => r.id === selectedRegion);
        if (regObj?.query) {
          const q = regObj.query.toLowerCase();
          const title = post.title.toLowerCase();
          const desc = (post.metaDescription || post.summary || '').toLowerCase();
          const tags = (post.tags || []).join(' ').toLowerCase();
          const slug = (post.slug || '').toLowerCase();
          matchesRegion = title.includes(q) || desc.includes(q) || tags.includes(q) || slug.includes(q);
        }
      }

      // Search matching
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [activePosts, selectedCategory, selectedRegion, searchQuery]);

  // Category counts for badges
  const categoryCounts = useMemo(() => {
    const counts = { All: activePosts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      if (cat === 'All') return;
      counts[cat] = activePosts.filter((p) => {
        if (cat === 'Meta Ads') return p.category?.includes('Meta') || p.tags?.some(t => /meta|facebook|instagram/i.test(t));
        if (cat === 'Google Ads') return p.category?.includes('Google') || p.tags?.some(t => /google|pmax|youtube/i.test(t));
        if (cat === 'Twitter & Multi-Platform Ads') return p.category?.includes('Twitter') || p.tags?.some(t => /twitter|x ads|linkedin|tiktok/i.test(t));
        if (cat === 'Performance Marketing') return p.category?.includes('Performance') || p.category?.includes('CRO') || p.category?.includes('E-Commerce');
        if (cat === 'Social Media Marketing') return p.category?.includes('Social') || p.category?.includes('Content') || p.category?.includes('Video');
        if (cat === 'SEO & AEO/GEO') return p.category?.includes('SEO') || p.tags?.some(t => /seo|aeo|geo/i.test(t));
        if (cat === 'Global & International Ads') return p.category?.includes('International') || p.category?.includes('Global') || p.tags?.some(t => /international|global|us|uk|uae/i.test(t));
        return p.category === cat;
      }).length;
    });
    return counts;
  }, [activePosts]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  return (
    <>
      <SeoHead
        title="Marketing & Ad Playbooks: Meta, Google, X & SEO | Mayank Aggarwal"
        description="Comprehensive playbooks on Meta Ads, Google PMax, Twitter/X ads, B2B lead gen, viral reels, and modern SEO/AEO/GEO strategies across US, UK, UAE & Global markets."
        canonicalPath="/blog"
        jsonLd={blogSchemas}
      />

      <section
        className="page-hero-pad"
        style={{
          backgroundColor: 'var(--softwhite)',
          minHeight: '100vh',
        }}
      >
        <div className="site-container">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />

          {/* Hero Header */}
          <div style={{ maxWidth: '920px', marginBottom: '40px' }}>
            <div className="hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span className="hero-eyebrow-line" />
              <span>TACTICAL MARKETING & GLOBAL AD PLAYBOOKS</span>
            </div>

            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px', lineHeight: 1.15 }}>
              PROVEN MEDIA BUYING.{' '}
              <span className="brand-span">GLOBAL AD SCALE.</span>{' '}
              <span className="serif-span">Zero</span> HYPOTHETICAL FLUFF.
            </h1>

            <p className="hero-lead" style={{ marginTop: '16px', color: 'var(--mutedtext)', fontSize: '1.1rem', maxWidth: '820px' }}>
              Exhaustive tactical guides on Meta Ads, Google Performance Max, Twitter/X ads, LinkedIn ABM, short-form retention hooks, and modern SEO/AEO/GEO. Modeled with real unit economics in USD ($), GBP (£), AED (د.إ), and AUD ($).
            </p>
          </div>

          {/* Search, Categories & Region Filter Controls */}
          <div
            style={{
              backgroundColor: 'var(--cream-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}
          >
            {/* Search Bar */}
            <div style={{ position: 'relative', maxWidth: '640px', marginBottom: '20px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--mutedtext)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(18);
                }}
                placeholder="Search by topic, platform (Meta, Google, X, SEO) or city (Dubai, London, NY)..."
                aria-label="Search blog playbooks"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 48px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--purewhite)',
                  fontSize: '0.95rem',
                  color: 'var(--charcoal)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 61, 10, 0.12)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--mutedtext)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mutedtext)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Select Marketing Discipline:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {BLOG_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setVisibleCount(18);
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: isActive ? '1px solid var(--brand)' : '1px solid var(--border-color)',
                        backgroundColor: isActive ? 'var(--brand)' : 'var(--purewhite)',
                        color: isActive ? '#FFFDF9' : 'var(--charcoal)',
                        boxShadow: isActive ? '0 4px 12px rgba(255, 61, 10, 0.25)' : 'none',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span>{cat}</span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '1px 6px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--peach)',
                          color: isActive ? '#FFFDF9' : 'var(--brand)',
                          fontWeight: 700,
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regional Market Filters */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mutedtext)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Filter by Target Market & Currency:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {REGIONAL_FILTERS.map((reg) => {
                  const isActive = selectedRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => {
                        setSelectedRegion(reg.id);
                        setVisibleCount(18);
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: isActive ? '1px solid var(--charcoal)' : '1px solid var(--border-color)',
                        backgroundColor: isActive ? 'var(--charcoal)' : 'var(--purewhite)',
                        color: isActive ? '#FFFDF9' : 'var(--charcoal)',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span>{reg.flag}</span>
                      <span>{reg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Count & Reset Indicator */}
            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--mutedtext)' }}>
              <span>
                Showing <strong>{displayedPosts.length}</strong> of <strong>{filteredPosts.length}</strong> verified playbooks
              </span>
              {(selectedCategory !== 'All' || selectedRegion !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedRegion('all');
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Reset all filters <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '20px',
                border: '1px dashed var(--border-color)',
              }}
            >
              <BookOpen size={40} style={{ color: 'var(--brand)', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)' }}>
                No playbooks found matching your criteria
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginTop: '6px' }}>
                Try clearing your search query or switching categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
                className="btn-primary"
                style={{ marginTop: '16px', display: 'inline-flex' }}
              >
                View All Playbooks
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '28px',
              }}
            >
              {displayedPosts.map((post) => (
                <article
                  key={post.id}
                  className="portfolio-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: 'var(--purewhite)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = 'var(--brand)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {/* Article Thumbnail */}
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      position: 'relative',
                      display: 'block',
                      aspectRatio: '16 / 9',
                      overflow: 'hidden',
                      backgroundColor: 'var(--peach)',
                    }}
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      width="800"
                      height="450"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(26, 26, 26, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--softwhite)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {post.category}
                    </div>
                  </Link>

                  {/* Article Content */}
                  <div
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    {/* Meta Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.78rem',
                        color: 'var(--mutedtext)',
                        marginBottom: '10px',
                      }}
                    >
                      <span>{post.date}</span>
                      <span>·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        lineHeight: 1.35,
                        color: 'var(--charcoal)',
                        marginBottom: '10px',
                      }}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--mutedtext)',
                        lineHeight: 1.6,
                        marginBottom: '18px',
                        flexGrow: 1,
                      }}
                    >
                      {post.summary}
                    </p>

                    {/* Bottom Action Bar */}
                    <div
                      style={{
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {post.tags &&
                          post.tags.slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: '0.7rem',
                                color: 'var(--mutedtext)',
                                backgroundColor: 'var(--peach)',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontWeight: 500,
                              }}
                            >
                              #{t}
                            </span>
                          ))}
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--brand)',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          textDecoration: 'none',
                        }}
                      >
                        Read Guide <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Pagination Button */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '48px', marginBottom: '24px' }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 18)}
                className="btn-primary"
                style={{
                  padding: '14px 36px',
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(255, 61, 10, 0.25)',
                }}
              >
                Load More Playbooks ({filteredPosts.length - displayedPosts.length} remaining) <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Mid-Page Strategic Conversion Card */}
          <div
            style={{
              marginTop: '64px',
              backgroundColor: 'var(--charcoal)',
              color: 'var(--cream)',
              borderRadius: '24px',
              padding: 'clamp(32px, 5vw, 56px)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
              <span
                style={{
                  backgroundColor: 'var(--brand)',
                  color: '#FFFDF9',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'inline-block',
                  marginBottom: '16px',
                }}
              >
                Strategic Growth Consultation
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                  color: 'var(--cream)',
                }}
              >
                Scaling Meta, Google, or Multi-Platform Ads Globally?
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 253, 249, 0.8)',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                }}
              >
                Stop guessing ad spend allocation. Book a 30-minute campaign audit with Mayank Aggarwal to review attribution modeling, creative hooks, and international CAC benchmarks across US, UK, UAE, and India.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  to="/contact"
                  className="btn-primary"
                  style={{
                    backgroundColor: 'var(--brand)',
                    color: '#FFFDF9',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Book 1-on-1 Ad Audit <ArrowRight size={16} />
                </Link>
                <Link
                  to="/tools/meta-ads-roas-calculator"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--cream)',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Calculator size={16} /> Free Breakeven ROAS Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
