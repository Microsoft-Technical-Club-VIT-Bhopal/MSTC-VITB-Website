import { google } from 'googleapis';

export default async function handler(req, res) {
  // Allow CORS for the frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { email, timestamp } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1')
      : undefined;

    if (!privateKey) throw new Error('GOOGLE_PRIVATE_KEY is missing or empty');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Use a different environment variable for the newsletter sheet ID
    // Default to the same one if not provided, but preferably it should be different
    const spreadsheetId = process.env.GOOGLE_SHEET_ID_NEWSLETTER || process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [timestamp || new Date().toISOString(), email]
        ],
      },
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Google Sheets API Error (Newsletter):', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
