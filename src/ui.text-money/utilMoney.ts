export const MONEY_SIGN_TYPE = {
  auto: "auto",
  positive: "positive",
  negative: "negative",
  unsigned: "unsigned",
};

export const ADD_SPACE_IN_MONEY_REG_EX = /(\d)(?=(\d{3})+(\D|$))/g;
export const SINGLE_ZERO = "0";
export const DOUBLE_ZERO = "00";

export function separatedMoney(
  money: number,
  minFractionDigits = 0,
  maxFractionDigits = 2,
  decimalSeparator = ",",
  thousandsSeparator = " ",
) {
  const options = {
    minimumFractionDigits: Number(minFractionDigits),
    maximumFractionDigits: Number(maxFractionDigits),
  };

  const formattedMoney =
    money !== undefined && money !== null ? Number(money).toLocaleString("en-US", options) : "0";

  let [integer, penny = ""] = formattedMoney.split(".");

  integer = integer.replace(/,/g, thousandsSeparator);

  if (!money && money !== 0) {
    integer = SINGLE_ZERO;
    penny = DOUBLE_ZERO;
  }

  if (penny === "") {
    decimalSeparator = "";
  }

  if (minFractionDigits === 0 && maxFractionDigits === 0) {
    decimalSeparator = "";
    penny = "";
  } else if (penny.length < minFractionDigits) {
    penny = penny.padEnd(minFractionDigits, "0");
  }

  return { integer, penny, decimalSeparator };
}
