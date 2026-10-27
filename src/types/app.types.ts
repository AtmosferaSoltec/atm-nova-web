export type UserRole =
  "superadmin" | "owner" | "admin" | "receptionist" | "cashier" | "dentist";
export interface DemoUser {
  id: string;
  name: string;
  dni: string;
  role: UserRole;
}
export interface Brand {
  name: string;
  tagline: string;
  logoUrl: string;
  theme: "forest" | "ocean";
}
export interface SessionProps {
  user: DemoUser;
  onLogout: () => void;
}
export interface BrandProps {
  brand: Brand;
}

export interface IdentityProps {
  brand: Brand;
  onBrandChange: (brand: Brand) => void;
}
