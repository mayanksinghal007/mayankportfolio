import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, ChevronRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Legal = () => {
  const { site } = useSite();
  const location = useLocation();
  const isTerms = location.pathname.includes('terms');
  const [activeTab, setActiveTab] = useState(isTerms ? 'terms' : 'privacy');

  useEffect(() => {
    setActiveTab(location.pathname.includes('terms') ? 'terms' : 'privacy');
  }, [location.pathname]);

  return (
    <>
      <SeoHead
        title={activeTab === 'privacy' ? 'Privacy Policy | Mayank Aggarwal' : 'Terms of Service | Mayank Aggarwal'}
        description={
          activeTab === 'privacy'
            ? 'Privacy Policy for Mayank Aggarwal portfolio. Explains collection, usage, and protection of contact inquiries under Indian DPDP Act guidelines.'
            : 'Terms of Service governing freelance engagements, payment milestones, intellectual property, and client deliverables with Mayank Aggarwal.'
        }
        canonicalPath={activeTab === 'privacy' ? '/privacy-policy' : '/terms'}
      />

      <section className="section-pad" style={{ paddingTop: '150px' }}>
        <div className="container container-narrow">
          <Breadcrumbs
            items={[
              {
                name: activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
                path: activeTab === 'privacy' ? '/privacy-policy' : '/terms',
              },
            ]}
          />

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`filter-btn ${activeTab === 'privacy' ? 'active' : ''}`}
          >
            <Shield size={14} style={{ display: 'inline', marginRight: '6px' }} /> Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`filter-btn ${activeTab === 'terms' ? 'active' : ''}`}
          >
            <FileText size={14} style={{ display: 'inline', marginRight: '6px' }} /> Terms of Service
          </button>
        </div>

        {activeTab === 'privacy' ? (
          <div>
            <span className="editorial-eyebrow">Data Protection</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '12px', fontSize: '3rem' }}>
              PRIVACY POLICY.
            </h1>
            <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem', marginBottom: '36px' }}>
              Last revised: October 2026 · Effective for all client engagements and website visitors.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: 1.8, color: 'var(--mutedtext)', fontSize: '0.98rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  1. Information We Collect
                </h3>
                <p>
                  When you submit a project inquiry or contact Mayank Aggarwal, we collect the details you provide, including your full name, email address, company or brand name, estimated budget, preferred contact channel, and project description. We never ask for sensitive payment credentials through this form.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  2. How Your Information Is Used
                </h3>
                <p>
                  Information collected is strictly utilized to evaluate your project scope, formulate customized campaign proposals, follow up via your preferred communication method (WhatsApp or Email), and execute agreed-upon marketing or creative services. We do not sell, rent, or trade client information to any third parties.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  3. Client Confidentiality & NDA
                </h3>
                <p>
                  All proprietary brand metrics, unreleased product visual assets, customer demographic data, and Meta ad account financials shared with Mayank Aggarwal are treated as strictly confidential under industry-standard non-disclosure practices.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  4. Contact & Inquiries
                </h3>
                <p>
                  For any privacy questions or requests to delete your inquiry data from our records, please email{' '}
                  <a href={`mailto:${site.email}`} style={{ color: 'var(--brand)', fontWeight: 600 }}>
                    {site.email}
                  </a>{' '}
                  or message us on WhatsApp at <strong>{site.phone}</strong>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span className="editorial-eyebrow">Engagement Agreement</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '12px', fontSize: '3rem' }}>
              TERMS OF SERVICE.
            </h1>
            <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem', marginBottom: '36px' }}>
              Last revised: October 2026 · Governing all client proposals and retainer deliverables.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: 1.8, color: 'var(--mutedtext)', fontSize: '0.98rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  1. Scope of Work & Deliverables
                </h3>
                <p>
                  All performance marketing, social media management, AI video production, and SEO deliverables are governed by an agreed written brief or proposal. Work commences upon mutual confirmation of scope and initial retainer or milestone deposit.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  2. Advertising Budgets & Platform Policies
                </h3>
                <p>
                  Client advertising spend is billed directly by Meta (Facebook/Instagram) or Google to the client's own payment methods. The client is solely responsible for ad spend billed by advertising platforms. While I ensure campaign adherence to Meta's Advertising Policies, platform bans or algorithmic shifts beyond our control are the operational responsibility of the account holder.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  3. Intellectual Property Rights
                </h3>
                <p>
                  Upon full payment of agreed fees, the client retains full commercial usage rights to all final AI video files, ad creatives, script copy, and marketing assets generated specifically for the client's brand.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  4. Revisions & Collaboration
                </h3>
                <p>
                  Each creative piece includes up to two rounds of iterative revisions within the original scope. Additional scope modifications are quoted transparently before execution.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  5. Governing Law & Jurisdiction
                </h3>
                <p>
                  These terms and all commercial agreements shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of New Delhi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};
