# 🏋️ FitGen AI

An AI-powered fitness planner that generates personalized workout routines, nutrition plans, BMI analysis, daily calorie recommendations, hydration goals, sleep recommendations, and downloadable PDF reports using Google's Gemini AI.

---

## 🌐 Live Demo

**Frontend:** https://fitgen-ai-beta.vercel.app

**Backend:** https://fitgen-ai-api.onrender.com

---


## ✨ Features

- 🤖 AI-powered personalized fitness plans
- 📊 BMI calculation and health category
- 🔥 Daily calorie recommendations
- 🏋️ 7-Day workout plan
- 🥗 Personalized diet plan
- 💧 Daily water intake recommendation
- 😴 Sleep recommendation
- 💡 Personalized health tips
- 📄 Download fitness plan as PDF
- 📱 Fully responsive design
- ⚡ Fast and modern UI

---

## 🛠 Tech Stack

### Frontend

- React 19
- React Router v7
- Tailwind CSS v4
- Axios
- Vite

### Backend

- Node.js
- Express.js
- Gemini AI API
- CORS
- dotenv

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
fitgen-ai
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── services
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/fitgen-ai.git
```

```bash
cd fitgen-ai
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Environment Variables

### Server (.env)

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

CLIENT_ORIGIN=http://localhost:5173
```

### Client (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## API Endpoint

### Generate Fitness Plan

```
POST /api/generate-plan
```

### Request Body

```json
{
  "name": "Alex",
  "age": 20,
  "gender": "Male",
  "height": 175,
  "weight": 65,
  "fitnessGoal": "Muscle Gain",
  "activityLevel": "Beginner",
  "dietPreference": "Vegetarian"
}
```

---

## Future Improvements

- User Authentication
- Save Generated Plans
- Workout Progress Tracking
- Exercise Demonstration Videos
- Meal History
- Dark Mode
- Multi-language Support

---

## Acknowledgements

- Google Gemini API
- React
- Express
- Tailwind CSS
- Vercel
- Render

---

## Author

**Ravikant Dhakad**
---

⭐ If you like this project, consider giving it a star!
