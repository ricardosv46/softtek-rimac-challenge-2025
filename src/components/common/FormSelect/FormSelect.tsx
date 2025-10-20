import "./FormSelect.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const FormSelect = ({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = "",
  error,
}: FormSelectProps) => {
  const selectClasses = `form-select ${className}`.trim();

  return (
    <div className={selectClasses}>
      {label && (
        <label className="form-select__label">
          {label}
          {required && <span className="form-select__required">*</span>}
        </label>
      )}
      <select
        className={`form-select__select ${
          error ? "form-select__select--error" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="form-select__error">{error}</span>}
    </div>
  );
};
