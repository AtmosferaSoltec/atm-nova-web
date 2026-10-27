import type { ReactElement } from "react";
import type { CardProps } from "../../types/ui.types";
export function Card({ className = "", ...props }: CardProps): ReactElement {
  return <section className={`card ${className}`} {...props} />;
}
