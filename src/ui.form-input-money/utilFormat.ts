import type { FormatOptions } from "./types.ts";

const isNumberValueRegExp = /^[\d,.\s-]+$/;
const rawDecimalMark = ".";
const comma = ",";
const minus = "-";

export function getRawValue(value: string | number, options: FormatOptions): string {
  const { thousandsSeparator, decimalSeparator, prefix } = options;

  value = String(value).endsWith(decimalSeparator)
    ? String(value).replace(decimalSeparator, "")
    : String(value);

  const rawValueWithPrefix = value
    .replaceAll(thousandsSeparator, "")
    .replace(decimalSeparator, ".");

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
  const doubleValueRegExp = new RegExp("([,\\.\\s-" + decimalSeparator + "])+", "g");

  // slice to first decimal mark
  value = String(value)
    .replaceAll(comma, decimalSeparator)
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

  if (!value || !isNumber || isFloat || isMinus) {
    return `${prefix}${value.replaceAll(rawDecimalMark, decimalSeparator)}`;
  }

  const intlNumberOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits:
      minFractionDigits <= maxFractionDigits ? minFractionDigits : maxFractionDigits,
    maximumFractionDigits: maxFractionDigits,
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
    .format(parseFloat(rawValue))
    .replaceAll(comma, thousandsSeparator)
    .replaceAll(rawDecimalMark, decimalSeparator);

  return prefix + formattedValue;
}
