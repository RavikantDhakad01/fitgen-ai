import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import PlanCard from '../components/PlanCard.jsx';
import EmptyPlanState from '../components/EmptyPlanState.jsx';
import Button from '../components/Button.jsx';
import { generatePlanPdf } from '../utils/generatePlanPdf.js';

const ICONS = {
  bmi: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  calories: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  workout: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  diet: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  water: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a7 7 0 01-7-7c0-4 7-11 7-11s7 7 7 11a7 7 0 01-7 7z" />
    </svg>
  ),
  sleep: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  tips: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.99-2.386l-.548-.547z" />
    </svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
};

function Fallback({ children }) {
  return <p className="text-slate-400 text-sm italic">{children || 'Not available.'}</p>;
}

function Plan() {
  const location = useLocation();
  const plan = location.state?.plan;
  const userData = location.state?.userData;

  if (!plan) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <EmptyPlanState />
      </div>
    );
  }

  const {
    bmi,
    dailyCalories,
    workoutPlan,
    dietPlan,
    waterIntakeLiters,
    sleepHours,
    healthTips,
  } = plan;

  const handleDownloadPdf = () => {
    generatePlanPdf(plan, userData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-12 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3">
            {userData?.name ? `${userData.name}'s Fitness Plan` : 'Your Fitness Plan'}
          </h1>
          <p className="text-slate-500 mb-6">
            Here's your personalized plan, generated based on your details.
          </p>

          <Button onClick={handleDownloadPdf} className="inline-flex items-center gap-2">
            {ICONS.download}
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <PlanCard icon={ICONS.bmi} title="BMI">
            {bmi?.value ? (
              <div>
                <p className="text-3xl font-bold text-slate-950">{bmi.value}</p>
                <p className="text-emerald-600 font-medium text-sm mt-1">{bmi.category || ''}</p>
              </div>
            ) : (
              <Fallback />
            )}
          </PlanCard>

          <PlanCard icon={ICONS.calories} title="Daily Calories">
            {dailyCalories ? (
              <p className="text-3xl font-bold text-slate-950">
                {dailyCalories} <span className="text-base font-normal text-slate-400">kcal/day</span>
              </p>
            ) : (
              <Fallback />
            )}
          </PlanCard>

          <PlanCard icon={ICONS.water} title="Water Intake">
            {waterIntakeLiters ? (
              <p className="text-3xl font-bold text-slate-950">
                {waterIntakeLiters}L <span className="text-base font-normal text-slate-400">/ day</span>
              </p>
            ) : (
              <Fallback />
            )}
          </PlanCard>

          <PlanCard icon={ICONS.sleep} title="Sleep Recommendation">
            {sleepHours ? (
              <p className="text-3xl font-bold text-slate-950">
                {sleepHours} <span className="text-base font-normal text-slate-400">hrs/night</span>
              </p>
            ) : (
              <Fallback />
            )}
          </PlanCard>

          <PlanCard icon={ICONS.diet} title="Diet Plan" className="md:col-span-2 lg:col-span-1">
            {dietPlan ? (
              <ul className="space-y-2 text-sm">
                <li><span className="font-semibold text-slate-700">Breakfast: </span><span className="text-slate-500">{dietPlan.breakfast || 'N/A'}</span></li>
                <li><span className="font-semibold text-slate-700">Lunch: </span><span className="text-slate-500">{dietPlan.lunch || 'N/A'}</span></li>
                <li><span className="font-semibold text-slate-700">Dinner: </span><span className="text-slate-500">{dietPlan.dinner || 'N/A'}</span></li>
                <li><span className="font-semibold text-slate-700">Snacks: </span><span className="text-slate-500">{dietPlan.snacks || 'N/A'}</span></li>
              </ul>
            ) : (
              <Fallback />
            )}
          </PlanCard>

          <PlanCard icon={ICONS.tips} title="Health Tips" className="md:col-span-2 lg:col-span-1">
            {Array.isArray(healthTips) && healthTips.length > 0 ? (
              <ul className="space-y-2 text-sm list-disc list-inside text-slate-500">
                {healthTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            ) : (
              <Fallback />
            )}
          </PlanCard>
        </div>

        <PlanCard icon={ICONS.workout} title="7-Day Workout Plan">
          {Array.isArray(workoutPlan) && workoutPlan.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPlan.map((day, index) => (
                <div key={index} className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                  <p className="font-semibold text-slate-950 text-sm mb-1">{day.day || `Day ${index + 1}`}</p>
                  <p className="text-emerald-600 text-xs font-medium mb-2">{day.focus || ''}</p>
                  {Array.isArray(day.exercises) && day.exercises.length > 0 ? (
                    <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                      {day.exercises.map((exercise, i) => (
                        <li key={i}>{exercise}</li>
                      ))}
                    </ul>
                  ) : (
                    <Fallback />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Fallback>Workout plan is not available.</Fallback>
          )}
        </PlanCard>
      </main>
      
    </div>
  );
}

export default Plan;