import type { InputHTMLAttributes } from "react";
import "./FormField.scss";

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "tel" | "password";
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
  onBlur?: () => void;
  disabledErrorMsg?: boolean;
}

export const FormField = ({
  label,
  placeholder,
  onChange,
  type = "text",
  required = false,
  error,
  className = "",
  disabledErrorMsg = false,
  ...props
}: FormFieldProps) => {
  const fieldClasses = `form-field ${className}`.trim();

  // Función para manejar el input y solo permitir números si es teléfono
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Si es teléfono, solo permitir números
    if (type === "tel") {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    }

    onChange?.(inputValue);
  };

  return (
    <div className="form-field-container">
      <div className={fieldClasses}>
        <input
          type={type}
          className={`form-field__input ${
            error ? "form-field__input--error" : ""
          }`}
          placeholder={placeholder || (label ? label.toLowerCase() : "")}
          onChange={handleInputChange}
          {...props}
        />
        {label && (
          <label className="form-field__label">
            {label}
            {required && <span className="form-field__required">*</span>}
          </label>
        )}
      </div>
      {error && !disabledErrorMsg && (
        <p className="form-field-container__error">{error}</p>
      )}
    </div>
  );
};
