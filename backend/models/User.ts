import mongoose, { Schema, models } from 'mongoose';
import { IUser } from '../types/IUser';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    image: { type: String },
    provider: { type: String, default: 'github' },
  },
  { timestamps: true }
);

// Avoid recompiling the model during hot reload
export default models.User || mongoose.model<IUser>('User', UserSchema);
