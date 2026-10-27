import type { ReactElement } from "react";
import { Building2, LogOut } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BrandIdentity, DeveloperCredit } from "../components/common/brand";
import { defaultBrand } from "../config/brand";
import type { SessionProps } from "../types/app.types";
export function PlatformPage({ user, onLogout }: SessionProps): ReactElement {
  return (
    <main className="platform-page">
      <header className="topbar">
        <BrandIdentity brand={defaultBrand} />
        <Button variant="secondary" onClick={onLogout}>
          <LogOut size={17} /> Cerrar sesión
        </Button>
      </header>
      <div className="platform-content">
        <span className="eyebrow">ADMINISTRACIÓN DE LA PLATAFORMA</span>
        <h1>Hola, {user.name}.</h1>
        <p className="muted">
          Una vista global de tus clientes. Sin acceso a la información clínica
          de sus pacientes.
        </p>
        <Card>
          <Building2 size={28} />
          <h2>Clínicas y organizaciones</h2>
          <p>
            El espacio de superadministración está separado de la operación del
            consultorio.
          </p>
          <div className="platform-tenant">
            <div>
              <strong>Clínica de demostración</strong>
              <small>Odontología · Una sede</small>
            </div>
            <span className="badge">Maqueta activa</span>
          </div>
          <p className="notice">
            La gestión de clientes, usuarios y suscripciones se diseñará en la
            siguiente etapa. Cierra sesión y elige un perfil de clínica para
            explorar sus pantallas.
          </p>
        </Card>
        <DeveloperCredit />
      </div>
    </main>
  );
}
