import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Cinematic Route Page Transition Controller
 * - Accent-colored curtain wipe across viewport on route navigation
 * - Ultra-thin top accent loading rail
 * - Staggered fade & slide reveal for new page container
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('idle'); // 'idle' | 'wiping-in' | 'wiping-out'

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('wiping-in');

      const timer1 = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('wiping-out');

        const timer2 = setTimeout(() => {
          setTransitionStage('idle');
        }, 450);

        return () => clearTimeout(timer2);
      }, 350);

      return () => clearTimeout(timer1);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Top Thin Animated Progress Indicator */}
      {transitionStage !== 'idle' && (
        <div className="page-transition-top-rail" role="progressbar" aria-hidden="true" />
      )}

      {/* Wipe Curtain Overlay */}
      <div
        className={`page-transition-overlay ${
          transitionStage === 'wiping-in'
            ? 'enter'
            : transitionStage === 'wiping-out'
            ? 'leave'
            : ''
        }`}
        aria-hidden="true"
      />

      {/* Main Page Content Wrapper */}
      <div className={`page-content-wrapper ${transitionStage !== 'idle' ? 'page-transitioning' : ''}`}>
        {children}
      </div>
    </>
  );
};
