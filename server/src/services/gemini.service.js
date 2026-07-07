import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';

if (!env.geminiApiKey) {
  console.warn('Warning: GEMINI_API_KEY is not set. Plan generation will fail.');
}

const genAI = new GoogleGenerativeAI(env.geminiApiKey);

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    bmi: {
      type: 'object',
      properties: {
        value: { type: 'number' },
        category: { type: 'string' },
      },
      required: ['value', 'category'],
    },
    dailyCalories: { type: 'number' },
    workoutPlan: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'string' },
          focus: { type: 'string' },
          exercises: { type: 'array', items: { type: 'string' } },
        },
        required: ['day', 'focus', 'exercises'],
      },
    },
    dietPlan: {
      type: 'object',
      properties: {
        breakfast: { type: 'string' },
        lunch: { type: 'string' },
        dinner: { type: 'string' },
        snacks: { type: 'string' },
      },
      required: ['breakfast', 'lunch', 'dinner', 'snacks'],
    },
    waterIntakeLiters: { type: 'number' },
    sleepHours: { type: 'number' },
    healthTips: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'bmi',
    'dailyCalories',
    'workoutPlan',
    'dietPlan',
    'waterIntakeLiters',
    'sleepHours',
    'healthTips',
  ],
};

function buildPrompt(userData) {
  const { name, age, gender, height, weight, fitnessGoal, activityLevel, dietPreference } = userData;

  return `You are a certified fitness and nutrition expert. Generate a personalized fitness plan for the following person:

Name: ${name || 'Not provided'}
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
Fitness Goal: ${fitnessGoal}
Activity Level: ${activityLevel}
Diet Preference: ${dietPreference}

Calculate their BMI accurately using height and weight. Provide an estimated daily calorie need based on their stats, goal, and activity level. Create a 7-day workout plan (Day 1 through Day 7) appropriate for their activity level and goal. Create a daily diet plan (breakfast, lunch, dinner, snacks) that strictly respects their diet preference (${dietPreference}). Recommend daily water intake in liters. Recommend daily sleep duration in hours. Provide 4-6 personalized health tips based on their profile.

Respond with JSON only, matching this exact structure and these exact keys: bmi (object with value and category), dailyCalories (number), workoutPlan (array of 7 objects each with day, focus, exercises array), dietPlan (object with breakfast, lunch, dinner, snacks as strings), waterIntakeLiters (number), sleepHours (number), healthTips (array of strings). Do not include any text, markdown, or explanation outside the JSON.`;
}

export async function generateFitnessPlan(userData) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  const prompt = buildPrompt(userData);
  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    const error = new Error('AI returned an invalid response format.');
    error.code = 'INVALID_AI_JSON';
    throw error;
  }

  return parsed;
}