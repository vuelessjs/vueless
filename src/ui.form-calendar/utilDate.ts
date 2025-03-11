import { LocaleType, DAYS_IN_WEEK, SECONDS_IN_MINUTES } from "./constants.ts";

export type dateSettings = { weekStartsOn?: number };

const daysMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const monthsMap = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export function minutesToSeconds(minutes: number) {
  return Math.trunc(minutes * SECONDS_IN_MINUTES);
}

export function getDaysInMonth(date: Date) {
  return new Date(new Date(date.valueOf()).setDate(0)).getDate();
}

export function getWeeksInMonth(date: Date, settings: dateSettings = {}) {
  const { weekStartsOn = 0 } = settings;

  const monthIndex = date.getMonth() - 1;
  const firstOfMonth = new Date(date.getFullYear(), monthIndex, 1);
  const daysInMonth = getDaysInMonth(date);
  const firstWeekDay = (firstOfMonth.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;

  return Math.ceil((firstWeekDay + daysInMonth) / DAYS_IN_WEEK);
}

export function getEndOfYear(date: Date) {
  const localDate = new Date(date.valueOf());
  const year = localDate.getFullYear() + 1;

  localDate.setFullYear(year, 0, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfYear(date: Date) {
  const localDate = new Date(date.valueOf());

  localDate.setFullYear(localDate.getFullYear(), 0, 1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfQuarter(date: Date) {
  const localDate = new Date(date.valueOf());

  const currentMonth = localDate.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;

  localDate.setMonth(month, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfQuarter(date: Date) {
  const localDate = new Date(date.valueOf());

  const currentMonth = localDate.getMonth();
  const month = currentMonth - (currentMonth % 3);

  localDate.setMonth(month, 1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getStartOfMonth(date: Date) {
  const localDate = new Date(date.valueOf());

  localDate.setDate(1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfMonth(date: Date) {
  const localDate = new Date(date.valueOf());
  const month = localDate.getMonth() + 1;

  localDate.setFullYear(localDate.getFullYear(), month, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getEndOfWeek(date: Date, settings: dateSettings = {}) {
  const { weekStartsOn = 0 } = settings;
  const localDate = new Date(date.valueOf());

  const day = localDate.getDay();
  const oneDay = 1;

  const diff =
    (day < weekStartsOn ? DAYS_IN_WEEK * -1 : 0) + DAYS_IN_WEEK - oneDay - (day - weekStartsOn);

  localDate.setDate(localDate.getDate() + diff);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfWeek(date: Date, settings: dateSettings = {}) {
  const { weekStartsOn = 0 } = settings;
  const localDate = new Date(date.valueOf());

  const day = localDate.getDay();

  const diff = (day < weekStartsOn ? DAYS_IN_WEEK : 0) + day - weekStartsOn;

  localDate.setDate(localDate.getDate() - diff);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfDay(date: Date) {
  const localDate = new Date(date.valueOf());

  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfDay(date: Date) {
  const localDate = new Date(date.valueOf());

  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getSortedLocale<TLocale>(locale: TLocale, type: "month" | "day"): string[] {
  const targetMap = type === LocaleType.Month ? monthsMap : daysMap;

  if (typeof locale === "object" && !Array.isArray(locale)) {
    const sortedDays = Object.entries(locale as object)
      .map((entry) => [targetMap.indexOf(entry[0]), entry.at(1)])
      .sort((entryA, entryB) => entryA[0] - entryB[0]);

    return sortedDays.map((entry) => entry[1]);
  } else {
    // eslint-disable-next-line no-console
    console.error(
      new TypeError(`Expected object, but got ${Array.isArray(locale) ? "array" : typeof locale}`),
    );

    return [];
  }
}

export function getDateFromUnixTimestamp(timestamp: number) {
  return new Date(timestamp);
}

export function getUnixTimestampFromDate(date: Date) {
  return date.getTime();
}

export function getDatesDifference(dateOne: Date, dateTwo: Date, timeless = true) {
  if (timeless !== false) {
    return (
      new Date(dateOne.getTime()).setHours(0, 0, 0, 0) -
      new Date(dateTwo.getTime()).setHours(0, 0, 0, 0)
    );
  }

  return dateOne.getTime() - dateTwo.getTime();
}

export function getDateWithoutTime(date = new Date()) {
  date.setHours(0, 0, 0, 0);

  return date;
}

export function isSameMonth(dateOne: Date, dateTwo: Date) {
  return (
    Boolean(dateOne) &&
    Boolean(dateTwo) &&
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth()
  );
}

export function isSameDay(dateOne: Date, dateTwo: Date) {
  return isSameMonth(dateOne, dateTwo) && dateOne?.getDate() === dateTwo?.getDate();
}

export function isAnotherMothDay(day: Date, activeMonth: Date) {
  return (
    activeMonth.getFullYear() !== day.getFullYear() || activeMonth.getMonth() !== day.getMonth()
  );
}

export function addDays(date: Date, amount = 1) {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}

export function addWeeks(date: Date, amount = 1) {
  const days = amount * DAYS_IN_WEEK;

  return addDays(date, days);
}

export function addQuarters(date: Date, amount = 1) {
  const months = amount * 3;

  return addMonths(date, months);
}

export function addMonths(date: Date, amount = 1) {
  let newDate = new Date(date.valueOf());

  newDate.setMonth(date.getMonth() + amount);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== date.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

export function addYears(date: Date, amount = 1) {
  let newDate = new Date(date.valueOf());

  newDate.setFullYear(date.getFullYear() + amount);

  // Means the current day has less days so the extra month is
  // in the following month
  if (newDate.getDate() !== date.getDate()) {
    // Assign the last day of previous month
    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
  }

  return newDate;
}

export function isToday(date: Date) {
  return isSameDay(date, new Date());
}

export function isCurrentMonth(date: Date) {
  return isSameMonth(date, new Date());
}

export function isCurrentYear(date: Date) {
  return date.getFullYear() === new Date().getFullYear();
}

export function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
