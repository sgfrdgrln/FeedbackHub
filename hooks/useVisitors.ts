'use client';

import { useEffect, useState } from 'react';

export function useVisitors() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Track this visitor
        const response = await fetch('/api/visitors', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.count);
        } else {
          // If POST fails, just fetch the count
          const getResponse = await fetch('/api/visitors');
          if (getResponse.ok) {
            const data = await getResponse.json();
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
        // Set a fallback count
        setVisitorCount(1200);
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();
  }, []);

  return { visitorCount, loading };
}
