import { IconArrow } from "@/icons/IconArrow/IconArrow";
import "./BackButton.scss";
import { useNavigate } from "react-router";

interface BackButtonProps {
  text?: string;
  className?: string;
}

export const BackButton = ({
  text = "Volver",
  className = "",
}: BackButtonProps) => {
  const buttonClasses = `back-button ${className}`.trim();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className={buttonClasses} onClick={handleClick} type="button">
      <div className="back-button__icon">
        <IconArrow className="back-button__icon-svg" />
      </div>
      <span className="back-button__text">{text}</span>
    </button>
  );
};
