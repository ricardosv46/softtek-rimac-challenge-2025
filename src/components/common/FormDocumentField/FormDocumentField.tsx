import "./FormDocumentField.scss";
import { FormSelect } from "../FormSelect/FormSelect";
import { FormField } from "../FormField/FormField";

interface DocumentOption {
  value: string;
  label: string;
}

interface FormDocumentFieldProps {
  documentType: string;
  documentNumber: string;
  onDocumentTypeChange: (value: string) => void;
  onDocumentNumberChange: (value: string) => void;
  options: DocumentOption[];
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const FormDocumentField = ({
  documentType,
  documentNumber,
  onDocumentTypeChange,
  onDocumentNumberChange,
  options,
  error,
  className = "",
  disabled = false,
}: FormDocumentFieldProps) => {
  const fieldClasses = `form-document-field ${
    error ? "form-document-field--error" : ""
  } ${className}`.trim();

  return (
    <div>
      <div className={fieldClasses}>
        <FormSelect
          value={documentType}
          onChange={onDocumentTypeChange}
          options={options}
          className="form-document-field__select"
          error={error}
          disabled={disabled}
        />
        <FormField
          label="Nro. de documento"
          type="tel"
          placeholder="Nro. de documento"
          value={documentNumber}
          onChange={onDocumentNumberChange}
          className="form-document-field__input"
          error={error}
          disabledErrorMsg
          maxLength={documentType === "DNI" ? 8 : 9}
          disabled={disabled}
        />
      </div>
      {error && <p className="form-document-field__error">{error}</p>}
    </div>
  );
};
