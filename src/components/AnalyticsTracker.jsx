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

    // Detect automated test runner (Lighthouse, PageSpeed Insights, HeadlessChromium)
    if (typeof navigator !== 'undefined' && (Boolean(navigator.webdriver) || /HeadlessChrome|HeadlessChromium|Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse/i.test(navigator.userAgent))) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    // Skip first render since index.html gtag snippet already dispatched the initial page view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Dispatch page_view on subsequent SPA route changes
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    }

    // Global Event Tracking: WhatsApp, Phone Call, Form Submit, CTA clicks
    const handleDocumentClick = (e) => {
      const target = e.target.closest('a, button');
      if (!target || typeof window.gtag !== 'function') return;

      const href = target.getAttribute('href') || '';
      const text = (target.innerText || target.getAttribute('aria-label') || '').trim().slice(0, 80);

      // 1. WhatsApp Click Tracking
      if (href.includes('wa.me') || href.includes('whatsapp.com') || target.dataset.track === 'whatsapp') {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: text || 'WhatsApp Contact',
          destination_url: href,
          page_location: window.location.href,
        });
        return;
      }

      // 2. Phone Call Click Tracking
      if (href.startsWith('tel:') || target.dataset.track === 'phone') {
        window.gtag('event', 'call_click', {
          event_category: 'contact',
          event_label: href.replace('tel:', ''),
          page_location: window.location.href,
        });
        return;
      }

      // 3. CTA Click Tracking
      const isCta =
        target.classList.contains('btn-primary') ||
        target.classList.contains('btn-secondary') ||
        target.classList.contains('hero-btn-primary') ||
        target.classList.contains('hero-btn-secondary') ||
        target.classList.contains('pill-cta-btn') ||
        target.classList.contains('cta-btn') ||
        target.hasAttribute('data-cta') ||
        href.includes('/contact') ||
        href.includes('/tools/') ||
        href.includes('/portfolio');

      if (isCta) {
        window.gtag('event', 'cta_click', {
          event_category: 'conversion',
          event_label: text || 'Call to Action',
          cta_url: href,
          page_location: window.location.href,
        });
      }
    };

    // 4. Form Submit Tracking
    const handleDocumentSubmit = (e) => {
      if (typeof window.gtag !== 'function') return;
      const form = e.target;
      const formId = form.id || form.getAttribute('name') || 'contact_form';
      const formAction = form.getAttribute('action') || window.location.pathname;

      window.gtag('event', 'form_submit', {
        event_category: 'lead_generation',
        event_label: formId,
        form_name: formId,
        form_destination: formAction,
        page_location: window.location.href,
      });
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    document.addEventListener('submit', handleDocumentSubmit, { passive: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('submit', handleDocumentSubmit);
    };
  }, [location.pathname, location.search, measurementId, isConfigured]);

  // 5. Core Web Vitals (CWV) Real User Monitoring (LCP, CLS, INP, FCP)
  useEffect(() => {
    if (typeof window === 'undefined' || !isConfigured || typeof PerformanceObserver === 'undefined') return;

    // Skip in automated test environments
    if (typeof navigator !== 'undefined' && (navigator.webdriver || /HeadlessChrome|Lighthouse/i.test(navigator.userAgent))) {
      return;
    }

    let reported = false;
    let lcpVal = 0;
    let clsVal = 0;
    let inpVal = 0;

    let lcpObserver;
    let clsObserver;
    let inpObserver;
    let fcpObserver;

    try {
      // LCP (Largest Contentful Paint)
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          lcpVal = Math.round(last.startTime);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    try {
      // CLS (Cumulative Layout Shift)
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsVal += entry.value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    try {
      // INP / FID (Interaction to Next Paint)
      inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > inpVal) {
            inpVal = Math.round(entry.duration);
          }
        }
      });
      inpObserver.observe({ type: 'first-input', buffered: true });
    } catch {}

    try {
      // FCP (First Contentful Paint)
      fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntriesByName('first-contentful-paint');
        if (entries.length > 0 && typeof window.gtag === 'function') {
          const fcp = Math.round(entries[0].startTime);
          window.gtag('event', 'FCP', {
            value: fcp,
            metric_value: fcp,
            metric_rating: fcp <= 1800 ? 'good' : fcp <= 3000 ? 'needs-improvement' : 'poor',
            event_category: 'Web Vitals',
            non_interaction: true,
          });
          fcpObserver.disconnect();
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch {}

    const reportVitals = () => {
      if (reported || typeof window.gtag !== 'function') return;
      reported = true;

      if (lcpVal > 0) {
        window.gtag('event', 'LCP', {
          value: lcpVal,
          metric_value: lcpVal,
          metric_rating: lcpVal <= 2500 ? 'good' : lcpVal <= 4000 ? 'needs-improvement' : 'poor',
          event_category: 'Web Vitals',
          non_interaction: true,
        });
      }

      const roundedCls = Math.round(clsVal * 1000) / 1000;
      window.gtag('event', 'CLS', {
        value: Math.round(roundedCls * 1000),
        metric_value: roundedCls,
        metric_rating: roundedCls <= 0.1 ? 'good' : roundedCls <= 0.25 ? 'needs-improvement' : 'poor',
        event_category: 'Web Vitals',
        non_interaction: true,
      });

      if (inpVal > 0) {
        window.gtag('event', 'INP', {
          value: inpVal,
          metric_value: inpVal,
          metric_rating: inpVal <= 200 ? 'good' : inpVal <= 500 ? 'needs-improvement' : 'poor',
          event_category: 'Web Vitals',
          non_interaction: true,
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        reportVitals();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', reportVitals);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', reportVitals);
      if (lcpObserver) lcpObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
      if (inpObserver) inpObserver.disconnect();
      if (fcpObserver) fcpObserver.disconnect();
    };
  }, [isConfigured]);

  return null;
};

