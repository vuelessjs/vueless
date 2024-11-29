import type { FormatOptions } from "./types.ts";

export default class FormatService {
  static isNumberValueRegExp = /^[\d,.\s-]+$/;
  static rawDecimalMark = ".";
  static comma = ",";

  static getRawValue(value: string | number, options: FormatOptions) {
    const { thousandsSeparator, decimalSeparator, prefix } = options;

    value = String(value).endsWith(decimalSeparator)
      ? String(value).replace(decimalSeparator, "")
      : String(value);

    const rawValueWithPrefix = value
      .replaceAll(thousandsSeparator, "")
      .replace(decimalSeparator, ".");

    return rawValueWithPrefix.replace(prefix, "");
  }

  static getFormattedValue(value: string, options: FormatOptions) {
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
      .replaceAll(this.comma, decimalSeparator)
      .split(decimalSeparator)
      .slice(0, 2)
      .map((value: string, index: number) =>
        index ? value.replaceAll(thousandsSeparator, "") : value,
      )
      .join(decimalSeparator);

    value = String(value)
      .replace(invalidValuesRegExp, "")
      .replace(doubleValueRegExp, "$1")
      .replaceAll(decimalSeparator, this.rawDecimalMark);

    const isNumber = this.isNumberValueRegExp.test(value);
    const isFloat = value.endsWith(this.rawDecimalMark) || value.endsWith(".0");

    if (!value || !isNumber || isFloat) {
      return `${prefix}${value.replaceAll(this.rawDecimalMark, decimalSeparator)}`;
    }

    const intlNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits:
        minFractionDigits <= maxFractionDigits ? minFractionDigits : maxFractionDigits,
      maximumFractionDigits: maxFractionDigits,
      signDisplay: positiveOnly ? "never" : "negative",
      roundingMode: "floor",
    });

    const rawValue = this.getRawValue(value, {
      decimalSeparator,
      thousandsSeparator,
      prefix,
      rawValuePrefix: false,
    });

    const formattedValue = intlNumber
      .format(rawValue)
      .replaceAll(this.comma, thousandsSeparator)
      .replaceAll(this.rawDecimalMark, decimalSeparator);

    return prefix + formattedValue;
  }
}
