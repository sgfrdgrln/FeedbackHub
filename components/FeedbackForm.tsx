'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface FeedbackFormProps {
  initialData?: {
    title: string;
    description: string;
    category: string;
  };
  isEdit?: boolean;
}

export default function FeedbackForm({ initialData, isEdit = false }: FeedbackFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Feature',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare feedback data
      const feedbackData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: 'pending' as const,
        upvotes: 0,
        author: session?.user?.username || 'Anonymous User',
      };

      // Send POST request to API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      console.log('Feedback created:', result);

      // Show success state
      setSuccess(true);

      // Redirect to feedback page after a short delay
      setTimeout(() => {
        router.push('/feedback');
        router.refresh(); // Refresh to get updated data
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Feature', 'Enhancement', 'Bug', 'Question', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-500 mt-0.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-red-800">Error</h4>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="rounded-lg p-4 flex items-start gap-3 border-2" style={{ background: 'var(--mint-light)', borderColor: 'var(--mint-accent)' }}>
          <svg
            className="w-5 h-5 mt-0.5 shrink-0"
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
          <div>
            <h4 className="font-semibold" style={{ color: 'var(--mint-dark)' }}>Success!</h4>
            <p className="text-sm" style={{ color: 'var(--foreground)' }}>Your feedback has been submitted successfully. Redirecting...</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Brief summary of your feedback (min 3 characters)"
          disabled={isSubmitting || success}
          className="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            borderColor: 'var(--mint-primary)',
            color: 'var(--foreground)',
            background: 'var(--background)'
          }}
          maxLength={100}
        />
        <p className="mt-1 text-sm" style={{ color: 'var(--gray-medium)' }}>{formData.title.length}/100 characters (min 3 characters)</p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
          Category *
        </label>
        <select
          id="category"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          disabled={isSubmitting || success}
          className="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 outline-none transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            borderColor: 'var(--mint-primary)',
            color: 'var(--foreground)',
            background: 'var(--background)'
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
          Description *
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Provide detailed information about your feedback... (min 10 characters)"
          rows={8}
          disabled={isSubmitting || success}
          className="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 outline-none transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            borderColor: 'var(--mint-primary)',
            color: 'var(--foreground)',
            background: 'var(--background)'
          }}
          maxLength={1000}
        />
        <p className="mt-1 text-sm" style={{ color: 'var(--gray-medium)' }}>{formData.description.length}/1000 characters (min 10 characters)</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || success}
          className="flex-1 px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{ background: 'linear-gradient(to right, var(--mint-accent), var(--mint-dark))' }}
        >
          {success ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Submitted!
            </span>
          ) : isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
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
              Submitting...
            </span>
          ) : (
            <>{isEdit ? 'Update Feedback' : 'Submit Feedback'}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting || success}
          className="px-6 py-3 font-semibold rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: 'var(--background)', 
            color: 'var(--foreground)',
            borderColor: 'var(--gray-light)'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
