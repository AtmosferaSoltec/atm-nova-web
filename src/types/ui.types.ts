import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}
export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}
export interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}
export interface DialogProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}
