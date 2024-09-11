import { revFormat, formats } from "./utilFormatting.js";
import { isSameDay, getDateFromUnixTimestamp } from "./utilDate.js";

import { TOKEN_REG_EXP, YEARS_PER_VIEW } from "./constants.js";

export function getInitialActiveDate(localValue) {
  if (Array.isArray(localValue) && localValue.length) {
    return localValue[localValue.length - 1];
  }

  if (localValue instanceof Date) {
    return localValue;
  }

  return new Date();
}

export function formatDate(dateObj, format = "Y-m-d H:i:S", locale) {
  if (dateObj === null) {
    return "";
  }

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
}

export function isNumeric(char) {
  return /^\d+$/.test(String(char));
}

export function parseDate(date, format = "Y-m-d H:i:S", locale) {
  if (date === null) {
    return null;
  }

  const localeTokenRegex = { ...TOKEN_REG_EXP };

  let timeless = false;
  let parsedDate = null;
  const originalDate = date;

  const isDateObject = date instanceof Date;
  const isTimestamp = typeof date !== "string" && date.toFixed !== undefined;
  const isString = typeof date === "string";

  if (isDateObject) {
    parsedDate = new Date(date.getTime());
  }

  if (isTimestamp) {
    parsedDate = getDateFromUnixTimestamp(date);
  }

  if (isString) {
    const dateString = String(date).trim();

    if (dateString === "today") {
      parsedDate = new Date();
      timeless = true;
    } else {
      parsedDate = parseStringDate(date, format, localeTokenRegex, locale);
    }
  }

  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    throw new Error(`Invalid date provided: ${originalDate}`);
  }

  if (timeless === true) {
    parsedDate.setHours(0, 0, 0, 0);
  }

  return parsedDate;
}

export function parseStringDate(dateString, format = "Y-m-d H:i:S", localeTokenRegex, locale) {
  const isWithinTimezone = /Z$/.test(dateString) || /GMT$/.test(dateString);

  if (isWithinTimezone) {
    return new Date(dateString);
  } else {
    let parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);

    let matched;
    const ops = [];

    for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i += 1) {
      const token2 = format[i];
      const isBackSlash = token2 === "\\";
      const escaped = format[i - 1] === "\\" || isBackSlash;

      if (localeTokenRegex[token2] && !escaped) {
        regexStr += localeTokenRegex[token2];
        const match = new RegExp(regexStr).exec(dateString);

        if (match) {
          matched = true;
          ops[token2 !== "Y" ? "push" : "unshift"]({
            fn: revFormat[token2],
            val: match[(matchIndex += 1)],
          });
        }
      } else if (!isBackSlash) {
        regexStr += ".";
      }

      ops.forEach((op) => {
        const { fn } = op;
        const { val } = op;

        parsedDate = fn(parsedDate, String(val), locale) || parsedDate;
      });
    }

    return matched ? parsedDate : undefined;
  }
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

export function dateIsOutOfRange(date, min, max, locale, dateFormat = null) {
  if ((!dateFormat && typeof min === "string") || (!dateFormat && typeof max === "string")) {
    throw new Error("strings needs a date format");
  }

  const minDate = typeof min === "string" ? parseDate(min, dateFormat, locale) : min;

  const maxDate = typeof max === "string" ? parseDate(max, dateFormat, locale) : max;

  if (minDate && maxDate) {
    return date < minDate || date > maxDate;
  }

  if (minDate) {
    return date < minDate;
  }

  if (maxDate) {
    return date > maxDate;
  }

  return false;
}

export function getYearsRange(date) {
  const currentYear = date.getFullYear();
  const from = currentYear - Math.floor(currentYear % YEARS_PER_VIEW);
  const to = from + YEARS_PER_VIEW - 1;

  return [from, to];
}
