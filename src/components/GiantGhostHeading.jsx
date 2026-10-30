import React from 'react';

export const GiantGhostHeading = ({ text, offset = '0%' }) => {
  return (
    <div
      className="giant-ghost-text"
      aria-hidden="true"
      style={{
        top: offset,
      }}
    >
      {text}
    </div>
  );
};
