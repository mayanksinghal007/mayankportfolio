import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

/**
 * Google Analytics 4 (GA4) Tracker
 * - Loads gtag.js asynchronously without blocking rendering or Core Web Vitals (LCP/INP)
 * - Dispatches 'page_view' on SPA route transitions via useLocation()
 * - Strictly respects environment variable VITE_GA4_MEASUREMENT_ID
 */
export const AnalyticsTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  const measurementId =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GA4_MEASUREMENT_ID) ||
    SITE_CONFIG.gaMeasurementId ||
    'G-99QPLF52NX';

  const isConfigured =
    measurementId &&
    measurementId.startsWith('G-') &&
    !measurementId.includes('XXXXXXXXXX');

  useEffect(() => {
    if (typeof window === 'undefined' || !isConfigured) return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    // Fallback: inject script asynchronously if not already in document
    const scriptId = 'ga4-gtag-script';
    if (!document.getElementById(scriptId) && !document.querySelector('script[src*="googletagmanager.com/gtag/js?id="]')) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    // Skip first render since index.html gtag snippet already dispatched the initial page view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger page view on subsequent SPA route changes
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search, measurementId, isConfigured]);

  return null;
};
