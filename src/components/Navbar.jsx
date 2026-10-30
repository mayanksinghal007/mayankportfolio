import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Menu,
  X,
  Search,
  Home,
  User,
  Sparkles,
  Film,
  Megaphone,
  Workflow,
  BookOpen,
  Mail,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons';
import { useSite } from '../context/SiteContext';

/**
 * Magnetic Button component with physics-weighted cursor tracking
 */
export const MagneticButton = ({ children, className = '', to, href, onClick, ...props }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate3d(0, 0, 0)';
    btnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseEnter = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transition = 'transform 0.1s ease-out';
  };

  if (to) {
    return (
      <Link
        ref={btnRef}
        to={to}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export const Navbar = ({ onOpenSearch }) => {
  const { site } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for blur & compact header style past 80px
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 80);

          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', path: '/', icon: Home, desc: 'Intro & Highlights' },
    { label: 'About', path: '/about', icon: User, desc: 'Background & Bio' },
    { label: 'Services', path: '/services', icon: Sparkles, desc: 'What I Deliver' },
    { label: 'Portfolio', path: '/portfolio', icon: Film, desc: 'Video & Motion Work' },
    { label: 'Ads', path: '/ads', icon: Megaphone, desc: 'Performance Creatives' },
    { label: 'Process', path: '/process', icon: Workflow, desc: '4-Step Workflow' },
    { label: 'Blog', path: '/blog', icon: BookOpen, desc: 'Articles & Guides' },
    { label: 'Contact', path: '/contact', icon: Mail, desc: 'Inquiries & Booking' },
  ];

  return (
    <>
      {/* Sticky Main Header with Scroll-Aware Glassmorphism */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Brand Logo with micro-interaction hover */}
          <Link to="/" className="nav-brand" aria-label="Mayank Aggarwal Home">
            <span>MAYANK</span>
            <span className="nav-brand-dot">.</span>
            <span>AGGARWAL</span>
          </Link>

          {/* Desktop Navigation Links with animated underline draw */}
          <nav aria-label="Primary Navigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Right Actions */}
          <div className="nav-actions">
            {/* Quick Search Button */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="nav-search-btn"
                title="Search Site (Ctrl+K / Cmd+K)"
                aria-label="Search"
              >
                <Search size={16} />
                <span className="nav-search-label">Search</span>
                <kbd className="nav-search-kbd" aria-hidden="true">⌘K</kbd>
              </button>
            )}

            {/* Desktop Contact CTA with Magnetic Hover Physics */}
            <MagneticButton to="/contact" className="btn-primary desktop-cta-btn">
              Start a Project <ArrowUpRight size={15} />
            </MagneticButton>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              type="button"
              className={`mobile-nav-toggle-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-takeover"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.4} />
              ) : (
                <Menu size={24} strokeWidth={2.4} />
              )}
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator Line directly beneath Header */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'var(--accent-gradient)',
            transition: 'width 0.1s linear',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      </header>

      {/* Fullscreen Mobile Takeover Menu with Staggered Link Animation */}
      <div
        id="mobile-nav-takeover"
        className={`mobile-nav-takeover ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Takeover"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        {/* Takeover Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/"
            className="nav-brand"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Mayank Aggarwal Home"
            style={{ color: '#FFFDF9' }}
          >
            <span>MAYANK</span>
            <span className="nav-brand-dot" style={{ color: 'var(--accent-orange)' }}>.</span>
            <span>AGGARWAL</span>
          </Link>

          <button
            type="button"
            className="mobile-sheet-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            style={{ color: '#FFFDF9', background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <X size={22} strokeWidth={2.2} />
          </button>
        </div>

        {/* Staggered Navigation Items */}
        <nav aria-label="Mobile Navigation Links" style={{ margin: 'auto 0' }}>
          <ul className="mobile-takeover-nav">
            {navItems.map((item, index) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `mobile-takeover-link ${isActive ? 'active' : ''}`}
                  style={{ animationDelay: `${0.06 + index * 0.06}s` }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.9rem', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
                    0{index + 1}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Takeover Footer with Quick Chat & Social Links */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-whatsapp btn-whatsapp-nudge"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp
            <span className="wa-online-ring" />
          </a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ color: 'rgba(255, 253, 249, 0.7)' }}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ color: 'rgba(255, 253, 249, 0.7)' }}
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ color: 'rgba(255, 253, 249, 0.7)' }}
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
