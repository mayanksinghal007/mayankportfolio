import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight IntersectionObserver hook for 60fps scroll reveals.
 * Adds .revealed class to elements with .reveal-on-scroll when they enter the viewport.
 * Automatically unobserves after revealing to conserve CPU cycles.
 */
export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    // Observe all targets
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
};
