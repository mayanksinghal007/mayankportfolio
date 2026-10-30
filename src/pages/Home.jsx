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
import { FannedCardsDeck } from '../components/FannedCardsDeck';
import { RulerDivider } from '../components/RulerDivider';
import { GiantGhostHeading } from '../components/GiantGhostHeading';

// Interactive Terminal Scramble Glitch Effect for "ai-powered"
const ScrambleText = ({ text = 'ai-powered', duration = 650 }) => {
  const [display, setDisplay] = useState(text);
  const chars = '01#%&*+?@~abcdefghijklmnopqrstuvwxyz';

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const revealedLength = Math.floor(progress * text.length);

      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength) {
          scrambled += text[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplay(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [text, duration]);

  return <span className="scramble-text">{display}</span>;
};

// 3D Parallax Tilt Card for Showreel
const ParallaxTiltCard = ({ children, className = '', ...props }) => {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

// Scroll-Triggered Stat Counter with Elastic Easing & Animated Underline Draw
const StatCounter = ({ value, label, index }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const itemRef = React.useRef(null);

  const match = value.match(/([<>]?)(\d+)(\+?)(.*)/);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (match) {
            const target = parseInt(match[2], 10);
            const duration = 1400;
            const startTime = performance.now();

            const step = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * target));

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.25 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, match]);

  let display = value;
  if (match && hasAnimated) {
    display = `${match[1]}${count}${match[3]}${match[4]}`;
  }

  return (
    <div
      ref={itemRef}
      className={`stat-item ${hasAnimated ? 'active' : ''}`}
      style={{
        opacity: hasAnimated ? 1 : 0.4,
        transform: hasAnimated ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.45rem',
          fontWeight: 800,
          color:
            index === 0
              ? 'var(--accent-orange)'
              : index === 1
              ? 'var(--charcoal)'
              : index === 2
              ? 'var(--accent-amber)'
              : 'var(--accent-orange)',
          lineHeight: 1.1,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--mutedtext)',
          marginTop: '6px',
        }}
      >
        {label}
      </div>
      <div className="stat-underline" />
    </div>
  );
};

export const Home = () => {
  const { site, services, portfolio, blogPosts = [], mediaAssets = {} } = useSite();
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
        title="Mayank Aggarwal | Performance Marketing & AI Video Creative"
        description="Mayank Aggarwal is a Performance Marketing & Generative AI Creative Partner scaling ambitious brands globally with high-converting Meta Ads and video commercials."
        keywords={tickerKeywords}
        canonicalPath="/"
        jsonLd={homeSchemas}
      />

      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Animated Background Growth Curve SVG (ROAS/CTR growth paths) */}
        <svg
          className="hero-growth-chart-bg"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="hero-chart-line"
            d="M-50 480 C 200 450, 350 520, 500 380 C 650 240, 800 320, 950 180 C 1100 40, 1250 120, 1500 20"
            stroke="url(#hero-chart-gradient)"
            strokeWidth="3.5"
          />
          <defs>
            <linearGradient id="hero-chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4500" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF7A45" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFB800" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Industry Micro-Badges drifting in negative space */}
        <div className="floating-badge-container" aria-hidden="true">
          <div className="floating-micro-badge" style={{ top: '12%', left: '3%', animationDelay: '0s' }}>
            <TrendingUp size={13} color="var(--accent-orange)" />
            <span>Meta Ads</span>
          </div>
          <div className="floating-micro-badge" style={{ top: '55%', left: '1%', animationDelay: '-6s' }}>
            <Video size={13} color="var(--accent-orange)" />
            <span>Runway Gen-3</span>
          </div>
          <div className="floating-micro-badge" style={{ top: '16%', right: '48%', animationDelay: '-12s' }}>
            <Sparkles size={13} color="var(--accent-amber)" />
            <span>ROAS ↑ 3.8x</span>
          </div>
          <div className="floating-micro-badge" style={{ top: '82%', right: '52%', animationDelay: '-18s' }}>
            <Sparkles size={13} color="var(--accent-orange)" />
            <span>ElevenLabs Voice</span>
          </div>
          <div className="floating-micro-badge" style={{ top: '8%', right: '36%', animationDelay: '-8s' }}>
            <Video size={13} color="var(--accent-amber)" />
            <span>Kling AI</span>
          </div>
        </div>

        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="container hero-grid">
          {/* Hero Left Content */}
          <div>
            <div className="system-meta-label" style={{ marginBottom: '14px' }}>
              <span className="system-status-dot" />
              <span>● STUDIO_LIVE [V1.0] · PERFORMANCE & AI CREATIVE</span>
            </div>

            <div className="hero-tag">
              <span className="pulse-dot" />
              <span>{site.title} · Global Remote / US & Worldwide</span>
            </div>

            <h1 className="hero-h1 display-hero" aria-label="Creative thinking. Smart marketing. AI-powered execution.">
              <span className="hero-line-mask">
                <span className="hero-line-inner" style={{ animationDelay: '0.1s' }}>
                  CREATIVE THINKING.
                </span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line-inner" style={{ animationDelay: '0.22s' }}>
                  <span className="gradient-sweep-text brand-span">SMART MARKETING.</span>
                </span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line-inner" style={{ animationDelay: '0.34s' }}>
                  <span className="serif-span">
                    <ScrambleText text="ai-powered" duration={650} />
                  </span>{' '}
                  EXECUTION.
                </span>
              </span>
            </h1>

            <p className="hero-lead">
              I partner with ambitious brands across the US, UK, and worldwide to build high-converting Meta Ads, automated email retention funnels, and cinematic generative AI commercial videos.
            </p>

            {/* Profile Authority & Trust Badge */}
            <div
              className="hero-profile-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                margin: '10px 0 24px 0',
                padding: '6px 18px 6px 6px',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2.5px solid #FFFFFF',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
                  flexShrink: 0,
                  backgroundColor: '#ECECEC',
                }}
              >
                <picture>
                  <source srcSet="/images/mayank-aggarwal-avatar-60.webp" type="image/webp" />
                  <img
                    src="/images/mayank-aggarwal-avatar-60.jpg"
                    alt="Mayank Aggarwal - Digital Marketing & AI Specialist"
                    width="60"
                    height="60"
                    fetchPriority="high"
                    decoding="async"
                    className="photo-duotone-shift"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      display: 'block',
                    }}
                  />
                </picture>
              </div>
              <div style={{ lineHeight: 1.35 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--charcoal)', letterSpacing: '-0.01em' }}>
                    Mayank Aggarwal
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                    }}
                    title="Available for Projects in US, UK & Worldwide"
                  />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', fontWeight: 500 }}>
                  Digital Marketing & AI Specialist
                </div>
              </div>
            </div>

            <div className="hero-cta-group">
              <MagneticButton to="/contact" className="btn-brand">
                Book a Discovery Call <ArrowUpRight size={17} />
              </MagneticButton>
              <MagneticButton to="/portfolio" className="btn-dark">
                Explore Selected Work <ArrowRight size={17} />
              </MagneticButton>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-whatsapp btn-whatsapp-nudge"
                style={{ padding: '13px 20px' }}
                title="Instant Chat on WhatsApp"
                aria-label="Direct Chat on WhatsApp with Mayank Aggarwal"
              >
                <MessageCircle size={17} />
                <span className="wa-online-ring" />
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
                <StatCounter key={i} value={stat.value} label={stat.label} index={i} />
              ))}
            </div>

            {/* Scroll Down Indicator */}
            <a
              href="#pillars"
              className="hero-scroll-indicator"
              aria-label="Scroll to services"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('pillars');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="mouse-icon">
                <div className="mouse-wheel" />
              </div>
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mutedtext)' }}>
                Scroll to Explore
              </span>
            </a>
          </div>

          {/* Hero Right Visual: Fanned Stacked Cards Composition & Live Pipeline Status */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FannedCardsDeck
              onOpenShowreel={handleOpenMedia}
              showreelAsset={mediaAssets.home_hero_visual}
            />
          </div>
        </div>
      </section>

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
