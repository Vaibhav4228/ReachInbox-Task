import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const categorizeWithGemini = async (emailBody) => {
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: emailBody,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 100,
    },
  };

  try {
    const response = await axios.post(GEMINI_API_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("Gemini API Response:", response.data); debugging

    const category = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return category;
  } catch (error) {
    if (error.response) {
   
      console.error('Error response from Gemini API:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Failed to categorize email');
  }
};

export default categorizeWithGemini;
