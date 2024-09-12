export default class FormatService {
  static isNumberValueRegExp = /^[\d,.\s-]+$/;
  static rawDecimalMark = ".";
  static comma = ",";

  static getRawValue(value, options) {
    const { thousandsSeparator, decimalSeparator, rawValuePrefix, prefix } = options;

    value = String(value).endsWith(decimalSeparator)
      ? String(value).replace(decimalSeparator, "")
      : String(value);

    const rawValueWithPrefix = value
      .replaceAll(thousandsSeparator, "")
      .replace(decimalSeparator, ".");

    return rawValuePrefix ? rawValueWithPrefix : rawValueWithPrefix.replace(prefix, "");
  }

  static getFormattedValue(value, options) {
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
      .map((value, index) => (index ? value.replaceAll(thousandsSeparator, "") : value))
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

    const formattedValue = intlNumber.formatToParts(parseFloat(rawValue) || 0).map((part) => {
      if (part.type === "group") part.value = thousandsSeparator;
      if (part.type === "decimal") part.value = decimalSeparator;
      if (part.type === "fraction") part.value = part.value.padEnd(maxFractionDigits, "0");

      return part;
    });

    formattedValue.unshift({ value: prefix, type: "minusSign" });

    return formattedValue.map((part) => part.value).join("");
  }
}
