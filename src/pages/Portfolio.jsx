import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { MediaModal } from '../components/MediaModal';
import { CtaBanner } from '../components/CtaBanner';
import { PORTFOLIO_NOTE } from '../config/site';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

const CATEGORIES = [
  'All',
  'Performance Marketing',
  'Social Media Management',
  'AI Video & Filmmaking',
  'AI Voiceover',
  'AI Images & Creative Design',
  'Content & Reel Strategy',
  'SEO & Content',
];

import { getBreadcrumbSchema } from '../utils/seoSchemas';

export const Portfolio = () => {
  const { portfolio } = useSite();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeMedia, setActiveMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = portfolio.filter((project) => {
    if (!project.published) return false;
    if (activeFilter === 'All') return true;
    return project.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
           activeFilter.toLowerCase().includes(project.category.toLowerCase());
  });

  const handleOpenMedia = (project) => {
    setActiveMedia(project);
    setIsModalOpen(true);
  };

  const portfolioSchemas = [
    getBreadcrumbSchema([{ name: 'Portfolio', path: '/portfolio' }]),
  ];

  return (
    <>
      <SeoHead
        title="Portfolio & Case Studies | Mayank Aggarwal"
        description="Explore concept campaigns, AI video showreels, Meta ad funnels, and creative strategy projects by Mayank Aggarwal."
        canonicalPath="/portfolio"
        jsonLd={portfolioSchemas}
      />

      {/* PORTFOLIO HEADER */}
      <section className="section-pad" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'Portfolio', path: '/portfolio' }]} />
          <div style={{ maxWidth: '820px' }}>
            <span className="editorial-eyebrow">Case Studies & Creative Showcase</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              REAL WORK.{' '}
              <span className="brand-span">HONEST PROCESS.</span>
            </h1>
            <p className="hero-lead">
              Explore concept campaigns, generative AI video showreels, high-retention reel scripts, and conversion-optimized ad funnels. Each card details the creative strategy, tools, and execution methodology.
            </p>
            <div
              style={{
                marginTop: '16px',
                padding: '12px 18px',
                backgroundColor: 'var(--cream)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                color: 'var(--charcoal)',
                fontWeight: 500,
              }}
            >
              <Sparkles size={16} color="#FF3D0A" />
              <span>{PORTFOLIO_NOTE}</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs" style={{ marginTop: '36px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--cream)',
                border: '1.5px dashed var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                padding: '60px 40px',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              <Sparkles size={36} color="#FF3D0A" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '8px' }}>
                No Projects in this Filter Yet
              </h3>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginBottom: '24px' }}>
                All projects are dynamically synced with the Admin CMS. Check back shortly or view other categories.
              </p>
              <button onClick={() => setActiveFilter('All')} className="btn-primary">
                View All Projects
              </button>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div
                    className="project-media-wrap"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenMedia(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <span className="project-category-badge">{project.category}</span>

                    {(project.isSample || !project.verified) && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(25, 25, 25, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: 'var(--amber)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(255, 185, 46, 0.3)',
                        }}
                      >
                        Sample / Concept Project
                      </span>
                    )}

                    {(project.hasVideoDemo || project.hasAudioDemo) && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          background: 'rgba(25,25,25,0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          color: 'var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        <Play size={12} fill="var(--gold)" />
                        <span>Interactive Demo</span>
                      </div>
                    )}
                  </div>

                  <div className="project-body">
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        {project.client}
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-overview">{project.overview}</p>

                      {project.results && (
                        <div className="project-results-box">
                          <strong>{project.verified ? 'Results: ' : 'Approach & Method: '}</strong>
                          {project.results}
                        </div>
                      )}

                      {/* Metrics Row - only when verified is true */}
                      {project.verified && project.metrics && project.metrics.length > 0 && (
                        <div className="project-metrics-row">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="project-metric-item">
                              <div className="val">{m.val}</div>
                              <div className="lbl">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="project-tags">
                        {project.tags.map((t) => (
                          <span key={t} className="tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button
                          onClick={() => handleOpenMedia(project)}
                          className="btn-dark"
                          style={{ flexGrow: 1, padding: '10px 16px', fontSize: '0.82rem' }}
                        >
                          View Case Study <ArrowUpRight size={14} />
                        </button>
                        <Link
                          to={`/contact?service=${encodeURIComponent(project.category)}`}
                          className="btn-secondary"
                          style={{ padding: '10px 14px', fontSize: '0.82rem' }}
                          title="Discuss a project like this"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        eyebrow="Custom Case Studies"
        title="WANT SIMILAR RESULTS FOR YOUR BRAND?"
        subtitle="Every strategy is custom-built around your specific market, product margins, and customer retention metrics."
      />

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaData={activeMedia}
      />
    </>
  );
};
