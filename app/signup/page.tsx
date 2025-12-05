'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthLayout from '@/components/AuthLayout';
import SocialAuthButtons from '@/components/SocialAuthButtons';

/**
 * Signup Page
 * 
 * Handles new user registration with name, email, phone, and password.
 * 
 * TODO: Integrate with backend authentication:
 * - Replace console.log with actual API call to signup endpoint
 * - Handle user creation and authentication tokens/sessions
 * - Redirect to appropriate page after successful signup
 * - Handle errors from backend (e.g., email already exists)
 */

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Replace with actual signup API call
    // Example:
    // try {
    //   const response = await fetch('/api/auth/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       email: formData.email,
    //       phone: formData.phone,
    //       password: formData.password
    //     })
    // });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Store token, redirect, etc.
    //     router.push('/');
    //   } else {
    //     setErrors({ email: data.message || 'An error occurred' });
    //   }
    // } catch (error) {
    //   setErrors({ email: 'An error occurred. Please try again.' });
    // }

    console.log('Signup attempt:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In real implementation, handle success/error here
    }, 500);
  };

  return (
    <>
      <Navbar />
      <AuthLayout title="Create Your Veloria Account">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${errors.name ? 'error' : ''}`}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className={`form-group ${errors.phone ? 'error' : ''}`}>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder="Create a password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="Confirm your password"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <SocialAuthButtons context="signup" />

        <div className="auth-switch">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="auth-link auth-link-bold">
              Login
            </Link>
          </p>
        </div>
      </AuthLayout>
      <Footer />
    </>
  );
}

