import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/**
 * Function to calculate age from date of birth
 * @param day Must be in format "D"
 * @param month Must be in format "M"
 * @param year Must be in format "YYYY"
 * @returns Tupple of [isValid, age]
 */
export const calculateAge = (day: number, month: number, year: number) => {
  const dob = dayjs(`${year}-${month}-${day}`, "YYYY-M-D", true);
  if (!dob.isValid()) {
    return [false, "Invalid date of birth"] as const;
  }

  const now = dayjs();

  let years = now.get("year") - dob.get("year");
  let months = now.get("month") - dob.get("month");
  let days = now.get("day") - dob.get("day");
  if (days < 0) {
    months--;
    days += 30;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return [true, { years, months, days }] as const;
};

export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};
