import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-24 pb-20 text-center">
      <span className="inline-block bg-emerald-50 text-emerald-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        AI-Powered Fitness Planning
      </span>

      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 leading-tight mb-6">
        Your Personalized <span className="text-emerald-600">Fitness Plan</span>,
        <br className="hidden md:block" />
        Generated Instantly
      </h1>

      <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        FitGen AI creates a custom workout routine, diet plan, and health
        insights tailored to your body and goals — powered by AI, delivered
        in seconds, and ready to download as a PDF.
      </p>

      <Button onClick={() => navigate('/generate')}>Generate My Plan</Button>
    </section>
  );
}

export default Hero;