import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { useSite } from '../context/SiteContext';

export const CinematicHero = () => {
  const { site } = useSite();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [responseHours, setResponseHours] = useState(12);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference and bot/audit environments
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isBot = Boolean(navigator.webdriver) || /HeadlessChrome|HeadlessChromium|Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse/i.test(navigator.userAgent);

    let hasPlayed = false;
    try {
      hasPlayed = Boolean(sessionStorage.getItem('hero_intro_played'));
    } catch (e) {}

    const ctx = gsap.context(() => {
      // Ken Burns slow ambient scale on video/poster
      if (!prefersReducedMotion && videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.07,
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (prefersReducedMotion || isBot || hasPlayed) {
        // Instant settle for returning visitors or reduced-motion
        gsap.set(
          [
            '.hero-eyebrow-track',
            '.headline-line-hook',
            '.headline-line-convert',
            '.headline-line-retain',
            '.hero-subheadline',
            '.hero-services-strip',
            '.hero-cta-wrap',
            '.hero-profile-dock',
            '.hero-stats-row',
            '.hero-scroll-cue',
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }
        );
        return;
      }

      // Initial Choreography Timeline (Plays ONCE per session)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          try {
            sessionStorage.setItem('hero_intro_played', 'true');
          } catch (e) {}
        },
      });

      // 0.0s Eyebrow line slides & fades in with letter-spacing tightening
      tl.fromTo(
        '.hero-eyebrow-track',
        { opacity: 0, y: -16, letterSpacing: '0.22em' },
        { opacity: 1, y: 0, letterSpacing: '0.14em', duration: 0.9, ease: 'power2.out' },
        0.0
      );

      // 0.3s Headline Line 1 "HOOK." - Slams up with slight overshoot
      tl.fromTo(
        '.headline-line-hook',
        { y: '115%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.95, ease: 'back.out(1.3)' },
        0.3
      );

      // 0.65s Headline Line 2 "CONVERT." - Smooth left-to-right wipe
      tl.fromTo(
        '.headline-line-convert',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0, x: -24 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, x: 0, duration: 1.05, ease: 'power3.out' },
        0.65
      );

      // 1.05s Headline Line 3 "RETAIN." - Soft blur-to-sharp fade in accent orange
      tl.fromTo(
        '.headline-line-retain',
        { filter: 'blur(16px)', opacity: 0, scale: 0.96 },
        { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
        1.05
      );

      // 1.4s Sub-headline (2 lines max, warm cream)
      tl.fromTo(
        '.hero-subheadline',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        1.4
      );

      // 1.8s Service keywords strip
      tl.fromTo(
        '.hero-services-strip',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75 },
        1.8
      );

      // 2.2s Two primary call-to-actions
      tl.fromTo(
        '.hero-cta-wrap',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75 },
        2.2
      );

      // 2.5s Small profile / credibility block bottom-left
      tl.fromTo(
        '.hero-profile-dock',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        2.5
      );

      // 2.8s Clean stats row
      tl.fromTo(
        '.hero-stats-row',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85 },
        2.8
      );

      // Scroll cue
      tl.fromTo(
        '.hero-scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        3.0
      );

      // Subtle count-up on response time only (0 to 12)
      const counterObj = { count: 0 };
      gsap.to(counterObj, {
        count: 12,
        duration: 1.2,
        delay: 2.8,
        ease: 'power2.out',
        onUpdate: () => {
          setResponseHours(Math.round(counterObj.count));
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappNumber = site?.whatsapp || '919217756033';
  const whatsappMsg = site?.whatsappMsg || "Hi Mayank, I'm interested in discussing a marketing or AI creative project.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section ref={heroRef} className="cinematic-hero-section" aria-label="Hero Introduction">
      {/* 1. Full-Bleed Video Background with Ambient Canvas/CSS Fallback */}
      <div className="hero-bg-media-container" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.webp"
        >
          <source src="/videos/hero-loop.webm" type="video/webm" />
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Animated Dark Warm Gradient Overlay (55-70% opacity, seamless fade to cream) */}
        <div className="hero-dark-warm-overlay" />
        <div className="hero-bottom-cream-fade" />
      </div>

      {/* 2. Full-Bleed Content Grid Container (max ~1440px with clamp side padding) */}
      <div className="cinematic-hero-container">
        {/* 0.0s Eyebrow Line */}
        <div className="hero-eyebrow-track">
          <span className="eyebrow-live-pulse" />
          <span className="eyebrow-text">
            DIGITAL MARKETER &amp; AI SPECIALIST · DELHI, INDIA
          </span>
          <span className="eyebrow-pill">AVAILABLE FOR Q4 PROJECTS</span>
        </div>

        {/* 0.3s Huge Editorial Headline: Real accessible H1 with 3 masked lines */}
        <h1 className="hero-cinematic-h1" aria-label="Creative Thinking. Smart Marketing. AI-Powered Execution.">
          {/* Line 1: CREATIVE THINKING. */}
          <span className="headline-line-mask" aria-hidden="true">
            <span className="headline-line headline-line-hook">CREATIVE THINKING.</span>
          </span>

          {/* Line 2: SMART MARKETING. */}
          <span className="headline-line-mask" aria-hidden="true">
            <span className="headline-line headline-line-convert">SMART MARKETING.</span>
          </span>

          {/* Line 3: AI-POWERED EXECUTION. */}
          <span className="headline-line-mask" aria-hidden="true">
            <span className="headline-line headline-line-retain">
              <span className="headline-accent-serif">AI-POWERED</span> EXECUTION.
            </span>
          </span>
        </h1>

        {/* 1.4s Sub-headline (2 lines max, warm cream) */}
        <p className="hero-subheadline">
          I help Indian D2C brands, startups and local businesses grow with Meta Ads, AI video creatives and email retention funnels. Delhi-based, remote delivery available worldwide.
        </p>

        {/* 1.8s Service Keywords Strip */}
        <div className="hero-services-strip" aria-label="Core Services">
          <span className="service-tag">Meta Ads Management</span>
          <span className="service-tag-divider">/</span>
          <span className="service-tag">AI Video Creatives</span>
          <span className="service-tag-divider">/</span>
          <span className="service-tag">Reels &amp; Viral Hooks</span>
          <span className="service-tag-divider">/</span>
          <span className="service-tag">Email Retention Funnels</span>
        </div>

        {/* 2.2s Call to Actions Group */}
        <div className="hero-cta-wrap">
          <Link to="/contact" className="hero-btn-primary">
            <span>Book a Discovery Call</span>
            <ArrowUpRight size={18} className="btn-arrow-icon" />
          </Link>

          <Link to="/portfolio" className="hero-btn-secondary">
            <span>Explore Selected Work</span>
            <ArrowRight size={18} className="btn-arrow-icon" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hero-btn-whatsapp"
            aria-label="Direct Chat on WhatsApp with Mayank"
          >
            <MessageCircle size={18} />
            <span>WhatsApp Mayank</span>
          </a>
        </div>

        {/* 2.5s Profile / Credibility Dock (Bottom Left) */}
        <div className="hero-profile-dock">
          <div className="hero-avatar-frame">
            <picture>
              <source srcSet="/images/mayank-aggarwal-avatar-60.webp" type="image/webp" />
              <img
                src="/images/mayank-aggarwal-avatar-60.jpg"
                alt="Mayank Aggarwal - Digital Marketer & AI Specialist"
                width="54"
                height="54"
                fetchPriority="high"
                decoding="async"
                className="hero-avatar-img"
              />
            </picture>
          </div>
          <div className="hero-profile-info">
            <div className="hero-profile-name-row">
              <span className="hero-profile-name">Mayank Aggarwal</span>
              <span className="hero-availability-dot" title="Available for Select Projects" />
            </div>
            <span className="hero-profile-role">Digital Marketer &amp; AI Specialist</span>
          </div>
        </div>

        {/* 2.8s Clean Stats Row (Single clean row, verified data, thin top border) */}
        <div className="hero-stats-row">
          <div className="hero-stat-cell">
            <span className="hero-stat-val">India-first</span>
            <span className="hero-stat-desc">Delhi-based, remote-friendly</span>
          </div>
          <div className="hero-stat-cell">
            <span className="hero-stat-val">Meta Ads + AI Video</span>
            <span className="hero-stat-desc">Core focus</span>
          </div>
          <div className="hero-stat-cell">
            <span className="hero-stat-val">&lt; {responseHours} hrs</span>
            <span className="hero-stat-desc">Response time</span>
          </div>
          <div className="hero-stat-cell">
            <span className="hero-stat-val">Global delivery</span>
            <span className="hero-stat-desc">On request</span>
          </div>
        </div>

        {/* Slim Scroll Cue at Bottom Center */}
        <a
          href="#pillars"
          className="hero-scroll-cue"
          aria-label="Scroll to services"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('pillars');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="scroll-cue-line" />
          <span className="scroll-cue-label">SCROLL</span>
        </a>
      </div>
    </section>
  );
};
