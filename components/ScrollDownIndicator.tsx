'use client';

import { useEffect, useState } from 'react';

interface ScrollDownIndicatorProps {
  onDismiss?: () => void;
}

/**
 * ScrollDownIndicator Component
 * 
 * A premium, minimal scroll-down prompt with:
 * - Gentle pulsing opacity animation
 * - Subtle up-down motion
 * - Fades out on user scroll or click
 * - Luxury/editorial aesthetic
 */
export default function ScrollDownIndicator({ onDismiss }: ScrollDownIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide indicator on any scroll movement (more than 10px)
          if (Math.abs(currentScrollY - lastScrollY) > 10) {
            setIsVisible(false);
            onDismiss?.();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouch);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    };

    const handleWheel = () => {
      setIsVisible(false);
      onDismiss?.();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
    };

    const handleTouch = () => {
      setIsVisible(false);
      onDismiss?.();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [onDismiss]);

  const handleClick = () => {
    setIsVisible(false);
    onDismiss?.();
    
    // Smooth scroll down a bit
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="scroll-down-indicator"
      aria-label="Scroll down for more content"
      type="button"
    >
      <span className="scroll-down-text">Scroll Down</span>
      <span className="scroll-down-arrow">↓</span>
    </button>
  );
}

