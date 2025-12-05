'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

/**
 * About Us Page - Veloria Brand Story
 * 
 * Editorial, section-based layout with lazy loading animations.
 * Inspired by premium streetwear brand storytelling.
 * 
 * IMAGE PLACEHOLDERS:
 * - heroImage: Currently using banner image (easy to swap)
 * - sectionImage1: Currently using product image (easy to swap)
 * - sectionImage2: Currently using product image (easy to swap)
 * 
 * To swap images: Update the image paths in the constants below.
 */

// Image placeholders - easy to swap later
const IMAGE_PLACEHOLDERS = {
  hero: '/bannerimages/bannerimage.jpg',
  section1: '/products/product1.jpg',
  section2: '/products/product2.jpg',
  section3: '/products/product3.jpg'
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar activePage="home" />

      {/* Hero Section - Full-width with overlay */}
      <section className="about-hero">
        <div className="about-hero-image">
          <Image
            src={IMAGE_PLACEHOLDERS.hero}
            alt="Veloria"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Veloria</h1>
          <p className="about-hero-tagline">
            Start simple. Grow with purpose. Evolve into something meaningful.
          </p>
        </div>
      </section>

      {/* Section 1: Who We Are */}
      <AnimatedSection className="about-content-section">
        <div className="container">
          <div className="about-section-content">
            <div className="about-text-block">
              <h2 className="about-section-title">Who We Are</h2>
              <div className="about-text-content">
                <p>
                  Veloria is a clothing brand built on a simple idea — create designs that feel meaningful, modern, and connected to something deeper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 2: How We Started - Split layout with image */}
      <AnimatedSection className="about-content-section about-section-alt">
        <div className="container">
          <div className="about-split-layout">
            <div className="about-split-image">
              <Image
                src={IMAGE_PLACEHOLDERS.section1}
                alt="Veloria Collection"
                width={600}
                height={800}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="about-split-text">
              <h2 className="about-section-title">How We Started</h2>
              <div className="about-text-content">
                <p>
                  We started our journey with clean and aesthetic graphic prints, keeping our first drops simple and accessible. As a young brand, this allows us to focus on quality, fit, and building a strong foundation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3: Our Vision */}
      <AnimatedSection className="about-content-section">
        <div className="container">
          <div className="about-section-content">
            <div className="about-text-block">
              <h2 className="about-section-title">Our Vision</h2>
              <div className="about-text-content">
                <p>
                  But our vision goes much further.
                </p>
                <p>
                  In the future, Veloria aims to explore the rich art, stories, and cultural identities of different states across India. Every region has its own unique style, symbols, and emotions — and we want to bring those elements into modern streetwear in a fresh and thoughtful way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4: Our Path - Split layout with image */}
      <AnimatedSection className="about-content-section about-section-alt">
        <div className="container">
          <div className="about-split-layout about-split-layout-reverse">
            <div className="about-split-image">
              <Image
                src={IMAGE_PLACEHOLDERS.section2}
                alt="Veloria Vision"
                width={600}
                height={800}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="about-split-text">
              <h2 className="about-section-title">Our Path</h2>
              <div className="about-text-content">
                <p>
                  Our path is clear:
                </p>
                <p className="about-path-statement">
                  Start simple. Grow with purpose. Evolve into something meaningful.
                </p>
                <p>
                  Every collection we release is a step forward in that direction. From bold graphics to detailed artistic prints, each piece is designed to express individuality and tell a story — yours and ours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 5: A Journey in Progress */}
      <AnimatedSection className="about-content-section">
        <div className="container">
          <div className="about-section-content">
            <div className="about-text-block">
              <h2 className="about-section-title">A Journey in Progress</h2>
              <div className="about-text-content">
                <p>
                  Veloria isn't just clothing.
                </p>
                <p>
                  It's a journey we're building one drop at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Full-width image section */}
      <AnimatedSection className="about-full-image-section">
        <div className="about-full-image">
          <Image
            src={IMAGE_PLACEHOLDERS.section3}
            alt="Veloria Journey"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
            sizes="100vw"
          />
        </div>
      </AnimatedSection>

      <Footer />
    </>
  );
}

