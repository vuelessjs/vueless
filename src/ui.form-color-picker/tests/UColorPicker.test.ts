import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UColorPicker from "../UColorPicker.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Props } from "../types.ts";

describe("UColorPicker.vue", () => {
  describe("Props", () => {
    it("Model Value – selects the correct color based on modelValue", async () => {
      const modelValue = "primary";
      const updatedValue = "secondary";
      const selectedButtonVariant = "soft";
      const defaultButtonVariant = "ghost";
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue,
          "onUpdate:modelValue": (value) => component.setProps({ modelValue: value }),
          colors,
        },
      });

      const [primaryButton, secondaryButton] = component.findAllComponents(UButton);

      expect(primaryButton.props("variant")).toBe(selectedButtonVariant);
      expect(secondaryButton.props("variant")).toBe(defaultButtonVariant);

      await secondaryButton.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toEqual(updatedValue);

      expect(primaryButton.props("variant")).toBe(defaultButtonVariant);
      expect(secondaryButton.props("variant")).toBe(selectedButtonVariant);
    });

    it("Size – applies the correct size class", async () => {
      const sizes = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UColorPicker, {
          props: {
            modelValue: "",
            size: size as Props["size"],
            colors: {
              primary: "bg-primary-500",
            },
          },
        });

        const colorCircle = component.find("[vl-key='circle']");

        expect(colorCircle.attributes("class")).toContain(classes);
      });
    });

    it("Colors – renders the correct color options", async () => {
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
        error: "bg-error-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors,
        },
      });

      const colorOptions = component.findAll("[vl-key='circle']");

      expect(colorOptions.length).toBe(Object.keys(colors).length);

      Object.values(colors).forEach(async (colorClass, idx) => {
        expect(colorOptions[idx].attributes("class")).toContain(colorClass);
      });
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-color-picker-id";

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          id,
        },
      });

      expect(component.attributes("id")).toBe(id);
    });

    it("Data Test – sets data test attributes", () => {
      const dataTest = "test-color-picker";
      const colorTest = "test-color-picker-button";
      const colors = {
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
      };

      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          dataTest,
          colors,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);

      const colorButtons = component.findAll("[vl-key='colorButton']");

      Object.keys(colors).forEach((color, idx) => {
        expect(colorButtons[idx].attributes("data-test")).toBe(`${colorTest}-${color}`);
      });
    });
  });

  describe("Exposed properties", () => {
    it("ListRef – exposes listRef", () => {
      const component = mount(UColorPicker, {
        props: {
          modelValue: "",
          colors: {
            primary: "bg-primary-500",
          },
        },
      });

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
