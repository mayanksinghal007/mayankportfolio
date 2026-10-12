import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight, Shield } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';
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
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '9px 18px', fontSize: '0.82rem' }}
              >
                <MessageCircle size={15} /> WhatsApp Direct
              </a>
              <a
                href={`mailto:${site.email}?subject=Project%20Inquiry%20%E2%80%94%20Mayank%20Aggarwal`}
                className="btn-secondary"
                style={{ padding: '9px 18px', fontSize: '0.82rem', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--softwhite)' }}
              >
                <Mail size={15} /> Email Me
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/about" className="footer-nav-link">About Mayank</Link></li>
              <li><Link to="/services" className="footer-nav-link">Services</Link></li>
              <li><Link to="/portfolio" className="footer-nav-link">Portfolio & Case Studies</Link></li>
              <li><Link to="/ads" className="footer-nav-link">Ads & Creative Work</Link></li>
              <li><Link to="/process" className="footer-nav-link">Working Process</Link></li>
              <li><Link to="/contact" className="footer-nav-link">Start a Project</Link></li>
            </ul>
          </div>

          {/* Col 3: Specialized Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
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
                  View All 7 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Social & Verification */}
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <InstagramIcon size={16} color="#FF3D0A" /> Instagram (@mayankaggarwal_7)
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
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
              <li style={{ marginTop: '8px' }}>
                <Link to="/admin" className="footer-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                  <Shield size={14} /> Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Mayank Aggarwal. All rights reserved. Based in Delhi, India.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy-policy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
            <Link to="/admin" style={{ color: 'inherit' }}>Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
