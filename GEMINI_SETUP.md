# 🤖 Gemini AI Chatbot Setup Guide

## Getting Your Gemini API Key

Follow these steps to get your free Gemini API key and enable the chatbot:

### Step 1: Visit Google AI Studio

Go to [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step 2: Sign in with Google

- Sign in with your Google account
- If you don't have one, create a free Google account

### Step 3: Create API Key

1. Click on **"Get API Key"** or **"Create API Key"**
2. Select or create a Google Cloud project
3. Copy the generated API key

### Step 4: Add to Environment Variables

1. Open your `.env.local` file (or create one if it doesn't exist)
2. Add the following line:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

3. Replace `your_actual_api_key_here` with your actual API key

### Step 5: Restart Development Server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## 🎉 Testing the Chatbot

1. Once the server is running, visit `http://localhost:3000`
2. Look for the floating chat button in the bottom-right corner
3. Click the button to open the chatbot
4. Try asking questions like:
   - "How do I submit feedback?"
   - "What are the different categories?"
   - "How does upvoting work?"
   - "How do I enable dark mode?"

## 📊 Gemini Flash 2.0 Features

The chatbot uses **Gemini 2.0 Flash (Experimental)** which offers:

- ⚡ **Fast responses** - Optimized for speed
- 🧠 **Context awareness** - Understands conversation flow
- 💡 **Intelligent answers** - Trained on vast knowledge
- 🔄 **Conversation memory** - Remembers previous messages

## 🆓 Free Tier Limits

Google's free tier includes:

- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

This is more than enough for a small to medium-sized application!

## �️ Built-in Rate Limiting

To protect your API usage and prevent abuse, FeedbackHub includes automatic rate limiting:

### Client-Side Rate Limits

- **10 messages per minute** per user/IP address
- Automatically resets after 60 seconds
- User-friendly error messages when limit is reached

### Why Rate Limiting?

1. **Prevents abuse** - Stops malicious users from spamming the API
2. **Protects your quota** - Ensures you stay within Google's free tier
3. **Fair usage** - Ensures all users get equal access
4. **Cost control** - Prevents unexpected charges if using paid tier

### What Happens When Limited?

When a user exceeds the rate limit:
- They receive a friendly message: "You've sent too many messages. Please wait a moment..."
- The chatbot shows how long to wait before trying again
- No error is logged (it's expected behavior)
- Limit automatically resets after the time window

### Customizing Rate Limits

You can adjust rate limits by editing `lib/rateLimiter.ts`:

```typescript
// Change from 10 requests/minute to 20 requests/minute
export const chatbotRateLimiter = new RateLimiter(20, 60000);
```

## �🔒 Security Best Practices

1. **Never commit** your API key to version control
2. **Always use** environment variables (`.env.local`)
3. **Add** `.env.local` to your `.gitignore` file
4. **Rotate keys** periodically for security
5. **Monitor usage** in Google AI Studio dashboard

## 🐛 Troubleshooting

### Chatbot not responding?

1. **Check API key** - Make sure it's correctly set in `.env.local`
2. **Restart server** - Environment variables require a server restart
3. **Check console** - Look for error messages in browser/terminal
4. **Verify network** - Ensure you have internet connection

### Error: "Gemini API key is not configured"

- Your API key is not set or not loaded
- Double-check `.env.local` file exists and has the correct key
- Restart the development server

### "Too many messages" / Rate limit message?

This is **normal behavior** from our built-in protection:
- You've sent 10+ messages in one minute
- Wait 60 seconds and the limit will reset automatically
- This protects your API quota from being exhausted
- If you need higher limits, edit `lib/rateLimiter.ts`

### Google API rate limit exceeded?

If you see errors about Google's limits:
- You've exceeded Google's free tier (15 requests/min or 1,500/day)
- Wait for the limit to reset (per minute/day)
- Consider upgrading to paid tier for higher limits

## 📚 Additional Resources

- [Google AI Studio](https://makersuite.google.com)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini Pricing](https://ai.google.dev/pricing)

## 💬 Customizing the Chatbot

You can customize the chatbot's behavior by editing:

- **Context/Prompt**: Edit `app/api/chatbot/route.ts` to change the AI's personality and knowledge
- **UI Design**: Edit `components/Chatbot.tsx` to modify appearance
- **Quick Questions**: Update the `quickQuestions` array in `Chatbot.tsx`

## 🚀 Production Deployment

When deploying to production (Vercel, etc.):

1. Add `GEMINI_API_KEY` to your platform's environment variables
2. The chatbot will automatically work in production
3. Monitor usage through Google AI Studio dashboard

---

**Need help?** Open an issue on GitHub or check the main README.md for more information!
