import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckbox from "../UCheckbox.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UCheckbox.vue", () => {
  // Props tests
  describe("Props", () => {
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
        const component = mount(UCheckbox, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.find("input").attributes("class")).toContain(color);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
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

        expect(component.find("input").attributes("class")).toContain(classes);
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Checkbox Label";

      const component = mount(UCheckbox, {
        props: {
          label,
        },
      });

      expect(component.text()).toContain(label);
    });

    // Label align prop
    it("applies the correct label alignment", () => {
      const labelAlign = {
        left: "left",
        right: "right",
      };

      Object.entries(labelAlign).forEach(([align, value]) => {
        const component = mount(UCheckbox, {
          props: {
            labelAlign: align as Props["labelAlign"],
            label: "Test Label",
          },
        });

        const labelComponent = component.findComponent(ULabel);

        expect(labelComponent.props("align")).toBe(value);
      });
    });

    // Description prop
    it("renders the correct description", () => {
      const description = "Checkbox description";

      const component = mount(UCheckbox, {
        props: {
          label: "Test Label",
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Error prop
    it("applies error class when error prop is provided", () => {
      const error = "Error message";

      const component = mount(UCheckbox, {
        props: {
          error,
        },
      });

      const input = component.find("input");

      expect(input.attributes("class")).toContain("!border-error");
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UCheckbox, {
        props: {
          disabled,
        },
      });

      const input = component.find("input");

      expect(input.attributes("disabled")).toBeDefined();
    });

    // Partial prop
    it("renders partial icon when partial prop is true and checkbox is checked", async () => {
      const partial = true;
      const modelValue = true;

      const component = mount(UCheckbox, {
        props: {
          partial,
          modelValue,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.props("name")).toBe("remove");
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-checkbox-id";

      const component = mount(UCheckbox, {
        props: {
          id,
        },
      });

      const input = component.find("input");

      expect(input.attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-checkbox";

      const component = mount(UCheckbox, {
        props: {
          dataTest,
        },
      });

      const input = component.find("input");

      expect(input.attributes("data-test")).toBe(dataTest);
    });

    // ModelValue prop
    it("sets checked attribute based on modelValue", () => {
      const modelValue = true;

      const component = mount(UCheckbox, {
        props: {
          modelValue,
        },
      });

      const input = component.find("input");

      expect(input.attributes("checked")).toBeDefined();
    });

    // Value prop
    it("sets the correct value attribute", () => {
      const value = "checkbox-value";

      const component = mount(UCheckbox, {
        props: {
          value,
        },
      });

      const input = component.find("input");

      expect(input.attributes("value")).toBe(value);
    });

    // TrueValue and FalseValue props
    it("sets the correct true-value and false-value attributes", () => {
      const trueValue = "yes";
      const falseValue = "no";

      const component = mount(UCheckbox, {
        props: {
          trueValue,
          falseValue,
        },
      });

      const input = component.find("input");

      expect(input.attributes("true-value")).toBe(trueValue);
      expect(input.attributes("false-value")).toBe(falseValue);
    });

    // Name prop
    it("sets the correct name attribute", async () => {
      const name = "checkbox-name";

      const component = mount(UCheckbox, {
        props: {
          name,
        },
      });

      // Wait for onMounted hook to run
      await component.vm.$nextTick();

      const input = component.find("input");

      expect(input.attributes("name")).toBe(name);
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
