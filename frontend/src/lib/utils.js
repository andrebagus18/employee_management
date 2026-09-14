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

export const getStatusVariant = (status) => {
  if (status === "APPROVED") return "default";
  if (status === "REJECTED") return "destructive";
  return "outline";
};

export const CalculateTime = (start_time, end_time) => {
  if (!start_time || !end_time) return "";
  const [startHour, startMinute] = start_time.split(":").map(Number);
  const [endHour, endMinute] = end_time.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  const totalMinutes = end - start;
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMinutesRemaining = totalMinutes % 60;
  return `${totalHours} jam ${totalMinutesRemaining} menit`;
};
