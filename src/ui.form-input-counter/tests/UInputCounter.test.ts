import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UInputCounter from "../UInputCounter.vue";
import UButton from "../../ui.button/UButton.vue";
import UInputNumber from "../../ui.form-input-number/UInputNumber.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UInputCounter.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the input value correctly", () => {
      const modelValue = 5;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
        },
      });

      const inputNumber = component.findComponent(UInputNumber);

      expect(inputNumber.props("modelValue")).toBe(modelValue);
    });

    // Step prop - Add button
    it("emits correct value when add button is clicked", async () => {
      const modelValue = 10;
      const step = 5;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          step,
        },
      });

      // Click add button
      await component.findAll("button")[1].trigger("mousedown");
      await component.findAll("button")[1].trigger("mouseup");

      // Check that the update:modelValue event was emitted with the correct value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([modelValue + step]);
    });

    // Step prop - Subtract button
    it("emits correct value when subtract button is clicked", async () => {
      const modelValue = 10;
      const step = 5;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          step,
        },
      });

      // Click subtract button
      await component.findAll("button")[0].trigger("mousedown");
      await component.findAll("button")[0].trigger("mouseup");

      // Check that the update:modelValue event was emitted with the correct value
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([modelValue - step]);
    });

    // Min prop
    it("does not decrement below min value", async () => {
      const modelValue = 5;
      const min = 5;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          min,
        },
      });

      // Subtract button should be disabled
      const subtractButton = component.findAll("button")[0];

      expect(subtractButton.attributes("disabled")).toBeDefined();

      // Click subtract button
      await subtractButton.trigger("click");
      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    // Max prop
    it("does not increment above max value", async () => {
      const modelValue = 10;
      const max = 10;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          max,
        },
      });

      // Add button should be disabled
      const addButton = component.findAll("button")[1];

      expect(addButton.attributes("disabled")).toBeDefined();

      // Click add button
      await addButton.trigger("click");
      expect(component.emitted("update:modelValue")).toBeFalsy();
    });

    // Size prop
    it("applies the correct size to buttons and input", () => {
      const sizes = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizes).forEach(([size, value]) => {
        const component = mount(UInputCounter, {
          props: {
            modelValue: 5,
            size: size as Props["size"],
          },
        });

        const inputNumber = component.findComponent(UInputNumber);
        const buttons = component.findAllComponents(UButton);

        expect(inputNumber.props("size")).toBe(value);
        expect(buttons[0].props("size")).toBeDefined();
        expect(buttons[1].props("size")).toBeDefined();
      });
    });

    // Readonly prop
    it("shows text instead of input when readonly is true", () => {
      const modelValue = 5;
      const readonly = true;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          readonly,
        },
      });

      // Should not render input
      expect(component.findComponent(UInputNumber).exists()).toBe(false);

      // Should render text
      const counterText = component.find("[vl-key='counterText']");

      expect(counterText.exists()).toBe(true);
      expect(counterText.text()).toBe(modelValue.toString());
    });

    // Disabled prop
    it("disables buttons and input when disabled is true", () => {
      const disabled = true;

      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          disabled,
        },
      });

      const inputNumber = component.findComponent(UInputNumber);
      const buttons = component.findAllComponents(UButton);

      expect(inputNumber.props("disabled")).toBe(true);
      expect(buttons[0].props("disabled")).toBe(true);
      expect(buttons[1].props("disabled")).toBe(true);
    });

    // DataTest prop
    it("sets the data-test attribute correctly", () => {
      const dataTest = "test-input-counter";

      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          dataTest,
        },
      });

      // Check data-test on subtract button
      const subtractButton = component.find("[data-test='test-input-counter-subtract']");

      expect(subtractButton.exists()).toBe(true);

      // Check data-test on add button
      const addButton = component.find("[data-test='test-input-counter-add']");

      expect(addButton.exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when input value changes", async () => {
      const modelValue = 5;
      const newValue = 10;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
        },
      });

      const inputNumber = component.findComponent(UInputNumber);

      await inputNumber.vm.$emit("update:modelValue", newValue);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([newValue]);
    });
  });

  // Functionality tests
  describe("Functionality", () => {
    // Input blur validation for max value
    it("validates input value on blur when above max", async () => {
      const modelValue = 5;
      const max = 10;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          max,
        },
      });

      const inputNumber = component.findComponent(UInputNumber);

      // Simulate user entering a value above max
      await inputNumber.vm.$emit("update:modelValue", max + 5);
      await inputNumber.vm.$emit("blur");

      // Check that the last emitted value is the max value
      const emittedEvents = component.emitted("update:modelValue");

      expect(emittedEvents).toBeTruthy();

      // Get the last emitted value
      const lastEmittedValue = emittedEvents[emittedEvents.length - 1][0];

      expect(lastEmittedValue).toBe(max);
    });

    // Input blur validation for min value
    it("validates input value on blur when below min", async () => {
      const modelValue = 5;
      const min = 1;

      const component = mount(UInputCounter, {
        props: {
          modelValue,
          min,
        },
      });

      const inputNumber = component.findComponent(UInputNumber);

      // Simulate user entering a value below min
      await inputNumber.vm.$emit("update:modelValue", min - 5);
      await inputNumber.vm.$emit("blur");

      // Check that the last emitted value is the min value
      const emittedEvents = component.emitted("update:modelValue");

      expect(emittedEvents).toBeTruthy();

      // Get the last emitted value
      const lastEmittedValue = emittedEvents[emittedEvents.length - 1][0];

      expect(lastEmittedValue).toBe(min);
    });

    // Icons
    it("renders the correct icons for add and subtract buttons", () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
        },
      });

      const icons = component.findAllComponents(UIcon);

      expect(icons.length).toBe(2);
      expect(icons[0].props("name")).toBe("remove");
      expect(icons[1].props("name")).toBe("add");
    });
  });
});
