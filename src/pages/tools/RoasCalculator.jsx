import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/SeoHead';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, DollarSign } from 'lucide-react';

export const RoasCalculator = () => {
  // Inputs
  const [adSpend, setAdSpend] = useState(100000);
  const [revenue, setRevenue] = useState(350000);
  const [cogsPercent, setCogsPercent] = useState(30);
  const [shippingPerOrder, setShippingPerOrder] = useState(90);
  const [aov, setAov] = useState(1500);
  const [rtoPercent, setRtoPercent] = useState(15);
  const [pgPercent, setPgPercent] = useState(2);

  // Computations
  const stats = useMemo(() => {
    const rawRoas = adSpend > 0 ? (revenue / adSpend) : 0;
    const estimatedOrders = aov > 0 ? Math.round(revenue / aov) : 0;
    
    // Total COGS
    const totalCogs = revenue * (cogsPercent / 100);
    
    // Shipping fees (forward + return for RTO)
    const deliveredOrders = estimatedOrders * (1 - rtoPercent / 100);
    const rtoOrders = estimatedOrders * (rtoPercent / 100);
    const totalShipping = (deliveredOrders * shippingPerOrder) + (rtoOrders * shippingPerOrder * 1.6);
    
    // Payment gateway fees
    const totalPgFees = revenue * (pgPercent / 100);
    
    // Net profit
    const netProfit = revenue - adSpend - totalCogs - totalShipping - totalPgFees;
    const netMarginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    
    // Break-even ROAS
    const unitGrossMargin = 1 - (cogsPercent / 100) - (pgPercent / 100) - (shippingPerOrder / aov);
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
      q: "What is the difference between ROAS and POAS?",
      a: "ROAS (Return on Ad Spend) measures gross revenue divided by ad spend. POAS (Profit On Ad Spend) measures gross profit divided by ad spend, factoring in COGS, shipping, and transaction fees."
    },
    {
      q: "How do you calculate Break-Even ROAS in Indian e-commerce?",
      a: "Break-Even ROAS = 1 / [1 - (COGS% + Gateway% + Shipping Cost / AOV)]. For a brand with 30% COGS and 10% logistics costs, break-even ROAS is typically 1.67x."
    },
    {
      q: "Why does high Return-to-Origin (RTO) distort ROAS in India?",
      a: "Meta Ads records COD orders as conversions at checkout. If 25% of those orders are returned, your real cash ROAS is 25% lower than reported in Ads Manager."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      <SeoHead
        title="Meta Ads ROAS & Profit Calculator for Indian D2C"
        description="Free Meta Ads ROAS & real net profit calculator for Indian D2C e-commerce brands. Compute break-even ROAS, POAS, COD RTO impact, and net margins."
        canonical="https://mayank-aggarwal.vercel.app/tools/meta-ads-roas-calculator"
        type="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-200">Tools</span>
          <span>/</span>
          <span className="text-indigo-400">ROAS Calculator</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Tool for E-Commerce</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Meta Ads ROAS & Net Profit Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Calculate your true net profit, break-even ROAS, and realistic margins after accounting for COGS, shipping, payment gateway fees, and Indian COD Return-to-Origin (RTO).
          </p>
        </div>

        {/* Main Grid: Inputs & Output Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Campaign & Store Financials</span>
            </h2>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <label htmlFor="adSpendInput">Monthly Ad Spend (₹)</label>
                <span className="text-indigo-400 font-mono">₹{adSpend.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="adSpendInput"
                type="range"
                min="10000"
                max="2500000"
                step="5000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <label htmlFor="revenueInput">Gross Attributed Revenue (₹)</label>
                <span className="text-indigo-400 font-mono">₹{revenue.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="revenueInput"
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cogsInput" className="block text-xs font-semibold text-slate-300 mb-1">Product COGS (%)</label>
                <input
                  id="cogsInput"
                  type="number"
                  min="5"
                  max="80"
                  value={cogsPercent}
                  onChange={(e) => setCogsPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="aovInput" className="block text-xs font-semibold text-slate-300 mb-1">Average Order Value (₹)</label>
                <input
                  id="aovInput"
                  type="number"
                  min="200"
                  max="25000"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="shippingInput" className="block text-xs font-semibold text-slate-300 mb-1">Shipping Cost/Order (₹)</label>
                <input
                  id="shippingInput"
                  type="number"
                  min="0"
                  max="500"
                  value={shippingPerOrder}
                  onChange={(e) => setShippingPerOrder(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="rtoInput" className="block text-xs font-semibold text-slate-300 mb-1">COD RTO Rate (%)</label>
                <input
                  id="rtoInput"
                  type="number"
                  min="0"
                  max="50"
                  value={rtoPercent}
                  onChange={(e) => setRtoPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pgInput" className="block text-xs font-semibold text-slate-300 mb-1">Payment Gateway Fee (%)</label>
              <input
                id="pgInput"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={pgPercent}
                onChange={(e) => setPgPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Results Dashboard Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Real Performance Metrics</span>
                </h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  stats.status === 'Scalable' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  stats.status === 'Break-Even' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {stats.status}
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-1">Front-End ROAS</div>
                  <div className="text-3xl font-black text-indigo-400">{stats.rawRoas}x</div>
                  <div className="text-[11px] text-slate-400 mt-1">Break-even target: {stats.breakEvenRoas}x</div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-1">True Net Profit</div>
                  <div className={`text-3xl font-black ${stats.isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ₹{stats.netProfit.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Net Margin: {stats.netMarginPercent}%</div>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span>Estimated Total Orders</span>
                  <span className="font-mono text-white">{stats.estimatedOrders} orders</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span>Product Manufacturing (COGS)</span>
                  <span className="font-mono text-rose-300">-₹{stats.totalCogs.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span>Forward & Return Shipping</span>
                  <span className="font-mono text-rose-300">-₹{stats.totalShipping.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span>Payment Gateway Fees</span>
                  <span className="font-mono text-rose-300">-₹{stats.totalPgFees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300 font-semibold">
                  <span>Ad Spend Billed</span>
                  <span className="font-mono text-rose-300">-₹{adSpend.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all"
              >
                <span>Request a Professional Ad Account Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Educational Content & AEO Section */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Direct Answer: Why Most Brands Go Broke at a 3x ROAS</h2>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Many agency media buyers report high ROAS numbers while store bank accounts run empty. In Indian e-commerce, Cash on Delivery accounts for 55% to 75% of purchases. With 20% Return-to-Origin rates, shipping companies charge both forward freight and reverse return fees.
            </p>
            <p>
              When product COGS (30%), shipping (12%), gateway fees (2%), and RTO losses (8%) are deducted, a 2.5x ROAS often yields zero net profit. True scalability requires tracking POAS (Profit On Ad Spend) and Contribution Margin 3 (CM3).
            </p>
          </div>
        </section>

        {/* Structured FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <span>Frequently Asked Financial Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
                <h3 className="font-bold text-sm text-white mb-2">{faq.q}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
