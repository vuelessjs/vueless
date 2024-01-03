const pad = (number, length = 2) => `000${number}`.slice(length * -1);
const int = (bool) => (bool === true ? 1 : 0);

const doNothing = () => undefined;

export const monthToStr = (monthNumber, shorthand, locale) =>
  locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];

export const revFormat = {
  D: doNothing,
  F(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  H: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  J: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  K: (dateObj, amPM, locale) => {
    dateObj.setHours(
      (dateObj.getHours() % 12) + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)),
    );
  },
  M(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1000),

  W(dateObj, weekNum, locale) {
    const weekNumber = parseInt(weekNum, 10);
    const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);

    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);

    return date;
  },
  Y: (dateObj, year) => {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: (_, ISODate) => new Date(ISODate),

  d: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  h: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  i: (dateObj, minutes) => {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
  w: doNothing,
  y: (dateObj, year) => {
    dateObj.setFullYear(2000 + parseFloat(year));
  },
};

export const tokenRegex = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "", // locale-dependent, setup on runtime
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})",
};

export const formats = {
  // get the date in UTC
  Z: (date) => date.toISOString(),

  // weekday name, short, e.g. Thu
  D(date, locale) {
    return locale.weekdays.shorthand[formats.w(date, locale)];
  },

  // full month name e.g. January
  F(date, locale) {
    return monthToStr(formats.n(date, locale) - 1, false, locale);
  },

  // padded hour 1-12
  G(date, locale) {
    return pad(formats.h(date, locale));
  },

  // hours with leading zero e.g. 03
  H: (date) => pad(date.getHours()),

  // day (1-30) with ordinal suffix e.g. 1st, 2nd
  J(date, locale) {
    return locale.ordinal !== undefined
      ? date.getDate() + locale.ordinal(date.getDate())
      : undefined;
  },

  // AM/PM
  K: (date, locale) => locale.amPM[int(date.getHours() > 11)],

  // shorthand month e.g. Jan, Sep, Oct, etc
  M(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },

  // seconds 00-59
  S: (date) => pad(date.getSeconds()),

  // unix timestamp
  U: (date) => date.getTime() / 1000,

  W(givenDate) {
    // return options.getWeek(date);
    const date = new Date(givenDate.getTime());

    date.setHours(0, 0, 0, 0);

    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);

    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7,
      )
    );
  },

  // full year e.g. 2016, padded (0001-9999)
  Y: (date) => pad(date.getFullYear(), 4),

  // day in month, padded (01-30)
  d: (date) => pad(date.getDate()),

  // hour from 1-12 (am/pm)
  h: (date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),

  // minutes, padded with leading zero e.g. 09
  i: (date) => pad(date.getMinutes()),

  // day in month (1-30)
  j: (date) => date.getDate(),

  // weekday name, full, e.g. Thursday
  l(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },

  // padded month number (01-12)
  m: (date) => pad(date.getMonth() + 1),

  // the month number (1-12)
  n: (date) => date.getMonth() + 1,

  // seconds 0-59
  s: (date) => date.getSeconds(),

  // Unix Milliseconds
  u: (date) => date.getTime(),

  // number of the day of the week
  w: (date) => date.getDay(),

  // last two digits of year e.g. 16 for 2016
  y: (date) => String(date.getFullYear()).substring(2),
};
