import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight, Shield } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons';
import { useSite } from '../context/SiteContext';

export const Footer = () => {
  const { site, services } = useSite();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
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
          </div>

          {/* Col 2: Navigation & Tools */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
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
            <h4 className="footer-col-title">Interactive Tools</h4>
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
            <h4 className="footer-col-title">Core Services</h4>
            <ul className="footer-nav-list">
              {services.slice(0, 5).map((s) => (
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
            <h4 className="footer-col-title">Connect</h4>
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
                  rel="nofollow"
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Phone size={16} /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  rel="nofollow"
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
            <Link to="/glossary" style={{ color: 'inherit' }}>Glossary</Link>
            <Link to="/press" style={{ color: 'inherit' }}>Press & Citations</Link>
            <Link to="/privacy-policy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
