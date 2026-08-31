import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDateIndo = (dateString) => {
  if (!dateString) return "-";

  const opsi = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(dateString).toLocaleDateString("id-ID", opsi);
};
