import {
  getWeeksInMonth,
  getStartOfWeek,
  getEndOfWeek,
  addWeeks,
  getEndOfMonth,
  getStartOfMonth,
  getEndOfQuarter,
  getStartOfQuarter,
  addQuarters,
  getEndOfYear,
  getStartOfYear,
} from "../ui.form-calendar/utilDate.ts";
import { formats } from "../ui.form-calendar/utilFormatting.ts";

export interface DatePeriodRange {
  title: string | number;
  startRange: Date;
  endRange: Date;
}

export function getYearDateList(date: Date) {
  const NUMBER_ADDING_YEAR = 12;

  const year = date.getFullYear();
  const month = date.getMonth();

  const years: DatePeriodRange[] = [];

  for (let i = 0; i < NUMBER_ADDING_YEAR; i++) {
    const currentYear = year + i;

    years.push({
      title: currentYear,
      startRange: getStartOfYear(new Date(currentYear, month)),
      endRange: getEndOfYear(new Date(currentYear, month)),
    });
  }

  return years;
}

export function getQuartersDateList(date: Date, quarterLocales = "") {
  const QUARTER_NUMBER = 4;
  const monthIndex = 0;
  const day = 1;
  const year = date.getFullYear();

  const quarters: DatePeriodRange[] = [];

  const firstQuarter = new Date(year, monthIndex, day);

  for (let quarter = 0; quarter < QUARTER_NUMBER; quarter++) {
    const newQuarter = addQuarters(firstQuarter, quarter);
    const currentQuarter = quarter + 1;

    quarters.push({
      title: `${currentQuarter} ${quarterLocales}`,
      startRange: getStartOfQuarter(newQuarter),
      endRange: getEndOfQuarter(newQuarter),
    });
  }

  return quarters;
}

export function getMonthsDateList(date: Date, monthLocales: string[] = []) {
  const year = date.getFullYear();

  const months = monthLocales.map((item, index) => {
    return {
      title: item,
      startRange: getStartOfMonth(new Date(year, index)),
      endRange: getEndOfMonth(new Date(year, index)),
    };
  });

  return months;
}

export function getWeekDateList(date: Date, monthShortLocales: string[] = []) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = 1;
  const weeksInMonth = getWeeksInMonth(date);

  const weeks = [];

  for (let week = 0; week < weeksInMonth; week++) {
    const date = addWeeks(new Date(year, month, day), week);
    const startOfWeekDate = getStartOfWeek(date, { weekStartsOn: 1 });
    const endOfWeekDate = getEndOfWeek(date, { weekStartsOn: 1 });

    const firstDayOfWeek = startOfWeekDate.getDate();
    const lastDayOfWeek = endOfWeekDate.getDate();

    const isDayInPreviousMonth = week === 0 && firstDayOfWeek > 1;
    const isLastWeek = week + day === weeksInMonth;

    let monthFirstDayOfWeek = 0;
    const monthLastDayOfWeek = endOfWeekDate.getMonth();

    if (isDayInPreviousMonth || isLastWeek) {
      monthFirstDayOfWeek = startOfWeekDate.getMonth();
    }

    const title = `${firstDayOfWeek} ${
      monthShortLocales[monthFirstDayOfWeek] || ""
    } – ${lastDayOfWeek} ${monthShortLocales[monthLastDayOfWeek]}`;

    weeks.push({
      title,
      startRange: startOfWeekDate,
      endRange: endOfWeekDate,
    });
  }

  return weeks;
}

export function getTokenIndexes(inputString: string) {
  let firstIndex = -1;
  let lastIndex = -1;
  let isEscaped = false;

  const tokens = Object.keys(formats);

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

    if (char === "\\" && !isEscaped) {
      isEscaped = true;
      continue;
    }

    if (!isEscaped && tokens.includes(char)) {
      if (firstIndex === -1) {
        firstIndex = i;
      }

      lastIndex = i;
    }

    if (isEscaped) {
      isEscaped = false;
    }
  }

  return [firstIndex, lastIndex + 1];
}
