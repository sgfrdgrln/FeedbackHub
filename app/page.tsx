'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useVisitors } from "@/hooks/useVisitors";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { visitorCount, loading } = useVisitors();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, var(--background), var(--mint-light), var(--mint-primary))' }}>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div 
              className={`inline-block transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 animate-pulse" style={{ background: 'var(--background)', opacity: 0.9, borderColor: 'var(--mint-primary)' }}>
                <span className="font-semibold" style={{ color: 'var(--mint-accent)' }}>
                  ✨ Welcome to FeedbackHub
                </span>
              </div>
            </div>
            
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} 
              style={{ color: 'var(--foreground)' }}
            >
              Share Your Ideas,
              <br />
              <span className="bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent">
                Shape the Future
              </span>
            </h1>
            
            <p 
              className={`text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} 
              style={{ color: 'var(--gray-medium)' }}
            >
              A beautiful platform where your voice matters. Submit feedback, 
              vote on ideas, and help us build something amazing together.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href="/feedback"
                className="px-8 py-4 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ background: 'linear-gradient(to right, var(--mint-accent), var(--mint-dark))' }}
              >
                View All Feedback
              </Link>
              <Link
                href="/feedback/new"
                className="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 transition-all"
                style={{ background: 'var(--background)', color: 'var(--mint-accent)', borderColor: 'var(--mint-primary)' }}
              >
                Submit Feedback
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 delay-700 border-2 border-transparent hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{ background: 'var(--background)', borderColor: 'transparent' }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 animate-bounce" style={{ background: 'linear-gradient(to bottom right, var(--mint-primary), var(--mint-accent))' }}>
              <svg
                className="w-7 h-7 text-white"
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
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Share Ideas</h3>
            <p style={{ color: 'var(--gray-medium)' }}>
              Submit your thoughts and suggestions in a clean, intuitive interface.
            </p>
          </div>

          <div 
            className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 delay-800 border-2 border-transparent hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{ background: 'var(--background)' }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 animate-bounce" style={{ background: 'linear-gradient(to bottom right, var(--mint-primary), var(--mint-accent))', animationDelay: '0.2s' }}>
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Vote & Engage</h3>
            <p style={{ color: 'var(--gray-medium)' }}>
              Upvote ideas you love and join the conversation with comments.
            </p>
          </div>

          <div 
            className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 delay-900 border-2 border-transparent hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{ background: 'var(--background)' }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 animate-bounce" style={{ background: 'linear-gradient(to bottom right, var(--mint-primary), var(--mint-accent))', animationDelay: '0.4s' }}>
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Track Progress</h3>
            <p style={{ color: 'var(--gray-medium)' }}>
              Stay updated on feedback status and watch ideas come to life.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className={`mt-24 rounded-3xl p-12 shadow-2xl border-2 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} 
          style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="transition-all duration-500 hover:scale-110">
              <div className="text-5xl font-bold bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent mb-2 animate-pulse">
                500+
              </div>
              <div className="font-medium" style={{ color: 'var(--gray-medium)' }}>Ideas Submitted</div>
            </div>
            <div className="transition-all duration-500 hover:scale-110">
              <div className="text-5xl font-bold bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent mb-2 animate-pulse">
                {loading ? '...' : visitorCount.toLocaleString()}
              </div>
              <div className="font-medium" style={{ color: 'var(--gray-medium)' }}>Visitors</div>
            </div>
            <div className="transition-all duration-500 hover:scale-110">
              <div className="text-5xl font-bold bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent mb-2 animate-pulse">
                150+
              </div>
              <div className="font-medium" style={{ color: 'var(--gray-medium)' }}>Ideas Implemented</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
