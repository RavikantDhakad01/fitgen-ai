function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-slate-950 font-bold text-lg">
          Fit<span className="text-emerald-600">Gen</span> AI
        </span>
        <p className="text-slate-400 text-sm text-center md:text-right">
          © {new Date().getFullYear()} FitGen AI. Personalized fitness plans powered by AI.
        </p>
      </div>
    </footer>
  );
}

export default Footer;