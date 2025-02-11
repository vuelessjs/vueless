import type { FormatOptions } from "./types.ts";

const isNumberValueRegExp = /^[\d,.\s-]+$/;
const rawDecimalMark = ".";
const minus = "-";

export function getRawValue(value: string | number, options: FormatOptions): string {
  const { thousandsSeparator, decimalSeparator, prefix } = options;

  value = String(value).endsWith(decimalSeparator)
    ? String(value).replace(decimalSeparator, "")
    : String(value);

  const rawValueWithPrefix = value
    .replaceAll(thousandsSeparator, "")
    .replaceAll(" ", "")
    .replace(decimalSeparator, rawDecimalMark);

  return rawValueWithPrefix.replace(prefix, "");
}

export function getFormattedValue(value: string | number, options: FormatOptions): string {
  const {
    thousandsSeparator,
    decimalSeparator,
    minFractionDigits,
    maxFractionDigits,
    prefix,
    positiveOnly,
  } = options;

  const invalidValuesRegExp = new RegExp("[^\\d,\\d.\\s-" + decimalSeparator + "]", "g");
  const doubleValueRegExp = new RegExp("([,\\.\\s\\-" + decimalSeparator + "])+", "g");

  const actualMinFractionDigit =
    minFractionDigits <= maxFractionDigits ? minFractionDigits : maxFractionDigits;

  // slice to first decimal mark
  value = String(value)
    .replaceAll(rawDecimalMark, decimalSeparator)
    .split(decimalSeparator)
    .slice(0, 2)
    .map((value: string, index: number) =>
      index ? value.replaceAll(thousandsSeparator, "") : value,
    )
    .join(decimalSeparator);

  value = String(value)
    .replace(invalidValuesRegExp, "")
    .replace(doubleValueRegExp, "$1")
    .replaceAll(decimalSeparator, rawDecimalMark)
    .trim();

  const isNumber = isNumberValueRegExp.test(value);
  const isFloat = value.endsWith(rawDecimalMark) || value.endsWith(".0");
  const isMinus = value === minus;

  if (isMinus && positiveOnly) {
    value = "";
  }

  if (value.includes(minus)) {
    let isFirstMinus = value.startsWith(minus);

    value = value.replaceAll(minus, (match) => {
      if (isFirstMinus) {
        isFirstMinus = false;

        return match;
      }

      return "";
    });
  }

  if (!value || !isNumber || isFloat || isMinus) {
    return `${prefix}${value.replaceAll(rawDecimalMark, decimalSeparator)}`;
  }

  const intlNumberOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: actualMinFractionDigit,
    maximumFractionDigits: maxFractionDigits,
    roundingMode: "trunc",
  };

  if (positiveOnly) {
    intlNumberOptions.signDisplay = "never";
  }

  const intlNumber = new Intl.NumberFormat("en-US", intlNumberOptions);

  const rawValue = getRawValue(value, {
    decimalSeparator,
    thousandsSeparator,
    prefix,
    minFractionDigits: 0,
    maxFractionDigits: 2,
    positiveOnly: false,
  });

  const formattedValue = intlNumber
    .formatToParts((rawValue || 0) as unknown as number)
    .map((part) => {
      if (part.type === "group") part.value = thousandsSeparator;
      if (part.type === "decimal") part.value = decimalSeparator;

      if (part.type === "fraction") {
        const fraction = rawValue.split(rawDecimalMark).at(-1) || "";
        const formattedFraction = fraction
          .split("")
          .slice(actualMinFractionDigit, maxFractionDigits)
          .join("");

        part.value = formattedFraction;
      }

      return part;
    });

  formattedValue.unshift({ value: prefix, type: "minusSign" });

  return formattedValue.map((part) => part.value).join("");
}
