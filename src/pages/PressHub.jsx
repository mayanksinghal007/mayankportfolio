import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CtaBanner } from '../components/CtaBanner';
import {
  Globe,
  ShieldCheck,
  ExternalLink,
  Award,
  Newspaper,
  Link2,
  CheckCircle2,
  ArrowUpRight,
  Mail
} from 'lucide-react';

export const BACKLINK_PROFILES = [
  {
    name: "LinkedIn",
    category: "Professional Network",
    url: "https://lnkd.in/p/gfrXbbjH",
    da: "DA 98",
    anchorText: "Mayank Aggarwal - Digital Marketing Specialist",
    description: "Official professional network profile detailing performance marketing leadership, corporate retainers, and commerce background.",
    sameAs: true
  },
  {
    name: "GitHub",
    category: "Developer Hub",
    url: "https://github.com/mayanksinghal007",
    da: "DA 96",
    anchorText: "mayanksinghal007 (Mayank Aggarwal)",
    description: "Open source repositories, programmatic React SEO tools, Conversion API scripts, and web application source code.",
    sameAs: true
  },
  {
    name: "Instagram",
    category: "Visual Social Media",
    url: "https://www.instagram.com/mayank_aggarwal007/",
    da: "DA 93",
    anchorText: "@mayank_aggarwal007",
    description: "Verified Instagram creator account showcasing AI video ad tests, behind-the-scenes editing, and marketing breakdowns.",
    sameAs: true
  },
  {
    name: "YouTube",
    category: "Video Publishing",
    url: "https://www.youtube.com/@MayankAggarwal-Growth",
    da: "DA 100",
    anchorText: "Mayank Aggarwal - Growth & AI Marketing",
    description: "Video breakdowns of Meta Ads account scaling, Runway Gen-3 workflows, and live marketing audits.",
    sameAs: true
  },
  {
    name: "Medium",
    category: "Thought Leadership",
    url: "https://medium.com/@mayanksinghal0814",
    da: "DA 95",
    anchorText: "Mayank Aggarwal on Medium",
    description: "In-depth publication essays on generative engine optimization (GEO), direct response copywriting, and unit economics.",
    sameAs: true
  },
  {
    name: "Substack",
    category: "Newsletter & Essays",
    url: "https://mayankaggarwal.substack.com",
    da: "DA 92",
    anchorText: "The Performance Edge by Mayank Aggarwal",
    description: "Weekly newsletter breaking down proprietary media buying experiments and AI video prompt libraries.",
    sameAs: true
  },
  {
    name: "Dev.to",
    category: "Technical Community",
    url: "https://dev.to/mayanksinghal007",
    da: "DA 91",
    anchorText: "Mayank Aggarwal - Dev.to",
    description: "Technical articles on React static prerendering, Core Web Vitals optimization, and Vite build systems.",
    sameAs: true
  },
  {
    name: "Hashnode",
    category: "Developer Blogging",
    url: "https://hashnode.com/@mayanksinghal",
    da: "DA 89",
    anchorText: "Mayank Aggarwal's Tech Blog",
    description: "Engineering guides exploring Server-Side Tracking, webhook pipelines, and modern web architectures.",
    sameAs: true
  },
  {
    name: "Behance",
    category: "Creative Portfolio",
    url: "https://behance.net/mayankaggarwal007",
    da: "DA 94",
    anchorText: "Mayank Aggarwal Creative Case Studies",
    description: "Visual design portfolios, commercial storyboards, and AI generative cinematography showcases.",
    sameAs: true
  },
  {
    name: "Dribbble",
    category: "UI & Visual Design",
    url: "https://dribbble.com/mayankaggarwal",
    da: "DA 92",
    anchorText: "Mayank Aggarwal on Dribbble",
    description: "Design shots of high-converting landing page layouts and e-commerce mobile checkout wireframes.",
    sameAs: true
  },
  {
    name: "ProductHunt",
    category: "Tech & Product Directory",
    url: "https://www.producthunt.com/@mayank_aggarwal",
    da: "DA 90",
    anchorText: "Mayank Aggarwal - Maker Profile",
    description: "Verified maker profile reviewing generative AI tools, marketing calculators, and productivity extensions.",
    sameAs: true
  },
  {
    name: "Crunchbase",
    category: "Business Intelligence",
    url: "https://www.crunchbase.com/person/mayank-aggarwal",
    da: "DA 91",
    anchorText: "Mayank Aggarwal - Crunchbase Profile",
    description: "Corporate entity verification, advisory engagements, and digital growth agency credentials.",
    sameAs: true
  },
  {
    name: "Wellfound (AngelList)",
    category: "Startup Ecosystem",
    url: "https://wellfound.com/u/mayank-aggarwal",
    da: "DA 88",
    anchorText: "Mayank Aggarwal - Startup Specialist",
    description: "Talent and advisory profile connecting with early-stage venture founders seeking performance marketing lead.",
    sameAs: true
  },
  {
    name: "Twitter / X",
    category: "Social Broadcasting",
    url: "https://twitter.com/mayank_growth",
    da: "DA 94",
    anchorText: "@mayank_growth on X",
    description: "Real-time commentary on Meta algorithm shifts, AI video model benchmarks, and auction trends.",
    sameAs: true
  },
  {
    name: "Figma Community",
    category: "Design Resources",
    url: "https://www.figma.com/@mayankaggarwal",
    da: "DA 93",
    anchorText: "Mayank Aggarwal - Figma Creator",
    description: "Published UI/UX components, direct-response ad storyboard wireframes, and design system kits.",
    sameAs: true
  },
  {
    name: "Kaggle",
    category: "Data Science Hub",
    url: "https://www.kaggle.com/mayankaggarwal007",
    da: "DA 89",
    anchorText: "Mayank Aggarwal - Kaggle Profile",
    description: "Datasets and analysis exploring ad auction CPM trends, customer lifetime value models, and cohort decay.",
    sameAs: true
  },
  {
    name: "Pinterest",
    category: "Visual Search Engine",
    url: "https://www.pinterest.com/mayankaggarwal007/",
    da: "DA 94",
    anchorText: "Mayank Aggarwal - Ad Creative Boards",
    description: "Curated swipe files of high-converting Meta Ads, TikTok viral hooks, and AI product commercial frames.",
    sameAs: true
  },
  {
    name: "About.me",
    category: "Personal Brand Identity",
    url: "https://about.me/mayank-aggarwal",
    da: "DA 92",
    anchorText: "Mayank Aggarwal - About.me",
    description: "Verified single-page personal identity hub summarizing education, marketing awards, and contact links.",
    sameAs: true
  },
  {
    name: "Linktree",
    category: "Bio Link Index",
    url: "https://linktr.ee/mayank_aggarwal",
    da: "DA 93",
    anchorText: "Mayank Aggarwal Official Links",
    description: "Centralized mobile index directing audience to recent case studies, YouTube tutorials, and retainer bookings.",
    sameAs: true
  }
];

export const PressHub = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mayankaggarwal-one.vercel.app/#person",
    "name": "Mayank Aggarwal",
    "jobTitle": "Digital Marketing & AI Specialist",
    "url": "https://mayankaggarwal-one.vercel.app",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=75",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Shaheed Bhagat Singh College, University of Delhi"
    },
    "sameAs": BACKLINK_PROFILES.map(p => p.url)
  };

  return (
    <div className="editorial-tool-page">
      <SeoHead
        title="Press & Digital Footprint Hub | Mayank Aggarwal"
        description="Official press kit, media credentials, verified backlink network, and 20 authoritative digital profiles for Mayank Aggarwal. Brand assets and citations."
        keywords={[
          'Mayank Aggarwal Press',
          'Mayank Aggarwal Digital Footprint',
          'Klikwise Press Kit',
          'Digital Marketing Citations',
          'Mayank Aggarwal Backlinks',
          'Media Inquiries Mayank Aggarwal'
        ]}
        canonicalPath="/press"
        ogType="website"
        jsonLd={personSchema}
      />

      {/* Hero Header */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Press & Authority Hub', path: '/press' }]} />
          <div style={{ maxWidth: '840px' }}>
            <span className="editorial-eyebrow">
              Verified Entity & Media Network
            </span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              PRESS & DIGITAL <span className="brand-span">AUTHORITY HUB.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '760px' }}>
              Official media credentials, high-authority web citations, and 20 verified digital footprints establishing the Google Knowledge Graph presence of Mayank Aggarwal.
            </p>
          </div>
        </div>
      </section>

      {/* Media Kit Snapshot Card */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--purewhite)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '50px',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '36px',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Newspaper size={18} color="var(--brand)" />
                <span className="editorial-eyebrow" style={{ margin: 0 }}>
                  Official Practitioner Bio
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: 'var(--charcoal)',
                  marginBottom: '14px'
                }}
              >
                Mayank Aggarwal — Digital Marketing & AI Specialist
              </h2>
              <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Mayank Aggarwal is a performance marketer and generative AI video specialist based in Delhi NCR, India. A Commerce graduate (B.Com Hons) from Shaheed Bhagat Singh College, University of Delhi, he combines disciplined financial analysis with cutting-edge AI creative pipelines (Runway Gen-3, Kling AI, ElevenLabs) to manage and scale high-ROI Meta Ad campaigns for D2C brands and B2B enterprises.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ backgroundColor: 'var(--peach)', color: 'var(--charcoal)', fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                  Performance Marketing
                </span>
                <span style={{ backgroundColor: 'var(--peach)', color: 'var(--charcoal)', fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                  Meta Ads Scaling
                </span>
                <span style={{ backgroundColor: 'var(--peach)', color: 'var(--charcoal)', fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                  AI Commercial Cinematography
                </span>
                <span style={{ backgroundColor: 'var(--peach)', color: 'var(--charcoal)', fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                  Technical SEO & AEO
                </span>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div
              style={{
                backgroundColor: 'var(--charcoal)',
                color: 'var(--softwhite)',
                borderRadius: 'var(--radius-md)',
                padding: '30px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 253, 249, 0.6)', marginBottom: '8px' }}>
                Media Inquiries & Retainers
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--gold)', marginBottom: '14px' }}>
                mayanksinghal0814@gmail.com
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
                <CheckCircle2 size={14} /> Verified Entity Status
              </div>
              <Link
                to="/contact"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '0.88rem' }}
              >
                Inquire for Press / Speaking <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* 20 Verified Backlink & Authority Profiles Grid */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Link2 size={24} color="var(--brand)" />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--charcoal)', margin: 0 }}>
                    20 Verified Digital Footprints & Authority Profiles
                  </h2>
                </div>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginTop: '6px', margin: 0 }}>
                  Authoritative hubs linked via Schema.org sameAs properties to establish entity consensus.
                </p>
              </div>

              <span
                style={{
                  backgroundColor: 'var(--peach)',
                  color: 'var(--brand)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Network Authority: DA 92+ Avg
              </span>
            </div>

            <div className="press-profile-grid">
              {BACKLINK_PROFILES.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="press-profile-card"
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--mutedtext)'
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: '#059669',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        {item.da}
                      </span>
                    </div>

                    <h3 className="press-profile-title">
                      <span>{item.name}</span>
                      <ExternalLink size={15} color="var(--mutedtext)" />
                    </h3>

                    <p className="press-profile-desc">{item.description}</p>
                  </div>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--mutedtext)' }}>
                    <strong>Anchor: </strong>
                    <span style={{ fontStyle: 'italic', color: 'var(--charcoal)' }}>{item.anchorText}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Editorial Attribution Guidelines */}
          <div
            style={{
              backgroundColor: 'var(--purewhite)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span className="editorial-eyebrow">Attribution Policy</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--charcoal)',
                marginTop: '10px',
                marginBottom: '14px'
              }}
            >
              Editorial Attribution & Syndication Guidelines
            </h2>
            <div style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              <p style={{ marginBottom: '10px' }}>
                When referencing data, financial formulas, or creative frameworks from this website (such as the 3:2:2 Meta Ads Sandbox or Break-Even ROAS models), please attribute the author as <strong>Mayank Aggarwal</strong> with a direct hyperlink pointing to the original guide URL.
              </p>
              <p>
                For podcast interviews, guest keynote speaking, or co-authored research on generative AI video advertising, email directly at <strong>mayanksinghal0814@gmail.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        eyebrow="Media & Advisory"
        title="LOOKING FOR A GROWTH SPEAKER OR CONSULTANT?"
        subtitle="Available for corporate keynotes, performance marketing audits, and AI creative pipeline consulting."
        primaryLabel="Inquire for Speaking"
        primaryTo="/contact"
      />
    </div>
  );
};
