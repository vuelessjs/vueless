import { describe, it, expect } from "vitest";

import { getFixedNumber, getFormattedValue } from "../utilFormat";

const formatOptions = {
  minFractionDigits: 0,
  maxFractionDigits: 2,
  decimalSeparator: ",",
  thousandsSeparator: " ",
  positiveOnly: false,
  prefix: "",
};

describe("utilFormat", () => {
  it("getFixedNumber – keeps the sign of negative zero", () => {
    expect(Object.is(getFixedNumber(-0), -0)).toBe(true);
  });

  it("getFormattedValue – keeps the minus while typing a value between -1 and 0", () => {
    expect(getFormattedValue("-0", formatOptions)).toBe("-0");
    expect(getFormattedValue("-0.9", formatOptions)).toBe("-0,9");
  });
});
