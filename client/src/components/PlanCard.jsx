function PlanCard({ icon, title, children, className = '' }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default PlanCard;