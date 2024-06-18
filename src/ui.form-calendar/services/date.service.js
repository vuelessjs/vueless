import { LOCALE_TYPE, DAYS_IN_WEEK, SECONDS_IN_MINUTES } from "../constants";

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

export function minutesToSeconds(minutes) {
  return Math.trunc(minutes * SECONDS_IN_MINUTES);
}

export function getDaysInMonth(date) {
  return new Date(new Date(date.valueOf()).setDate(0)).getDate();
}

export function getWeeksInMonth(date, settings = {}) {
  const { weekStartsOn = 0 } = settings;

  const monthIndex = date.getMonth() - 1;
  const firstOfMonth = new Date(date.getFullYear(), monthIndex, 1);
  const daysInMonth = getDaysInMonth(date);
  const firstWeekDay = (firstOfMonth.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;

  return Math.ceil((firstWeekDay + daysInMonth) / DAYS_IN_WEEK);
}

export function getEndOfYear(date) {
  const localDate = new Date(date.valueOf());
  const year = localDate.getFullYear() + 1;

  localDate.setFullYear(year, 0, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfYear(date) {
  const localDate = new Date(date.valueOf());

  localDate.setFullYear(localDate.getFullYear(), 0, 1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfQuarter(date) {
  const localDate = new Date(date.valueOf());

  const currentMonth = localDate.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;

  localDate.setMonth(month, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfQuarter(date) {
  const localDate = new Date(date.valueOf());

  const currentMonth = localDate.getMonth();
  const month = currentMonth - (currentMonth % 3);

  localDate.setMonth(month, 1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getStartOfMonth(date) {
  const localDate = new Date(date.valueOf());

  localDate.setDate(1);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfMonth(date) {
  const localDate = new Date(date.valueOf());
  const month = localDate.getMonth() + 1;

  localDate.setFullYear(localDate.getFullYear(), month, 0);
  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getEndOfWeek(date, settings = {}) {
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

export function getStartOfWeek(date, settings = {}) {
  const { weekStartsOn = 0 } = settings;
  const localDate = new Date(date.valueOf());

  const day = localDate.getDay();

  const diff = (day < weekStartsOn ? DAYS_IN_WEEK : 0) + day - weekStartsOn;

  localDate.setDate(localDate.getDate() - diff);
  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getEndOfDay(date) {
  const localDate = new Date(date.valueOf());

  localDate.setHours(23, 59, 59, 999);

  return localDate;
}

export function getStartOfDay(date) {
  const localDate = new Date(date.valueOf());

  localDate.setHours(0, 0, 0, 0);

  return localDate;
}

export function getSortedLocale(locale, type) {
  const targetMap = type === LOCALE_TYPE.month ? monthsMap : daysMap;

  const sortedDays = Object.entries(locale)
    .map((entry) => {
      entry[0] = targetMap.indexOf(entry[0]);

      return entry;
    })
    .sort((entryA, entryB) => entryA[0] - entryB[0]);

  return sortedDays.map((entry) => entry[1]);
}

export function getDateFromUnixTimestamp(timestamp) {
  return new Date(timestamp);
}

export function getUnixTimestampFromDate(date) {
  return date.getTime();
}

export function getDatesDifference(dateOne, dateTwo, timeless = true) {
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

export function isSameMonth(dateOne, dateTwo) {
  return (
    Boolean(dateOne) &&
    Boolean(dateTwo) &&
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth()
  );
}

export function isSameDay(dateOne, dateTwo) {
  return isSameMonth(dateOne, dateTwo) && dateOne?.getDate() === dateTwo?.getDate();
}

export function isAnotherMothDay(day, activeMonth) {
  return (
    activeMonth.getFullYear() !== day.getFullYear() || activeMonth.getMonth() !== day.getMonth()
  );
}

export function addDays(date, amount = 1) {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}

export function addWeeks(date, amount = 1) {
  const days = amount * DAYS_IN_WEEK;

  return addDays(date, days);
}

export function addQuarters(date, amount = 1) {
  const months = amount * 3;

  return addMonths(date, months);
}

export function addMonths(date, amount = 1) {
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

export function addYears(date, amount = 1) {
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

export function isToday(date) {
  return isSameDay(date, new Date());
}

export function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
