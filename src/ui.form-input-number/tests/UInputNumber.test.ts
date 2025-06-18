import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputNumber from "../UInputNumber.vue";
import UInput from "../../ui.form-input/UInput.vue";

import type { Props } from "../types.ts";

describe("UInputNumber.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", () => {
      const modelValue = 5;

      const component = mount(UInputNumber, {
        props: {
          modelValue,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("modelValue")).toBeDefined();
    });

    // Label prop
    it("sets the label correctly", () => {
      const label = "Test Label";

      const component = mount(UInputNumber, {
        props: {
          label,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(label);
    });

    // Currency prop
    it("appends currency to label when both are provided", () => {
      const label = "Price";
      const currency = "USD";
      const expectedLabel = "Price, USD";

      const component = mount(UInputNumber, {
        props: {
          label,
          currency,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe(expectedLabel);
    });

    // Currency prop without label
    it("does not show currency when label is not provided", () => {
      const currency = "USD";

      const component = mount(UInputNumber, {
        props: {
          currency,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("label")).toBe("");
    });

    // Placeholder prop
    it("sets the placeholder correctly", () => {
      const placeholder = "Enter a number";

      const component = mount(UInputNumber, {
        props: {
          placeholder,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("placeholder")).toBe(placeholder);
    });

    // Description prop
    it("sets the description correctly", () => {
      const description = "Enter a valid number";

      const component = mount(UInputNumber, {
        props: {
          description,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("description")).toBe(description);
    });

    // Error prop
    it("sets the error correctly", () => {
      const error = "Invalid number";

      const component = mount(UInputNumber, {
        props: {
          error,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("error")).toBe(error);
    });

    // Size prop
    it("applies the correct size to the input", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, value]) => {
        const component = mount(UInputNumber, {
          props: {
            size: size as Props["size"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("size")).toBe(value);
      });
    });

    // LabelAlign prop
    it("applies the correct label alignment", () => {
      const alignments = {
        top: "top",
        topInside: "topInside",
        topWithDesc: "topWithDesc",
        left: "left",
        right: "right",
      };

      Object.entries(alignments).forEach(([align, value]) => {
        const component = mount(UInputNumber, {
          props: {
            labelAlign: align as Props["labelAlign"],
          },
        });

        const input = component.findComponent(UInput);

        expect(input.props("labelAlign")).toBe(value);
      });
    });

    // LeftIcon prop
    it("sets the left icon correctly", () => {
      const leftIcon = "search";

      const component = mount(UInputNumber, {
        props: {
          leftIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("leftIcon")).toBe(leftIcon);
    });

    // RightIcon prop
    it("sets the right icon correctly", () => {
      const rightIcon = "close";

      const component = mount(UInputNumber, {
        props: {
          rightIcon,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("rightIcon")).toBe(rightIcon);
    });

    // Readonly prop
    it("sets readonly correctly", () => {
      const readonly = true;

      const component = mount(UInputNumber, {
        props: {
          readonly,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("readonly")).toBe(readonly);
    });

    // Disabled prop
    it("sets disabled correctly", () => {
      const disabled = true;

      const component = mount(UInputNumber, {
        props: {
          disabled,
        },
      });

      const input = component.findComponent(UInput);

      expect(input.props("disabled")).toBe(disabled);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when input value changes", async () => {
      const modelValue = 5;

      const component = mount(UInputNumber, {
        props: {
          modelValue,
        },
      });

      const input = component.findComponent(UInput);

      await input.vm.$emit("keyup", { key: "5" });

      expect(component.emitted("update:modelValue")).toBeTruthy();
    });

    // Input event
    it("emits input event when input event is triggered", async () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: 5,
        },
      });

      const input = component.findComponent(UInput);
      const inputEvent = new InputEvent("input");

      await input.vm.$emit("input", inputEvent);

      expect(component.emitted("input")).toBeTruthy();
      expect(component.emitted("input")[0][0]).toBe(inputEvent);
    });

    // Keyup event
    it("emits keyup event when keyup event is triggered", async () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: 5,
        },
      });

      const input = component.findComponent(UInput);
      const keyupEvent = new KeyboardEvent("keyup", { key: "5" });

      await input.vm.$emit("keyup", keyupEvent);

      expect(component.emitted("keyup")).toBeTruthy();
      expect(component.emitted("keyup")[0][0]).toBe(keyupEvent);
    });

    // Blur event
    it("emits blur event when blur event is triggered", async () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: 5,
        },
      });

      const input = component.findComponent(UInput);

      await input.vm.$emit("blur");

      expect(component.emitted("blur")).toBeTruthy();
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Left slot
    it("renders content in the left slot", () => {
      const slotClass = "left-slot-content";
      const component = mount(UInputNumber, {
        props: {
          leftIcon: "search",
        },
        slots: {
          left: `<div class="${slotClass}">Left Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe("Left Content");
    });

    // Right slot
    it("renders content in the right slot", () => {
      const slotClass = "right-slot-content";
      const component = mount(UInputNumber, {
        props: {
          rightIcon: "close",
        },
        slots: {
          right: `<div class="${slotClass}">Right Content</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe("Right Content");
    });
  });

  // Exposed refs tests
  describe("Exposed Refs", () => {
    // Input ref
    it("exposes the input ref", () => {
      const component = mount(UInputNumber, {
        props: {
          modelValue: 5,
        },
      });

      expect(component.vm.input).toBeDefined();
    });

    // RawValue ref
    it("exposes the rawValue ref", () => {
      const modelValue = 5;

      const component = mount(UInputNumber, {
        props: {
          modelValue,
        },
      });

      expect(component.vm.rawValue).toBeDefined();
    });

    // FormattedValue ref
    it("exposes the formattedValue ref", () => {
      const modelValue = 5;

      const component = mount(UInputNumber, {
        props: {
          modelValue,
        },
      });

      expect(component.vm.formattedValue).toBeDefined();
    });
  });

  // Formatting tests
  describe("Formatting", () => {
    // Decimal separator
    it("formats the value with the correct decimal separator", async () => {
      const modelValue = 5.25;
      const decimalSeparator = ",";

      const component = mount(UInputNumber, {
        props: {
          modelValue,
          decimalSeparator,
          minFractionDigits: 2,
          maxFractionDigits: 2,
        },
        attachTo: document.body,
      });

      // Wait for the component to update
      await component.vm.$nextTick();

      // Check the formatted value directly
      expect(component.vm.formattedValue).toContain(decimalSeparator);
    });

    // Thousands separator
    it("formats the value with the correct thousands separator", async () => {
      const modelValue = 1000000;
      const thousandsSeparator = " ";

      const component = mount(UInputNumber, {
        props: {
          modelValue,
          thousandsSeparator,
        },
        attachTo: document.body,
      });

      // Wait for the component to update
      await component.vm.$nextTick();

      // Check the formatted value directly
      expect(component.vm.formattedValue).toContain(thousandsSeparator);
    });

    // Prefix
    it("adds the prefix to the formatted value", async () => {
      const modelValue = 5;
      const prefix = "$";

      const component = mount(UInputNumber, {
        props: {
          modelValue,
          prefix,
        },
        attachTo: document.body,
      });

      // Wait for the component to update
      await component.vm.$nextTick();

      // Check the formatted value directly
      expect(component.vm.formattedValue.startsWith(prefix)).toBe(true);
    });

    // PositiveOnly
    it("does not allow negative values when positiveOnly is true", async () => {
      const modelValue = -5;
      const positiveOnly = true;

      const component = mount(UInputNumber, {
        props: {
          modelValue,
          positiveOnly,
        },
        attachTo: document.body,
      });

      // Wait for the component to update
      await component.vm.$nextTick();

      // Parse the raw value to a number for comparison
      const rawValueNumber = parseFloat(component.vm.rawValue as string);

      // The raw value should be non-negative
      expect(rawValueNumber).toBeGreaterThanOrEqual(0);
    });
  });
});
