'use client';

import FeedbackForm from '@/components/FeedbackForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewFeedbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--background), var(--mint-light))' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: 'var(--mint-accent)' }}></div>
          <p className="text-lg" style={{ color: 'var(--foreground)' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render the form if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, var(--background), var(--mint-light))' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Submit New Feedback
          </h1>
          <p className="text-lg" style={{ color: 'var(--gray-medium)' }}>
            Share your ideas, suggestions, or report issues. We value your input!
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl p-8 shadow-xl border-2" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
          <FeedbackForm />
        </div>

        {/* Guidelines */}
        <div className="mt-8 rounded-xl p-6 border-2" style={{ background: 'var(--mint-light)', borderColor: 'var(--mint-primary)' }}>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
            <svg
              className="w-5 h-5"
              style={{ color: 'var(--mint-accent)' }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Guidelines for Good Feedback
          </h3>
          <ul className="space-y-2" style={{ color: 'var(--foreground)' }}>
            <li className="flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--mint-accent)' }}>•</span>
              <span>Be clear and specific about what you're suggesting or reporting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--mint-accent)' }}>•</span>
              <span>Choose the most appropriate category for your feedback</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--mint-accent)' }}>•</span>
              <span>Include relevant details that help us understand your perspective</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1" style={{ color: 'var(--mint-accent)' }}>•</span>
              <span>Be respectful and constructive in your communication</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
