import { connectToDatabase } from "@/backend/db/connection";
import Feedback from "@/backend//models/Feedback";
import { IFeedback } from "@/backend/types/IFeedback";

// for fetching all feedback post
export async function getAllFeedback(): Promise<IFeedback[] | null> {
    await connectToDatabase();
    const feedback = await Feedback.find().sort({createdAt: -1}).lean<IFeedback[]>();
    return feedback;
}
// for creating feedback post
export async function createFeedback(data: IFeedback): Promise<IFeedback | null> {
  await connectToDatabase();

  // Check for duplicate title by the same author
  const existing = await Feedback.findOne({
    title: data.title.trim(),
    author: data.author,
  });

  if (existing) {
    throw new Error('You have already submitted feedback with this title.');
  }

  // Proceed with creation if not duplicate
  const feedback = await Feedback.create(data);
  return feedback.toObject() as IFeedback;
}
// for updating feedback post
export async function updateFeedbackStatus(
  id: string,
  status: IFeedback["status"]
): Promise<IFeedback | null> {
  
  await connectToDatabase();
  const updated = await Feedback.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean();
  return updated as IFeedback | null;
}
// for upvoting feedback post
export async function upvoteFeedback(id: string): Promise<IFeedback | null> {
  await connectToDatabase();
  const updated = await Feedback.findByIdAndUpdate(
    id,
    { $inc: { upvotes: 1 } },
    { new: true }
  ).lean();
  return updated as IFeedback | null;
}

// for deleting feedback post
export async function deleteFeedback(id: string): Promise<boolean | null> {
  await connectToDatabase();
  const result = await Feedback.findByIdAndDelete(id);
  return !!result;
}
