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

  const { name, email, year, role, skills, availability, timestamp } = req.body;

  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1')
      : undefined;

    console.log('Attempting auth with:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    if (!privateKey) throw new Error('GOOGLE_PRIVATE_KEY is missing or empty');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Sheets API client initializing...');

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:G', // Default to Sheet1, user may need to change this
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [timestamp || new Date().toISOString(), name, email, year, role, Array.isArray(skills) ? skills.join(', ') : skills, availability]
        ],
      },
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
