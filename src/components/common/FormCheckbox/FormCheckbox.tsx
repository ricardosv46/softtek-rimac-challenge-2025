import { IconCheckbox } from "@/icons/IconCheckbox/IconCheckbox";
import "./FormCheckbox.scss";

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const FormCheckbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}: FormCheckboxProps) => {
  const checkboxClasses = `form-checkbox ${className}`.trim();

  return (
    <div className={checkboxClasses}>
      <label className="form-checkbox__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="form-checkbox__input"
        />
        <div
          className={`form-checkbox__custom-checkbox ${
            checked ? "form-checkbox__custom-checkbox--checked" : ""
          } ${disabled ? "form-checkbox__custom-checkbox--disabled" : ""}`}
        >
          {checked && (
            <span className="form-checkbox__checkmark form-checkbox__checkmark--visible">
              <IconCheckbox className="form-checkbox__checkmark__icon" />
            </span>
          )}
        </div>
        <span className="form-checkbox__text">{label}</span>
      </label>
    </div>
  );
};
