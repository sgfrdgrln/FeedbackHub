import mongoose, { Schema, models } from 'mongoose';

export interface IVisitor {
  ip: string;
  userAgent: string;
  visitedAt: Date;
}

const VisitorSchema = new Schema<IVisitor>(
  {
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    visitedAt: { type: Date, default: Date.now, required: true }
  },
  { timestamps: true }
);

// Create index for faster queries
VisitorSchema.index({ ip: 1, visitedAt: -1 });

// Avoid recompiling the model during hot reload
export default models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);
