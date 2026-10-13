import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSite } from '../context/SiteContext';

// Page-specific contextual templates to maximize conversion and relevance
const getTemplateForRoute = (pathname) => {
  if (pathname === '/') {
    return {
      badge: '⚡ 1-ON-1 GROWTH AUDIT',
      headline: 'Ready to Scale Your Brand With Meta Ads & AI?',
      subtitle: 'Get a free 15-minute ad audit & growth roadmap tailored to your product.',
      ctaText: 'Claim Free Growth Audit',
      highlight: 'Personalized breakdown of your target CPA & ad hook angles within 12 hours.',
      accent: 'var(--brand)',
    };
  }

  if (pathname.startsWith('/services')) {
    return {
      badge: '🎯 CUSTOM PROJECT SCOPE',
      headline: 'Need a Tailored Deliverable & Fast Turnaround Quote?',
      subtitle: 'Tell us what you are building — get estimated turnaround & pricing within 12 hours.',
      ctaText: 'Request Custom Scope & Pricing',
      highlight: 'Direct 1-on-1 collaboration on WhatsApp · No bloated agency overhead.',
      accent: '#FFB92E',
    };
  }

  if (pathname.startsWith('/portfolio')) {
    return {
      badge: '🎬 HIGH-RETENTION CREATIVES',
      headline: 'Want High-Converting Visuals Like These For Your Brand?',
      subtitle: "Let's discuss showreels, UGC video ads, and scroll-stopping generative visuals.",
      ctaText: 'Build My Creative Showcase',
      highlight: 'Tested camera prompts, 4K renders & retention-engineered pacing.',
      accent: 'var(--brand)',
    };
  }

  if (pathname.startsWith('/ads')) {
    return {
      badge: '📊 META ADS DIAGNOSTIC',
      headline: 'Get a Free 3-Point Ad Creative & Hook Review',
      subtitle: 'Stop burning budget on unoptimized ads. See where your competitors are winning.',
      ctaText: 'Get Free Creative Review',
      highlight: 'Advantage+ funnel review + 3 fresh creative hook suggestions.',
      accent: '#FFB92E',
    };
  }

  if (pathname.startsWith('/process')) {
    return {
      badge: '⏱️ 48-HOUR SPRINT',
      headline: 'Skip Multi-Week Agency Delays — Launch Fast.',
      subtitle: 'From concept to live Meta Ads campaign or AI video renders in 48 hours.',
      ctaText: 'Start 48-Hour Sprint',
      highlight: 'Full account ownership · Weekly transparent performance reporting.',
      accent: 'var(--brand)',
    };
  }

  if (pathname.startsWith('/blog')) {
    return {
      badge: '📘 EXCLUSIVE GROWTH PLAYBOOK',
      headline: 'Get the Meta Ads & Generative AI Creative Checklist',
      subtitle: 'Download our internal prompt blueprints, 3-second hook formulas, and budget scales.',
      ctaText: 'Send Me the Free Blueprint',
      highlight: 'Directly delivered to your email with instant actionable steps.',
      accent: '#10B981',
    };
  }

  if (pathname.startsWith('/about')) {
    return {
      badge: '🤝 DIRECT FOUNDER COLLABORATION',
      headline: 'Collaborate Directly With Mayank Aggarwal',
      subtitle: 'No account managers, no junior trainees. 100% direct strategic execution.',
      ctaText: 'Connect With Mayank Directly',
      highlight: 'Delhi NCR local presence · Pan-India & remote global delivery.',
      accent: 'var(--brand)',
    };
  }

  // Default fallback for any other page
  return {
    badge: '🚀 INSTANT CONSULTATION',
    headline: "Let's Build Something High-Converting Together",
    subtitle: 'Drop your details below and get an actionable response within 12 hours.',
    ctaText: 'Send Inbound Request',
    highlight: 'Replies within 12 hours guaranteed to your contact details.',
    accent: 'var(--brand)',
  };
};

export const ScrollLeadModal = () => {
  const location = useLocation();
  const { addInquiry } = useSite();

  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    email: '',
    // Security honeypot field (hidden from legitimate humans)
    website_security_token: '',
  });

  const [errors, setErrors] = useState({});

  const template = getTemplateForRoute(location.pathname);

  // Track 30% scroll trigger on every page
  useEffect(() => {
    // Check if dismissed in this session for this specific route
    const dismissedKey = `lead_modal_dismissed_${location.pathname}`;
    const alreadyDismissed = sessionStorage.getItem(dismissedKey) === 'true';
    const globallySubmitted = sessionStorage.getItem('lead_modal_submitted') === 'true';

    if (alreadyDismissed || globallySubmitted) {
      setHasDismissed(true);
      return;
    }

    setHasDismissed(false);
    setIsSubmitted(false);

    let triggered = false;

    const handleScroll = () => {
      if (triggered) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll percentage
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // 30% scroll trigger (or scrolled at least 350px on shorter pages)
      if (scrollProgress >= 30 || (scrollHeight < 800 && scrollTop >= 200)) {
        triggered = true;
        // Small graceful pause before popping up to prevent jarring the user
        setTimeout(() => {
          setIsOpen(true);
        }, 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    try {
      sessionStorage.setItem(`lead_modal_dismissed_${location.pathname}`, 'true');
    } catch (e) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your Phone / WhatsApp number';
    } else if (!/^[0-9+\s\-()]{8,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please share your city / location (kahan se ho)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Security Honeypot Check: silently drop automated bots
    if (formData.website_security_token && formData.website_security_token.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 500);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Submit lead details to addInquiry (which forwards directly to contact.klikwise@gmail.com and saves to Admin CMS)
      addInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        email: formData.email.trim(),
        service: `${template.badge} — ${template.headline}`,
        description: `Lead from 30% scroll popup on page: ${location.pathname}. City: ${formData.location.trim()}, Phone: ${formData.phone.trim()}`,
        contact_method: 'WhatsApp / Phone',
        page: location.pathname,
        source: '30% Scroll Lead Modal',
      });

      // 2. Fire celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF3D0A', '#FFB92E', '#191919', '#FFE8D2'],
        });
      } catch (err) {}

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Remember submission
      try {
        sessionStorage.setItem('lead_modal_submitted', 'true');
        sessionStorage.setItem(`lead_modal_dismissed_${location.pathname}`, 'true');
      } catch (err) {}

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3200);
    }, 600);
  };

  if (!isOpen) {
    // If dismissed, render a subtle, non-intrusive bottom pill so user can still invoke it anytime
    if (hasDismissed && !isSubmitted) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 998,
            backgroundColor: 'var(--charcoal)',
            color: 'var(--softwhite)',
            border: '1px solid var(--charcoal-border)',
            borderRadius: 'var(--radius-full)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          className="hover-lift"
          title="Open Quick Inquiry Form"
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand)',
              boxShadow: '0 0 8px var(--brand)',
            }}
          />
          <span>Get Quick Estimate</span>
        </button>
      );
    }
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 15, 15, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#181818',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--softwhite)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
          overflow: 'hidden',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Color Accent Bar */}
        <div
          style={{
            height: '4px',
            background: `linear-gradient(90deg, ${template.accent || 'var(--brand)'}, #FFB92E)`,
            width: '100%',
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 61, 10, 0.12)',
                color: template.accent || 'var(--brand)',
                border: '1px solid rgba(255, 61, 10, 0.25)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={12} />
              <span>{template.badge}</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                lineHeight: 1.2,
                color: '#fff',
                marginBottom: '6px',
              }}
            >
              {template.headline}
            </h3>
            <p
              style={{
                color: 'rgba(255, 253, 249, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.45,
              }}
            >
              {template.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            className="hover-lift"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '0 28px 28px' }}>
          {isSubmitted ? (
            <div
              style={{
                padding: '36px 20px',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle2 size={30} />
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                REQUEST RECEIVED!
              </h4>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255, 253, 249, 0.8)',
                  maxWidth: '360px',
                  margin: '0 auto 12px',
                }}
              >
                Thank you, <strong>{formData.name}</strong>. Mayank has received your details and will get in touch on WhatsApp & Email within 12 hours.
              </p>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Direct inquiry dispatched to contact.klikwise@gmail.com
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Invisible Honeypot Anti-Spam Security Field */}
              <div
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 0,
                  width: 0,
                  zIndex: -1,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website_security_token"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_security_token}
                  onChange={handleChange}
                />
              </div>

              {/* Form Input Fields Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                {/* 1. Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'rgba(255, 253, 249, 0.85)',
                      marginBottom: '6px',
                    }}
                  >
                    Your Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Aman Sharma / Priya Mehta"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        backgroundColor: '#202020',
                        border: errors.name ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 12px 11px 36px',
                        color: '#fff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {errors.name && (
                    <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '3px', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* 2. Phone / WhatsApp Number */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'rgba(255, 253, 249, 0.85)',
                      marginBottom: '6px',
                    }}
                  >
                    WhatsApp / Phone Number *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        backgroundColor: '#202020',
                        border: errors.phone ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 12px 11px 36px',
                        color: '#fff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '3px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* 3. Location / City ("Kahan se ho") */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'rgba(255, 253, 249, 0.85)',
                      marginBottom: '6px',
                    }}
                  >
                    Your City / Location (Kahan se ho) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MapPin
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Delhi NCR, Mumbai, Bengaluru, Jaipur"
                      value={formData.location}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        backgroundColor: '#202020',
                        border: errors.location ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 12px 11px 36px',
                        color: '#fff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {errors.location && (
                    <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '3px', display: 'block' }}>
                      {errors.location}
                    </span>
                  )}
                </div>

                {/* 4. Email Address ("gmail") */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'rgba(255, 253, 249, 0.85)',
                      marginBottom: '6px',
                    }}
                  >
                    Email Address (Gmail / Work) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        backgroundColor: '#202020',
                        border: errors.email ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 12px 11px 36px',
                        color: '#fff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {errors.email && (
                    <span style={{ color: '#EF4444', fontSize: '0.72rem', marginTop: '3px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Value Highlight Callout */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: '0.78rem',
                  color: 'rgba(255, 253, 249, 0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '18px',
                }}
              >
                <ShieldCheck size={16} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                <span>{template.highlight}</span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brand hover-lift"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 8px 24px rgba(255, 61, 10, 0.3)',
                }}
              >
                {isSubmitting ? (
                  <span>Securing & Submitting...</span>
                ) : (
                  <>
                    <span>{template.ctaText}</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div
                style={{
                  marginTop: '12px',
                  textAlign: 'center',
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                🔒 256-bit SSL encrypted. No spam ever. Replies directly within 12 hours.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
