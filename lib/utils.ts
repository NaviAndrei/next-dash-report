import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creează o cale corectă pentru resurse statice, luând în considerare basePath
 * pentru deployments pe GitHub Pages sau alte platforme cu subdirectorii
 */
export function getStaticPath(path: string): string {
  // Verifică dacă suntem în mediul de producție
  const isProd = process.env.NODE_ENV === 'production';
  
  // Numele repository-ului GitHub
  const repoName = 'next-dash-report';
  
  // Adaugă prefixul corect în funcție de mediu
  return isProd ? `/${repoName}${path}` : path;
} 