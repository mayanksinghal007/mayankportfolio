import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight, Shield } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons';
import { useSite } from '../context/SiteContext';
import { MagneticButton } from './Navbar';

export const Footer = () => {
  const { site, services } = useSite();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Massive Magnetic Awwwards-Tier Callout */}
        <div
          style={{
            padding: '40px 0 54px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '44px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-orange)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Have a Project in Mind?
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                fontWeight: 900,
                color: '#FFFDF9',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              START SOMETHING <span style={{ color: 'var(--accent-orange)' }}>EXTRAORDINARY</span>.
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <MagneticButton
              to="/contact"
              className="btn-brand"
              style={{
                padding: '16px 32px',
                fontSize: '1rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              data-cursor="LET'S TALK"
            >
              Start a Project <ArrowUpRight size={18} />
            </MagneticButton>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-whatsapp btn-whatsapp-nudge"
              style={{ padding: '16px 28px', fontSize: '1rem' }}
            >
              <MessageCircle size={18} /> WhatsApp Direct
              <span className="wa-online-ring" />
            </a>
          </div>
        </div>

        <div className="footer-top">
          {/* Col 1: Brand & Direct Contact */}
          <div>
            <Link to="/" className="footer-brand">
              MAYANK<span style={{ color: 'var(--brand)' }}>.</span>AGGARWAL
            </Link>
            <p className="footer-tagline">
              {site.title} based in {site.location}. Blending performance marketing metrics with high-aesthetic AI creative execution.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-whatsapp"
                style={{ padding: '9px 18px', fontSize: '0.82rem' }}
              >
                <MessageCircle size={15} /> WhatsApp Direct
              </a>
              <Link
                to="/contact"
                className="btn-secondary"
                style={{ padding: '9px 18px', fontSize: '0.82rem', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--softwhite)' }}
              >
                Start a Project <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* NAP (Name, Address, Phone) & Local SEO Authority Block */}
            <address
              style={{
                fontStyle: 'normal',
                marginTop: '18px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                color: 'rgba(255, 253, 249, 0.75)',
              }}
            >
              <div style={{ color: 'var(--softwhite)', fontWeight: 700, marginBottom: '2px' }}>
                {site.name} · {site.brandName}
              </div>
              <div>Delhi, NCR, India · PIN: 110001</div>
              <div>
                Phone / WhatsApp:{' '}
                <a
                  href={`tel:${(site.phoneTel || site.phone || '').replace(/\s+/g, '')}`}
                  style={{ color: 'var(--softwhite)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {site.phone}
                </a>
              </div>
              <div>
                Email:{' '}
                <a
                  href={`mailto:${site.email}`}
                  style={{ color: 'var(--softwhite)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {site.email}
                </a>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>
                Project Inquiries: Available 24/7 · Replies within 12 hours
              </div>
            </address>
          </div>

          {/* Col 2: Navigation & Tools */}
          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-nav-list">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/about" className="footer-nav-link">About Mayank</Link></li>
              <li><Link to="/services" className="footer-nav-link">All Services</Link></li>
              <li><Link to="/portfolio" className="footer-nav-link">Portfolio & Case Studies</Link></li>
              <li><Link to="/ads" className="footer-nav-link">Ads & Creative Work</Link></li>
              <li><Link to="/blog" className="footer-nav-link">50 Growth Guides & Blog</Link></li>
              <li><Link to="/glossary" className="footer-nav-link">Marketing Glossary</Link></li>
              <li><Link to="/press" className="footer-nav-link">Press & Authority Hub</Link></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <p className="footer-col-title">Interactive Tools</p>
            <ul className="footer-nav-list">
              <li>
                <Link to="/tools/meta-ads-roas-calculator" className="footer-nav-link">
                  ROAS & Profit Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-video-prompt-generator" className="footer-nav-link">
                  AI Video Prompt Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/reel-hook-generator" className="footer-nav-link">
                  Viral Reel Hook Generator
                </Link>
              </li>
              <li style={{ marginTop: '12px' }}>
                <span className="footer-col-title" style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem' }}>Regional Markets</span>
              </li>
              <li><Link to="/locations/delhi" className="footer-nav-link">Delhi NCR</Link></li>
              <li><Link to="/locations/gurugram" className="footer-nav-link">Gurugram (Cyber City)</Link></li>
              <li><Link to="/locations/noida" className="footer-nav-link">Noida</Link></li>
              <li><Link to="/locations/mumbai" className="footer-nav-link">Mumbai (BKC)</Link></li>
              <li><Link to="/locations/bangalore" className="footer-nav-link">Bengaluru</Link></li>
            </ul>
          </div>

          {/* Col 4: Services & Retainers */}
          <div>
            <p className="footer-col-title">Core Services</p>
            <ul className="footer-nav-list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="footer-nav-link">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="footer-nav-link" style={{ color: 'var(--gold)' }}>
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Social & Verification */}
          <div>
            <p className="footer-col-title">Connect</p>
            <ul className="footer-nav-list">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <LinkedinIcon size={16} color="#FFB92E" /> LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <InstagramIcon size={16} color="#FF3D0A" /> Instagram Profile
                </a>
              </li>
              <li>
                <a
                  href={site.github || 'https://github.com/mayanksinghal007'}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <GithubIcon size={16} color="var(--softwhite)" /> GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href={`tel:${(site.phoneTel || site.phone || '').replace(/\s+/g, '')}`}
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Phone size={16} /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}
                >
                  <Mail size={16} /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Mayank Aggarwal. All rights reserved. Based in Delhi, India.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/glossary" style={{ color: 'inherit', padding: '6px 4px', display: 'inline-block' }}>Glossary</Link>
            <Link to="/press" style={{ color: 'inherit', padding: '6px 4px', display: 'inline-block' }}>Press & Citations</Link>
            <Link to="/privacy-policy" style={{ color: 'inherit', padding: '6px 4px', display: 'inline-block' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit', padding: '6px 4px', display: 'inline-block' }}>Terms of Service</Link>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', padding: '6px 4px', display: 'inline-block' }}>RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
