'use client';

import { useEffect, useState } from 'react';
import { IFeedback } from '@/backend/types/IFeedback';

export function useFeedback() {
  const [feedback, setFeedback] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/feedback');
        if (!res.ok) throw new Error('Failed to fetch feedback');
        const data = await res.json();
        setFeedback(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return { feedback, loading, error };
}
