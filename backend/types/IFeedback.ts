// types/feedback.ts
export type FeedbackStatus = 'pending' | 'in-progress' | 'completed';

export interface IComment {
  _id?: string;
  author: string;
  authorImage?: string;
  content: string;
  createdAt: Date | string;
}

export interface IFeedback {
  _id?: string;
  id?: string; // For compatibility with static data
  title: string;
  description: string;
  category: string;
  status: FeedbackStatus;
  upvotes: number;
  author: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: IComment[];
}
