import { describe, it, expect } from "vitest";

import { formatNumber, getMathSign, MATH_SIGN, MATH_SIGN_TYPE } from "../utilNumber";

import type { FormatNumberOptions } from "../utilNumber";

const options: FormatNumberOptions = {
  sign: "auto",
  minFractionDigits: 2,
  maxFractionDigits: 2,
  decimalSeparator: ".",
  thousandsSeparator: " ",
};

describe("utilNumber", () => {
  describe("formatNumber", () => {
    it("formats separators, fraction digits, and the auto sign", () => {
      expect(formatNumber(1234567.891, options)).toBe("1 234 567.89");
      expect(formatNumber("-10.5", options)).toBe(`${MATH_SIGN.MINUS}10.50`);
      expect(formatNumber(-2500, { ...options, minFractionDigits: 0 })).toBe(
        `${MATH_SIGN.MINUS}2 500`,
      );
    });

    it("drops the fraction when max fraction digits is zero", () => {
      expect(formatNumber(12.7, { ...options, minFractionDigits: 0, maxFractionDigits: 0 })).toBe(
        "13",
      );
    });

    it("does not add a sign to zero or an empty value", () => {
      expect(formatNumber(0, { ...options, sign: "positive" })).toBe("0.00");
      expect(formatNumber(undefined, { ...options, sign: "negative" })).toBe("0.00");
    });

    it("places the currency on the configured side", () => {
      expect(formatNumber(5, { ...options, currency: "USD", currencyAlign: "left" })).toBe(
        "USD5.00",
      );
      expect(
        formatNumber(5, {
          ...options,
          currency: "USD",
          currencyAlign: "right",
          currencySpace: true,
        }),
      ).toBe("5.00 USD");
    });
  });

  describe("getMathSign", () => {
    it("returns the sign for each sign type", () => {
      expect(getMathSign(5, MATH_SIGN_TYPE.positive as FormatNumberOptions["sign"])).toBe(
        MATH_SIGN.PLUS,
      );
      expect(getMathSign(5, MATH_SIGN_TYPE.negative as FormatNumberOptions["sign"])).toBe(
        MATH_SIGN.MINUS,
      );
      expect(getMathSign(-5, MATH_SIGN_TYPE.auto as FormatNumberOptions["sign"])).toBe(
        MATH_SIGN.MINUS,
      );
      expect(getMathSign(5, MATH_SIGN_TYPE.auto as FormatNumberOptions["sign"])).toBe("");
      expect(getMathSign(-5, MATH_SIGN_TYPE.unsigned as FormatNumberOptions["sign"])).toBe("");
    });
  });
});
