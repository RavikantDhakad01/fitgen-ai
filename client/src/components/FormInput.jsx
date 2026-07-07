function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-emerald-600">*</span>}
        {!required && <span className="text-slate-400 font-normal">(Optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;