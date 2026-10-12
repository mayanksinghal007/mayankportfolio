import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const CtaBanner = ({
  eyebrow = "Let's Collaborate",
  title = "HAVE A VISION FOR YOUR BRAND?",
  subtitle = "Whether it's scaling your Meta Ads ROAS, producing cinematic AI video, or taking over your social channels—let's build something exceptional together.",
  primaryLabel = "Discuss Your Project",
  primaryTo = "/contact",
}) => {
  const { site } = useSite();

  return (
    <section className="section-pad" style={{ paddingTop: '50px' }}>
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <span className="editorial-eyebrow gold" style={{ marginBottom: '16px' }}>
              {eyebrow}
            </span>
            <h2 className="display-title cta-banner-title">{title}</h2>
            <p className="cta-banner-sub">{subtitle}</p>

            <div className="cta-banner-actions">
              <Link to={primaryTo} className="btn-primary" style={{ padding: '15px 34px', fontSize: '1rem' }}>
                {primaryLabel} <ArrowUpRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
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
