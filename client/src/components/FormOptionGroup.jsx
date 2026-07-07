function FormOptionGroup({ label, name, options, value, onChange, error, required = true }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-emerald-600">*</span>}
      </span>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(name, option)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-600'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FormOptionGroup;