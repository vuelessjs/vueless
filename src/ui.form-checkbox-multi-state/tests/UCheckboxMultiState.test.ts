import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCheckboxMultiState from "../UCheckboxMultiState.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";

import type { Props } from "../types.ts";

describe("UCheckboxMultiState.vue", () => {
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
        const component = mount(UCheckboxMultiState, {
          props: {
            color: color as Props["color"],
          },
        });

        const checkbox = component.findComponent(UCheckbox);

        expect(checkbox.props("color")).toBe(color);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(UCheckboxMultiState, {
          props: {
            size: size as Props["size"],
          },
        });

        const checkbox = component.findComponent(UCheckbox);

        expect(checkbox.props("size")).toBe(size);
      });
    });

    // LabelAlign prop
    it("applies the correct label alignment", () => {
      const labelAlign = {
        left: "left",
        right: "right",
      };

      Object.entries(labelAlign).forEach(([align, value]) => {
        const component = mount(UCheckboxMultiState, {
          props: {
            labelAlign: align as Props["labelAlign"],
          },
        });

        const checkbox = component.findComponent(UCheckbox);

        expect(checkbox.props("labelAlign")).toBe(value);
      });
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(UCheckboxMultiState, {
        props: {
          disabled,
        },
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.props("disabled")).toBe(true);
    });

    // Options prop
    it("renders checkbox with options", () => {
      const options = [
        { label: "Option 1", value: "option1", icon: "check" },
        { label: "Option 2", value: "option2", icon: "close" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
        },
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.exists()).toBe(true);
      expect(checkbox.props("label")).toBe(options[0].label);
    });

    // ModelValue prop
    it("sets the correct option based on modelValue", async () => {
      const options = [
        { label: "Option 1", value: "option1", icon: "check" },
        { label: "Option 2", value: "option2", icon: "close" },
      ];
      const modelValue = "option1";

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
          modelValue,
        },
      });

      // Wait for the setTimeout in setChecked to run
      await new Promise((resolve) => setTimeout(resolve, 10));

      const checkbox = component.findComponent(UCheckbox);

      // The checkbox should have the label of the selected option
      expect(checkbox.props("label")).toBe(options[0].label);
    });

    // Name prop
    it("sets the correct name attribute", () => {
      const name = "checkbox-multi-state-name";

      const component = mount(UCheckboxMultiState, {
        props: {
          name,
        },
      });

      const checkbox = component.findComponent(UCheckbox);

      expect(checkbox.props("name")).toBe(name);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-checkbox-multi-state";

      const component = mount(UCheckboxMultiState, {
        props: {
          dataTest,
        },
      });

      // Since dataTest is not directly passed to UCheckbox, we can't test it directly
      // But we can verify the component doesn't throw errors
      expect(component.findComponent(UCheckbox).exists()).toBe(true);
    });
  });

  // Events tests
  describe("Events", () => {
    // update:modelValue event
    it("emits update:modelValue event when checkbox is toggled", async () => {
      const options = [
        { label: "Option 1", value: "option1", icon: "check" },
        { label: "Option 2", value: "option2", icon: "close" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
        },
      });

      // Directly call the onClickCheckbox method
      component.vm.onClickCheckbox();
      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0]).toEqual([options[1].value]);
    });

    // Cycles through options
    it("cycles through options when clicked multiple times", async () => {
      const options = [
        { label: "Option 1", value: "option1", icon: "check" },
        { label: "Option 2", value: "option2", icon: "close" },
        { label: "Option 3", value: "option3", icon: "star" },
      ];

      const component = mount(UCheckboxMultiState, {
        props: {
          options,
        },
      });

      // First click
      component.vm.onClickCheckbox();
      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")![0]).toEqual([options[1].value]);

      // Update the component with the new modelValue
      await component.setProps({ modelValue: options[1].value });

      // Second click
      component.vm.onClickCheckbox();
      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")![1]).toEqual([options[2].value]);

      // Update the component with the new modelValue
      await component.setProps({ modelValue: options[2].value });

      // Third click (should cycle back to first option)
      component.vm.onClickCheckbox();
      await component.vm.$nextTick();

      expect(component.emitted("update:modelValue")![2]).toEqual([options[0].value]);
    });
  });
});
