import type {
  Appointment,
  Estimate,
  Patient,
  Treatment,
  ToothState,
} from "../types/dentistry.types";
export const demoDate = new Date(2026, 9, 27);
export const patients: Patient[] = [
  {
    id: "mariana",
    name: "Mariana Rojas",
    dni: "72000001",
    initials: "MR",
    phone: "900 000 001",
    lastVisit: "12 oct 2026",
  },
  {
    id: "sebastian",
    name: "Sebastián Luna",
    dni: "72000002",
    initials: "SL",
    phone: "900 000 002",
    lastVisit: "19 oct 2026",
  },
  {
    id: "valentina",
    name: "Valentina Castro",
    dni: "72000003",
    initials: "VC",
    phone: "900 000 003",
    lastVisit: "20 oct 2026",
  },
  {
    id: "diego",
    name: "Diego Mendoza",
    dni: "72000004",
    initials: "DM",
    phone: "900 000 004",
    lastVisit: "Primera visita",
  },
];
export const initialAppointments: Appointment[] = [
  {
    id: "visit-1",
    patientId: "mariana",
    date: "2026-10-27",
    time: "09:30",
    treatment: "Evaluación y limpieza",
    status: "confirmed",
  },
  {
    id: "visit-2",
    patientId: "sebastian",
    date: "2026-10-27",
    time: "10:30",
    treatment: "Control de ortodoncia",
    status: "pending",
  },
  {
    id: "visit-3",
    patientId: "valentina",
    date: "2026-10-27",
    time: "11:00",
    treatment: "Restauración · pieza 16",
    status: "confirmed",
  },
  {
    id: "visit-4",
    patientId: "diego",
    date: "2026-10-27",
    time: "12:00",
    treatment: "Primera evaluación",
    status: "confirmed",
  },
];
export const treatments: Treatment[] = [
  {
    id: "evaluation",
    name: "Evaluación y limpieza",
    tooth: "General",
    price: 120,
  },
  { id: "restoration", name: "Restauración", tooth: "16", price: 180 },
  {
    id: "orthodontics",
    name: "Control de ortodoncia",
    tooth: "General",
    price: 150,
  },
];
export const initialEstimates: Estimate[] = [
  {
    id: "estimate-1",
    patientId: "mariana",
    treatment: "Evaluación y limpieza",
    amount: 120,
    status: "pending",
  },
  {
    id: "estimate-2",
    patientId: "valentina",
    treatment: "Restauración · pieza 16",
    amount: 180,
    status: "pending",
  },
];
export const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
];
export const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

export const initialChartStates: Record<string, Record<number, ToothState>> = {
  mariana: { 16: "planned", 26: "completed" },
};
