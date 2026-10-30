import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CtaBanner } from '../../components/CtaBanner';
import {
  MapPin,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Building,
  PhoneCall,
  Award,
  ChevronDown
} from 'lucide-react';

export const CITY_DATA = {
  delhi: {
    region: "india",
    name: "Delhi",
    fullName: "Delhi NCR & New Delhi",
    seoTitle: "Digital Marketing & Meta Ads Specialist in Delhi",
    metaDescription: "Performance marketing, Meta Ads scaling, and AI video production for D2C brands, luxury labels, and businesses across Delhi NCR. Book a free audit.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/delhi",
    h1: "Digital Marketing & Meta Ads Specialist in Delhi",
    subhead: "Driving profitable customer acquisition for Delhi's fastest-growing D2C brands, boutique apparel labels, and retail enterprises with data-backed media buying.",
    localHubs: ["South Extension", "Connaught Place", "Lajpat Nagar", "Rohini", "Chandni Chowk", "Saket"],
    marketFocus: "D2C Fashion, Luxury Lifestyle, E-Commerce, and Omnichannel Retail.",
    caseStudyTitle: "Delhi D2C Apparel Brand Scales to ₹14L/Month",
    caseStudyDesc: "Revamped creative architecture using AI video hooks, lowering customer acquisition cost (CAC) by 38% while improving cash-on-delivery prepaid conversion.",
    avgCpm: "₹140 - ₹220",
    serviceRadius: "Delhi State & National Capital Territory"
  },
  gurugram: {
    region: "india",
    name: "Gurugram",
    fullName: "Gurugram (Gurgaon), Haryana",
    seoTitle: "Performance Marketing & Meta Ads in Gurugram",
    metaDescription: "Performance marketing, B2B lead generation, and Meta Ads for tech startups and enterprises in DLF Cyber City, Golf Course Road, Gurugram. Proven ROI.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/gurugram",
    h1: "Performance Marketing & Meta Ads Specialist in Gurugram",
    subhead: "Accelerating qualified pipeline and high-ticket customer acquisition for Gurugram's venture-backed SaaS startups, fintech innovators, and real estate leaders.",
    localHubs: ["DLF Cyber City", "Golf Course Road", "Cyber Hub", "Udyog Vihar", "Sohna Road"],
    marketFocus: "B2B SaaS, High-Ticket Professional Services, Fintech, and Commercial Real Estate.",
    caseStudyTitle: "Cyber City B2B SaaS Secures 85 Enterprise Demos",
    caseStudyDesc: "Designed an automated lead gen funnel using Meta Instant Forms with conditional qualification logic, dropping Cost Per Demo from ₹3,400 to ₹1,650.",
    avgCpm: "₹180 - ₹290",
    serviceRadius: "Gurugram, Manesar & Southern NCR"
  },
  noida: {
    region: "india",
    name: "Noida",
    fullName: "Noida, Uttar Pradesh",
    seoTitle: "Meta Ads & SEO Specialist in Noida | Performance",
    metaDescription: "Data-driven Meta Ads campaigns, technical SEO, and conversion optimization for manufacturing, IT services, and D2C brands across Noida and Greater Noida.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/noida",
    h1: "Digital Marketing & Performance Marketer in Noida",
    subhead: "Scaling organic search visibility and profitable paid acquisition for IT firms, export houses, educational institutes, and modern brands in Sector 62, 125, & Expressway.",
    localHubs: ["Sector 62 (Tech Hub)", "Sector 18 (Commercial Center)", "Sector 125 (Expressway)", "Greater Noida Knowledge Park"],
    marketFocus: "IT & Software Services, Export Manufacturing, EdTech, and E-Commerce.",
    caseStudyTitle: "Noida Export House Expands Inbound International B2B Inquiries",
    caseStudyDesc: "Combined high-intent Google Search campaigns with Meta Lookalike retargeting to generate 140+ qualified overseas container shipment quote requests.",
    avgCpm: "₹120 - ₹195",
    serviceRadius: "Noida, Greater Noida & Eastern NCR"
  },
  mumbai: {
    region: "india",
    name: "Mumbai",
    fullName: "Mumbai, Maharashtra",
    seoTitle: "Meta Ads & Growth Marketing Specialist in Mumbai",
    metaDescription: "Performance marketing, AI ad creative production, and revenue scaling for D2C brands, beauty labels, and finance businesses across Mumbai and BKC.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/mumbai",
    h1: "Performance Marketing & Growth Specialist in Mumbai",
    subhead: "Helping Mumbai's consumer brands, fintech pioneers, and premium lifestyle businesses capture market share with cinematic creative testing and disciplined ROAS.",
    localHubs: ["Bandra Kurla Complex (BKC)", "Lower Parel", "Andheri West", "Colaba", "Juhu"],
    marketFocus: "Premium D2C, Beauty & Skincare, Wealth Management, and Media Entertainment.",
    caseStudyTitle: "Mumbai Clean Beauty Brand Scales to 3.8x Blended ROAS",
    caseStudyDesc: "Deployed Advantage+ Shopping campaigns paired with 15 AI-scripted UGC try-on videos, generating ₹28 Lakhs in monthly gross merchandise value.",
    avgCpm: "₹190 - ₹310",
    serviceRadius: "Mumbai Metropolitan Region (MMR)"
  },
  bangalore: {
    region: "india",
    name: "Bangalore",
    fullName: "Bengaluru, Karnataka",
    seoTitle: "AI Marketing & Meta Ads Specialist in Bangalore",
    metaDescription: "AI video ad creation, programmatic growth marketing, and technical SEO for tech startups and D2C innovators in Bengaluru (Koramangala, Indiranagar, HSR).",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/bangalore",
    h1: "AI Performance Marketing Specialist in Bangalore",
    subhead: "Partnering with Bengaluru's visionary product founders and venture-backed teams to engineer rapid creative testing loops, high-LTV funnels, and generative AI ads.",
    localHubs: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City"],
    marketFocus: "Early-Stage Startups, Mobile Apps, Direct-to-Consumer Tech, and AI Platforms.",
    caseStudyTitle: "Bengaluru Consumer Tech App Drives 42,000 Installs at ₹14 CPA",
    caseStudyDesc: "Synthesized hyper-relatable meme reels and kinetic AI video hooks in Kling and Runway, driving high viral organic sharing alongside paid scale.",
    avgCpm: "₹210 - ₹340",
    serviceRadius: "Bengaluru Urban & Karnataka Tech Corridor"
  },
  "new-york": {
    region: "international",
    name: "New York",
    fullName: "New York City (NYC), United States",
    seoTitle: "Meta Ads & Performance Marketing Specialist in New York, US",
    metaDescription: "Performance Meta Ads management, Advantage+ scaling, and AI video commercials for DTC brands, fintech, and startups across New York City and Manhattan.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/new-york",
    h1: "Performance Marketing & Meta Ads Specialist in New York",
    subhead: "Driving profitable customer acquisition for New York's fastest-growing DTC brands, luxury consumer labels, and SaaS startups with disciplined unit economics.",
    localHubs: ["SoHo (DTC Hub)", "Silicon Alley (Manhattan)", "DUMBO (Brooklyn)", "Flatiron", "Midtown", "Financial District"],
    marketFocus: "DTC Apparel, Clean Beauty, FinTech, B2B SaaS, and Luxury Consumer Products.",
    caseStudyTitle: "NYC DTC Jewelry Brand Scales to $180,000/Month on Meta ASC",
    caseStudyDesc: "Engineered a 3-tier creative testing sandbox and paired Advantage+ Shopping with 12 high-retention vertical UGC reels, dropping Customer Acquisition Cost by 34%.",
    avgCpm: "$28 - $46 USD",
    serviceRadius: "New York Tri-State Area & United States"
  },
  london: {
    region: "international",
    name: "London",
    fullName: "London & Greater London, United Kingdom",
    seoTitle: "Performance Marketing & Meta Ads Specialist in London, UK",
    metaDescription: "Meta Ads, Google Ads growth marketing, and AI commercial video production for UK e-commerce brands and London tech scale-ups. High ROAS scaling.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/london",
    h1: "Performance Marketing & Growth Specialist in London",
    subhead: "Partnering with ambitious UK e-commerce retailers, DTC challengers, and London scale-ups to scale paid acquisition, combat ad fatigue, and drive blended ROAS.",
    localHubs: ["Shoreditch (Tech City)", "Mayfair", "Soho", "Canary Wharf", "King's Cross", "Fitzrovia"],
    marketFocus: "Sustainable Fashion, DTC E-Commerce, FinTech, and High-Ticket B2B Services.",
    caseStudyTitle: "London Sustainable Footwear Label Reaches 4.2x Blended ROAS",
    caseStudyDesc: "Migrated account to server-side Meta Conversions API (CAPI) and deployed generative AI commercial trailers, unlocking profitable UK and EU international expansion.",
    avgCpm: "£18 - £32 GBP",
    serviceRadius: "London Metropolitan Area & United Kingdom"
  },
  dubai: {
    region: "international",
    name: "Dubai",
    fullName: "Dubai & Abu Dhabi, United Arab Emirates (UAE)",
    seoTitle: "Meta Ads & AI Marketing Specialist in Dubai, UAE",
    metaDescription: "Performance marketing, high-ticket lead generation, and cinematic AI video ads for luxury real estate, D2C, and businesses in Dubai and UAE.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/dubai",
    h1: "Performance Marketing & Meta Ads Specialist in Dubai",
    subhead: "Engineering high-ticket lead generation funnels and cinematic AI commercial video creatives for luxury real estate brokers, GCC e-commerce, and Dubai enterprises.",
    localHubs: ["Downtown Dubai", "Dubai Marina", "Business Bay", "DIFC", "Palm Jumeirah", "Dubai Internet City"],
    marketFocus: "Luxury Real Estate, High-Ticket Professional Services, GCC D2C E-Commerce, and Hospitality.",
    caseStudyTitle: "Dubai Luxury Property Broker Generates 140+ HNWI Buyer Inquiries",
    caseStudyDesc: "Built an interactive qualification funnel on Meta Ads with dynamic video hooks in Kling AI and ElevenLabs voiceovers, slashing Cost Per Qualified Lead by 46%.",
    avgCpm: "80 - 150 AED",
    serviceRadius: "Dubai, Abu Dhabi & GCC Region"
  },
  "los-angeles": {
    region: "international",
    name: "Los Angeles",
    fullName: "Los Angeles, California, United States",
    seoTitle: "AI Video Ads & Meta Ads Specialist in Los Angeles, CA",
    metaDescription: "Cinematic generative AI commercials, high-retention TikTok & Reel ads, and Meta performance marketing for LA entertainment, beauty, and DTC brands.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/los-angeles",
    h1: "AI Ad Creative & Performance Marketing in Los Angeles",
    subhead: "Merging Hollywood-grade visual storytelling via Runway Gen-3 and Kling AI with ruthless Meta Ads media buying to scale LA's leading lifestyle and DTC brands.",
    localHubs: ["Silicon Beach (Santa Monica, Venice)", "West Hollywood", "Beverly Hills", "Culver City", "Downtown LA"],
    marketFocus: "Beauty & Cosmetics, Creator Brands, Entertainment, Wellness, and Streetwear DTC.",
    caseStudyTitle: "LA Clean Skincare Brand Cuts CAC by 42% via Generative AI Creatives",
    caseStudyDesc: "Produced 20 rapid visual angle tests in Runway and Midjourney without high studio production costs, scaling top-of-funnel conversion rate by 2.4x.",
    avgCpm: "$24 - $42 USD",
    serviceRadius: "Los Angeles County, Orange County & Southern California"
  },
  "san-francisco": {
    region: "international",
    name: "San Francisco",
    fullName: "San Francisco & Silicon Valley, California, United States",
    seoTitle: "B2B SaaS Growth & Performance Marketing in San Francisco",
    metaDescription: "Paid social funnels, B2B lead generation, and generative AI ad creative testing for venture-backed startups across San Francisco and Silicon Valley.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/san-francisco",
    h1: "B2B Performance Marketing & Demand Gen in San Francisco",
    subhead: "Accelerating qualified pipeline and ARR growth for venture-backed AI platforms, developer tool companies, and high-growth Silicon Valley B2B startups.",
    localHubs: ["SoMa", "South Park", "Mission District", "Palo Alto", "Mountain View", "Sunnyvale"],
    marketFocus: "Enterprise Software, Developer Platforms, AI Tooling, and Web3 Infrastructure.",
    caseStudyTitle: "Silicon Valley AI Startup Lowers Demo Acquisition Cost to $42",
    caseStudyDesc: "Replaced native lead gen forms with interactive ROI calculator landing pages, feeding offline demo completions back to Meta via Conversions API.",
    avgCpm: "$32 - $58 USD",
    serviceRadius: "San Francisco Bay Area & Silicon Valley"
  },
  singapore: {
    region: "international",
    name: "Singapore",
    fullName: "Singapore & Southeast Asia Regional Hub",
    seoTitle: "Meta Ads & Cross-Border Growth Marketer in Singapore",
    metaDescription: "Performance marketing, localized AI video production, and cross-border APAC acquisition for Singapore startups, retail brands, and tech platforms.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/singapore",
    h1: "Meta Ads & Performance Marketing Specialist in Singapore",
    subhead: "Helping Singapore regional HQs and Southeast Asian consumer brands expand cross-border across Malaysia, Indonesia, Australia, and Western markets.",
    localHubs: ["Marina Bay Financial Centre", "Raffles Place", "Tanjong Pagar", "One-North Tech Hub", "Orchard"],
    marketFocus: "Cross-Border E-Commerce, Consumer Fintech, WealthTech, and Travel Tech.",
    caseStudyTitle: "Singapore D2C Lifestyle Brand Expands into Australia with 3.8x ROAS",
    caseStudyDesc: "Designed country-specific creative hooks with localized currency testing, enabling seamless international scale with zero internal media buyer bloat.",
    avgCpm: "$16 - $28 SGD",
    serviceRadius: "Singapore & Southeast Asia (ASEAN)"
  },
  sydney: {
    region: "international",
    name: "Sydney",
    fullName: "Sydney, New South Wales, Australia",
    seoTitle: "Performance Marketing & Meta Ads Specialist in Sydney, Australia",
    metaDescription: "Data-driven Meta Ads management, Shopify CRO, and AI video ads for Australian DTC retailers and Sydney scale-ups. Direct growth partner.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/sydney",
    h1: "Performance Marketing & Meta Ads Specialist in Sydney",
    subhead: "Engineering profitable acquisition systems for Sydney's premier Shopify DTC brands, outdoor lifestyle companies, and health & wellness businesses.",
    localHubs: ["Sydney CBD", "Surry Hills (Creative Hub)", "Barangaroo", "North Sydney", "Alexandria"],
    marketFocus: "Shopify DTC Brands, Health & Wellness, Outdoor Apparel, and FinTech.",
    caseStudyTitle: "Sydney Wellness Label Scales to $110,000 AUD/Month on Meta Ads",
    caseStudyDesc: "Implemented automated creative refresh sprints to eliminate creative fatigue during high-volume sales periods, achieving a 3.4x blended return on ad spend.",
    avgCpm: "$22 - $38 AUD",
    serviceRadius: "Greater Sydney & Australian Eastern Seaboard"
  },
  toronto: {
    region: "international",
    name: "Toronto",
    fullName: "Toronto & Greater Toronto Area (GTA), Canada",
    seoTitle: "Meta Ads & Digital Marketing Specialist in Toronto, Canada",
    metaDescription: "Performance marketing, Advantage+ shopping campaigns, and AI creative strategy for Canadian e-commerce brands and Toronto tech companies.",
    canonicalUrl: "https://mayankaggarwal-one.vercel.app/locations/toronto",
    h1: "Digital Marketing & Performance Marketer in Toronto",
    subhead: "Partnering with Canadian DTC brands and Toronto tech enterprises to unlock scalable cross-border US/Canada growth through high-converting ad funnels.",
    localHubs: ["Financial District", "King West", "Liberty Village", "Yorkville", "Downtown Toronto"],
    marketFocus: "Omnichannel Retail, DTC E-Commerce, Clean Cosmetics, and B2B SaaS.",
    caseStudyTitle: "Toronto Clean Cosmetics Brand Expands Cross-Border with 3.9x ROAS",
    caseStudyDesc: "Deployed dual-currency Advantage+ Shopping campaigns and localized AI voiceovers, expanding Canadian retail presence into nationwide US delivery.",
    avgCpm: "$20 - $35 CAD",
    serviceRadius: "Greater Toronto Area (GTA) & Ontario Tech Corridor"
  }
};

export const CityLanding = () => {
  const { city } = useParams();
  const currentCityKey = city ? city.toLowerCase() : 'delhi';
  const cityInfo = CITY_DATA[currentCityKey];
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!cityInfo) {
    return <Navigate to="/locations/delhi" replace />;
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${cityInfo.canonicalUrl}/#service`,
    "name": `Mayank Aggarwal - Digital Marketing & Performance Specialist (${cityInfo.name})`,
    "url": cityInfo.canonicalUrl,
    "description": cityInfo.metaDescription,
    "telephone": "+91-9818816672",
    "email": "mayanksinghal0814@gmail.com",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": cityInfo.serviceRadius
    },
    "founder": {
      "@type": "Person",
      "name": "Mayank Aggarwal",
      "jobTitle": "Digital Marketing & AI Specialist",
      "alumniOf": "Shaheed Bhagat Singh College, University of Delhi"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Performance Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meta Ads Management & Scaling"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Commercial Video Production"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO & AEO Architecture"
          }
        }
      ]
    }
  };

  const cityFaqs = [
    {
      q: `Why hire a specialized performance marketer for ${cityInfo.name} businesses?`,
      a: `Businesses in ${cityInfo.name} face intense auction competition and rising ad CPMs. Working directly with an agile specialist provides senior-level account attention, custom AI video creatives, and unit-economic discipline without agency overhead.`
    },
    {
      q: `What is the typical onboarding timeline for ${cityInfo.name} clients?`,
      a: "Full account audits, Conversion API verification, tracking architecture, and the first batch of 6-8 creative angles are delivered within 5 to 7 business days."
    },
    {
      q: `Do you conduct in-person strategy meetings in ${cityInfo.name}?`,
      a: `Yes. For Delhi NCR clients (Delhi, Gurugram, Noida), in-person quarterly marketing reviews and creative briefings are available. For Mumbai and Bengaluru clients, we coordinate via high-touch video sprints with scheduled on-site workshops as needed.`
    },
    {
      q: `What is the pricing / retainer structure for ${cityInfo.name} clients?`,
      a: "Please contact us directly for bespoke pricing. Every business has unique monthly ad budgets, target CAC goals, and required creative volume. We craft custom flat monthly retainers or sprint-based quotes aligned with your unit economics. Zero hidden setup fees, zero long-term lock-in."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cityFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="editorial-tool-page">
      <SeoHead
        title={cityInfo.seoTitle}
        description={cityInfo.metaDescription}
        keywords={[
          `${cityInfo.name} Digital Marketing`,
          `${cityInfo.name} Meta Ads Specialist`,
          `${cityInfo.name} Performance Marketing Agency`,
          `${cityInfo.name} AI Video Commercials`,
          `${cityInfo.name} Facebook Ads Consultant`,
          'Mayank Aggarwal',
          'Klikwise'
        ]}
        canonicalPath={`/locations/${city}`}
        ogType="website"
        jsonLd={[localBusinessSchema, faqSchema]}
      />

      {/* Header & Regional Navigation */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Regional Hubs', path: '/locations/delhi' },
              { name: cityInfo.name, path: `/locations/${city}` }
            ]}
          />

          {/* Regional Hub Selector Pills (India & Global) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '18px 0 24px' }}>
            <div className="location-pills-bar" style={{ margin: 0 }}>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--mutedtext)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '8px'
                }}
              >
                <MapPin size={14} color="var(--brand)" /> India Hubs:
              </span>
              {Object.entries(CITY_DATA)
                .filter(([_, item]) => item.region === 'india')
                .map(([key, item]) => (
                  <Link
                    key={key}
                    to={`/locations/${key}`}
                    className={`location-pill ${key === currentCityKey ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>

            <div className="location-pills-bar" style={{ margin: 0 }}>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '8px'
                }}
              >
                <Sparkles size={14} color="var(--gold)" /> Global / International:
              </span>
              {Object.entries(CITY_DATA)
                .filter(([_, item]) => item.region === 'international')
                .map(([key, item]) => (
                  <Link
                    key={key}
                    to={`/locations/${key}`}
                    className={`location-pill ${key === currentCityKey ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="editorial-eyebrow">
              Regional Growth Partner • {cityInfo.fullName}
            </span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              {cityInfo.h1}
            </h1>
            <p className="hero-lead" style={{ maxWidth: '780px' }}>
              {cityInfo.subhead}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px' }}>
              <Link
                to="/contact"
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                Schedule {cityInfo.name} Growth Call <ArrowUpRight size={17} />
              </Link>
              <Link
                to="/services"
                className="btn-secondary"
                style={{ padding: '14px 24px', fontSize: '0.95rem' }}
              >
                View Full-Stack Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Market Context Cards */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}
          >
            {/* Market Focus */}
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--brand)',
                  marginBottom: '8px'
                }}
              >
                Target Market Focus
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--charcoal)',
                  marginBottom: '10px'
                }}
              >
                {cityInfo.marketFocus}
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Tailored campaign creative architectures mapped to local customer demographics, offline retail competition, and e-commerce buying behavior.
              </p>
            </div>

            {/* Auction Benchmarks */}
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--brand)',
                  marginBottom: '8px'
                }}
              >
                Average Meta Ad CPM
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--charcoal)',
                  marginBottom: '10px'
                }}
              >
                {cityInfo.avgCpm}
              </div>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Real-world auction benchmarks observed across active client ad accounts in the {cityInfo.name} geographical zone.
              </p>
            </div>

            {/* Commercial Hubs */}
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--brand)',
                  marginBottom: '12px'
                }}
              >
                Key Commercial Hubs Served
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cityInfo.localHubs.map((hub, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'var(--peach)',
                      color: 'var(--charcoal)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            {/* Transparent Pricing & Retainers Card */}
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '2px solid var(--brand)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--brand)',
                    marginBottom: '8px'
                  }}
                >
                  Transparent Pricing & Retainers
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: 'var(--charcoal)',
                    marginBottom: '6px'
                  }}
                >
                  Contact for Bespoke Pricing
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--brand)', marginBottom: '10px' }}>
                  Custom Quotes • Zero Hidden Markups • Tailored to Ad Spend
                </div>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  Every brand has distinct monthly ad budgets, acquisition targets, and creative production requirements. We engineer transparent, customized flat retainers and sprint quotes tailored to your exact growth stage.
                </p>
              </div>
              <Link
                to="/contact"
                className="btn-primary"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.88rem',
                  width: 'fit-content',
                  justifyContent: 'center'
                }}
              >
                Inquire for Pricing Quote <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Featured Case Study Card */}
          <div
            style={{
              backgroundColor: 'var(--charcoal)',
              color: 'var(--softwhite)',
              borderRadius: 'var(--radius-lg)',
              padding: '42px 36px',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '48px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Award size={18} color="var(--gold)" />
              <span className="editorial-eyebrow gold" style={{ margin: 0 }}>
                Local Market Case Study • Verified Results
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                color: 'var(--softwhite)',
                marginBottom: '14px'
              }}
            >
              {cityInfo.caseStudyTitle}
            </h2>
            <p
              style={{
                color: 'rgba(255, 253, 249, 0.8)',
                fontSize: '0.98rem',
                lineHeight: '1.7',
                maxWidth: '720px',
                marginBottom: '28px'
              }}
            >
              {cityInfo.caseStudyDesc}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px',
                paddingTop: '24px',
                borderTop: '1px solid var(--charcoal-border)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 253, 249, 0.55)', marginBottom: '4px' }}>
                  Campaign Objective
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--softwhite)' }}>
                  Sales & Conversions
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 253, 249, 0.55)', marginBottom: '4px' }}>
                  Testing Architecture
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--softwhite)' }}>
                  Dynamic 3:2:2 Creative Sandbox
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 253, 249, 0.55)', marginBottom: '4px' }}>
                  Tracking Fidelity
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold)' }}>
                  CAPI Event Quality 9.2/10
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 253, 249, 0.55)', marginBottom: '4px' }}>
                  Attribution Model
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10B981' }}>
                  7-Day Click / 1-Day View
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Local Insights</span>
            <h2 className="display-title section-title">FREQUENTLY ASKED QUESTIONS FOR {cityInfo.name.toUpperCase()} BRANDS.</h2>
          </div>

          <div className="faq-list">
            {cityFaqs.map((faq, i) => (
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
        eyebrow={`Regional Growth Partner • ${cityInfo.name}`}
        title={`READY TO SCALE YOUR ${cityInfo.name.toUpperCase()} BRAND?`}
        subtitle="Schedule a 1-on-1 discovery consultation to review your current ad performance, diagnose acquisition bottlenecks, and build a high-ROI scaling plan."
        primaryLabel={`Schedule ${cityInfo.name} Strategy Call`}
        primaryTo="/contact"
      />
    </div>
  );
};
