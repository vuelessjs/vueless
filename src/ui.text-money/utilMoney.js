export const MONEY_SIGN_TYPE = {
  default: "default",
  positive: "positive",
  negative: "negative",
};

export const ADD_SPACE_IN_MONEY_REG_EX = /(\d)(?=(\d{3})+(\D|$))/g;
export const SINGLE_ZERO = "0";
export const DOUBLE_ZERO = "00";

export function separatedMoney(money, decimalPlaces = 2, decimalSeparator = ",") {
  const roundedMoney = money ? money.toFixed(decimalPlaces) : 0;

  let [integer, penny] = String(roundedMoney).split(".");

  integer = integer.replace(ADD_SPACE_IN_MONEY_REG_EX, "$1 ");

  if (!roundedMoney) {
    integer = SINGLE_ZERO;
    penny = DOUBLE_ZERO;
  }

  if (decimalPlaces === 0) {
    decimalSeparator = "";
    penny = "";
  }

  return { integer, penny, decimalSeparator };
}
