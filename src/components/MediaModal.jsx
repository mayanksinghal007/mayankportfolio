import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MediaModal = ({ isOpen, onClose, mediaData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackSeconds((s) => (s >= 30 ? 0 : s + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen || !mediaData) return null;

  const isAudio = mediaData.type === 'audio' || mediaData.hasAudioDemo;
  const isVideo = mediaData.type === 'video' || mediaData.hasVideoDemo || mediaData.isReel;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="editorial-eyebrow">Interactive Showcase</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontWeight: 600 }}>
              {mediaData.category || 'AI Production'}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '50%', background: 'rgba(25,25,25,0.06)' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>
            {mediaData.title}
          </h3>
          <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginBottom: '24px' }}>
            {mediaData.overview || mediaData.description || 'Produced and orchestrated by Mayank Aggarwal.'}
          </p>

          {/* Interactive Player Window */}
          {isVideo ? (
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: 'var(--charcoal)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={mediaData.image || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80'}
                alt={mediaData.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: isPlaying ? 0.95 : 0.65,
                  filter: isPlaying ? 'brightness(1.05)' : 'none',
                  transition: 'all 0.5s ease',
                }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isPlaying
                    ? 'none'
                    : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand)',
                  color: 'var(--softwhite)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(255, 61, 10, 0.5)',
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 10,
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}
              >
                <span>{isPlaying ? 'Streaming Generative Reel Preview' : 'Click to preview reel'}</span>
                <span>00:{playbackSeconds < 10 ? `0${playbackSeconds}` : playbackSeconds} / 00:30</span>
              </div>
            </div>
          ) : isAudio ? (
            <div
              style={{
                backgroundColor: 'var(--charcoal)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                color: 'var(--softwhite)',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand)',
                    color: 'var(--softwhite)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 6px 20px rgba(255, 61, 10, 0.45)',
                  }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                </button>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Neural ElevenLabs Voiceover Sample</span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                      {isPlaying ? 'Playing High-Res Audio' : 'Ready'}
                    </span>
                  </div>
                  {/* Animated Waveform */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '32px' }}>
                    {[12, 24, 18, 30, 26, 14, 28, 32, 19, 25, 30, 16, 22, 28, 14, 20, 26, 18, 30, 15].map(
                      (h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            backgroundColor: isPlaying ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                            height: isPlaying ? `${Math.max(6, (h * (playbackSeconds % 4 + 1)) % 32)}px` : `${h}px`,
                            borderRadius: '2px',
                            transition: 'height 0.15s ease',
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '24px',
                border: '1px solid var(--border-color)',
              }}
            >
              <img
                src={mediaData.image}
                alt={mediaData.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* Results / Highlights */}
          {mediaData.results && (
            <div className="project-results-box" style={{ marginBottom: '20px' }}>
              <strong>Impact & Results: </strong>
              {mediaData.results}
            </div>
          )}

          {/* Tags */}
          {mediaData.tags && (
            <div className="project-tags" style={{ marginBottom: '28px' }}>
              {mediaData.tags.map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-primary"
              style={{ flexGrow: 1 }}
            >
              Discuss a Similar Project <ArrowUpRight size={16} />
            </Link>
            <button onClick={onClose} className="btn-secondary">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
