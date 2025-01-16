export const MATH_SIGN_TYPE = {
  auto: "auto",
  positive: "positive",
  negative: "negative",
  unsigned: "unsigned",
};

export const MATH_SIGN = {
  PLUS: "+",
  MINUS: "-",
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

  let [integer, decimal = ""] = formattedNumber.split(".");

  integer = integer.replace(/,/g, thousandsSeparator);

  if (!value && value !== 0) {
    integer = SINGLE_ZERO;
    decimal = DOUBLE_ZERO;
  }

  if (decimal === "") {
    decimalSeparator = "";
  }

  if (minFractionDigits === 0 && maxFractionDigits === 0) {
    decimalSeparator = "";
    decimal = "";
  } else if (decimal.length < minFractionDigits) {
    decimal = decimal.padEnd(minFractionDigits, "0");
  }

  return { integer, decimal, decimalSeparator };
}
