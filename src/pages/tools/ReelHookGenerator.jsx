import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Zap, Copy, Check, Flame, HelpCircle, ArrowRight, Play } from 'lucide-react';

export const ReelHookGenerator = () => {
  const [niche, setNiche] = useState('d2c');
  const [archetype, setArchetype] = useState('contrarian');
  const [topic, setTopic] = useState('Meta Ads ROAS');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const hookTemplates = useMemo(() => {
    return [
      {
        title: "The Direct Loss Warning",
        text: `Stop wasting money on ${topic} until you fix this one setting.`,
        sfx: "Record scratch / Sudden audio mute",
        visual: "Extreme macro punch-in on face at 1.2s",
        retention: "Est. 74% at 3s"
      },
      {
        title: "The Inverted Proof Hook",
        text: `How we generated ₹10 Lakhs with ${topic} without touching custom audiences.`,
        sfx: "Sub-bass drop + camera shutter click",
        visual: "Hold phone to screen showing verified dashboard metric",
        retention: "Est. 71% at 3s"
      },
      {
        title: "The Controversial Truth",
        text: `Most agencies are lying to you about ${topic}. Here is what actually works in 2026.`,
        sfx: "Risotto riser whoosh into sudden silence",
        visual: "Toss a printed report or notebook onto desk",
        retention: "Est. 76% at 3s"
      },
      {
        title: "The Niche Call-Out",
        text: `If you're running ${topic} in India with under ₹50k monthly budget, do not scroll.`,
        sfx: "Warning buzzer click or metallic ding",
        visual: "Point directly into camera lens with kinetic subtitle burst",
        retention: "Est. 68% at 3s"
      },
      {
        title: "The Framework Teardown",
        text: `I spent 40 hours testing ${topic}. Here is the 3-step cheat code in 45 seconds.`,
        sfx: "Clock ticking sound effect ramping in pitch",
        visual: "Numbered finger counter pop-up on screen",
        retention: "Est. 73% at 3s"
      }
    ];
  }, [topic]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const faqs = [
    {
      q: "Why are the first 3 seconds of a Reel so important?",
      a: "Instagram and TikTok algorithms compute viewer retention at the 3-second mark. If drop-off exceeds 40%, the video is algorithmically throttled and rarely shown to non-followers."
    },
    {
      q: "What is a visual pattern interrupt in short-form video?",
      a: "A visual pattern interrupt is an unexpected physical movement, rapid zoom, or sudden color transition occurring within the first 45 frames that disrupts passive thumb-scrolling."
    },
    {
      q: "Should on-screen text match the spoken hook word for word?",
      a: "Yes. Dual-coding theory shows that when viewers process spoken audio and bold on-screen subtitles simultaneously, comprehension and memory recall increase by over 60%."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-rose-500 selection:text-white">
      <SeoHead
        title="Viral Short-Form Reel Hook Generator for 2026"
        description="Free viral video hook generator for Instagram Reels, TikTok, and YouTube Shorts. Generate high-retention 3-second hooks with audio and visual cues."
        canonical="https://mayank-aggarwal.vercel.app/tools/reel-hook-generator"
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-rose-400">Home</Link>
          <span>/</span>
          <span className="text-slate-200">Tools</span>
          <span>/</span>
          <span className="text-rose-400">Reel Hook Generator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Algorithmic Retention Instrument</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Viral Reel & Short-Form Hook Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Generate high-converting 3-second hooks engineered to stop the infinite scroll and hold viewer retention past 65% on Instagram Reels, Shorts, and TikTok.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="topicInput" className="block text-xs font-semibold text-slate-300 mb-1">Target Topic or Skill</label>
              <input
                id="topicInput"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Meta Ads CAPI, Runway AI, Shopify CRO"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label htmlFor="nicheSelect" className="block text-xs font-semibold text-slate-300 mb-1">Target Niche</label>
              <select
                id="nicheSelect"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                <option value="d2c">D2C E-Commerce & Retail</option>
                <option value="b2b">B2B SaaS & Professional Services</option>
                <option value="agency">Agency & Freelance Consulting</option>
                <option value="personal">Personal Branding & Creators</option>
              </select>
            </div>

            <div>
              <label htmlFor="archetypeSelect" className="block text-xs font-semibold text-slate-300 mb-1">Psychological Trigger</label>
              <select
                id="archetypeSelect"
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                <option value="contrarian">Contrarian Shock & Inversion</option>
                <option value="warning">Loss Aversion & Warning</option>
                <option value="secret">Exclusivity & Gatekept Secret</option>
                <option value="speed">Rapid Action & Time Compression</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generated Hooks Cards */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-400" />
            <span>High-Retention Hook Variations</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {hookTemplates.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.retention}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.text, idx)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-semibold text-white mb-3">
                  "{item.text}"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                  <div>
                    <span className="text-slate-300 font-semibold">Visual Cut: </span>
                    <span>{item.visual}</span>
                  </div>
                  <div>
                    <span className="text-slate-300 font-semibold">Audio SFX: </span>
                    <span>{item.sfx}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Banner */}
        <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Want a Custom Performance Creative Strategy?</h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Let's craft high-converting video ad creatives, scripted UGC angles, and cinematic AI visuals tailored for your e-commerce brand or B2B offer.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Book a Creative Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Structured FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-rose-400" />
            <span>Short-Form Video Retention FAQs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
                <h3 className="font-bold text-sm text-white mb-2">{faq.q}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
