export const MONEY_SIGN_TYPE = {
  default: "default",
  positive: "positive",
  negative: "negative",
};

export const ADD_SPACE_IN_MONEY_REG_EX = /(\d)(?=(\d{3})+(\D|$))/g;
export const SINGLE_ZERO = "0";
export const DOUBLE_ZERO = "00";

export function separatedMoney(money, decimalPlaces = 2, delimiter = ",") {
  const roundedMoney = money ? money.toFixed(decimalPlaces) : 0;

  let [integer, penny] = String(roundedMoney).split(".");

  integer = integer.replace(ADD_SPACE_IN_MONEY_REG_EX, "$1 ");

  if (roundedMoney === 0) {
    integer = SINGLE_ZERO;
    penny = DOUBLE_ZERO;
  }

  return { integer, penny, delimiter };
}
