'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(to bottom right, var(--background), var(--mint-light), var(--mint-primary))' }}>
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: 'linear-gradient(to bottom right, var(--mint-primary), var(--mint-accent))' }}>
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent mb-2">
            Welcome to FeedbackHub
          </h1>
          <p style={{ color: 'var(--gray-medium)' }}>Sign in to share your ideas and vote on feedback</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl p-8 shadow-xl border-2" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--foreground)' }}>Sign In</h2>

          {/* GitHub Sign In Button */}
          <button
            onClick={() => signIn('github', { callbackUrl: '/feedback' })}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--gray-light)' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ background: 'var(--background)', color: 'var(--gray-medium)' }}>or</span>
            </div>
          </div>

          {/* Continue as Guest */}
          <Link
            href="/feedback"
            className="w-full flex items-center justify-center px-6 py-4 font-semibold rounded-lg transition-all border-2"
            style={{ background: 'var(--mint-light)', color: 'var(--mint-accent)', borderColor: 'var(--mint-primary)' }}
          >
            Continue as Guest
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-6 backdrop-blur-sm rounded-xl p-4 border-2" style={{ background: 'var(--background)', opacity: 0.9, borderColor: 'var(--mint-primary)' }}>
          <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
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
            Why sign in?
          </h3>
          <ul className="space-y-1 text-sm" style={{ color: 'var(--gray-medium)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--mint-accent)' }}>✓</span>
              <span>Submit feedback and track your submissions</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--mint-accent)' }}>✓</span>
              <span>Vote on ideas you support</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--mint-accent)' }}>✓</span>
              <span>Get notified when your feedback is updated</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
