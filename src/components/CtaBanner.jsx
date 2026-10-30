import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const CtaBanner = ({
  eyebrow = "Let's Collaborate",
  title = "HAVE A VISION FOR YOUR BRAND?",
  subtitle = "Whether it's structuring your Meta Ads campaigns, producing cinematic AI video, or building your social presence—let's work together.",
  primaryLabel = "Discuss Your Project",
  primaryTo = "/contact",
  primaryState = null,
}) => {
  const { site } = useSite();

  return (
    <section className="section-pad" style={{ paddingTop: '50px' }}>
      <div className="container">
        <div className="cta-banner has-corner-brackets">
          <span className="crosshair-corner crosshair-tl" style={{ color: 'rgba(255, 69, 0, 0.4)' }}>+</span>
          <span className="crosshair-corner crosshair-tr" style={{ color: 'rgba(255, 69, 0, 0.4)' }}>+</span>
          <span className="crosshair-corner crosshair-bl" style={{ color: 'rgba(255, 69, 0, 0.4)' }}>+</span>
          <span className="crosshair-corner crosshair-br" style={{ color: 'rgba(255, 69, 0, 0.4)' }}>+</span>
          <div className="cta-banner-content">
            <div className="system-meta-label" style={{ marginBottom: '14px', justifyContent: 'center', borderColor: 'rgba(255, 255, 255, 0.15)', color: 'rgba(255, 253, 249, 0.8)' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 07 // INTAKE & DISCOVERY</span>
            </div>
            <span className="editorial-eyebrow gold" style={{ marginBottom: '16px' }}>
              {eyebrow}
            </span>
            <h2 className="display-title cta-banner-title">{title}</h2>
            <p className="cta-banner-sub">{subtitle}</p>

            <div className="cta-banner-actions">
              <Link to={primaryTo} state={primaryState} className="btn-primary" style={{ padding: '15px 34px', fontSize: '1rem' }}>
                {primaryLabel} <ArrowUpRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-whatsapp"
                style={{ padding: '15px 30px', fontSize: '1rem' }}
              >
                <MessageCircle size={18} /> WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
