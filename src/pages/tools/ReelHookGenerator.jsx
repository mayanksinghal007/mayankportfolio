import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CtaBanner } from '../../components/CtaBanner';
import {
  Zap,
  Copy,
  Check,
  Flame,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Play,
  Volume2,
  Video,
  Target
} from 'lucide-react';

export const ReelHookGenerator = () => {
  const [niche, setNiche] = useState('d2c');
  const [archetype, setArchetype] = useState('contrarian');
  const [topic, setTopic] = useState('Meta Ads ROAS');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const hookTemplates = useMemo(() => {
    return [
      {
        title: 'The Direct Loss Warning',
        text: `Stop wasting money on ${topic} until you fix this one setting.`,
        sfx: 'Record scratch / Sudden audio mute at 0.8s',
        visual: 'Extreme macro punch-in on face at 1.2s with red alert badge',
        retention: 'Est. 74% at 3s'
      },
      {
        title: 'The Inverted Proof Hook',
        text: `How we generated ₹10 Lakhs with ${topic} without touching custom audiences.`,
        sfx: 'Sub-bass drop + camera shutter click',
        visual: 'Hold phone up to lens displaying verified live revenue dashboard',
        retention: 'Est. 71% at 3s'
      },
      {
        title: 'The Controversial Truth',
        text: `Most agencies are lying to you about ${topic}. Here is what actually works in 2026.`,
        sfx: 'Risotto riser whoosh into sudden silence',
        visual: 'Toss a printed report or notebook onto desk with sharp downward camera angle',
        retention: 'Est. 76% at 3s'
      },
      {
        title: 'The Niche Call-Out',
        text: `If you are running ${topic} in India with under ₹50k monthly budget, do not scroll.`,
        sfx: 'Warning buzzer click or metallic ding',
        visual: 'Point directly into camera lens with kinetic bold subtitle burst',
        retention: 'Est. 68% at 3s'
      },
      {
        title: 'The Framework Teardown',
        text: `I spent 40 hours testing ${topic}. Here is the 3-step cheat code in 45 seconds.`,
        sfx: 'Clock ticking sound effect ramping in pitch',
        visual: 'Numbered finger counter pop-up on screen with rapid jump cuts',
        retention: 'Est. 73% at 3s'
      }
    ];
  }, [topic]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const faqs = [
    {
      q: 'Why are the first 3 seconds of a Reel or Short so critical?',
      a: 'Instagram and TikTok ranking algorithms measure viewer retention at the 3-second mark. If viewer drop-off exceeds 40%, the video is algorithmically throttled and rarely distributed to non-followers on Explore or Reels tabs.'
    },
    {
      q: 'What is a visual pattern interrupt in short-form video?',
      a: 'A visual pattern interrupt is an unexpected physical movement, rapid punch-in zoom, or sudden color transition occurring within the first 45 frames that disrupts passive thumb-scrolling behavior.'
    },
    {
      q: 'Should on-screen captions match the spoken hook word for word?',
      a: 'Yes. Dual-coding research demonstrates that when viewers process spoken voiceover and bold on-screen captions simultaneously, message comprehension and 3-second watch completion increase by over 60%.'
    },
    {
      q: 'How many creative hook variations should you test per ad concept?',
      a: 'We recommend testing 3 to 5 distinct 3-second opening hook variations with the same core body content to identify the winning thumb-stop angle with lowest cost per impression.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="editorial-tool-page">
      <SeoHead
        title="Viral Short-Form Reel Hook Generator for 2026"
        description="Free viral video hook generator for Instagram Reels, TikTok, and YouTube Shorts. Generate high-retention 3-second hooks with audio and visual cues."
        canonicalPath="/tools/reel-hook-generator"
        ogType="website"
        jsonLd={[
          faqSchema,
          {
            '@type': 'WebApplication',
            name: 'Viral Short-Form Reel Hook Generator',
            applicationCategory: 'SocialMediaApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Generate high-retention 3-second opening video hooks for Instagram Reels, YouTube Shorts, and TikTok.',
          },
        ]}
      />

      {/* Hero Header */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Interactive Tools', path: '/tools/reel-hook-generator' },
              { name: 'Reel Hook Generator', path: '/tools/reel-hook-generator' }
            ]}
          />
          <div style={{ maxWidth: '840px' }}>
            <span className="editorial-eyebrow">Algorithmic Retention Instrument</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              VIRAL REEL & SHORT-FORM <span className="brand-span">HOOK GENERATOR.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '740px' }}>
              Generate high-converting 3-second hooks engineered to stop the infinite scroll and hold viewer retention past 65% on Instagram Reels, Shorts, and TikTok.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Controls & Results */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          {/* Controls Bar */}
          <div
            className="tool-panel-card"
            style={{ marginBottom: '40px', padding: '32px' }}
          >
            <div className="tool-panel-header" style={{ marginBottom: '20px' }}>
              <div className="tool-panel-title">
                <Zap size={22} color="var(--brand)" />
                <span>Hook Engine Parameters</span>
              </div>
              <span className="badge-pill" style={{ fontSize: '0.74rem' }}>Retention Model</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px'
              }}
            >
              <div>
                <label htmlFor="topicInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Target Topic or Core Offer
                </label>
                <input
                  id="topicInput"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Meta Ads ROAS, Shopify CRO, Runway AI"
                  className="tool-number-input"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>

              <div>
                <label htmlFor="nicheSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Industry Niche
                </label>
                <select
                  id="nicheSelect"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="tool-select"
                >
                  <option value="d2c">D2C E-Commerce & Retail</option>
                  <option value="b2b">B2B SaaS & Professional Services</option>
                  <option value="agency">Agency & Freelance Consulting</option>
                  <option value="personal">Personal Branding & Creators</option>
                </select>
              </div>

              <div>
                <label htmlFor="archetypeSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Psychological Trigger
                </label>
                <select
                  id="archetypeSelect"
                  value={archetype}
                  onChange={(e) => setArchetype(e.target.value)}
                  className="tool-select"
                >
                  <option value="contrarian">Contrarian Shock & Inversion</option>
                  <option value="warning">Loss Aversion & Warning</option>
                  <option value="secret">Exclusivity & Gatekept Secret</option>
                  <option value="speed">Rapid Action & Time Compression</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Hook Variations List */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={24} color="var(--brand)" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--charcoal)', margin: 0 }}>
                  High-Retention Hook Variations
                </h2>
              </div>
              <span className="badge-pill" style={{ fontSize: '0.74rem' }}>5 Variations</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hookTemplates.map((item, idx) => (
                <div key={idx} className="tool-hook-card">
                  <div className="tool-hook-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand)',
                          color: 'var(--softwhite)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--mutedtext)'
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#059669',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid rgba(16, 185, 129, 0.25)'
                        }}
                      >
                        {item.retention}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.text, idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: copiedIndex === idx ? '#10B981' : 'var(--softwhite)',
                          color: copiedIndex === idx ? '#fff' : 'var(--charcoal)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {copiedIndex === idx ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="tool-hook-text">
                    "{item.text}"
                  </p>

                  <div className="tool-hook-cues">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <Video size={15} color="var(--brand)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ color: 'var(--charcoal)' }}>Visual Cut: </strong>
                        <span>{item.visual}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <Volume2 size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ color: 'var(--charcoal)' }}>Audio SFX: </strong>
                        <span>{item.sfx}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Creative Callout Banner */}
          <div
            style={{
              backgroundColor: 'var(--charcoal)',
              color: 'var(--softwhite)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span className="editorial-eyebrow gold" style={{ marginBottom: '10px' }}>
                Creative Strategy Retainers
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--softwhite)',
                  marginBottom: '10px'
                }}
              >
                Want a Custom High-Converting Video Ad Strategy?
              </h2>
              <p style={{ color: 'rgba(255, 253, 249, 0.75)', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                Let's craft high-converting video ad angles, scripted UGC hooks, and cinematic generative AI visuals tailored for your e-commerce brand or B2B offer.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn-primary"
              style={{ padding: '14px 26px', fontSize: '0.92rem', whiteSpace: 'nowrap' }}
            >
              Book Creative Consultation <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Creative Science</span>
            <h2 className="display-title section-title">SHORT-FORM VIDEO RETENTION FAQS.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(i)}>
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        eyebrow="Direct Response Creative"
        title="STOP BURNING AD BUDGET ON FATIGUED CREATIVES"
        subtitle="Let's engineer 10+ fresh video ad angles, viral short-form hooks, and AI-scripted assets that scale spend without inflating CPA."
        primaryLabel="Schedule Creative Strategy Call"
        primaryTo="/contact"
      />
    </div>
  );
};
