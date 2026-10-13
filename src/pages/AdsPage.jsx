import React from 'react';
import { Megaphone, Layers, Film, TrendingUp, Sparkles } from 'lucide-react';
import { AdsSection } from '../components/AdsSection';
import { CtaBanner } from '../components/CtaBanner';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AdsPage = () => {
  return (
    <>
      <SeoHead
        title="Meta Ads & Creative Gallery | Mayank Aggarwal"
        description="Curated gallery of high-converting Meta Ads, Instagram carousels, and AI video commercials designed by Mayank Aggarwal."
        canonicalPath="/ads"
      />

      {/* ADS HERO HEADER */}
      <section className="section-pad" style={{ paddingTop: '150px', paddingBottom: '40px' }}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'Ads Showcase', path: '/ads' }]} />
          <div style={{ maxWidth: '820px' }}>
            <span className="editorial-eyebrow">
              <Megaphone size={14} style={{ marginRight: '6px', color: 'var(--brand)' }} />
              Paid Creative & Performance Gallery
            </span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              PHOTO & VIDEO ADS.{' '}
              <span className="brand-span">DESIGNED TO CONVERT.</span>
            </h1>
            <p className="hero-lead">
              A curated collection of conversion-focused ad creatives. From multi-slide Instagram and Facebook carousels to cinematic AI video ads and high-retention reel scripts engineered for Meta and YouTube campaigns.
            </p>

            {/* Quick Highlights */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                marginTop: '28px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                }}
              >
                <TrendingUp size={15} style={{ color: 'var(--brand)' }} />
                <span>Meta Strategy & Testing</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                }}
              >
                <Layers size={15} style={{ color: 'var(--brand)' }} />
                <span>Editorial Photo Carousels</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                }}
              >
                <Film size={15} style={{ color: 'var(--amber)' }} />
                <span>Cinematic AI & Social Video</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL ADS SHOWCASE SECTION */}
      <AdsSection isStandalonePage={true} />

      {/* CTA BANNER */}
      <CtaBanner />
    </>
  );
};
