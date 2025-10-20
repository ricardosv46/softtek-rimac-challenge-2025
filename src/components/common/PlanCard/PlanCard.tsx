import type { Plan } from "@/services/types/plan";
import "./PlanCard.scss";
import { IconHospital } from "@/icons/IconHospital/IconHospital";
import { IconHome } from "@/icons/IconHome/IconHome";
import { Button } from "../Button/Button";

interface PlanCardProps {
  plan: Plan;
  isForSomeoneElse: boolean;
  onSelectPlan: (plan: Plan) => void;
  isRecommended?: boolean;
}

export const PlanCard = ({
  plan,
  isForSomeoneElse,
  onSelectPlan,
  isRecommended = false,
}: PlanCardProps) => {
  // Calcular precio con descuento si aplica
  const originalPrice = plan.price;
  const discount = isForSomeoneElse ? originalPrice * 0.05 : 0;
  const finalPrice = originalPrice - discount;

  const getPlanIcon = (planName: string) => {
    if (planName.includes("Clínica")) {
      return <IconHospital />;
    }

    // Para todos los demás planes (Casa, Chequeo, Bienestar, Fitness, etc.)
    return <IconHome />;
  };

  return (
    <div className="plan-card">
      <div className="plan-card__header">
        {isRecommended && (
          <div className="plan-card__recommended">Plan recomendado</div>
        )}
        <div className="plan-card__content">
          <h3 className="plan-card__name">{plan.name}</h3>

          <div className="plan-card__price">
            <div className="plan-card__price-label">Costo del plan</div>
            {isForSomeoneElse && discount > 0 && (
              <div className="plan-card__price-original">
                ${originalPrice} antes
              </div>
            )}
            <div className="plan-card__price-final">${finalPrice} al mes</div>
          </div>
        </div>

        <div className="plan-card__icon">{getPlanIcon(plan.name)}</div>
      </div>

      <div className="plan-card__separator"></div>

      <ul className="plan-card__benefits">
        {plan.description.map((benefit, index) => (
          <li key={index} className="plan-card__benefit">
            {benefit}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onSelectPlan(plan)}
        type="button"
        variant="red"
        size="small"
        width="full"
      >
        Seleccionar Plan
      </Button>
    </div>
  );
};
