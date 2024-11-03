export interface DateLocale {
  weekdays: {
    shorthand: string[];
    longhand: string[];
    userFormat?: unknown;
  };
  months: {
    shorthand: string[];
    longhand: string[];
    userFormat?: unknown;
  };
}

const pad = (number: number, length = 2) => `000${number}`.slice(length * -1);

const doNothing = () => undefined;

export const monthToStr = (monthNumber: number, shorthand: boolean, locale: DateLocale) => {
  return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
};

export const revFormat = {
  D: doNothing,
  F(dateObj: Date, monthName: string, locale: DateLocale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: (dateObj: Date, hour: number | string) => {
    dateObj.setHours(parseFloat(String(hour)));
  },
  H: (dateObj: Date, hour: number | string) => {
    dateObj.setHours(parseFloat(String(hour)));
  },
  J: (dateObj: Date, day: number | string) => {
    dateObj.setDate(parseFloat(String(day)));
  },
  M(dateObj: Date, shortMonth: string, locale: DateLocale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: (dateObj: Date, seconds: number | string) => {
    dateObj.setSeconds(parseFloat(String(seconds)));
  },
  U: (_: unknown, unixSeconds: string | number) => new Date(parseFloat(String(unixSeconds)) * 1000),

  W(dateObj: Date, weekNum: number | string) {
    const weekNumber = parseInt(String(weekNum), 10);
    const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);

    date.setDate(date.getDate() - date.getDay());

    return date;
  },
  Y: (dateObj: Date, year: number | string) => {
    dateObj.setFullYear(parseFloat(String(year)));
  },
  Z: (_: unknown, ISODate: string) => new Date(ISODate),

  d: (dateObj: Date, day: number | string) => {
    dateObj.setDate(parseFloat(String(day)));
  },
  h: (dateObj: Date, hour: number | string) => {
    dateObj.setHours(parseFloat(String(hour)));
  },
  i: (dateObj: Date, minutes: number | string) => {
    dateObj.setMinutes(parseFloat(String(minutes)));
  },
  j: (dateObj: Date, day: number | string) => {
    dateObj.setDate(parseFloat(String(day)));
  },
  l: doNothing,
  m: (dateObj: Date, month: number | string) => {
    dateObj.setMonth(parseFloat(String(month)) - 1);
  },
  n: (dateObj: Date, month: number | string) => {
    dateObj.setMonth(parseFloat(String(month)) - 1);
  },
  s: (dateObj: Date, seconds: number | string) => {
    dateObj.setSeconds(parseFloat(String(seconds)));
  },
  u: (_: unknown, unixMillSeconds: number | string) =>
    new Date(parseFloat(String(unixMillSeconds))),
  w: doNothing,
  y: (dateObj: Date, year: number | string) => {
    dateObj.setFullYear(2000 + parseFloat(String(year)));
  },
};

export const formats = {
  // get the date in UTC
  Z: (date: Date) => date.toISOString(),

  // weekday name, short, e.g. Thu
  D(date: Date, locale: DateLocale) {
    return locale.weekdays.shorthand[formats.w(date)];
  },

  // full month name e.g. January
  F(date: Date, locale: DateLocale) {
    return monthToStr(formats.n(date) - 1, false, locale);
  },

  // padded hour 1-12
  G(date: Date) {
    return pad(formats.h(date));
  },

  // hours with leading zero e.g. 03
  H: (date: Date) => pad(date.getHours()),

  // shorthand month e.g. Jan, Sep, Oct, etc
  M(date: Date, locale: DateLocale) {
    return monthToStr(date.getMonth(), true, locale);
  },

  // seconds 00-59
  S: (date: Date) => pad(date.getSeconds()),

  // unix timestamp
  U: (date: Date) => date.getTime() / 1000,

  W(date: Date) {
    // return options.getWeek(date);
    const localDate = new Date(date.getTime());

    localDate.setHours(0, 0, 0, 0);

    // Thursday in current week decides the year.
    localDate.setDate(localDate.getDate() + 3 - ((localDate.getDay() + 6) % 7));

    // January 4 is always in week 1.
    const week1 = new Date(localDate.getFullYear(), 0, 4);

    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((localDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7,
      )
    );
  },

  // full year e.g. 2016, padded (0001-9999)
  Y: (date: Date) => pad(date.getFullYear(), 4),

  // day in month, padded (01-30)
  d: (date: Date) => pad(date.getDate()),

  // hour from 1-12 (am/pm)
  h: (date: Date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),

  // minutes, padded with leading zero e.g. 09
  i: (date: Date) => pad(date.getMinutes()),

  // day in month (1-30)
  j: (date: Date) => date.getDate(),

  // weekday name, full, e.g. Thursday
  l(date: Date, locale: DateLocale) {
    return locale.weekdays.longhand[date.getDay()];
  },

  // padded month number (01-12)
  m: (date: Date) => pad(date.getMonth() + 1),

  // the month number (1-12)
  n: (date: Date) => date.getMonth() + 1,

  // seconds 0-59
  s: (date: Date) => date.getSeconds(),

  // Unix Milliseconds
  u: (date: Date) => date.getTime(),

  // number of the day of the week
  w: (date: Date) => date.getDay(),

  // last two digits of year e.g. 16 for 2016
  y: (date: Date) => String(date.getFullYear()).substring(2),
};
