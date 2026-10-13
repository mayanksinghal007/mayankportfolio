import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Video,
  Mic,
  Palette,
  Film,
  Zap,
} from 'lucide-react';

export const TOOLS_LIST = [
  { name: 'Meta Ads Manager', category: 'Performance Media', badge: 'Core Stack' },
  { name: 'Google Ads', category: 'Search & PPC', badge: 'Growth' },
  { name: 'Runway Gen-3 Alpha', category: 'Generative Video', badge: 'AI Suite' },
  { name: 'Kling AI', category: 'Motion Generation', badge: 'AI Suite' },
  { name: 'ElevenLabs', category: 'Neural Voice Synthesis', badge: 'Audio AI' },
  { name: 'HeyGen', category: 'Video Avatars', badge: 'AI Suite' },
  { name: 'Midjourney v6.1', category: 'Visual Concepting', badge: 'Creative AI' },
  { name: 'Canva Pro', category: 'Production Systems', badge: 'Design' },
];

export const ToolsMarquee = ({ title = 'CORE MARKETING & AI PRODUCTION STACK' }) => {
  // Duplicate array 3 times for seamless infinite loop
  const marqueeItems = [...TOOLS_LIST, ...TOOLS_LIST, ...TOOLS_LIST];

  return (
    <section className="tools-marquee-section" aria-label="Marketing and AI Tools Stack">
      <div className="container" style={{ marginBottom: '14px', textAlign: 'center' }}>
        <span
          className="editorial-eyebrow"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
          }}
        >
          {title}
        </span>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((tool, idx) => (
            <div key={`${tool.name}-${idx}`} className="marquee-card">
              <span className="marquee-badge">{tool.badge}</span>
              <div className="marquee-name">{tool.name}</div>
              <div className="marquee-category">{tool.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
