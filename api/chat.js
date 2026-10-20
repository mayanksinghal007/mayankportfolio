// Serverless API route for Vercel AI Gateway & Mayank Portfolio AI Assistant
// Accessible at: https://mayank-aggarwal.vercel.app/api/chat

const SYSTEM_PROMPT = `You are Mayank AI, the official AI Marketing & Strategy Assistant for Mayank Aggarwal (Founder of Klikwise, Digital Marketing & AI Specialist).

About Mayank Aggarwal:
- Background: Digital Marketing & AI Specialist with 1 year of hands-on experience in performance marketing, Meta Ads management, generative AI video production (Runway Gen-3, Kling AI, Midjourney), and short-form content strategy.
- Education: B.Com (Hons) graduate from Shaheed Bhagat Singh College, University of Delhi.
- Agency Brand: Klikwise (also worked with Eleveon, Krum, ENKT AI, DIDMIN).
- Location: Global / Remote (Delhi, India, serving clients in US, UK, India, and worldwide).
- Core Services:
  1. Performance Marketing (Meta Ads): Account structuring, Pixel & Conversions API (CAPI) setup, Advantage+ Shopping Campaigns (ASC), and creative fatigue testing.
  2. Generative AI Video Production: Commercials and UGC ads using Runway Gen-3 Alpha, Kling AI, Midjourney v6.1, and ElevenLabs neural audio.
  3. Short-Form Content & Reel Strategy: 3-second viral hooks, retention pacing, and 30-day content calendar execution.
  4. SEO & AEO (Answer Engine Optimization): Schema structuring, high-intent keywords, and brand visibility on ChatGPT/Perplexity.
- Contact & Booking:
  - WhatsApp: +91 9217756033 (Instant reachout: https://wa.me/919217756033)
  - Email: riyansh.studio007@gmail.com / contact.klikwise@gmail.com
  - Response Time: < 12 hours (usually under 1 hour on WhatsApp)
- Free Tools on Website:
  - Meta Ads ROAS Calculator: /tools/meta-ads-roas-calculator
  - AI Video Prompt Generator: /tools/ai-video-prompt-generator
  - Viral Reel Hook Generator: /tools/reel-hook-generator

Instructions:
1. Provide sharp, high-converting, actionable marketing and AI advice.
2. If asked about pricing or hiring, mention typical performance marketing retainers start from ₹30,000/mo ($500/mo) depending on ad spend and creative deliverables, and encourage scheduling a brief discovery call via WhatsApp (+91 9217756033).
3. If asked for ad hooks, prompts, or video angles, give creative, ready-to-use concepts.
4. Keep answers friendly, professional, concise, and structured.`;

// Intelligent Knowledge Fallback Engine for instant answers without latency
function getSmartFallbackResponse(userMessage) {
  const q = (userMessage || '').toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('fee') || q.includes('retainer') || q.includes('charge')) {
    return `### Mayank's Service Retainers & Pricing Structure 💼

Mayank works on tailored monthly retainers depending on business scope and creative volume:

1. **Meta Ads Management (Performance Retainer)**:
   - Starting from **₹30,000 – ₹55,000 / month** (or **$500 – $900 USD / mo** for international brands).
   - Includes full account restructuring, CAPI & Pixel tracking setup, Advantage+ campaigns, weekly creative testing, and weekly ROAS reporting.

2. **Generative AI Video & Creative Production**:
   - Starting from **₹25,000 / month** or per-asset packages.
   - Includes Runway Gen-3 Alpha / Kling AI motion generations, ElevenLabs voiceover, and DaVinci Resolve editing.

3. **Complete Full-Stack Growth (Ads + AI Creative + Content)**:
   - Custom retainer starting from **₹65,000 / month** ($1,100 USD/mo).

👉 *Need a custom quote for your specific ad spend?*  
Reach out directly on **WhatsApp (+91 9217756033)** or email **contact.klikwise@gmail.com** for a 15-minute audit call!`;
  }

  if (q.includes('hook') || q.includes('reel') || q.includes('script') || q.includes('viral')) {
    return `### High-Converting 3-Second Hooks for Your Ad 🎬

Here are 3 battle-tested hook formulas you can deploy immediately:

1. **The Pattern Interrupt (Visual + Text)**:
   - *"Stop scrolling if you're still doing [Common Mistake] in 2026..."*
   - Visual: Fast macro close-up or reversed motion action in first 0.8s.

2. **The Counter-Intuitive Truth**:
   - *"Why spending more on Meta Ads actually killed our client's profitability (and how we fixed it)..."*
   - Audio Cue: Deep whoosh sound effect with quick text pop.

3. **The Proof / Demonstration Hook**:
   - *"We tested 14 different creative hooks on Meta last week — only this one scaled to a 4.2x ROAS."*

👉 You can also explore Mayank's free **[Viral Reel Hook Generator](/tools/reel-hook-generator)** to generate dozens of categorized hooks in seconds!`;
  }

  if (q.includes('runway') || q.includes('kling') || q.includes('video') || q.includes('ai video') || q.includes('prompt')) {
    return `### AI Video Commercial Production Workflow 🚀

Mayank uses a hybrid generative video pipeline that cuts production costs by 80%:

1. **Base Plate Creation**: Midjourney v6.1 with cinematic 35mm anamorphic parameters and physical studio lighting.
2. **Motion Animation**:
   - **Runway Gen-3 Alpha**: For precise camera orbits, slow dolly-in pushes, and realistic reflections.
   - **Kling AI**: For fluid physics, liquid pouring, and complex character interactions.
3. **Sound & Voice Design**: ElevenLabs Multilingual v2 neural voiceover with commercial rights clearance.
4. **Post-Production**: DaVinci Resolve color grading, motion tracking brand logos, and 35mm film grain compositing.

👉 Test the interactive **[AI Video Prompt Generator](/tools/ai-video-prompt-generator)** on the site to create commercial camera prompts instantly!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('call') || q.includes('reach') || q.includes('email') || q.includes('whatsapp')) {
    return `### Connect Directly with Mayank Aggarwal 📲

Mayank is available for new client projects, performance audits, and retainer discussions:

- **WhatsApp (Fastest response - < 1 hour)**: [Chat on WhatsApp (+91 9217756033)](https://wa.me/919217756033?text=Hi%20Mayank,%20I%20would%20like%20to%20discuss%20a%20marketing%20project.)
- **Primary Inquiry Email**: [contact.klikwise@gmail.com](mailto:contact.klikwise@gmail.com)
- **Direct Email**: [riyansh.studio007@gmail.com](mailto:riyansh.studio007@gmail.com)
- **LinkedIn**: [linkedin.com/in/mayank-aggarwal-klikwise](https://lnkd.in/p/gfrXbbjH)
- **Instagram**: [@mayankaggarwal_7](https://www.instagram.com/mayankaggarwal_7)

Feel free to send a message with your website link and current ad spend for an instant audit!`;
  }

  // Default response
  return `### Hello! I'm Mayank AI 👋

I'm Mayank Aggarwal's digital marketing and AI assistant. Here is what I can help you with right now:

1. **Meta Ads & Performance Marketing**: How to scale Advantage+ campaigns, lower CPL, and set up Conversions API (CAPI).
2. **Generative AI Creative**: Commercial prompts for Runway Gen-3 Alpha, Kling AI, Midjourney, and ElevenLabs.
3. **Short-Form Reel Hooks**: 3-second retention formulas and 30-day content calendars.
4. **Retainers & Working with Mayank**: How to hire Mayank, scope of work, and scheduling an audit call.

*What business or marketing challenge are you looking to solve today?* You can also chat directly with Mayank on **[WhatsApp (+91 9217756033)](https://wa.me/919217756033)**!`;
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({
      status: 'active',
      service: 'Mayank Portfolio AI Gateway',
      version: '2026.1',
      supportedModes: ['chat', 'ad_hooks', 'prompts', 'audit'],
    });
  }

  try {
    const { messages = [], prompt = '' } = req.body || {};
    const latestUserMsg = prompt || (messages.length > 0 ? messages[messages.length - 1].content : '');

    const gatewayKey = process.env.VERCEL_AI_GATEWAY_KEY || process.env.AI_GATEWAY_API_KEY;

    // If Vercel AI Gateway key is present, attempt live upstream call
    if (gatewayKey) {
      try {
        const payloadMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ];

        // Vercel AI Gateway endpoint
        const response = await fetch('https://api.gateway.vercel.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${gatewayKey}`,
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            messages: payloadMessages,
            temperature: 0.7,
            max_tokens: 650,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data?.choices?.[0]?.message?.content;
          if (aiReply) {
            return res.status(200).json({
              reply: aiReply,
              source: 'vercel-ai-gateway',
            });
          }
        }
      } catch (upstreamErr) {
        console.warn('Vercel AI Gateway upstream fallback engaged:', upstreamErr.message);
      }
    }

    // High-intelligence fallback response
    const fallbackReply = getSmartFallbackResponse(latestUserMsg);
    return res.status(200).json({
      reply: fallbackReply,
      source: 'mayank-ai-knowledge-engine',
    });
  } catch (err) {
    console.error('API Chat error:', err.message);
    return res.status(200).json({
      reply: getSmartFallbackResponse(''),
      source: 'fallback',
    });
  }
}
