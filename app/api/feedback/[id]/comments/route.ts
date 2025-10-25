import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/backend/db/connection';
import Feedback from '@/backend/models/Feedback';

// GET - Fetch comments for a feedback
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Note: Promise<{ id }>
) {
  const { id } = await context.params; // ✅ await unwraps it properly

  try {
    await connectToDatabase();

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json({ comments: feedback.comments || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST - Add a new comment to feedback
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ same fix
) {
  const { id } = await context.params;

  try {
    await connectToDatabase();

    const body = await request.json();
    const { content, author, authorImage } = body;

    if (!content || !author) {
      return NextResponse.json({ error: 'Content and author are required' }, { status: 400 });
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    const newComment = {
      author,
      authorImage,
      content,
      createdAt: new Date(),
    };

    feedback.comments = feedback.comments || [];
    feedback.comments.push(newComment);

    await feedback.save();

    const addedComment = feedback.comments[feedback.comments.length - 1];

    return NextResponse.json({ comment: addedComment }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
