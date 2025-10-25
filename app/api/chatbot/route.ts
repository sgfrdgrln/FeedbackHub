import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { chatbotRateLimiter } from '@/lib/rateLimiter';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper function to get client identifier (IP address)
function getClientIdentifier(req: NextRequest): string {
  // Try to get real IP from headers (for production with proxies)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a default identifier for development
  return 'default-client';
}

export async function POST(req: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const clientId = getClientIdentifier(req);
    
    // Check rate limit
    const rateLimitResult = chatbotRateLimiter.check(clientId);
    
    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime);
      const waitSeconds = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again in ${waitSeconds} seconds.`,
          resetTime: resetDate.toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetDate.toISOString(),
            'Retry-After': waitSeconds.toString(),
          }
        }
      );
    }

    const { message, conversationHistory } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Use Gemini Flash 2.0
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build conversation context
    const context = `You are a helpful assistant for FeedbackHub, a feedback management platform. 
Your role is to:
- Help users understand how to use the platform
- Answer questions about feedback submission, upvoting, and commenting
- Provide guidance on features like dark mode, filtering, and sorting
- Be friendly, concise, and helpful

Platform Features:
- Users can submit feedback with title, description, category
- Feedback can be upvoted by other users
- Each feedback has a status: Pending, In Progress, Completed, or Rejected
- Users can comment on feedback posts (requires login)
- Dark mode is available via the profile dropdown
- Visitors can browse but need to sign in with GitHub to submit or comment

Answer user questions naturally and helpfully.`;

    // Format conversation history for Gemini
    let chatHistory = '';
    if (conversationHistory && Array.isArray(conversationHistory)) {
      chatHistory = conversationHistory
        .map((msg: { role: string; content: string }) => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        )
        .join('\n');
    }

    // Combine context, history, and current message
    const prompt = `${context}\n\n${chatHistory ? `Previous conversation:\n${chatHistory}\n\n` : ''}User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Return response with rate limit headers
    return NextResponse.json(
      {
        message: text,
        success: true
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
    );

  } catch (error: any) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        details: error.message 
      },
      { status: 500 }
    );
  }
}