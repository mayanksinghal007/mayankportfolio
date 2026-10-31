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
  Calculator,
  MapPin,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { MediaModal } from '../components/MediaModal';
import { AdsSection } from '../components/AdsSection';
import { CtaBanner } from '../components/CtaBanner';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, PROCESS_STEPS, WHY_CHOOSE_ME } from '../data/initialData';
import { HERO_STATS, PORTFOLIO_NOTE } from '../config/site';
import { SeoHead } from '../components/SeoHead';
import { ToolsMarquee } from '../components/ToolsMarquee';

import { getPersonSchema, getOrganizationSchema, getLocalBusinessSchema, getWebSiteSchema } from '../utils/seoSchemas';
import { FEATURED_BLOG_POSTS } from '../data/featuredBlogs';
import { MagneticButton } from '../components/Navbar';
import { CinematicHero } from '../components/CinematicHero';
import { RulerDivider } from '../components/RulerDivider';
import { GiantGhostHeading } from '../components/GiantGhostHeading';

export const Home = () => {
  const { site, portfolio = [], blogPosts = [], mediaAssets = {} } = useSite();
  const [activeMedia, setActiveMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMedia = (item) => {
    setActiveMedia(item);
    setIsModalOpen(true);
  };

  const featuredProjects = portfolio.filter((p) => p.published).slice(0, 3);

  const homeSchemas = [
    getPersonSchema(),
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
  ];

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
    'Direct Response Hooks',
    'UGC Creative Strategy',
  ];

  return (
    <>
      <SeoHead
        title="Mayank Aggarwal | Digital Marketer & AI Video Creative Specialist in Delhi"
        description="Meta Ads, AI video ads and email retention funnels for Indian D2C brands and startups. Delhi-based digital marketer with remote delivery worldwide."
        keywords={tickerKeywords}
        canonicalPath="/"
        jsonLd={homeSchemas}
      />

      {/* AWWWARDS-TIER CINEMATIC MOTION-GRAPHICS HERO (100vw x 100svh) */}
      <CinematicHero />

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 01 // CAPABILITIES & WORKFLOW" />

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

      {/* CORE PRODUCTION TOOLS & AI STACK MARQUEE */}
      <ToolsMarquee />

      {/* CORE PILLARS / CAPABILITIES */}
      <section className="section-pad giant-ghost-container" id="pillars">
        <GiantGhostHeading text="ACCELERATE" offset="-3%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head reveal-on-scroll">
            <div className="system-meta-label" style={{ marginBottom: '14px' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 01 // SELECTED CAPABILITIES</span>
            </div>
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
            <div className="service-card card-awwwards-lift has-corner-brackets" style={{ backgroundColor: 'var(--purewhite)' }}>
              <span className="crosshair-corner crosshair-tl">+</span>
              <span className="crosshair-corner crosshair-tr">+</span>
              <span className="crosshair-corner crosshair-bl">+</span>
              <span className="crosshair-corner crosshair-br">+</span>
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
              <Link to="/services/performance-marketing" className="service-action-link" data-cursor="VIEW">
                View Full Details <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="service-card card-awwwards-lift has-corner-brackets" style={{ backgroundColor: 'var(--purewhite)' }}>
              <span className="crosshair-corner crosshair-tl">+</span>
              <span className="crosshair-corner crosshair-tr">+</span>
              <span className="crosshair-corner crosshair-bl">+</span>
              <span className="crosshair-corner crosshair-br">+</span>
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
              <Link to="/services/social-media-management" className="service-action-link" data-cursor="VIEW">
                View Full Details <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="service-card card-awwwards-lift card-featured-glow has-corner-brackets" style={{ backgroundColor: 'var(--card-dark)', color: 'var(--softwhite)', borderColor: 'rgba(255, 184, 0, 0.25)' }}>
              <span className="crosshair-corner crosshair-tl" style={{ color: 'rgba(255, 184, 0, 0.4)' }}>+</span>
              <span className="crosshair-corner crosshair-tr" style={{ color: 'rgba(255, 184, 0, 0.4)' }}>+</span>
              <span className="crosshair-corner crosshair-bl" style={{ color: 'rgba(255, 184, 0, 0.4)' }}>+</span>
              <span className="crosshair-corner crosshair-br" style={{ color: 'rgba(255, 184, 0, 0.4)' }}>+</span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="service-card-top">
                  <span className="service-num" style={{ color: 'var(--accent-amber)' }}>03</span>
                  <div className="service-icon-box" style={{ backgroundColor: 'rgba(255, 184, 0, 0.15)', color: 'var(--accent-amber)' }}>
                    <Video size={24} />
                  </div>
                </div>
                <h3 className="service-name" style={{ color: 'var(--softwhite)' }}>AI Video & Generative Creative</h3>
                <p className="service-intro" style={{ color: 'rgba(255, 253, 249, 0.75)' }}>
                  Cinematic brand trailers, UGC ad variations, neural voiceovers, and scroll-stopping visuals created using Runway, Kling AI, and ElevenLabs.
                </p>
                <ul className="service-includes-list">
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--accent-amber)' }} />Runway Gen-3 & Kling AI Video</li>
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--accent-amber)' }} />ElevenLabs Emotive Voiceovers</li>
                  <li className="service-include-item" style={{ color: 'rgba(255, 253, 249, 0.85)' }}><span className="service-include-bullet" style={{ backgroundColor: 'var(--accent-amber)' }} />Fast Production Cycles</li>
                </ul>
              </div>
              <Link to="/services/ai-video-creation" className="service-action-link" style={{ color: 'var(--accent-amber)', position: 'relative', zIndex: 1 }} data-cursor="VIEW">
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

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 02 // PERFORMANCE SHOWCASE" />

      {/* SELECTED PORTFOLIO SHOWCASE */}
      <section className="section-pad giant-ghost-container" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <GiantGhostHeading text="SHOWCASE" offset="-3%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal-on-scroll" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
            <div>
              <div className="system-meta-label" style={{ marginBottom: '14px' }}>
                <span className="system-status-dot" />
                <span>SYSTEM 02 // PERFORMANCE SHOWCASE</span>
              </div>
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
              <div key={project.id} className="project-card card-awwwards-lift has-corner-brackets" data-cursor="VIEW">
                <span className="crosshair-corner crosshair-tl">+</span>
                <span className="crosshair-corner crosshair-tr">+</span>
                <span className="crosshair-corner crosshair-bl">+</span>
                <span className="crosshair-corner crosshair-br">+</span>
                <div
                  className="project-media-wrap"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenMedia(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-thumb photo-duotone-shift"
                    width="600"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/blog/photo-1460925895917-afdab827c52f.webp';
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

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 03 // VALUE ARCHITECTURE" />

      {/* WHY CHOOSE ME SECTION */}
      <section className="section-pad giant-ghost-container">
        <GiantGhostHeading text="ADVANTAGE" offset="-3%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head center">
            <div className="system-meta-label" style={{ marginBottom: '14px', justifyContent: 'center' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 03 // OPERATOR METRICS</span>
            </div>
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
                className="card-awwwards-lift has-corner-brackets"
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 28px',
                }}
              >
                <span className="crosshair-corner crosshair-tl">+</span>
                <span className="crosshair-corner crosshair-tr">+</span>
                <span className="crosshair-corner crosshair-bl">+</span>
                <span className="crosshair-corner crosshair-br">+</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--accent-orange)',
                      lineHeight: 1,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M8 12l2.5 2.5 5.5-5.5" className="checkmark-draw" />
                  </svg>
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

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 04 // 4-STAGE PIPELINE" />

      {/* WORKING PROCESS PREVIEW */}
      <section className="section-pad section-dark giant-ghost-container" style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)' }}>
        <GiantGhostHeading text="METHODOLOGY" offset="-3%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head">
            <div className="system-meta-label" style={{ marginBottom: '14px' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 04 // 4-STAGE METHODOLOGY</span>
            </div>
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
                className="process-card card-awwwards-lift has-corner-brackets"
                style={{
                  backgroundColor: 'var(--card-dark)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--softwhite)',
                }}
              >
                <span className="crosshair-corner crosshair-tl" style={{ color: 'rgba(255, 184, 0, 0.35)' }}>+</span>
                <span className="crosshair-corner crosshair-tr" style={{ color: 'rgba(255, 184, 0, 0.35)' }}>+</span>
                <span className="crosshair-corner crosshair-bl" style={{ color: 'rgba(255, 184, 0, 0.35)' }}>+</span>
                <span className="crosshair-corner crosshair-br" style={{ color: 'rgba(255, 184, 0, 0.35)' }}>+</span>
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

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 05 // VERIFIED HISTORY" />

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
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                      {edu.degree}
                    </h3>
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

      {/* FREE INTERACTIVE GROWTH TOOLS & REGIONAL HUBS */}
      <section className="section-pad" style={{ backgroundColor: 'var(--purewhite)' }}>
        <div className="container">
          <div className="section-head reveal-on-scroll">
            <span className="editorial-eyebrow">Proprietary Growth Utilities</span>
            <h2 className="display-title section-title">FREE MARKETING TOOLS & REGIONAL HUBS.</h2>
            <p className="section-desc" style={{ maxWidth: '680px' }}>
              Test your unit economics, generate cinematic prompt strings, and analyze localized paid ad benchmarks across key global hubs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <Link
              to="/tools/meta-ads-roas-calculator"
              style={{
                backgroundColor: 'var(--cream-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
              }}
              className="service-card"
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <Calculator size={22} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Financial Simulator
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '10px' }}>
                  Meta Ads ROAS & Profit Calculator
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  Compute true net margins, break-even ROAS, POAS, and COD Return-to-Origin (RTO) impact across USD, GBP, AED, and INR.
                </p>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.86rem', color: 'var(--brand-text)' }}>
                Launch Calculator <ArrowUpRight size={15} />
              </div>
            </Link>

            <Link
              to="/tools/ai-video-prompt-generator"
              style={{
                backgroundColor: 'var(--cream-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
              }}
              className="service-card"
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <Video size={22} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Generative Video
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '10px' }}>
                  AI Video Ad Prompt Generator
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  Generate high-fidelity camera prompts with custom focal lengths, volumetric lighting, and motion physics for Runway Gen-3 & Kling AI.
                </p>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.86rem', color: 'var(--brand-text)' }}>
                Generate Prompts <ArrowUpRight size={15} />
              </div>
            </Link>

            <Link
              to="/tools/reel-hook-generator"
              style={{
                backgroundColor: 'var(--cream-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
              }}
              className="service-card"
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'var(--gold)', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <Sparkles size={22} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Short-Form Retention
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '10px' }}>
                  Viral Reel & Hook Generator
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  Generate thumb-stopping 3-second opening scripts, visual pattern interrupts, and audio cues for Instagram Reels and TikTok.
                </p>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.86rem', color: 'var(--brand-text)' }}>
                Generate Hooks <ArrowUpRight size={15} />
              </div>
            </Link>
          </div>

          {/* Regional Hubs Quick Bar */}
          <div style={{ padding: '24px', backgroundColor: 'var(--cream)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--brand)" /> Regional Growth & Performance Hubs:
              </span>
              <Link to="/glossary" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand)' }}>
                View Marketing Glossary →
              </Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Link to="/locations/delhi" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Delhi NCR</Link>
              <Link to="/locations/gurugram" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Gurugram</Link>
              <Link to="/locations/noida" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Noida</Link>
              <Link to="/locations/mumbai" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Mumbai</Link>
              <Link to="/locations/bangalore" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Bengaluru</Link>
              <Link to="/locations/new-york" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>New York</Link>
              <Link to="/locations/london" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>London</Link>
              <Link to="/locations/dubai" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Dubai</Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST FROM THE BLOG SECTION */}
      <section className="section-padding giant-ghost-container" style={{ backgroundColor: 'var(--peach)' }}>
        <GiantGhostHeading text="PLAYBOOKS" offset="-4%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head reveal-on-scroll" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="system-meta-label" style={{ marginBottom: '14px' }}>
                <span className="system-status-dot" />
                <span>SYSTEM 06 // KNOWLEDGE ENGINE</span>
              </div>
              <span className="editorial-eyebrow">Tactical Playbooks & Guides</span>
              <h2 className="display-title section-title">LATEST FROM THE BLOG.</h2>
            </div>
            <Link to="/blog" className="btn-secondary" style={{ padding: '10px 22px' }}>
              Explore All 50 Playbooks <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {((blogPosts && blogPosts.length > 0) ? blogPosts.slice(0, 3) : FEATURED_BLOG_POSTS).map((post) => (
              <article
                key={post.id}
                className="portfolio-card has-corner-brackets"
                style={{
                  backgroundColor: 'var(--softwhite)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span className="crosshair-corner crosshair-tl">+</span>
                <span className="crosshair-corner crosshair-tr">+</span>
                <span className="crosshair-corner crosshair-bl">+</span>
                <span className="crosshair-corner crosshair-br">+</span>
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
                    className="photo-duotone-shift"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/blog/photo-1460925895917-afdab827c52f.webp';
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
                      color: 'var(--brand-text)',
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
