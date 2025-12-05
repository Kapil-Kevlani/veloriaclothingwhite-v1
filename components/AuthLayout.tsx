'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * AuthLayout Component
 * 
 * Reusable layout wrapper for authentication pages (login/signup).
 * Provides consistent structure with brand logo and centered card layout.
 */
export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <h1>Veloria</h1>
          </Link>
        </div>
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-title">{title}</h2>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

