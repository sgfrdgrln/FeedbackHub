// Simple in-memory rate limiter for API endpoints
// In production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry>;
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.store = new Map();
    this.limit = limit; // Maximum requests
    this.windowMs = windowMs; // Time window in milliseconds
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // Clean up expired entries periodically
    if (this.store.size > 10000) {
      this.cleanup();
    }

    // If no entry exists or time window has passed, create new entry
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.store.set(identifier, {
        count: 1,
        resetTime,
      });
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime,
      };
    }

    // Check if limit exceeded
    if (entry.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment counter
    entry.count++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Clean up expired entries
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  // Reset a specific identifier (useful for testing)
  reset(identifier: string) {
    this.store.delete(identifier);
  }

  // Clear all entries (useful for testing)
  clear() {
    this.store.clear();
  }
}

// Create rate limiter instances for different endpoints
// Chatbot: 10 requests per minute per IP
export const chatbotRateLimiter = new RateLimiter(10, 60000);

// Feedback creation: 5 requests per minute per IP
export const feedbackRateLimiter = new RateLimiter(5, 60000);

// General API: 30 requests per minute per IP
export const generalRateLimiter = new RateLimiter(30, 60000);
