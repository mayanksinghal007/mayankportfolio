import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, ExternalLink, Tag, TrendingUp, Layers, Film } from 'lucide-react';
import { detectVideoLink } from '../utils/mediaUtils';

export const AdLightboxModal = ({ ad, isOpen, onClose }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchStartXRef = useRef(null);

  // Reset photo index whenever a new ad is opened
  useEffect(() => {
    setPhotoIndex(0);
  }, [ad]);

  // Images list for photo ad
  const images = ad?.type === 'photo'
    ? (Array.isArray(ad.media) && ad.media.length > 0 ? ad.media : [ad.thumbnail].filter(Boolean))
    : [];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation: Escape to close, Left/Right for photo slides
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (ad?.type === 'photo') {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, ad?.type, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || !ad) return null;

  const isPhoto = ad.type === 'photo';
  const isVideo = ad.type === 'video';

  // Video embed preparation
  const detected = isVideo ? detectVideoLink(ad.videoUrl || '') : null;
  const isDirectFile = isVideo && (ad.videoSource === 'upload' || detected?.source === 'direct');

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ad.title}
      style={{
        zIndex: 9999,
        padding: '16px',
        backgroundColor: 'rgba(12, 12, 12, 0.88)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isVideo ? '920px' : '880px',
          width: '100%',
          backgroundColor: '#161616',
          color: '#FAF6EE',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                backgroundColor: isPhoto ? 'rgba(255, 61, 10, 0.18)' : 'rgba(255, 185, 46, 0.18)',
                color: isPhoto ? 'var(--brand)' : 'var(--amber)',
                border: `1px solid ${isPhoto ? 'rgba(255, 61, 10, 0.35)' : 'rgba(255, 185, 46, 0.35)'}`,
              }}
            >
              {isPhoto ? <Layers size={13} /> : <Film size={13} />}
              {isPhoto ? 'Photo Ad Creative' : 'Video Ad Creative'}
            </span>

            {ad.platform && (
              <span
                style={{
                  fontSize: '0.78rem',
                  padding: '3px 9px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--cream)',
                  fontWeight: 600,
                }}
              >
                {ad.platform}
              </span>
            )}

            {ad.brand && (
              <span style={{ fontSize: '0.85rem', color: 'rgba(250, 246, 238, 0.65)', fontWeight: 500 }}>
                • {ad.brand}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal (Esc)"
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FAF6EE',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Presentation Body */}
        <div style={{ padding: '0', backgroundColor: '#0D0D0D', position: 'relative' }}>
          {isPhoto && (
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                position: 'relative',
                minHeight: '360px',
                maxHeight: '68vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#0A0A0A',
              }}
            >
              {images.length > 0 ? (
                <img
                  src={images[photoIndex]}
                  alt={`${ad.title} - Slide ${photoIndex + 1}`}
                  loading="eager"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '68vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    transition: 'opacity 0.2s ease',
                  }}
                />
              ) : (
                <div style={{ padding: '60px 20px', color: 'var(--mutedtext)', textAlign: 'center' }}>
                  No preview images available.
                </div>
              )}

              {/* Prev / Next Slide Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous photo (Left arrow)"
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(15, 15, 15, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(6px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 15, 15, 0.75)')}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next photo (Right arrow)"
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(15, 15, 15, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(6px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 15, 15, 0.75)')}
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* Counter Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: '#FAF6EE',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {photoIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Thumbnail Strip for Multi-image Ads */}
          {isPhoto && images.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: '#121212',
                overflowX: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhotoIndex(idx)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: idx === photoIndex ? '2px solid var(--brand)' : '1px solid rgba(255, 255, 255, 0.15)',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: idx === photoIndex ? 1 : 0.6,
                    backgroundColor: '#202020',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Video Player */}
          {isVideo && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000',
              }}
            >
              {isDirectFile ? (
                <video
                  src={ad.videoUrl}
                  controls
                  autoPlay
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    backgroundColor: '#000',
                  }}
                >
                  Your browser does not support HTML5 video playback.
                </video>
              ) : detected?.embedUrl ? (
                <iframe
                  src={detected.embedUrl}
                  title={ad.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--mutedtext)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ marginBottom: '12px' }}>Video URL not playable in embed mode.</p>
                  {ad.videoUrl && (
                    <a
                      href={ad.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Open Link in New Tab <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ad Meta & Description Panel */}
        <div style={{ padding: '22px 24px', backgroundColor: '#161616' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  lineHeight: '1.25',
                  marginBottom: '8px',
                  color: '#FAF6EE',
                }}
              >
                {ad.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {ad.industry && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: 'var(--amber)',
                      fontWeight: 600,
                    }}
                  >
                    <Tag size={12} />
                    {ad.industry}
                  </span>
                )}

                {ad.results && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: '#4ADE80',
                      fontWeight: 700,
                      backgroundColor: 'rgba(74, 222, 128, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(74, 222, 128, 0.2)',
                    }}
                  >
                    <TrendingUp size={12} />
                    {ad.results}
                  </span>
                )}
              </div>

              {ad.description && (
                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    color: 'rgba(250, 246, 238, 0.72)',
                    margin: 0,
                  }}
                >
                  {ad.description}
                </p>
              )}
            </div>

            {ad.videoUrl && isVideo && !isDirectFile && (
              <a
                href={ad.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--amber)',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                Watch on {ad.platform || 'Source'} <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
