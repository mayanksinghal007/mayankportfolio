import React from 'react';
import { Play, TrendingUp, Sparkles, Video, Volume2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const FannedCardsDeck = ({ onOpenShowreel, showreelAsset }) => {
  const cards = [
    {
      id: 1,
      className: 'fanned-card fanned-card-1',
      badge: 'SYSTEM 01 // META ADS',
      title: 'Performance Paid Social',
      stat: '4.2x ROAS',
      metricLabel: 'Scale-Tested',
      desc: 'High-converting dynamic creative testing, audience segmentation & ROAS scaling.',
      icon: TrendingUp,
      accent: '#FF4500',
      pill: 'Meta Verified',
    },
    {
      id: 2,
      className: 'fanned-card fanned-card-2',
      badge: 'SYSTEM 02 // AI VIDEO',
      title: 'Cinematic Gen-3 Video',
      stat: 'Kling + Runway',
      metricLabel: 'Hyperrealistic',
      desc: 'Prompt-engineered motion graphics, direct-response UGC, and cinematic world-building.',
      icon: Video,
      accent: '#FFB800',
      pill: 'Gen-3 Alpha',
    },
    {
      id: 3,
      className: 'fanned-card fanned-card-3',
      badge: 'SYSTEM 03 // AUDIO SYNTHESIS',
      title: 'Neural ElevenLabs Audio',
      stat: 'High-Retention',
      metricLabel: 'Studio Voiceover',
      desc: 'Precision vocal tone, sound design, rhythmic audio hooks, and Foley integration.',
      icon: Volume2,
      accent: '#FF4500',
      pill: 'Neural AI',
    },
    {
      id: 4,
      className: 'fanned-card fanned-card-4',
      badge: 'SYSTEM 04 // RETENTION HOOKS',
      title: 'High-CTR Visual Engine',
      stat: '3.4% Avg CTR',
      metricLabel: 'Top 1% Percentile',
      desc: '3-second scroll-stopping psychology engineered to maximize retention & conversions.',
      icon: Sparkles,
      accent: '#FF7A45',
      pill: 'A/B Proven',
    },
  ];

  const handleCardClick = () => {
    if (onOpenShowreel) {
      onOpenShowreel({
        title: showreelAsset?.title || 'Mayank Aggarwal — Creative & AI Showreel',
        overview:
          showreelAsset?.subtitle ||
          'A high-octane montage of generative AI video, 3D typography, cinematic motion grading, and Meta ad campaign performance highlights.',
        image: showreelAsset?.url || '/images/hero-showreel.webp',
        videoUrl: showreelAsset?.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hasVideoDemo: true,
        tags: ['Runway Gen-3', 'ElevenLabs', 'Meta Ads', 'Editorial Cut'],
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Upper System Status Monospace Pill */}
      <div style={{ alignSelf: 'flex-start', marginBottom: '14px' }}>
        <div className="system-meta-label">
          <span className="system-status-dot" />
          <span>PORTFOLIO_SYSTEM // V1.0 ACTIVE</span>
        </div>
      </div>

      {/* Fanned Overlapping Cards Deck */}
      <div className="fanned-deck-container has-corner-brackets" style={{ width: '100%', minHeight: '460px' }}>
        <span className="crosshair-corner crosshair-tl">+</span>
        <span className="crosshair-corner crosshair-tr">+</span>
        <span className="crosshair-corner crosshair-bl">+</span>
        <span className="crosshair-corner crosshair-br">+</span>

        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className={card.className}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
              aria-label={`View ${card.title} showreel`}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(255, 253, 249, 0.88)',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.badge}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: card.accent,
                    fontWeight: 600,
                  }}
                >
                  {card.pill}
                </span>
              </div>

              {/* Title & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.accent,
                    flexShrink: 0,
                  }}
                >
                  <IconComponent size={18} />
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#FFFDF9',
                      lineHeight: 1.15,
                    }}
                  >
                    {card.title}
                  </h2>
                </div>
              </div>

              {/* Metric Highlight */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  margin: '12px 0 10px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: card.accent,
                    lineHeight: 1,
                  }}
                >
                  {card.stat}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(255, 253, 249, 0.88)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {card.metricLabel}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.45,
                  color: 'rgba(255, 253, 249, 0.92)',
                  marginBottom: '14px',
                }}
              >
                {card.desc}
              </p>

              {/* Play Showreel Callout inside Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <Play size={12} fill="#FFF" style={{ marginLeft: '1px' }} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: '#FFFDF9',
                      letterSpacing: '0.04em',
                    }}
                  >
                    LAUNCH SHOWREEL
                  </span>
                </div>
                <ArrowUpRight size={14} color="rgba(255, 253, 249, 0.9)" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow Pipeline Status Bar */}
      <div className="workflow-pipeline-bar" style={{ marginTop: '24px' }}>
        <span className="workflow-pulse-dot" />
        <span>● LIVE PIPELINE: Meta Ads → AI Video → ElevenLabs Voice → Conversion</span>
      </div>
    </div>
  );
};

