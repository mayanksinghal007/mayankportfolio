import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  TrendingUp,
  Share2,
  Video,
  Mic,
  Palette,
  Film,
  Mail,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { CtaBanner } from '../components/CtaBanner';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GiantGhostHeading } from '../components/GiantGhostHeading';
import { RulerDivider } from '../components/RulerDivider';

const serviceIcons = {
  'performance-marketing': TrendingUp,
  'social-media-management': Share2,
  'ai-video-creation': Video,
  'ai-voiceover': Mic,
  'ai-creative-design': Palette,
  'content-reel-strategy': Film,
  'email-marketing': Mail,
};

import { getProfessionalServiceSchema, getBreadcrumbSchema, getFaqSchema } from '../utils/seoSchemas';

export const Services = () => {
  const { services } = useSite();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const generalFaqs = [
    {
      q: 'Can I combine multiple services into a unified monthly retainer?',
      a: 'Absolutely. Many clients bundle Meta Performance Marketing with AI Video creative production and Social Media Management for a seamless end-to-end growth engine.',
    },
    {
      q: 'How do you work with international clients across different timezones?',
      a: 'I collaborate seamlessly with brands, agencies, and founders across the United States (EST/PST), United Kingdom (GMT), Canada, UAE (GST), and globally. We operate asynchronously via Slack, Notion, and Loom, with scheduled bi-weekly strategy calls via Google Meet.',
    },
    {
      q: 'How are campaign deliverables tracked and reported?',
      a: 'You receive live dashboard links (Looker Studio / Meta Ads Manager) along with weekly video updates walking through key metrics, learnings, and next-phase tests.',
    },
    {
      q: 'What is the onboarding process once we agree to start?',
      a: 'After a discovery alignment call and proposal sign-off, we conduct a 48-hour onboarding audit: getting account access, finalizing brand briefs, and scheduling your first 30 days of deliverables.',
    },
  ];

  const servicesSchemas = [
    getProfessionalServiceSchema(),
    getBreadcrumbSchema([{ name: 'Services', path: '/services' }]),
    getFaqSchema(generalFaqs),
  ].filter(Boolean);

  return (
    <>
      <SeoHead
        title="Performance Marketing & AI Creative Services | Mayank Aggarwal"
        description="Explore full-stack performance marketing, Meta Ads scaling, generative AI video commercials, and lifecycle email marketing for high-growth global brands."
        keywords={[
          'Performance Marketing Services',
          'Meta Ads Agency',
          'Generative AI Video Production',
          'Direct Response UGC Ads',
          'Instagram Ads Management',
          'Email Retention Marketing',
          'Ecommerce Growth Services'
        ]}
        canonicalPath="/services"
        jsonLd={servicesSchemas}
      />

      {/* SERVICES HEADER */}
      <section className="page-hero-pad giant-ghost-container">
        <GiantGhostHeading text="CAPABILITIES" offset="-4%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
          <div style={{ maxWidth: '820px' }}>
            <div className="system-meta-label" style={{ marginBottom: '14px' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 03 // FULL-STACK CAPABILITIES</span>
            </div>
            <span className="editorial-eyebrow">Full-Stack Offerings</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              SERVICES ENGINEERED FOR{' '}
              <span className="brand-span">MEASURABLE GROWTH.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '720px' }}>
              From high-ROI Meta Ads infrastructure to cinematic generative AI video and viral reel scripting—choose a standalone service or combine them for full-stack brand acceleration.
            </p>
          </div>
        </div>
      </section>

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 03 // SPECIALIZED SERVICES ARCHITECTURE" />

      {/* ALL 7 SERVICES GRID */}
      <section className="section-pad" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="services-grid">
            {services.map((s) => {
              const IconComponent = serviceIcons[s.slug] || Sparkles;

              return (
                <div key={s.slug} className="service-card card-awwwards-lift has-corner-brackets" id={s.slug} data-cursor="VIEW">
                  <span className="crosshair-corner crosshair-tl">+</span>
                  <span className="crosshair-corner crosshair-tr">+</span>
                  <span className="crosshair-corner crosshair-bl">+</span>
                  <span className="crosshair-corner crosshair-br">+</span>
                  <div>
                    <div className="service-card-top">
                      <span className="service-num">{s.num}</span>
                      <div className="service-icon-box">
                        <IconComponent size={24} />
                      </div>
                    </div>

                    <h2 className="service-name">{s.name}</h2>
                    <p className="service-intro">{s.intro}</p>

                    {/* Highlights / Inclusions */}
                    <div style={{ marginBottom: '24px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--brand)',
                          display: 'block',
                          marginBottom: '10px',
                        }}
                      >
                        Core Deliverables:
                      </span>
                      <ul className="service-includes-list" style={{ marginBottom: '16px' }}>
                        {s.includes.slice(0, 4).map((inc, i) => (
                          <li key={i} className="service-include-item">
                            <span className="service-include-bullet" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      {s.includes.length > 4 && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontStyle: 'italic' }}>
                          + {s.includes.length - 4} more specialized inclusions
                        </span>
                      )}
                    </div>

                    {/* Metrics Banner if available */}
                    {s.metrics && (
                      <div
                        style={{
                          backgroundColor: 'var(--cream)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '24px',
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--brand)' }}>
                            {s.metrics.stat1}
                          </div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mutedtext)' }}>
                            {s.metrics.label1}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                            {s.metrics.stat2}
                          </div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mutedtext)' }}>
                            {s.metrics.label2}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="btn-dark"
                      style={{ flexGrow: 1, padding: '10px 18px', fontSize: '0.82rem' }}
                    >
                      Deep Dive & Process <ArrowUpRight size={14} />
                    </Link>
                    <Link
                      to="/contact"
                      state={{ service: s.name }}
                      className="btn-secondary"
                      style={{ padding: '10px 16px', fontSize: '0.82rem' }}
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE SUITABILITY SUMMARY */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="editorial-eyebrow">Tailored Solutions</span>
            <h2 className="display-title section-title">WHICH SERVICE IS RIGHT FOR YOU?</h2>
            <p className="section-desc">
              Whether you are an established e-commerce store or a growing startup, here is where we typically start.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--brand)', marginBottom: '12px' }}>
                For D2C & E-Commerce
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Need more online purchases, lower CPA, and fresh ad creative that doesn't fatigue in 5 days.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FF3D0A" /> Meta Performance Marketing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FF3D0A" /> AI Video Product Ads
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FF3D0A" /> Emotive ElevenLabs Voiceovers
                </li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '12px' }}>
                For Founders & Creators
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Want to build authority, scale organic followers, and transform viewers into high-ticket clients.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FFB92E" /> Social Media Management
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FFB92E" /> Content & Viral Reel Strategy
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#FFB92E" /> Creative Branding Visuals
                </li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '12px' }}>
                For B2B & Local Services
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Require consistent, qualified inbound lead flow and high-ranking search authority on Google.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#191919" /> Lead Gen Meta Ad Funnels
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#191919" /> SEO & High-Intent Articles
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#191919" /> Backlink Building Campaigns
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="section-pad">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Common Questions</span>
            <h2 className="display-title section-title">FREQUENTLY ASKED QUESTIONS.</h2>
          </div>

          <div className="faq-list">
            {generalFaqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(i)}>
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <CtaBanner
        eyebrow="Custom Retainer Available"
        title="NEED A TAILORED MARKETING PACKAGE?"
        subtitle="Tell me your current revenue goals and bottlenecks. I will recommend the exact services that will drive the highest impact."
      />
    </>
  );
};
