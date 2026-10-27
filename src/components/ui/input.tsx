import { useId, type ReactElement } from "react";
import type { InputProps } from "../../types/ui.types";
export function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps): ReactElement {
  const generatedId = useId();
  return (
    <div className="field">
      <label htmlFor={id ?? generatedId}>{label}</label>
      <input
        id={id ?? generatedId}
        className={`input ${className}`}
        {...props}
      />
    </div>
  );
}
