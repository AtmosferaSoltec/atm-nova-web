import { useState, type ReactElement } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Select } from "../../../components/ui/select";
import { upperTeeth, lowerTeeth } from "../mocks/data";
import type { ChartProps, ToothState } from "../types/dentistry.types";
const stateLabels: Record<ToothState, string> = {
  healthy: "Sin observaciones",
  planned: "Tratamiento pendiente",
  completed: "Tratamiento realizado",
};
export function DentalChart({
  patient,
  states,
  onChange,
}: ChartProps): ReactElement {
  const [selected, setSelected] = useState(16);
  const [notice, setNotice] = useState("");
  return (
    <div className="chart-layout">
      <Card>
        <div className="section-heading">
          <div>
            <span className="eyebrow">ODONTOGRAMA PERMANENTE</span>
            <h2>{patient.name}</h2>
          </div>
          <span className="badge">Vista de prueba</span>
        </div>
        <p className="muted">Selecciona una pieza para registrar su estado.</p>
        <div className="dental-scroll">
          <div className="dental-arch">
            <span>Maxilar superior</span>
            {[upperTeeth, lowerTeeth].map((row, index) => (
              <div key={index} className="tooth-row">
                {row.map((tooth) => (
                  <Button
                    key={tooth}
                    variant="ghost"
                    className={`tooth tooth-${states[tooth] ?? "healthy"} ${selected === tooth ? "selected" : ""}`}
                    aria-label={`Pieza ${tooth}: ${stateLabels[states[tooth] ?? "healthy"]}`}
                    aria-pressed={selected === tooth}
                    onClick={() => setSelected(tooth)}
                  >
                    <span className="tooth-shape">✦</span>
                    <span>{tooth}</span>
                  </Button>
                ))}
              </div>
            ))}
            <span>Maxilar inferior</span>
          </div>
        </div>
        <div className="chart-legend">
          <span>○ Sin observaciones</span>
          <span>🟠 Pendiente</span>
          <span>🟢 Realizado</span>
        </div>
      </Card>
      <Card>
        <span className="eyebrow">PIEZA SELECCIONADA</span>
        <h2 className="tooth-number">{selected}</h2>
        <Select
          label="Estado de la pieza"
          value={states[selected] ?? "healthy"}
          options={Object.entries(stateLabels).map(([value, label]) => ({
            value,
            label,
          }))}
          onChange={(value) => {
            if (
              value === "healthy" ||
              value === "planned" ||
              value === "completed"
            ) {
              onChange({ ...states, [selected]: value });
              setNotice(
                "Estado actualizado en esta maqueta. No se ha guardado de forma permanente.",
              );
            }
          }}
        />
        <p className="muted chart-note">
          Registro visual por pieza. El detalle por superficies y el historial
          clínico se diseñarán en una siguiente etapa.
        </p>
        {notice && (
          <p role="status" className="notice">
            {notice}
          </p>
        )}
      </Card>
    </div>
  );
}
