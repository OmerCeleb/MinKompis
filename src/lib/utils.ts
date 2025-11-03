import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, locale: string = 'sv-SE') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SEK',
  }).format(amount);
}

export function formatDate(date: Date, locale: string = 'sv-SE') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
