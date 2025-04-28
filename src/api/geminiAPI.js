import axios from 'axios';

export const generateSOPLOM = async (data) => {
  try {
    const prompt = `Generate a ${data.documentType} for ${data.name} applying to ${data.fieldOfStudy} in ${data.country}.
    Include these details:
    - Education: ${data.previousEducation}
    - Achievements: ${data.achievements}
    - Goals: ${data.goals}
    Use professional tone, 500-700 words.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Unexpected API response format');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(`Failed to generate: ${error.response?.data?.error?.message || error.message}`);
  }
};