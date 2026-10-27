import type { ReactElement } from "react";
import type { ButtonProps } from "../../types/ui.types";
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      {...props}
    />
  );
}
