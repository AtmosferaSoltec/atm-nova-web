import type { Brand, DemoUser } from "../../../types/app.types";
export type DentistryView =
  "agenda" | "patients" | "chart" | "estimates" | "identity";
export interface WorkspaceProps {
  user: DemoUser;
  brand: Brand;
  onBrandChange: (brand: Brand) => void;
  onLogout: () => void;
}
export interface Patient {
  id: string;
  name: string;
  dni: string;
  initials: string;
  phone: string;
  lastVisit: string;
}
export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  treatment: string;
  status: "confirmed" | "pending" | "completed";
}
export interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  onSave: (appointment: Appointment) => string | null;
}
export type ToothState = "healthy" | "planned" | "completed";
export interface Treatment {
  id: string;
  name: string;
  tooth: string;
  price: number;
}
export interface Estimate {
  id: string;
  patientId: string;
  treatment: string;
  amount: number;
  status: "pending" | "paid";
}
export interface ChartProps {
  patient: Patient;
  states: Record<number, ToothState>;
  onChange: (states: Record<number, ToothState>) => void;
}
