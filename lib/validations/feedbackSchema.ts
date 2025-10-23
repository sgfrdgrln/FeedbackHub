// lib/validation/feedbackSchema.ts
import { z } from "zod";

export const feedbackSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  upvotes: z.number().default(0),
  author: z.string().min(1, "Author is required"),
  date: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
