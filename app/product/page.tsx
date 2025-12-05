'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/lib/products';

function ProductContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const product = productId ? getProductById(Number(productId)) : products[0];
  const [activeTab, setActiveTab] = useState('description');
  
  if (!product) {
    return (
      <>
        <Navbar activePage="product" />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>Product not found</h1>
          <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
        <Footer />
      </>
    );
  }
  
  const displayImages = product.images || [product.image];
  
  return (
    <>
      <Navbar activePage="product" />

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      <section className="product-detail">
        <div className="container">
          <div className="product-layout">
            <div className="product-images">
              <div className="product-image-stack">
                {displayImages.map((img, index) => (
                  <div key={index} className="stack-image">
                    <Image 
                      src={img} 
                      alt={`${product.name} - Image ${index + 1}`}
                      width={800}
                      height={800}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
              </div>

              <div className="product-price">
                {product.id === 1 || product.id === 2 || product.id === 3 ? (
                  <span className="current-price">Rs. {product.price}</span>
                ) : (
                  <>
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        {product.discount && <span className="discount">{product.discount}% OFF</span>}
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="product-options">
                <div className="option-group">
                  <h3>Size</h3>
                  <div className="size-options">
                    {product.sizes.filter(size => size !== 'XS').map((size) => (
                      <button key={size} className={`size-option ${size === 'S' ? 'active' : ''}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                  <Link href="#size-guide" className="size-guide-link">Size Guide</Link>
                </div>

                <div className="option-group">
                  <h3>Quantity</h3>
                  <div className="quantity-selector">
                    <button className="quantity-btn">-</button>
                    <input type="number" defaultValue={1} min={1} max={10} />
                    <button className="quantity-btn">+</button>
                  </div>
                </div>
              </div>

              <div className="product-actions">
                <button className="btn btn-primary btn-large">
                  <i className="fas fa-shopping-bag"></i>
                  Add to Bag
                </button>
                <button className="btn btn-outline btn-large">
                  <i className="far fa-heart"></i>
                  Add to Wishlist
                </button>
              </div>

              <div className="product-features">
                <div className="feature">
                  <i className="fas fa-truck"></i>
                  <div>
                    <h4>Free Shipping all over India</h4>
                    <p>Delivery Time : 2-7 Business days</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-undo"></i>
                  <div>
                    <h4>Easy Returns</h4>
                    <p>7-days return policy</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <h4>Secure Payment</h4>
                    <p>100% secure checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-tabs">
        <div className="container">
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} 
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} 
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} 
              onClick={() => setActiveTab('shipping')}
            >
              Shipping
            </button>
            <button 
              className={`tab-btn ${activeTab === 'return-policy' ? 'active' : ''}`} 
              onClick={() => setActiveTab('return-policy')}
            >
              Return Policy
            </button>
          </div>

          <div className="tabs-content">
            <div className={`tab-panel ${activeTab === 'description' ? 'active' : ''}`} id="description">
              <h3>Product Description</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
            </div>
            <div className={`tab-panel ${activeTab === 'details' ? 'active' : ''}`} id="details">
              <h3>Product Details</h3>
              {product.id === 1 ? (
                <ul>
                  <li><strong>Fabric:</strong> Heavyweight 240 GSM cotton — soft, breathable, durable</li>
                  <li><strong>Color & Fit:</strong> Beige oversized / box-fit t-shirt for men & women</li>
                  <li><strong>Design:</strong> Clean VELORIA logo minimal branding on front and Screen printed Aesthetic Veloria theme artwork inspired by nature & balance on the back.</li>
                  <li><strong>Comfort & Use:</strong> Comfortable for all-day wear, breathable cotton ideal for everyday outfits or layering</li>
                  <li><strong>Best For:</strong> Streetwear lovers, grunge / alternative fashion fans, casual wearers — men and women both</li>
                  <li><strong>Care:</strong> Machine wash cold, inside-out for print protection</li>
                </ul>
              ) : product.id === 2 ? (
                <ul>
                  <li><strong>Fabric:</strong> Heavyweight 240 GSM cotton — soft, breathable, durable</li>
                  <li><strong>Color & Fit:</strong> Black oversized / box-fit silhouette — relaxed unisex fit for streetwear and casual wear</li>
                  <li><strong>Design:</strong> Clean VELORIA logo minimal branding on front and Screen printed Artistic half-faced angel graphic on the back.</li>
                  <li><strong>Comfort & Use:</strong> Comfortable for all-day wear, breathable cotton ideal for everyday outfits or layering</li>
                  <li><strong>Best For:</strong> Streetwear lovers, grunge / alternative fashion fans, casual wearers — men and women both</li>
                  <li><strong>Care:</strong> Machine wash cold, inside-out for print protection</li>
                </ul>
              ) : product.id === 3 ? (
                <ul>
                  <li><strong>Fabric:</strong> Premium 240 GSM terry cotton (soft, breathable, long-lasting)</li>
                  <li><strong>Design:</strong> Puffed Veloria logo on front and Screen print for lasting prints on the back.</li>
                  <li><strong>Color:</strong> Off-white oversized / box-fit t-shirt</li>
                  <li><strong>Fit:</strong> Relaxed unisex oversized silhouette for streetwear styling</li>
                  <li><strong>Comfort:</strong> Smooth feel, breathable fabric, perfect for all-day wear/ all night outdoors</li>
                  <li><strong>Best For:</strong> Streetwear, alternative fashion, grunge looks, Raves, Techno</li>
                  <li><strong>Care:</strong> Machine wash cold, inside-out for print protection</li>
                </ul>
              ) : (
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Material:</strong>
                    <span>100% Premium Cotton Blend</span>
                  </div>
                  <div className="detail-item">
                    <strong>Care Instructions:</strong>
                    <span>Machine wash cold, tumble dry low</span>
                  </div>
                </div>
              )}
            </div>
            <div className={`tab-panel ${activeTab === 'reviews' ? 'active' : ''}`} id="reviews">
              <h3>Reviews</h3>
              <p>No reviews yet.</p>
            </div>
            <div className={`tab-panel ${activeTab === 'shipping' ? 'active' : ''}`} id="shipping">
              <h3>Shipping Information</h3>
              <p>Free Shipping all over India</p>
              <p>Delivery Time : 2-7 Business days</p>
            </div>
            <div className={`tab-panel ${activeTab === 'return-policy' ? 'active' : ''}`} id="return-policy">
              <h3>Return Policy</h3>
              <ul>
                <li>7-day return & exchange policy from the date of delivery.</li>
                <li>A clear unboxing video is required for smooth and valid return/exchange processing.</li>
                <li>Return/exchange starts only after we receive the same product back in its original condition (unused & unwashed).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ProductLoading() {
  return (
    <>
      <Navbar activePage="product" />
      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>Product</span>
        </div>
      </div>
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Loading product...</p>
      </div>
      <Footer />
    </>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent />
    </Suspense>
  );
}
