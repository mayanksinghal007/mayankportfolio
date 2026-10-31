/**
 * Authoritative Site & Brand Configuration
 * Single source of truth for honest credentials, contact details, and client spellings.
 */

export const SITE_CONFIG = {
  name: "Mayank Aggarwal",
  brandName: "Klikwise",
  title: "Digital Marketer & AI Specialist",
  tagline: "Performance Meta Ads & Generative AI Creative",
  headline: "HOOK. CONVERT. RETAIN.",
  subheadline: "I help Indian D2C brands, startups and local businesses grow with Meta Ads, AI video creatives and email retention funnels. Delhi-based, remote delivery available worldwide.",
  location: "Delhi, India · Remote Delivery Available Worldwide",
  experienceText: "1 year of hands-on experience",
  experienceYears: "1 Year",
  email: "riyansh.studio007@gmail.com",
  inquiryEmail: "contact.klikwise@gmail.com",
  phone: "+91 9217756033",
  phoneTel: "+919217756033",
  whatsapp: "919217756033",
  whatsappMsg: "Hi Mayank, I'm interested in discussing a marketing or AI creative project.",
  replyTime: "Replies within 12 hours",
  linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7511093077722251264/",
  instagram: "https://www.instagram.com/mayankaggarwal_7",
  github: "https://github.com/mayanksinghal007",
  cvUrl: "/Mayank_Aggarwal_Resume.pdf", // [REPLACE] upload your resume to /public
  indexNowKey: "8f1a23c5b4d7e901f2a34b56c7d8e90a",
  siteUrl: typeof window !== "undefined" && window.location ? window.location.origin : "https://mayankaggarwal-one.vercel.app",
  googleVerification: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) || "tVnkqW21I5IWprdsSvkoJLLde6zAnFD-VHlKmrIvIoU",
  googleVerificationWithPrefix: "google-site-verification=tVnkqW21I5IWprdsSvkoJLLde6zAnFD-VHlKmrIvIoU",
  googleVerificationBackup: "pWqnvJRxhVJjtOdo3LRUv135V9Zlrvo8yI0XO8G8vHc",
  googleCnameHost: "zo4mu2ttgmxe",
  googleCnameVerification: "gv-hiv3gu4sg4ylae.dv.googlehosted.com",
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

// Honest, Verifiable Hero Stats (Single clean row, verified India-first data)
export const HERO_STATS = [
  { value: "India-first", label: "Delhi-based, remote-friendly" },
  { value: "Meta Ads + AI Video", label: "Core focus" },
  { value: "Reply in < 12 hrs", label: "Response time" },
  { value: "Global delivery", label: "On request" },
];

// Note displayed where case studies or metrics are still building
export const PORTFOLIO_NOTE = "Client results coming soon — currently building my case-study portfolio with active campaigns.";
