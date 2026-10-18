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
        target.classList.contains('cta-btn') ||
        target.hasAttribute('data-cta') ||
        href.includes('/contact') ||
        href.includes('/tools/');

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

  return null;
};

