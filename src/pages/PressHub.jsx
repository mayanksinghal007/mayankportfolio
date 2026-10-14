import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Globe, ShieldCheck, ExternalLink, Download, Award, Newspaper, Link2, CheckCircle2 } from 'lucide-react';

export const BACKLINK_PROFILES = [
  {
    name: "LinkedIn",
    category: "Professional Network",
    url: "https://www.linkedin.com/in/mayank-aggarwal-25b45131b/",
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
    description: "Startup talent profile connecting with early-stage founders seeking fractional growth leadership.",
    sameAs: true
  },
  {
    name: "X (Twitter)",
    category: "Real-Time Microblogging",
    url: "https://x.com/mayank_agg007",
    da: "DA 94",
    anchorText: "@mayank_agg007",
    description: "Daily tactical threads on Meta ad auction shifts, algorithm updates, and AI video experiments.",
    sameAs: true
  },
  {
    name: "Google Developer Profile",
    category: "Google Knowledge Graph",
    url: "https://g.dev/mayankaggarwal",
    da: "DA 99",
    anchorText: "Google Developer Profile - Mayank Aggarwal",
    description: "Verified developer entity profile recognized across Google's technical developer ecosystem.",
    sameAs: true
  },
  {
    name: "Hugging Face",
    category: "AI & Machine Learning",
    url: "https://huggingface.co/mayanksinghal007",
    da: "DA 87",
    anchorText: "mayanksinghal007 on Hugging Face",
    description: "Machine learning model spaces, prompt weights, and dataset curation for AI marketing experimentation.",
    sameAs: true
  },
  {
    name: "Quora",
    category: "Q&A Authority",
    url: "https://www.quora.com/profile/Mayank-Aggarwal-35",
    da: "DA 93",
    anchorText: "Mayank Aggarwal on Quora",
    description: "High-ranked authoritative answers resolving complex questions on Meta Ads, Indian D2C, and ROAS calculations.",
    sameAs: true
  },
  {
    name: "Reddit",
    category: "Community Discussions",
    url: "https://reddit.com/user/mayank_aggarwal",
    da: "DA 91",
    anchorText: "u/mayank_aggarwal",
    description: "Active contributor across r/PPC, r/ecommerce, and r/facebookads sharing real account case studies.",
    sameAs: true
  },
  {
    name: "Peerlist",
    category: "Professional Tech Community",
    url: "https://peerlist.io/mayankaggarwal",
    da: "DA 76",
    anchorText: "Mayank Aggarwal on Peerlist",
    description: "Verified work portfolio and proof-of-work project links across tech, marketing, and design.",
    sameAs: true
  },
  {
    name: "Gravatar",
    category: "Universal Web Identity",
    url: "https://gravatar.com/mayanksinghal0814",
    da: "DA 94",
    anchorText: "Mayank Aggarwal Universal Profile",
    description: "Global verified avatar and identity profile connected to WordPress, GitHub, and web commentary.",
    sameAs: true
  }
];

export const PressHub = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mayank-aggarwal.vercel.app/#person",
    "name": "Mayank Aggarwal",
    "jobTitle": "Digital Marketing & AI Specialist",
    "url": "https://mayank-aggarwal.vercel.app",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=75",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Shaheed Bhagat Singh College, University of Delhi"
    },
    "sameAs": BACKLINK_PROFILES.map(p => p.url)
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      <SeoHead
        title="Press & Digital Footprint Hub | Mayank Aggarwal"
        description="Official press kit, media credentials, verified backlink network, and 20 authoritative digital profiles for Mayank Aggarwal. Brand assets and citations."
        canonical="https://mayank-aggarwal.vercel.app/press"
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-indigo-400">Press & Authority Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Entity & Media Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Press & Digital Authority Hub
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Official media credentials, high-authority web citations, and 20 verified digital footprints establishing the Google Knowledge Graph presence of Mayank Aggarwal.
          </p>
        </div>

        {/* Media Kit Snapshot Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 mb-16 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Newspaper className="w-4 h-4" />
              <span>Official Practitioner Bio</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Mayank Aggarwal — Digital Marketing & AI Specialist</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Mayank Aggarwal is a performance marketer and generative AI video specialist based in Delhi NCR, India. A Commerce graduate (B.Com Hons) from Shaheed Bhagat Singh College, University of Delhi, he combines disciplined financial analysis with cutting-edge AI creative pipelines (Runway Gen-3, Kling AI, ElevenLabs) to manage and scale high-ROI Meta Ad campaigns for D2C brands and B2B enterprises.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                Performance Marketing
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                Meta Ads Scaling
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                AI Commercial Cinematography
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                Technical SEO & AEO
              </span>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-950 border border-slate-800/80 rounded-xl p-5 text-center space-y-3">
            <div className="text-xs text-slate-400 font-semibold">Media Inquiries & Retainers</div>
            <div className="text-sm font-bold text-white">mayanksinghal0814@gmail.com</div>
            <div className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Entity Status</span>
            </div>
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>Contact for Speaking / Press</span>
            </Link>
          </div>
        </div>

        {/* 20 Backlink & Authority Profile Grid */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Link2 className="w-6 h-6 text-indigo-400" />
                <span>20 Verified Digital Footprints & Authority Profiles</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Authoritative hubs linked via Schema.org sameAs properties to establish entity consensus.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/30 whitespace-nowrap">
              Average Network Authority: DA 92+
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BACKLINK_PROFILES.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="group bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.da}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5 mb-2">
                    <span>{item.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                  <span className="font-semibold text-slate-400">Anchor: </span>
                  <span className="italic">{item.anchorText}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Brand Syndication & Citation Guidelines */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Editorial Attribution & Syndication Guidelines</h2>
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              When citing data, calculators, or frameworks from this website (such as the 3:2:2 Meta Ads Sandbox or Break-Even ROAS formulas), please attribute the author as <strong>Mayank Aggarwal</strong> with a direct hyperlink pointing to the original guide URL.
            </p>
            <p>
              For podcast interviews, guest keynote speaking, or co-authored research on generative AI video advertising, email directly at <strong>mayanksinghal0814@gmail.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
