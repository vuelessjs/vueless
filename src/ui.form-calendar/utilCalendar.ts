import { revFormat, formats } from "./utilFormatting.ts";
import { getDateFromUnixTimestamp } from "./utilDate.ts";

import { TOKEN_REG_EXP, YEARS_PER_VIEW } from "./constants.ts";

import type { DateLocale } from "./utilFormatting.ts";

type UnknownFunction = (...args: unknown[]) => unknown;

type Operation = {
  fn: UnknownFunction;
  val: string;
};

export function getInitialActiveDate<TLocale>(localValue: TLocale) {
  if (Array.isArray(localValue) && localValue.length) {
    return localValue[localValue.length - 1];
  }

  if (localValue instanceof Date) {
    return localValue;
  }

  return new Date();
}

export function formatDate<TLocale>(date: Date | null, format = "Y-m-d H:i:S", locale: TLocale) {
  if (date === null) {
    return "";
  }

  return format
    .split("")
    .map((char, i, arr) => {
      if (char in formats && arr[i - 1] !== "\\") {
        return formats[char as keyof typeof formats](date, locale as DateLocale);
      }

      if (char !== "\\") {
        return char;
      }

      return "";
    })
    .join("");
}

export function isNumeric(char: string | number) {
  return /^\d+$/.test(String(char));
}

export function parseDate<TLocale extends DateLocale>(
  date: Date | string | null,
  format: string = "Y-m-d H:i:S",
  locale: TLocale,
) {
  if (date === null) {
    return null;
  }

  let timeless = false;
  let parsedDate = null;
  const originalDate = date;

  const isDateObject = date instanceof Date;
  const isTimestamp = typeof date === "number";
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
      parsedDate = parseStringDate(date, format, locale);
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

export function parseStringDate<TLocale extends DateLocale>(
  dateString: string,
  format = "Y-m-d H:i:S",
  locale: TLocale,
) {
  const isWithinTimezone = /Z$/.test(dateString) || /GMT$/.test(dateString);

  if (isWithinTimezone) {
    return new Date(dateString);
  } else {
    let parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);

    const isRelativeDay = [locale.tomorrow, locale.today, locale.tomorrow].some((word) => {
      return word && dateString.toLowerCase().includes(word.toLowerCase());
    });

    if (!isRelativeDay) {
      format = format.replaceAll("r", "").trim();
    }

    let matched;
    const operations: Operation[] = [];

    for (let i = 0, matchIndex = 0, regexStr = ""; i < format.length; i += 1) {
      const token2 = format[i] as keyof typeof TOKEN_REG_EXP | "\\";
      const isBackSlash = token2 === "\\";
      const escaped = format[i - 1] === "\\" || isBackSlash;

      if (TOKEN_REG_EXP[token2 as keyof typeof TOKEN_REG_EXP] && !escaped) {
        regexStr += TOKEN_REG_EXP[token2];
        const match = new RegExp(regexStr).exec(dateString);

        if (match) {
          matched = true;
          operations[token2 !== "Y" ? "push" : "unshift"]({
            fn: revFormat[token2 as keyof typeof revFormat] as UnknownFunction,
            val: match[(matchIndex += 1)],
          });
        }
      } else if (!isBackSlash) {
        regexStr += ".";
      }
    }

    operations.forEach((operation) => {
      const { fn, val } = operation;

      parsedDate = (fn(parsedDate, String(val), locale as DateLocale) || parsedDate) as Date;
    });

    return matched ? parsedDate : undefined;
  }
}

export function dateIsOutOfRange<TLocale extends DateLocale>(
  date: Date,
  min: Date | string | undefined,
  max: Date | string | undefined,
  locale: TLocale,
  dateFormat: string | null = null,
) {
  if ((!dateFormat && typeof min === "string") || (!dateFormat && typeof max === "string")) {
    throw new Error("strings needs a date format");
  }

  const minDate =
    typeof min === "string" ? parseDate<TLocale>(min, String(dateFormat), locale) : min;

  const maxDate =
    typeof max === "string" ? parseDate<TLocale>(max, String(dateFormat), locale) : max;

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

export function getYearsRange(date: Date) {
  const currentYear = date.getFullYear();
  const from = currentYear - Math.floor(currentYear % YEARS_PER_VIEW);
  const to = from + YEARS_PER_VIEW - 1;

  return [from, to];
}
