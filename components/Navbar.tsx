'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b-2 shadow-sm" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-linear-to-br from-[#a0e6d2] to-[#5bc09f] p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] bg-clip-text text-transparent">
              FeedbackHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === '/'
                  ? 'text-white shadow-md'
                  : 'hover:bg-mint-light'
              }`}
              style={pathname === '/' ? { background: 'var(--mint-primary)' } : { color: 'var(--foreground)' }}
            >
              Home
            </Link>
            <Link
              href="/feedback"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === '/feedback'
                  ? 'text-white shadow-md'
                  : 'hover:bg-mint-light'
              }`}
              style={pathname === '/feedback' ? { background: 'var(--mint-primary)' } : { color: 'var(--foreground)' }}
            >
              Feedback
            </Link>
            
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/feedback/new"
                  className="ml-2 px-5 py-2 bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-[#7dd3b7] hover:to-[#a0e6d2] transition-all transform hover:scale-105"
                >
                  + New Feedback
                </Link>
                
                {/* User Menu Dropdown */}
                <div className="ml-4 relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    style={{ background: 'var(--mint-light)', color: 'var(--foreground)' }}
                  >
                    {session?.user?.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium">
                      {session?.user?.name}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl border-2 overflow-hidden z-50" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b-2" style={{ background: 'var(--mint-light)', borderColor: 'var(--mint-primary)' }}>
                        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                          {session?.user?.name}
                        </p>
                        {session?.user?.email && (
                          <p className="text-xs mt-0.5" style={{ color: 'var(--gray-medium)' }}>
                            {session.user.email}
                          </p>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {/* <Link
                          href="/feedback"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-mint-light"
                          style={{ color: 'var(--foreground)' }}
                        >
                          <svg
                            className="w-5 h-5"
                            style={{ color: 'var(--mint-accent)' }}
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
                          My Feedback
                        </Link> */}

                        {/* Theme Toggle */}
                        {mounted && (
                          <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-mint-light"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {theme === 'light' ? (
                              <>
                                <svg
                                  className="w-5 h-5"
                                  style={{ color: 'var(--mint-accent)' }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                  />
                                </svg>
                                Dark Mode
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-5 h-5"
                                  style={{ color: 'var(--mint-accent)' }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                                Light Mode
                              </>
                            )}
                          </button>
                        )}
                        
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
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
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="ml-2 px-5 py-2 bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-[#7dd3b7] hover:to-[#a0e6d2] transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-mint-light transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                style={{ color: 'var(--foreground)' }}
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
            ) : (
              <svg
                className="w-6 h-6"
                style={{ color: 'var(--foreground)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2" style={{ borderColor: 'var(--mint-primary)' }}>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === '/'
                    ? 'text-white shadow-md'
                    : 'hover:bg-mint-light'
                }`}
                style={pathname === '/' ? { background: 'var(--mint-primary)' } : { color: 'var(--foreground)' }}
              >
                Home
              </Link>
              <Link
                href="/feedback"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === '/feedback'
                    ? 'text-white shadow-md'
                    : 'hover:bg-mint-light'
                }`}
                style={pathname === '/feedback' ? { background: 'var(--mint-primary)' } : { color: 'var(--foreground)' }}
              >
                Feedback
              </Link>

              {status === 'authenticated' ? (
                <>
                  <Link
                    href="/feedback/new"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] text-white font-semibold rounded-lg shadow-md text-center"
                  >
                    + New Feedback
                  </Link>

                  {/* User Info Section */}
                  <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--mint-light)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      {session?.user?.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                          {session?.user?.name}
                        </p>
                        {session?.user?.email && (
                          <p className="text-xs" style={{ color: 'var(--gray-medium)' }}>
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Theme Toggle Mobile */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-mint-light"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {theme === 'light' ? (
                        <>
                          <svg
                            className="w-5 h-5"
                            style={{ color: 'var(--mint-accent)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          </svg>
                          Dark Mode
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            style={{ color: 'var(--mint-accent)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          Light Mode
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signIn();
                  }}
                  className="px-4 py-2 bg-linear-to-r from-[#5bc09f] to-[#7dd3b7] text-white font-semibold rounded-lg shadow-md text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
