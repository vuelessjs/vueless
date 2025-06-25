import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import UInputCounter from "../UInputCounter.vue";
import UButton from "../../ui.button/UButton.vue";
import UInputNumber from "../../ui.form-input-number/UInputNumber.vue";

import type { Props } from "../types.ts";

describe("UInputCounter.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("props", () => {
    it("ModelValue – sets initial value correctly", () => {
      const initialValue = 5;
      const component = mount(UInputCounter, {
        props: {
          modelValue: initialValue,
        },
      });

      expect(component.getComponent(UInputNumber).props("modelValue")).toBe(initialValue);
    });

    it("ModelValue – updates value on input", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const [subtractButton, addButton] = component.findAllComponents(UButton);

      await addButton.trigger("mousedown");
      await addButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(6);

      await addButton.trigger("mousedown");
      await addButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![1][0]).toBe(7);

      await subtractButton.trigger("mousedown");
      await subtractButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![2][0]).toBe(6);
    });

    it("Step – updated value with provided step", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          step: 2,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const [subtractButton, addButton] = component.findAllComponents(UButton);

      await addButton.trigger("mousedown");
      await addButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(7);

      await subtractButton.trigger("mousedown");
      await subtractButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![1][0]).toBe(5);
    });

    it("Step – does not update value above max", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          step: 2,
          max: 6,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const [, addButton] = component.findAllComponents(UButton);

      await addButton.trigger("mousedown");
      await addButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(6);
      expect(addButton.props("disabled")).toBe(true);
    });

    it("Step – does not update value below min", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          step: 2,
          min: 4,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const [subtractButton] = component.findAllComponents(UButton);

      await subtractButton.trigger("mousedown");
      await subtractButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(4);
      expect(subtractButton.props("disabled")).toBe(true);
    });

    it("Min – does not allow value below min", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          min: 4,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const subtractButton = component.findComponent(UButton);

      await subtractButton.trigger("mousedown");
      await subtractButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(4);
      expect(subtractButton.props("disabled")).toBe(true);
    });

    it("Max – does not allow value above max", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          max: 6,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const [, addButton] = component.findAllComponents(UButton);

      await addButton.trigger("mousedown");
      await addButton.trigger("mouseup");

      vi.advanceTimersByTime(150);

      expect(component.emitted("update:modelValue")![0][0]).toBe(6);
      expect(addButton.props("disabled")).toBe(true);
    });

    it("Readonly – renders text instead of input when readonly set to true", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          readonly: true,
        },
      });

      const input = component.findComponent(UInputNumber);

      expect(input.exists()).toBe(false);

      const counterText = component.get("[vl-key='counterText']");

      expect(counterText.text()).toBe("5");
    });

    it("Size – passes correct size props to counter UInputNumber", () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          readonly: false,
          size: "lg" as Props["size"],
        },
      });

      const input = component.getComponent(UInputNumber);

      expect(input.props("size")).toBe("lg");
    });

    it("Size – applies correct class to counter text based on size prop", () => {
      const sizeClasses = {
        sm: "text-small px-1",
        md: "text-medium px-1.5",
        lg: "text-large px-2",
      };

      Object.entries(sizeClasses).forEach(([size, className]) => {
        const component = mount(UInputCounter, {
          props: {
            modelValue: 5,
            readonly: true,
            size: size as Props["size"],
          },
        });

        const counterText = component.get("[vl-key='counterText']");

        expect(counterText.attributes("class")).toContain(className);
      });
    });

    it("Disabled – disables buttons when disabled prop is true", async () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          disabled: true,
        },
      });

      const [subtractButton, addButton] = component.findAllComponents(UButton);

      expect(subtractButton.props("disabled")).toBe(true);
      expect(addButton.props("disabled")).toBe(true);
    });

    it("Disabled – disables input when disabled prop is true", () => {
      const component = mount(UInputCounter, {
        props: {
          modelValue: 5,
          disabled: true,
          readonly: false,
        },
      });

      const input = component.getComponent(UInputNumber);

      expect(input.props("disabled")).toBe(true);
    });

    it("Data Test – applies correct data-test attributes", () => {
      const dataTestCases: string[] = ["subtract", "add"];

      dataTestCases.forEach((testCase) => {
        const component = mount(UInputCounter, {
          props: {
            modelValue: 5,
            dataTest: "test",
          },
        });

        component.get(`[data-test='test-${testCase}']`);
      });
    });
  });
});
