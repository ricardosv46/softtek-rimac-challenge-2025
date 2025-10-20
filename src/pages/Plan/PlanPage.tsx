import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { usePlans } from "../../hooks/usePlans";
import { useQuoteStore, UserSelectionState } from "../../store/quoteStore";
import { UserSelection } from "../../components/common/UserSelection/UserSelection";
import { PlanCard } from "../../components/common/PlanCard/PlanCard";
import { PlanCardSkeleton } from "../../components/common/PlanCardSkeleton/PlanCardSkeleton";
import { BackButton } from "../../components/common/BackButton/BackButton";
import type { Plan } from "../../services/types/plan";
import "./PlanPage.scss";

export const PlanPage = () => {
  const navigate = useNavigate();
  const { data: plansResponse, isLoading, error, refetch } = usePlans();
  const {
    userApiData,
    userSelectionState,
    setSelectedPlan,
    setUserSelectionState,
    clearQuote,
  } = useQuoteStore();

  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);

  // Calcular edad del usuario basado en birthDay
  const calculateAge = (birthDay: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDay.split("-").reverse().join("-"));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Filtrar planes por edad del usuario
  useEffect(() => {
    if (plansResponse?.list && userApiData) {
      const userAge = calculateAge(userApiData.birthDay);
      const filtered = plansResponse.list.filter((plan) => userAge <= plan.age);
      setFilteredPlans(filtered);
    }
  }, [plansResponse, userApiData]);

  // Cargar planes cuando se monta el componente
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSelectionChange = (forSomeoneElse: boolean) => {
    const newState = forSomeoneElse
      ? UserSelectionState.FOR_SOMEONE_ELSE
      : UserSelectionState.FOR_ME;
    setUserSelectionState(newState);
  };

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
    navigate("/resume");
  };

  const handleGoBack = () => {
    clearQuote(); // Resetear todos los estados globales
    navigate("/");
  };

  // Determinar si mostrar planes basado en el estado de selección
  const showPlans = userSelectionState !== UserSelectionState.EMPTY;
  const isForSomeoneElse =
    userSelectionState === UserSelectionState.FOR_SOMEONE_ELSE;

  console.log({ userSelectionState, showPlans, isForSomeoneElse });

  if (!userApiData) {
    return (
      <main className="plan-page">
        <div className="plan-page__error">
          <p>
            No se encontraron datos del usuario. Por favor, completa el
            formulario primero.
          </p>
          <button onClick={handleGoBack}>Volver al inicio</button>
        </div>
      </main>
    );
  }

  return (
    <main className="plan-page">
      <div className="plan-page__container">
        <BackButton />

        <div className="plan-page__header">
          <h1 className="plan-page__title">
            {userApiData.name} ¿Para quién deseas cotizar?
          </h1>
          <p className="plan-page__subtitle">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>

        <UserSelection
          userSelectionState={userSelectionState}
          onSelectionChange={handleSelectionChange}
        />

        {showPlans && (
          <div className="plan-page__plans">
            {isLoading && (
              <div className="plan-page__plans-grid">
                <PlanCardSkeleton />
                <PlanCardSkeleton />
                <PlanCardSkeleton />
              </div>
            )}

            {error && (
              <div className="plan-page__error">
                <p>Error al cargar los planes: {error.message}</p>
                <button onClick={() => refetch()}>Reintentar</button>
              </div>
            )}

            {filteredPlans.length > 0 && !isLoading && (
              <div className="plan-page__plans-grid">
                {filteredPlans.map((plan, index) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    isForSomeoneElse={isForSomeoneElse || false}
                    onSelectPlan={handlePlanSelection}
                    isRecommended={index === 1} // El segundo plan es recomendado
                  />
                ))}
              </div>
            )}

            {filteredPlans.length === 0 && !isLoading && (
              <div className="plan-page__no-plans">
                <p>No hay planes disponibles para tu edad.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
