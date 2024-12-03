import axios from 'axios';

export const generateContent = async (detected) => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: 'Starting with the common name, give one line for some basic information about the plant, then the regions this plant is usually found in and finally what are the growing conditions and how to take care of the plant (The plant is:' + detected,
            },
          ],
        },
      ],
      generation_config: {
        max_output_tokens: 1000,
        temperature: 1,
      },
    };

    const apiEndpoint =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC9XECcmCPDvZ7ljKkDH7OUV5MP_65Sb_M';

    const response = await axios.post(apiEndpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const candidates = response.data.candidates;
    let generatedText = 'No content generated';
    if (candidates && candidates.length > 0) {
      generatedText = candidates[0]?.content?.parts[0]?.text || generatedText;
    }

    console.log('Generated Content:', generatedText);
    return generatedText; // Return the generated text for use
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
