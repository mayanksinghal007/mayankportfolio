import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { marked } from 'marked';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, MessageCircle, CheckCircle2, ChevronRight, User, Copy, Check, Mail, Send } from 'lucide-react';
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

  const activePosts = blogPosts && blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;

  const post = useMemo(() => {
    return activePosts.find((p) => p.slug === slug);
  }, [activePosts, slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return activePosts
      .filter((p) => p.slug !== slug && (p.category === post.category || p.tags?.some((t) => post.tags?.includes(t))))
      .slice(0, 3);
  }, [activePosts, post, slug]);


  // Convert markdown content to sanitized HTML
  const parsedContent = useMemo(() => {
    if (!post || !post.content) return '';
    return marked.parse(post.content);
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
        rel="noopener noreferrer nofollow"
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
        rel="noopener noreferrer nofollow"
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
        <XTwitterIcon size={14} color="#ffffff" /> X / Twitter
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post?.title || ''} — Read here: ${canonicalUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
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
        <MessageCircle size={14} /> WhatsApp
      </a>
      <button
        onClick={handleCopyLink}
        type="button"
        aria-label="Copy link to article"
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
        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );

  if (!post) {
    return (
      <section style={{ minHeight: '80vh', padding: '140px 24px', textAlign: 'center', backgroundColor: 'var(--softwhite)' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--charcoal)', marginBottom: '16px' }}>
            Article Not Found
          </h1>
          <p style={{ color: 'var(--mutedtext)', marginBottom: '28px' }}>
            The article you are looking for may have been updated or moved.
          </p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
        </div>
      </section>
    );
  }

  // BlogPosting Schema.org JSON-LD
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
          <header style={{ maxWidth: '860px', margin: '0 auto 40px auto' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
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
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>
                    Updated {post.updated}
                  </span>
                </>
              )}
            </div>

            <h1 className="hero-h1 display-hero" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15, marginBottom: '20px' }}>
              {post.h1 || (post.title.length <= 70 ? post.title : (post.seoTitle && post.seoTitle.length <= 70 ? post.seoTitle : post.title.slice(0, 68)))}
            </h1>

            {/* Answer-First Summary Box (AEO Optimization) */}
            <div
              style={{
                backgroundColor: 'var(--peach)',
                borderLeft: '4px solid var(--brand)',
                padding: '20px 24px',
                borderRadius: '0 12px 12px 0',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--brand)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle2 size={14} /> Quick Answer / Key Takeaway
              </div>
              <p style={{ margin: 0, fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.6, fontWeight: 500 }}>
                {post.summary}
              </p>
            </div>

            {/* Top Social Share Actions */}
            {renderShareButtons('Share this guide:')}

            {/* Featured Image */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
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
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          </header>

          {/* Article Body */}
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              lineHeight: 1.75,
              fontSize: '1.05rem',
              color: 'var(--charcoal)',
            }}
          >
            {/* Rendered Markdown Body */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              style={{
                marginBottom: '36px',
              }}
            />

            {/* Article Tags */}
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', margin: '20px 0 28px 0' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--mutedtext)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Tags:
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

            {/* Bottom Social Share Actions */}
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
              {renderShareButtons('Found this valuable? Share with your peers:')}
            </div>

            {/* VIP Newsletter Dispatch Card */}
            <div
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '36px',
                marginBottom: '48px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--brand)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <Mail size={16} /> VIP Growth Dispatch
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '10px' }}>
                GET PERFORMANCE MARKETING & AI PLAYBOOKS EVERY TUESDAY
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--mutedtext)', lineHeight: 1.6, marginBottom: '20px', maxWidth: '620px' }}>
                Join 2,500+ D2C brand founders, agency media buyers, and creators in Delhi NCR and worldwide. Zero fluff, real Meta ad tests, ROAS breakdowns, and AI prompt workflows.
              </p>

              {isSubscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', backgroundColor: 'var(--peach)', borderLeft: '4px solid var(--brand)', borderRadius: '8px', color: 'var(--charcoal)', fontWeight: 600, fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--brand)" />
                  <span>You're in! Check your inbox next Tuesday for your first growth strategy brief.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', maxWidth: '520px' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: '1 1 240px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem',
                      backgroundColor: 'var(--softwhite)',
                      color: 'var(--charcoal)',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '12px 22px', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    Subscribe Free <Send size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Frequently Asked Questions (FAQ) Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section
                style={{
                  marginTop: '56px',
                  paddingTop: '36px',
                  borderTop: '2px solid var(--border-color)',
                  marginBottom: '48px',
                }}
              >
                <div className="editorial-eyebrow brand" style={{ marginBottom: '8px' }}>
                  Frequently Asked Questions
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: 'var(--charcoal)',
                    marginBottom: '24px',
                  }}
                >
                  COMMON QUESTIONS ANSWERED
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {post.faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: '14px',
                        padding: '20px 24px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.05rem',
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
                          fontSize: '0.95rem',
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

            {/* Author Credibility Box (E-E-A-T) */}
            <div
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '48px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand)',
                  color: '#FFFDF9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                MA
              </div>
              <div style={{ flexGrow: 1, minWidth: '240px' }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--brand)', fontWeight: 700 }}>
                  Written by
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)', marginTop: '2px' }}>
                  {post.author || 'Mayank Aggarwal'}
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.88rem', color: 'var(--mutedtext)', lineHeight: 1.5 }}>
                  Digital Marketing & AI Specialist from Delhi, India. Helping brands scale through high-converting Meta Ads, generative AI video workflows, and modern content strategy.
                </p>
              </div>
              <Link to="/about" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                View Bio & Credentials
              </Link>
            </div>

            {/* Contextual Contact CTA */}
            <div
              style={{
                backgroundColor: 'var(--charcoal)',
                color: 'var(--softwhite)',
                borderRadius: '20px',
                padding: '36px 32px',
                textAlign: 'center',
                marginBottom: '56px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--softwhite)', marginBottom: '12px' }}>
                NEED HELP EXECUTING THIS STRATEGY?
              </h3>
              <p style={{ maxWidth: '560px', margin: '0 auto 24px auto', fontSize: '0.95rem', color: 'rgba(255, 253, 249, 0.8)', lineHeight: 1.6 }}>
                Whether you need a full Meta Ads audit, AI video commercial assets, or custom content strategy, let's discuss your next project.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">
                  Start a Project <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Mayank, I just read your article "${post.title}" and would like to discuss working together.`)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-whatsapp"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '20px' }}>
                  RELATED ARTICLES & GUIDES
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      style={{
                        padding: '18px',
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: '14px',
                        border: '1px solid var(--border-color)',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {r.category}
                        </span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--charcoal)', marginTop: '6px', lineHeight: 1.3 }}>
                          {r.title}
                        </div>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 600, marginTop: '14px' }}>
                        Read Guide <ChevronRight size={13} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
};
