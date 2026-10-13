import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Users,
  Play,
  Volume2,
  HelpCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { MediaModal } from '../components/MediaModal';
import { CtaBanner } from '../components/CtaBanner';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

import { getServiceSchema, getBreadcrumbSchema, getFaqSchema } from '../utils/seoSchemas';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const { services, site } = useSite();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Audio player state for ai-voiceover
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenMedia = (media) => {
    setActiveMedia(media);
    setIsModalOpen(true);
  };

  const serviceSchemas = [
    getServiceSchema(service),
    getBreadcrumbSchema([
      { name: 'Services', path: '/services' },
      { name: service.name, path: `/services/${service.slug}` },
    ]),
    getFaqSchema(service.faqs),
  ].filter(Boolean);

  return (
    <>
      <SeoHead
        title={`${service.name} Services | Mayank Aggarwal`}
        description={service.intro || service.overview}
        canonicalPath={`/services/${service.slug}`}
        jsonLd={serviceSchemas}
      />

      {/* SERVICE HEADER */}
      <section className="section-pad" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: service.name, path: `/services/${service.slug}` },
            ]}
          />

          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--brand)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Service {service.num}
              </span>
              <span className="editorial-eyebrow">Comprehensive Practice</span>
            </div>

            <h1 className="hero-h1 display-hero" style={{ marginTop: '12px' }}>
              {service.headline}
            </h1>
            <p className="hero-lead" style={{ maxWidth: '780px' }}>
              {service.intro}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px' }}>
              <Link
                to={`/contact?service=${encodeURIComponent(service.name)}`}
                className="btn-primary"
              >
                Inquire About This Service <ArrowUpRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Mayank, I'm interested in your ${service.name} service.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AEO DIRECT ANSWER & E-E-A-T ENTITY DEFINITION */}
      <section className="section-pad" style={{ paddingTop: '0px', paddingBottom: '30px' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--peach)',
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid var(--brand)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>
                Direct Summary / Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontFamily: 'var(--font-mono)' }}>
                Last updated: {service.lastUpdated || 'October 2026'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--charcoal)', marginBottom: '10px', textTransform: 'none' }}>
              {service.aeoQuestion || `What does a ${service.name} specialist do?`}
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--charcoal)', marginBottom: '14px' }}>
              {service.aeoAnswer || service.intro}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem', color: 'var(--mutedtext)', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px' }}>
              <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>Strategy & Execution:</span>
              <span>Mayank Aggarwal · Digital Marketing & AI Specialist (Delhi, India) · 1 Year Hands-on Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW & INCLUSIONS BREAKDOWN */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px' }} className="hero-grid">
            {/* Left: Detailed Overview */}
            <div>
              <span className="editorial-eyebrow">Service Scope</span>
              <h2 className="display-title" style={{ fontSize: '2.4rem', marginTop: '12px', marginBottom: '20px' }}>
                DETAILED OVERVIEW.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--mutedtext)', lineHeight: 1.8, marginBottom: '28px' }}>
                {service.overview}
              </p>

              {/* Who It's Suitable For */}
              <div
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Users size={20} color="#FF3D0A" />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--charcoal)' }}>
                    Ideal Fit For:
                  </h3>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.suitable.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--charcoal)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand)', marginTop: '8px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: What's Included Checklist */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 32px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span className="editorial-eyebrow" style={{ marginBottom: '8px' }}>
                  Deliverables Checklist
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', marginBottom: '20px' }}>
                  WHAT'S INCLUDED:
                </h3>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {service.includes.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <CheckCircle2 size={18} color="#FF3D0A" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.5 }}>
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Key Metric Pill if present */}
                {service.metrics && (
                  <div
                    style={{
                      marginTop: '32px',
                      paddingTop: '24px',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brand)', lineHeight: 1 }}>
                        {service.metrics.stat1}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mutedtext)', marginTop: '4px' }}>
                        {service.metrics.label1}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', lineHeight: 1 }}>
                        {service.metrics.stat2}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mutedtext)', marginTop: '4px' }}>
                        {service.metrics.label2}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED MEDIA SHOWCASE SECTION */}
      {service.mediaType && (
        <section className="section-pad">
          <div className="container">
            <div className="section-head center">
              <span className="editorial-eyebrow">Interactive Demonstration</span>
              <h2 className="display-title section-title">SAMPLE WORK & OUTPUTS.</h2>
            </div>

            {service.mediaType === 'video' ? (
              <div
                style={{
                  maxWidth: '900px',
                  margin: '0 auto',
                  backgroundColor: 'var(--charcoal)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  color: '#fff',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80"
                    alt="AI Video Sample"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <button
                      onClick={() =>
                        handleOpenMedia({
                          title: 'AI Commercial & UGC Video Showcase',
                          overview: 'Sample cut generated with Runway Gen-3 Alpha, Kling AI, and color-graded in DaVinci Resolve.',
                          image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
                          hasVideoDemo: true,
                        })
                      }
                      className="hero-media-play"
                      style={{ width: '64px', height: '64px' }}
                    >
                      <Play size={28} style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                      Generative Commercial Production
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                      Prompt engineering, seed consistency, cinematic lighting, and 4K upscaling.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleOpenMedia({
                        title: 'AI Commercial & UGC Video Showcase',
                        overview: 'Sample cut generated with Runway Gen-3 Alpha, Kling AI, and color-graded in DaVinci Resolve.',
                        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
                        hasVideoDemo: true,
                      })
                    }
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                  >
                    Preview Video Reel <Play size={14} />
                  </button>
                </div>
              </div>
            ) : service.mediaType === 'audio' ? (
              <div
                style={{
                  maxWidth: '820px',
                  margin: '0 auto',
                  backgroundColor: 'var(--charcoal)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  color: '#fff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isPlayingAudio ? <Volume2 size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
                  </button>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                        Commercial AI Voiceover Master (ElevenLabs)
                      </span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.82rem' }}>
                        {isPlayingAudio ? 'Playing Waveform' : 'Ready to Audition'}
                      </span>
                    </div>
                    {/* Animated Waveform */}
                    <div className="audio-waveform-bars" style={{ height: '36px' }}>
                      {[12, 28, 16, 32, 24, 18, 30, 26, 14, 32, 22, 28, 16, 24, 32, 20, 26, 14, 30, 18].map(
                        (h, i) => (
                          <div
                            key={i}
                            className={`waveform-bar ${isPlayingAudio ? 'active' : ''}`}
                            style={{
                              height: isPlayingAudio ? `${Math.max(8, (h * ((i % 5) + 1)) % 36)}px` : `${h}px`,
                              backgroundColor: isPlayingAudio ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--purewhite)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--brand)' }}>
                    24-48h
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--charcoal)', marginTop: '4px' }}>
                    Turnaround Standard
                  </div>
                  <p style={{ color: 'var(--mutedtext)', fontSize: '0.85rem', marginTop: '8px' }}>
                    Initial campaign architecture and creative assets delivered within 24–48 hours.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--purewhite)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--charcoal)' }}>
                    Weekly
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--charcoal)', marginTop: '4px' }}>
                    A/B Testing & Refresh
                  </div>
                  <p style={{ color: 'var(--mutedtext)', fontSize: '0.85rem', marginTop: '8px' }}>
                    Continuous creative iteration to combat audience fatigue and refine messaging.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--purewhite)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)' }}>
                    Direct
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--charcoal)', marginTop: '4px' }}>
                    1-on-1 Communication
                  </div>
                  <p style={{ color: 'var(--mutedtext)', fontSize: '0.85rem', marginTop: '8px' }}>
                    Dedicated personal attention with rapid response times and transparent reporting.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4-STEP WORKING PROCESS FOR THIS SERVICE */}
      <section className="section-pad" style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)' }}>
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow gold">Execution Roadmap</span>
            <h2 className="display-title section-title" style={{ color: 'var(--softwhite)' }}>
              HOW WE EXECUTE THIS SERVICE.
            </h2>
          </div>

          <div className="process-grid">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="process-card"
                style={{
                  backgroundColor: 'var(--charcoal-card)',
                  borderColor: 'var(--charcoal-border)',
                  color: 'var(--softwhite)',
                }}
              >
                <div>
                  <div className="process-step-num" style={{ color: 'var(--brand)' }}>
                    {p.step}
                  </div>
                  <h3 className="process-card-title" style={{ color: 'var(--softwhite)' }}>
                    {p.title}
                  </h3>
                  <p className="process-card-desc" style={{ color: 'rgba(255, 253, 249, 0.75)' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      {service.comparisonTable && service.comparisonTable.length > 0 && (
        <section className="section-pad" style={{ backgroundColor: 'var(--purewhite)' }}>
          <div className="container container-narrow">
            <div className="section-head center">
              <span className="editorial-eyebrow">Agile Specialist vs Alternatives</span>
              <h2 className="display-title section-title">WHY CHOOSE AN AGILE SPECIALIST?</h2>
              <p className="section-desc">
                How working directly with Mayank compares to hiring a traditional agency or onboarding a full-time in-house employee.
              </p>
            </div>

            <div className="table-responsive" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)' }}>
                    <th style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Comparison Factor</th>
                    <th style={{ padding: '16px 20px', backgroundColor: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>Mayank (Agile Specialist)</th>
                    <th style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Traditional Agency</th>
                    <th style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase' }}>In-House Hire</th>
                  </tr>
                </thead>
                <tbody>
                  {service.comparisonTable.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: idx % 2 === 0 ? 'var(--purewhite)' : 'var(--cream-subtle)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--charcoal)' }}>{row.factor}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--brand)', backgroundColor: 'rgba(255, 74, 28, 0.04)' }}>{row.mayank}</td>
                      <td style={{ padding: '14px 20px', color: 'var(--mutedtext)' }}>{row.agency}</td>
                      <td style={{ padding: '14px 20px', color: 'var(--mutedtext)' }}>{row.inHouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SERVICE SPECIFIC FAQS */}
      <section className="section-pad">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Service Questions</span>
            <h2 className="display-title section-title">FAQ: {service.name.toUpperCase()}.</h2>
          </div>

          <div className="faq-list">
            {service.faqs.map((faq, i) => (
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

      {/* RELATED SERVICES CAROUSEL / GRID */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
              RELATED CAPABILITIES
            </h3>
            <Link to="/services" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand)' }}>
              All Services →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {relatedServices.map((r) => (
              <Link
                key={r.slug}
                to={`/services/${r.slug}`}
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  display: 'block',
                  transition: 'all var(--transition-fast)',
                }}
                className="service-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--brand)', fontSize: '1.2rem' }}>
                    {r.num}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '6px' }}>
                  {r.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--mutedtext)', lineHeight: 1.5 }}>
                  {r.intro.slice(0, 95)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        eyebrow={`Engage ${service.name}`}
        title={`READY TO ACCELERATE WITH ${service.name.toUpperCase()}?`}
        subtitle="Let's build a customized proposal and jump straight into execution."
        primaryLabel="Inquire About This Service"
        primaryTo={`/contact?service=${encodeURIComponent(service.name)}`}
      />

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaData={activeMedia}
      />
    </>
  );
};
