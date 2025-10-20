import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "black" | "red";
  size?: "small" | "large";
  width?: "auto" | "full";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  type = "button",
  variant = "black",
  size = "small",
  width = "auto",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const buttonClasses =
    `button button--${variant} button--${size} button--${width} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
