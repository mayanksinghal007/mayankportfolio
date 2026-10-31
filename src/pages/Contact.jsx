import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
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
import { useSite } from '../context/SiteContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GiantGhostHeading } from '../components/GiantGhostHeading';
import { RulerDivider } from '../components/RulerDivider';

import { getOrganizationSchema, getLocalBusinessSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

const CURRENCY_BUDGET_TIERS = {
  USD: [
    { value: '$1,500 – $3,000 / mo', label: '$1,500 – $3,000 / month (Core Growth Retainer)' },
    { value: '$3,000 – $6,000 / mo', label: '$3,000 – $6,000 / month (Scale & Creative Testing)' },
    { value: '$6,000+ / mo', label: '$6,000+ / month (Enterprise & Multi-Market Scale)' },
    { value: '$1,000 – $2,500 (Project Creative)', label: '$1,000 – $2,500 (AI Video / Creative Pack Project)' },
    { value: 'Under $1,500 / Project', label: 'Under $1,500 / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
  GBP: [
    { value: '£1,200 – £2,500 / mo', label: '£1,200 – £2,500 / month (Core Growth Retainer)' },
    { value: '£2,500 – £5,000 / mo', label: '£2,500 – £5,000 / month (Scale & Creative Testing)' },
    { value: '£5,000+ / mo', label: '£5,000+ / month (Enterprise & Multi-Market Scale)' },
    { value: '£800 – £2,000 (Project Creative)', label: '£800 – £2,000 (AI Video / Creative Pack Project)' },
    { value: 'Under £1,000 / Project', label: 'Under £1,000 / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
  AED: [
    { value: '5,500 – 11,000 د.إ / mo', label: '5,500 – 11,000 د.إ / month (Core Growth Retainer)' },
    { value: '11,000 – 22,000 د.إ / mo', label: '11,000 – 22,000 د.إ / month (Scale & Creative Testing)' },
    { value: '22,000+ د.إ / mo', label: '22,000+ د.إ / month (Enterprise & GCC Scaling)' },
    { value: '3,500 – 9,000 د.إ (Project Creative)', label: '3,500 – 9,000 د.إ (AI Video / Creative Pack Project)' },
    { value: 'Under 5,000 د.إ / Project', label: 'Under 5,000 د.إ / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
  EUR: [
    { value: '€1,400 – €2,800 / mo', label: '€1,400 – €2,800 / month (Core Growth Retainer)' },
    { value: '€2,800 – €5,500 / mo', label: '€2,800 – €5,500 / month (Scale & Creative Testing)' },
    { value: '€5,500+ / mo', label: '€5,500+ / month (Enterprise & Multi-Market Scale)' },
    { value: '€900 – €2,200 (Project Creative)', label: '€900 – €2,200 (AI Video / Creative Pack Project)' },
    { value: 'Under €1,400 / Project', label: 'Under €1,400 / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
  INR: [
    { value: '₹30,000 – ₹60,000 / mo', label: '₹30,000 – ₹60,000 / month (Core Growth Retainer)' },
    { value: '₹60,000 – ₹1,20,000 / mo', label: '₹60,000 – ₹1,20,000 / month (Scale & Creative Testing)' },
    { value: '₹1,20,000+ / mo', label: '₹1,20,000+ / month (Enterprise & Multi-Market Scale)' },
    { value: '₹20,000 – ₹50,000 (Project Creative)', label: '₹20,000 – ₹50,000 (AI Video / Creative Pack Project)' },
    { value: 'Under ₹30,000 / Project', label: 'Under ₹30,000 / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
  RUB: [
    { value: '140,000 – 280,000 ₽ / mo', label: '140,000 – 280,000 ₽ / month (Core Growth Retainer)' },
    { value: '280,000 – 550,000 ₽ / mo', label: '280,000 – 550,000 ₽ / month (Scale & Creative Testing)' },
    { value: '550,000+ ₽ / mo', label: '550,000+ ₽ / month (Enterprise & Multi-Market Scale)' },
    { value: '90,000 – 230,000 ₽ (Project Creative)', label: '90,000 – 230,000 ₽ (AI Video / Creative Pack Project)' },
    { value: 'Under 140,000 ₽ / Project', label: 'Under 140,000 ₽ / Starter Project' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Discovery Call' },
  ],
};

export const Contact = () => {
  const { site, services, addInquiry } = useSite();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const preselectedService = location.state?.service || searchParams.get('service') || '';

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    service: preselectedService || 'Performance Marketing',
    description: '',
    currency: 'USD',
    budget: '$1,500 – $3,000 / mo',
    contact_method: 'Email',
    consent: false,
    website_bot_trap: '', // Anti-spam honeypot
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
  ];

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleCurrencyChange = (newCurrency) => {
    const defaultBudget = CURRENCY_BUDGET_TIERS[newCurrency]?.[0]?.value || 'To Be Discussed';
    setForm((prev) => ({
      ...prev,
      currency: newCurrency,
      budget: defaultBudget,
    }));
  };

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
        phone: form.phone,
        location: form.location,
        company: form.company,
        service: form.service,
        description: form.description,
        currency: form.currency || 'USD',
        budget: form.budget,
        contact_method: form.contact_method,
        page: '/contact',
      });

      // Fire celebratory confetti!
      import('canvas-confetti')
        .then(({ default: confetti }) => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF3D0A', '#FFB92E', '#191919', '#FFE8D2'],
          });
        })
        .catch(() => {});

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
      subtext: 'Mon–Fri 9:00 AM – 7:00 PM IST · Requests 24/7',
      href: `tel:${(site.phoneTel || site.phone || '').replace(/\s+/g, '')}`,
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
        title="Contact Mayank Aggarwal | Performance Marketing & AI Partner"
        description="Get in touch with Mayank Aggarwal for Meta Ads management, generative AI video commercials, and creative strategy. Response within 12 hours."
        keywords={[
          'Contact Mayank Aggarwal',
          'Hire Meta Ads Specialist',
          'Book Marketing Discovery Call',
          'Klikwise Agency Contact',
          'Digital Marketing Inquiry'
        ]}
        canonicalPath="/contact"
        jsonLd={contactSchemas}
      />

      {/* CONTACT HEADER */}
      <section className="page-hero-pad giant-ghost-container">
        <GiantGhostHeading text="DISCOVERY" offset="-4%" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <div style={{ maxWidth: '820px' }}>
            <div className="system-meta-label" style={{ marginBottom: '14px' }}>
              <span className="system-status-dot" />
              <span>SYSTEM 06 // CLIENT INTAKE & DISCOVERY</span>
            </div>
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

      {/* RULER TRACK DIVIDER */}
      <RulerDivider label="SYSTEM 06 // DIRECT ENCRYPTION & DISPATCH" />

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
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)', margin: 0 }}>
                    Fast Turnaround Guarantee
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  Every project inquiry receives a personalized review within <strong>12 business hours</strong>, including preliminary scope suggestions and next steps.
                </p>
              </div>

              {/* Verified NAP (Name, Address, Phone) & Operating Hours */}
              <address
                style={{
                  fontStyle: 'normal',
                  backgroundColor: 'var(--softwhite)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  marginTop: '20px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  color: 'var(--mutedtext)',
                }}
              >
                <div style={{ color: 'var(--charcoal)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                  {site.name} · {site.brandName}
                </div>
                <div style={{ color: 'var(--mutedtext)' }}>Delhi, National Capital Region (NCR), India · PIN: 110001</div>
                <div style={{ marginTop: '8px' }}>
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${(site.phoneTel || site.phone || '').replace(/\s+/g, '')}`} style={{ color: 'var(--charcoal)', fontWeight: 600 }}>
                    {site.phone}
                  </a>
                </div>
                <div>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${site.email}`} style={{ color: 'var(--brand)', fontWeight: 600 }}>
                    {site.email}
                  </a>
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.84rem', color: 'var(--mutedtext)', lineHeight: 1.6 }}>
                  <strong>Project Intake:</strong> Available for project requests 24/7. Submit your inquiry anytime, and I'll follow up as soon as possible.<br />
                  <span style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', opacity: 0.85 }}>Direct consultation calls: Mon–Fri 9:00 AM – 7:00 PM IST (GMT+5:30)</span>
                </div>
              </address>
            </div>

            {/* Right Column: Interactive Brief Form */}
            <div>
              <div className="contact-form-card has-corner-brackets">
                <span className="crosshair-corner crosshair-tl">+</span>
                <span className="crosshair-corner crosshair-tr">+</span>
                <span className="crosshair-corner crosshair-bl">+</span>
                <span className="crosshair-corner crosshair-br">+</span>
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

                    {/* Phone & Location Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-phone" className="form-label">WhatsApp / Phone Number</label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-location" className="form-label">City / Country</label>
                        <input
                          type="text"
                          id="contact-location"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="e.g. Austin TX, London, Toronto, Dubai, Delhi"
                          className="form-control"
                        />
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

                    {/* Currency & Budget Row */}
                    <div className="form-row">
                      <div className="form-group" style={{ flex: '0 0 130px' }}>
                        <label htmlFor="contact-currency" className="form-label">Currency</label>
                        <select
                          id="contact-currency"
                          name="currency"
                          value={form.currency}
                          onChange={(e) => handleCurrencyChange(e.target.value)}
                          className="form-control"
                          aria-label="Select Budget Currency"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="AED">AED (د.إ)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="INR">INR (₹)</option>
                          <option value="RUB">RUB (₽)</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ flex: 1 }}>
                        <label htmlFor="contact-budget" className="form-label">
                          Estimated Monthly Advertising Budget ({form.currency})
                        </label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="form-control"
                          aria-label={`Estimated Monthly Advertising Budget in ${form.currency}`}
                        >
                          {(CURRENCY_BUDGET_TIERS[form.currency] || CURRENCY_BUDGET_TIERS.USD).map((tier) => (
                            <option key={tier.value} value={tier.value}>
                              {tier.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Response Method Row */}
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
