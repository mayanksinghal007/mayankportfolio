import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <section
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px',
        backgroundColor: 'var(--softwhite)',
      }}
    >
      <div style={{ maxWidth: '580px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 9rem)',
            lineHeight: 0.9,
            color: 'var(--brand)',
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem',
            color: 'var(--charcoal)',
            marginBottom: '12px',
          }}
        >
          PAGE DOES NOT EXIST.
        </h1>
        <p style={{ color: 'var(--mutedtext)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
          The link you followed may have expired or been relocated. Let's get you back to the portfolio or explore available services.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link to="/services" className="btn-secondary">
            <Compass size={16} /> Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};
