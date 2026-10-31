import React from 'react';

/**
 * Preloader component:
 * Kept as non-blocking null pass-through to ensure instant Speed Index (<1.0s)
 * and 0ms Total Blocking Time (TBT). The Hero section now serves as the
 * primary cinematic motion-graphics opener.
 */
export const Preloader = ({ onComplete }) => {
  React.useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  return null;
};
