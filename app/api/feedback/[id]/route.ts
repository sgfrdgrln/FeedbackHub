import { NextResponse } from 'next/server';
import { upvoteFeedback } from '@/backend/services/feedbackService';

// app/api/feedback/[id]/route.ts
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ Await the params Promise

    const updatedFeedback = await upvoteFeedback(id);

    if (!updatedFeedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error('Error upvoting feedback:', error);
    return NextResponse.json({ error: 'Failed to upvote feedback' }, { status: 500 });
  }
}
