import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CtaBanner } from '../../components/CtaBanner';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Percent,
  Truck,
  RotateCcw,
  CreditCard,
  Target
} from 'lucide-react';

export const RoasCalculator = () => {
  // Financial Inputs
  const [adSpend, setAdSpend] = useState(100000);
  const [revenue, setRevenue] = useState(350000);
  const [cogsPercent, setCogsPercent] = useState(30);
  const [shippingPerOrder, setShippingPerOrder] = useState(90);
  const [aov, setAov] = useState(1500);
  const [rtoPercent, setRtoPercent] = useState(15);
  const [pgPercent, setPgPercent] = useState(2);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Computations
  const stats = useMemo(() => {
    const rawRoas = adSpend > 0 ? revenue / adSpend : 0;
    const estimatedOrders = aov > 0 ? Math.round(revenue / aov) : 0;

    // Total COGS
    const totalCogs = revenue * (cogsPercent / 100);

    // Shipping fees (forward + return for RTO)
    const deliveredOrders = estimatedOrders * (1 - rtoPercent / 100);
    const rtoOrders = estimatedOrders * (rtoPercent / 100);
    const totalShipping = deliveredOrders * shippingPerOrder + rtoOrders * shippingPerOrder * 1.6;

    // Payment gateway fees
    const totalPgFees = revenue * (pgPercent / 100);

    // Net profit
    const netProfit = revenue - adSpend - totalCogs - totalShipping - totalPgFees;
    const netMarginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    // Break-even ROAS
    const unitGrossMargin = 1 - cogsPercent / 100 - pgPercent / 100 - shippingPerOrder / aov;
    const breakEvenRoas = unitGrossMargin > 0 ? 1 / unitGrossMargin : 99;

    return {
      rawRoas: rawRoas.toFixed(2),
      estimatedOrders,
      totalCogs: Math.round(totalCogs),
      totalShipping: Math.round(totalShipping),
      totalPgFees: Math.round(totalPgFees),
      netProfit: Math.round(netProfit),
      netMarginPercent: netMarginPercent.toFixed(1),
      breakEvenRoas: breakEvenRoas.toFixed(2),
      isProfitable: netProfit > 0,
      status: rawRoas >= breakEvenRoas * 1.3 ? 'Scalable' : rawRoas >= breakEvenRoas ? 'Break-Even' : 'Loss-Making'
    };
  }, [adSpend, revenue, cogsPercent, shippingPerOrder, aov, rtoPercent, pgPercent]);

  const faqs = [
    {
      q: 'What is the difference between ROAS and POAS?',
      a: 'ROAS (Return on Ad Spend) measures gross revenue divided by ad spend. POAS (Profit On Ad Spend) measures gross profit divided by ad spend, factoring in COGS, logistics, and gateway fees.'
    },
    {
      q: 'How do you calculate Break-Even ROAS in Indian e-commerce?',
      a: 'Break-Even ROAS = 1 / [1 - (COGS% + Gateway% + Shipping Cost / AOV)]. For an Indian brand with 30% COGS and 10% logistics costs, break-even ROAS is typically 1.67x.'
    },
    {
      q: 'Why does high Return-to-Origin (RTO) distort ROAS in India?',
      a: 'Meta Ads records COD orders as purchases at checkout. If 20% to 25% of orders are rejected upon delivery, your real bank cash ROAS is 25% lower than reported in Ads Manager.'
    },
    {
      q: 'How can Indian D2C stores increase net contribution margins?',
      a: 'The highest leverage levers are: (1) Increasing AOV via 2-pack and 3-pack product bundles, (2) Offering instant UPI discounts to convert COD to prepaid, and (3) Implementing WhatsApp automated address verification.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="editorial-tool-page">
      <SeoHead
        title="Meta Ads ROAS & Profit Calculator for Indian D2C"
        description="Free Meta Ads ROAS & real net profit calculator for Indian D2C e-commerce brands. Compute break-even ROAS, POAS, COD RTO impact, and net margins."
        canonicalPath="/tools/meta-ads-roas-calculator"
        ogType="website"
        jsonLd={[
          faqSchema,
          {
            '@type': 'WebApplication',
            name: 'Meta Ads ROAS & Profit Calculator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
            description: 'Free Meta Ads ROAS & real net profit calculator for Indian D2C e-commerce brands.',
          },
        ]}
      />

      {/* Hero Header */}
      <section className="page-hero-pad">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Interactive Tools', path: '/tools/meta-ads-roas-calculator' },
              { name: 'ROAS & Profit Calculator', path: '/tools/meta-ads-roas-calculator' }
            ]}
          />
          <div style={{ maxWidth: '840px' }}>
            <span className="editorial-eyebrow">Interactive Financial Instrument</span>
            <h1 className="hero-h1 display-hero" style={{ marginTop: '16px' }}>
              META ADS ROAS & <span className="brand-span">NET PROFIT CALCULATOR.</span>
            </h1>
            <p className="hero-lead" style={{ maxWidth: '740px' }}>
              Calculate your true net profit, break-even ROAS, and realistic margins after accounting for COGS, shipping, payment gateway fees, and Indian COD Return-to-Origin (RTO).
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <section className="section-pad" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="tool-dashboard-grid">
            {/* Left Column: Form Controls */}
            <div className="tool-panel-card">
              <div className="tool-panel-header">
                <div className="tool-panel-title">
                  <TrendingUp size={22} color="var(--brand)" />
                  <span>Campaign & Store Financials</span>
                </div>
                <span className="badge-pill" style={{ fontSize: '0.74rem' }}>Live Model</span>
              </div>

              {/* Ad Spend Slider */}
              <div className="tool-input-group">
                <div className="tool-input-label-row">
                  <label htmlFor="adSpendInput" className="tool-input-label">
                    Monthly Ad Spend (₹)
                  </label>
                  <span className="tool-input-val">₹{adSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="adSpendInput"
                  type="range"
                  min="10000"
                  max="2500000"
                  step="5000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="tool-slider"
                />
              </div>

              {/* Gross Revenue Slider */}
              <div className="tool-input-group">
                <div className="tool-input-label-row">
                  <label htmlFor="revenueInput" className="tool-input-label">
                    Gross Attributed Revenue (₹)
                  </label>
                  <span className="tool-input-val">₹{revenue.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="revenueInput"
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="tool-slider"
                />
              </div>

              {/* 2-Column Inputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="cogsInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Product COGS (%)
                  </label>
                  <input
                    id="cogsInput"
                    type="number"
                    min="5"
                    max="80"
                    value={cogsPercent}
                    onChange={(e) => setCogsPercent(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="aovInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Avg Order Value (AOV ₹)
                  </label>
                  <input
                    id="aovInput"
                    type="number"
                    min="200"
                    max="50000"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="shippingInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Forward Freight / Order (₹)
                  </label>
                  <input
                    id="shippingInput"
                    type="number"
                    min="0"
                    max="500"
                    value={shippingPerOrder}
                    onChange={(e) => setShippingPerOrder(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="rtoInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    COD Return-to-Origin (%)
                  </label>
                  <input
                    id="rtoInput"
                    type="number"
                    min="0"
                    max="50"
                    value={rtoPercent}
                    onChange={(e) => setRtoPercent(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
              </div>

              <div className="tool-input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="pgInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                  Payment Gateway Fee (%)
                </label>
                <input
                  id="pgInput"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={pgPercent}
                  onChange={(e) => setPgPercent(Number(e.target.value))}
                  className="tool-number-input"
                />
              </div>
            </div>

            {/* Right Column: Performance Results Dashboard */}
            <div className="tool-panel-dark">
              <div>
                <div className="tool-panel-header">
                  <div className="tool-panel-title">
                    <DollarSign size={22} color="var(--gold)" />
                    <span>Real Performance Metrics</span>
                  </div>
                  <span
                    className={`tool-stat-badge ${
                      stats.status === 'Scalable'
                        ? 'scalable'
                        : stats.status === 'Break-Even'
                        ? 'breakeven'
                        : 'loss'
                    }`}
                  >
                    {stats.status}
                  </span>
                </div>

                {/* Primary Metric Boxes */}
                <div className="tool-metric-grid">
                  <div className="tool-metric-box">
                    <div className="tool-metric-label">Front-End ROAS</div>
                    <div className="tool-metric-num" style={{ color: 'var(--gold)' }}>
                      {stats.rawRoas}x
                    </div>
                    <div className="tool-metric-sub">
                      Break-even target: <strong style={{ color: 'var(--softwhite)' }}>{stats.breakEvenRoas}x</strong>
                    </div>
                  </div>

                  <div className="tool-metric-box">
                    <div className="tool-metric-label">True Net Cash Profit</div>
                    <div
                      className="tool-metric-num"
                      style={{
                        color: stats.isProfitable ? '#10B981' : '#EF4444'
                      }}
                    >
                      ₹{stats.netProfit.toLocaleString('en-IN')}
                    </div>
                    <div className="tool-metric-sub">
                      Net Margin: <strong style={{ color: 'var(--softwhite)' }}>{stats.netMarginPercent}%</strong>
                    </div>
                  </div>
                </div>

                {/* Financial Ledger Breakdown */}
                <div style={{ marginTop: '16px' }}>
                  <div className="tool-breakdown-row">
                    <span>Estimated Total Orders</span>
                    <strong style={{ color: 'var(--softwhite)', fontFamily: 'var(--font-mono)' }}>
                      {stats.estimatedOrders} orders
                    </strong>
                  </div>
                  <div className="tool-breakdown-row">
                    <span>Product Manufacturing (COGS)</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -₹{stats.totalCogs.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row">
                    <span>Forward & Reverse Shipping</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -₹{stats.totalShipping.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row">
                    <span>Payment Gateway Fees</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -₹{stats.totalPgFees.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row" style={{ borderBottom: 'none', paddingTop: '14px', fontWeight: 700 }}>
                    <span style={{ color: 'var(--softwhite)' }}>Ad Spend Incurred</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -₹{adSpend.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Conversion CTA Button */}
              <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--charcoal-border)' }}>
                <Link
                  to="/contact"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: '0.95rem' }}
                >
                  Request a Free Ad Account Audit <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* Educational Content & Unit Economics Section */}
          <div
            style={{
              backgroundColor: 'var(--purewhite)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '42px 36px',
              marginTop: '48px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span className="editorial-eyebrow">Unit Economics Framework</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem',
                color: 'var(--charcoal)',
                marginTop: '12px',
                marginBottom: '16px'
              }}
            >
              Why Most Indian D2C Brands Go Broke at a 3x ROAS
            </h2>
            <div style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              <p style={{ marginBottom: '14px' }}>
                Many agency media buyers celebrate a 3x Return on Ad Spend inside Meta Ads Manager while founders notice store bank accounts draining. In Indian e-commerce, Cash on Delivery accounts for 55% to 75% of total checkout volume. With standard 15% to 25% Return-to-Origin (RTO) rates, courier partners charge both forward logistics and reverse delivery surcharges on rejected packages.
              </p>
              <p>
                When factoring in product COGS (typically 30%), courier freight (10%), payment gateway charges (2%), and write-offs on damaged return inventory, an apparent 2.5x to 3.0x front-end ROAS frequently yields an operational net margin close to zero. Sustainable brand scaling requires transitioning from front-end ROAS tracking to <strong>POAS (Profit On Ad Spend)</strong> and <strong>Contribution Margin 3 (CM3)</strong> discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-pad" style={{ backgroundColor: 'var(--cream-subtle)' }}>
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="editorial-eyebrow">Financial Clarifications</span>
            <h2 className="display-title section-title">FREQUENTLY ASKED FINANCIAL QUESTIONS.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(i)}>
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        eyebrow="Ad Account Audit"
        title="WANT REAL NET PROFIT ON META ADS?"
        subtitle="Let's audit your campaigns, diagnose creative fatigue, setup server-side CAPI tracking, and calculate exact product unit margins."
        primaryLabel="Schedule Ad Audit"
        primaryTo="/contact"
      />
    </div>
  );
};
