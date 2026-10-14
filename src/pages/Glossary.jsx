import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { BookOpen, Search, ArrowRight, ExternalLink } from 'lucide-react';

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
    relatedSlug: "roas-vs-mer-marketing-efficiency-ratio"
  },
  {
    term: "Conversion API (CAPI)",
    category: "Meta Ads",
    definition: "A direct server-to-server data integration that transmits web events (Purchase, Lead) directly from your hosting server to Meta, bypassing browser ad-blockers and iOS privacy restrictions.",
    relatedSlug: "fix-meta-ads-tracking-capi-pixel-guide"
  },
  {
    term: "Contribution Margin 3 (CM3)",
    category: "Finance & Strategy",
    definition: "A profitability metric calculated by subtracting variable costs, forward/reverse shipping, payment gateway fees, and advertising spend from gross revenue.",
    relatedSlug: "roas-vs-mer-marketing-efficiency-ratio"
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
    relatedSlug: "drop-cost-per-lead-cpl-meta-ads-service-business"
  },
  {
    term: "Creative Fatigue",
    category: "Creative Strategy",
    definition: "The decline in ad performance that occurs when an audience has seen the same creative asset multiple times, leading to rising CPMs and declining click-through rates.",
    relatedSlug: "combat-creative-fatigue-meta-ads-fresh-angles"
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
    term: "Kling AI",
    category: "AI Video",
    definition: "A generative video diffusion model developed by Kuaishou known for high photorealism, fluid human anatomy motion, and precise prompt adherence.",
    relatedSlug: "kling-ai-vs-runway-gen-3-comparison"
  },
  {
    term: "Largest Contentful Paint (LCP)",
    category: "Web Performance",
    definition: "A Core Web Vitals metric measuring the time required for the largest visible content block (image or heading) to render in the user's viewport.",
    relatedSlug: "core-web-vitals-inp-lcp-optimization-react"
  },
  {
    term: "llms.txt",
    category: "SEO & Search",
    definition: "A proposed web standard providing a clean, curated markdown file at the root of a domain specifically formatted for LLM crawlers and AI search systems.",
    relatedSlug: "llms-txt-standard-ai-crawler-optimization"
  },
  {
    term: "Lookalike Audiences (LAL)",
    category: "Meta Ads",
    definition: "Audiences created by Meta's algorithm that find new users sharing similar behavioral traits and demographic data with an existing customer seed list.",
    relatedSlug: "meta-ads-lookalike-audiences-custom-list-strategy"
  },
  {
    term: "Marketing Efficiency Ratio (MER)",
    category: "Performance Marketing",
    definition: "Total gross store revenue divided by total paid ad spend across all channels, representing true blended business marketing return.",
    relatedSlug: "roas-vs-mer-marketing-efficiency-ratio"
  },
  {
    term: "Midjourney v6.1",
    category: "AI Video",
    definition: "An advanced diffusion image generation model producing hyper-realistic commercial product photography and cinematic keyframes.",
    relatedSlug: "midjourney-v6-commercial-product-photography"
  },
  {
    term: "Pattern Interrupt",
    category: "Creative Strategy",
    definition: "A sudden unexpected visual cut, camera zoom, or sound effect in the opening frames of an ad designed to break mindless scrolling behavior.",
    relatedSlug: "short-form-video-hook-framework-retention-rate"
  },
  {
    term: "Profit on Ad Spend (POAS)",
    category: "Performance Marketing",
    definition: "Gross profit divided by advertising spend, providing a more accurate indicator of store health than raw revenue ROAS.",
    relatedSlug: "roas-vs-mer-marketing-efficiency-ratio"
  },
  {
    term: "Return on Ad Spend (ROAS)",
    category: "Performance Marketing",
    definition: "Gross revenue generated by an ad campaign divided by the ad spend invested in that specific campaign.",
    relatedSlug: "roas-vs-mer-marketing-efficiency-ratio"
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
    relatedSlug: "runway-gen-3-ai-video-ads-commercial-workflow"
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
    "@id": "https://mayank-aggarwal.vercel.app/glossary#definedtermset",
    "name": "Digital Marketing, AI Video & SEO Terminology Glossary",
    "description": "Comprehensive glossary of technical performance marketing, generative AI video, and AEO/GEO definitions compiled by Mayank Aggarwal.",
    "hasDefinedTerm": GLOSSARY_TERMS.map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
      "inDefinedTermSet": "https://mayank-aggarwal.vercel.app/glossary#definedtermset"
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      <SeoHead
        title="Digital Marketing, AI Video & SEO Glossary 2026"
        description="Authoritative glossary of 30+ performance marketing, generative AI video, AEO, GEO, and e-commerce terms by Mayank Aggarwal. Clear definitions and guides."
        canonical="https://mayank-aggarwal.vercel.app/glossary"
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-indigo-400">Glossary</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Structured Industry Knowledge Graph</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Digital Marketing & AI Video Glossary
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            A verified, practitioner-maintained glossary defining the technical terms powering modern Meta Ads, generative AI cinematography, and Answer Engine Optimization (AEO).
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search definitions (e.g., CAPI, ASC, INP, ROAS, Kling AI)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredTerms.map((item, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {item.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{item.term}</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>
              </div>

              {item.relatedSlug && (
                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    to={`/blog/${item.relatedSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Read In-Depth Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conversion Banner */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-violet-950/40 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Need Help Implementing These Frameworks?</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              From Conversion API infrastructure to custom AI video ad production, partner directly with Mayank Aggarwal to scale your revenue.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Book a Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
