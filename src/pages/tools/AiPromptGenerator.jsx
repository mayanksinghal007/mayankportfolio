import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CtaBanner } from '../../components/CtaBanner';
import {
  Sparkles,
  Copy,
  Check,
  Video,
  Clapperboard,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Camera,
  Sun,
  Flame,
  Sliders
} from 'lucide-react';

export const AiPromptGenerator = () => {
  const [engine, setEngine] = useState('runway');
  const [subject, setSubject] = useState('Cold brew coffee bottle with condensation water droplets');
  const [lens, setLens] = useState('35mm anamorphic macro dolly-in');
  const [lighting, setLighting] = useState('softbox studio diffusion with rim glow');
  const [mood, setMood] = useState('minimalist high-fashion commercial');
  const [speed, setSpeed] = useState('smooth slow motion 60fps');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
      q: 'What is the best prompt formula for AI video generation?',
      a: 'The most effective commercial formula is: [Subject + Commercial Action] + [Camera Lens & Motion Angle] + [Lighting & Atmospheric Texture] + [Mood & Aesthetic Style] + [Technical Speed & Engine Physics].'
    },
    {
      q: 'Why do AI videos often suffer from limb distortion and jitter?',
      a: 'AI diffusion models struggle with complex rotational anatomy across time. Specifying exact camera movements (dolly vs pan), limiting sudden character turns, and applying clean image-to-video keyframing eliminates distortion.'
    },
    {
      q: 'Which engine is better for e-commerce ads: Runway Gen-3 or Kling AI?',
      a: 'Runway Gen-3 Alpha excels at luxury commercial lighting, reflective textures, and fluid camera trajectories. Kling AI 1.5 provides superior human anatomy realism and complex physical hand interactions.'
    },
    {
      q: 'How can brands maintain visual consistency across multiple AI scenes?',
      a: 'Use Midjourney v6.1 or Flux to create high-resolution reference character and product portraits, then feed these hero images into Runway or Kling using Image-to-Video mode.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="editorial-tool-page">
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

      {/* Hero Header */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Interactive Tools', path: '/tools/ai-video-prompt-generator' },
              { name: 'AI Video Prompt Generator' }
            ]}
          />
          <div style={{ maxWidth: '840px' }}>
            <span className="editorial-eyebrow">Generative AI Studio</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              AI VIDEO AD <span className="brand-span">PROMPT GENERATOR.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '740px' }}>
              Engineer broadcast-quality commercial video prompts for Runway Gen-3, Kling AI, and Midjourney v6.1 with calibrated camera physics and lighting controls.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Studio Grid */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="tool-dashboard-grid">
            {/* Left Column: Cinematographic Controls */}
            <div className="tool-panel-card">
              <div className="tool-panel-header">
                <div className="tool-panel-title">
                  <Clapperboard size={22} color="var(--brand)" />
                  <span>Cinematographic Parameters</span>
                </div>
                <span className="badge-pill" style={{ fontSize: '0.74rem' }}>v6.1 Studio</span>
              </div>

              {/* Target Engine */}
              <div className="tool-input-group">
                <label htmlFor="engineSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Target AI Video Engine
                </label>
                <select
                  id="engineSelect"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="tool-select"
                >
                  <option value="runway">Runway Gen-3 Alpha (Camera Physics & Diffusion)</option>
                  <option value="kling">Kling AI 1.5 (Complex Anatomy & Fluid Physics)</option>
                  <option value="midjourney">Midjourney v6.1 (Master Keyframe Photography)</option>
                  <option value="luma">Luma Dream Machine (Dynamic Camera Flythroughs)</option>
                </select>
              </div>

              {/* Subject Input */}
              <div className="tool-input-group">
                <label htmlFor="subjectInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Subject & Commercial Action
                </label>
                <input
                  id="subjectInput"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Cold brew coffee bottle with condensation water droplets"
                  className="tool-number-input"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>

              {/* 2-Column Selects: Lens & Lighting */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="lensSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Camera Movement
                  </label>
                  <select
                    id="lensSelect"
                    value={lens}
                    onChange={(e) => setLens(e.target.value)}
                    className="tool-select"
                  >
                    <option value="35mm anamorphic macro dolly-in">35mm Anamorphic Dolly-In</option>
                    <option value="85mm telephoto orbit at eye level">85mm Telephoto Orbit</option>
                    <option value="ultra-wide 16mm low-angle tracking shot">16mm Low-Angle Track</option>
                    <option value="macro probe lens sliding through interior">Macro Probe Lens Push</option>
                    <option value="FPV cinematic drone dive">FPV Cinematic Drone Dive</option>
                  </select>
                </div>

                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="lightingSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Lighting Diffusion
                  </label>
                  <select
                    id="lightingSelect"
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    className="tool-select"
                  >
                    <option value="softbox studio diffusion with rim glow">Softbox & Rim Glow</option>
                    <option value="golden hour warm sunlight through sheer curtains">Golden Hour Sunlight</option>
                    <option value="moody cyber neon cyan and magenta chiaroscuro">Cyber Neon Chiaroscuro</option>
                    <option value="dramatic high-contrast product top-down spotlight">Top-Down Spotlight</option>
                  </select>
                </div>
              </div>

              {/* 2-Column Selects: Mood & Speed */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 0 }}>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="moodSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Aesthetic Mood
                  </label>
                  <select
                    id="moodSelect"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="tool-select"
                  >
                    <option value="minimalist high-fashion commercial">Minimalist High-Fashion</option>
                    <option value="gritty documentary authentic grain">Gritty 35mm Documentary</option>
                    <option value="energetic kinetic commercial ad">Kinetic Fast Commercial</option>
                    <option value="serene organic botanical wellness">Organic Wellness</option>
                  </select>
                </div>

                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="speedSelect" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Frame Rate & Motion
                  </label>
                  <select
                    id="speedSelect"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="tool-select"
                  >
                    <option value="smooth slow motion 60fps">Smooth Slow Motion 60fps</option>
                    <option value="fluid real-time natural physics">Natural Real-Time Speed</option>
                    <option value="rapid whip-pan transition">Dynamic Whip-Pan</option>
                    <option value="floating zero-gravity suspension">Zero-Gravity Floating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Synthesized Output Terminal */}
            <div className="tool-panel-dark">
              <div>
                <div className="tool-panel-header">
                  <div className="tool-panel-title">
                    <Video size={22} color="var(--gold)" />
                    <span>Synthesized Generation Prompt</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: copied ? '#10B981' : 'var(--brand)',
                      color: 'var(--softwhite)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(255, 61, 10, 0.3)'
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Prompt'}</span>
                  </button>
                </div>

                {/* Prompt Code Block */}
                <div className="tool-prompt-box">
                  {generatedPrompt}
                </div>

                {/* Negative Prompt Recommendation */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--charcoal-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px 20px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'rgba(255, 253, 249, 0.6)',
                      marginBottom: '6px'
                    }}
                  >
                    Recommended Negative Prompt:
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: '#FCA5A5',
                      lineHeight: '1.6',
                      margin: 0
                    }}
                  >
                    {negativePrompt}
                  </p>
                </div>
              </div>

              {/* Bottom Service Link */}
              <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--charcoal-border)' }}>
                <Link
                  to="/services/ai-video-creation"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: '0.95rem' }}
                >
                  Explore Full AI Commercial Video Production <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* Educational Framework */}
          <div
            style={{
              backgroundColor: 'var(--purewhite)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '42px 36px',
              marginTop: '48px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span className="editorial-eyebrow">Cinematography Guidelines</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem',
                color: 'var(--charcoal)',
                marginTop: '12px',
                marginBottom: '16px'
              }}
            >
              The 5-Part Commercial Video Prompt Formula
            </h2>
            <div style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              <p style={{ marginBottom: '14px' }}>
                High-end commercial AI video does not come from generic descriptions like "cinematic video of coffee". Video diffusion foundation models require explicit instruction across five distinct dimensions:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
                <li style={{ padding: '18px', backgroundColor: 'var(--peach)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ display: 'block', color: 'var(--charcoal)', marginBottom: '4px' }}>1. Physical Subject</strong>
                  Specific materials, wetness, condensation, textures, and hero object placement.
                </li>
                <li style={{ padding: '18px', backgroundColor: 'var(--peach)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ display: 'block', color: 'var(--charcoal)', marginBottom: '4px' }}>2. Lens Optics</strong>
                  Focal lengths (35mm vs 85mm), anamorphic bokeh, and camera movement (dolly, orbit).
                </li>
                <li style={{ padding: '18px', backgroundColor: 'var(--peach)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ display: 'block', color: 'var(--charcoal)', marginBottom: '4px' }}>3. Studio Lighting</strong>
                  Rim glow, softbox diffusion, chiaroscuro contrast, or golden hour warm sun rays.
                </li>
                <li style={{ padding: '18px', backgroundColor: 'var(--peach)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ display: 'block', color: 'var(--charcoal)', marginBottom: '4px' }}>4. Motion Magnitude</strong>
                  Controlled fluid movement, slow motion 60fps to prevent anatomical warping.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Creative Questions</span>
            <h2 className="display-title section-title">AI VIDEO CINEMATOGRAPHY FAQS.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
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
        eyebrow="Commercial AI Video"
        title="READY TO PRODUCE CINEMATIC AI ADS?"
        subtitle="Let's script, render, and assemble high-converting AI video ads for your product catalog using Runway Gen-3, Kling AI, and custom voiceovers."
        primaryLabel="Inquire About AI Video"
        primaryTo="/contact"
      />
    </div>
  );
};
