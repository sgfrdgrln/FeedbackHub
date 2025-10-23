'use client';

import FeedbackCard from '@/components/FeedbackCard';
import { FeedbackSkeletonList } from '@/components/FeedbackSkeleton';
import SubmitDialog from '@/components/SubmitDialog';
import FeedbackModal from '@/components/FeedbackModal';
import Link from 'next/link';
import { useState } from 'react';
import { useFeedback } from '@/hooks/useFeedback';
import { IFeedback } from '@/backend/types/IFeedback';

export default function FeedbackPage() {
  const { feedback, loading, error } = useFeedback();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('popular');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFeedback = feedback.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    }
    // For 'recent', sort by createdAt or date
    if (sortBy === 'recent') {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, var(--background), var(--mint-light))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Community Feedback
          </h1>
          <p className="text-lg" style={{ color: 'var(--gray-medium)' }}>
            Browse ideas from our community and vote for your favorites
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="rounded-xl p-6 shadow-md mb-8 border-2" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                style={{
                  background: filter === 'all' ? 'var(--mint-accent)' : 'var(--gray-light)',
                  color: filter === 'all' ? 'white' : 'var(--foreground)'
                }}
              >
                All ({feedback.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className="px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                style={{
                  background: filter === 'pending' ? 'var(--mint-accent)' : 'var(--gray-light)',
                  color: filter === 'pending' ? 'white' : 'var(--foreground)'
                }}
              >
                Pending ({feedback.filter(f => f.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className="px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                style={{
                  background: filter === 'in-progress' ? 'var(--mint-accent)' : 'var(--gray-light)',
                  color: filter === 'in-progress' ? 'white' : 'var(--foreground)'
                }}
              >
                In Progress ({feedback.filter(f => f.status === 'in-progress').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className="px-4 py-2 rounded-lg font-medium transition-all shadow-md"
                style={{
                  background: filter === 'completed' ? 'var(--mint-accent)' : 'var(--gray-light)',
                  color: filter === 'completed' ? 'white' : 'var(--foreground)'
                }}
              >
                Completed ({feedback.filter(f => f.status === 'completed').length})
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="font-medium" style={{ color: 'var(--gray-medium)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                className="px-4 py-2 rounded-lg border-2 font-medium focus:outline-none focus:ring-2 cursor-pointer"
                style={{ 
                  borderColor: 'var(--mint-primary)', 
                  background: 'var(--background)', 
                  color: 'var(--foreground)',
                  outlineColor: 'var(--mint-accent)'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-xl p-8 shadow-md text-center border-2" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#fee2e2' }}>
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Error Loading Feedback</h3>
            <p style={{ color: 'var(--gray-medium)' }}>{error}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <FeedbackSkeletonList count={6} />}

        {/* Feedback Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6">
            {sortedFeedback.map((item) => (
              <FeedbackCard
                key={item._id || item.id}
                id={item._id || item.id || ''}
                title={item.title}
                description={item.description}
                category={item.category}
                status={item.status}
                upvotes={item.upvotes}
                author={item.author}
                date={item.createdAt || ''}
                onCardClick={() => {
                  setSelectedFeedback(item);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedFeedback.length === 0 && !loading && !error && (
          <div className="rounded-xl p-12 shadow-md text-center border-2" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--mint-light)' }}>
              <svg
                className="w-10 h-10"
                style={{ color: 'var(--mint-accent)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>No feedback found</h3>
            <p className="mb-6" style={{ color: 'var(--gray-medium)' }}>
              No feedback items match your current filter.
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              style={{ background: 'linear-gradient(to right, var(--mint-accent), var(--mint-dark))' }}
            >
              Be the first to submit!
            </button>
          </div>
        )}

        {/* Submit Dialog */}
        <SubmitDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        
        {/* Feedback Modal */}
        {selectedFeedback && (
          <FeedbackModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            feedback={selectedFeedback} 
          />
        )}
      </div>
    </div>
  );
}
