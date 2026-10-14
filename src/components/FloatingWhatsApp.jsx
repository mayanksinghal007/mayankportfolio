import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const FloatingWhatsApp = () => {
  const { site } = useSite();
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMsg || 'Hi Mayank, I would like to discuss a project.'
  )}`;

  return (
    <div
      className="floating-whatsapp-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 990,
      }}
    >
      {/* Hover Tooltip */}
      <div
        className={`floating-whatsapp-tooltip ${isHovered ? 'visible' : ''}`}
        role="tooltip"
        id="whatsapp-tooltip"
      >
        <span>Chat with Mayank on WhatsApp</span>
        <span className="tooltip-sub">Usually replies in &lt;1 hour</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Direct WhatsApp Chat with Mayank Aggarwal"
        aria-describedby="whatsapp-tooltip"
        className="floating-whatsapp-btn"
      >
        <MessageCircle size={26} color="#FFFFFF" />
        {/* Pulsing online indicator */}
        <span className="whatsapp-pulse-dot" />
      </a>
    </div>
  );
};
