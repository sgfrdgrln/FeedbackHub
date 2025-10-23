# 🎯 FeedbackHub

A modern, feature-rich feedback management platform built with Next.js 15, designed to collect, organize, and discuss user feedback in an aesthetically pleasing mint-green themed interface.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

## ✨ Features

### 🎨 Beautiful Design
- **Two-toned aesthetic** with mint green and white color scheme
- **Dark mode support** with seamless theme switching using `next-themes`
- **Fully responsive** with mobile-friendly burger menu navigation
- **Smooth animations** on landing page and interactive elements
- **CSS variables** for consistent theming across all components

### 🔐 Authentication & Authorization
- **GitHub OAuth integration** via NextAuth.js
- **Session management** with secure user authentication
- **Protected routes** for creating feedback and posting comments
- **User profile dropdown** with theme toggle and sign-out option
- **Avatar support** with fallback initials for users without profile images

### 📝 Feedback Management
- **Create, read, and upvote** feedback posts
- **Status tracking** (Pending, In Progress, Completed, Rejected)
- **Category organization** for better feedback classification
- **Advanced filtering** by status (all, pending, in-progress, completed)
- **Sorting options** by popularity (upvotes) or recency (date)
- **Persistent upvotes** stored in localStorage to prevent duplicate votes
- **Modal-based interaction** - view feedback details without page navigation

### 💬 Discussion System
- **Comment threads** on each feedback post
- **Real-time comment loading** via API endpoints
- **Author attribution** with profile images
- **Timestamp tracking** for all comments
- **Authentication check** - only signed-in users can comment
- **Embedded comments** in MongoDB for efficient data retrieval

### 📊 Analytics
- **Visitor tracking system** with persistent count
- **Real-time visitor statistics** displayed on landing page
- **MongoDB-based storage** for accurate metrics

### 🎭 User Experience
- **Skeleton loading states** for smooth content transitions
- **Custom dialogs** for authentication prompts
- **Empty state designs** with call-to-action buttons
- **Hover effects** and smooth transitions throughout
- **Optimized images** with Next.js Image component

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **MongoDB** database (local or Atlas)
- **GitHub OAuth App** credentials

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd feedback-board
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# GitHub OAuth
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
feedback-board/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   ├── feedback/              # Feedback CRUD endpoints
│   │   │   └── [id]/
│   │   │       └── comments/      # Comment endpoints
│   │   └── visitors/              # Visitor tracking
│   ├── feedback/
│   │   ├── page.tsx               # Feedback list page
│   │   ├── new/                   # Create feedback form
│   │   └── [id]/                  # Feedback detail pages
│   ├── login/                     # Login page
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles & CSS variables
├── components/
│   ├── FeedbackCard.tsx           # Feedback card component
│   ├── FeedbackModal.tsx          # Modal for feedback details
│   ├── FeedbackForm.tsx           # Create/edit feedback form
│   ├── CommentList.tsx            # Comment display component
│   ├── Navbar.tsx                 # Navigation with auth
│   ├── ThemeToggle.tsx            # Dark mode toggle
│   ├── SubmitDialog.tsx           # Auth-aware submission dialog
│   └── FeedbackSkeleton.tsx       # Loading skeleton
├── backend/
│   ├── models/
│   │   ├── Feedback.ts            # Feedback schema with comments
│   │   ├── User.ts                # User authentication schema
│   │   └── Visitor.ts             # Visitor tracking schema
│   ├── types/
│   │   └── IFeedback.ts           # TypeScript interfaces
│   └── lib/
│       └── mongodb.ts             # Database connection
├── hooks/
│   ├── useFeedback.ts             # Fetch feedback data
│   └── useVisitors.ts             # Track visitor count
└── types/
    └── next-auth.d.ts             # NextAuth type definitions
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.6** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **next-themes** - Theme management

### Backend
- **Next.js API Routes** - RESTful endpoints
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - ODM for MongoDB

### Authentication
- **NextAuth.js 4.24.11** - Authentication solution
- **GitHub OAuth** - OAuth provider

### Form Handling
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **@hookform/resolvers** - Validation resolvers

## 📡 API Endpoints

### Feedback
- `GET /api/feedback` - Fetch all feedback
- `POST /api/feedback` - Create new feedback
- `PATCH /api/feedback/[id]` - Update feedback (upvote)

### Comments
- `GET /api/feedback/[id]/comments` - Get comments for feedback
- `POST /api/feedback/[id]/comments` - Add new comment

### Visitors
- `GET /api/visitors` - Get total visitor count
- `POST /api/visitors` - Track new visitor

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

## 🎨 Theming

FeedbackHub uses CSS variables for consistent theming:

```css
/* Light Mode */
--background: white
--foreground: #1a1a1a
--mint-primary: #6ee7b7
--mint-light: #d1fae5
--mint-accent: #34d399
--mint-dark: #10b981

/* Dark Mode */
--background: #1a1a1a
--foreground: #f5f5f5
--mint-primary: #34d399
--mint-light: rgba(52, 211, 153, 0.1)
--mint-accent: #10b981
--mint-dark: #059669
```

## 🔒 Authentication Flow

1. User clicks "Sign in with GitHub"
2. Redirected to GitHub OAuth
3. After authorization, user data stored in session
4. Session persists across page navigations
5. Protected actions check session status
6. User can sign out via profile dropdown

## 💡 Key Features Explained

### Modal-Based Feedback View
Instead of navigating to a separate page, clicking a feedback card opens a modal overlay that:
- Shows full feedback details
- Displays all comments in a threaded view
- Allows authenticated users to post comments
- Maintains context by staying on the same page

### Upvote System
- Each user can upvote once per feedback item
- Upvote state persisted in localStorage
- Optimistic UI updates with loading states
- Server-side validation and count updates

### Visitor Tracking
- Tracks unique page visits
- Stored in MongoDB for persistence
- Displayed on landing page with formatted count
- Fallback to default count on error

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `MONGODB_URI`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Authentication by [NextAuth.js](https://next-auth.js.org)
- Icons from [Heroicons](https://heroicons.com)
- Font family: [Geist](https://vercel.com/font)

---

**Made with ❤️ and ☕ by sgfrdgrln**
