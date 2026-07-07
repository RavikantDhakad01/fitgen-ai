import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

function EmptyPlanState() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-950 mb-3">No Plan Found</h2>
        <p className="text-slate-500 mb-8">
          We couldn't find a generated fitness plan. Please fill out the form to generate your personalized plan first.
        </p>
        <Button onClick={() => navigate('/generate')}>Go to Generate Plan</Button>
      </div>
    </div>
  );
}

export default EmptyPlanState;