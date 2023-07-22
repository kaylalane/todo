import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TZDate } from "@toast-ui/calendar";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clone(date: TZDate): TZDate {
  return new TZDate(date);
}

export function addDate(d: TZDate, step: number) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}
