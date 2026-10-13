import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, FileText, ChevronRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export const Legal = () => {
  const { site } = useSite();
  const location = useLocation();
  const isTerms = location.pathname.includes('terms');
  const [activeTab, setActiveTab] = useState(isTerms ? 'terms' : 'privacy');

  useEffect(() => {
    setActiveTab(location.pathname.includes('terms') ? 'terms' : 'privacy');
  }, [location.pathname]);

  const legalPath = activeTab === 'privacy' ? '/privacy-policy' : '/terms';
  const legalName = activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <>
      <SeoHead
        title={activeTab === 'privacy' ? 'Privacy Policy | Mayank Aggarwal' : 'Terms of Service | Mayank Aggarwal'}
        description={
          activeTab === 'privacy'
            ? 'Privacy Policy for Mayank Aggarwal portfolio. Explains collection, usage, and protection of contact inquiries under Indian DPDP Act guidelines.'
            : 'Terms of Service governing freelance engagements, payment milestones, intellectual property, and client deliverables with Mayank Aggarwal.'
        }
        canonicalPath={legalPath}
        jsonLd={[getBreadcrumbSchema([{ name: legalName, path: legalPath }])]}
      />

      <section className="page-hero-pad">
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
            <span className="editorial-eyebrow">Data Protection & Privacy</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '12px', fontSize: '3rem' }}>
              PRIVACY POLICY.
            </h1>
            <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem', marginBottom: '36px' }}>
              Last revised: October 2026 · Compliant with the Digital Personal Data Protection (DPDP) Act, 2023 (India).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.8, color: 'var(--mutedtext)', fontSize: '0.98rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  1. Data Fiduciary & Identity
                </h3>
                <p>
                  This Privacy Policy governs the processing of personal data by <strong>Mayank Aggarwal</strong> (operating under the freelance brand <strong>Klikwise</strong>), based in Rohini, Delhi, India ("Data Fiduciary", "we", "us", or "our"). We are committed to processing your personal data lawfully, fairly, and transparently in accordance with the provisions of India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  2. Personal Data We Collect
                </h3>
                <p>
                  We only collect personal data that you voluntarily provide to us when submitting an inquiry through our contact brief form or directly messaging us via WhatsApp or Email:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Identity Information:</strong> Full name and optional professional title.</li>
                  <li><strong>Contact Details:</strong> Email address and WhatsApp telephone number.</li>
                  <li><strong>Business Details:</strong> Company or brand name, current website/social media handles, and estimated monthly advertising budget.</li>
                  <li><strong>Inquiry Content:</strong> Project objectives, creative briefs, target audience notes, and specific capability requirements.</li>
                </ul>
                <p style={{ marginTop: '10px' }}>
                  We do <em>not</em> collect sensitive personal financial data (such as bank credentials, credit card numbers, or government IDs) via our website.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  3. Lawful Basis & Purpose of Processing
                </h3>
                <p>
                  Your personal data is processed strictly based on your affirmative, informed consent (obtained via the unticked consent checkbox on our project brief form) for the following specified business purposes:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Evaluating your advertising and creative requirements to prepare tailored proposals and project estimates.</li>
                  <li>Communicating with you through your preferred contact method (WhatsApp message, phone call, or email).</li>
                  <li>Fulfilling agreed service agreements and performance deliverables.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  4. Cookies, Local Storage & Tracking
                </h3>
                <p>
                  Our website does not deploy intrusive third-party cross-site tracking cookies or marketing surveillance pixels. We use standard browser <strong>localStorage</strong> strictly to cache your client-side form submissions locally for convenience and maintain administrative session authentication. You may clear your browser's local storage at any time without impacting site readability.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  5. Non-Disclosure & Confidentiality
                </h3>
                <p>
                  All proprietary ad creatives, customer acquisition metrics, Meta Business Manager settings, unreleased product concept videos, and business financials shared with Mayank Aggarwal are protected under strict commercial confidentiality and standard Non-Disclosure Agreement (NDA) protocols. We never sell, rent, lease, or monetize client data to data brokers or third parties.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  6. Data Retention & Erasure
                </h3>
                <p>
                  Inquiry records are retained for a maximum of 24 months from the date of submission for ongoing business communications. If you do not proceed with an engagement or request your data to be removed sooner, your records will be purged securely from our active databases within 14 business days of your request.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  7. Your Rights Under the DPDP Act
                </h3>
                <p>
                  As a Data Principal under Indian law, you have the right to:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Access:</strong> Request a summary of your personal data processed by us.</li>
                  <li><strong>Correction & Erasure:</strong> Request the correction of inaccurate data or deletion of your records.</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time without retroactive penalties.</li>
                  <li><strong>Grievance Redressal:</strong> Submit a grievance directly to our Data Protection representative.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  8. Grievance Redressal & Contact
                </h3>
                <p>
                  For any questions regarding this Privacy Policy or to exercise your DPDP rights, contact Mayank Aggarwal directly at:
                </p>
                <p style={{ marginTop: '8px' }}>
                  <strong>Email:</strong> <a href={`mailto:${site.email}`} style={{ color: 'var(--brand)', fontWeight: 600 }}>{site.email}</a><br />
                  <strong>WhatsApp / Phone:</strong> <a href={`tel:${site.phone}`} style={{ color: 'var(--charcoal)', fontWeight: 600 }}>{site.phone}</a><br />
                  <strong>Address:</strong> Rohini, New Delhi, India 110085
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
              Last revised: October 2026 · Governing all client proposals, retainers, and creative deliverables.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.8, color: 'var(--mutedtext)', fontSize: '0.98rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  1. Scope of Work & Proposals
                </h3>
                <p>
                  All performance marketing, generative AI video production, voiceover mastering, social media management, and SEO content services are defined in a formal project brief or proposal mutually confirmed between Mayank Aggarwal ("Specialist") and the client ("Client"). Any requests outside the agreed scope are treated as additional deliverables and quoted separately.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  2. Fees, Retainers & Payment Schedule
                </h3>
                <p>
                  Commercial fees are structured as either monthly retainers or fixed project milestones:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Project Milestones:</strong> A 50% non-refundable deposit is required prior to commencing discovery and concepting sprints, with the remaining 50% due upon delivery of final master files.</li>
                  <li><strong>Monthly Retainers:</strong> Invoiced in advance on the 1st of each calendar month on Net-7 terms.</li>
                  <li><strong>Currencies:</strong> Accepted in INR (via UPI / NEFT / IMPS) or USD (via international wire or transfer service).</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  3. Advertising Spend & Account Ownership
                </h3>
                <p>
                  Media budgets spent on advertising platforms (Meta Ads, Google Ads) are paid directly by the Client to the respective ad networks. The Specialist never collects advertising ad spend funds directly. The Client retains 100% administrative ownership of their own Meta Business Portfolio and Google Ads accounts at all times.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  4. Intellectual Property Rights & Commercial Release
                </h3>
                <p>
                  Upon full payment of all invoices due, full commercial usage rights and ownership of all final AI video files, ad graphics, ad copy, voiceover recordings, and content calendars are assigned to the Client. The Specialist retains the right to display non-confidential project assets in personal portfolio case studies and reels unless explicitly restricted under a written NDA.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  5. Revisions, Feedback & Turnaround
                </h3>
                <p>
                  Standard creative assets include up to two (2) rounds of constructive iterative revisions submitted within seven (7) days of delivery. Additional structural concept revisions beyond the initial brief will be quoted transparently. Initial campaign architectures and preliminary drafts are typically turned around within 24 to 48 business hours.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  6. Cancellation & Termination
                </h3>
                <p>
                  Ongoing monthly retainers may be cancelled by either party with fourteen (14) days written notice before the subsequent billing cycle. In the event of early termination of a milestone project, the client remains responsible for payment proportional to the hours and assets produced up to the termination date.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  7. Performance Disclaimer & Limitation of Liability
                </h3>
                <p>
                  Marketing strategies and creative assets are crafted using rigorous industry best practices and quantitative testing frameworks. However, overall commercial sales figures, return on ad spend (ROAS), and business revenue depend on market conditions, client product quality, inventory availability, pricing competitiveness, and consumer demand. The Specialist does not guarantee specific revenue targets. The Specialist's maximum liability shall in no circumstance exceed the total fees paid by the client in the preceding one (1) month of engagement.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                  8. Governing Law & Dispute Resolution
                </h3>
                <p>
                  These Terms of Service and all client commercial agreements are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts of New Delhi, India.
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
