import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()       
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, ""); 
}