import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Sparkles, Check, Copy, ExternalLink, Bot } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons';
import { useSite } from '../context/SiteContext';

export const GlobalCtaRails = () => {
  const { site, showToast } = useSite();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const phoneRaw = (site?.phoneTel || site?.phone || '+91 9217756033').replace(/\s+/g, '');
  const phoneDisplay = site?.phone || '+91 9217756033';
  const whatsappNumber = site?.whatsapp || '919217756033';
  const whatsappMsg = site?.whatsappMsg || "Hi Mayank, I'm interested in discussing a marketing or AI creative project.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const linkedinUrl = site?.linkedin || 'https://www.linkedin.com/feed/update/urn:li:activity:7511093077722251264/';
  const instagramUrl = site?.instagram || 'https://www.instagram.com/mayankaggarwal_7';
  const githubUrl = site?.github || 'https://github.com/mayanksinghal007';

  const handleOpenAi = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-mayank-ai', { detail: { forceOpen: true } }));
    }
  };

  const handleCallClick = (e) => {
    // Detect if device supports touch dialing or is desktop
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Copy phone number to clipboard for convenience
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(phoneDisplay).then(() => {
        setCopiedPhone(true);
        if (showToast) {
          showToast(`Phone number copied: ${phoneDisplay}`, 'success');
        }
        setTimeout(() => setCopiedPhone(false), 3000);
      }).catch(() => {});
    }

    // On non-touch desktop, prevent unwanted application opening if desired, or let tel: trigger
    if (!isTouch) {
      // Keep tooltip visible showing "Copied!"
      setActiveTooltip('call');
      setTimeout(() => setActiveTooltip(null), 3000);
    }

    // Track consent-compliant CTA click if analytics available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_cta_call', {
        event_category: 'conversion',
        event_label: phoneDisplay,
      });
    }
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_cta_whatsapp', {
        event_category: 'conversion',
        event_label: 'global_rail_whatsapp',
      });
    }
  };

  return (
    <>
      {/* ======================================================================
          DESKTOP LEFT-SIDE VERTICAL QUICK-LINK RAIL
          Contains: LinkedIn, Instagram, GitHub, Ask Mayank AI
          ====================================================================== */}
      <nav
        className="global-rail-left"
        aria-label="Professional and AI quick links"
      >
        <div className="global-rail-track">
          {/* 1. LinkedIn Profile */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('linkedin')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="global-rail-btn"
              aria-label="Mayank Aggarwal on LinkedIn"
              onFocus={() => setActiveTooltip('linkedin')}
              onBlur={() => setActiveTooltip(null)}
            >
              <LinkedinIcon size={19} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'linkedin' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">LinkedIn</span>
              <span className="tooltip-detail">Professional Network</span>
            </div>
          </div>

          {/* 2. Instagram Profile */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('instagram')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="global-rail-btn"
              aria-label="Mayank Aggarwal on Instagram"
              onFocus={() => setActiveTooltip('instagram')}
              onBlur={() => setActiveTooltip(null)}
            >
              <InstagramIcon size={19} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'instagram' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">Instagram</span>
              <span className="tooltip-detail">@mayankaggarwal_7</span>
            </div>
          </div>

          {/* 3. GitHub Profile */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('github')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="global-rail-btn"
              aria-label="Mayank Aggarwal on GitHub"
              onFocus={() => setActiveTooltip('github')}
              onBlur={() => setActiveTooltip(null)}
            >
              <GithubIcon size={19} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'github' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">GitHub</span>
              <span className="tooltip-detail">Code & Open Source</span>
            </div>
          </div>

          {/* Divider */}
          <div className="global-rail-divider" />

          {/* 4. Ask Mayank AI Assistant Entry Point */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('ai')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <button
              type="button"
              onClick={handleOpenAi}
              className="global-rail-btn btn-ai-pulse"
              aria-label="Ask Mayank AI Marketing Assistant"
              data-ai-trigger="true"
              onFocus={() => setActiveTooltip('ai')}
              onBlur={() => setActiveTooltip(null)}
            >
              <Bot size={20} color="#FF7A00" />
              <span className="ai-active-indicator" />
            </button>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'ai' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: 'var(--brand)' }}>Ask Mayank AI</span>
              <span className="tooltip-detail">Live Marketing & Ad Assistant</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================================
          DESKTOP RIGHT-SIDE CONTACT RAIL
          Contains: WhatsApp CTA, Call CTA (with copy-to-clipboard fallback)
          ====================================================================== */}
      <aside
        className="global-rail-right"
        aria-label="Direct contact reachout"
      >
        <div className="global-rail-track">
          {/* 1. WhatsApp CTA */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('whatsapp')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={handleWhatsAppClick}
              className="global-rail-btn btn-whatsapp-rail"
              aria-label="Chat with Mayank on WhatsApp (+91 9217756033)"
              onFocus={() => setActiveTooltip('whatsapp')}
              onBlur={() => setActiveTooltip(null)}
            >
              <MessageCircle size={21} color="#FFFFFF" />
              <span className="whatsapp-online-ring" />
            </a>
            <div
              className={`global-rail-tooltip tooltip-right ${activeTooltip === 'whatsapp' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: '#25D366' }}>WhatsApp Direct</span>
              <span className="tooltip-detail">Replies in &lt;1 hour · Available 24/7</span>
            </div>
          </div>

          {/* 2. Call CTA */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('call')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={`tel:${phoneRaw}`}
              onClick={handleCallClick}
              className="global-rail-btn btn-call-rail"
              aria-label={`Call Mayank Aggarwal at ${phoneDisplay} (Click to copy)`}
              onFocus={() => setActiveTooltip('call')}
              onBlur={() => setActiveTooltip(null)}
            >
              {copiedPhone ? <Check size={20} color="#10B981" /> : <Phone size={19} color="#FFB92E" />}
            </a>
            <div
              className={`global-rail-tooltip tooltip-right ${activeTooltip === 'call' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: copiedPhone ? '#10B981' : '#FFB92E' }}>
                {copiedPhone ? 'Number Copied!' : 'Direct Call'}
              </span>
              <span className="tooltip-detail">
                {copiedPhone ? phoneDisplay : `${phoneDisplay} (Click to copy)`}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================================
          MOBILE & TABLET BOTTOM CONVERSION DOCK (< 768px)
          Compact, non-intrusive, safe-area-compliant conversion bar
          ====================================================================== */}
      <div
        className="global-mobile-dock"
        role="region"
        aria-label="Quick contact and links bar"
      >
        <div className="mobile-dock-inner">
          {/* Ask Mayank AI Action */}
          <button
            type="button"
            onClick={handleOpenAi}
            className="mobile-dock-btn mobile-dock-ai"
            aria-label="Open Ask Mayank AI Assistant"
            data-ai-trigger="true"
          >
            <Bot size={18} color="#FF7A00" />
            <span>Mayank AI</span>
          </button>

          {/* Direct Call Button (With number copy on tap) */}
          <a
            href={`tel:${phoneRaw}`}
            onClick={handleCallClick}
            className="mobile-dock-btn mobile-dock-call"
            aria-label={`Call ${phoneDisplay}`}
          >
            {copiedPhone ? <Check size={18} color="#10B981" /> : <Phone size={18} color="#FFB92E" />}
            <span>{copiedPhone ? 'Copied' : 'Call'}</span>
          </a>

          {/* Primary WhatsApp Direct Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={handleWhatsAppClick}
            className="mobile-dock-btn mobile-dock-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={19} color="#FFFFFF" />
            <span>WhatsApp</span>
          </a>

          {/* Social Quick-Drawer Toggle */}
          <div className="mobile-dock-socials">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mobile-social-icon"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mobile-social-icon"
              aria-label="Instagram Profile"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mobile-social-icon"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
