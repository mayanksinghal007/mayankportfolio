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
  Download,
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

import { getPersonSchema, getOrganizationSchema, getLocalBusinessSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export const About = () => {
  const { site, mediaAssets = {} } = useSite();

  const aboutSchemas = [
    getPersonSchema(),
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([{ name: 'About Mayank', path: '/about' }]),
  ];

  return (
    <>
      <SeoHead
        title="About Mayank Aggarwal | Digital Marketing & AI"
        description="About Mayank Aggarwal — Digital Marketing & AI Specialist in Delhi with 1 year experience in Meta Ads, AI video creation, and creative direction."
        canonicalPath="/about"
        ogImage="/images/mayank-aggarwal-og.jpg"
        jsonLd={aboutSchemas}
      >
        <link rel="preload" as="image" href="/images/mayank-aggarwal.webp" type="image/webp" fetchPriority="high" />
      </SeoHead>

      {/* ABOUT HEADER SECTION */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs items={[{ name: 'About Mayank', path: '/about' }]} />
          <div className="hero-grid-split">
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
                  href={site.cvUrl || '/Mayank_Aggarwal_Resume.pdf'}
                  download="Mayank_Aggarwal_Resume.pdf"
                  rel="nofollow"
                  className="btn-secondary"
                  title="Download Mayank Aggarwal CV (PDF)"
                >
                  <Download size={16} /> Download CV
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-secondary"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
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
                  <picture>
                    <source srcSet="/images/mayank-aggarwal.webp" type="image/webp" />
                    <img
                      src="/images/mayank-aggarwal.jpg"
                      alt="Mayank Aggarwal, Digital Marketing and AI Specialist based in Delhi, India"
                      width="850"
                      height="1106"
                      fetchPriority="high"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                      }}
                    />
                  </picture>

                  {/* Dark gradient overlay for crystal-clear caption contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 10, 12, 0.96) 0%, rgba(10, 10, 12, 0.65) 32%, rgba(10, 10, 12, 0.15) 55%, transparent 75%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Caption & Entity Identity with High-Contrast Text */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '24px',
                      right: '24px',
                      color: '#FFFFFF',
                      zIndex: 2,
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--brand)', color: '#FFFDF9', padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                      <Sparkles size={12} /> Delhi, India
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1.1, color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.85)', margin: 0 }}>
                      MAYANK AGGARWAL
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#FFFDF9', marginTop: '6px', fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.85)', letterSpacing: '0.01em' }}>
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

      {/* AUTHORITATIVE ENTITY DETAILS (NAP & GEO CONSISTENCY) */}
      <section className="section-pad" style={{ paddingTop: '0px', paddingBottom: '40px' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--peach)',
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid var(--brand)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 36px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span className="editorial-eyebrow" style={{ color: 'var(--brand)' }}>Authoritative Entity Details</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginTop: '4px', textTransform: 'none' }}>
                  Mayank Aggarwal — Practitioner Overview
                </h2>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--mutedtext)', backgroundColor: 'var(--purewhite)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                Delhi, India · Local & Global Remote Practice
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', fontSize: '0.92rem', color: 'var(--charcoal)', marginTop: '20px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Full Name & Role</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>Mayank Aggarwal</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Digital Marketing & AI Specialist</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Brand / Operating Practice</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>Klikwise</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Freelance & Growth Consulting</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Location & Service Area</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>Delhi, India (NCR)</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Serving Pan-India & Global Remote Clients</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Hands-on Experience</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>1 Year of Hands-on Experience</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Meta Ads, AI Video & Short-Form Content</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Education & Alma Mater</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>B.Com (Hons.)</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Shaheed Bhagat Singh College, University of Delhi</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>Direct Contact & Response</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>riyansh.studio007@gmail.com · +91 9217756033</div>
                <div style={{ color: 'var(--mutedtext)', fontSize: '0.85rem' }}>Replies within 12 hours</div>
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
