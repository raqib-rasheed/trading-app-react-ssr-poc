import clsx from "clsx";
import "./InputText.scss";

interface InputTextProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
  placeholder = "",
  name,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputId = `${label.replace(" ", "").toLowerCase()}-input`;
  const errorId = `${inputId}-error`;

  return (
    <div className={"input__wrapper"}>
      <label htmlFor={inputId} className={"input__label"}>
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={handleInputChange}
        className={clsx(
          "input__element",
          error && "input--error",
          disabled && "input--disabled"
        )}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-disabled={disabled}
        aria-describedby={error ? errorId : undefined}
      />
    </div>
  );
};

export default InputText;
