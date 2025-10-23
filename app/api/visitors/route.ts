import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/backend/db/connection';
import Visitor from '@/backend/models/Visitor'

// GET - Retrieve visitor count
export async function GET() {
  try {
    await connectToDatabase();
    
    const totalVisitors = await Visitor.countDocuments();
    
    return NextResponse.json({ count: totalVisitors }, { status: 200 });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}

// POST - Track a new visitor
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get visitor information
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Check if visitor already exists (by IP) within last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingVisitor = await Visitor.findOne({
      ip,
      visitedAt: { $gte: oneDayAgo }
    });
    
    if (!existingVisitor) {
      // Create new visitor record
      await Visitor.create({
        ip,
        userAgent,
        visitedAt: new Date()
      });
    }
    
    const totalVisitors = await Visitor.countDocuments();
    
    return NextResponse.json({ count: totalVisitors }, { status: 201 });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}
