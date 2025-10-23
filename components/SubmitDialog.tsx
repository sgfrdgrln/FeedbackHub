'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SubmitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitDialog({ isOpen, onClose }: SubmitDialogProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (status === 'authenticated') {
      // User is logged in, redirect to new feedback page
      router.push('/feedback/new');
      onClose();
    } else {
      // User is not logged in, redirect to sign in
      setIsLoading(true);
      await signIn('github', { callbackUrl: '/feedback/new' });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="relative rounded-2xl shadow-2xl border-2 max-w-md w-full transform transition-all duration-300 scale-100 animate-in"
          style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-mint-light transition-all"
            aria-label="Close dialog"
          >
            <svg
              className="w-5 h-5"
              style={{ color: 'var(--gray-medium)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce" style={{ background: 'linear-gradient(to bottom right, var(--mint-primary), var(--mint-accent))' }}>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
              {status === 'authenticated' ? 'Ready to Share?' : 'Join Our Community!'}
            </h3>

            {/* Description */}
            <p className="text-center mb-6 leading-relaxed" style={{ color: 'var(--gray-medium)' }}>
              {status === 'authenticated' ? (
                <>
                  You're all set! Share your ideas and help us build something amazing together.
                </>
              ) : (
                <>
                  To submit feedback and vote on ideas, please sign in with your GitHub account. 
                  It only takes a second! 🚀
                </>
              )}
            </p>

            {/* Benefits List (only show when not authenticated) */}
            {status !== 'authenticated' && (
              <div className="rounded-xl p-4 mb-6" style={{ background: 'var(--mint-light)' }}>
                <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <svg
                    className="w-5 h-5"
                    style={{ color: 'var(--mint-accent)' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  What you'll get:
                </h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--foreground)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--mint-accent)' }}>✓</span>
                    <span>Submit unlimited feedback and ideas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--mint-accent)' }}>✓</span>
                    <span>Vote on suggestions you support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--mint-accent)' }}>✓</span>
                    <span>Track your feedback status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--mint-accent)' }}>✓</span>
                    <span>Join the community discussion</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(to right, var(--mint-accent), var(--mint-dark))' }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : status === 'authenticated' ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Submit Feedback
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Sign in with GitHub
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 font-semibold rounded-lg border-2 transition-all hover:bg-mint-light"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)',
                  borderColor: 'var(--gray-light)'
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
