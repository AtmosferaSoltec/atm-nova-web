import { useState, type ReactElement } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Palette,
  Plus,
  Search,
  Smile,
  Users,
} from "lucide-react";
import {
  BrandIdentity,
  DeveloperCredit,
} from "../../../components/common/brand";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { DatePicker } from "../../../components/ui/date-picker";
import { Dialog } from "../../../components/ui/dialog";
import { roleLabels } from "../../../config/brand";
import type { UserRole } from "../../../types/app.types";
import type {
  Appointment,
  DentistryView,
  WorkspaceProps,
} from "../types/dentistry.types";
import {
  demoDate,
  initialAppointments,
  initialChartStates,
  initialEstimates,
  patients,
  treatments,
} from "../mocks/data";
import { AppointmentForm } from "./appointment-form";
import { DentalChart } from "./dental-chart";
import { IdentitySettings } from "../../../components/common/identity-settings";
const allowedViews: Record<UserRole, DentistryView[]> = {
  superadmin: [],
  owner: ["agenda", "patients", "estimates", "identity"],
  admin: ["agenda", "patients", "estimates", "identity"],
  receptionist: ["agenda", "patients"],
  cashier: ["estimates"],
  dentist: ["agenda", "patients", "chart", "estimates"],
};
const viewLabels: Record<DentistryView, string> = {
  agenda: "Agenda",
  patients: "Pacientes",
  chart: "Odontograma",
  estimates: "Presupuestos y caja",
  identity: "Identidad de la clínica",
};
const statusLabels: Record<Appointment["status"], string> = {
  confirmed: "Confirmada",
  pending: "Por confirmar",
  completed: "Atendida",
};
const navIcons = {
  agenda: CalendarDays,
  patients: Users,
  chart: Smile,
  estimates: CircleDollarSign,
  identity: Palette,
};
export function Workspace({
  user,
  brand,
  onBrandChange,
  onLogout,
}: WorkspaceProps): ReactElement {
  const views = allowedViews[user.role];
  const [chartStates, setChartStates] = useState(initialChartStates);
  const [view, setView] = useState<DentistryView>(views[0] ?? "agenda");
  const [date, setDate] = useState(demoDate);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [patientId, setPatientId] = useState(patients[0].id);
  const [estimates, setEstimates] = useState(initialEstimates);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [treatmentId, setTreatmentId] = useState(treatments[0].id);
  const activePatient =
    patients.find((patient) => patient.id === patientId) ?? patients[0];
  const dayAppointments = appointments.filter(
    (item) => item.date === format(date, "yyyy-MM-dd"),
  );
  const visibleAppointments = dayAppointments
    .filter((item) => status === "all" || item.status === status)
    .sort((a, b) => a.time.localeCompare(b.time));
  const canSchedule = ["owner", "admin", "receptionist"].includes(user.role);
  function saveAppointment(appointment: Appointment): string | null {
    if (
      appointments.some(
        (item) =>
          item.date === appointment.date && item.time === appointment.time,
      )
    ) {
      return "Ese horario ya está ocupado. Elige otro para la nueva cita.";
    }
    setAppointments([...appointments, appointment]);
    setDate(new Date(`${appointment.date}T12:00:00`));
    setAppointmentOpen(false);
    setNotice("Cita añadida a la demostración. Se perderá al recargar.");
    return null;
  }
  function navigate(next: DentistryView): void {
    setView(next);
    setNotice("");
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <BrandIdentity brand={brand} />
        <div className="workspace-label">
          <span className="status-dot" /> Consultorio dental
        </div>
        <span className="nav-label">ESPACIO DE TRABAJO</span>
        <nav aria-label="Menú principal">
          {views.map((item) => {
            const Icon = navIcons[item];
            return (
              <Button
                key={item}
                variant="ghost"
                className={view === item ? "nav-item active" : "nav-item"}
                onClick={() => navigate(item)}
              >
                <Icon size={19} />
                {viewLabels[item]}
                {view === item && <span className="nav-active-dot" />}
              </Button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="prototype-note">
            <SparkleMark />
            <strong>Un espacio en construcción</strong>
            <p>Estás explorando una maqueta. Todos los datos son ficticios.</p>
          </div>
          <DeveloperCredit />
        </div>
      </aside>
      <div className="workspace-main">
        <header className="topbar">
          <span>
            Consultorio <span className="breadcrumb-slash">/</span>{" "}
            <strong>Odontología</strong>
          </span>
          <div className="user-controls">
            <span className="demo-pill">DEMOSTRACIÓN</span>
            <span className="user-name">
              {user.name}
              <small>{roleLabels[user.role]}</small>
            </span>
            <Button
              variant="ghost"
              aria-label="Cerrar sesión"
              onClick={onLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        <main className="workspace-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                {format(date, "EEEE, d 'de' MMMM", {
                  locale: es,
                }).toUpperCase()}
              </span>
              <h1>
                {view === "agenda"
                  ? "Cada cita, un nuevo cuidado."
                  : viewLabels[view]}
              </h1>
              <p>
                {view === "agenda"
                  ? "Un vistazo a tu día. Todo listo para recibir a tus pacientes."
                  : "Los pequeños detalles hacen una gran atención."}
              </p>
            </div>
            {view === "agenda" && canSchedule && (
              <Button
                onClick={() => {
                  setNotice("");
                  setAppointmentOpen(true);
                }}
              >
                <Plus size={18} /> Nueva cita
              </Button>
            )}
            {view === "estimates" && user.role !== "cashier" && (
              <Button onClick={() => setEstimateOpen(true)}>
                <Plus size={18} /> Nuevo presupuesto
              </Button>
            )}
          </div>
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}
          {view === "agenda" && (
            <>
              <div className="stat-grid">
                <Card>
                  <span className="stat-icon">
                    <CalendarDays size={19} />
                  </span>
                  <span>Citas del día</span>
                  <strong>
                    {dayAppointments.length.toString().padStart(2, "0")}
                  </strong>
                  <small>Tu jornada, organizada</small>
                </Card>
                <Card>
                  <span className="stat-icon">
                    <Users size={19} />
                  </span>
                  <span>Por atender</span>
                  <strong>
                    {dayAppointments
                      .filter((item) => item.status !== "completed")
                      .length.toString()
                      .padStart(2, "0")}
                  </strong>
                  <small>Una sonrisa a la vez</small>
                </Card>
                <Card>
                  <span className="stat-icon">
                    <ClipboardList size={19} />
                  </span>
                  <span>Por confirmar</span>
                  <strong>
                    {dayAppointments
                      .filter((item) => item.status === "pending")
                      .length.toString()
                      .padStart(2, "0")}
                  </strong>
                  <small>Revisa las próximas visitas</small>
                </Card>
              </div>
              <div className="agenda-layout">
                <Card className="agenda-card">
                  <div className="section-heading">
                    <div>
                      <h2>Agenda del día</h2>
                      <p className="muted">Consultorio 01 · Dra. Camila Vega</p>
                    </div>
                    <DatePicker
                      label="Cambiar fecha"
                      value={date}
                      onChange={setDate}
                    />
                  </div>
                  <div className="agenda-toolbar">
                    <span>
                      <span className="status-dot" /> {dayAppointments.length}{" "}
                      citas programadas
                    </span>
                    <Select
                      label="Estado"
                      value={status}
                      onChange={setStatus}
                      options={[
                        { value: "all", label: "Todos los estados" },
                        { value: "confirmed", label: "Confirmadas" },
                        { value: "pending", label: "Por confirmar" },
                        { value: "completed", label: "Atendidas" },
                      ]}
                    />
                  </div>
                  <div className="appointment-list">
                    {visibleAppointments.length === 0 && (
                      <div className="empty-state">
                        <CalendarDays size={28} />
                        <h3>Un espacio libre en tu agenda</h3>
                        <p>No hay citas para esta fecha y filtro.</p>
                      </div>
                    )}
                    {visibleAppointments.map((appointment) => {
                      const patient = patients.find(
                        (item) => item.id === appointment.patientId,
                      )!;
                      return (
                        <div key={appointment.id} className="appointment-row">
                          <div className="appointment-time">
                            {appointment.time}
                            <small>30 min</small>
                          </div>
                          <span className="avatar">{patient.initials}</span>
                          <div className="appointment-person">
                            <strong>{patient.name}</strong>
                            <span>{appointment.treatment}</span>
                          </div>
                          <span className={`badge badge-${appointment.status}`}>
                            {statusLabels[appointment.status]}
                          </span>
                          {appointment.status === "pending" && canSchedule ? (
                            <Button
                              variant="ghost"
                              onClick={() =>
                                setAppointments(
                                  appointments.map((item) =>
                                    item.id === appointment.id
                                      ? { ...item, status: "confirmed" }
                                      : item,
                                  ),
                                )
                              }
                            >
                              Confirmar
                            </Button>
                          ) : user.role === "dentist" &&
                            appointment.status !== "completed" ? (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setAppointments(
                                  appointments.map((item) =>
                                    item.id === appointment.id
                                      ? { ...item, status: "completed" }
                                      : item,
                                  ),
                                );
                                setNotice(
                                  "Atención marcada en la demostración.",
                                );
                              }}
                            >
                              Atender
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              aria-label={`Ver paciente ${patient.name}`}
                              onClick={() => {
                                setPatientId(patient.id);
                                setQuery(patient.name);
                                navigate("patients");
                              }}
                            >
                              <ArrowRight size={17} />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="agenda-footer">
                    Horario del consultorio <strong>09:00 – 18:00</strong>
                  </div>
                </Card>
                <div className="agenda-aside">
                  <Card className="care-card">
                    <Smile size={30} />
                    <span className="eyebrow">EL CENTRO ES EL PACIENTE</span>
                    <h2>Un buen día empieza con una sonrisa.</h2>
                    <p>
                      Consulta la información de tus pacientes antes de cada
                      visita.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setQuery("");
                        navigate("patients");
                      }}
                    >
                      Ver pacientes <ArrowRight size={16} />
                    </Button>
                  </Card>
                  <Card>
                    <span className="eyebrow">A TU RITMO</span>
                    <h3>Tu consulta, conectada</h3>
                    <p className="muted">
                      Agenda, ficha del paciente, odontograma y presupuesto: una
                      misma experiencia de atención.
                    </p>
                  </Card>
                </div>
              </div>
            </>
          )}
          {view === "patients" && (
            <Card>
              <div className="section-heading">
                <div>
                  <h2>Personas que confían en ti</h2>
                  <p className="muted">
                    {patients.length} pacientes de demostración
                  </p>
                </div>
                <div className="search-field">
                  <Search size={17} />
                  <Input
                    label="Buscar paciente"
                    placeholder="Nombre o DNI"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="patient-grid">
                {patients
                  .filter((patient) =>
                    `${patient.name} ${patient.dni}`
                      .toLocaleLowerCase("es")
                      .includes(query.toLocaleLowerCase("es")),
                  )
                  .map((patient) => (
                    <Card className="patient-card" key={patient.id}>
                      <span className="avatar">{patient.initials}</span>
                      <h3>{patient.name}</h3>
                      <p>DNI {patient.dni}</p>
                      <p className="muted">{patient.phone}</p>
                      <div className="patient-last">
                        Última visita <strong>{patient.lastVisit}</strong>
                      </div>
                      {user.role === "dentist" ? (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setPatientId(patient.id);
                            navigate("chart");
                          }}
                        >
                          Ver odontograma <ArrowRight size={16} />
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            navigate("agenda");
                            setNotice(
                              `Puedes programar la próxima cita de ${patient.name} con el botón Nueva cita.`,
                            );
                          }}
                        >
                          Ir a agenda <ArrowRight size={16} />
                        </Button>
                      )}
                    </Card>
                  ))}
              </div>
              {!patients.some((patient) =>
                `${patient.name} ${patient.dni}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && (
                <p className="empty-state">
                  No encontramos pacientes con esa búsqueda.
                </p>
              )}
            </Card>
          )}
          {view === "chart" && user.role === "dentist" && (
            <>
              <div className="patient-selector">
                <Select
                  label="Paciente"
                  value={patientId}
                  onChange={setPatientId}
                  options={patients.map((patient) => ({
                    value: patient.id,
                    label: patient.name,
                  }))}
                />
              </div>
              <DentalChart
                key={patientId}
                patient={activePatient}
                states={chartStates[patientId] ?? {}}
                onChange={(states) =>
                  setChartStates({ ...chartStates, [patientId]: states })
                }
              />
            </>
          )}
          {view === "estimates" && (
            <Card>
              <div className="section-heading">
                <div>
                  <h2>Presupuestos de tratamiento</h2>
                  <p className="muted">
                    Importes ficticios en soles · Sin cobros reales
                  </p>
                </div>
                <CircleDollarSign size={27} />
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Tratamiento</th>
                      <th>Importe</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimates.map((estimate) => (
                      <tr key={estimate.id}>
                        <td>
                          <strong>
                            {
                              patients.find(
                                (patient) => patient.id === estimate.patientId,
                              )?.name
                            }
                          </strong>
                        </td>
                        <td>{estimate.treatment}</td>
                        <td>S/ {estimate.amount.toFixed(2)}</td>
                        <td>
                          <span
                            className={`badge badge-${estimate.status === "paid" ? "confirmed" : "pending"}`}
                          >
                            {estimate.status === "paid"
                              ? "Pago simulado"
                              : "Pendiente"}
                          </span>
                        </td>
                        <td>
                          {["cashier", "admin", "owner"].includes(user.role) &&
                          estimate.status === "pending" ? (
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setEstimates(
                                  estimates.map((item) =>
                                    item.id === estimate.id
                                      ? { ...item, status: "paid" }
                                      : item,
                                  ),
                                );
                                setNotice(
                                  "Pago simulado. No se ha procesado ningún cobro real.",
                                );
                              }}
                            >
                              Simular pago
                            </Button>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          {view === "identity" && (
            <IdentitySettings brand={brand} onBrandChange={onBrandChange} />
          )}
          <footer className="workspace-footer">
            <span>Hecho para cuidar mejor.</span>
            <span>{brand.name} · Odontología</span>
          </footer>
        </main>
      </div>
      <AppointmentForm
        key={`${appointmentOpen}-${format(date, "yyyy-MM-dd")}`}
        open={appointmentOpen}
        onOpenChange={setAppointmentOpen}
        date={date}
        onSave={saveAppointment}
      />
      <Dialog
        title="Nuevo presupuesto"
        description="Propón un tratamiento con un importe de demostración."
        open={estimateOpen}
        onOpenChange={setEstimateOpen}
      >
        <form
          className="stack-form"
          onSubmit={(event) => {
            event.preventDefault();
            const treatment = treatments.find(
              (item) => item.id === treatmentId,
            )!;
            setEstimates([
              ...estimates,
              {
                id: crypto.randomUUID(),
                patientId,
                treatment: `${treatment.name} · ${treatment.tooth === "General" ? "General" : `pieza ${treatment.tooth}`}`,
                amount: treatment.price,
                status: "pending",
              },
            ]);
            setEstimateOpen(false);
            setNotice("Presupuesto añadido solo a esta demostración.");
          }}
        >
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
            value={treatmentId}
            onChange={setTreatmentId}
            options={treatments.map((item) => ({
              value: item.id,
              label: `${item.name} · S/ ${item.price}`,
            }))}
          />
          <Button type="submit">Crear presupuesto de prueba</Button>
        </form>
      </Dialog>
    </div>
  );
}
function SparkleMark(): ReactElement {
  return <LayoutDashboard size={19} />;
}
