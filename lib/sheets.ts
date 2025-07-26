import { google } from 'googleapis';
import { QuizResult, GoogleSheetsData } from '@/types/quiz';

// Google Sheets configuration
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize Google Sheets API
async function getGoogleSheetsClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ 
      version: 'v4', 
      auth 
    });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
}

// Convert quiz result to Google Sheets row format
function formatQuizResultForSheets(result: QuizResult): GoogleSheetsData {
  const answerMap: { [key: number]: string } = {};
  
  result.answers.forEach(answer => {
    answerMap[answer.questionId] = answer.selectedAnswer || 'No answer';
  });

  return {
    timestamp: result.timestamp.toISOString(),
    name: result.userInfo.name,
    age: result.userInfo.age,
    q1Answer: answerMap[1] || 'No answer',
    q2Answer: answerMap[2] || 'No answer',
    q3Answer: answerMap[3] || 'No answer',
    q4Answer: answerMap[4] || 'No answer',
    q5Answer: answerMap[5] || 'No answer',
    q6Answer: answerMap[6] || 'No answer',
    q7Answer: answerMap[7] || 'No answer',
    q8Answer: answerMap[8] || 'No answer',
    q9Answer: answerMap[9] || 'No answer',
    q10Answer: answerMap[10] || 'No answer',
    score: result.score,
    duration: Math.round(result.completionTime / 60), // Convert to minutes
  };
}

// Submit quiz result to Google Sheets
export async function submitQuizToGoogleSheets(result: QuizResult): Promise<boolean> {
  try {
    console.log('Sheets: Starting submission process...');
    
    if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Sheets: Missing Google Sheets configuration');
      console.error('Sheets: GOOGLE_SHEET_ID:', !!GOOGLE_SHEETS_ID);
      console.error('Sheets: GOOGLE_CLIENT_EMAIL:', !!GOOGLE_SERVICE_ACCOUNT_EMAIL);
      console.error('Sheets: GOOGLE_PRIVATE_KEY:', !!GOOGLE_PRIVATE_KEY);
      return false;
    }

    console.log('Sheets: Getting Google Sheets client...');
    const sheets = await getGoogleSheetsClient();
    console.log('Sheets: Got client, formatting data...');
    const formattedData = formatQuizResultForSheets(result);
    console.log('Sheets: Formatted data:', formattedData);
    
    // Create header row if sheet is empty
    console.log('Sheets: Checking for headers...');
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1!A1:N1',
    });

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      console.log('Sheets: Adding headers...');
      // Add headers if they don't exist
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: 'Sheet1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'Timestamp',
            'Name',
            'Age',
            'Q1 Answer',
            'Q2 Answer',
            'Q3 Answer',
            'Q4 Answer',
            'Q5 Answer',
            'Q6 Answer',
            'Q7 Answer',
            'Q8 Answer',
            'Q9 Answer',
            'Q10 Answer',
            'Score',
            'Duration (minutes)'
          ]]
        }
      });
    }

    console.log('Sheets: Appending quiz result...');
    // Append the quiz result
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          formattedData.timestamp,
          formattedData.name,
          formattedData.age,
          formattedData.q1Answer,
          formattedData.q2Answer,
          formattedData.q3Answer,
          formattedData.q4Answer,
          formattedData.q5Answer,
          formattedData.q6Answer,
          formattedData.q7Answer,
          formattedData.q8Answer,
          formattedData.q9Answer,
          formattedData.q10Answer,
          formattedData.score,
          formattedData.duration
        ]]
      }
    });

    console.log('Sheets: Quiz result submitted successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Sheets: Error submitting to Google Sheets:', error);
    if (error instanceof Error) {
      console.error('Sheets: Error message:', error.message);
      console.error('Sheets: Error stack:', error.stack);
    }
    return false;
  }
}

// Validate Google Sheets connection
export async function validateGoogleSheetsConnection(): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
    });

    return !!response.data;
  } catch (error) {
    console.error('Google Sheets connection validation failed:', error);
    return false;
  }
}
