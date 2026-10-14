import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { MapPin, CheckCircle, ArrowRight, TrendingUp, Sparkles, Building, PhoneCall, Award } from 'lucide-react';

export const CITY_DATA = {
  delhi: {
    name: "Delhi",
    fullName: "Delhi NCR & New Delhi",
    seoTitle: "Digital Marketing & Meta Ads Specialist in Delhi",
    metaDescription: "Performance marketing, Meta Ads scaling, and AI video production for D2C brands, luxury labels, and businesses across Delhi NCR. Book a free audit.",
    canonicalUrl: "https://mayank-aggarwal.vercel.app/locations/delhi",
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
    name: "Gurugram",
    fullName: "Gurugram (Gurgaon), Haryana",
    seoTitle: "Performance Marketing & Meta Ads in Gurugram",
    metaDescription: "Performance marketing, B2B lead generation, and Meta Ads for tech startups and enterprises in DLF Cyber City, Golf Course Road, Gurugram. Proven ROI.",
    canonicalUrl: "https://mayank-aggarwal.vercel.app/locations/gurugram",
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
    name: "Noida",
    fullName: "Noida, Uttar Pradesh",
    seoTitle: "Meta Ads & SEO Specialist in Noida | Performance",
    metaDescription: "Data-driven Meta Ads campaigns, technical SEO, and conversion optimization for manufacturing, IT services, and D2C brands across Noida and Greater Noida.",
    canonicalUrl: "https://mayank-aggarwal.vercel.app/locations/noida",
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
    name: "Mumbai",
    fullName: "Mumbai, Maharashtra",
    seoTitle: "Meta Ads & Growth Marketing Specialist in Mumbai",
    metaDescription: "Performance marketing, AI ad creative production, and revenue scaling for D2C brands, beauty labels, and finance businesses across Mumbai and BKC.",
    canonicalUrl: "https://mayank-aggarwal.vercel.app/locations/mumbai",
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
    name: "Bangalore",
    fullName: "Bengaluru, Karnataka",
    seoTitle: "AI Marketing & Meta Ads Specialist in Bangalore",
    metaDescription: "AI video ad creation, programmatic growth marketing, and technical SEO for tech startups and D2C innovators in Bengaluru (Koramangala, Indiranagar, HSR).",
    canonicalUrl: "https://mayank-aggarwal.vercel.app/locations/bangalore",
    h1: "AI Performance Marketing Specialist in Bangalore",
    subhead: "Partnering with Bengaluru's visionary product founders and venture-backed teams to engineer rapid creative testing loops, high-LTV funnels, and generative AI ads.",
    localHubs: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City"],
    marketFocus: "Early-Stage Startups, Mobile Apps, Direct-to-Consumer Tech, and AI Platforms.",
    caseStudyTitle: "Bengaluru Consumer Tech App Drives 42,000 Installs at ₹14 CPA",
    caseStudyDesc: "Synthesized hyper-relatable meme reels and kinetic AI video hooks in Kling and Runway, driving high viral organic sharing alongside paid scale.",
    avgCpm: "₹210 - ₹340",
    serviceRadius: "Bengaluru Urban & Karnataka Tech Corridor"
  }
};

export const CityLanding = () => {
  const { city } = useParams();
  const currentCityKey = city ? city.toLowerCase() : 'delhi';
  const cityInfo = CITY_DATA[currentCityKey];

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why hire a specialized performance marketer for ${cityInfo.name} businesses?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Businesses in ${cityInfo.name} face intense auction competition and rising ad CPMs. Working directly with an agile specialist provides senior-level account attention, custom AI video creatives, and unit-economic discipline without agency overhead.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the typical onboarding timeline for ${cityInfo.name} clients?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Full account audits, Conversion API verification, tracking architecture, and the first batch of 6-8 creative angles are delivered within 5 to 7 business days."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      <SeoHead
        title={cityInfo.seoTitle}
        description={cityInfo.metaDescription}
        canonical={cityInfo.canonicalUrl}
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* City Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          <span className="text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 mr-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Regional Hubs:
          </span>
          {Object.entries(CITY_DATA).map(([key, item]) => (
            <Link
              key={key}
              to={`/locations/${key}`}
              className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
                key === currentCityKey
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>Regional Growth Partner • {cityInfo.fullName}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {cityInfo.h1}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            {cityInfo.subhead}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all"
            >
              <span>Schedule {cityInfo.name} Growth Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services/meta-ads"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-all"
            >
              <span>View Service Breakdown</span>
            </Link>
          </div>
        </div>

        {/* Local Market Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Target Market Focus</div>
            <div className="text-base font-bold text-white mb-2">{cityInfo.marketFocus}</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailored campaign creative architectures mapped to local purchasing behavior and competitive ad auctions.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Average Meta Ad CPM</div>
            <div className="text-2xl font-black text-white mb-2">{cityInfo.avgCpm}</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-world auction benchmarks observed across active client ad accounts in the {cityInfo.name} geographical zone.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Key Commercial Hubs</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {cityInfo.localHubs.map((hub, idx) => (
                <span key={idx} className="bg-slate-950 px-2.5 py-1 rounded-md text-[11px] text-slate-300 border border-slate-800">
                  {hub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Case Study Snapshot */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-8 mb-16 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Local Market Verification • Case Study</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            {cityInfo.caseStudyTitle}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-2xl">
            {cityInfo.caseStudyDesc}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Campaign Objective</div>
              <div className="text-sm font-bold text-white">Sales & Conversions</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Testing Architecture</div>
              <div className="text-sm font-bold text-white">Dynamic 3:2:2 Sandbox</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Tracking Fidelity</div>
              <div className="text-sm font-bold text-white">CAPI Event Score 9.2</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Attribution</div>
              <div className="text-sm font-bold text-emerald-400">7-Day Click / 1-Day View</div>
            </div>
          </div>
        </div>

        {/* Localized FAQ Accordion */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions for {cityInfo.name} Businesses</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-sm text-white mb-2">
                Why work with Mayank Aggarwal instead of a large {cityInfo.name} digital agency?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Large agencies often pitch with senior founders but delegate day-to-day accounts to junior interns managing 15+ brands simultaneously. I cap my active client roster to deliver dedicated senior strategy, custom AI video rendering, and direct WhatsApp communication with zero bureaucratic delays.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white mb-2">
                Do you offer in-person strategy sessions in {cityInfo.name}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yes. For Delhi NCR clients (Delhi, Gurugram, Noida), in-person quarterly marketing roadmaps and creative briefings are available. For Mumbai and Bengaluru clients, we coordinate via high-touch video reviews with scheduled on-site sprints as required.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
