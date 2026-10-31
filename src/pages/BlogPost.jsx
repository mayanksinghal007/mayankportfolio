import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { marked } from 'marked';
import { 
  Clock, Calendar, ArrowLeft, ArrowRight, Share2, MessageCircle, 
  CheckCircle2, ChevronRight, User, Copy, Check, Mail, Send, 
  BookOpen, List, Sparkles, Phone, Globe, ExternalLink, Calculator
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon, XTwitterIcon } from '../components/SocialIcons';
import { SITE_CONFIG } from '../config/site';
import { getBlogPostingSchema, getBreadcrumbSchema, getFaqSchema } from '../utils/seoSchemas';
import { DEFAULT_BLOG_POSTS } from '../data/blogData';

export const BlogPost = () => {
  const { slug } = useParams();
  const { blogPosts = [], site } = useSite();
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTocId, setActiveTocId] = useState('');

  const activePosts = blogPosts && blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;

  const post = useMemo(() => {
    return activePosts.find((p) => p.slug === slug);
  }, [activePosts, slug]);

  // Find index for previous / next navigation
  const currentIndex = useMemo(() => {
    if (!post) return -1;
    return activePosts.findIndex((p) => p.slug === slug);
  }, [activePosts, post, slug]);

  const prevPost = currentIndex > 0 ? activePosts[currentIndex - 1] : (activePosts.length > 1 ? activePosts[activePosts.length - 1] : null);
  const nextPost = currentIndex >= 0 && currentIndex < activePosts.length - 1 ? activePosts[currentIndex + 1] : (activePosts.length > 1 ? activePosts[0] : null);

  // Extract Table of Contents from markdown headings
  const tocItems = useMemo(() => {
    if (!post || !post.content) return [];
    const lines = post.content.split('\n');
    const items = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length; // 2 or 3
        const title = match[2].trim().replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ level, title, id });
      }
    });
    return items;
  }, [post]);

  // Target Region / Currency Detection for Badge
  const regionalBadge = useMemo(() => {
    if (!post) return null;
    const t = (post.title + ' ' + (post.tags || []).join(' ') + ' ' + (post.summary || '')).toLowerCase();
    if (t.includes('usd') || t.includes('united states') || t.includes('california') || t.includes('new york') || t.includes('san francisco')) {
      return { flag: '🇺🇸', label: 'United States Strategy (USD $)' };
    }
    if (t.includes('gbp') || t.includes('united kingdom') || t.includes('london') || t.includes('uk')) {
      return { flag: '🇬🇧', label: 'United Kingdom Strategy (GBP £)' };
    }
    if (t.includes('aed') || t.includes('dubai') || t.includes('abu dhabi') || t.includes('uae')) {
      return { flag: '🇦🇪', label: 'UAE & Middle East Strategy (AED د.إ)' };
    }
    if (t.includes('australi') || t.includes('sydney') || t.includes('aud')) {
      return { flag: '🇦🇺', label: 'Australia Strategy (AUD A$)' };
    }
    if (t.includes('cross-border') || t.includes('global') || t.includes('international')) {
      return { flag: '🌍', label: 'Cross-Border Global Media Buying' };
    }
    return { flag: '🇮🇳', label: 'National & High-Intent Strategy' };
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post || !activePosts.length) return [];
    const others = activePosts.filter((p) => p.slug !== slug);
    if (!others.length) return [];

    const sameCategory = others.filter((p) => p.category === post.category);
    const otherCategory = others.filter((p) => p.category !== post.category);

    const pickRotated = (arr, count, offset) => {
      if (arr.length <= count) return arr;
      const res = [];
      const cleanOffset = Math.abs(offset) % arr.length;
      for (let i = 0; i < count; i++) {
        res.push(arr[(cleanOffset + i) % arr.length]);
      }
      return res;
    };

    const categoryPool = sameCategory.length > 0 ? sameCategory : others;
    const categoryPicks = pickRotated(categoryPool, 4, (currentIndex >= 0 ? currentIndex : 0) * 2);

    const crossPool = otherCategory.length > 0 ? otherCategory : others;
    const crossPicks = pickRotated(crossPool, 2, (currentIndex >= 0 ? currentIndex : 0) * 3 + 1);

    const combined = [...categoryPicks];
    for (const p of crossPicks) {
      if (!combined.some((c) => c.slug === p.slug) && combined.length < 6) {
        combined.push(p);
      }
    }
    return combined;
  }, [activePosts, post, slug, currentIndex]);

  // Convert markdown content to sanitized HTML with heading IDs for jump links
  const parsedContent = useMemo(() => {
    if (!post || !post.content) return '';
    const renderer = new marked.Renderer();
    renderer.heading = function ({ text, depth }) {
      const plainText = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '');
      const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    };
    return marked.parse(post.content, { renderer });
  }, [post]);

  const baseSiteUrl = (SITE_CONFIG.siteUrl || 'https://mayankaggarwal-one.vercel.app').replace(/\/+$/, '');
  const canonicalUrl = post ? `${baseSiteUrl}/blog/${post.slug}` : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: post?.slug || 'blog_newsletter',
        newsletter_topic: post?.category || 'all',
      });
    }
  };

  const renderShareButtons = (label = 'Share this guide:') => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: '#0077b5',
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <LinkedinIcon size={14} color="#ffffff" /> LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post?.title || '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <XTwitterIcon size={14} color="#ffffff" /> X (Twitter)
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent((post?.title || '') + ' — ' + canonicalUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: '#25D366',
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <MessageCircle size={14} color="#ffffff" /> WhatsApp
      </a>
      <button
        onClick={handleCopyLink}
        aria-label="Copy article link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: copied ? 'var(--brand)' : 'var(--card-bg)',
          color: copied ? '#ffffff' : 'var(--charcoal)',
          border: '1px solid var(--border-color)',
          fontSize: '0.78rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {copied ? (
          <>
            <Check size={14} /> Link Copied!
          </>
        ) : (
          <>
            <Copy size={14} /> Copy Link
          </>
        )}
      </button>
    </div>
  );

  if (!post) {
    return (
      <section style={{ minHeight: '80vh', padding: '140px 24px', textAlign: 'center', backgroundColor: 'var(--softwhite)' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--charcoal)', marginBottom: '16px' }}>
            Playbook Not Found
          </h1>
          <p style={{ color: 'var(--mutedtext)', marginBottom: '28px' }}>
            The playbook you are looking for may have been updated or moved.
          </p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft size={16} /> Back to All Playbooks
          </Link>
        </div>
      </section>
    );
  }

  // Schema.org JSON-LD
  const combinedSchemas = [
    getBlogPostingSchema(post),
    getBreadcrumbSchema([
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    getFaqSchema(post.faqs),
  ].filter(Boolean);

  return (
    <>
      <SeoHead
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.summary}
        keywords={post.tags}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        publishedTime={post.date}
        modifiedTime={post.updated || post.date}
        author={post.author}
        jsonLd={combinedSchemas}
      />

      <article className="page-hero-pad" style={{ backgroundColor: 'var(--softwhite)', minHeight: '100vh' }}>
        <div className="site-container">
          <Breadcrumbs
            items={[
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          {/* Article Header */}
          <header style={{ maxWidth: '880px', margin: '0 auto 40px auto' }}>
            {/* Badges & Meta Bar */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span
                style={{
                  backgroundColor: 'var(--brand)',
                  color: '#FFFDF9',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                {post.category}
              </span>

              {regionalBadge && (
                <span
                  style={{
                    backgroundColor: 'var(--charcoal)',
                    color: 'var(--cream)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{regionalBadge.flag}</span>
                  <span>{regionalBadge.label}</span>
                </span>
              )}

              <span style={{ fontSize: '0.82rem', color: 'var(--mutedtext)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {post.date}
              </span>
              <span style={{ color: 'var(--mutedtext)' }}>·</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--mutedtext)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {post.readTime}
              </span>
              {post.updated && (
                <>
                  <span style={{ color: 'var(--mutedtext)' }}>·</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-text)', fontWeight: 700 }}>
                    Updated {post.updated}
                  </span>
                </>
              )}
            </div>

            {/* H1 Heading */}
            <h1 className="hero-h1 display-hero" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.18, marginBottom: '24px' }}>
              {post.h1 || (post.title.length <= 70 ? post.title : (post.seoTitle && post.seoTitle.length <= 70 ? post.seoTitle : post.title))}
            </h1>

            {/* Answer-First Executive Summary Box (AEO & GEO Optimization) */}
            <div
              style={{
                backgroundColor: 'var(--peach)',
                borderLeft: '4px solid var(--brand)',
                padding: '24px',
                borderRadius: '0 16px 16px 0',
                marginBottom: '28px',
                boxShadow: '0 4px 20px rgba(255, 61, 10, 0.05)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--brand)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle2 size={16} /> Executive Summary & Key Takeaways (AEO Direct Answer)
              </div>
              <p style={{ margin: 0, fontSize: '1.02rem', color: 'var(--charcoal)', lineHeight: 1.65, fontWeight: 500 }}>
                {post.summary}
              </p>
            </div>

            {/* Top Share Actions */}
            {renderShareButtons('Share this guide:')}

            {/* Featured Image */}
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                backgroundColor: 'var(--peach)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                width="1200"
                height="675"
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/hero-showreel.webp';
                }}
              />
            </div>
          </header>

          {/* Article Main Layout: Content + Sticky Sidebar */}
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: tocItems.length > 0 ? 'minmax(0, 1fr) 280px' : 'minmax(0, 1fr)',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Primary Content Column */}
            <div
              style={{
                minWidth: 0,
                lineHeight: 1.78,
                fontSize: '1.05rem',
                color: 'var(--charcoal)',
              }}
            >
              {/* Mobile Table of Contents (shown on smaller screens) */}
              {tocItems.length > 0 && (
                <div
                  className="mobile-toc-box"
                  style={{
                    backgroundColor: 'var(--cream-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '32px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                    <List size={16} color="var(--brand)" /> Quick Navigation Index
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                    {tocItems.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '6px' }}>
                        <a href={`#${item.id}`} style={{ color: 'var(--charcoal)', textDecoration: 'none', fontWeight: item.level === 2 ? 600 : 400 }}>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rendered Markdown Body */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
                style={{
                  marginBottom: '40px',
                }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', margin: '24px 0 32px 0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--mutedtext)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Strategic Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.78rem',
                        padding: '4px 12px',
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '999px',
                        color: 'var(--charcoal)',
                        fontWeight: 500,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Share Actions */}
              <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
                {renderShareButtons('Found this playbook valuable? Share with your network:')}
              </div>

              {/* Frequently Asked Questions (FAQ) Section */}
              {post.faqs && post.faqs.length > 0 && (
                <section
                  style={{
                    marginTop: '40px',
                    paddingTop: '32px',
                    borderTop: '2px solid var(--border-color)',
                    marginBottom: '48px',
                  }}
                >
                  <div className="editorial-eyebrow brand" style={{ marginBottom: '8px' }}>
                    Verified FAQ Section
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--charcoal)',
                      marginBottom: '20px',
                    }}
                  >
                    COMMON QUESTIONS ANSWERED
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {post.faqs.map((faq, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: 'var(--cream-card)',
                          borderRadius: '16px',
                          padding: '20px 24px',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1.02rem',
                            fontWeight: 700,
                            color: 'var(--charcoal)',
                            marginBottom: '8px',
                          }}
                        >
                          {faq.q}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.94rem',
                            color: 'var(--mutedtext)',
                            lineHeight: 1.65,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Credibility Card */}
              <div
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  marginBottom: '48px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid var(--brand)',
                  }}
                >
                  <img
                    src="/images/blog/photo-1507003211169-0a1dd7228f2d.webp"
                    alt="Mayank Aggarwal"
                    width="68"
                    height="68"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <div style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--charcoal)' }}>
                      Mayank Aggarwal
                    </div>
                    <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--peach)', color: 'var(--brand)', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                      Specialist & Media Buyer
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--mutedtext)', lineHeight: 1.5, marginBottom: '12px' }}>
                    Digital Marketer & AI Specialist at Klikwise. Alumni of Shaheed Bhagat Singh College, University of Delhi. Managing Meta Ads, Google PMax, and generative creative production for Indian D2C brands and global clients.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href="https://wa.me/919217756033"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <MessageCircle size={14} /> WhatsApp Mayank
                    </a>
                    <Link
                      to="/contact"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        borderRadius: '999px',
                        border: '1px solid var(--border-color)',
                        color: 'var(--charcoal)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'var(--card-bg)',
                      }}
                    >
                      Book 30-Min Audit <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Prev / Next Article Navigation Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  marginBottom: '48px',
                }}
              >
                {prevPost && (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--cream-card)',
                      border: '1px solid var(--border-color)',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--mutedtext)', fontWeight: 700, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ArrowLeft size={12} /> Previous Playbook
                    </span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--charcoal)', fontWeight: 700, lineHeight: 1.35 }}>
                      {prevPost.title}
                    </span>
                  </Link>
                )}

                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--cream-card)',
                      border: '1px solid var(--border-color)',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      textAlign: 'right',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--mutedtext)', fontWeight: 700, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      Next Playbook <ArrowRight size={12} />
                    </span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--charcoal)', fontWeight: 700, lineHeight: 1.35 }}>
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Desktop Sticky Sidebar (TOC & Strategic Tools) */}
            {tocItems.length > 0 && (
              <aside
                className="desktop-toc-sidebar"
                style={{
                  position: 'sticky',
                  top: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {/* Table of Contents Card */}
                <div
                  style={{
                    backgroundColor: 'var(--purewhite)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.78rem', color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                    <List size={15} color="var(--brand)" /> Table of Contents
                  </div>
                  <nav>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      {tocItems.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '8px', paddingLeft: item.level === 3 ? '12px' : '0' }}>
                          <a
                            href={`#${item.id}`}
                            style={{
                              color: 'var(--mutedtext)',
                              textDecoration: 'none',
                              display: 'block',
                              fontWeight: item.level === 2 ? 600 : 400,
                              transition: 'color 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mutedtext)')}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Free Tool Card */}
                <div
                  style={{
                    backgroundColor: 'var(--peach)',
                    border: '1px solid rgba(255, 61, 10, 0.2)',
                    borderRadius: '20px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    <Calculator size={14} /> Free Growth Tool
                  </div>
                  <div style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '8px' }}>
                    Meta & Google Ads ROAS Calculator
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--mutedtext)', lineHeight: 1.5, marginBottom: '16px' }}>
                    Calculate exact breakeven ROAS, customer CAC, and cash margins across USD, GBP, AED, and INR.
                  </p>
                  <Link
                    to="/tools/meta-ads-roas-calculator"
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 16px', fontSize: '0.8rem', textAlign: 'center', justifyContent: 'center' }}
                  >
                    Open Calculator
                  </Link>
                </div>
              </aside>
            )}
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section style={{ marginTop: '80px', paddingTop: '48px', borderTop: '2px solid var(--border-color)' }}>
              <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="editorial-eyebrow brand" style={{ marginBottom: '8px' }}>
                  Recommended Reading
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--charcoal)', marginBottom: '32px' }}>
                  RELATED MARKETING & AD PLAYBOOKS
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {relatedPosts.map((rel) => (
                    <article
                      key={rel.id}
                      style={{
                        backgroundColor: 'var(--purewhite)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Link to={`/blog/${rel.slug}`} style={{ display: 'block', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          loading="lazy"
                          width="600"
                          height="338"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Link>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ fontSize: '0.74rem', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                          {rel.category}
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.35, marginBottom: '8px', flexGrow: 1 }}>
                          <Link to={`/blog/${rel.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {rel.title}
                          </Link>
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--mutedtext)', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                          <span>{rel.readTime}</span>
                          <Link to={`/blog/${rel.slug}`} style={{ color: 'var(--brand)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Read <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};
