import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckbox from "../UCheckbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

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
        { trueValue: [1, 2, 3], falseValue: [] },
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

        expect(component.find("label").attributes("class")).toContain(color);
      });
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const component = mount(UCheckbox, {
        props: {
          disabled: true,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);
      expect(component.get("[vl-key='checkbox']").attributes("class")).toContain("disabled:");
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

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label Content";
      const label = "Default Label";

      const component = mount(UCheckbox, {
        props: {
          label,
        },
        slots: {
          label: `<span>${slotContent}</span>`,
        },
      });

      expect(component.text()).not.toContain(label);
      expect(component.text()).toContain(slotContent);
    });

    // Bottom slot
    it("renders content from bottom slot", () => {
      const slotContent = "Bottom Content";
      const label = "Test Label";

      const component = mount(UCheckbox, {
        props: {
          label,
        },
        slots: {
          bottom: slotContent,
        },
      });

      // Check that the slot content is rendered in the component
      expect(component.text()).toContain(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when checkbox is toggled", async () => {
      const component = mount(UCheckbox);

      await component.find("input").setValue(true);
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0]).toEqual([true]);
    });

    // input event
    it("emits input event when checkbox is toggled", async () => {
      const component = mount(UCheckbox);

      await component.find("input").setValue(true);
      expect(component.emitted("input")).toBeTruthy();
      expect(component.emitted("input")![0]).toEqual([true]);
    });
  });
});
