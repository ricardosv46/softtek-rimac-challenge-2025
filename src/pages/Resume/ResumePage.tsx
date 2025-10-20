import { useNavigate } from "react-router";
import { useQuoteStore } from "../../store/quoteStore";
import "./ResumePage.scss";
import { IconUserResume } from "@/icons/IconUserResume/IconUserResume";
import { BackButton } from "@/components/common/BackButton/BackButton";

export const ResumePage = () => {
  const navigate = useNavigate();
  const {
    userFormData,
    userApiData,
    selectedPlan,
    userSelectionState,
    clearQuote,
  } = useQuoteStore();

  const handleStartOver = () => {
    clearQuote();
    navigate("/");
  };

  // Si no hay datos necesarios, redirigir al inicio
  if (!userApiData || !selectedPlan || !userFormData) {
    return (
      <main className="resume-page">
        <div className="resume-page__error">
          <p>
            No se encontraron datos del resumen. Por favor, completa el proceso.
          </p>
          <button onClick={handleStartOver}>Volver al inicio</button>
        </div>
      </main>
    );
  }

  // Calcular precio final con descuento si aplica
  const originalPrice = selectedPlan.price;
  const discount =
    userSelectionState === "for_someone_else" ? originalPrice * 0.05 : 0;
  const finalPrice = originalPrice - discount;

  return (
    <main className="resume-page">
      <div className="resume-page__container">
        <BackButton />
        <h1 className="resume-page__title">Resumen del seguro</h1>
        <div className="resume-page__content">
          <div className="resume-page__card">
            <div className="resume-page__section">
              <div className="resume-page__label">Precios calculados para:</div>
              <div className="resume-page__user-info">
                <div className="resume-page__user-icon">
                  <IconUserResume />
                </div>
                <div className="resume-page__user-name">
                  {userApiData.name} {userApiData.lastName}
                </div>
              </div>
            </div>

            <div className="resume-page__separator"></div>

            <div className="resume-page__section">
              <div className="resume-page__section-title">
                Responsable de pago
              </div>
              <div className="resume-page__info-item">
                DNI: {userFormData.documentNumber}
              </div>
              <div className="resume-page__info-item">
                Celular: {userFormData.phone}
              </div>
            </div>

            <div className="resume-page__section">
              <div className="resume-page__section-title">Plan elegido</div>
              <div className="resume-page__info-item">{selectedPlan.name}</div>
              <div className="resume-page__info-item">
                Costo del Plan: ${finalPrice.toFixed(2)} al mes
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
