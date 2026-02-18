import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}

/**
 * Converts external image URLs from the original site to local paths.
 * e.g. "https://lycee-montaigne.edu.lb/storage/foo/bar.png" → "/images/foo/bar.png"
 *      "https://lycee-montaigne.edu.lb//storage/foo/bar.png" → "/images/foo/bar.png"
 * Already-local paths (starting with "/") are returned unchanged.
 * Null/undefined returns undefined.
 */
export function localImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "lycee-montaigne.edu.lb") {
      const path = parsed.pathname.replace(/^\/*storage\//, "/images/");
      return path;
    }
  } catch {
    // not a valid URL, return as-is
  }
  return url;
}
