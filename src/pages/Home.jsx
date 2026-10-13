import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Play,
  TrendingUp,
  Video,
  Share2,
  CheckCircle,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { MediaModal } from '../components/MediaModal';
import { AdsSection } from '../components/AdsSection';
import { CtaBanner } from '../components/CtaBanner';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, PROCESS_STEPS, WHY_CHOOSE_ME } from '../data/initialData';
import { HERO_STATS, PORTFOLIO_NOTE } from '../config/site';
import { SeoHead } from '../components/SeoHead';

export const Home = () => {
  const { site, services, portfolio, blogPosts = [] } = useSite();
  const [activeMedia, setActiveMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMedia = (item) => {
    setActiveMedia(item);
    setIsModalOpen(true);
  };

  const featuredProjects = portfolio.filter((p) => p.published).slice(0, 3);

  const tickerKeywords = [
    'Meta Ads Strategy',
    'AI Video Production',
    'ElevenLabs Voiceovers',
    'High-Retention Reels',
    'Creative Testing',
    'Midjourney Visuals',
    'Content Calendars',
    'Runway Gen-3 Alpha',
    'Kling AI Workflows',
    'SEO & Backlinks',
  ];

  return (
    <>
      <SeoHead
        title="Mayank Aggarwal | Digital Marketing & AI Specialist Delhi"
        description="Performance Meta Ads, generative AI video creation, and high-retention content strategy for modern brands by Mayank Aggarwal based in Delhi, India."
        canonicalPath="/"
      />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="container hero-grid">
          {/* Hero Left Content */}
          <div>
            <div className="hero-tag">
              <span className="pulse-dot" />
              <span>{site.title} · {site.location}</span>
            </div>

            <h1 className="hero-h1 display-hero">
              CREATIVE THINKING.{' '}
              <span className="brand-span">SMART MARKETING.</span>{' '}
              <span className="serif-span">AI-powered</span> EXECUTION.
            </h1>

            <p className="hero-lead">
              I help ambitious brands turn ideas into high-converting Meta Ads, unforgettable social media presence, and cinematic generative AI video and creative assets.
            </p>

            <div className="hero-cta-group">
              <Link to="/portfolio" className="btn-dark">
                Explore Selected Work <ArrowUpRight size={17} />
              </Link>
              <Link to="/services" className="btn-secondary">
                View All Services <ArrowRight size={17} />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '13px 20px' }}
                title="Instant Chat on WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>

            {/* Honest, Verifiable Hero Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '20px',
                marginTop: '44px',
                paddingTop: '28px',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              {HERO_STATS.map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: i === 0 ? 'var(--brand)' : i === 1 ? 'var(--charcoal)' : i === 2 ? 'var(--gold)' : 'var(--brand)',
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--mutedtext)',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Visual Showreel Card */}
          <div>
            <div className="hero-visual-card">
              <div className="hero-card-badge">
                <Sparkles size={13} />
                <span>Featured Showreel 2026</span>
              </div>

              <div className="hero-media-window">
                <img
                  src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80"
                  alt="Mayank Aggarwal AI Showreel"
                  className="hero-media-bg"
                  width="1200"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="hero-media-overlay" />

                <div className="hero-media-content">
                  <button
                    onClick={() =>
                      handleOpenMedia({
                        title: 'Mayank Aggarwal — Creative & AI Showreel',
                        overview:
                          'A high-octane montage of generative AI video, 3D typography, cinematic motion grading, and Meta ad campaign performance highlights.',
                        image:
                          'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
                        hasVideoDemo: true,
                        tags: ['Runway Gen-3', 'ElevenLabs', 'Meta Ads', 'Editorial Cut'],
                      })
                    }
                    className="hero-media-play"
                    title="Watch Showreel"
                  >
                    <Play size={24} style={{ marginLeft: '3px' }} />
                  </button>

                  <span className="editorial-eyebrow gold" style={{ fontSize: '0.7rem' }}>
                    Mayank Studio Production
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--softwhite)', marginTop: '4px' }}>
                    THE GENERATIVE ERA
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255, 253, 249, 0.75)', marginTop: '4px' }}>
                    Click to preview video & audio capabilities
                  </p>
                </div>
              </div>

              {/* Floating Brand Pill */}
              <div className="hero-metrics-pill">
                <div className="pill-val">Klikwise</div>
                <div className="pill-lbl">Digital & AI Studio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER STRIP */}
      <div className="ticker-strip">
        <div className="ticker-track">
          {[...tickerKeywords, ...tickerKeywords].map((keyword, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-dot" />
              <span>{keyword}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CORE PILLARS / CAPABILITIES */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow">Selected Capabilities</span>
            <h2 className="display-title section-title">THREE WAYS I ACCELERATE BRANDS.</h2>
            <p className="section-desc">
              Whether you need to scale revenue through paid social, build magnetic organic presence, or harness generative AI workflows—I provide full-stack execution.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Pillar 1 */}
            <div className="service-card" style={{ backgroundColor: 'var(--purewhite)' }}>
              <div>
                <div className="service-card-top">
                  <span className="service-num">01</span>
                  <div className="service-icon-box">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <h3 className="service-name">Performance Marketing</h3>
                <p className="service-intro">
                  High-converting Meta Ads strategy, Advantage+ campaign structures, and daily optimization designed to turn ad spend into profitable revenue.
                </p>
                <ul className="service-includes-list">
                  <li className="service-include-item"><span className="service-include-bullet" />Pixel & CAPI Attribution Tracking</li>
                  <li className="service-include-item"><span className="service-include-bullet" />Audience Segmentation & Lookalikes</li>
                  <li className="service-include-item"><span className="service-include-bullet" />Weekly Creative Testing & Scaling</li>
                </ul>
              </div>
              <Link to="/services/performance-marketing" className="service-action-link">
                View Full Details <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="service-card" style={{ backgroundColor: 'var(--purewhite)' }}>
              <div>
                <div className="service-card-top">
                  <span className="service-num">02</span>
                  <div className="service-icon-box">
                    <Share2 size={24} />
                  </div>
                </div>
                <h3 className="service-name">Social Media Management</h3>
                <p className="service-intro">
                  End-to-end content calendars, psychological reel hooks, and brand communication that build a devoted following across Instagram and YouTube.
                </p>
                <ul className="service-includes-list">
                  <li className="service-include-item"><span className="service-include-bullet" />30-Day Content Frameworks</li>
                  <li className="service-include-item"><span className="service-include-bullet" />First 3-Second Retention Hooks</li>
                  <li className="service-include-item"><span className="service-include-bullet" />Community & Engagement Management</li>
                </ul>
              </div>
              <Link to="/services/social-media-management" className="service-action-link">
                View Full Details <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="service-card" style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)', borderColor: 'var(--charcoal)' }}>
              <div>
                <div className="service-card-top">
                  <span className="service-num" style={{ color: 'var(--gold)' }}>03</span>
                  <div className="service-icon-box" style={{ backgroundColor: 'rgba(255, 185, 46, 0.15)', color: 'var(--gold)' }}>
                    <Video size={24} />
                  </div>
                </div>
                <h3 className="service-name" style={{ color: 'var(--softwhite)' }}>AI Video & Generative Creative</h3>
                <p className="service-intro" style={{ color: 'rgba(255, 253, 249, 0.75)' }}>
                  Cinematic brand trailers, UGC ad variations, neural voiceovers, and scroll-stopping visuals created using Runway, Kling AI, and ElevenLabs.
                </p>
                <ul className="service-includes-list">
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--gold)' }} />Runway Gen-3 & Kling AI Video</li>
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--gold)' }} />ElevenLabs Emotive Voiceovers</li>
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--gold)' }} />Fast Production Cycles</li>
                </ul>
              </div>
              <Link to="/services/ai-video-creation" className="service-action-link" style={{ color: 'var(--gold)' }}>
                View Full Details <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/services" className="btn-secondary">
              Explore All 7 Specialized Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED PORTFOLIO SHOWCASE */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
            <div>
              <span className="editorial-eyebrow">Case Studies & Showcase</span>
              <h2 className="display-title section-title">REAL WORK. HONEST PROCESS.</h2>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginTop: '6px' }}>
                {PORTFOLIO_NOTE}
              </p>
            </div>
            <Link to="/portfolio" className="btn-dark">
              View Complete Portfolio <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="portfolio-grid">
            {featuredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div
                  className="project-media-wrap"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenMedia(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <span className="project-category-badge">{project.category}</span>
                  {(project.isSample || !project.verified) && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(25, 25, 25, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--amber)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255, 185, 46, 0.3)',
                      }}
                    >
                      Sample / Concept Project
                    </span>
                  )}
                  {(project.hasVideoDemo || project.hasAudioDemo) && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(25,25,25,0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      <Play size={12} fill="var(--gold)" />
                      <span>Interactive Preview</span>
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-overview">{project.overview}</p>

                    {project.results && (
                      <div className="project-results-box">
                        <strong>{project.verified ? 'Results: ' : 'Approach & Method: '}</strong>
                        {project.results}
                      </div>
                    )}

                    {/* Metric boxes only when verified is true */}
                    {project.verified && project.metrics && project.metrics.length > 0 && (
                      <div className="project-metrics-row">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="project-metric-item">
                            <div className="val">{m.val}</div>
                            <div className="lbl">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="project-tags">
                      {project.tags.map((t) => (
                        <span key={t} className="tag-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenMedia(project)}
                      className="service-action-link"
                      style={{ width: '100%', marginTop: '16px' }}
                    >
                      Inspect Case Study Details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADS & CREATIVE SHOWCASE SECTION */}
      <AdsSection showViewAllLink={true} limit={6} />

      {/* WHY CHOOSE ME SECTION */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head center">
            <span className="editorial-eyebrow">Why Partner With Me</span>
            <h2 className="display-title section-title">THE ADVANTAGE OF A MODERN SPECIALIST.</h2>
            <p className="section-desc">
              I combine the data discipline of a performance growth marketer with the aesthetic instinct of an AI filmmaker.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {WHY_CHOOSE_ME.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 28px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--brand)',
                      lineHeight: 1,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <CheckCircle size={20} color="#FF3D0A" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING PROCESS PREVIEW */}
      <section className="section-pad" style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)' }}>
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow gold">The Methodology</span>
            <h2 className="display-title section-title" style={{ color: 'var(--softwhite)' }}>
              FROM AUDIT TO ITERATIVE SCALING.
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255, 253, 249, 0.75)' }}>
              No guesswork. Every campaign and creative piece follows a proven four-step execution framework.
            </p>
          </div>

          <div className="process-grid">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="process-card"
                style={{
                  backgroundColor: 'var(--charcoal-card)',
                  borderColor: 'var(--charcoal-border)',
                  color: 'var(--softwhite)',
                }}
              >
                <div>
                  <div className="process-step-num">{s.step}</div>
                  <h3 className="process-card-title" style={{ color: 'var(--softwhite)' }}>
                    {s.title}
                  </h3>
                  <p className="process-card-desc" style={{ color: 'rgba(255, 253, 249, 0.7)' }}>
                    {s.desc}
                  </p>
                </div>
                <div className="process-deliverables" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div className="process-deliverables-title" style={{ color: 'var(--gold)' }}>
                    Deliverables:
                  </div>
                  <ul className="process-deliverables-list">
                    {s.deliverables.map((d, i) => (
                      <li key={i} style={{ color: 'rgba(255, 253, 249, 0.85)' }}>
                        • {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/process" className="btn-primary" style={{ backgroundColor: 'var(--gold)', color: 'var(--charcoal)' }}>
              Learn More About The Workflow <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SNAPSHOT */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow">Real Agency & Startup History</span>
            <h2 className="display-title section-title">EXPERIENCE & CREDENTIALS.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {EXPERIENCE_ITEMS.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-org" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={16} />
                      <span>{exp.org} · {exp.location}</span>
                    </div>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginBottom: '14px' }}>
                  {exp.description}
                </p>
                <ul className="exp-points">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="exp-point-item">
                      <span className="exp-point-bullet" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Education Badge */}
            {EDUCATION_ITEMS.map((edu) => (
              <div
                key={edu.id}
                style={{
                  backgroundColor: 'var(--cream)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                      {edu.degree}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--mutedtext)', fontWeight: 600 }}>
                      {edu.institution} ({edu.period})
                    </p>
                  </div>
                </div>
                <Link to="/about" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  View Full Profile <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST FROM THE BLOG SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--peach)' }}>
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="editorial-eyebrow">Tactical Playbooks & Guides</span>
              <h2 className="display-title section-title">LATEST FROM THE BLOG.</h2>
            </div>
            <Link to="/blog" className="btn-secondary" style={{ padding: '10px 22px' }}>
              Explore All 8 Articles <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="portfolio-card"
                style={{
                  backgroundColor: 'var(--softwhite)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    aspectRatio: '16 / 9',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    width="1200"
                    height="675"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(26, 26, 26, 0.85)',
                      color: 'var(--softwhite)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category}
                  </span>
                </Link>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', marginBottom: '8px' }}>
                    {post.date} · {post.readTime}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      color: 'var(--charcoal)',
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--mutedtext)',
                      lineHeight: 1.55,
                      marginBottom: '16px',
                      flexGrow: 1,
                    }}
                  >
                    {post.summary}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--brand)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                    }}
                  >
                    Read Guide <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH-IMPACT CTA BANNER */}
      <CtaBanner />

      {/* Interactive Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaData={activeMedia}
      />
    </>
  );
};
