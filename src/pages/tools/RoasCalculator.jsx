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
  // Mode: 'USD' | 'GBP' | 'AED' | 'INR'
  const [currency, setCurrency] = useState('USD');

  // Financial Inputs
  const [adSpend, setAdSpend] = useState(5000);
  const [revenue, setRevenue] = useState(17500);
  const [cogsPercent, setCogsPercent] = useState(30);
  const [shippingPerOrder, setShippingPerOrder] = useState(6);
  const [aov, setAov] = useState(75);
  const [rtoPercent, setRtoPercent] = useState(3);
  const [pgPercent, setPgPercent] = useState(2.9);
  const [openFaq, setOpenFaq] = useState(null);

  const handleCurrencyChange = (newCur) => {
    setCurrency(newCur);
    if (newCur === 'USD') {
      setAdSpend(5000);
      setRevenue(17500);
      setCogsPercent(30);
      setShippingPerOrder(6);
      setAov(75);
      setRtoPercent(3);
      setPgPercent(2.9);
    } else if (newCur === 'GBP') {
      setAdSpend(4000);
      setRevenue(14000);
      setCogsPercent(30);
      setShippingPerOrder(5);
      setAov(60);
      setRtoPercent(4);
      setPgPercent(2.5);
    } else if (newCur === 'AED') {
      setAdSpend(18000);
      setRevenue(65000);
      setCogsPercent(28);
      setShippingPerOrder(25);
      setAov(280);
      setRtoPercent(8);
      setPgPercent(2.8);
    } else {
      setAdSpend(100000);
      setRevenue(350000);
      setCogsPercent(30);
      setShippingPerOrder(90);
      setAov(1500);
      setRtoPercent(15);
      setPgPercent(2.0);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const curSymbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : currency === 'AED' ? 'AED ' : '₹';

  const formatCurrency = (val) => {
    const rounded = Math.round(val);
    switch (currency) {
      case 'USD':
        return `$${rounded.toLocaleString('en-US')}`;
      case 'GBP':
        return `£${rounded.toLocaleString('en-GB')}`;
      case 'AED':
        return `AED ${rounded.toLocaleString('en-AE')}`;
      case 'INR':
      default:
        return `₹${rounded.toLocaleString('en-IN')}`;
    }
  };

  // Computations
  const stats = useMemo(() => {
    const rawRoas = adSpend > 0 ? revenue / adSpend : 0;
    const estimatedOrders = aov > 0 ? Math.round(revenue / aov) : 0;

    // Total COGS
    const totalCogs = revenue * (cogsPercent / 100);

    // Shipping fees (forward + return for RTO/returns)
    const deliveredOrders = estimatedOrders * (1 - rtoPercent / 100);
    const rtoOrders = estimatedOrders * (rtoPercent / 100);
    const returnMultiplier = currency === 'INR' ? 1.6 : 1.2;
    const totalShipping = deliveredOrders * shippingPerOrder + rtoOrders * shippingPerOrder * returnMultiplier;

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
  }, [adSpend, revenue, cogsPercent, shippingPerOrder, aov, rtoPercent, pgPercent, currency]);

  const faqs = [
    {
      q: 'What is the difference between ROAS and POAS?',
      a: 'ROAS (Return on Ad Spend) measures gross revenue divided by ad spend. POAS (Profit On Ad Spend) measures gross profit divided by ad spend, factoring in COGS, logistics, and gateway fees.'
    },
    {
      q: 'How do you calculate Break-Even ROAS in e-commerce?',
      a: 'Break-Even ROAS = 1 / [1 - (COGS% + Gateway% + Shipping Cost / AOV)]. For a DTC brand with 30% COGS and 10% fulfillment/returns cost, break-even ROAS is typically 1.67x.'
    },
    {
      q: 'Why do returns or COD Return-to-Origin (RTO) distort ROAS?',
      a: 'Meta Ads records purchases at checkout. If 10% to 20% of orders are returned or rejected upon delivery, your real bank cash ROAS is significantly lower than reported in Ads Manager.'
    },
    {
      q: 'How can DTC stores increase net contribution margins?',
      a: 'The highest leverage levers are: (1) Increasing AOV via multi-pack product bundles, (2) Optimizing high-converting direct-response video hooks, and (3) Implementing post-purchase email/SMS flows to drive organic repeat purchases.'
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
        title="Meta Ads ROAS & Profit Calculator | Free E-Commerce Tool"
        description="Free Meta Ads ROAS & net profit calculator for US, UK, and global e-commerce brands. Compute break-even ROAS, POAS, COGS, and contribution margin."
        keywords={[
          'Meta Ads ROAS Calculator',
          'Break Even ROAS Calculator',
          'E-commerce Profit Calculator',
          'POAS Calculator',
          'Return on Ad Spend Calculator',
          'Facebook Ads Calculator',
          'D2C Margin Calculator'
        ]}
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
              priceCurrency: currency,
            },
            description: 'Free Meta Ads ROAS & real net profit calculator for US, UK, and global e-commerce brands.',
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
              Calculate your true net profit, break-even ROAS, and realistic margins after accounting for COGS, shipping/fulfillment, payment gateway fees (Stripe/Shopify), and return/RTO rates.
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

              {/* Currency Mode Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '20px', background: 'var(--cream-subtle)', padding: '4px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('USD')}
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: currency === 'USD' ? 'var(--charcoal)' : 'transparent',
                    color: currency === 'USD' ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  US ($)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('GBP')}
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: currency === 'GBP' ? 'var(--charcoal)' : 'transparent',
                    color: currency === 'GBP' ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  UK (£)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('AED')}
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: currency === 'AED' ? 'var(--charcoal)' : 'transparent',
                    color: currency === 'AED' ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  UAE (AED)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('INR')}
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: currency === 'INR' ? 'var(--charcoal)' : 'transparent',
                    color: currency === 'INR' ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  India (₹)
                </button>
              </div>

              {/* Ad Spend Slider */}
              <div className="tool-input-group">
                <div className="tool-input-label-row">
                  <label htmlFor="adSpendInput" className="tool-input-label">
                    Monthly Ad Spend ({curSymbol.trim()})
                  </label>
                  <span className="tool-input-val">{formatCurrency(adSpend)}</span>
                </div>
                <input
                  id="adSpendInput"
                  type="range"
                  min={currency === 'INR' ? 10000 : (currency === 'AED' ? 1500 : 500)}
                  max={currency === 'INR' ? 2500000 : (currency === 'AED' ? 350000 : 100000)}
                  step={currency === 'INR' ? 5000 : (currency === 'AED' ? 500 : 250)}
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="tool-slider"
                />
              </div>

              {/* Gross Revenue Slider */}
              <div className="tool-input-group">
                <div className="tool-input-label-row">
                  <label htmlFor="revenueInput" className="tool-input-label">
                    Gross Attributed Revenue ({curSymbol.trim()})
                  </label>
                  <span className="tool-input-val">{formatCurrency(revenue)}</span>
                </div>
                <input
                  id="revenueInput"
                  type="range"
                  min={currency === 'INR' ? 10000 : (currency === 'AED' ? 3000 : 1000)}
                  max={currency === 'INR' ? 10000000 : (currency === 'AED' ? 1000000 : 300000)}
                  step={currency === 'INR' ? 10000 : (currency === 'AED' ? 1000 : 500)}
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
                    Avg Order Value ({curSymbol.trim()})
                  </label>
                  <input
                    id="aovInput"
                    type="number"
                    min={currency === 'INR' ? 200 : (currency === 'AED' ? 50 : 10)}
                    max={currency === 'INR' ? 50000 : (currency === 'AED' ? 5000 : 1000)}
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="shippingInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Fulfillment / Order ({curSymbol.trim()})
                  </label>
                  <input
                    id="shippingInput"
                    type="number"
                    min="0"
                    max={currency === 'INR' ? 500 : (currency === 'AED' ? 150 : 50)}
                    step={currency === 'INR' ? '5' : (currency === 'AED' ? '1' : '0.5')}
                    value={shippingPerOrder}
                    onChange={(e) => setShippingPerOrder(Number(e.target.value))}
                    className="tool-number-input"
                  />
                </div>
                <div className="tool-input-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="rtoInput" className="tool-input-label" style={{ display: 'block', marginBottom: '6px' }}>
                    {currency === 'INR' ? 'COD Return Rate (%)' : currency === 'AED' ? 'RTO & Return Rate (%)' : 'Return Rate (%)'}
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
                      {formatCurrency(stats.netProfit)}
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
                      -{formatCurrency(stats.totalCogs)}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row">
                    <span>Fulfillment & Returns Logistics</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -{formatCurrency(stats.totalShipping)}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row">
                    <span>Merchant / Gateway Fees</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -{formatCurrency(stats.totalPgFees)}
                    </strong>
                  </div>
                  <div className="tool-breakdown-row" style={{ borderBottom: 'none', paddingTop: '14px', fontWeight: 700 }}>
                    <span style={{ color: 'var(--softwhite)' }}>Ad Spend Incurred</span>
                    <strong style={{ color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                      -{formatCurrency(adSpend)}
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
              Why Most E-Commerce Brands Struggle Even at a 3x ROAS
            </h2>
            <div style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: '1.75' }}>
              <p style={{ marginBottom: '14px' }}>
                Many media buyers celebrate a 3x Return on Ad Spend inside Meta Ads Manager while founders notice store bank accounts draining. In global DTC and domestic e-commerce alike, true unit economics determine cash profitability. Between product COGS (typically 25%–35%), shipping freight, payment processor fees (Stripe/Shopify 2.9% or COD reverse surcharges), and customer returns/chargebacks, an apparent 3.0x front-end ROAS frequently yields an operational net profit margin under 5%.
              </p>
              <p>
                When factoring in hidden fees, forward logistics, and return inventory write-downs, scaling ad spend without knowing your break-even floor accelerates cash burn. Sustainable brand scaling requires transitioning from front-end ROAS tracking to <strong>POAS (Profit On Ad Spend)</strong> and <strong>Contribution Margin 3 (CM3)</strong> discipline.
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
