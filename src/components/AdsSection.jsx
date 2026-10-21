import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Film,
  Play,
  TrendingUp,
  Tag,
  Sparkles,
  ArrowUpRight,
  Filter,
  Check,
  Megaphone,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { AdLightboxModal } from './AdLightboxModal';
import { AD_INDUSTRIES } from '../data/initialData';

export const AdsSection = ({ title, subtitle, showViewAllLink = false, limit = null, isStandalonePage = false }) => {
  const { ads } = useSite();
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'photo' | 'video'
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [activeAd, setActiveAd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter published ads only and sort by featured first, then display order
  const filteredAds = useMemo(() => {
    let list = ads.filter((ad) => ad.status === 'published');

    if (selectedType !== 'all') {
      list = list.filter((ad) => ad.type === selectedType);
    }

    if (selectedIndustry !== 'all') {
      list = list.filter((ad) => ad.industry === selectedIndustry);
    }

    // Sort: featured first, then by order asc, then by createdAt desc
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const orderA = a.order !== undefined && a.order !== null ? Number(a.order) : 999;
      const orderB = b.order !== undefined && b.order !== null ? Number(b.order) : 999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    if (limit && typeof limit === 'number') {
      return list.slice(0, limit);
    }

    return list;
  }, [ads, selectedType, selectedIndustry, limit]);

  // Counts for tabs
  const publishedAds = useMemo(() => ads.filter((a) => a.status === 'published'), [ads]);
  const photoCount = useMemo(() => publishedAds.filter((a) => a.type === 'photo').length, [publishedAds]);
  const videoCount = useMemo(() => publishedAds.filter((a) => a.type === 'video').length, [publishedAds]);

  const handleOpenAd = (ad) => {
    setActiveAd(ad);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveAd(null);
  };

  return (
    <section id="ads" className="section-pad" style={{ backgroundColor: isStandalonePage ? 'transparent' : 'var(--softwhite)' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <span className="editorial-eyebrow">
              <Megaphone size={14} style={{ marginRight: '6px', color: 'var(--brand)' }} />
              Performance & Creative Showcase
            </span>
            <h2 className="display-title section-title" style={{ marginTop: '8px' }}>
              {title || 'HIGH-CONVERTING AD WORK.'}
            </h2>
            <p style={{ color: 'var(--mutedtext)', fontSize: '1.05rem', lineHeight: '1.6', marginTop: '12px' }}>
              {subtitle ||
                'Strategic photo carousels and cinematic video ads designed for Meta, Instagram, and YouTube. Built with psychological hooks, high creative standards, and disciplined audience testing.'}
            </p>
          </div>

          {showViewAllLink && (
            <div>
              <Link to="/ads" className="btn-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore All Ads Gallery <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Filter Controls Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '36px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          {/* Type Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={() => setSelectedType('all')}
              className={`filter-pill ${selectedType === 'all' ? 'active' : ''}`}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedType === 'all' ? 'var(--charcoal)' : 'var(--border-color)',
                backgroundColor: selectedType === 'all' ? 'var(--charcoal)' : 'var(--purewhite)',
                color: selectedType === 'all' ? 'var(--softwhite)' : 'var(--charcoal)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>All Ads</span>
              <span
                style={{
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  backgroundColor: selectedType === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {publishedAds.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedType('photo')}
              className={`filter-pill ${selectedType === 'photo' ? 'active' : ''}`}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedType === 'photo' ? 'var(--brand)' : 'var(--border-color)',
                backgroundColor: selectedType === 'photo' ? 'var(--brand)' : 'var(--purewhite)',
                color: selectedType === 'photo' ? '#FFF' : 'var(--charcoal)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Layers size={14} />
              <span>Photo Ads</span>
              <span
                style={{
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  backgroundColor: selectedType === 'photo' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {photoCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedType('video')}
              className={`filter-pill ${selectedType === 'video' ? 'active' : ''}`}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedType === 'video' ? 'var(--charcoal)' : 'var(--border-color)',
                backgroundColor: selectedType === 'video' ? 'var(--charcoal)' : 'var(--purewhite)',
                color: selectedType === 'video' ? 'var(--gold)' : 'var(--charcoal)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Film size={14} />
              <span>Video Ads</span>
              <span
                style={{
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  backgroundColor: selectedType === 'video' ? 'rgba(255,185,46,0.25)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {videoCount}
              </span>
            </button>
          </div>

          {/* Industry Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label
              htmlFor="ad-industry-filter"
              style={{ fontSize: '0.82rem', color: 'var(--mutedtext)', fontWeight: 600, cursor: 'pointer' }}
            >
              Industry:
            </label>
            <select
              id="ad-industry-filter"
              aria-label="Filter ads by industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--purewhite)',
                color: 'var(--charcoal)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="all">All Industries</option>
              {AD_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ads Responsive Grid */}
        {filteredAds.length === 0 ? (
          <div
            style={{
              padding: '64px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--purewhite)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--border-color)',
            }}
          >
            <Megaphone size={40} style={{ color: 'var(--mutedtext)', margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>
              No ad creatives match this filter
            </h3>
            <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Try switching tabs or resetting the industry filter to view more campaigns.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedIndustry('all');
              }}
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredAds.map((ad) => {
              const isPhoto = ad.type === 'photo';
              const isVideo = ad.type === 'video';
              const imageCount = isPhoto && Array.isArray(ad.media) ? ad.media.length : 1;
              const displayThumb =
                ad.thumbnail ||
                (isPhoto && ad.media?.[0]) ||
                'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80';

              return (
                <div
                  key={ad.id}
                  onClick={() => handleOpenAd(ad)}
                  style={{
                    backgroundColor: 'var(--purewhite)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = 'rgba(255, 61, 10, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {/* Media Wrapper */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16/10',
                      backgroundColor: 'var(--charcoal)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={displayThumb}
                      alt={ad.title}
                      width="640"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=75';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15,15,15,0.7) 0%, rgba(15,15,15,0.05) 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top Left Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          backgroundColor: isPhoto ? 'rgba(255, 61, 10, 0.9)' : 'rgba(25, 25, 25, 0.9)',
                          color: isPhoto ? '#FFF' : 'var(--gold)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {isPhoto ? <Layers size={11} /> : <Film size={11} />}
                        {isPhoto ? 'Photo Ad' : 'Video Ad'}
                      </span>

                      {ad.featured && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 9px',
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(255, 185, 46, 0.95)',
                            color: 'var(--charcoal)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          ★ Featured
                        </span>
                      )}

                      {(!ad.verified || ad.isSample) && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 9px',
                            borderRadius: '999px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            color: 'var(--brand)',
                            border: '1px solid var(--brand)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          Sample / Concept
                        </span>
                      )}
                    </div>

                    {/* Top Right Platform Badge */}
                    {ad.platform && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: 'var(--charcoal)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {ad.platform}
                      </span>
                    )}

                    {/* Photo Multi-image badge */}
                    {isPhoto && imageCount > 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(0, 0, 0, 0.75)',
                          color: '#FFF',
                          padding: '4px 9px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Layers size={12} />
                        <span>{imageCount} Slides</span>
                      </div>
                    )}

                    {/* Video Center Play Icon Overlay */}
                    {isVideo && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 61, 10, 0.92)',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 24px rgba(255, 61, 10, 0.5)',
                          transition: 'transform 0.2s ease, background-color 0.2s ease',
                        }}
                      >
                        <Play size={22} fill="#FFF" style={{ marginLeft: '2px' }} />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Brand & Industry */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          marginBottom: '8px',
                          fontSize: '0.8rem',
                          color: 'var(--mutedtext)',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                          {ad.brand || 'Client Campaign'}
                        </span>
                        {ad.industry && (
                          <span style={{ color: 'var(--brand-text)', fontWeight: 600 }}>
                            {ad.industry}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          lineHeight: '1.3',
                          marginBottom: '10px',
                          color: 'var(--charcoal)',
                        }}
                      >
                        {ad.title}
                      </h3>

                      {/* Description Snippet */}
                      {ad.description && (
                        <p
                          style={{
                            fontSize: '0.88rem',
                            lineHeight: '1.55',
                            color: 'var(--mutedtext)',
                            marginBottom: '14px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {ad.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Results & Action */}
                    <div
                      style={{
                        paddingTop: '14px',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      {ad.verified && ad.results ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#16A34A',
                            backgroundColor: 'rgba(22, 163, 74, 0.1)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          <TrendingUp size={13} />
                          <span>{ad.results}</span>
                        </div>
                      ) : ad.results ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--charcoal)',
                            backgroundColor: 'var(--peach)',
                            border: '1px solid var(--border-color)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          <span>{ad.results}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--mutedtext)' }}>
                          Creative Concept & Strategy
                        </span>
                      )}

                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--brand-text)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {isPhoto ? 'View Slides' : 'Watch Ad'} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Video Modal */}
      <AdLightboxModal ad={activeAd} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};
