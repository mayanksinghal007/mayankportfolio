import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import confetti from 'canvas-confetti';
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

import { getProfessionalServiceSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export const Contact = () => {
  const { site, services, addInquiry } = useSite();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const initialForm = {
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'Performance Marketing',
    description: '',
    budget: '₹25,000 – ₹50,000',
    contact_method: 'WhatsApp',
    consent: false,
    website_bot_trap: '', // Anti-spam honeypot
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchemas = [
    getProfessionalServiceSchema(),
    getBreadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
  ];

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please provide your name';
    if (!form.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.service) newErrors.service = 'Please select a service';
    if (!form.description.trim()) {
      newErrors.description = 'Please tell me about your project or objectives';
    } else if (form.description.trim().length < 10) {
      newErrors.description = 'Please provide a bit more detail (min. 10 characters)';
    }
    if (!form.consent) {
      newErrors.consent = 'Please confirm consent to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Anti-Spam Honeypot Verification: Silently drop bot submissions
    if (form.website_bot_trap && form.website_bot_trap.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmittedId('INQ-SEC');
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 400);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const created = addInquiry({
        name: form.name,
        email: form.email,
        company: form.company,
        service: form.service,
        description: form.description,
        budget: form.budget,
        contact_method: form.contact_method,
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF3D0A', '#FFB92E', '#191919', '#FFE8D2'],
        });
      } catch (err) {
        // Fallback gracefully
      }

      setSubmittedId(created.id);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setForm(initialForm);
    }, 600);
  };

  const contactChannels = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Direct',
      value: '+91 9217756033',
      subtext: 'Fastest response (Usually under 1 hour)',
      href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`,
      action: 'Chat Now',
      color: '#25D366',
    },
    {
      icon: Mail,
      title: 'Direct Email',
      value: site.email,
      subtext: 'For proposals and detailed briefs',
      href: `mailto:${site.email}?subject=Project%20Inquiry%20%E2%80%94%20Mayank%20Aggarwal`,
      action: 'Send Email',
      color: '#FF3D0A',
    },
    {
      icon: Phone,
      title: 'Direct Call',
      value: site.phone,
      subtext: 'Mon-Sat 10:00 AM – 8:00 PM IST',
      href: `tel:${site.phone}`,
      action: 'Call Now',
      color: '#FFB92E',
    },
    {
      icon: LinkedinIcon,
      title: 'LinkedIn Network',
      value: 'mayank-aggarwal',
      subtext: 'Connect professionally',
      href: site.linkedin,
      action: 'Connect',
      color: '#0A66C2',
    },
    {
      icon: InstagramIcon,
      title: 'Instagram',
      value: '@mayankaggarwal_7',
      subtext: 'Follow creative updates & reels',
      href: site.instagram,
      action: 'Follow',
      color: '#FF3D0A',
    },
  ];

  return (
    <>
      <SeoHead
        title="Contact Mayank Aggarwal | Start a Project in Delhi"
        description="Get in touch with Mayank Aggarwal for Meta Ads management, AI video ads, or short-form content strategy. Direct WhatsApp and response within 12 hours."
        canonicalPath="/contact"
        jsonLd={contactSchemas}
      />

      {/* CONTACT HEADER */}
      <section className="section-pad" style={{ paddingTop: '150px', paddingBottom: '60px' }}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <div style={{ maxWidth: '820px' }}>
            <span className="editorial-eyebrow">Get In Touch</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              LET'S BUILD SOMETHING{' '}
              <span className="brand-span">EXTRAORDINARY.</span>
            </h1>
            <p className="hero-lead">
              Have an upcoming campaign, reel strategy, or AI video project? Fill out the brief below or reach out directly on WhatsApp. I review all inquiries personally.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT MAIN GRID */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Direct Channels & Information */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '20px' }}>
                DIRECT REACHOUT
              </h2>
              <p style={{ color: 'var(--mutedtext)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.65 }}>
                Prefer instant messaging over email forms? Use any of the verified channels below for direct founder communication.
              </p>

              <div>
                {contactChannels.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={i}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="contact-card-channel"
                    >
                      <div className="channel-icon-wrap" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                        <Icon size={22} />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mutedtext)' }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)', wordBreak: 'break-all' }}>
                          {c.value}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--mutedtext-light)' }}>
                          {c.subtext}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase' }}>
                        {c.action} →
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Response Time Guarantee Pill */}
              <div
                style={{
                  backgroundColor: 'var(--cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  marginTop: '32px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Clock size={20} color="#FF3D0A" />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                    Fast Turnaround Guarantee
                  </h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  Every project inquiry receives a personalized review within <strong>12 business hours</strong>, including preliminary scope suggestions and next steps.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Brief Form */}
            <div>
              <div className="contact-form-card">
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(37, 211, 102, 0.15)',
                        color: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                      }}
                    >
                      <CheckCircle2 size={40} />
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--charcoal)', marginBottom: '12px' }}>
                      INQUIRY TRANSMITTED!
                    </h3>

                    <p style={{ fontSize: '1.05rem', color: 'var(--mutedtext)', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                      Thank you for reaching out! Your brief has been saved with Reference ID <strong>#{submittedId}</strong>. Mayank will review it shortly.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <a
                        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Mayank, I just submitted an inquiry on your website (ID: ${submittedId}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                      >
                        <MessageCircle size={16} /> Follow Up on WhatsApp
                      </a>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn-secondary"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Anti-Spam Honeypot Field (Hidden from Human Users) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="website_bot_trap">Do not fill this field</label>
                      <input
                        type="text"
                        id="website_bot_trap"
                        name="website_bot_trap"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website_bot_trap}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                      <span className="editorial-eyebrow">Project Brief Form</span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginTop: '6px' }}>
                        TELL ME ABOUT YOUR PROJECT.
                      </h3>
                    </div>

                    {/* Name & Email Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">Full Name *</label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Aman Sharma"
                          className="form-control"
                          aria-required="true"
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <div id="name-error" className="form-error" role="alert">
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="aman@yourbrand.com"
                          className="form-control"
                          aria-required="true"
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <div id="email-error" className="form-error" role="alert">
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Company & Service Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-company" className="form-label">Company / Brand (Optional)</label>
                        <input
                          type="text"
                          id="contact-company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="e.g. UrbanWear Apparel"
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-service" className="form-label">Primary Service *</label>
                        <select
                          id="contact-service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="form-control"
                          aria-required="true"
                          aria-invalid={errors.service ? 'true' : 'false'}
                          aria-describedby={errors.service ? 'service-error' : undefined}
                        >
                          {services.map((s) => (
                            <option key={s.slug} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                          <option value="Multi-Service Growth Retainer">
                            Multi-Service Growth Retainer
                          </option>
                          <option value="General Consultation / Not Sure">
                            General Consultation / Not Sure
                          </option>
                        </select>
                        {errors.service && (
                          <div id="service-error" className="form-error" role="alert">
                            {errors.service}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget & Contact Method Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-budget" className="form-label">Estimated Monthly Budget</label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Under ₹25,000">Under ₹25,000</option>
                          <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                          <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                          <option value="₹1,00,000+">₹1,00,000+</option>
                          <option value="To Be Discussed">To Be Discussed</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-method" className="form-label">Preferred Response Method</label>
                        <select
                          id="contact-method"
                          name="contact_method"
                          value={form.contact_method}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="WhatsApp">WhatsApp Message</option>
                          <option value="Email">Email Response</option>
                          <option value="Phone call">Phone Call</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="form-group">
                      <label htmlFor="contact-description" className="form-label">Project Objectives & Requirements *</label>
                      <textarea
                        id="contact-description"
                        name="description"
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Tell me about your product, current ad spend, target audience, timeline, or links to your social handles..."
                        className="form-control"
                        style={{ resize: 'vertical' }}
                        aria-required="true"
                        aria-invalid={errors.description ? 'true' : 'false'}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                      />
                      {errors.description && (
                        <div id="description-error" className="form-error" role="alert">
                          {errors.description}
                        </div>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="form-group" style={{ marginBottom: '28px' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--mutedtext)' }}>
                        <input
                          type="checkbox"
                          name="consent"
                          checked={form.consent}
                          onChange={handleChange}
                          style={{ marginTop: '3px', accentColor: 'var(--brand)' }}
                          aria-required="true"
                          aria-invalid={errors.consent ? 'true' : 'false'}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                        />
                        <span>
                          I agree to be contacted regarding my project inquiry under the provisions of the{' '}
                          <Link to="/privacy-policy" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                            Privacy Policy
                          </Link>
                          . Information remains strictly confidential and is never shared.
                        </span>
                      </label>
                      {errors.consent && (
                        <div id="consent-error" className="form-error" role="alert">
                          {errors.consent}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
                    >
                      {isSubmitting ? (
                        'Saving Your Brief...'
                      ) : (
                        <>
                          Send Project Inquiry <Send size={18} />
                        </>
                      )}
                    </button>

                    {/* Fast Turnaround Promise Note */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '0.82rem', color: 'var(--mutedtext)' }}>
                      <Clock size={14} color="var(--brand)" />
                      <span><strong>Fast Turnaround Promise:</strong> I personally review inquiries and reply within 12 hours.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
