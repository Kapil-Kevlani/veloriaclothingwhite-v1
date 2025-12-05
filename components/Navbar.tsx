'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  activePage?: 'home' | 'shop' | 'product' | 'checkout';
}

export default function Navbar({ activePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Determine if we're on the home page
  const isHomePage = pathname === '/';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/"><h1>Veloria</h1></Link>
        </div>
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          <Link href="/" className={`nav-link ${isHomePage ? 'active' : ''}`}>Home</Link>
          <Link href="/collections" className={`nav-link ${pathname === '/collections' ? 'active' : ''}`}>Collections</Link>
          <Link href="/about-us" className={`nav-link ${pathname === '/about-us' ? 'active' : ''}`}>About Us</Link>
        </div>
        <div className="nav-actions">
          <Link href="/login" className="nav-link">Login</Link>
          <button className="nav-icon" id="wishlist-btn" aria-label="Wishlist">
            <i className="far fa-heart"></i>
            <span className="badge" id="wishlist-count">0</span>
          </button>
          <button className="nav-icon" id="cart-btn" aria-label="Cart">
            <i className="fas fa-shopping-bag"></i>
            <span className="badge" id="cart-count">0</span>
          </button>
        </div>
        <button 
          className={`nav-toggle ${menuOpen ? 'active' : ''}`} 
          id="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}
