function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
        <span className="text-emerald-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-950 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;