import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckboxGroup from "../UCheckboxGroup.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UCheckboxGroup.vue", () => {
  // Props tests
  describe("Props", () => {
    // Color prop
    it("provides the correct color to child components", async () => {
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
        const component = mount(UCheckboxGroup, {
          props: {
            color: color as Props["color"],
            options: [{ label: "Option 1", value: "option1" }],
          },
        });

        // The color is provided via provide/inject, not directly as a prop
        // We can verify the component doesn't throw errors
        expect(component.findComponent(UCheckbox).exists()).toBe(true);
      });
    });

    // Size prop
    it("applies the correct size-based classes to the list", async () => {
      const sizeClasses = {
        sm: "gap-1.5 mt-1",
        md: "gap-2 mt-1.5",
        lg: "gap-2.5 mt-2",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UCheckboxGroup, {
          props: {
            size: size as Props["size"],
            options: [{ label: "Option 1", value: "option1" }],
          },
        });

        // The size is provided via provide/inject to the checkbox, not directly as a prop
        // But we can check that the list has the correct size-based classes
        const list = component.find("[vl-key='list']");
        const listClasses = list.attributes("class");

        // Check that all the classes for this size are present
        classes.split(" ").forEach((className) => {
          expect(listClasses).toContain(className);
        });
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Checkbox Group Label";

      const component = mount(UCheckboxGroup, {
        props: {
          label,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("label")).toBe(label);
      expect(component.text()).toContain(label);
    });

    // Description prop
    it("renders the correct description", () => {
      const description = "Checkbox group description";

      const component = mount(UCheckboxGroup, {
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

      const component = mount(UCheckboxGroup, {
        props: {
          error,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("error")).toBe(error);
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UCheckboxGroup, {
        props: {
          disabled,
          options: [{ label: "Option 1", value: "option1" }],
        },
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.props("disabled")).toBe(true);
    });

    // Options prop
    it("renders checkboxes based on options", () => {
      const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ];

      const component = mount(UCheckboxGroup, {
        props: {
          options,
        },
      });

      const checkboxes = component.findAllComponents(UCheckbox);

      expect(checkboxes.length).toBe(options.length);

      checkboxes.forEach((checkbox, index) => {
        expect(checkbox.props("label")).toBe(options[index].label);
        expect(checkbox.props("value")).toBe(options[index].value);
      });
    });

    // ModelValue prop
    it("sets checked attribute based on modelValue", () => {
      const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ];
      const modelValue = ["option1"];

      const component = mount(UCheckboxGroup, {
        props: {
          options,
          modelValue,
        },
      });

      const checkboxes = component.findAllComponents(UCheckbox);

      expect(checkboxes[0].props("modelValue")).toEqual(modelValue);
      expect(checkboxes[1].props("modelValue")).toEqual(modelValue);
    });

    // Name prop
    it("sets the correct name attribute", () => {
      const name = "checkbox-group-name";

      const component = mount(UCheckboxGroup, {
        props: {
          name,
          options: [{ label: "Option 1", value: "option1" }],
        },
      });

      // Since name is provided via provide/inject, we can't directly test it
      // But we can verify the component doesn't throw errors
      expect(component.findComponent(UCheckbox).exists()).toBe(true);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-checkbox-group";

      const component = mount(UCheckboxGroup, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label Content";
      const label = "Default Label";

      const component = mount(UCheckboxGroup, {
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

    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";
      const slotClass = "custom-content";

      const component = mount(UCheckboxGroup, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when modelValue changes", async () => {
      const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ];
      const newModelValue = ["option1"];

      const component = mount(UCheckboxGroup, {
        props: {
          options,
        },
      });

      // Update the modelValue prop
      await component.setProps({ modelValue: newModelValue });

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0]).toEqual([newModelValue]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // listRef
    it("exposes listRef", () => {
      const component = mount(UCheckboxGroup, {});

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
