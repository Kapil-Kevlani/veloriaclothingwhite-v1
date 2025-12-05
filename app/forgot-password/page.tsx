'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthLayout from '@/components/AuthLayout';

/**
 * Forgot Password Page
 * 
 * Placeholder page for password reset functionality.
 * TODO: Implement password reset flow with backend integration.
 */

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <AuthLayout 
        title="Reset Your Password"
        subtitle="Enter your email address and we'll send you a link to reset your password."
      >
        <div className="auth-form">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Password reset functionality coming soon.
          </p>
          <Link href="/login" className="btn btn-primary auth-submit-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
            Back to Login
          </Link>
        </div>
      </AuthLayout>
      <Footer />
    </>
  );
}

