'use client';

import { ReactNode } from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * AnimatedSection Component
 * 
 * A reusable section wrapper that fades and slides in when it enters the viewport.
 * Uses IntersectionObserver for lazy loading and smooth animations.
 * 
 * @param children - Content to wrap
 * @param className - Additional CSS classes
 * @param threshold - IntersectionObserver threshold (default: 0.1)
 * @param rootMargin - IntersectionObserver rootMargin (default: '50px')
 */
export default function AnimatedSection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}: AnimatedSectionProps) {
  const { ref, isVisible } = useFadeInOnScroll({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`animated-section ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

