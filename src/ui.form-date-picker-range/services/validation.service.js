import { getDaysInMonth } from "../../ui.form-calendar/services/date.service";

const DATE_WITH_DOT_FORMAT_REG_EXP = /^\d{2}([./-])\d{2}\1\d{4}$/;

export function wrongDateFormat(value) {
  return !!value.match(DATE_WITH_DOT_FORMAT_REG_EXP);
}

export function wrongMonthNumber(value) {
  const splitDate = value.split(".");
  const month = splitDate[1];

  return Number(month) >= 1 && Number(month) <= 12;
}

export function wrongDayNumber(value) {
  const [day, month, year] = value.split(".");

  const daysInMonth = getDaysInMonth(new Date(year, month - 1));

  return Number(day) >= 1 && Number(day) <= Number(daysInMonth);
}
