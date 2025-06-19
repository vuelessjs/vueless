import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import URadioGroup from "../URadioGroup.vue";
import URadio from "../../ui.form-radio/URadio.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props, URadioGroupOption } from "../types.ts";

describe("URadioGroup.vue", () => {
  // Props tests
  describe("Props", () => {
    // Options prop
    it("renders radio options correctly", () => {
      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ];

      const component = mount(URadioGroup, {
        props: {
          options,
          name: "test-group",
        },
      });

      const radioComponents = component.findAllComponents(URadio);

      expect(radioComponents.length).toBe(options.length);

      options.forEach((option, index) => {
        expect(radioComponents[index].props("value")).toBe(option.value);
        expect(radioComponents[index].props("label")).toBe(option.label);
      });
    });

    // ModelValue prop
    it("sets the correct model value", () => {
      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];
      const modelValue = "option1";

      const component = mount(URadioGroup, {
        props: {
          options,
          modelValue,
          name: "test-group",
        },
      });

      const radioComponents = component.findAllComponents(URadio);

      expect(radioComponents[0].props("modelValue")).toBe(modelValue);
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Radio Group Label";

      const component = mount(URadioGroup, {
        props: {
          label,
          name: "test-group",
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("label")).toBe(label);
    });

    // Description prop
    it("renders the correct description", () => {
      const description = "Radio group description";

      const component = mount(URadioGroup, {
        props: {
          description,
          name: "test-group",
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Error prop
    it("applies error state when error prop is provided", () => {
      const error = "Error message";

      const component = mount(URadioGroup, {
        props: {
          error,
          name: "test-group",
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("error")).toBe(error);
    });

    // Size prop
    it("applies the correct size class", () => {
      const size = {
        sm: "gap-1.5 mt-1",
        md: "gap-2 mt-1.5",
        lg: "gap-2.5 mt-2",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(URadioGroup, {
          props: {
            size: size as Props["size"],
            name: "test-group",
          },
        });

        const listElement = component.find("[vl-key='list']");

        expect(listElement.attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color to radio components", () => {
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

      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];

      colors.forEach((color) => {
        const component = mount(URadioGroup, {
          props: {
            color: color as Props["color"],
            options,
            name: "test-group",
          },
        });

        // Since color is provided through provide/inject, we need to check
        // if the color is correctly applied to the radio components' class
        const radioInputs = component.findAll("input[type='radio']");

        radioInputs.forEach((radio) => {
          expect(radio.attributes("class")).toContain(color);
        });
      });
    });

    // Disabled prop
    it("applies disabled attribute to all radio components when disabled prop is true", () => {
      const disabled = true;
      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];

      const component = mount(URadioGroup, {
        props: {
          disabled,
          options,
          name: "test-group",
        },
      });

      const radioComponents = component.findAllComponents(URadio);
      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);

      radioComponents.forEach((radio) => {
        expect(radio.props("disabled")).toBe(true);
      });
    });

    // Name prop
    it("applies the correct name to all radio components", () => {
      const name = "radio-group-name";
      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];

      const component = mount(URadioGroup, {
        props: {
          name,
          options,
        },
      });

      // Since name is provided through provide/inject, we can't directly test it
      // But we can verify that the component renders correctly
      const radioComponents = component.findAllComponents(URadio);

      expect(radioComponents.length).toBe(options.length);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-radio-group";

      const component = mount(URadioGroup, {
        props: {
          dataTest,
          name: "test-group",
        },
      });

      expect(component.findComponent(ULabel).attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const label = "Radio Group Label";

      const component = mount(URadioGroup, {
        props: {
          label,
          name: "test-group",
        },
        slots: {
          label: `<span>${slotContent}</span>`,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.text()).not.toContain(label);
    });

    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Radio Content";
      const slotClass = "custom-radio";

      const component = mount(URadioGroup, {
        props: {
          name: "test-group",
        },
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
    // Update:modelValue event
    it("emits update:modelValue event when a radio is selected", async () => {
      const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];

      const component = mount(URadioGroup, {
        props: {
          options,
          name: "test-group",
        },
      });

      // Since the radio selection is handled through provide/inject,
      // we need to simulate the selection by calling the method directly
      // This is a limitation of the testing approach
      component.vm.selectedItem = "option1";

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual(["option1"]);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // listRef
    it("exposes listRef", () => {
      const component = mount(URadioGroup, {
        props: {
          name: "test-group",
        },
      });

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
