export const MATH_SIGN_TYPE = {
  auto: "auto",
  positive: "positive",
  negative: "negative",
  unsigned: "unsigned",
};

export const MATH_SIGN = {
  PLUS: "+",
  MINUS: "–",
};

export const SINGLE_ZERO = "0";
export const DOUBLE_ZERO = "00";

export function separatedNumber(
  value: number,
  minFractionDigits = 0,
  maxFractionDigits = 2,
  decimalSeparator = ",",
  thousandsSeparator = " ",
) {
  const options = {
    minimumFractionDigits: Number(minFractionDigits),
    maximumFractionDigits: Number(maxFractionDigits),
  };

  const formattedNumber =
    value !== undefined && value !== null ? Number(value).toLocaleString("en-US", options) : "0";

  let [integer, fraction = ""] = formattedNumber.split(".");

  integer = integer.replace(/,/g, thousandsSeparator);

  if (!value && value !== 0) {
    integer = SINGLE_ZERO;
    fraction = DOUBLE_ZERO;
  }

  if (fraction === "") {
    decimalSeparator = "";
  }

  if (minFractionDigits === 0 && maxFractionDigits === 0) {
    decimalSeparator = "";
    fraction = "";
  } else if (fraction.length < minFractionDigits) {
    fraction = fraction.padEnd(minFractionDigits, "0");
  }

  return { integer, fraction, decimalSeparator };
}

export interface FormatNumberOptions {
  sign?: "auto" | "positive" | "negative" | "unsigned";
  currency?: string;
  currencyAlign?: "left" | "right";
  currencySpace?: boolean;
  minFractionDigits: number;
  maxFractionDigits: number;
  decimalSeparator: string;
  thousandsSeparator: string;
}

/**
 * Format a number the same way as `UNumber` does.
 */
export function formatNumber(value: number | string | undefined, options: FormatNumberOptions) {
  const numericValue = typeof value === "string" ? Number.parseFloat(value) : value;
  const { currency, currencyAlign, currencySpace, maxFractionDigits } = options;

  const preparedNumber = separatedNumber(
    Math.abs(numericValue || 0),
    options.minFractionDigits,
    maxFractionDigits,
    options.decimalSeparator,
    options.thousandsSeparator,
  );

  let result = "";

  if (currencyAlign === "left" && currency) {
    result += currencySpace ? `${currency} ` : currency;
  }

  if (value) {
    result += getMathSign(numericValue, options.sign);
  }

  result += preparedNumber.integer;

  if (maxFractionDigits > 0) {
    result += preparedNumber.decimalSeparator + preparedNumber.fraction;
  }

  if (currencyAlign === "right" && currency) {
    result += currencySpace ? ` ${currency}` : currency;
  }

  return result;
}

/**
 * Get math sign by sign type.
 */
export function getMathSign(value: number | undefined, sign: FormatNumberOptions["sign"]) {
  if (sign === MATH_SIGN_TYPE.positive) return MATH_SIGN.PLUS;
  if (sign === MATH_SIGN_TYPE.negative) return MATH_SIGN.MINUS;
  if (sign === MATH_SIGN_TYPE.auto && Number(value) < 0) return MATH_SIGN.MINUS;

  return "";
}
