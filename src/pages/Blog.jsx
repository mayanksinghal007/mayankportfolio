import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BLOG_CATEGORIES } from '../data/blogData';
import { Search, Clock, ArrowRight, Tag, BookOpen, Sparkles } from 'lucide-react';

export const Blog = () => {
  const { blogPosts = [] } = useSite();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts by published status, category, and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (post.published === false) return false;
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  return (
    <>
      <SeoHead
        title="Marketing & AI Blog | Mayank Aggarwal"
        description="Practical guides on Meta Ads, generative AI video workflows, short-form reel hooks, and modern SEO/AEO/GEO strategies by Mayank Aggarwal."
        canonicalPath="/blog"
      />

      <section
        style={{
          paddingTop: '130px',
          paddingBottom: '90px',
          backgroundColor: 'var(--softwhite)',
          minHeight: '100vh',
        }}
      >
        <div className="site-container">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />

          {/* Header */}
          <div style={{ maxWidth: '820px', marginBottom: '48px' }}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>PRACTICAL PLAYBOOKS & PERSPECTIVES</span>
            </div>

            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              MARKETING GUIDES.{' '}
              <span className="brand-span">AI WORKFLOWS.</span>{' '}
              <span className="serif-span">Honest</span> PERSPECTIVES.
            </h1>

            <p className="hero-lead" style={{ marginTop: '16px' }}>
              No theoretical fluff or generic AI regurgitation. Step-by-step frameworks on Meta Ads, AI video prompts, short-form retention hooks, and search optimization based on real execution.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                maxWidth: '480px',
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--mutedtext)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tools (Runway, CAPI, Hooks)..."
                aria-label="Search blog articles"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 46px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--card-bg)',
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
            </div>

            {/* Category Filter Pills */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isActive
                        ? '1px solid var(--brand)'
                        : '1px solid var(--border-color)',
                      backgroundColor: isActive ? 'var(--brand)' : 'var(--card-bg)',
                      color: isActive ? '#FFFDF9' : 'var(--charcoal)',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '16px',
                border: '1px dashed var(--border-color)',
              }}
            >
              <BookOpen size={36} style={{ color: 'var(--mutedtext)', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)' }}>
                No articles found
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginTop: '6px' }}>
                Try adjusting your search query or switching categories.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '28px',
              }}
            >
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="portfolio-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
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
                      width="1200"
                      height="675"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(26, 26, 26, 0.82)',
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
                    {/* Meta Info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.78rem',
                        color: 'var(--mutedtext)',
                        marginBottom: '12px',
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
                        fontSize: '1.25rem',
                        lineHeight: 1.3,
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
                        fontSize: '0.9rem',
                        color: 'var(--mutedtext)',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        flexGrow: 1,
                      }}
                    >
                      {post.summary}
                    </p>

                    {/* Bottom Link */}
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
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                        }}
                      >
                        Read Playbook <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
