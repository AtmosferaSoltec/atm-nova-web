import type { DemoUser } from "../../../types/app.types";
export const demoPassword = "Nova2026!";
export const demoUsers: DemoUser[] = [
  {
    id: "platform",
    name: "Equipo Atmosfera",
    dni: "10000001",
    role: "superadmin",
  },
  { id: "owner", name: "Valeria Torres", dni: "10000002", role: "owner" },
  { id: "admin", name: "Daniel Ríos", dni: "10000003", role: "admin" },
  {
    id: "reception",
    name: "Lucía Flores",
    dni: "10000004",
    role: "receptionist",
  },
  { id: "cashier", name: "Mateo Silva", dni: "10000005", role: "cashier" },
  { id: "dentist", name: "Camila Vega", dni: "10000006", role: "dentist" },
];
