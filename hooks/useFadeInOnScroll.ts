import { useEffect, useRef, useState } from 'react';

/**
 * useFadeInOnScroll Hook
 * 
 * Uses IntersectionObserver to detect when an element enters the viewport
 * and triggers a fade-in animation. Optimized for performance with lazy loading.
 * 
 * @param options - Configuration options for the IntersectionObserver
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 */
export function useFadeInOnScroll(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options || {};

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, don't observe again
    if (hasTriggered.current && triggerOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              hasTriggered.current = true;
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
}

