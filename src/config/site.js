/**
 * Authoritative Site & Brand Configuration
 * Single source of truth for honest credentials, contact details, and client spellings.
 */

export const SITE_CONFIG = {
  name: "Mayank Aggarwal",
  brandName: "Klikwise",
  title: "Digital Marketing & AI Specialist",
  tagline: "Performance Meta Ads & Generative AI Creative",
  headline: "CREATIVE THINKING. SMART MARKETING. AI-POWERED EXECUTION.",
  subheadline: "Helping ambitious brands build high-converting Meta Ads, consistent social media presence, and generative AI video and creative assets.",
  location: "Global / Remote (US, UK & Worldwide)",
  experienceText: "1 year of hands-on experience",
  experienceYears: "1 Year",
  email: "riyansh.studio007@gmail.com",
  inquiryEmail: "contact.klikwise@gmail.com",
  phone: "+91 9217756033",
  phoneTel: "+919217756033",
  whatsapp: "919217756033",
  whatsappMsg: "Hi Mayank, I'm interested in discussing a marketing or AI creative project.",
  replyTime: "Replies within 12 hours",
  linkedin: "https://lnkd.in/p/gfrXbbjH",
  instagram: "https://www.instagram.com/mayankaggarwal_7",
  cvUrl: "/Mayank_Aggarwal_Resume.pdf", // [REPLACE] upload your resume to /public
  indexNowKey: "8f1a23c5b4d7e901f2a34b56c7d8e90a",
  siteUrl: typeof window !== "undefined" && window.location ? window.location.origin : "https://mayank-aggarwal.vercel.app",
  googleVerification: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) || "tVnkqW21I5IWprdsSvkoJLLde6zAnFD-VHlKmrIvIoU",
  googleVerificationBackup: "pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc",
  googleCnameVerification: "gv-mdo5pbh4jznav5.dv.googlehosted.com",
  bingVerification: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BING_SITE_VERIFICATION) || "bing-webmaster-verification-placeholder-code",
  gaMeasurementId: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GA4_MEASUREMENT_ID) || "G-99QPLF52NX",
};

// Verified Company Spellings (Single Source of Truth)
export const COMPANIES = {
  KLIKWISE: "Klikwise",
  ELEVEON: "Eleveon",
  KRUM: "Krum",
  ENKT_AI: "ENKT AI",
  DIDMIN: "DIDMIN",
  COLLEGE: "Shaheed Bhagat Singh College, University of Delhi",
};

// Honest, Verifiable Hero Stats (No fake budgets, no fake follower counts)
export const HERO_STATS = [
  { value: "1 Year", label: "Hands-on Experience" },
  { value: "Meta + AI Video", label: "Core Focus" },
  { value: "Global / Remote", label: "US, UK & Worldwide" },
  { value: "< 12 Hours", label: "Response Time" },
];

// Note displayed where case studies or metrics are still building
export const PORTFOLIO_NOTE = "Client results coming soon — currently building my case-study portfolio with active campaigns.";
