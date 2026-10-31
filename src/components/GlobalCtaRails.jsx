import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Bot } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from './SocialIcons';
import { useSite } from '../context/SiteContext';

export const GlobalCtaRails = () => {
  const { site, showToast } = useSite();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if hero intro already played in this session
    let skipDelay = false;
    try {
      skipDelay = Boolean(sessionStorage.getItem('hero_intro_played'));
    } catch (e) {}

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, skipDelay ? 150 : 2800);

    return () => clearTimeout(timer);
  }, []);

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

  const handleCallClick = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(phoneDisplay).then(() => {
        setCopiedPhone(true);
        if (showToast) {
          showToast(`Phone number copied: ${phoneDisplay}`, 'success');
        }
        setTimeout(() => setCopiedPhone(false), 3000);
      }).catch(() => {});
    }

    setActiveTooltip('call');
    setTimeout(() => setActiveTooltip(null), 3000);

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
          Fades in at ~3.0s, frosted-dark pill, 40px round monochrome icons
          ====================================================================== */}
      <nav
        className={`global-rail-left ${isVisible ? 'rail-visible' : ''}`}
        aria-label="Professional and social links"
      >
        <div className="global-rail-track">
          {/* 1. LinkedIn */}
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
              <LinkedinIcon size={18} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'linkedin' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">LinkedIn</span>
              <span className="tooltip-detail">Professional Network</span>
            </div>
          </div>

          {/* 2. Instagram */}
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
              <InstagramIcon size={18} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'instagram' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">Instagram</span>
              <span className="tooltip-detail">@mayankaggarwal_7</span>
            </div>
          </div>

          {/* 3. GitHub */}
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
              <GithubIcon size={18} />
            </a>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'github' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title">GitHub</span>
              <span className="tooltip-detail">Code & Workflows</span>
            </div>
          </div>

          <div className="global-rail-divider" />

          {/* 4. Ask Mayank AI */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('ai')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <button
              type="button"
              onClick={handleOpenAi}
              className="global-rail-btn btn-ai-pulse"
              aria-label="Ask Mayank AI Agent"
              data-ai-trigger="true"
              onFocus={() => setActiveTooltip('ai')}
              onBlur={() => setActiveTooltip(null)}
            >
              <Bot size={19} color="#FF7A00" />
              <span className="ai-active-indicator" />
            </button>
            <div
              className={`global-rail-tooltip tooltip-left ${activeTooltip === 'ai' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: '#FF7A00' }}>Ask Mayank AI</span>
              <span className="tooltip-detail">AI Portfolio Assistant</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================================
          DESKTOP RIGHT-SIDE VERTICAL CONVERSION RAIL
          Contains: Direct WhatsApp, Direct Call
          Fades in at ~3.0s, frosted-dark pill, 40px round monochrome icons
          ====================================================================== */}
      <aside
        className={`global-rail-right ${isVisible ? 'rail-visible' : ''}`}
        aria-label="Direct contact channels"
      >
        <div className="global-rail-track">
          {/* 1. Direct WhatsApp Button */}
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
              className="global-rail-btn btn-wa-pulse"
              aria-label="Chat directly on WhatsApp"
              onFocus={() => setActiveTooltip('whatsapp')}
              onBlur={() => setActiveTooltip(null)}
            >
              <MessageCircle size={19} color="#25D366" />
              <span className="wa-active-indicator" />
            </a>
            <div
              className={`global-rail-tooltip tooltip-right ${activeTooltip === 'whatsapp' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: '#25D366' }}>WhatsApp Chat</span>
              <span className="tooltip-detail">Instant 1-on-1 Reply</span>
            </div>
          </div>

          <div className="global-rail-divider" />

          {/* 2. Direct Call / Copy Number */}
          <div
            className="global-rail-item"
            onMouseEnter={() => setActiveTooltip('call')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a
              href={`tel:${phoneRaw}`}
              onClick={handleCallClick}
              className="global-rail-btn btn-call-pulse"
              aria-label={`Call Mayank Aggarwal directly at ${phoneDisplay}`}
              onFocus={() => setActiveTooltip('call')}
              onBlur={() => setActiveTooltip(null)}
            >
              <Phone size={18} color="#FFB92E" />
            </a>
            <div
              className={`global-rail-tooltip tooltip-right ${activeTooltip === 'call' ? 'visible' : ''}`}
              role="tooltip"
            >
              <span className="tooltip-title" style={{ color: copiedPhone ? '#10B981' : '#FFB92E' }}>
                {copiedPhone ? 'Copied to Clipboard!' : 'Direct Call'}
              </span>
              <span className="tooltip-detail">
                {copiedPhone ? phoneDisplay : `${phoneDisplay} (Tap to copy)`}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================================
          MOBILE COLLAPSIBLE WHATSAPP FLOATING BUTTON (< 820px)
          Single, sleek 50px WhatsApp floating FAB in bottom-right corner.
          Leaves the entire screen clear, zero clutter, instant tap to chat.
          ====================================================================== */}
      <div className={`global-mobile-wa-fab ${isVisible ? 'fab-visible' : ''}`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={handleWhatsAppClick}
          className="mobile-wa-btn"
          aria-label="Direct Chat on WhatsApp with Mayank Aggarwal"
        >
          <MessageCircle size={24} color="#FFFFFF" />
          <span className="mobile-wa-ping" />
        </a>
      </div>
    </>
  );
};
