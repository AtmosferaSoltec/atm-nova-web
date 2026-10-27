import { useState, type FormEvent, type ReactElement } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { BrandIdentity } from "./brand";
import type { IdentityProps } from "../../types/app.types";
export function IdentitySettings({
  brand,
  onBrandChange,
}: IdentityProps): ReactElement {
  const [draft, setDraft] = useState(brand);
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onBrandChange({ ...draft, name: draft.name.trim() || "Nova" });
    setNotice(
      "Identidad aplicada a esta sesión de prueba. Se restablece al recargar.",
    );
  }
  return (
    <div className="chart-layout">
      <Card>
        <h2>Una identidad propia</h2>
        <p className="muted">
          Tu clínica es la protagonista. Personaliza cómo la ve tu equipo.
        </p>
        <form className="stack-form" onSubmit={submit}>
          <Input
            label="Nombre de la clínica"
            required
            maxLength={50}
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Input
            label="Descripción breve"
            maxLength={80}
            value={draft.tagline}
            onChange={(event) =>
              setDraft({ ...draft, tagline: event.target.value })
            }
          />
          <Select
            label="Paleta de color"
            value={draft.theme}
            onChange={(value) => {
              if (value === "forest" || value === "ocean")
                setDraft({ ...draft, theme: value });
            }}
            options={[
              { value: "forest", label: "Verde bosque" },
              { value: "ocean", label: "Azul océano" },
            ]}
          />
          <Input
            label="Logo de la clínica (PNG, JPG o WebP)"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (
                !["image/png", "image/jpeg", "image/webp"].includes(
                  file.type,
                ) ||
                file.size > 2 * 1024 * 1024
              ) {
                setNotice("Elige una imagen PNG, JPG o WebP de hasta 2 MB.");
                return;
              }
              const reader = new FileReader();
              reader.onload = (): void => {
                const result = reader.result;
                if (typeof result === "string")
                  setDraft((current) => ({ ...current, logoUrl: result }));
              };
              reader.readAsDataURL(file);
            }}
          />
          <small className="muted">
            Vista previa local. La imagen no se sube a ningún servidor.
          </small>
          <Button type="submit">Aplicar a la demostración</Button>
          {notice && (
            <p role="status" className="notice">
              {notice}
            </p>
          )}
        </form>
      </Card>
      <Card className={`brand-preview theme-${draft.theme}`}>
        <span className="eyebrow">ASÍ SE VERÁ TU MARCA</span>
        <BrandIdentity brand={draft} />
        <p>El nombre y el logo acompañan a tu equipo en cada pantalla.</p>
        <Button
          variant="secondary"
          onClick={() => setDraft({ ...draft, logoUrl: "" })}
        >
          Usar símbolo predeterminado
        </Button>
      </Card>
    </div>
  );
}
