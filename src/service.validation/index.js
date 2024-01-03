import { getDaysInMonth } from "date-fns";

export default class ValidationServiceDefault {
  PHONE_MIN_LENGTH = 10;
  PHONE_MAX_LENGTH = 13;
  PASSWORD_MIN_LENGTH = 8;
  LETTERS_REG_EXP = /[a-zA-Z]+/g;
  LETTERS_AND_SYMBOLS_REG_EXP = /\D/g; // Use "g" flag in RegExp,if want to use in UInput
  LETTERS_AND_NUMBERS_REG_EXP = /[a-zA-Z0-9]+/g;
  NUMBER_REG_EXP = /\d*\.?\d*/g;
  INTEGER_REG_EXP = /\d*/g;
  PLUS_AND_SPACE_REG_EXP = /[\s+]/g;
  DATE_WITH_DOT_FORMAT_REG_EXP = /^\d{2}([./-])\d{2}\1\d{4}$/;

  phoneMinLength = (value) => {
    const replacePhoneValue = this.clearPhone(value);

    return !replacePhoneValue.length || replacePhoneValue.length >= this.PHONE_MIN_LENGTH;
  };

  phoneMaxLength = (value) => {
    const replacePhoneValue = this.clearPhone(value);

    return replacePhoneValue.length <= this.PHONE_MAX_LENGTH;
  };

  phoneIsNumber = (value) => {
    const preparedPhone = this.clearPhone(value);

    return preparedPhone && !preparedPhone.match(this.LETTERS_AND_SYMBOLS_REG_EXP);
  };

  clearPhone = (value) => {
    return value.replace(this.PLUS_AND_SPACE_REG_EXP, "");
  };

  dateFormat = (value) => {
    return !!value.match(this.DATE_WITH_DOT_FORMAT_REG_EXP);
  };

  wrongMonthNumber = (value) => {
    const splitDate = value.split(".");
    const month = splitDate[1];

    return Number(month) >= 1 && Number(month) <= 12;
  };

  wrongDayNumber = (value) => {
    const [day, month, year] = value.split(".");

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    return Number(day) >= 1 && Number(day) <= Number(daysInMonth);
  };
}
