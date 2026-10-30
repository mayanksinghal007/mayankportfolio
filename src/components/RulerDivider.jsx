import React from 'react';

export const RulerDivider = ({ label = 'SYSTEM TIMELINE // 0.00s' }) => {
  return (
    <div className="ruler-divider" aria-hidden="true">
      <div className="ruler-track">
        <div className="ruler-ticks" />
        <div className="ruler-playhead" />
      </div>
      {label && (
        <span
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--mutedtext)',
            opacity: 0.6,
            backgroundColor: 'var(--bg-color)',
            padding: '2px 8px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
