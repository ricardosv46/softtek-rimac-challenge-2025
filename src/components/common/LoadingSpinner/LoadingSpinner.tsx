import "./LoadingSpinner.scss";

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__content">
        <div className="loading-spinner__spinner"></div>
        <p className="loading-spinner__text">Cargando...</p>
      </div>
    </div>
  );
};

