import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CtaBanner } from '../components/CtaBanner';
import { BookOpen, Search, ArrowUpRight } from 'lucide-react';

export const GLOSSARY_TERMS = [
  {
    term: "AEO (Answer Engine Optimization)",
    category: "SEO & Search",
    definition: "The practice of structuring digital content so AI answer engines like Perplexity, ChatGPT Search, and Google AI Overviews cite it directly in synthesized zero-click responses.",
    relatedSlug: "answer-engine-optimization-aeo-perplexity-chatgpt-ranking"
  },
  {
    term: "Advantage+ Shopping Campaigns (ASC)",
    category: "Meta Ads",
    definition: "Meta's automated machine learning campaign type that optimizes audience targeting, placements, and creative combinations across the entire sales funnel using broad signals.",
    relatedSlug: "meta-advantage-plus-shopping-campaigns-guide"
  },
  {
    term: "Average Order Value (AOV)",
    category: "E-Commerce",
    definition: "The average rupee amount spent by customers whenever they place an order on an e-commerce store, calculated by dividing total revenue by total order count.",
    relatedSlug: "average-order-value-aov-scaling-bundle-playbooks"
  },
  {
    term: "Break-Even ROAS",
    category: "Performance Marketing",
    definition: "The exact Return on Ad Spend required for an ad campaign to generate zero profit and zero loss after accounting for COGS, shipping, payment fees, and taxes.",
    relatedSlug: "roas-vs-mer-which-marketing-metric-matters-2026"
  },
  {
    term: "Conversion API (CAPI)",
    category: "Meta Ads",
    definition: "A direct server-to-server data integration that transmits web events (Purchase, Lead) directly from your hosting server to Meta, bypassing browser ad-blockers and iOS privacy restrictions.",
    relatedSlug: "meta-ads-pixel-conversions-api-setup-checklist"
  },
  {
    term: "Contribution Margin 3 (CM3)",
    category: "Finance & Strategy",
    definition: "A profitability metric calculated by subtracting variable costs, forward/reverse shipping, payment gateway fees, and advertising spend from gross revenue.",
    relatedSlug: "roas-vs-mer-which-marketing-metric-matters-2026"
  },
  {
    term: "Cost Per Acquisition (CAC / CPA)",
    category: "Performance Marketing",
    definition: "The total marketing and advertising spend required to convert a single prospect into a paying customer.",
    relatedSlug: "how-to-start-meta-ads-small-business-india"
  },
  {
    term: "Cost Per Lead (CPL)",
    category: "Performance Marketing",
    definition: "The amount spent in paid advertising to generate one verified prospect contact submission via an instant form or landing page.",
    relatedSlug: "how-to-reduce-meta-ads-cpl-india"
  },
  {
    term: "Creative Fatigue",
    category: "Creative Strategy",
    definition: "The decline in ad performance that occurs when an audience has seen the same creative asset multiple times, leading to rising CPMs and declining click-through rates.",
    relatedSlug: "meta-ads-creative-fatigue-testing-framework"
  },
  {
    term: "DefinedTerm Schema",
    category: "SEO & Search",
    definition: "A Schema.org structured data specification used to explicitly define industry terminology, improving indexing in knowledge graphs and LLM retrieval pipelines.",
    relatedSlug: "semantic-schema-markup-json-ld-rich-results"
  },
  {
    term: "Drop-Off Velocity",
    category: "Content Strategy",
    definition: "The rate at which viewers swipe away from a short-form video during the opening 3 seconds, used by Instagram and TikTok to evaluate viral potential.",
    relatedSlug: "short-form-video-hook-framework-retention-rate"
  },
  {
    term: "Eleven Multilingual v2",
    category: "AI Audio",
    definition: "A neural speech synthesis model engineered by ElevenLabs capable of rendering emotional voiceovers across 29 languages with authentic accents and pitch control.",
    relatedSlug: "elevenlabs-ai-voiceover-ads-natural-audio-tips"
  },
  {
    term: "FAQPage Schema",
    category: "SEO & Search",
    definition: "A JSON-LD structured data type that renders rich question-and-answer accordions directly beneath search engine listings.",
    relatedSlug: "semantic-schema-markup-json-ld-rich-results"
  },
  {
    term: "Generative Engine Optimization (GEO)",
    category: "SEO & Search",
    definition: "The comprehensive discipline of optimizing website content, facts, and authority signals so large language models cite the brand in AI answers.",
    relatedSlug: "generative-engine-optimization-geo-ai-search-citations"
  },
  {
    term: "Hub-and-Spoke Architecture",
    category: "SEO & Search",
    definition: "An SEO site architecture linking an authoritative core pillar page to multiple focused spoke articles, concentrating PageRank and topical authority.",
    relatedSlug: "topic-clusters-internal-linking-hub-and-spoke"
  },
  {
    term: "Interaction to Next Paint (INP)",
    category: "Web Performance",
    definition: "A Core Web Vitals metric that assesses a page's overall responsiveness by measuring the latency of all click, tap, and keyboard interactions.",
    relatedSlug: "core-web-vitals-inp-lcp-optimization-react"
  },
  {
    term: "Kling AI 1.5",
    category: "AI Video",
    definition: "A state-of-the-art text-to-video foundation model recognized for realistic human facial anatomy, natural physical movements, and fluid hair/fabric dynamics.",
    relatedSlug: "kling-ai-vs-runway-gen-3-commercial-comparison"
  },
  {
    term: "Lookalike Audience (LAL)",
    category: "Meta Ads",
    definition: "A machine-learning-generated audience of users whose digital demographic and behavioral profile closely resembles your highest-value existing customers.",
    relatedSlug: "meta-ads-custom-audiences-lookalike-strategy"
  },
  {
    term: "Marketing Efficiency Ratio (MER)",
    category: "Performance Marketing",
    definition: "Total store revenue divided by total blended advertising spend across all platforms, offering a holistic view of financial health beyond individual channel attribution.",
    relatedSlug: "roas-vs-mer-which-marketing-metric-matters-2026"
  },
  {
    term: "Pattern Interrupt",
    category: "Creative Strategy",
    definition: "A sudden visual or auditory disruption in the opening 2 seconds of a video ad designed to break passive scrolling and command full viewer focus.",
    relatedSlug: "short-form-video-hook-framework-retention-rate"
  },
  {
    term: "Profit on Ad Spend (POAS)",
    category: "Performance Marketing",
    definition: "Gross profit generated by advertising divided by the ad spend invested, providing an accurate measure of true cash margin compared to gross ROAS.",
    relatedSlug: "roas-vs-mer-which-marketing-metric-matters-2026"
  },
  {
    term: "Return on Ad Spend (ROAS)",
    category: "Performance Marketing",
    definition: "Gross revenue generated by an ad campaign divided by the ad spend invested in that specific campaign.",
    relatedSlug: "roas-vs-mer-which-marketing-metric-matters-2026"
  },
  {
    term: "Return-to-Origin (RTO)",
    category: "E-Commerce",
    definition: "The percentage of Cash-on-Delivery orders in India that are refused or undelivered and shipped back to the seller, incurring double courier costs.",
    relatedSlug: "reducing-rto-cash-on-delivery-ecommerce-india"
  },
  {
    term: "Runway Gen-3 Alpha",
    category: "AI Video",
    definition: "A high-fidelity text-to-video and image-to-video foundation model engineered for cinematic commercial camera physics and lighting controls.",
    relatedSlug: "runway-gen-3-alpha-camera-prompts-cheat-sheet"
  },
  {
    term: "Sends Per Reach",
    category: "Content Strategy",
    definition: "The ratio of Direct Message shares to total reach on Instagram Reels, weighted by the algorithm as the #1 indicator of viral distribution.",
    relatedSlug: "instagram-reels-algorithm-ranking-factors-2026"
  },
  {
    term: "User Generated Content (UGC)",
    category: "Creative Strategy",
    definition: "Video advertisements recorded on smartphones that mimic organic customer reviews and try-on experiences, delivering high authenticity.",
    relatedSlug: "ugc-scriptwriting-framework-that-converts"
  },
  {
    term: "Zero-Click Search",
    category: "SEO & Search",
    definition: "A search query where the user finds their required answer directly on the search engine results page without clicking any third-party link.",
    relatedSlug: "answer-engine-optimization-aeo-perplexity-chatgpt-ranking"
  }
];

export const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(GLOSSARY_TERMS.map(t => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://mayankaggarwal-one.vercel.app/glossary#definedtermset",
    "name": "Digital Marketing, AI Video & SEO Terminology Glossary",
    "description": "Comprehensive glossary of technical performance marketing, generative AI video, and AEO/GEO definitions compiled by Mayank Aggarwal.",
    "hasDefinedTerm": GLOSSARY_TERMS.map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
      "inDefinedTermSet": "https://mayankaggarwal-one.vercel.app/glossary#definedtermset"
    }))
  };

  return (
    <div className="editorial-tool-page">
      <SeoHead
        title="Digital Marketing, AI Video & SEO Glossary 2026"
        description="Authoritative glossary of 30+ performance marketing, generative AI video, AEO, GEO, and e-commerce terms by Mayank Aggarwal. Clear definitions and guides."
        keywords={[
          'Marketing Glossary',
          'AEO Definition',
          'ROAS Meaning',
          'Meta Ads Terms',
          'AI Video Definitions',
          'Performance Marketing Terminology',
          'Mayank Aggarwal'
        ]}
        canonicalPath="/glossary"
        ogType="website"
        jsonLd={definedTermSetSchema}
      />

      {/* Hero Header */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Glossary', path: '/glossary' }]} />
          <div style={{ maxWidth: '840px' }}>
            <span className="editorial-eyebrow">
              Structured Industry Knowledge Graph
            </span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              DIGITAL MARKETING & AI <span className="brand-span">GLOSSARY.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '760px' }}>
              A verified, practitioner-maintained glossary defining the technical terms powering modern Meta Ads, generative AI cinematography, and Answer Engine Optimization (AEO).
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div
            className="tool-panel-card"
            style={{ marginBottom: '40px', padding: '28px 32px' }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <Search
                size={18}
                color="var(--mutedtext)"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search definitions (e.g., CAPI, ASC, INP, ROAS, Kling AI, UGC)..."
                className="tool-number-input"
                style={{
                  paddingLeft: '46px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`location-pill ${activeCategory === cat ? 'active' : ''}`}
                  style={{ cursor: 'pointer', border: '1px solid var(--border-color)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '60px'
            }}
          >
            {filteredTerms.map((item, idx) => (
              <div key={idx} className="glossary-term-card">
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--peach)',
                        color: 'var(--brand)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h2 className="glossary-term-name">{item.term}</h2>
                  <p className="glossary-term-def">{item.definition}</p>
                </div>

                {item.relatedSlug && (
                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
                    <Link
                      to={`/blog/${item.relatedSlug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        color: 'var(--brand)',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Read Deep-Dive Guide</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        eyebrow="Implementation Partner"
        title="NEED HELP EXECUTING THESE FRAMEWORKS?"
        subtitle="From Conversion API server-side infrastructure to custom AI video ad rendering, partner directly with Mayank Aggarwal to scale your revenue."
        primaryLabel="Book a Strategy Consultation"
        primaryTo="/contact"
      />
    </div>
  );
};
