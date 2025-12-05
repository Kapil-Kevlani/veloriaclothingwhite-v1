'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthLayout from '@/components/AuthLayout';
import SocialAuthButtons from '@/components/SocialAuthButtons';

/**
 * Login Page
 * 
 * Handles user authentication with email/phone and password.
 * 
 * TODO: Integrate with backend authentication:
 * - Replace console.log with actual API call to login endpoint
 * - Handle authentication tokens/sessions
 * - Redirect to appropriate page after successful login
 * - Handle errors from backend
 */

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    emailOrPhone?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Replace with actual authentication API call
    // Example:
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ emailOrPhone, password })
    // });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Store token, redirect, etc.
    //     router.push('/');
    //   } else {
    //     setErrors({ emailOrPhone: data.message || 'Invalid credentials' });
    //   }
    // } catch (error) {
    //   setErrors({ emailOrPhone: 'An error occurred. Please try again.' });
    // }

    console.log('Login attempt:', { emailOrPhone, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In real implementation, handle success/error here
    }, 500);
  };

  return (
    <>
      <Navbar />
      <AuthLayout title="Login to Veloria">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${errors.emailOrPhone ? 'error' : ''}`}>
            <label htmlFor="emailOrPhone">Email or Phone Number</label>
            <input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value);
                if (errors.emailOrPhone) {
                  setErrors({ ...errors, emailOrPhone: undefined });
                }
              }}
              placeholder="Enter your email or phone number"
              disabled={isSubmitting}
            />
            {errors.emailOrPhone && (
              <span className="error-message">{errors.emailOrPhone}</span>
            )}
          </div>

          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
              }}
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="auth-form-footer">
            <Link href="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <SocialAuthButtons context="login" />

        <div className="auth-switch">
          <p>
            Don't have an account?{' '}
            <Link href="/signup" className="auth-link auth-link-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </AuthLayout>
      <Footer />
    </>
  );
}

