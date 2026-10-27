import { useState, type FormEvent, type ReactElement } from "react";
import { format } from "date-fns";
import { Dialog } from "../../../components/ui/dialog";
import { Select } from "../../../components/ui/select";
import { DatePicker } from "../../../components/ui/date-picker";
import { Button } from "../../../components/ui/button";
import { patients, treatments } from "../mocks/data";
import type { AppointmentFormProps } from "../types/dentistry.types";
export function AppointmentForm({
  open,
  onOpenChange,
  date,
  onSave,
}: AppointmentFormProps): ReactElement {
  const [error, setError] = useState("");
  const [patientId, setPatientId] = useState(patients[0].id);
  const [treatment, setTreatment] = useState(treatments[0].id);
  const [selectedDate, setSelectedDate] = useState(date);
  const [time, setTime] = useState("09:00");
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errorMessage = onSave({
      id: crypto.randomUUID(),
      patientId,
      date: format(selectedDate, "yyyy-MM-dd"),
      time,
      treatment: treatments.find((item) => item.id === treatment)!.name,
      status: "pending",
    });
    setError(errorMessage ?? "");
  }
  return (
    <Dialog
      title="Nueva cita"
      description="Organiza la próxima visita. Los cambios son solo de demostración."
      open={open}
      onOpenChange={onOpenChange}
    >
      <form className="stack-form" onSubmit={submit}>
        <Select
          label="Paciente"
          value={patientId}
          onChange={setPatientId}
          options={patients.map((patient) => ({
            value: patient.id,
            label: patient.name,
          }))}
        />
        <Select
          label="Tratamiento"
          value={treatment}
          onChange={setTreatment}
          options={treatments.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
        <div className="form-row">
          <DatePicker
            label="Fecha"
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <Select
            label="Hora"
            value={time}
            onChange={setTime}
            options={[
              "09:00",
              "09:30",
              "10:00",
              "10:30",
              "11:00",
              "11:30",
              "12:00",
              "12:30",
              "15:00",
              "15:30",
              "16:00",
            ].map((hour) => ({ value: hour, label: hour }))}
          />
        </div>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <Button type="submit">Añadir cita de prueba</Button>
      </form>
    </Dialog>
  );
}
