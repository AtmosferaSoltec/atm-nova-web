import type { Brand, DemoUser } from "../../../types/app.types";
export interface LoginProps {
  brand: Brand;
  onLogin: (user: DemoUser) => void;
}
