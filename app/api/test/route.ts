import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Test: Checking environment variables...');
    
    const hasGoogleSheetsId = !!process.env.GOOGLE_SHEET_ID;
    const hasGoogleEmail = !!process.env.GOOGLE_CLIENT_EMAIL;
    const hasGooglePrivateKey = !!process.env.GOOGLE_PRIVATE_KEY;
    
    console.log('Test: Environment check results:', {
      hasGoogleSheetsId,
      hasGoogleEmail,
      hasGooglePrivateKey,
      googleSheetsId: process.env.GOOGLE_SHEET_ID?.substring(0, 10) + '...',
      googleEmail: process.env.GOOGLE_CLIENT_EMAIL
    });

    // Try to validate Google Sheets connection
    let googleSheetsError = null;
    let connectionValid = false;
    
    try {
      const { validateGoogleSheetsConnection } = await import('@/lib/sheets');
      connectionValid = await validateGoogleSheetsConnection();
      console.log('Test: Google Sheets connection valid:', connectionValid);
      
    } catch (error) {
      console.error('Test: Google Sheets error:', error);
      googleSheetsError = error instanceof Error ? error.message : 'Unknown error';
    }

    return NextResponse.json({
      environment: {
        hasGoogleSheetsId,
        hasGoogleEmail,
        hasGooglePrivateKey,
        googleSheetsId: process.env.GOOGLE_SHEET_ID?.substring(0, 10) + '...',
        googleEmail: process.env.GOOGLE_CLIENT_EMAIL
      },
      connectionValid,
      googleSheetsError,
      status: connectionValid ? 'success' : 'error'
    });

  } catch (error) {
    console.error('Test: General error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    }, { status: 500 });
  }
}
