import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetDomain = 'https://mayank-aggarwal.vercel.app';

export const BACKLINKS_100 = [
  // 1-10: TOP TIER LIVE & CONTENT PLATFORMS
  {
    id: 1,
    name: 'GitHub Repository & Profile Hub',
    da: 96,
    category: 'Developer & Open Source',
    platformUrl: 'https://github.com/mayanksinghal007/mayankportfolio',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Portfolio',
    linkType: 'Do-Follow Markdown',
    status: 'Live in Codebase (README.md)',
    notes: 'Links to Homepage, Tools, Services & Delhi Hub. Pre-built in root README.md.'
  },
  {
    id: 2,
    name: 'Dev.to Technical Publication',
    da: 91,
    category: 'Content Syndication',
    platformUrl: 'https://dev.to/new',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS & Profit Calculator',
    linkType: 'Do-Follow Canonical',
    status: 'Ready to Publish',
    notes: 'Complete post pre-written in /seo/backlinks/02-devto-meta-ads-roas.md'
  },
  {
    id: 3,
    name: 'Hashnode Engineering Blog',
    da: 88,
    category: 'Content Syndication',
    platformUrl: 'https://hashnode.com/',
    targetUrl: `${targetDomain}/services/ai-video-filmmaking`,
    anchorText: 'Generative AI Video Production Retainers',
    linkType: 'Do-Follow Canonical',
    status: 'Ready to Publish',
    notes: 'Complete post pre-written in /seo/backlinks/03-hashnode-generative-ai-commercials.md'
  },
  {
    id: 4,
    name: 'Medium Strategy Publication',
    da: 95,
    category: 'Thought Leadership',
    platformUrl: 'https://medium.com/new-story',
    targetUrl: `${targetDomain}/blog/meta-advantage-plus-shopping-campaigns-guide`,
    anchorText: 'Mayank Aggarwal Strategy Hub',
    linkType: 'High Authority Story',
    status: 'Ready to Publish',
    notes: 'Complete post pre-written in /seo/backlinks/04-medium-creative-fatigue.md'
  },
  {
    id: 5,
    name: 'Product Hunt Launch',
    da: 91,
    category: 'Tech / Tool Launch',
    platformUrl: 'https://www.producthunt.com/posts/new',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS & Profit Calculator',
    linkType: 'Do-Follow Tool Link',
    status: 'Ready to Submit',
    notes: 'Launch kit and first comment pre-written in /seo/backlinks/05-product-hunt-launch-kit.md'
  },
  {
    id: 6,
    name: 'LinkedIn Pulse / Article',
    da: 98,
    category: 'Social Authority',
    platformUrl: 'https://www.linkedin.com/post/new/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Delhi & Gurugram Performance Marketing',
    linkType: 'High Authority Article',
    status: 'Ready to Publish',
    notes: 'Complete post pre-written in /seo/backlinks/06-linkedin-pulse-article.md'
  },
  {
    id: 7,
    name: 'Reddit (r/PPC & r/FacebookAds)',
    da: 97,
    category: 'Community Authority',
    platformUrl: 'https://www.reddit.com/r/PPC/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS & Profit Calculator',
    linkType: 'Community Resource',
    status: 'Ready to Post',
    notes: 'Community guide pre-written in /seo/backlinks/07-reddit-ppc-case-study.md'
  },
  {
    id: 8,
    name: 'Quora High-Ranking Q&A',
    da: 93,
    category: 'Q&A Authority',
    platformUrl: 'https://www.quora.com',
    targetUrl: `${targetDomain}/blog/meta-ads-roas-calculator-guide-2025`,
    anchorText: 'Comprehensive Meta Ads ROAS Guide',
    linkType: 'Citation Link',
    status: 'Ready to Answer',
    notes: 'Top answer pre-written in /seo/backlinks/08-quora-high-ranking-answer.md'
  },
  {
    id: 9,
    name: 'Clutch.co B2B Marketplace',
    da: 92,
    category: 'B2B Agency Directory',
    platformUrl: 'https://clutch.co/get-listed',
    targetUrl: `${targetDomain}/services/meta-ads`,
    anchorText: 'Klikwise Digital Marketing',
    linkType: 'Verified Directory',
    status: 'Ready to Register',
    notes: 'Field-by-field profile pre-written in /seo/backlinks/09-clutch-agency-profile.md'
  },
  {
    id: 10,
    name: 'IndiaMART B2B Portal',
    da: 86,
    category: 'Indian B2B Directory',
    platformUrl: 'https://seller.indiamart.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal — Klikwise Digital Marketing',
    linkType: 'Local NAP Citation',
    status: 'Ready to Register',
    notes: 'Service catalog pre-written in /seo/backlinks/10-indiamart-local-citation.md'
  },

  // 11-20: SEARCH ENGINES & HIGH-AUTHORITY CITATIONS
  {
    id: 11,
    name: 'Google Business Profile (GBP)',
    da: 100,
    category: 'Local Search Citation',
    platformUrl: 'https://www.google.com/business/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal — Klikwise Digital Marketing',
    linkType: 'Core Local Citation',
    status: 'Configured in Schema',
    notes: 'Local pack ranking in Delhi NCR. Exact NAP in /seo/MANUAL-STEPS.md'
  },
  {
    id: 12,
    name: 'Bing Places for Business',
    da: 94,
    category: 'Local Search Citation',
    platformUrl: 'https://www.bingplaces.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal — Klikwise Digital Marketing',
    linkType: 'Local Citation',
    status: 'Ready to Auto-Import',
    notes: 'One-click import from verified Google Business Profile'
  },
  {
    id: 13,
    name: 'Apple Business Connect',
    da: 99,
    category: 'Local Search Citation',
    platformUrl: 'https://businessconnect.apple.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Map & Siri Citation',
    status: 'Ready to Register',
    notes: 'Apple Maps listing for Delhi NCR agency presence'
  },
  {
    id: 14,
    name: 'Crunchbase',
    da: 91,
    category: 'Tech Database',
    platformUrl: 'https://www.crunchbase.com/add-new',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise',
    linkType: 'Do-Follow Authority',
    status: 'Ready to Submit',
    notes: 'Add company Klikwise and founder Mayank Aggarwal'
  },
  {
    id: 15,
    name: 'GoodFirms',
    da: 87,
    category: 'B2B Agency Directory',
    platformUrl: 'https://www.goodfirms.co/list-your-company',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Klikwise Performance Marketing',
    linkType: 'Verified Directory',
    status: 'Ready to Register',
    notes: 'Top digital marketing & advertising agency listing'
  },
  {
    id: 16,
    name: 'DesignRush',
    da: 84,
    category: 'Creative Agency Directory',
    platformUrl: 'https://www.designrush.com/agency-signup',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Mayank Aggarwal AI Video Portfolio',
    linkType: 'Verified Directory',
    status: 'Ready to Submit',
    notes: 'Showcase AI commercials & showreel work'
  },
  {
    id: 17,
    name: 'Sortlist',
    da: 81,
    category: 'Agency Matchmaking',
    platformUrl: 'https://www.sortlist.com/en/for-agencies',
    targetUrl: `${targetDomain}/services/meta-ads`,
    anchorText: 'Klikwise Delhi',
    linkType: 'Verified Directory',
    status: 'Ready to Register',
    notes: 'Delhi NCR social media & PPC agency matchmaker'
  },
  {
    id: 18,
    name: 'Justdial',
    da: 84,
    category: 'Indian Local Directory',
    platformUrl: 'https://www.justdial.com/Free-Listing',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Digital Marketing',
    linkType: 'Local NAP Citation',
    status: 'Ready to Register',
    notes: 'Delhi NCR local search staple'
  },
  {
    id: 19,
    name: 'TradeIndia',
    da: 83,
    category: 'Indian B2B Directory',
    platformUrl: 'https://www.tradeindia.com/seller/',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Digital Marketing Services Delhi',
    linkType: 'Local B2B Citation',
    status: 'Ready to Register',
    notes: 'Verified seller profile for performance marketing'
  },
  {
    id: 20,
    name: 'Sulekha Business',
    da: 81,
    category: 'Indian Local Directory',
    platformUrl: 'https://business.sulekha.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Klikwise',
    linkType: 'Local NAP Citation',
    status: 'Ready to Register',
    notes: 'Delhi NCR PPC and digital marketing consultants'
  },

  // 21-30: AI DIRECTORIES & SOFTWARE HUBS
  {
    id: 21,
    name: 'Toolify.ai',
    da: 78,
    category: 'AI Tool Directory',
    platformUrl: 'https://www.toolify.ai/submit',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Submit prompt compiler for Runway & Kling AI'
  },
  {
    id: 22,
    name: 'Futurepedia',
    da: 81,
    category: 'AI Tool Directory',
    platformUrl: 'https://www.futurepedia.io/submit-tool',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator by Mayank',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Premier AI directory curated list'
  },
  {
    id: 23,
    name: "There's An AI For That (TAAFT)",
    da: 82,
    category: 'AI Tool Directory',
    platformUrl: 'https://theresanaiforthat.com/submit/',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Largest AI aggregator with newsletter circulation'
  },
  {
    id: 24,
    name: 'FutureTools.io',
    da: 75,
    category: 'AI Tool Directory',
    platformUrl: 'https://www.futuretools.io/submit-a-tool',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Matt Wolfe curated AI platform'
  },
  {
    id: 25,
    name: 'TopAI.tools',
    da: 74,
    category: 'AI Tool Directory',
    platformUrl: 'https://topai.tools/submit',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Submit free generative prompt tool'
  },
  {
    id: 26,
    name: 'Dang.ai',
    da: 73,
    category: 'AI Tool Directory',
    platformUrl: 'https://dang.ai/submit',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'Curated list of AI commercial utilities'
  },
  {
    id: 27,
    name: 'AI Parabellum',
    da: 72,
    category: 'AI Tool Directory',
    platformUrl: 'https://aiparabellum.com/submit/',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator',
    linkType: 'Do-Follow AI Directory',
    status: 'Ready to Submit',
    notes: 'AI tools database submission'
  },
  {
    id: 28,
    name: 'AlternativeTo',
    da: 82,
    category: 'Software Discovery',
    platformUrl: 'https://alternativeto.net/software/create/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS & Profit Calculator',
    linkType: 'Crowdsourced Tool Link',
    status: 'Ready to Submit',
    notes: 'List as free alternative to paid ROAS calculators'
  },
  {
    id: 29,
    name: 'SaaSHub',
    da: 77,
    category: 'Software Discovery',
    platformUrl: 'https://www.saashub.com/submit',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'ROAS & Profit Calculator',
    linkType: 'Software Profile',
    status: 'Ready to Submit',
    notes: 'Submit marketing and finance calculators'
  },
  {
    id: 30,
    name: 'BetaList',
    da: 78,
    category: 'Startup Directory',
    platformUrl: 'https://betalist.com/submit',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Klikwise Growth Tools',
    linkType: 'Do-Follow Startup Link',
    status: 'Ready to Submit',
    notes: 'Feature early-stage free marketing tools'
  },

  // 31-40: PROFESSIONAL NETWORKS & DEVELOPER ECOSYSTEMS
  {
    id: 31,
    name: 'Wellfound (AngelList)',
    da: 89,
    category: 'Startup Ecosystem',
    platformUrl: 'https://wellfound.com/recruit/overview',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise',
    linkType: 'Company Profile',
    status: 'Ready to Register',
    notes: 'Company profile under Growth Marketing & Performance Ads'
  },
  {
    id: 32,
    name: 'Peerlist',
    da: 76,
    category: 'Tech Portfolio',
    platformUrl: 'https://peerlist.io/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Verified Work Credentials',
    status: 'Ready to Register',
    notes: 'Modern portfolio showcase for tech and marketing'
  },
  {
    id: 33,
    name: 'Hugging Face Community',
    da: 89,
    category: 'AI Developer Hub',
    platformUrl: 'https://huggingface.co/new-space',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Generator Space',
    linkType: 'Developer Space Link',
    status: 'Ready to Submit',
    notes: 'Host demo space or prompt dataset linking to tool'
  },
  {
    id: 34,
    name: 'CodePen Profile',
    da: 92,
    category: 'Frontend Showcase',
    platformUrl: 'https://codepen.io/pen/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS Calculator Component',
    linkType: 'Showcase Link',
    status: 'Ready to Publish',
    notes: 'Embed standalone calculator pen linking to portfolio'
  },
  {
    id: 35,
    name: 'Replit Community',
    da: 84,
    category: 'Code Platform',
    platformUrl: 'https://replit.com/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'ROAS Calculator Node Engine',
    linkType: 'Code Project Link',
    status: 'Ready to Publish',
    notes: 'Host free open-source calculator repl'
  },
  {
    id: 36,
    name: 'Stack Overflow User Profile',
    da: 94,
    category: 'Developer Profile',
    platformUrl: 'https://stackoverflow.com/users/edit/current',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Portfolio',
    linkType: 'Profile Authority',
    status: 'Ready to Add Link',
    notes: 'Set website URL in developer profile'
  },
  {
    id: 37,
    name: 'Indie Hackers',
    da: 82,
    category: 'Founder Community',
    platformUrl: 'https://www.indiehackers.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise & Portfolio',
    linkType: 'Product Profile',
    status: 'Ready to Publish',
    notes: 'Share building free tools and growing D2C brands'
  },
  {
    id: 38,
    name: 'Hacker News (Show HN)',
    da: 92,
    category: 'Tech News',
    platformUrl: 'https://news.ycombinator.com/submit',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Show HN: Free Meta Ads Break-Even ROAS Calculator',
    linkType: 'Community Discussion',
    status: 'Ready to Post',
    notes: 'Share launch of instant financial calculator'
  },
  {
    id: 39,
    name: 'F6S Startup Portal',
    da: 83,
    category: 'Startup Network',
    platformUrl: 'https://www.f6s.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise',
    linkType: 'Company Profile',
    status: 'Ready to Register',
    notes: 'Agency profile on startup grant & founder portal'
  },
  {
    id: 40,
    name: 'Substack Publication',
    da: 92,
    category: 'Newsletter Authority',
    platformUrl: 'https://substack.com/signup',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Mayank Aggarwal VIP Growth Dispatch',
    linkType: 'Publication Link',
    status: 'Ready to Launch',
    notes: 'Syndicate weekly performance marketing playbooks'
  },

  // 41-50: CREATIVE, DESIGN & SHOWCASE PORTFOLIOS
  {
    id: 41,
    name: 'Behance Portfolio',
    da: 93,
    category: 'Creative Showcase',
    platformUrl: 'https://www.behance.net/',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Mayank Aggarwal Showreel & Ads',
    linkType: 'Creative Profile',
    status: 'Ready to Publish',
    notes: 'Upload generative AI commercial case studies'
  },
  {
    id: 42,
    name: 'Dribbble Studio',
    da: 92,
    category: 'Design Showcase',
    platformUrl: 'https://dribbble.com/',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Design Profile',
    status: 'Ready to Publish',
    notes: 'Showcase ad creative frames and motion assets'
  },
  {
    id: 43,
    name: 'ArtStation',
    da: 90,
    category: 'Visual Creative',
    platformUrl: 'https://www.artstation.com/',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Mayank Aggarwal AI Visuals',
    linkType: 'Artist Profile',
    status: 'Ready to Publish',
    notes: 'Upload Midjourney & Kling AI concept art projects'
  },
  {
    id: 44,
    name: 'Vimeo Studio Channel',
    da: 95,
    category: 'Video Authority',
    platformUrl: 'https://vimeo.com/',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Klikwise Commercial Showreel',
    linkType: 'Video Profile Link',
    status: 'Ready to Publish',
    notes: 'Host uncompressed 4K AI video showreels'
  },
  {
    id: 45,
    name: 'YouTube Channel',
    da: 100,
    category: 'Video Authority',
    platformUrl: 'https://www.youtube.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal — Digital Marketing & AI',
    linkType: 'Channel About Link',
    status: 'Configured in Schema',
    notes: 'Add official website link in channel bio'
  },
  {
    id: 46,
    name: 'Read.cv',
    da: 75,
    category: 'Design Resume',
    platformUrl: 'https://read.cv/',
    targetUrl: `${targetDomain}/about`,
    anchorText: 'Mayank Aggarwal Credentials',
    linkType: 'Curated Bio Link',
    status: 'Ready to Publish',
    notes: 'Minimalist designer resume linking to About page'
  },
  {
    id: 47,
    name: 'Bento.me',
    da: 78,
    category: 'Bio Link Hub',
    platformUrl: 'https://bento.me/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Visual Bento Grid',
    status: 'Ready to Configure',
    notes: 'Link homepage, calculator, AI prompt tool, and socials'
  },
  {
    id: 48,
    name: 'Linktree',
    da: 93,
    category: 'Social Link Aggregator',
    platformUrl: 'https://linktr.ee/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Portfolio & Tools',
    linkType: 'Social Aggregator',
    status: 'Ready to Configure',
    notes: 'Bio link for Instagram @mayankaggarwal_7'
  },
  {
    id: 49,
    name: 'About.me',
    da: 91,
    category: 'Personal Identity',
    platformUrl: 'https://about.me/',
    targetUrl: `${targetDomain}/about`,
    anchorText: 'Mayank Aggarwal — Digital Marketing & AI',
    linkType: 'Profile Link',
    status: 'Ready to Register',
    notes: 'Entity confirmation page for personal branding'
  },
  {
    id: 50,
    name: 'Gravatar',
    da: 94,
    category: 'Global Identity',
    platformUrl: 'https://gravatar.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Global Author Avatar',
    status: 'Ready to Configure',
    notes: 'Tied to contact.klikwise@gmail.com and author bios'
  },

  // 51-60: FREELANCE & CONSULTANCY DIRECTORIES
  {
    id: 51,
    name: 'Upwork Agency & Profile',
    da: 92,
    category: 'Freelance Marketplace',
    platformUrl: 'https://www.upwork.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise Digital Marketing',
    linkType: 'Verified Agency',
    status: 'Ready to Register',
    notes: 'Top-rated Meta Ads and video production agency profile'
  },
  {
    id: 52,
    name: 'Fiverr Pro',
    da: 90,
    category: 'Freelance Marketplace',
    platformUrl: 'https://www.fiverr.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal',
    linkType: 'Verified Seller',
    status: 'Ready to Register',
    notes: 'High-ticket Meta ad audits and video retainer gigs'
  },
  {
    id: 53,
    name: 'Contra',
    da: 78,
    category: 'Freelance Network',
    platformUrl: 'https://contra.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Independent Practice',
    linkType: 'Commission-free Portfolio',
    status: 'Ready to Register',
    notes: 'Modern client management showcase'
  },
  {
    id: 54,
    name: 'Malt Community',
    da: 76,
    category: 'Freelance Directory',
    platformUrl: 'https://www.malt.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Marketing',
    linkType: 'Freelance Directory',
    status: 'Ready to Register',
    notes: 'European & Asian freelance consultancy directory'
  },
  {
    id: 55,
    name: 'Growth Collective / MarketerHire',
    da: 72,
    category: 'Elite Marketer Directory',
    platformUrl: 'https://www.growthcollective.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Performance Marketer',
    linkType: 'Vetted Talent Link',
    status: 'Ready to Apply',
    notes: 'Top tier freelance growth marketer network'
  },
  {
    id: 56,
    name: 'AgencySpotter',
    da: 71,
    category: 'Agency Directory',
    platformUrl: 'https://www.agencyspotter.com/',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Klikwise',
    linkType: 'Verified Directory',
    status: 'Ready to Submit',
    notes: 'Marketing & advertising agency search directory'
  },
  {
    id: 57,
    name: 'Digital Agency Network (DAN)',
    da: 73,
    category: 'Agency Directory',
    platformUrl: 'https://digitalagencynetwork.com/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Klikwise Digital Marketing',
    linkType: 'Global Agency Index',
    status: 'Ready to Submit',
    notes: 'Global boutique agency index'
  },
  {
    id: 58,
    name: 'UpCity',
    da: 78,
    category: 'B2B Directory',
    platformUrl: 'https://upcity.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Top Digital Marketing Agencies Delhi',
    linkType: 'Agency Ranking',
    status: 'Ready to Submit',
    notes: 'Free agency submission for Delhi NCR region'
  },
  {
    id: 59,
    name: 'Yelp India',
    da: 93,
    category: 'Business Directory',
    platformUrl: 'https://biz.yelp.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Klikwise Delhi',
    linkType: 'Local Citation',
    status: 'Ready to Submit',
    notes: 'Local business profile with Delhi NAP details'
  },
  {
    id: 60,
    name: 'Yellow Pages India',
    da: 70,
    category: 'Indian Directory',
    platformUrl: 'https://www.yellowpages.in/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Klikwise Internet Marketing',
    linkType: 'Directory Citation',
    status: 'Ready to Submit',
    notes: 'Long-standing Indian business directory citation'
  },

  // 61-70: DOCUMENT, SLIDE & DIGITAL ASSET HUBS
  {
    id: 61,
    name: 'SlideShare',
    da: 95,
    category: 'Presentation Platform',
    platformUrl: 'https://www.slideshare.net/upload',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Mayank Aggarwal Meta Ads Guides',
    linkType: 'Document Backlink',
    status: 'Ready to Upload',
    notes: 'Upload PDF deck: "Break-Even ROAS Calculation Framework 2026"'
  },
  {
    id: 62,
    name: 'Speaker Deck',
    da: 86,
    category: 'Presentation Platform',
    platformUrl: 'https://speakerdeck.com/upload',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Generative AI Video Production Deck',
    linkType: 'Document Backlink',
    status: 'Ready to Upload',
    notes: 'Upload presentation on Runway Gen-3 and Kling commercial workflows'
  },
  {
    id: 63,
    name: 'Scribd Library',
    da: 94,
    category: 'Document Hub',
    platformUrl: 'https://www.scribd.com/upload-document',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Meta Ads Unit Economics Guide',
    linkType: 'Document Backlink',
    status: 'Ready to Upload',
    notes: 'Upload technical marketing whitepapers with source links'
  },
  {
    id: 64,
    name: 'Gumroad Store',
    da: 89,
    category: 'Digital Products',
    platformUrl: 'https://gumroad.com/',
    targetUrl: `${targetDomain}/tools/reel-hook-generator`,
    anchorText: '50 Viral Reel Hooks Cheat Sheet',
    linkType: 'Creator Store Link',
    status: 'Ready to Publish',
    notes: 'Free digital download linking back to tool on website'
  },
  {
    id: 65,
    name: 'Notion Creator Gallery',
    da: 90,
    category: 'Resource Template',
    platformUrl: 'https://www.notion.so/templates',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'E-commerce Unit Economics Notion Template',
    linkType: 'Template Link',
    status: 'Ready to Publish',
    notes: 'Free Notion marketing dashboard linking back to calculator'
  },
  {
    id: 66,
    name: '10Words',
    da: 68,
    category: 'Startup Directory',
    platformUrl: 'https://10words.io/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS Calculator',
    linkType: 'Startup Listing',
    status: 'Ready to Submit',
    notes: 'Concise 10-word startup pitch and link'
  },
  {
    id: 67,
    name: 'PitchWall',
    da: 67,
    category: 'Product Platform',
    platformUrl: 'https://pitchwall.co/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'ROAS & Profit Calculator',
    linkType: 'Community Product Vote',
    status: 'Ready to Submit',
    notes: 'Product launch for marketing utility'
  },
  {
    id: 68,
    name: 'Launching Next',
    da: 71,
    category: 'Startup Index',
    platformUrl: 'https://www.launchingnext.com/submit/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS Calculator',
    linkType: 'Startup Showcase',
    status: 'Ready to Submit',
    notes: 'Curated index of new tech utilities'
  },
  {
    id: 69,
    name: 'StartupBuffer',
    da: 70,
    category: 'Startup Directory',
    platformUrl: 'https://startupbuffer.com/site/submit',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS Calculator',
    linkType: 'Startup Directory',
    status: 'Ready to Submit',
    notes: 'Free web application submission'
  },
  {
    id: 70,
    name: 'Startup Stash',
    da: 73,
    category: 'Startup Resources',
    platformUrl: 'https://startupstash.com/add-listing/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Meta Ads ROAS Calculator by Klikwise',
    linkType: 'Resource Directory',
    status: 'Ready to Submit',
    notes: 'Top resource directory for early-stage tools'
  },

  // 71-80: INDIAN REGIONAL & CLASSIFIED CITATIONS (DELHI NCR FOCUS)
  {
    id: 71,
    name: 'AskLaila Delhi',
    da: 69,
    category: 'Delhi City Directory',
    platformUrl: 'https://www.asklaila.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Internet Marketing Delhi',
    linkType: 'Local NAP Citation',
    status: 'Ready to Register',
    notes: 'Hyper-local Connaught Place / Delhi review listing'
  },
  {
    id: 72,
    name: 'Grotal Delhi',
    da: 68,
    category: 'Delhi City Directory',
    platformUrl: 'https://www.grotal.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Klikwise Performance Marketing',
    linkType: 'Local NAP Citation',
    status: 'Ready to Register',
    notes: 'Delhi NCR local business directory'
  },
  {
    id: 73,
    name: 'DialMeNow India',
    da: 66,
    category: 'Indian Directory',
    platformUrl: 'https://www.dialmenow.in/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Advertising',
    linkType: 'Local Directory',
    status: 'Ready to Register',
    notes: 'Indian local NAP citation'
  },
  {
    id: 74,
    name: 'ClickIndia',
    da: 74,
    category: 'Indian Classifieds',
    platformUrl: 'https://www.clickindia.com/post-free-ad',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Meta Ads & AI Video Services',
    linkType: 'Classified Listing',
    status: 'Ready to Post',
    notes: 'Pan-India business and IT service listing'
  },
  {
    id: 75,
    name: 'PostFreeAds India',
    da: 64,
    category: 'Indian Classifieds',
    platformUrl: 'https://www.postfreeads.com/',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Performance Marketing Consultant Delhi',
    linkType: 'Service Announcement',
    status: 'Ready to Post',
    notes: 'Free service posting in Delhi region'
  },
  {
    id: 76,
    name: 'Quikr Services Delhi',
    da: 80,
    category: 'Indian Classifieds',
    platformUrl: 'https://www.quikr.com/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Digital Marketing & AI Specialist Delhi',
    linkType: 'Local Service Ad',
    status: 'Ready to Post',
    notes: 'Delhi local business classified listing'
  },
  {
    id: 77,
    name: 'Olx Services Delhi',
    da: 85,
    category: 'Indian Classifieds',
    platformUrl: 'https://www.olx.in/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Meta Ads Specialist & Video Ads',
    linkType: 'Local Service Ad',
    status: 'Ready to Post',
    notes: 'Delhi NCR marketing service listing'
  },
  {
    id: 78,
    name: 'Gurgaon Yellow Pages',
    da: 63,
    category: 'Regional Hub',
    platformUrl: 'https://www.gurgaonyellowpages.com/',
    targetUrl: `${targetDomain}/locations/gurugram`,
    anchorText: 'Performance Marketer Gurugram',
    linkType: 'Regional Citation',
    status: 'Ready to Register',
    notes: 'Targeting Cyber City & Golf Course Road companies'
  },
  {
    id: 79,
    name: 'Noida City Directory',
    da: 62,
    category: 'Regional Hub',
    platformUrl: 'https://www.noidabusinessdirectory.com/',
    targetUrl: `${targetDomain}/locations/noida`,
    anchorText: 'Meta Ads Agency Noida',
    linkType: 'Regional Citation',
    status: 'Ready to Register',
    notes: 'Targeting Noida Sector 62 and Sector 18 businesses'
  },
  {
    id: 80,
    name: 'Delhi Online Directory',
    da: 65,
    category: 'Delhi City Directory',
    platformUrl: 'https://www.delhionline.in/',
    targetUrl: `${targetDomain}/locations/delhi`,
    anchorText: 'Mayank Aggarwal Klikwise',
    linkType: 'Regional Citation',
    status: 'Ready to Register',
    notes: 'State portal local directory'
  },

  // 81-90: MARKETING COMMUNITIES & CMS MARKETPLACES
  {
    id: 81,
    name: 'GrowthHackers Community',
    da: 76,
    category: 'Marketing Network',
    platformUrl: 'https://growthhackers.com/posts/new',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Advantage+ Shopping Campaigns Scaling Playbook',
    linkType: 'Community Post',
    status: 'Ready to Publish',
    notes: 'Share testing frameworks and case studies'
  },
  {
    id: 82,
    name: 'DemandCurve Growth Community',
    da: 71,
    category: 'Growth Marketing Forum',
    platformUrl: 'https://www.demandcurve.com/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Free ROAS & Target CPA Tool',
    linkType: 'Community Resource',
    status: 'Ready to Share',
    notes: 'Post in Slack/community channels for growth marketers'
  },
  {
    id: 83,
    name: 'MarketingProfs Community',
    da: 80,
    category: 'B2B Marketing Community',
    platformUrl: 'https://www.marketingprofs.com/',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Mayank Aggarwal Strategy',
    linkType: 'B2B Discussion',
    status: 'Ready to Publish',
    notes: 'Participate in attribution and ROAS discussions'
  },
  {
    id: 84,
    name: 'HubSpot Community',
    da: 92,
    category: 'Inbound Community',
    platformUrl: 'https://community.hubspot.com/',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Conversions API & Server-Side Tracking Guide',
    linkType: 'Forum Answer',
    status: 'Ready to Answer',
    notes: 'Answer tracking, GA4, and pixel configuration threads'
  },
  {
    id: 85,
    name: 'Shopify Community Forums',
    da: 93,
    category: 'E-Commerce Community',
    platformUrl: 'https://community.shopify.com/',
    targetUrl: `${targetDomain}/tools/meta-ads-roas-calculator`,
    anchorText: 'Free Meta Ads ROAS Calculator for Shopify Stores',
    linkType: 'Forum Solution Link',
    status: 'Ready to Answer',
    notes: 'Help merchants solving CAPI and break-even profit math'
  },
  {
    id: 86,
    name: 'WordPress / WooCommerce Support Forum',
    da: 97,
    category: 'Open Source Community',
    platformUrl: 'https://wordpress.org/support/plugin/facebook-for-woocommerce/',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'Meta Pixel & CAPI Debugging Guide',
    linkType: 'Support Forum Link',
    status: 'Ready to Answer',
    notes: 'Answer Facebook for WooCommerce tracking issues'
  },
  {
    id: 87,
    name: 'Webflow Showcase',
    da: 91,
    category: 'Web Showcase',
    platformUrl: 'https://webflow.com/made-in-webflow',
    targetUrl: `${targetDomain}/portfolio`,
    anchorText: 'Mayank Aggarwal Portfolio',
    linkType: 'Design Showcase',
    status: 'Ready to Submit',
    notes: 'Showcase web design and landing page structure'
  },
  {
    id: 88,
    name: 'Framer Community Gallery',
    da: 87,
    category: 'Modern Web Showcase',
    platformUrl: 'https://www.framer.com/gallery/',
    targetUrl: `${targetDomain}`,
    anchorText: 'Mayank Aggarwal Portfolio Experience',
    linkType: 'Gallery Feature',
    status: 'Ready to Submit',
    notes: 'Interactive design and typography showcase'
  },
  {
    id: 89,
    name: 'Wix Arena / Marketplace Partner',
    da: 93,
    category: 'CMS Partner Listing',
    platformUrl: 'https://www.wix.com/arena',
    targetUrl: `${targetDomain}/services`,
    anchorText: 'Klikwise Growth Partner',
    linkType: 'Partner Directory',
    status: 'Ready to Register',
    notes: 'List as performance ads and growth marketing expert'
  },
  {
    id: 90,
    name: 'Gumroad Creators Directory',
    da: 89,
    category: 'Creator Marketplace',
    platformUrl: 'https://gumroad.com/discover',
    targetUrl: `${targetDomain}/tools/ai-video-prompt-generator`,
    anchorText: 'AI Video Prompt Masterkit',
    linkType: 'Creator Profile',
    status: 'Ready to Publish',
    notes: 'Link to free prompt generator and hook templates'
  },

  // 91-100: INDIAN BUSINESS MEDIA, PR & PRESS OUTREACH TARGETS
  {
    id: 91,
    name: 'YourStory (Makers / Tech30)',
    da: 86,
    category: 'Indian Startup Media',
    platformUrl: 'https://yourstory.com/contact-us',
    targetUrl: `${targetDomain}/about`,
    anchorText: 'Mayank Aggarwal — Klikwise',
    linkType: 'PR Story Citation',
    status: 'Ready for Pitch',
    notes: 'Use Outreach Template 6 in /seo/backlinks.md (Story: AI video for Indian D2C)'
  },
  {
    id: 92,
    name: 'Inc42 Media',
    da: 84,
    category: 'Indian Tech Media',
    platformUrl: 'https://inc42.com/contact/',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'D2C Ad Spend & ROAS Benchmarks 2026',
    linkType: 'Editorial Contribution',
    status: 'Ready for Pitch',
    notes: 'Pitch Indian festive quarter ad performance data'
  },
  {
    id: 93,
    name: 'Entrackr',
    da: 78,
    category: 'Indian Startup News',
    platformUrl: 'https://entrackr.com/contact/',
    targetUrl: `${targetDomain}/about`,
    anchorText: 'Mayank Aggarwal Digital Marketing Specialist',
    linkType: 'Media Citation',
    status: 'Ready for Pitch',
    notes: 'Commentary on customer acquisition costs in NCR'
  },
  {
    id: 94,
    name: 'MediaBrief India',
    da: 72,
    category: 'Advertising Media',
    platformUrl: 'https://mediabrief.com/contact-us/',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Klikwise Generative AI Advertising',
    linkType: 'Industry Opinion Editorial',
    status: 'Ready for Pitch',
    notes: 'Op-ed on why generative AI video is replacing traditional studio shoots'
  },
  {
    id: 95,
    name: 'Exchange4Media (e4m)',
    da: 81,
    category: 'Indian Advertising News',
    platformUrl: 'https://www.exchange4media.com/contact-us.html',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Mayank Aggarwal Klikwise',
    linkType: 'Press Feature',
    status: 'Ready for Pitch',
    notes: 'Indian media buying trends and Meta ASC analysis'
  },
  {
    id: 96,
    name: 'Afaqs! Advertising Portal',
    da: 80,
    category: 'Advertising & Marketing News',
    platformUrl: 'https://www.afaqs.com/contact',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Klikwise AI Commercial Production',
    linkType: 'Campaign Review Citation',
    status: 'Ready for Pitch',
    notes: 'Review of AI commercial video workflows for e-commerce'
  },
  {
    id: 97,
    name: 'BestMediaInfo',
    da: 75,
    category: 'Marketing Portal',
    platformUrl: 'https://www.bestmediainfo.com/contact-us',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Mayank Aggarwal Media Specialist',
    linkType: 'Industry Analysis Citation',
    status: 'Ready for Pitch',
    notes: 'Case study on 3-second hook retention on Reels'
  },
  {
    id: 98,
    name: 'Social Samosa',
    da: 77,
    category: 'Social Media Marketing Media',
    platformUrl: 'https://www.socialsamosa.com/submit-campaign/',
    targetUrl: `${targetDomain}/blog`,
    anchorText: 'High-Retention Short Form Reel Framework',
    linkType: 'Campaign Showcase',
    status: 'Ready for Pitch',
    notes: 'Submit reel hook generator methodology and campaign teardowns'
  },
  {
    id: 99,
    name: 'Campaign India',
    da: 76,
    category: 'Advertising Magazine',
    platformUrl: 'https://www.campaignindia.in/contact-us',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Klikwise Digital Marketing',
    linkType: 'Thought Leadership Feature',
    status: 'Ready for Pitch',
    notes: 'Feature on performance marketing in the age of generative models'
  },
  {
    id: 100,
    name: 'Adgully',
    da: 75,
    category: 'Marketing Platform',
    platformUrl: 'https://www.adgully.com/contact.php',
    targetUrl: `${targetDomain}/press`,
    anchorText: 'Mayank Aggarwal Founder Klikwise',
    linkType: 'Industry Interview / Citation',
    status: 'Ready for Pitch',
    notes: 'Founder interview on building boutique AI performance studios in Delhi'
  }
];

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export function generateCsv() {
  const headers = [
    '#',
    'Platform / Directory Name',
    'Domain Authority (DA)',
    'Category',
    'Platform Submission URL',
    'Target Page on Website',
    'Recommended Anchor Text',
    'Link Type',
    'Current Status',
    'Ready-to-Copy Description / Submission Notes'
  ];

  const rows = [headers.map(escapeCsv).join(',')];

  for (const b of BACKLINKS_100) {
    rows.push([
      escapeCsv(b.id),
      escapeCsv(b.name),
      escapeCsv(b.da),
      escapeCsv(b.category),
      escapeCsv(b.platformUrl),
      escapeCsv(b.targetUrl),
      escapeCsv(b.anchorText),
      escapeCsv(b.linkType),
      escapeCsv(b.status),
      escapeCsv(b.notes),
    ].join(','));
  }

  const csvContent = rows.join('\r\n');
  const seoCsvPath = path.resolve(rootDir, 'seo', 'MAYANK-WEBSITE-100-BACKLINKS.csv');
  const publicCsvPath = path.resolve(rootDir, 'public', 'MAYANK-WEBSITE-100-BACKLINKS.csv');

  fs.writeFileSync(seoCsvPath, csvContent, 'utf8');
  fs.writeFileSync(publicCsvPath, csvContent, 'utf8');

  console.log(`✓ Generated ${BACKLINKS_100.length} backlinks in ${seoCsvPath}`);
  console.log(`✓ Copied to ${publicCsvPath} for instant online Google Sheets import!`);
}

generateCsv();
