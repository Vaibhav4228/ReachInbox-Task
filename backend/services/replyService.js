import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const knowledgeBase = [
  {
    id: 1,
    content: "Our product helps automate lead outreach using AI. If the lead shows interest, share the booking link: https://cal.com/example",
  },
  {
    id: 2,
    content: "We use LinkedIn, Twitter, email, and phone to engage with high-intent leads via a single platform.",
  },
];

// Simple context join
const retrieveContext = (queryEmailBody) => {
  return knowledgeBase.map(k => k.content).join('\n\n');
};

// Generate reply using Gemini
export const generateSuggestedReply = async (incomingEmailText) => {
  const context = retrieveContext(incomingEmailText);

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Use the following context to suggest a reply to the email.

Context:
${context}

Email:
${incomingEmailText}

Respond with a concise and polite reply.`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 200,
    },
  };

  try {
    const response = await axios.post(GEMINI_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return reply || "No reply generated.";
  } catch (error) {
    console.error('❌ Failed to generate reply:', error.response?.data || error.message);
    return "Error generating reply.";
  }
};
