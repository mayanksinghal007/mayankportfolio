import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/initialData';
import { CtaBanner } from '../components/CtaBanner';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export const Process = () => {
  return (
    <>
      <SeoHead
        title="Working Process & Methodology | Mayank Aggarwal"
        description="Explore the 4-stage client workflow: discovery diagnostic, strategy sprint, execution launch, and weekly iteration."
        canonicalPath="/process"
        jsonLd={[getBreadcrumbSchema([{ name: 'Process & Workflow', path: '/process' }])]}
      />

      {/* PROCESS HEADER */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Process & Workflow', path: '/process' }]} />
          <div style={{ maxWidth: '820px' }}>
            <span className="editorial-eyebrow">Proven Framework</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              HOW WE COLLABORATE:{' '}
              <span className="brand-span">FROM CONCEPT TO SCALE.</span>
            </h1>
            <p className="hero-lead">
              A transparent, predictable process designed to eliminate friction, respect your time, and produce compounding results. No surprises, no black-box agency tactics.
            </p>
          </div>
        </div>
      </section>

      {/* 4-STAGE TIMELINE DETAILED SECTION */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="process-step-card"
              >
                {/* Big Step Number */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '4.5rem',
                      lineHeight: 1,
                      color: idx === 0 ? 'var(--brand)' : idx === 1 ? 'var(--gold)' : 'var(--charcoal)',
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--cream)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      marginTop: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Clock size={12} /> {step.timeframe}
                  </div>
                </div>

                {/* Description & Focus */}
                <div>
                  <span className="editorial-eyebrow" style={{ marginBottom: '8px' }}>
                    Phase {step.step} Focus
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '14px', color: 'var(--charcoal)' }}>
                    {step.title}
                  </h2>
                  <p style={{ fontSize: '0.98rem', color: 'var(--mutedtext)', lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                </div>

                {/* Tangible Deliverables Box */}
                <div
                  style={{
                    backgroundColor: 'var(--cream-subtle)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--brand)',
                      marginBottom: '12px',
                    }}
                  >
                    Guaranteed Deliverables:
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {step.deliverables.map((deliv, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                        <CheckCircle2 size={16} color="#FF3D0A" style={{ flexShrink: 0 }} />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS OF COLLABORATION */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="editorial-eyebrow">Client Commitments</span>
            <h2 className="display-title section-title">HOW WE ENSURE SMOOTH PROGRESS.</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
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
              <div style={{ color: 'var(--brand)', marginBottom: '14px' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Rapid 24-48h Communication
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Direct WhatsApp or Slack channel for active clients. Questions are answered within hours, not left hanging for days in formal email chains.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <div style={{ color: 'var(--gold)', marginBottom: '14px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Fixed Scope, No Hidden Fees
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Before any work begins, we agree on exact deliverable numbers, revision parameters, and ad management fees. What we agree upon is what you pay.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <div style={{ color: 'var(--charcoal)', marginBottom: '14px' }}>
                <Layers size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Weekly Video Screen Recaps
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Every Monday or Friday, you receive a concise 5-minute video breakdown walking through your ad metrics, what we tested, and our next priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        eyebrow="Kick Off Step 01"
        title="READY TO COMMENCE DISCOVERY?"
        subtitle="Book an initial consultation to review your current ad accounts, creative assets, and revenue targets."
        primaryLabel="Schedule Discovery Session"
        primaryTo="/contact"
      />
    </>
  );
};
