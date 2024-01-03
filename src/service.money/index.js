export default class MoneyServiceDefault {
  SYMBOL_MINUS = "–";
  SYMBOL_PLUS = "+";
  SINGLE_ZERO = "0";
  DOUBLE_ZERO = "00";
  DEBIT_OBLIGATION = "debit";
  CREDIT_OBLIGATION = "credit";
  ADD_SPACE_IN_CARD_REG_EX = /(.{4})/g;
  ADD_SPACE_IN_DINNER_CLUB_CARD_REG_EX = /(.{4})(.{6})(.{4})/g;
  ADD_SPACE_IN_AMERICAN_EXPRESS_CARD_REG_EX = /(.{4})(.{6})(.{5})/g;
  ADD_SPACE_IN_IBAN_REG_EX = /(.{2})(.{2})(.{6})(.{5})(.*)/g;
  ADD_SPACE_IN_MONEY_REG_EX = /(\d)(?=(\d{3})+(\D|$))/g;
  AMERICAN_EXPRESS_CARD_LENGTH = 15;
  DINER_CLUB_CARD_LENGTH = 14;

  MONEY_SIGN_TYPE = {
    default: "default",
    positive: "positive",
    negative: "negative",
  };

  MONEY_COLORS = {
    negative: "red",
    positive: "green",
    zero: "gray",
  };

  separatedMoney = (money, decimalPlaces = 2, delimiter = ",") => {
    const roundedMoney = money ? money.toFixed(decimalPlaces) : 0;

    let [integer, penny] = String(roundedMoney).split(".");

    integer = integer.replace(this.ADD_SPACE_IN_MONEY_REG_EX, "$1 ");

    if (roundedMoney === 0) {
      integer = this.SINGLE_ZERO;
      penny = this.DOUBLE_ZERO;
    }

    return { integer, penny, delimiter };
  };

  formatCardNumber = (card) => {
    if (
      card.length !== this.AMERICAN_EXPRESS_CARD_LENGTH &&
      card.length !== this.DINER_CLUB_CARD_LENGTH
    ) {
      return MoneyServiceDefault.#formatCommonCardNumber(card);
    }

    if (card.length === this.AMERICAN_EXPRESS_CARD_LENGTH) {
      return MoneyServiceDefault.#formatAmericanExpressCardNumber(card);
    }

    if (card.length === this.DINER_CLUB_CARD_LENGTH) {
      return MoneyServiceDefault.#formatDinerClubCardNumber(card);
    }
  };

  formatIban = (iban) => {
    return iban.replace(this.ADD_SPACE_IN_IBAN_REG_EX, "$1 $2 $3 $4 $5 ");
  };

  static #formatAmericanExpressCardNumber(card) {
    return card.replace(this.ADD_SPACE_IN_AMERICAN_EXPRESS_CARD_REG_EX, "$1 $2 $3 ");
  }

  static #formatDinerClubCardNumber(card) {
    return card.replace(this.ADD_SPACE_IN_DINNER_CLUB_CARD_REG_EX, "$1 $2 $3 ");
  }

  static #formatCommonCardNumber(card) {
    return card.replace(this.ADD_SPACE_IN_CARD_REG_EX, "$1 ");
  }
}

export const {
  SYMBOL_MINUS,
  SINGLE_ZERO,
  SYMBOL_PLUS,
  MONEY_COLORS,
  DOUBLE_ZERO,
  DEBIT_OBLIGATION,
  CREDIT_OBLIGATION,
  MONEY_SIGN_TYPE,
} = new MoneyServiceDefault();
