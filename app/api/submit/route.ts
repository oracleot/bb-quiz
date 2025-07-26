import { NextRequest, NextResponse } from 'next/server';
import { submitQuizToGoogleSheets } from '@/lib/sheets';
import { QuizResult } from '@/types/quiz';

export async function POST(request: NextRequest) {
  try {
    console.log('API: Received quiz submission request');
    const body = await request.json();
    console.log('API: Request body:', JSON.stringify(body, null, 2));
    
    // Validate request body
    if (!body || !body.userInfo || !body.answers || typeof body.score !== 'number') {
      console.log('API: Invalid request body structure');
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Reconstruct QuizResult with proper Date objects
    const quizResult: QuizResult = {
      ...body,
      timestamp: new Date(body.timestamp),
    };
    console.log('API: Reconstructed quiz result:', quizResult);

    // Validate user info
    if (!quizResult.userInfo.name || !quizResult.userInfo.age) {
      console.log('API: Missing user information');
      return NextResponse.json(
        { error: 'Missing required user information' },
        { status: 400 }
      );
    }

    // Validate answers
    if (!Array.isArray(quizResult.answers) || quizResult.answers.length !== 10) {
      console.log('API: Invalid answers format, length:', quizResult.answers?.length);
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      );
    }

    console.log('API: About to submit to Google Sheets...');
    // Submit to Google Sheets
    const success = await submitQuizToGoogleSheets(quizResult);
    console.log('API: Google Sheets submission result:', success);

    if (success) {
      return NextResponse.json(
        { message: 'Quiz result submitted successfully' },
        { status: 200 }
      );
    } else {
      console.log('API: Google Sheets submission failed');
      return NextResponse.json(
        { error: 'Failed to submit quiz result' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in submit API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    { message: 'Quiz submission API is running' },
    { status: 200 }
  );
}
