import { IconArrow } from "@/icons/IconArrow/IconArrow";
import "./Steps.scss";
import { useNavigate } from "react-router";
import { useQuoteStore } from "@/store/quoteStore";
import { useStepsStore } from "@/store/stepsStore";

export const Steps = () => {
  const navigate = useNavigate();
  const { clearQuote } = useQuoteStore();
  const { currentStep } = useStepsStore();
  const steps = [
    { number: 1, title: "Planes y coberturas" },
    { number: 2, title: "Resumen" },
  ];

  const handleGoBack = () => {
    if (currentStep === 1) {
      clearQuote(); // Solo limpiar estado en paso 1
      navigate("/");
    } else {
      navigate(-1); // Solo volver atrás en paso 2
    }
  };

  return (
    <div className="steps">
      <div className="steps__container">
        {/* Mobile: Nuevo diseño */}
        <div className="steps__mobile-container">
          <div className="steps__mobile">
            <div className="steps__back-icon">
              <IconArrow
                className="steps__back-icon--svg"
                onClick={handleGoBack}
              />
            </div>

            <div className="steps__info">
              <span className="steps__step-text">PASO {currentStep} DE 2</span>
            </div>

            <div className="steps__progress">
              <div
                className="steps__progress-bar"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="steps__line" />
        </div>

        {/* Desktop: Diseño original */}
        <div className="steps__desktop">
          {steps.map((step, index) => (
            <div key={step.number} className="steps__item">
              <div
                className={`steps__item-number ${
                  currentStep >= step.number ? "steps__item-number--active" : ""
                }`}
              >
                {step.number}
              </div>
              <div
                className={`steps__item-title ${
                  currentStep >= step.number ? "steps__item-title--active" : ""
                }`}
              >
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div className="steps__connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
