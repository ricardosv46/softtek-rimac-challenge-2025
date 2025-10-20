import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { FormDocumentField } from "../FormDocumentField/FormDocumentField";
import { FormCheckbox } from "../FormCheckbox/FormCheckbox";
import { IconLoading } from "../../../icons/IconLoading/IconLoading";
import { formSchema, type FormData } from "./formValidation";
import { useUser } from "../../../hooks/useUser";
import { useQuoteStore } from "../../../store/quoteStore";
import "./Form.scss";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

interface FormProps {
  className?: string;
  variant?: "mobile" | "desktop";
}

/**
 * Componente de formulario para cotización de seguros
 * Maneja la validación, envío de datos y navegación
 *
 * @param {FormProps} props - Propiedades del componente
 * @param {string} props.className - Clases CSS adicionales
 * @param {"mobile" | "desktop"} props.variant - Variante del formulario para diferentes layouts
 *
 * @example
 * // Formulario móvil
 * <Form variant="mobile" className="custom-form" />
 *
 * // Formulario desktop
 * <Form variant="desktop" />
 */
export const Form = ({ className = "", variant = "mobile" }: FormProps) => {
  const { refetch, isLoading, error } = useUser();
  const { setUserFormData, setUserApiData } = useQuoteStore();
  const navigate = useNavigate();
  const { clearQuote } = useQuoteStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      phone: "",
      privacyPolicy: true,
      commercialCommunications: true,
    },
  });

  const watchedValues = watch();

  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
  ];

  const formClasses = `form form--${variant} ${className}`.trim();

  /**
   * Maneja el envío del formulario
   * Valida los datos, obtiene información del usuario y navega a la siguiente página
   *
   * @param {FormData} data - Datos del formulario validados por Zod
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa el proceso
   *
   * @example
   * // Se ejecuta automáticamente al enviar el formulario
   * const formData = {
   *   documentType: "DNI",
   *   documentNumber: "12345678",
   *   phone: "912345678",
   *   privacyPolicy: true,
   *   commercialCommunications: true
   * };
   * await handleFormSubmit(formData);
   */
  const handleFormSubmit = async (data: FormData) => {
    try {
      // Llamar a la API para obtener datos del usuario
      const result = await refetch();

      if (result.data) {
        // Guardar datos en el store
        setUserFormData(data);
        setUserApiData(result.data);

        // Navegar a la página de planes
        navigate("/plan");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  // Mostrar error si existe
  const apiError = error;

  useEffect(() => {
    if (errors) {
      clearQuote();
    }
  }, []);

  return (
    <form className={formClasses} onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="documentType"
        control={control}
        render={({ field }) => (
          <FormDocumentField
            documentType={field.value}
            documentNumber={watchedValues.documentNumber}
            onDocumentTypeChange={field.onChange}
            onDocumentNumberChange={(value) =>
              setValue("documentNumber", value)
            }
            options={documentOptions}
            error={
              errors.documentType?.message || errors.documentNumber?.message
            }
            className="form__field"
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <FormField
            label="Celular"
            type="tel"
            placeholder="Celular"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.phone?.message}
            className="form__field"
            maxLength={9}
            disabled={isLoading}
          />
        )}
      />

      <div className="form__checkboxes">
        <Controller
          name="privacyPolicy"
          control={control}
          render={({ field }) => (
            <FormCheckbox
              label="Acepto la Política de Privacidad"
              checked={field.value}
              onChange={field.onChange}
              error={errors.privacyPolicy?.message}
            />
          )}
        />

        <Controller
          name="commercialCommunications"
          control={control}
          render={({ field }) => (
            <FormCheckbox
              label="Acepto la Política Comunicaciones Comerciales"
              checked={field.value}
              onChange={field.onChange}
              error={errors.commercialCommunications?.message}
            />
          )}
        />
      </div>
      <Link
        to="/pdf/TERMINOS-Y-CONDICIONES.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="form__terms">Aplican Términos y Condiciones.</p>
      </Link>

      {/* Mostrar error de API si existe */}
      {apiError && (
        <div className="form__error">
          <p>
            Error: {apiError.message || "Error al obtener datos del usuario"}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="form__button"
        variant="black"
        size="large"
        width="auto"
        disabled={
          !watchedValues.privacyPolicy ||
          !watchedValues.commercialCommunications ||
          isLoading
        }
      >
        {isLoading ? (
          <>
            <IconLoading className="form__loading-icon" />
            Cotizando...
          </>
        ) : (
          "Cotiza aquí"
        )}
      </Button>
    </form>
  );
};
