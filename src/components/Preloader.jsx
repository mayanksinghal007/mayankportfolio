import React, { useState, useEffect } from 'react';

/**
 * Branded Award-Winning Preloader
 * - Minimalist typographic logo reveal
 * - Numeric digital progress counter (00% -> 100%)
 * - Dual-panel vertical curtain wipe transition into hero content
 * - Automatically executes on initial site visit
 */
export const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      if (onComplete) onComplete();
      return;
    }

    // Skip preloader if already seen in this browsing session
    const hasSeen = sessionStorage.getItem('preloader_seen');
    if (hasSeen) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear tick for organic mechanical feel
      const increment = Math.floor(Math.random() * 8) + 3;
      current = Math.min(100, current + increment);
      setPercent(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsWiping(true);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('preloader_seen', 'true');
            if (onComplete) onComplete();
          }, 850);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div className={`awwwards-preloader ${isWiping ? 'wiping' : ''}`} aria-hidden="true">
      {/* Dual Curtain Panels */}
      <div className="preloader-curtain curtain-top" />
      <div className="preloader-curtain curtain-bottom" />

      {/* Center Branded Identity */}
      <div className="preloader-content">
        <div className="preloader-brand">
          <span>MAYANK</span>
          <span className="brand-dot">.</span>
          <span>AGGARWAL</span>
        </div>
        <div className="preloader-meta">
          <span>PERFORMANCE MARKETING</span>
          <span className="meta-sep">/</span>
          <span>AI VIDEO CREATIVE</span>
        </div>
        <div className="preloader-counter">
          <span className="counter-num">{String(percent).padStart(3, '0')}</span>
          <span className="counter-symbol">%</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
};
