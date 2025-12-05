'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';

export default function ShopPage() {
  return (
    <>
      <Navbar activePage="shop" />

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Shop</span>
        </div>
      </div>

      <section className="shop-header">
        <div className="container">
          <h1 className="page-title">Shop All</h1>
          <p className="page-subtitle">Discover our complete collection of elegant pieces</p>
        </div>
      </section>

      <section className="shop-content">
        <div className="container">
          <div className="shop-layout">
            <aside className="filters-sidebar" id="filters-sidebar">
              <div className="filters-header">
                <h3>Filters</h3>
                <button className="filters-close" id="filters-close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="filter-group">
                <h4>Category</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="checkbox" value="all" defaultChecked />
                    <span>All Items</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" value="tops" />
                    <span>Tops</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" value="bottoms" />
                    <span>Bottoms</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" value="dresses" />
                    <span>Dresses</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" value="outerwear" />
                    <span>Outerwear</span>
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h4>Size</h4>
                <div className="filter-options">
                  <label className="filter-option"><input type="checkbox" value="xs" /><span>XS</span></label>
                  <label className="filter-option"><input type="checkbox" value="s" /><span>S</span></label>
                  <label className="filter-option"><input type="checkbox" value="m" /><span>M</span></label>
                  <label className="filter-option"><input type="checkbox" value="l" /><span>L</span></label>
                  <label className="filter-option"><input type="checkbox" value="xl" /><span>XL</span></label>
                </div>
              </div>
            </aside>

            <main className="products-main">
              <div className="products-header">
                <div className="products-info">
                  <span id="products-count">{products.length} products</span>
                  <span className="separator">|</span>
                  <span id="sort-label">Sort by</span>
                </div>
                <div className="products-controls">
                  <button className="view-toggle active" data-view="grid" title="Grid View">
                    <i className="fas fa-th"></i>
                  </button>
                  <button className="view-toggle" data-view="list" title="List View">
                    <i className="fas fa-list"></i>
                  </button>
                  <select className="sort-select" id="sort-select">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <button className="filters-toggle" id="filters-toggle">
                    <i className="fas fa-filter"></i> Filters
                  </button>
                </div>
              </div>

              <div className="products-grid" id="products-grid">
                {products.map((product) => (
                  <Link key={product.id} href={`/product?id=${product.id}`} className="product-card" data-product={product.id}>
                    <div className="product-image">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        width={500}
                        height={700}
                        style={{ width: '100%', height: 'auto' }}
                        loading="lazy"
                      />
                      <div className="product-overlay">
                        <button className="btn btn-icon" title="Quick View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn btn-icon" title="Add to Wishlist">
                          <i className="far fa-heart"></i>
                        </button>
                      </div>
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
                      <button className="btn btn-outline">Add to Bag</button>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pagination">
                <button className="pagination-btn" disabled>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="pagination-numbers">
                  <button className="pagination-number active">1</button>
                  <button className="pagination-number">2</button>
                </div>
                <button className="pagination-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}