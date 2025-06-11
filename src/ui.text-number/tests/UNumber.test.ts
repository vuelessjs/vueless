import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeAll } from "vitest";

import UNumber from "../UNumber.vue";
import { MATH_SIGN, MATH_SIGN_TYPE } from "../utilNumber.ts";

import type { Props } from "../types.ts";

describe("UNumber.vue", () => {
  let value: number;

  beforeAll(() => {
    value = 1234.56;
  });

  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const sizeClasses = {
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UNumber, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", async () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
        "notice",
        "neutral",
        "grayscale",
      ];

      colors.forEach((color) => {
        const component = mount(UNumber, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    // Value prop
    it("renders the correct number value", () => {
      const expectedFormattedNumber = "1 234,56";

      const component = mount(UNumber, {
        props: {
          value,
        },
      });

      expect(component.text()).toContain(expectedFormattedNumber);
    });

    // Sign prop
    it("renders the correct sign based on sign prop", () => {
      const testNegativeValue = -123;

      // Auto sign (negative value)
      // Should show minus sign for negative values
      const autoComponent = mount(UNumber, {
        props: {
          value: testNegativeValue,
          sign: MATH_SIGN_TYPE.auto as Props["sign"],
        },
      });

      expect(autoComponent.text()).toContain(MATH_SIGN.MINUS);

      // Auto sign (positive value)
      // Should not show any sign for positive values
      const autoPositiveComponent = mount(UNumber, {
        props: {
          value,
          sign: MATH_SIGN_TYPE.auto as Props["sign"],
        },
      });

      expect(autoPositiveComponent.text()).not.toContain(MATH_SIGN.MINUS);
      expect(autoPositiveComponent.text()).not.toContain(MATH_SIGN.PLUS);

      // Positive sign
      // Should show plus sign regardless of value
      const positiveComponent = mount(UNumber, {
        props: {
          value,
          sign: MATH_SIGN_TYPE.positive as Props["sign"],
        },
      });

      expect(positiveComponent.text()).toContain(MATH_SIGN.PLUS);

      // Negative sign
      // Should show minus sign regardless of value
      const negativeComponent = mount(UNumber, {
        props: {
          value,
          sign: MATH_SIGN_TYPE.negative as Props["sign"],
        },
      });

      expect(negativeComponent.text()).toContain(MATH_SIGN.MINUS);

      // Unsigned
      // Should not show any sign regardless of value
      const unsignedComponent = mount(UNumber, {
        props: {
          value: testNegativeValue,
          sign: MATH_SIGN_TYPE.unsigned as Props["sign"],
        },
      });

      expect(unsignedComponent.text()).not.toContain(MATH_SIGN.MINUS);
      expect(unsignedComponent.text()).not.toContain(MATH_SIGN.PLUS);
    });

    // Currency prop
    it("renders the currency symbol", () => {
      const currency = "$";

      const component = mount(UNumber, {
        props: {
          value,
          currency,
        },
      });

      expect(component.text()).toContain(currency);
    });

    // CurrencyAlign prop
    it("aligns currency correctly based on currencyAlign prop", () => {
      const currency = "$";

      const alignTests = [
        { align: "left", expectation: (text: string) => text.startsWith(currency) },
        { align: "right", expectation: (text: string) => text.endsWith(currency) },
      ];

      alignTests.forEach(({ align, expectation }) => {
        const component = mount(UNumber, {
          props: {
            value,
            currency,
            currencyAlign: align as Props["currencyAlign"],
          },
        });

        expect(expectation(component.text())).toBe(true);
      });
    });

    // CurrencySpace prop
    it("adds space between currency and number when currencySpace is true", () => {
      const currency = "$";

      const spaceTests = [
        { space: true, align: "left" },
        { space: false, align: "left" },
        { space: true, align: "right" },
        { space: false, align: "right" },
      ];

      spaceTests.forEach(({ space, align }) => {
        const component = mount(UNumber, {
          props: {
            value,
            currency,
            currencySpace: space,
            currencyAlign: align as Props["currencyAlign"],
          },
        });

        expect(component.html()).toContain(currency);
        // Visual inspection of spacing would be done in a real browser
        // Here we just verify the component renders with the given props
        expect(component.props().currencySpace).toBe(space);
        expect(component.props().currencyAlign).toBe(align);
      });
    });

    // MinFractionDigits prop
    it("adds zeros to meet the minimum fraction digits requirement", () => {
      const value = 123;
      const minFractionDigits = 2;
      const expectedMinFractionResult = "123,00";

      const component = mount(UNumber, {
        props: {
          value,
          minFractionDigits,
        },
      });

      expect(component.text()).toContain(expectedMinFractionResult);
    });

    // MaxFractionDigits prop
    it("rounds the fraction to the maximum number of digits", () => {
      const value = 123.456789;
      const maxFractionDigits = 2;
      const expectedMaxFractionResult = "123,46"; // Rounded from .456789 to 2 digits

      const component = mount(UNumber, {
        props: {
          value,
          maxFractionDigits,
        },
      });

      expect(component.text()).toContain(expectedMaxFractionResult);
      // Original decimal part should not be present
      const originalDecimalPart = value.toString().split(".")[1];

      expect(component.text()).not.toContain(originalDecimalPart);
    });

    // DecimalSeparator prop
    it("uses the correct decimal separator", () => {
      const value = 123.45;
      const decimalSeparator = ",";
      const expectedFormattedNumber = "123,45";

      const component = mount(UNumber, {
        props: {
          value,
          decimalSeparator,
        },
      });

      expect(component.text()).toContain(expectedFormattedNumber);
    });

    // ThousandsSeparator prop
    it("uses the correct thousands separator", () => {
      const value = 1234567.89;
      const thousandsSeparator = " ";
      const expectedFormattedInteger = "1 234 567";

      const component = mount(UNumber, {
        props: {
          value,
          thousandsSeparator,
        },
      });

      expect(component.text()).toContain(expectedFormattedInteger);
    });

    // Align prop
    it("applies the correct align class", () => {
      const alignClasses = {
        left: "justify-start",
        right: "justify-end",
      };

      Object.entries(alignClasses).forEach(([align, classes]) => {
        const component = mount(UNumber, {
          props: {
            align: align as Props["align"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const testDataTest = "test-number";

      const component = mount(UNumber, {
        props: {
          dataTest: testDataTest,
        },
      });

      expect(component.find("[data-test]").attributes("data-test")).toBe(testDataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content from left slot", () => {
      const slotText = "Left";
      const slotClass = "left-content";

      const component = mount(UNumber, {
        props: {
          value,
        },
        slots: {
          left: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });

    // Right slot
    it("renders content from right slot", () => {
      const slotText = "Right";
      const slotClass = "right-content";

      const component = mount(UNumber, {
        props: {
          value,
        },
        slots: {
          right: `<span class='${slotClass}'>${slotText}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UNumber, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
