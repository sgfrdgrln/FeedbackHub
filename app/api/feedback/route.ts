import { NextResponse } from 'next/server';
import { getAllFeedback, createFeedback } from '@/backend/services/feedbackService';
import { feedbackSchema } from '@/lib/validations/feedbackSchema';

export async function GET() {
  try {
    const feedback = await getAllFeedback();
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // validate with zod
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newFeedback = await createFeedback(parsed.data);
    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/feedback:", error);
    return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
  }
}
