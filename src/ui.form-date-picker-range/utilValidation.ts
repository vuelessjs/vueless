import { getDaysInMonth } from "../ui.form-calendar/utilDate.ts";

const datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;

export function isWrongDateFormat(value: string) {
  return !datePattern.test(value);
}

export function isWrongMonthNumber(value: string) {
  const splitDate = value.split(".");
  const month = splitDate[1];

  return !(Number(month) >= 1 && Number(month) <= 12);
}

export function isWrongDayNumber(value: string) {
  const [day, month, year] = value.split(".");

  const daysInMonth = getDaysInMonth(new Date(Number(year), Number(month) - 1));

  return !(Number(day) >= 1 && Number(day) <= Number(daysInMonth));
}
