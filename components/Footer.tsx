'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Veloria</h3>
            <p className="footer-description">Elegant simplicity for the modern individual</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Shop</h4>
            <ul className="footer-links">
              <li><Link href="/shop">Shop All</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <ul className="footer-links">
              <li><Link href="#size-guide">Size Guide</Link></li>
              <li><Link href="#shipping">Shipping</Link></li>
              <li><Link href="#returns">Returns</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Veloria Clothing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
