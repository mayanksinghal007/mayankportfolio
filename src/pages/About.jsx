import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { useSite } from '../context/SiteContext';
import { CtaBanner } from '../components/CtaBanner';
import {
  EXPERIENCE_ITEMS,
  EDUCATION_ITEMS,
  SKILL_CATEGORIES,
  WHY_CHOOSE_ME,
} from '../data/initialData';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const About = () => {
  const { site } = useSite();

  return (
    <>
      <SeoHead
        title="About Mayank Aggarwal | Digital Marketer & AI Specialist"
        description="Learn about Mayank Aggarwal, a Digital Marketing & AI Specialist from Delhi, India with 1 year of hands-on experience in Meta Ads, AI video, and creative direction."
        canonicalPath="/about"
      />

      {/* ABOUT HEADER SECTION */}
      <section className="section-pad" style={{ paddingTop: '150px' }}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'About Mayank', path: '/about' }]} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '60px',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            <div>
              <span className="editorial-eyebrow">About Mayank Aggarwal</span>
              <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
                CREATIVE VISION.{' '}
                <span className="brand-span">PERFORMANCE RIGOR.</span>{' '}
                <span className="serif-span">MODERN</span> SPEED.
              </h1>

              <div style={{ fontSize: '1.05rem', color: 'var(--mutedtext)', lineHeight: 1.8, marginBottom: '32px' }}>
                <p style={{ marginBottom: '16px' }}>
                  I'm Mayank Aggarwal, a <strong>Digital Marketing & AI Specialist</strong> based in <strong>Delhi, India</strong>. I operate at the intersection of quantitative growth marketing and bleeding-edge generative AI production.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Too often, brands are caught between traditional agencies that move too slowly or creative freelancers who don't understand customer acquisition costs (CAC) and ROAS. I solve that disconnect by pairing data-driven Meta ad campaign architecture with viral short-form reel hooks and studio-quality AI video/audio.
                </p>
                <p>
                  With 1 year of hands-on experience managing freelance campaigns at <strong>Klikwise</strong>, driving marketing workflows at <strong>ENKT AI</strong>, and executing organic SEO campaigns at <strong>DIDMIN</strong>, I treat every engagement with complete transparency and focused execution.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link to="/contact" className="btn-primary">
                  Start a Project <ArrowUpRight size={16} />
                </Link>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <InstagramIcon size={16} /> Instagram
                </a>
              </div>
            </div>

            {/* Profile Editorial Card */}
            <div>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--charcoal)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    backgroundColor: '#222',
                  }}
                >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                      alt="Mayank Aggarwal"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(20,20,20,0.95) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '24px',
                      right: '24px',
                      color: 'var(--softwhite)',
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--brand)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                      <Sparkles size={12} /> Delhi, India
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', lineHeight: 1 }}>
                      MAYANK AGGARWAL
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,253,249,0.8)', marginTop: '4px' }}>
                      Digital Marketing & AI Specialist
                    </p>
                  </div>
                </div>

                {/* Quick Info Points */}
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#fff' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 700 }}>Focus</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Meta Ads & AI Video</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#fff' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 700 }}>Status</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Accepting Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED PROFESSIONAL EXPERIENCE */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow">Work History</span>
            <h2 className="display-title section-title">HANDS-ON STARTUP & AGENCY TRACK RECORD.</h2>
            <p className="section-desc">
              Every insight I bring to your project is grounded in real execution, live campaign budgets, and verified performance.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {EXPERIENCE_ITEMS.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-org" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={17} />
                      <span>{exp.org}</span>
                      <span style={{ color: 'var(--mutedtext)', fontWeight: 400 }}>· {exp.location}</span>
                    </div>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>

                <p style={{ color: 'var(--charcoal)', fontWeight: 500, fontSize: '0.98rem', marginBottom: '16px' }}>
                  {exp.description}
                </p>

                <ul className="exp-points">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="exp-point-item">
                      <span className="exp-point-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="section-pad" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow">Academic Foundation</span>
            <h2 className="display-title section-title">EDUCATION & COMMERCE RIGOR.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {EDUCATION_ITEMS.map((edu) => (
              <div
                key={edu.id}
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}
              >
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--cream)',
                      color: 'var(--brand)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--charcoal)' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand)', marginBottom: '8px' }}>
                      {edu.institution}
                    </p>
                    <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', maxWidth: '640px' }}>
                      {edu.details}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--softwhite)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--charcoal)',
                  }}
                >
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLS TOOLKIT */}
      <section className="section-pad" style={{ backgroundColor: 'var(--charcoal)', color: 'var(--softwhite)' }}>
        <div className="container">
          <div className="section-head">
            <span className="editorial-eyebrow gold">Technical & Creative Arsenal</span>
            <h2 className="display-title section-title" style={{ color: 'var(--softwhite)' }}>
              THE MODERN MARKETING & AI STACK.
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255, 253, 249, 0.75)' }}>
              I actively master the latest platforms to stay ahead of the curve and deliver maximum return on creative effort.
            </p>
          </div>

          <div className="skills-grid">
            {Object.entries(SKILL_CATEGORIES).map(([category, skills], i) => (
              <div
                key={category}
                className="skill-category-card"
                style={{
                  backgroundColor: 'var(--charcoal-card)',
                  borderColor: 'var(--charcoal-border)',
                  color: 'var(--softwhite)',
                }}
              >
                <h3
                  className="skill-cat-title"
                  style={{
                    color: i === 1 ? 'var(--gold)' : 'var(--softwhite)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {category}
                </h3>
                <div className="skill-tags-cloud">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        color: 'var(--softwhite)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & WORK ETHIC */}
      <section className="section-pad">
        <div className="container">
          <div className="section-head center">
            <span className="editorial-eyebrow">Operating Philosophy</span>
            <h2 className="display-title section-title">HOW I APPROACH EVERY ENGAGEMENT.</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <div style={{ color: 'var(--brand)', marginBottom: '14px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Zero Fluff, 100% Transparency
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                I don't deliver vanity metrics or hide behind technical jargon. You get clear dashboards showing exact spend, clicks, conversion rates, and ROAS.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <div style={{ color: 'var(--brand)', marginBottom: '14px' }}>
                <Award size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Quality Over Excessive Output
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                Posting 10 mediocre reels a week only harms brand perception. We craft 3-4 scroll-stopping pieces that people actually save, share, and act upon.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--purewhite)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
              }}
            >
              <div style={{ color: 'var(--brand)', marginBottom: '14px' }}>
                <Sparkles size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '10px' }}>
                Agile AI Evolution
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                The AI media landscape changes every month. I continuously test new model releases so your brand stays months ahead of slower legacy competitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        eyebrow="Direct Founder Access"
        title="READY TO ELEVATE YOUR BRAND?"
        subtitle="Schedule a free discovery session with Mayank to map out your campaign strategy."
      />
    </>
  );
};
