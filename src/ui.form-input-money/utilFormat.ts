import { RAW_DECIMAL_MARK } from "./constants.ts";

import type { FormatOptions } from "./types.ts";

export function getRawValue(
  value: string,
  options: Pick<FormatOptions, "prefix" | "decimalSeparator" | "thousandsSeparator">,
): Intl.StringNumericLiteral {
  const { thousandsSeparator, decimalSeparator, prefix } = options;

  value = value.endsWith(decimalSeparator) ? value.replace(decimalSeparator, "") : value;

  const rawValueWithPrefix = value
    .replaceAll(thousandsSeparator, "")
    .replace(decimalSeparator, RAW_DECIMAL_MARK);

  return rawValueWithPrefix.replace(prefix, "") as Intl.StringNumericLiteral;
}

export function getFormattedValue(value: string, options: FormatOptions): string {
  const { thousandsSeparator, decimalSeparator, prefix, positiveOnly } = options;

  const minFractionDigits = Math.abs(options.minFractionDigits);
  const maxFractionDigits = Math.abs(options.maxFractionDigits);

  const isValidMinFractionDigits = minFractionDigits <= maxFractionDigits;
  const actualMinFractionDigit = isValidMinFractionDigits ? minFractionDigits : maxFractionDigits;

  const intlNumberOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: actualMinFractionDigit,
    maximumFractionDigits: maxFractionDigits,
    roundingMode: "trunc",
  };

  if (positiveOnly) {
    intlNumberOptions.signDisplay = "never";
  }

  const intlNumber = new Intl.NumberFormat("en-US", intlNumberOptions);

  const formattedValue = intlNumber
    .formatToParts(value as Intl.StringNumericLiteral)
    .map((part) => {
      if (part.type === "group") part.value = thousandsSeparator;
      if (part.type === "decimal") part.value = decimalSeparator;

      return part;
    });

  formattedValue.unshift({ value: prefix, type: "minusSign" });

  return formattedValue.map((part) => part.value).join("");
}
