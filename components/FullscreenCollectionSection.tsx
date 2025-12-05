'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Collection, getCollectionProducts } from '@/lib/collections';

interface FullscreenCollectionSectionProps {
  collection: Collection;
  index: number;
}

/**
 * FullscreenCollectionSection Component
 * 
 * Renders a full-viewport collection section with:
 * - Full-bleed background image
 * - Gradient overlay for text readability
 * - Minimal content block with collection name, description, and CTA
 * - Fade-in animation on scroll using IntersectionObserver
 * - Scroll-snap alignment
 * 
 * Special behavior for "MYSTIC NATURE - DROP 02":
 * - Shows "NOTIFY ME" button instead of "View Collection"
 * - On click, reveals email signup form with smooth animation
 */
export default function FullscreenCollectionSection({ 
  collection, 
  index 
}: FullscreenCollectionSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const collectionProducts = getCollectionProducts(collection);
  const firstProduct = collectionProducts[0];
  const imageSrc = collection.image || firstProduct?.image || '/products/product1.jpg';
  
  // Check if this is the MYSTIC NATURE - DROP 02 collection
  const isMysticNature = collection.name === 'MYSTIC NATURE - DROP 02';

  // IntersectionObserver for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate form appearance when showNotifyForm changes to true
  useEffect(() => {
    if (showNotifyForm && formRef.current) {
      // Trigger animation by adding visible class after a small delay
      setTimeout(() => {
        formRef.current?.classList.add('form-visible');
      }, 10);
    }
  }, [showNotifyForm]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call (replace with actual API endpoint later)
    setTimeout(() => {
      console.log('Email submitted:', email);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Keep form visible after success
    }, 500);
  };

  // Handle NOTIFY ME button click
  const handleNotifyClick = () => {
    setShowNotifyForm(true);
  };

  return (
    <section
      ref={sectionRef}
      className="fullscreen-collection-section"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      {/* Full-bleed background image */}
      <div className="fullscreen-collection-bg">
        <Image
          src={imageSrc}
          alt={collection.name}
          fill
          priority={index === 0} // Only prioritize first image
          loading={index === 0 ? 'eager' : 'lazy'}
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="fullscreen-collection-overlay" />
      </div>

      {/* Content block */}
      <div 
        className={`fullscreen-collection-content ${isVisible ? 'visible' : ''}`}
      >
        <div className="fullscreen-collection-text">
          {collection.comingSoon && (
            <span className="fullscreen-collection-badge">Coming Soon</span>
          )}
          <h2 className="fullscreen-collection-title">{collection.name}</h2>
          {collection.description && (
            <p className="fullscreen-collection-description">
              {collection.description}
            </p>
          )}
          <p className="fullscreen-collection-count">
            {collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'}
          </p>
          
          {/* Special behavior for MYSTIC NATURE - DROP 02: Show NOTIFY ME button/form */}
          {isMysticNature ? (
            <>
              {!showNotifyForm ? (
                <button
                  onClick={handleNotifyClick}
                  className="fullscreen-collection-cta"
                  type="button"
                >
                  Notify Me
                </button>
              ) : (
                <div 
                  ref={formRef}
                  className="fullscreen-collection-notify-form"
                >
                  {submitSuccess ? (
                    <div className="notify-form-success">
                      <p>We'll notify you when this drop is available.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="notify-form">
                      <div className="notify-form-group">
                        <input
                          type="email"
                          id={`notify-email-${collection.id}`}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                          }}
                          placeholder="Enter your email"
                          className="notify-form-input"
                          required
                          aria-label="Enter your email address"
                          disabled={isSubmitting}
                        />
                        {emailError && (
                          <span className="notify-form-error" role="alert">
                            {emailError}
                          </span>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="notify-form-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Notify Me'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Regular collections: Show View Collection button */
            !collection.comingSoon && (
              <Link 
                href={`/collections?id=${collection.id}`}
                className="fullscreen-collection-cta"
              >
                View Collection
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

