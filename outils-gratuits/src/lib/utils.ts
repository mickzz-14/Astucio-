import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits }).format(value);
}

export function formatCurrency(value: number, currency = "EUR"): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value);
}
