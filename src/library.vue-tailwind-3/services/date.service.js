import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";
import { English } from "../l10n/default";
import { tokenRegex, revFormat, formats } from "./formatting.service";

export const formatDate = (dateObj, format, customLocale) => {
  if (!dateObj) {
    return "";
  }

  const locale = customLocale || English;

  return format
    .split("")
    .map((char, i, arr) => {
      if (formats[char] && arr[i - 1] !== "\\") {
        return formats[char](dateObj, locale);
      }

      if (char !== "\\") {
        return char;
      }

      return "";
    })
    .join("");
};

export const parseDate = (date, format = "Y-m-d H:i:S", timeless, customLocale) => {
  if (date !== 0 && !date) {
    return undefined;
  }

  const locale = customLocale || English;

  const localeTokenRegex = { ...tokenRegex };

  localeTokenRegex.K = `(${locale.amPM[0]}|${
    locale.amPM[1]
  }|${locale.amPM[0].toLowerCase()}|${locale.amPM[1].toLowerCase()})`;

  let parsedDate;
  const dateOrig = date;

  if (date instanceof Date) {
    parsedDate = new Date(date.getTime());
  } else if (
    typeof date !== "string" &&
    date.toFixed !== undefined // timestamp
  ) {
    // create a copy
    parsedDate = new Date(date);
  } else if (typeof date === "string") {
    const datestr = String(date).trim();

    if (datestr === "today") {
      parsedDate = new Date();
      // eslint-disable-next-line no-param-reassign
      timeless = true;
    } else if (
      /Z$/.test(datestr) ||
      /GMT$/.test(datestr) // datestrings w/ timezone
    ) {
      parsedDate = new Date(date);
    } else {
      parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);

      let matched;
      const ops = [];

      for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i += 1) {
        const token2 = format[i];
        const isBackSlash = token2 === "\\";
        const escaped = format[i - 1] === "\\" || isBackSlash;

        if (localeTokenRegex[token2] && !escaped) {
          regexStr += localeTokenRegex[token2];
          const match = new RegExp(regexStr).exec(date);

          if (match) {
            matched = true;
            ops[token2 !== "Y" ? "push" : "unshift"]({
              fn: revFormat[token2],
              val: match[(matchIndex += 1)],
            });
          }
        } else if (!isBackSlash) {
          regexStr += "."; // don't really care
        }

        // eslint-disable-next-line no-loop-func
        ops.forEach((op) => {
          const { fn } = op;
          const { val } = op;

          parsedDate = fn(parsedDate, String(val), locale) || parsedDate;
        });
      }

      parsedDate = matched ? parsedDate : undefined;
    }
  }

  /* istanbul ignore next */
  // eslint-disable-next-line no-restricted-globals
  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    throw new Error(`Invalid date provided: ${dateOrig}`);
  }

  if (timeless === true) {
    parsedDate.setHours(0, 0, 0, 0);
  }

  return parsedDate;
};

/**
 * Compute the difference in dates, measured in ms
 */
export function compareDates(date1, date2, timeless = true) {
  if (timeless !== false) {
    return (
      new Date(date1.getTime()).setHours(0, 0, 0, 0) -
      new Date(date2.getTime()).setHours(0, 0, 0, 0)
    );
  }

  return date1.getTime() - date2.getTime();
}

export const extractLocaleFromProps = (localeName, locales, defaultLocale) => {
  const availableLocales = Object.keys(locales);
  const find = availableLocales.find((l) => l === localeName);
  const locale = find && locales[find] ? locales[find] : defaultLocale;

  return merge(cloneDeep(English), locale);
};

export const buildDateParser =
  (locale, customDateParser) =>
  (date, format = "Y-m-d H:i:S", timeless) => {
    if (customDateParser) {
      return customDateParser(date, format, timeless, locale);
    }

    return parseDate(date, format, timeless, locale);
  };

export const buildDateFormatter =
  (locale, customDateFormatter) =>
  (date, format = "Y-m-d H:i:S") => {
    if (customDateFormatter) {
      return customDateFormatter(date, format, locale);
    }

    return formatDate(date, format, locale);
  };

/**
 * it two dates are in the same month
 */
export function isSameMonth(date1, date2) {
  return (
    !!date1 &&
    !!date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

/**
 * it two dates are in the same day
 */
export function isSameDay(date1, date2) {
  return isSameMonth(date1, date2) && date1?.getDate() === date2?.getDate();
}

export function dayIsPartOfTheConditions(day, condition, dateParser, dateFormat) {
  if (!day) {
    return false;
  }

  if (typeof condition === "function") {
    return condition(day);
  }

  if (typeof condition === "string" || condition instanceof String) {
    const disabledDate = dateParser(condition, dateFormat);

    return isSameDay(disabledDate, day);
  }

  if (condition instanceof Date) {
    return isSameDay(condition, day);
  }

  if (Array.isArray(condition)) {
    return condition.some((c) => dayIsPartOfTheConditions(day, c, dateParser, dateFormat));
  }

  return false;
}

export function dateIsOutOfRange(date, min, max, dateParser = null, dateFormat = null) {
  let minDate;

  if (typeof min === "string" || min instanceof String) {
    if (!dateParser) {
      throw new Error("strings needs a date parser");
    }

    if (!dateFormat) {
      throw new Error("strings needs a date format");
    }

    minDate = dateParser(min, dateFormat);
  } else {
    minDate = min;
  }

  let maxDate;

  if (typeof max === "string" || max instanceof String) {
    if (!dateParser) {
      throw new Error("strings needs a date parser");
    }

    if (!dateFormat) {
      throw new Error("strings needs a date format");
    }

    maxDate = dateParser(max, dateFormat);
  } else {
    maxDate = max;
  }

  const time = date.getTime();

  if (minDate && maxDate) {
    return time < minDate.getTime() || time > maxDate.getTime();
  }

  if (minDate) {
    return time < minDate.getTime();
  }

  if (maxDate) {
    return time > maxDate.getTime();
  }

  return false;
}

export function addDays(date, amount = 1) {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
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

export function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
