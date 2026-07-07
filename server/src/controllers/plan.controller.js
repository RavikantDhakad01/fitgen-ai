import { generateFitnessPlan } from '../services/gemini.service.js';

const REQUIRED_FIELDS = [
  'age',
  'gender',
  'height',
  'weight',
  'fitnessGoal',
  'activityLevel',
  'dietPreference',
];

export const postGeneratePlan = async (req, res) => {
  const userData = req.body || {};

  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = userData[field];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields.',
      missingFields,
    });
  }

  try {
    const plan = await generateFitnessPlan(userData);
    return res.status(200).json({ plan });
  } catch (err) {
    if (err.code === 'INVALID_AI_JSON') {
      return res.status(502).json({
        error: 'The AI service returned an unexpected response. Please try again.',
      });
    }

    console.error('Gemini generation error:', err.message);
    return res.status(500).json({
      error: 'Failed to generate fitness plan. Please try again later.',
    });
  }
};