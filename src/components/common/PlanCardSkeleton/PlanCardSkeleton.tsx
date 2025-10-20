import "./PlanCardSkeleton.scss";

export const PlanCardSkeleton = () => {
  return (
    <div className="plan-card-skeleton">
      <div className="plan-card-skeleton__header">
        <div className="plan-card-skeleton__content">
          <div className="plan-card-skeleton__name"></div>
          <div className="plan-card-skeleton__price">
            <div className="plan-card-skeleton__price-label"></div>
            <div className="plan-card-skeleton__price-final"></div>
          </div>
        </div>
        <div className="plan-card-skeleton__icon"></div>
      </div>

      <div className="plan-card-skeleton__separator"></div>

      <div className="plan-card-skeleton__benefits">
        <div className="plan-card-skeleton__benefit"></div>
        <div className="plan-card-skeleton__benefit"></div>
        <div className="plan-card-skeleton__benefit"></div>
        <div className="plan-card-skeleton__benefit"></div>
      </div>

      <div className="plan-card-skeleton__button"></div>
    </div>
  );
};
