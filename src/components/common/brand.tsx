import type { ReactElement } from "react";
import { Sparkles } from "lucide-react";
import type { BrandProps } from "../../types/app.types";
import atmosphereLogo from "../../assets/brand/atmosfera-logo.png";
export function BrandIdentity({ brand }: BrandProps): ReactElement {
  return (
    <div className="brand">
      {brand.logoUrl ? (
        <img className="tenant-logo" src={brand.logoUrl} alt={brand.name} />
      ) : (
        <span className="brand-symbol">
          <Sparkles size={25} />
        </span>
      )}
      <div>
        <strong>
          {brand.name}
          <span className="brand-dot">.</span>
        </strong>
        <small>{brand.tagline}</small>
      </div>
    </div>
  );
}
export function DeveloperCredit(): ReactElement {
  return (
    <div className="developer-credit">
      <span>Desarrollado por</span>
      <img src={atmosphereLogo} alt="Atmosfera Soluciones Tecnológicas" />
    </div>
  );
}
