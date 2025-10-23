'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IFeedback, IComment } from '@/backend/types/IFeedback';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: IFeedback | null;
}

export default function FeedbackModal({ isOpen, onClose, feedback }: FeedbackModalProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

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

  // Load comments when modal opens
  useEffect(() => {
    if (isOpen && feedback) {
      loadComments();
    }
  }, [isOpen, feedback]);

  const loadComments = async () => {
    if (!feedback) return;
    
    const feedbackId = feedback._id || feedback.id;
    if (!feedbackId) return;
    
    setIsLoadingComments(true);
    try {
      const response = await fetch(`/api/feedback/${feedbackId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session || !feedback) return;

    const feedbackId = feedback._id || feedback.id;
    if (!feedbackId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/feedback/${feedbackId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          author: session.user?.username || 'Anonymous',
          authorImage: session.user?.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !feedback) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div 
          className="relative rounded-2xl shadow-2xl border-2 max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col"
          style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 p-6 border-b-2" style={{ background: 'var(--background)', borderColor: 'var(--mint-primary)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      statusColors[feedback.status]
                    }`}
                  >
                    {statusText[feedback.status]}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-lg" style={{ background: 'var(--mint-light)', color: 'var(--mint-accent)' }}>
                    {feedback.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  {feedback.title}
                </h2>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--gray-medium)' }}>
                  <span>
                    by <span className="font-medium" style={{ color: 'var(--foreground)' }}>{feedback.author}</span>
                  </span>
                  <span>•</span>
                  <span>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'N/A'}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{feedback.upvotes}</span>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-mint-light transition-all"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
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
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Description
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--gray-medium)' }}>
                {feedback.description}
              </p>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Discussion ({comments.length})
              </h3>

              {/* Comment Form */}
              {session ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <div className="flex gap-3">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--mint-primary)' }}>
                        <span className="text-white font-semibold">
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                        style={{
                          borderColor: 'var(--mint-primary)',
                          background: 'var(--background)',
                          color: 'var(--foreground)',
                        }}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !newComment.trim()}
                          className="px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ background: 'linear-gradient(to right, var(--mint-accent), var(--mint-dark))' }}
                        >
                          {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-6 p-4 rounded-lg border-2" style={{ background: 'var(--mint-light)', borderColor: 'var(--mint-primary)' }}>
                  <p className="text-center" style={{ color: 'var(--foreground)' }}>
                    Please sign in to join the discussion
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {isLoadingComments ? (
                  <div className="text-center py-8" style={{ color: 'var(--gray-medium)' }}>
                    Loading comments...
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 rounded-lg" style={{ background: 'var(--mint-light)' }}>
                    <svg
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: 'var(--mint-accent)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="font-medium" style={{ color: 'var(--foreground)' }}>No comments yet</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--gray-medium)' }}>Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex gap-3 p-4 rounded-lg" style={{ background: 'var(--mint-light)' }}>
                      {comment.authorImage ? (
                        <Image
                          src={comment.authorImage}
                          alt={comment.author}
                          width={40}
                          height={40}
                          className="rounded-full object-cover shrink-0"
                          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--mint-primary)' }}>
                          <span className="text-white font-semibold">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                            {comment.author}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--gray-medium)' }}>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ color: 'var(--foreground)' }}>{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
