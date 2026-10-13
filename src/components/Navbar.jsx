import React, { useState, useEffect } from 'react';
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

export const Navbar = ({ onOpenSearch }) => {
  const { site } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for blur & compact header style
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
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
      {/* Sticky Main Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" aria-label="Mayank Aggarwal Home">
            <span>MAYANK</span>
            <span className="nav-brand-dot">.</span>
            <span>AGGARWAL</span>
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
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
                aria-label="Search site content"
              >
                <Search size={16} />
                <span className="nav-search-label">Search</span>
                <kbd className="nav-search-kbd">⌘K</kbd>
              </button>
            )}

            {/* Desktop Contact CTA */}
            <Link to="/contact" className="btn-primary desktop-cta-btn">
              Start a Project <ArrowUpRight size={15} />
            </Link>

            {/* Mobile / Tablet Menu Toggle Button ("Triple-Bar Hamburger") */}
            <button
              type="button"
              className={`mobile-nav-toggle-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.4} />
              ) : (
                <Menu size={24} strokeWidth={2.4} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay (Outside Header) */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Navigation Sheet Drawer (Outside Header to avoid stacking context issues) */}
      <aside
        id="mobile-nav-drawer"
        className={`mobile-nav-sheet ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Drawer"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Drawer Header */}
        <div className="mobile-sheet-header">
          <Link
            to="/"
            className="nav-brand"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Mayank Aggarwal Home"
          >
            <span>MAYANK</span>
            <span className="nav-brand-dot">.</span>
            <span>AGGARWAL</span>
          </Link>
          <button
            type="button"
            className="mobile-sheet-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="mobile-sheet-body">
          {/* Quick Search Bar Trigger */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="mobile-sheet-search"
            >
              <Search size={18} />
              <span>Search site or articles...</span>
              <kbd className="nav-search-kbd">⌘K</kbd>
            </button>
          )}

          {/* Navigation Items List */}
          <nav aria-label="Mobile Navigation Links">
            <ul className="mobile-sheet-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path} className="mobile-sheet-item">
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      <div className="mobile-item-icon">
                        <Icon size={18} />
                      </div>
                      <div className="mobile-item-text">
                        <span className="mobile-item-title">{item.label}</span>
                        <span className="mobile-item-desc">{item.desc}</span>
                      </div>
                      <ChevronRight size={16} className="mobile-item-arrow" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="mobile-sheet-footer">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>

          {/* Quick Social Links */}
          <div className="mobile-sheet-socials">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mobile-social-icon"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mobile-social-icon"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={site.github || 'https://github.com/mayanksinghal007'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="mobile-social-icon"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email Mayank"
              className="mobile-social-icon"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
