import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import URadio from "../URadio.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("URadio.vue", () => {
  // Props tests
  describe("Props", () => {
    // Value prop
    it("sets the correct value", () => {
      const value = "test-value";

      const component = mount(URadio, {
        props: {
          value,
        },
      });

      expect(component.find("input").attributes("value")).toBe(value);
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Radio Label";

      const component = mount(URadio, {
        props: {
          label,
        },
      });

      expect(component.text()).toContain(label);
    });

    // LabelAlign prop
    it("applies the correct label alignment", () => {
      const labelAligns = ["left", "right"];

      labelAligns.forEach((labelAlign) => {
        const component = mount(URadio, {
          props: {
            labelAlign: labelAlign as Props["labelAlign"],
            label: "Test Label",
          },
        });

        const labelComponent = component.findComponent(ULabel);

        expect(labelComponent.props("align")).toBe(labelAlign);
      });
    });

    // Description prop
    it("renders the correct description", () => {
      const description = "Radio description";

      const component = mount(URadio, {
        props: {
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Error prop
    it("applies error state when error prop is provided", () => {
      const error = "Error message";

      const component = mount(URadio, {
        props: {
          error,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("error")).toBe(error);
    });

    // Name prop
    it("applies the correct name attribute", async () => {
      const name = "radio-name";

      const component = mount(URadio, {
        props: {
          name,
        },
        attachTo: document.body, // Attach to DOM to trigger lifecycle hooks
      });

      // Wait for the next tick to allow the onMounted hook to execute
      await component.vm.$nextTick();

      expect(component.find("input").attributes("name")).toBe(name);
    });

    // Size prop
    it("applies the correct size class", () => {
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

        expect(component.find("input").attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", () => {
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
          },
        });

        expect(component.find("input").attributes("class")).toContain(color);
      });
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(URadio, {
        props: {
          disabled,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);
    });

    // Checked prop
    it("applies checked attribute when checked prop is true", () => {
      const checked = true;

      const component = mount(URadio, {
        props: {
          checked,
        },
      });

      expect(component.find("input").attributes("checked")).toBeDefined();
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-radio-id";

      const component = mount(URadio, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-radio";

      const component = mount(URadio, {
        props: {
          dataTest,
        },
      });

      expect(component.find("input").attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const label = "Radio Label";

      const component = mount(URadio, {
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
      const slotClass = "bottom-content";
      const label = "Test Label"; // Add a label to make the bottom slot visible

      const component = mount(URadio, {
        props: {
          label, // Provide a label to make the condition true
        },
        slots: {
          bottom: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // The bottom slot is rendered within the ULabel component
      const labelComponent = component.findComponent(ULabel);

      // Check if the slot content is passed to the ULabel component
      expect(labelComponent.html()).toContain(slotClass);
      expect(labelComponent.html()).toContain(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when changed", async () => {
      const value = "test-value";

      const component = mount(URadio, {
        props: {
          value,
        },
      });

      await component.find("input").setValue(true);
      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([value]);
    });
  });
});
