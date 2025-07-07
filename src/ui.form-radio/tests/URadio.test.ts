import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import URadio from "../URadio.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("URadio.vue", () => {
  describe("Props", () => {
    it("Model Value – updates with correct value when radio is checked", async () => {
      const testValue = "test-value";

      const component = mount(URadio, {
        props: {
          modelValue: false,
          value: testValue,
        },
      });

      const inputElement = component.find("input");

      await inputElement.setValue(true);

      expect(component.emitted("update:modelValue")![0][0]).toBe(testValue);
    });

    it("Value – returns correct value type when radio is checked", async () => {
      const testValues = ["string-value", 42, true, { id: 1, name: "test" }, [1, 2, 3]];

      testValues.forEach(async (testValue) => {
        const component = mount(URadio, {
          props: {
            value: testValue,
            modelValue: [],
          },
        });

        const inputElement = component.find("input");

        await inputElement.setValue(true);

        expect(component.emitted("update:modelValue")![0][0]).toEqual(testValue);
      });
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(URadio, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(URadio, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(URadio, {
        props: {
          description: descriptionText,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Size – applies the correct size class", () => {
      const size = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(URadio, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.get("[vl-key='radio']").attributes("class")).toContain(classes);
      });
    });

    it("Color – applies the correct color class when checked", () => {
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
        const component = mount(URadio, {
          props: {
            color: color as Props["color"],
            modelValue: true,
          },
        });

        expect(component.get("[vl-key='radio']").attributes("class")).toContain(color);
      });
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const disabledOpacityVar = "--vl-disabled-opacity";

      const component = mount(URadio, {
        props: {
          disabled: true,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);
      const radioInput = component.get("[vl-key='radio']");

      expect(labelComponent.props("disabled")).toBe(true);
      expect(radioInput.attributes("class")).toContain(disabledOpacityVar);
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-switch-id";

      const component = mount(URadio, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-radio";
      const labelDataTest = "test-radio-label";

      const component = mount(URadio, {
        props: {
          label: "Test",
          dataTest,
        },
      });

      expect(component.findComponent(ULabel).attributes("data-test")).toBe(labelDataTest);
      expect(component.get("input").attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(URadio, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("label");

      expect(labelElement.text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(URadio, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("label");

      expect(labelElement.text()).toBe(`Modified ${defaultLabel}`);
    });

    it("Bottom – renders custom content from bottom slot", () => {
      const customBottomContent = "Custom Bottom Content";

      const component = mount(URadio, {
        props: {
          label: "Test Label",
        },
        slots: {
          bottom: customBottomContent,
        },
      });

      const labelComponent = component.getComponent(ULabel);

      expect(labelComponent.text()).toContain(customBottomContent);
    });
  });
});
