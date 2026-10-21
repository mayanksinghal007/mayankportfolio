import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_BLOG_POSTS } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const targetDomain = 'https://mayankaggarwal-one.vercel.app';

function escapeCsv(val) {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

// 5 Archetypes of High-Quality Backlink Strategies for each blog:
// 1. Canonical Syndication & Publishing (DA 85-98)
// 2. High-Intent Community Discussion (Reddit / Quora / IndieHackers) (DA 88-95)
// 3. Authority Curation Hub & Developer/Resource Lists (GitHub / Flipboard / Scoop.it / Mix) (DA 80-96)
// 4. B2B Marketing / Industry Aggregators (BizSugar / GrowthHackers / Feedspot / HackerNews) (DA 75-92)
// 5. Contextual Editorial / Guest Post Pitch & HARO Citation (DA 70-90)

const syndicationPlatforms = [
  { platform: 'Medium Publication (Marketing & AI)', domain: 'medium.com', da: 95, type: 'Canonical Syndication', getSubmitUrl: (slug) => `https://medium.com/new-story`, getStrategy: (title) => `Publish excerpt or full article with rel=canonical pointing back to the official blog.` },
  { platform: 'LinkedIn Pulse Article', domain: 'linkedin.com', da: 98, type: 'Professional Network', getSubmitUrl: (slug) => `https://www.linkedin.com/post/new`, getStrategy: (title) => `Publish executive summary targeting CMOs and performance marketers with inbound anchor link.` },
  { platform: 'Substack Thought Leadership Note', domain: 'substack.com', da: 93, type: 'Newsletter & Notes', getSubmitUrl: (slug) => `https://substack.com/publish`, getStrategy: (title) => `Publish a breakdown note with key statistics and link to the deep dive.` },
  { platform: 'Dev.to Tech & Growth Community', domain: 'dev.to', da: 91, type: 'Developer & Growth Hub', getSubmitUrl: (slug) => `https://dev.to/new`, getStrategy: (title) => `Cross-post with #marketing #ai #webdev tags and original article canonical URL.` },
  { platform: 'Hashnode Engineering & Growth Blog', domain: 'hashnode.com', da: 89, type: 'Developer & AI Publishing', getSubmitUrl: (slug) => `https://hashnode.com`, getStrategy: (title) => `Cross-post with canonical URL and author profile backlink.` },
  { platform: 'TealFeed Professional Feed', domain: 'tealfeed.com', da: 74, type: 'Creator & Tech Community', getSubmitUrl: (slug) => `https://tealfeed.com/write`, getStrategy: (title) => `Share actionable key takeaways and framework infographic linking to blog.` },
  { platform: 'Vocal Media Marketing Hub', domain: 'vocal.media', da: 82, type: 'Editorial Publishing', getSubmitUrl: (slug) => `https://vocal.media/stories/new`, getStrategy: (title) => `Publish case study narrative with contextual anchor link in body.` },
  { platform: 'Hackernoon Tech & Marketing', domain: 'hackernoon.com', da: 88, type: 'Tech Publication', getSubmitUrl: (slug) => `https://hackernoon.com/submit`, getStrategy: (title) => `Submit editorial piece linking to data tables and methodology.` }
];

const communityPlatforms = [
  { platform: 'Reddit r/PPC & Paid Ads', domain: 'reddit.com', da: 97, type: 'Niche Community', getSubmitUrl: (slug) => `https://www.reddit.com/r/PPC/submit`, getStrategy: (title) => `Share high-effort case study or breakdown answering user questions, link at bottom for full spreadsheets.` },
  { platform: 'Reddit r/marketing', domain: 'reddit.com', da: 97, type: 'Niche Community', getSubmitUrl: (slug) => `https://www.reddit.com/r/marketing/submit`, getStrategy: (title) => `Publish framework breakdown, engage in comments, and cite article as detailed reference.` },
  { platform: 'Reddit r/ecommerce', domain: 'reddit.com', da: 97, type: 'E-commerce Community', getSubmitUrl: (slug) => `https://www.reddit.com/r/ecommerce/submit`, getStrategy: (title) => `Post direct solution to ROAS/CAC pain points, linking to the full guide.` },
  { platform: 'Reddit r/artificial & AI Tools', domain: 'reddit.com', da: 97, type: 'AI Creators Community', getSubmitUrl: (slug) => `https://www.reddit.com/r/artificial/submit`, getStrategy: (title) => `Share prompt architectures and video generation results with workflow link.` },
  { platform: 'Quora High-Traffic Question Hub', domain: 'quora.com', da: 93, type: 'Q&A Authority Platform', getSubmitUrl: (slug) => `https://www.quora.com/search?q=${encodeURIComponent(slug.replace(/-/g, ' '))}`, getStrategy: (title) => `Write comprehensive top-voted answer directly solving the problem and citing blog for full step-by-step.` },
  { platform: 'Indie Hackers Growth Forum', domain: 'indiehackers.com', da: 87, type: 'Startup & Growth Community', getSubmitUrl: (slug) => `https://www.indiehackers.com/post`, getStrategy: (title) => `Post growth experiment results, transparent numbers, and link to complete playbook.` },
  { platform: 'GrowthHackers Growth Experiments', domain: 'growthhackers.com', da: 81, type: 'Growth Platform', getSubmitUrl: (slug) => `https://growthhackers.com/posts/submit`, getStrategy: (title) => `Submit verified growth tactic with direct reference link to blog.` },
  { platform: 'Hacker News Show HN / Discussion', domain: 'news.ycombinator.com', da: 93, type: 'Tech Aggregator', getSubmitUrl: (slug) => `https://news.ycombinator.com/submit`, getStrategy: (title) => `Submit technical deep dive or algorithmic analysis for high-traffic discussion.` }
];

const curationPlatforms = [
  { platform: 'GitHub Awesome Marketing & AI Lists', domain: 'github.com', da: 96, type: 'Curated Resource Hub', getSubmitUrl: (slug) => `https://github.com/search?q=awesome+marketing+OR+awesome+ai+video`, getStrategy: (title) => `Submit PR adding the guide as a premier curated resource in Awesome-Marketing or Awesome-AI-Video repositories.` },
  { platform: 'Flipboard Curated Magazine', domain: 'flipboard.com', da: 91, type: 'Curation Magazine', getSubmitUrl: (slug) => `https://flipboard.com`, getStrategy: (title) => `Add article to "Modern Performance Marketing 2026" magazine for ongoing viral reader discovery.` },
  { platform: 'Scoop.it Topic Authority Hub', domain: 'scoop.it', da: 88, type: 'Content Curation', getSubmitUrl: (slug) => `https://www.scoop.it/t/performance-marketing-ai-creative`, getStrategy: (title) => `Curate with custom summary and high-intent anchor link to establish topical relevance.` },
  { platform: 'Mix.com Discovery Engine', domain: 'mix.com', da: 84, type: 'Content Discovery', getSubmitUrl: (slug) => `https://mix.com`, getStrategy: (title) => `Submit URL to relevant collections (Digital Marketing, AI Video, E-Commerce Growth).` },
  { platform: 'Diigo Research & Knowledge Cloud', domain: 'diigo.com', da: 86, type: 'Knowledge Bookmarking', getSubmitUrl: (slug) => `https://www.diigo.com/post`, getStrategy: (title) => `Bookmark with industry tags (#metaads #aivideo #cro #b2b) for academic and practitioner citation.` },
  { platform: 'Pearltrees Visual Research Collection', domain: 'pearltrees.com', da: 85, type: 'Knowledge Tree', getSubmitUrl: (slug) => `https://www.pearltrees.com`, getStrategy: (title) => `Add article node inside global digital marketing strategy knowledge tree.` }
];

const b2bPlatforms = [
  { platform: 'BizSugar Small Business & Marketing Hub', domain: 'bizsugar.com', da: 76, type: 'B2B Community', getSubmitUrl: (slug) => `https://www.bizsugar.com/submit`, getStrategy: (title) => `Submit business strategy breakdown with peer upvoting and category indexing.` },
  { platform: 'Feedspot Top Marketing Blogs Index', domain: 'feedspot.com', da: 79, type: 'RSS & Blog Directory', getSubmitUrl: (slug) => `https://www.feedspot.com`, getStrategy: (title) => `List blog in targeted niche feeds (Meta Ads, AI Video, E-Commerce CRO) for syndicated backlink authority.` },
  { platform: 'Alltop Digital Marketing Feed', domain: 'alltop.com', da: 77, type: 'News Aggregator', getSubmitUrl: (slug) => `https://alltop.com/submission`, getStrategy: (title) => `Submit RSS feed and individual viral posts to digital marketing section.` },
  { platform: 'Slashdot Tech Discussion', domain: 'slashdot.org', da: 91, type: 'Tech Forum & Submissions', getSubmitUrl: (slug) => `https://slashdot.org/submission`, getStrategy: (title) => `Submit AI video and algorithmic marketing analysis for editorial review.` },
  { platform: 'Pinterest High-CTR Infographic Pin', domain: 'pinterest.com', da: 94, type: 'Visual Search Engine', getSubmitUrl: (slug) => `https://www.pinterest.com/pin-creation-tool`, getStrategy: (title) => `Create vertical infographic pin summarizing key framework, linking destination directly to blog post.` },
  { platform: 'Digg Curated Web Stories', domain: 'digg.com', da: 90, type: 'Content Aggregator', getSubmitUrl: (slug) => `https://digg.com/submit`, getStrategy: (title) => `Submit breakthrough marketing case study to business/tech channels.` }
];

const editorialPlatforms = [
  { platform: 'Connectively (formerly HARO) Source Pitch', domain: 'connectively.us', da: 88, type: 'Journalist Outreach', getSubmitUrl: (slug) => `https://www.connectively.us`, getStrategy: (title) => `Pitch journalist queries looking for marketing/AI experts, citing article as proof of expertise and reference.` },
  { platform: 'Featured.com (Terkel) Expert Quote', domain: 'featured.com', da: 74, type: 'Expert Roundup', getSubmitUrl: (slug) => `https://featured.com`, getStrategy: (title) => `Answer relevant weekly prompts on advertising, AI, or growth, earning authoritative editorial quotes.` },
  { platform: 'MarketingProfs Guest Contribution', domain: 'marketingprofs.com', da: 82, type: 'Industry Publication', getSubmitUrl: (slug) => `https://www.marketingprofs.com/write-for-us`, getStrategy: (title) => `Pitch comprehensive methodology derived from blog, embedding backlink in author bio and body.` },
  { platform: 'Search Engine Land / Roundtable Community', domain: 'searchengineland.com', da: 91, type: 'Search & Ad Authority', getSubmitUrl: (slug) => `https://searchengineland.com/contact-us`, getStrategy: (title) => `Share novel algorithmic observation (Advantage+, GEO, LLM search) for news coverage.` },
  { platform: 'DTC Newsletter Sponsorship & Guest Feature', domain: 'substack.com', da: 85, type: 'Niche Newsletter', getSubmitUrl: (slug) => `https://substack.com/discover`, getStrategy: (title) => `Partner with e-commerce / DTC newsletter creators for cross-promotion and deep-dive backlink.` }
];

console.log(`Generating 5 tailored backlinks for all ${DEFAULT_BLOG_POSTS.length} blogs (${DEFAULT_BLOG_POSTS.length * 5} total backlinks)...`);

const allRows = [];
let count = 0;

DEFAULT_BLOG_POSTS.forEach((blog, idx) => {
  const blogUrl = `${targetDomain}/blog/${blog.slug}`;
  
  // Pick 5 platforms across the 5 archetypes with rotation
  const p1 = syndicationPlatforms[idx % syndicationPlatforms.length];
  const p2 = communityPlatforms[idx % communityPlatforms.length];
  const p3 = curationPlatforms[idx % curationPlatforms.length];
  const p4 = b2bPlatforms[idx % b2bPlatforms.length];
  const p5 = editorialPlatforms[idx % editorialPlatforms.length];

  const assigned = [p1, p2, p3, p4, p5];

  // Specific contextual anchors based on the blog title and keywords
  const cleanTitle = blog.title.replace(/[^\w\s-]/g, '').trim();
  const anchorVariations = [
    cleanTitle,
    `${cleanTitle.split(' ').slice(0, 5).join(' ')} guide`,
    `${blog.category} case study`,
    `read full breakdown: ${cleanTitle}`,
    `Mayank Aggarwal's analysis on ${cleanTitle.split(' ').slice(0, 4).join(' ')}`
  ];

  assigned.forEach((plat, pIdx) => {
    count++;
    allRows.push({
      id: count,
      blogId: blog.id,
      blogIndex: idx + 1,
      blogTitle: blog.title,
      blogCategory: blog.category,
      targetBlogUrl: blogUrl,
      backlinkPlatform: plat.platform,
      platformDomain: plat.domain,
      domainAuthority: plat.da,
      platformType: plat.type,
      contextualAnchorText: anchorVariations[pIdx % anchorVariations.length],
      submissionUrl: plat.getSubmitUrl(blog.slug),
      executionStrategy: plat.getStrategy(blog.title)
    });
  });
});

console.log(`Generated ${allRows.length} high-quality blog-specific backlink opportunities.`);

// 1. Output CSV
const csvHeaders = [
  '#',
  'Blog #',
  'Blog Category',
  'Blog Title',
  'Target Inbound URL',
  'Backlink Platform',
  'Domain Authority (DA)',
  'Platform Type',
  'Contextual Anchor Text',
  'Submission / Outreach URL',
  'Actionable Strategy'
];

let csvContent = csvHeaders.map(escapeCsv).join(',') + '\n';
allRows.forEach((r) => {
  csvContent += [
    r.id,
    r.blogIndex,
    r.blogCategory,
    r.blogTitle,
    r.targetBlogUrl,
    r.backlinkPlatform,
    r.domainAuthority,
    r.platformType,
    r.contextualAnchorText,
    r.submissionUrl,
    r.executionStrategy
  ].map(escapeCsv).join(',') + '\n';
});

const csvOutputPath = path.resolve(rootDir, 'seo', '740-BLOG-SPECIFIC-HIGH-QUALITY-BACKLINKS.csv');
fs.writeFileSync(csvOutputPath, csvContent, 'utf8');
console.log(`✓ Saved CSV: ${csvOutputPath}`);

// 2. Output Master Markdown Playbook
let mdContent = `# 740 High-Quality Blog-Specific Backlinks Master Playbook (2026)

This database provides **740 tailored, contextual, high-Domain-Authority (DA 70–98) backlink opportunities** engineered specifically for all **148 published blogs** on [Mayank Aggarwal's Portfolio & Agency Website](https://mayankaggarwal-one.vercel.app/).

Every single blog has **5 distinct backlink placements** across:
1. **Tier-1 Canonical Syndication** (Medium, LinkedIn Pulse, Substack, Dev.to, Hashnode, Hackernoon)
2. **High-Intent Community Discussions** (Reddit r/PPC, r/marketing, r/ecommerce, r/artificial, Quora, Indie Hackers, GrowthHackers)
3. **Curated Resource Hubs & Repositories** (GitHub Awesome Lists, Flipboard, Scoop.it, Mix, Diigo)
4. **B2B Growth & News Aggregators** (BizSugar, Feedspot, Alltop, Pinterest Rich Pins, Digg)
5. **Editorial PR & Expert Roundups** (Connectively/HARO, Featured.com, MarketingProfs, Search Engine Land)

---

## 📊 Summary by Cluster

| Blog Cluster | Number of Blogs | High-Quality Backlinks Generated | Target Anchor Strategy |
| :--- | :---: | :---: | :--- |
| **🌍 International & Geo-Targeted Strategy** | 98 | **490 Backlinks** | US, UK, UAE, Australia, Canada, Singapore localized commercial terms |
| **📈 Meta Ads & Performance Marketing** | 10 | **50 Backlinks** | CBO scaling, Advantage+, ROAS, algorithmic ad buying |
| **🎬 AI Video Production & Cinematics** | 8 | **40 Backlinks** | Runway Gen-3, Kling, Sora, Midjourney commercial filmmaking |
| **🎙️ AI Voiceover & Multilingual Audio** | 6 | **30 Backlinks** | ElevenLabs cloning, voice synthesis, audio post-production |
| **✍️ Content Strategy & Viral Hooks** | 8 | **40 Backlinks** | 3-second hook retention, omni-channel distribution |
| **🔍 SEO, AEO & Generative Engine Optimization (GEO)** | 8 | **40 Backlinks** | LLM citations, Perplexity/ChatGPT search ranking |
| **🛒 E-Commerce & Conversion Optimization (CRO)** | 5 | **25 Backlinks** | Checkout friction, landing page teardowns, A/B testing |
| **💼 Career Insights & Agency Strategy** | 5 | **25 Backlinks** | Fractional CMO, retainer pricing, freelance vs agency |
| **Total** | **148 Blogs** | **740 High-DA Backlinks** | **100% Contextual & Actionable** |

---

## 🎯 Master Directory: 5 Contextual Backlinks for Every Blog

`;

// Group by blog
let currentBlogIdx = -1;
allRows.forEach((r) => {
  if (r.blogIndex !== currentBlogIdx) {
    currentBlogIdx = r.blogIndex;
    mdContent += `\n### Blog #${r.blogIndex}: [${r.blogTitle}](${r.targetBlogUrl})\n`;
    mdContent += `*Category: ${r.blogCategory}* | *URL:* \`${r.targetBlogUrl}\`\n\n`;
    mdContent += `| # | Platform | DA | Type | Contextual Anchor Text | Submission / Action URL | Execution Strategy |\n`;
    mdContent += `| :---: | :--- | :---: | :--- | :--- | :--- | :--- |\n`;
  }
  mdContent += `| **${r.id}** | **${r.backlinkPlatform}** | **${r.domainAuthority}** | ${r.platformType} | \`${r.contextualAnchorText}\` | [Submit Here](${r.submissionUrl}) | ${r.executionStrategy} |\n`;
});

mdContent += `\n---\n\n## 🚀 Recommended Weekly Backlink Sprint Plan (740 Total)\n\n- **Week 1 (Top 20 Blogs)**: Publish Medium & LinkedIn canonical excerpts with do-follow author links (100 backlinks).\n- **Week 2 (International Geo Blogs)**: Submit targeted answers on Quora & Reddit r/PPC referencing localized city playbooks (150 backlinks).\n- **Week 3 (Tools & AI Video Blogs)**: Submit PRs to GitHub Awesome Lists and publish Dev.to/Hashnode tutorials (150 backlinks).\n- **Week 4 (Curation & Aggregators)**: Curate into Flipboard, Scoop.it, BizSugar, and Feedspot (150 backlinks).\n- **Week 5 (Editorial & PR)**: Respond to daily Connectively / Featured.com queries with expert quotes citing specific blogs (190 backlinks).\n`;

const mdOutputPath = path.resolve(rootDir, 'seo', '740-BLOG-SPECIFIC-HIGH-QUALITY-BACKLINKS.md');
fs.writeFileSync(mdOutputPath, mdContent, 'utf8');
console.log(`✓ Saved Markdown Playbook: ${mdOutputPath}`);
