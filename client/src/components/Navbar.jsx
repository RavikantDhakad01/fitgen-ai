import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-12 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-xl font-bold text-slate-950">
          Fit<span className="text-emerald-600">Gen</span> AI
        </span>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button onClick={() => navigate('/generate')} className="px-5! py-2.5! text-sm">
            Generate My Plan
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-slate-950 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-4 pb-2">
          <Button
            onClick={() => navigate('/generate')}
            className="w-full justify-center "
          >
            Generate My Plan
          </Button>
        </div>
      )}
    </header>
  );
}

export default Navbar;