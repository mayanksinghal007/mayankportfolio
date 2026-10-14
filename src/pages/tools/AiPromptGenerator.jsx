import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Sparkles, Copy, Check, Video, Clapperboard, HelpCircle, ArrowRight } from 'lucide-react';

export const AiPromptGenerator = () => {
  const [engine, setEngine] = useState('runway');
  const [genre, setGenre] = useState('luxury-product');
  const [subject, setSubject] = useState('Cold brew coffee bottle with condensation water droplets');
  const [lens, setLens] = useState('35mm anamorphic macro dolly-in');
  const [lighting, setLighting] = useState('softbox studio diffusion with rim glow');
  const [mood, setMood] = useState('minimalist high-fashion commercial');
  const [speed, setSpeed] = useState('smooth slow motion 60fps');
  const [copied, setCopied] = useState(false);

  const generatedPrompt = useMemo(() => {
    if (engine === 'runway') {
      return `Cinematic commercial video: ${subject}. ${lens}, ${lighting}, ${mood}, ${speed}. High fidelity 4K texture, photorealistic rendering, zero motion blur, professional color grade.`;
    } else if (engine === 'kling') {
      return `${subject}, dynamic motion, ${lens}, lighting by ${lighting}, ${mood}, realistic fluid physics, ${speed}, photorealistic 8k, award winning commercial cinematography.`;
    } else if (engine === 'midjourney') {
      return `Commercial product photography of ${subject}, shot on 35mm anamorphic lens, ${lighting}, ${mood}, hyper-detailed surface textures, cinematic composition --ar 16:9 --style raw --v 6.1`;
    } else {
      return `Photorealistic 4K video: ${subject}. Camera movement: ${lens}. Atmosphere: ${lighting}, ${mood}. Motion dynamic: ${speed}.`;
    }
  }, [engine, subject, lens, lighting, mood, speed]);

  const negativePrompt = useMemo(() => {
    return 'distorted geometry, mutated limbs, flickering artifacts, low resolution, blown-out highlights, cartoon, oversaturated, text watermarks, jittery frame pacing.';
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const faqs = [
    {
      q: "What is the best prompt formula for AI video generation?",
      a: "The most effective structure is: [Subject + Action] + [Camera Lens & Motion Angle] + [Lighting & Atmospheric Texture] + [Mood & Style] + [Technical Parameters]."
    },
    {
      q: "Why do AI videos often suffer from limb distortion and jitter?",
      a: "AI diffusion models struggle with complex rotational anatomy across time. Reducing motion magnitude, specifying exact camera moves (dolly vs pan), and using image-to-video keyframing eliminates distortion."
    },
    {
      q: "Which engine is better for e-commerce ads: Runway Gen-3 or Kling AI?",
      a: "Runway Gen-3 Alpha excels at commercial lighting and fluid camera moves. Kling AI 1.5 provides superior human anatomy realism and complex physical interactions."
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
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-violet-500 selection:text-white">
      <SeoHead
        title="AI Video Ad Prompt Generator for Runway & Kling"
        description="Generate cinematic commercial AI video prompts for Runway Gen-3, Kling AI, and Midjourney. Fine-tune camera lenses, lighting, and motion parameters."
        canonical="https://mayank-aggarwal.vercel.app/tools/ai-video-prompt-generator"
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-violet-400">Home</Link>
          <span>/</span>
          <span className="text-slate-200">Tools</span>
          <span>/</span>
          <span className="text-violet-400">AI Prompt Generator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generative AI Creative Instrument</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            AI Video Ad Prompt Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Engineer broadcast-quality commercial video prompts for Runway Gen-3, Kling AI, and Midjourney v6.1 with calibrated camera physics and lighting controls.
          </p>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Form Parameters */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Clapperboard className="w-5 h-5 text-violet-400" />
              <span>Cinematographic Parameters</span>
            </h2>

            <div>
              <label htmlFor="engineSelect" className="block text-xs font-semibold text-slate-300 mb-1">Target AI Engine</label>
              <select
                id="engineSelect"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              >
                <option value="runway">Runway Gen-3 Alpha (Camera Physics)</option>
                <option value="kling">Kling AI 1.5 (Complex Anatomy & Motion)</option>
                <option value="midjourney">Midjourney v6.1 (Master Keyframe Photography)</option>
                <option value="luma">Luma Dream Machine (Dynamic Flythroughs)</option>
              </select>
            </div>

            <div>
              <label htmlFor="subjectInput" className="block text-xs font-semibold text-slate-300 mb-1">Subject & Commercial Action</label>
              <input
                id="subjectInput"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Luxury watch resting on obsidian volcanic stone with liquid splash"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lensSelect" className="block text-xs font-semibold text-slate-300 mb-1">Camera Lens & Movement</label>
                <select
                  id="lensSelect"
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="35mm anamorphic macro dolly-in">35mm Anamorphic Dolly-In</option>
                  <option value="85mm telephoto orbit at eye level">85mm Telephoto Slow Orbit</option>
                  <option value="ultra-wide 16mm low-angle tracking shot">16mm Low-Angle Tracking</option>
                  <option value="macro probe lens sliding through interior">Macro Probe Lens Push</option>
                  <option value="FPV cinematic drone dive">FPV Drone Dive</option>
                </select>
              </div>

              <div>
                <label htmlFor="lightingSelect" className="block text-xs font-semibold text-slate-300 mb-1">Lighting Atmosphere</label>
                <select
                  id="lightingSelect"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="softbox studio diffusion with rim glow">Studio Softbox & Rim Glow</option>
                  <option value="golden hour warm sunlight through sheer curtains">Golden Hour Sunlight</option>
                  <option value="moody cyber neon cyan and magenta chiaroscuro">Cyber Neon Chiaroscuro</option>
                  <option value="dramatic high-contrast product top-down spotlight">High-Contrast Spotlight</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="moodSelect" className="block text-xs font-semibold text-slate-300 mb-1">Aesthetic Mood</label>
                <select
                  id="moodSelect"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="minimalist high-fashion commercial">Minimalist High-Fashion</option>
                  <option value="gritty documentary authentic grain">Gritty 35mm Documentary</option>
                  <option value="energetic kinetic commercial ad">Kinetic Fast Commercial</option>
                  <option value="serene organic botanical wellness">Organic Wellness</option>
                </select>
              </div>

              <div>
                <label htmlFor="speedSelect" className="block text-xs font-semibold text-slate-300 mb-1">Motion Dynamics</label>
                <select
                  id="speedSelect"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="smooth slow motion 60fps">Slow Motion 60fps</option>
                  <option value="fluid real-time natural physics">Natural Real-Time Speed</option>
                  <option value="rapid whip-pan transition">Dynamic Whip-Pan</option>
                  <option value="floating zero-gravity suspension">Zero-Gravity Floating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Output Preview */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-violet-400" />
                  <span>Synthesized Generation Prompt</span>
                </h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-violet-200 leading-relaxed mb-4 select-all">
                {generatedPrompt}
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-400 mb-1">Recommended Negative Prompt:</div>
                <p className="font-mono text-xs text-rose-300 leading-relaxed">
                  {negativePrompt}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <Link
                to="/services/ai-video"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-500/20 transition-all"
              >
                <span>Explore Full AI Commercial Video Production</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Structured FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-violet-400" />
            <span>AI Video Cinematography FAQs</span>
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
