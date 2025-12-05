'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollDownIndicator from '@/components/ScrollDownIndicator';
import { products } from '@/lib/products';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

/**
 * LazyProductCard Component
 * 
 * Wraps a product card with lazy-loading fade-in animation.
 * Only renders when it enters the viewport using IntersectionObserver.
 */
function LazyProductCard({ 
  product, 
  imageIndices, 
  hoveredProduct, 
  onMouseEnter, 
  onMouseLeave,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  isDragging,
  getCurrentImage
}: {
  product: typeof products[0];
  imageIndices: { [key: number]: number };
  hoveredProduct: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  handleTouchStart: (e: React.TouchEvent, productId: number) => void;
  handleTouchMove: (e: React.TouchEvent, productId: number) => void;
  handleTouchEnd: (e: React.TouchEvent, product: typeof products[0]) => void;
  handleMouseDown: (e: React.MouseEvent, productId: number) => void;
  handleMouseMove: (e: React.MouseEvent, product: typeof products[0]) => void;
  handleMouseUp: (e: React.MouseEvent, product: typeof products[0]) => void;
  isDragging: React.MutableRefObject<{ [key: number]: boolean }>;
  getCurrentImage: (product: typeof products[0]) => string;
}) {
  const { ref, isVisible } = useFadeInOnScroll({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`lazy-product-wrapper ${isVisible ? 'visible' : ''}`}
    >
      <Link 
        href={`/product?id=${product.id}`} 
        className="product-card" 
        data-product={product.id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div 
          className="product-image"
          onTouchStart={(e) => handleTouchStart(e, product.id)}
          onTouchMove={(e) => handleTouchMove(e, product.id)}
          onTouchEnd={(e) => handleTouchEnd(e, product)}
          onMouseDown={(e) => handleMouseDown(e, product.id)}
          onMouseMove={(e) => handleMouseMove(e, product)}
          onMouseUp={(e) => handleMouseUp(e, product)}
          onMouseLeave={(e) => {
            if (isDragging.current[product.id]) {
              isDragging.current[product.id] = false;
            }
          }}
          style={{ touchAction: 'pan-y', cursor: 'grab', userSelect: 'none' }}
        >
          <Image 
            key={`${product.id}-${imageIndices[product.id] || 0}-${hoveredProduct === product.id ? 'hover' : 'normal'}`}
            src={getCurrentImage(product)} 
            alt={product.name}
            width={500}
            height={700}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">
            {product.id === 1 || product.id === 2 || product.id === 3 ? (
              <>Rs. {product.price}</>
            ) : (
              <>
                ${product.price.toFixed(2)}
                {product.originalPrice && (
                  <>
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    {product.discount && <span className="discount">{product.discount}% OFF</span>}
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const [imageIndices, setImageIndices] = useState<{ [key: number]: number }>({});
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const touchStartX = useRef<{ [key: number]: number }>({});
  const touchStartY = useRef<{ [key: number]: number }>({});
  const mouseStartX = useRef<{ [key: number]: number }>({});
  const isDragging = useRef<{ [key: number]: boolean }>({});

  const getCurrentImage = (product: typeof products[0]) => {
    const images = product.images || [product.image];
    const currentIndex = imageIndices[product.id] || 0;
    
    // On hover, show the next image if available
    if (hoveredProduct === product.id && images.length > 1) {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      return images[nextIndex];
    }
    
    return images[currentIndex];
  };

  const handleTouchStart = (e: React.TouchEvent, productId: number) => {
    touchStartX.current[productId] = e.touches[0].clientX;
    touchStartY.current[productId] = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent, productId: number) => {
    // Prevent default to avoid scrolling while swiping
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent, product: typeof products[0]) => {
    const productId = product.id;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const startX = touchStartX.current[productId] || 0;
    const startY = touchStartY.current[productId] || 0;
    
    const deltaX = touchEndX - startX;
    const deltaY = touchEndY - startY;
    
    // Only process swipe if horizontal movement is greater than vertical (to avoid conflicts with scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      const images = product.images || [product.image];
      const currentIndex = imageIndices[productId] || 0;
      
      if (deltaX > 0) {
        // Swipe right - previous image
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setImageIndices({ ...imageIndices, [productId]: newIndex });
      } else {
        // Swipe left - next image
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setImageIndices({ ...imageIndices, [productId]: newIndex });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent, productId: number) => {
    isDragging.current[productId] = true;
    mouseStartX.current[productId] = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent, product: typeof products[0]) => {
    const productId = product.id;
    if (!isDragging.current[productId]) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent, product: typeof products[0]) => {
    const productId = product.id;
    if (!isDragging.current[productId]) return;
    
    const mouseEndX = e.clientX;
    const startX = mouseStartX.current[productId] || 0;
    const deltaX = mouseEndX - startX;
    
    if (Math.abs(deltaX) > 50) {
      const images = product.images || [product.image];
      const currentIndex = imageIndices[productId] || 0;
      
      if (deltaX > 0) {
        // Drag right - previous image
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setImageIndices({ ...imageIndices, [productId]: newIndex });
      } else {
        // Drag left - next image
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setImageIndices({ ...imageIndices, [productId]: newIndex });
      }
    }
    
    isDragging.current[productId] = false;
  };

  return (
    <>
      <Navbar activePage="home" />
      
      <section className="hero" id="home">
        <div className="hero-banner-wrapper">
          <img 
            src="/bannerimages/bannerimage.jpg" 
            alt="Veloria Clothing Hero Banner"
            className="hero-banner-image"
            loading="eager"
          />
          {/* Gradient overlay for scroll indicator readability */}
          <div className="hero-overlay-gradient" />
        </div>
        {/* Scroll down indicator - appears at bottom-center of hero */}
        {showScrollIndicator && (
          <ScrollDownIndicator onDismiss={() => setShowScrollIndicator(false)} />
        )}
      </section>

      <section className="section" id="new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link href="/shop" className="section-link">View All</Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <LazyProductCard
                key={product.id}
                product={product}
                imageIndices={imageIndices}
                hoveredProduct={hoveredProduct}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                isDragging={isDragging}
                getCurrentImage={getCurrentImage}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-description">Get the latest arrivals and exclusive offers</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
