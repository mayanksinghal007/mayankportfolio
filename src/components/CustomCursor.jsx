import React, { useEffect, useRef, useState } from 'react';

/**
 * Award-Winning Interactive Custom Cursor
 * - Smooth physics trailing dot + fluid ring
 * - Automatically expands and inverts over interactive elements
 * - Displays contextual text badges ("VIEW", "PLAY", "DRAG") over portfolio & media
 * - Disabled automatically on touch / mobile devices
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Immediately move the center dot for zero-latency response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check contextual hover elements
      const target = e.target.closest('a, button, [data-cursor], .portfolio-card, .service-card, .showreel-card');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (target.classList.contains('showreel-card') || target.closest('.showreel-card')) {
          setCursorText('PLAY');
        } else if (target.classList.contains('portfolio-card') || target.closest('.portfolio-card')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics lerp loop for the outer fluid ring
    const render = () => {
      // 0.18 linear interpolation factor for smooth weighted inertia
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`awwwards-cursor ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${
        cursorText ? 'has-text' : ''
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Trailing Fluid Inertia Ring */}
      <div ref={ringRef} className="cursor-ring">
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </div>
  );
};
