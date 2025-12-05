'use client';

/**
 * SocialAuthButtons Component
 * 
 * Reusable component for social authentication buttons.
 * Currently logs to console - ready for integration with NextAuth or other auth providers.
 * 
 * TODO: Integrate with authentication provider (e.g., NextAuth)
 * - Google: signIn("google")
 * - Phone: Implement phone number authentication flow
 * - Apple: signIn("apple") if using NextAuth
 */

interface SocialAuthButtonsProps {
  context?: 'login' | 'signup';
}

export default function SocialAuthButtons({ context = 'login' }: SocialAuthButtonsProps) {
  const handleGoogleAuth = () => {
    // TODO: Integrate with Google OAuth provider
    // Example with NextAuth: signIn("google")
    console.log('Google login clicked');
  };

  const handlePhoneAuth = () => {
    // TODO: Implement phone number authentication flow
    // This would typically open a modal or navigate to phone verification
    console.log('Phone number login clicked');
  };

  const handleAppleAuth = () => {
    // TODO: Integrate with Apple Sign In (if using NextAuth)
    // Example: signIn("apple")
    console.log('Apple login clicked');
  };

  return (
    <div className="social-auth-section">
      <div className="social-auth-divider">
        <span>Or continue with</span>
      </div>
      <div className="social-auth-buttons">
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="social-auth-btn social-auth-btn-google"
        >
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          onClick={handlePhoneAuth}
          className="social-auth-btn social-auth-btn-phone"
        >
          <span>Continue with Phone</span>
        </button>
        <button
          type="button"
          onClick={handleAppleAuth}
          className="social-auth-btn social-auth-btn-apple"
        >
          <span>Continue with Apple</span>
        </button>
      </div>
    </div>
  );
}

