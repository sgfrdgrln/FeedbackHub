'use client';

import { useState, useEffect } from 'react';

interface FeedbackCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  upvotes: number;
  author: string;
  date: string;
  onCardClick?: () => void;
}

export default function FeedbackCard({
  id,
  title,
  description,
  category,
  status,
  upvotes: initialUpvotes,
  author,
  date,
  onCardClick,
}: FeedbackCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);

  // Check localStorage on mount to see if user already upvoted
  useEffect(() => {
    const upvotedFeedbacks = JSON.parse(localStorage.getItem('upvotedFeedbacks') || '[]');
    if (upvotedFeedbacks.includes(id)) {
      setIsUpvoted(true);
    }
  }, [id]);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple clicks while processing
    if (isUpvoting || isUpvoted) return;
    
    setIsUpvoting(true);
    
    try {
      // Optimistic update
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
      
      // Send API request
      const response = await fetch(`/api/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to upvote');
      }
      
      const updatedFeedback = await response.json();
      // Update with actual value from server
      setUpvotes(updatedFeedback.upvotes);
      
      // Save to localStorage to persist upvote
      const upvotedFeedbacks = JSON.parse(localStorage.getItem('upvotedFeedbacks') || '[]');
      if (!upvotedFeedbacks.includes(id)) {
        upvotedFeedbacks.push(id);
        localStorage.setItem('upvotedFeedbacks', JSON.stringify(upvotedFeedbacks));
      }
    } catch (error) {
      // Revert optimistic update on error
      console.error('Error upvoting feedback:', error);
      setUpvotes(upvotes);
      setIsUpvoted(false);
    } finally {
      setIsUpvoting(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-[#a0e6d2] text-[#1a5c47] border-[#7dd3b7]',
    rejected: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusText = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    rejected: 'Rejected',
  };

  return (
    <div 
      onClick={onCardClick}
      className="rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 cursor-pointer group" 
      style={{ background: 'var(--background)', borderColor: 'transparent' }}
    >
      <div className="flex items-start justify-between gap-4">
          {/* Upvote Button */}
          <button
            onClick={handleUpvote}
            disabled={isUpvoting || isUpvoted}
            className="flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-lg font-semibold transition-all transform hover:scale-105 disabled:cursor-not-allowed"
            style={{
              background: isUpvoted ? 'var(--mint-accent)' : isUpvoting ? 'var(--mint-light)' : 'var(--mint-light)',
              color: isUpvoted ? 'white' : 'var(--mint-accent)',
              opacity: isUpvoting ? 0.75 : 1
            }}
            title={isUpvoted ? 'Already upvoted' : 'Upvote this feedback'}
          >
            {isUpvoting ? (
              <svg
                className="animate-spin h-5 w-5 mb-1"
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
            ) : (
              <svg
                className="w-5 h-5 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-lg">{upvotes}</span>
          </button>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold transition-colors" style={{ color: 'var(--foreground)' }}>
                {title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  statusColors[status]
                }`}
              >
                {statusText[status]}
              </span>
            </div>

            <p className="mb-4 line-clamp-2" style={{ color: 'var(--gray-medium)' }}>{description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-sm font-medium rounded-lg" style={{ background: 'var(--mint-light)', color: 'var(--mint-accent)' }}>
                  {category}
                </span>
                <span className="text-sm" style={{ color: 'var(--gray-medium)' }}>
                  by <span className="font-medium" style={{ color: 'var(--foreground)' }}>{author}</span>
                </span>
              </div>
              <span className="text-sm" style={{ color: 'var(--gray-medium)' }}>{date}</span>
            </div>
          </div>
        </div>
    </div>
  );
}
