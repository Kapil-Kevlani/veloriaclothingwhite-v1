'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FullscreenCollectionSection from '@/components/FullscreenCollectionSection';
import { collections, getCollectionById, getCollectionProducts } from '@/lib/collections';
import { products } from '@/lib/products';

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const collectionId = searchParams.get('id');

  // If a specific collection is selected, show its products (keep existing behavior)
  if (collectionId) {
    const collection = getCollectionById(collectionId);
    if (!collection) {
      return (
        <>
          <Navbar activePage="shop" />
          <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h1>Collection not found</h1>
            <Link href="/collections" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              Back to Collections
            </Link>
          </div>
          <Footer />
        </>
      );
    }

    const collectionProducts = getCollectionProducts(collection);

    return (
      <>
        <Navbar activePage="shop" />

        <div className="breadcrumb">
          <div className="container">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Collections</Link>
            <span>/</span>
            <span>{collection.name}</span>
          </div>
        </div>

        <section className="shop-header">
          <div className="container">
            <h1 className="page-title">
              {collection.name}
              {collection.comingSoon && (
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'normal', 
                  color: 'var(--text-secondary)',
                  marginLeft: '1rem'
                }}>
                  (Coming soon)
                </span>
              )}
            </h1>
            {collection.description && (
              <p className="page-subtitle">{collection.description}</p>
            )}
          </div>
        </section>

        <section className="shop-content">
          <div className="container">
            {collectionProducts.length > 0 ? (
              <div className="products-grid">
                {collectionProducts.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/product?id=${product.id}`} 
                    className="product-card"
                  >
                    <div className="product-image">
                      <Image 
                        src={product.image} 
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
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <p>No products available in this collection yet.</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </>
    );
  }

  // Full-screen scroll-snap collections view
  return (
    <div className="collections-fullscreen-wrapper">
      <Navbar activePage="shop" />
      
      {/* Scroll-snap container: full height, vertical scroll, snap mandatory */}
      <div className="fullscreen-collections-container">
        {collections.map((collection, index) => (
          <FullscreenCollectionSection
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
