import {
  addQuarters,
  addWeeks,
  endOfQuarter,
  endOfWeek,
  endOfMonth,
  endOfYear,
  getDate,
  getMonth,
  getUnixTime,
  getWeeksInMonth,
  startOfQuarter,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";
import DateServiceDefault from "vueless/service.date";

const MAX_ONE_DIGIT_VALUE = 9;
const MIN_ONE_DIGIT_VALUE = 1;

export function createYears(dateRange) {
  const NUMBER_ADDING_YEAR = 12;

  const { year, month } = dateRange;

  let years = [];

  for (let i = 0; i < NUMBER_ADDING_YEAR; i++) {
    const currentYear = year + i;
    const DateService = new DateServiceDefault();
    const diffInSeconds = DateService.getDifferenceBetweenTimeZone({
      from: startOfYear(new Date(currentYear, month)),
      to: endOfYear(new Date(currentYear, month)),
    });

    years.push({
      index: i,
      title: currentYear,
      startRange: getUnixTime(startOfYear(new Date(currentYear, month))) + diffInSeconds.from,
      endRange: getUnixTime(endOfYear(new Date(currentYear, month))) + diffInSeconds.to,
    });
  }

  return [...years];
}

export function createQuarters(dateRange, settings) {
  const QUARTER_NUMBER = 4;
  const { year } = dateRange;

  let quarters = [];

  const firstQuarter = new Date(year, 0, 1);

  for (let quarter = 0; quarter < QUARTER_NUMBER; quarter++) {
    const newQuarter = addQuarters(firstQuarter, quarter);

    const DateService = new DateServiceDefault();
    const diffInSeconds = DateService.getDifferenceBetweenTimeZone({
      from: startOfQuarter(newQuarter),
      to: endOfQuarter(newQuarter),
    });

    quarters.push({
      index: quarter,
      title: `${quarter + 1} ${settings.i18n.quarter}`,
      startRange: getUnixTime(startOfQuarter(newQuarter)) + diffInSeconds.from,
      endRange: getUnixTime(endOfQuarter(newQuarter)) + diffInSeconds.to,
    });
  }

  return [...quarters];
}

export function createMonthsList(dateRange, monthLocales) {
  const { year } = dateRange;

  const months = monthLocales.map((item, index) => {
    const DateService = new DateServiceDefault();
    const diffInSeconds = DateService.getDifferenceBetweenTimeZone({
      from: startOfMonth(new Date(year, index)),
      to: endOfMonth(new Date(year, index)),
    });

    return {
      index: index,
      title: item,
      startRange: getUnixTime(startOfMonth(new Date(year, index))) + diffInSeconds.from,
      endRange: getUnixTime(endOfMonth(new Date(year, index))) + diffInSeconds.to,
    };
  });

  return [...months];
}

export function createWeeksList(dateRange, monthShortLocales) {
  const { date, month, year } = dateRange;

  const weeksInMonth = getWeeksInMonth(date, { weekStartsOn: 1 });

  let weeks = [];

  for (let week = 0; week < weeksInMonth; week++) {
    const date = addWeeks(new Date(year, month, 1), week);
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(date, { weekStartsOn: 1 });

    const firstDayOfWeek = getDate(startOfWeekDate);
    const lastDayOfWeek = getDate(endOfWeekDate);

    const isDayInPreviousMonth = week === 0 && firstDayOfWeek > 1;
    const isLastWeek = week + 1 === weeksInMonth;

    let monthFirstDayOfWeek = "";
    let monthLastDayOfWeek = getMonth(endOfWeekDate);

    if (isDayInPreviousMonth || isLastWeek) {
      monthFirstDayOfWeek = getMonth(startOfWeekDate);
    }

    const title = `${firstDayOfWeek} ${
      monthShortLocales[monthFirstDayOfWeek] || ""
    } – ${lastDayOfWeek} ${monthShortLocales[monthLastDayOfWeek]}`;

    const DateService = new DateServiceDefault();
    const diffInSeconds = DateService.getDifferenceBetweenTimeZone({
      from: startOfQuarter(startOfWeekDate),
      to: endOfQuarter(endOfWeekDate),
    });

    weeks.push({
      index: week,
      title,
      startRange: getUnixTime(startOfWeekDate) + diffInSeconds.from,
      endRange: getUnixTime(endOfWeekDate) + diffInSeconds.to,
    });
  }

  return [...weeks];
}

export function prepareOwnRangeDate(range) {
  range.month = range.month + 1;

  if (range.day <= MAX_ONE_DIGIT_VALUE) {
    range.day = `0${range.day}`;
  }

  if (range.month <= MAX_ONE_DIGIT_VALUE) {
    range.month = `0${range.month}`;
  }

  return `${range.day}.${range.month}.${range.year}`;
}

export function prepareRangeFormat(range) {
  let [day, month, year] = range.split(".");

  if (checkCondition(day)) day = `0${day}`;
  if (checkCondition(month)) month = `0${month}`;

  return `${day}.${month}.${year}`;
}

function checkCondition(value) {
  return (
    value.length === MIN_ONE_DIGIT_VALUE &&
    parseInt(value) >= MIN_ONE_DIGIT_VALUE &&
    parseInt(value) <= MAX_ONE_DIGIT_VALUE
  );
}

export default {
  createYears,
  createQuarters,
  createMonthsList,
};
