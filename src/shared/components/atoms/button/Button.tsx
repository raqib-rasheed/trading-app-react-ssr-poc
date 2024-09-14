import "./Button.scss";
import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isIcon?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  htmlType?: HTMLButtonElement["type"];
}

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  isIcon = false,
  icon,
  children,
  onClick,
  htmlType = "button",
  size,
}) => {
  return (
    <button
      type={htmlType}
      className={clsx(
        "button",
        `button--${variant}`,
        isIcon && "button--icon",
        size === "small" && "button--small"
      )}
      onClick={onClick}
      aria-label={isIcon && icon ? "icon button" : undefined}
    >
      {isIcon ? icon : children}
    </button>
  );
};

export default Button;
