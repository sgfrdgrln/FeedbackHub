// models/Feedback.ts
import mongoose, { Schema, models } from 'mongoose';
import { IFeedback } from '../types/IFeedback';


const CommentSchema = new Schema({
  author: { type: String, required: true },
  authorImage: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackSchema = new Schema<IFeedback>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    upvotes: { type: Number, default: 0 },
    author: { type: String, required: true },
    date: { type: String, default: 'just now' },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// Avoid recompiling model on hot reload
export default models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
