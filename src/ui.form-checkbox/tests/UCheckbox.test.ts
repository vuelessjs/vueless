import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckbox from "../UCheckbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

describe("UCheckbox.vue", () => {
  describe("Props", () => {
    it("Model Value – sets the correct model value", async () => {
      const modelValue = true;

      const component = mount(UCheckbox, {
        props: {
          modelValue,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const inputElement = component.find("input");

      await inputElement.trigger("change");

      expect(component.emitted("update:modelValue")![0][0]).toBe(false);

      await inputElement.trigger("change");

      expect(component.emitted("update:modelValue")![1][0]).toBe(true);
    });

    it("Value – returns correct value type when checkbox is checked", async () => {
      const testValues = ["string-value", 42, true, { id: 1, name: "test" }, [1, 2, 3]];

      testValues.forEach(async (testValue) => {
        const component = mount(UCheckbox, {
          props: {
            value: testValue,
            modelValue: [],
          },
        });

        const inputElement = component.find("input");

        await inputElement.setValue(true);

        const emittedValues = component.emitted("update:modelValue");

        expect(emittedValues![0][0]).toEqual([testValue]);
      });
    });

    it("TrueValue and FalseValue – returns correct values when checkbox is checked and unchecked", async () => {
      const testValuePairs = [
        { trueValue: "checked", falseValue: "unchecked" },
        { trueValue: 1, falseValue: 0 },
        { trueValue: { status: "active" }, falseValue: { status: "inactive" } },
        { trueValue: true, falseValue: false },
      ];

      testValuePairs.forEach(async ({ trueValue, falseValue }) => {
        const component = mount(UCheckbox, {
          props: {
            trueValue,
            falseValue,
            modelValue: falseValue,
          },
        });

        const inputElement = component.find("input");

        await inputElement.setValue(true);
        let emittedValues = component.emitted("update:modelValue");

        expect(emittedValues![0][0]).toEqual(trueValue);

        await component.setProps({ modelValue: trueValue });

        await inputElement.setValue(false);
        emittedValues = component.emitted("update:modelValue");

        expect(emittedValues![1][0]).toEqual(falseValue);
      });
    });

    it("Partial – displays correct icon when checkbox is partially checked", () => {
      const normalComponent = mount(UCheckbox, {
        props: {
          modelValue: true,
          partial: false,
        },
      });

      const normalIcon = normalComponent.findComponent(UIcon);

      expect(normalIcon.props("name")).toBe("check");

      const partialComponent = mount(UCheckbox, {
        props: {
          modelValue: true,
          partial: true,
        },
      });

      const partialIcon = partialComponent.findComponent(UIcon);

      expect(partialIcon.props("name")).toBe("remove");
    });

    it("Name – sets the correct name attribute", async () => {
      const name = "checkbox-name";

      const component = mount(UCheckbox, {
        props: {
          name,
        },
      });

      await flushPromises();

      expect(component.find("input").attributes("name")).toBe(name);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(UCheckbox, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(UCheckbox, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(UCheckbox, {
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
        const component = mount(UCheckbox, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.get("[vl-key='checkbox']").attributes("class")).toContain(classes);
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
        const component = mount(UCheckbox, {
          props: {
            color: color as Props["color"],
            modelValue: true,
          },
        });

        expect(component.get("[vl-key='checked']").attributes("class")).toContain(`bg-${color}`);
      });
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const disabledOpacityVar = "--vl-disabled-opacity";

      const component = mount(UCheckbox, {
        props: {
          disabled: true,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);
      const checkboxInput = component.get("[vl-key='checkbox']");

      expect(labelComponent.props("disabled")).toBe(true);
      expect(checkboxInput.attributes("class")).toContain(disabledOpacityVar);
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-switch-id";

      const component = mount(UCheckbox, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-checkbox";
      const labelDataTest = "test-checkbox-label";

      const component = mount(UCheckbox, {
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

      const component = mount(UCheckbox, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("[vl-child-key='label']");

      expect(labelElement.text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(UCheckbox, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("[vl-child-key='label']");

      expect(labelElement.text()).toBe(`Modified ${defaultLabel}`);
    });

    it("Bottom – renders custom content from bottom slot", () => {
      const customBottomContent = "Custom Bottom Content";

      const component = mount(UCheckbox, {
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

  describe("Events", () => {
    it("Input – emits input event when checkbox is toggled", async () => {
      const component = mount(UCheckbox);

      await component.find("input").setValue(true);

      expect(component.emitted("input")![0]).toEqual([true]);
    });
  });
});
