import type { Brand, UserRole } from "../types/app.types";
export const defaultBrand: Brand = {
  name: "Nova",
  tagline: "Tu espacio de cuidado",
  logoUrl: "",
  theme: "forest",
};
export const roleLabels: Record<UserRole, string> = {
  superadmin: "Superadministrador",
  owner: "Propietario",
  admin: "Administrador",
  receptionist: "Recepción",
  cashier: "Cajero",
  dentist: "Odontólogo",
};
