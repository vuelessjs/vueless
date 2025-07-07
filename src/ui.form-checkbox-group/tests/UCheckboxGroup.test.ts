import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import UCheckboxGroup from "../UCheckboxGroup.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types.ts";

describe("UCheckboxGroup.vue", () => {
  const defaultOptions = [
    { label: "Email Notifications", value: "email" },
    { label: "SMS Alerts", value: "sms" },
    { label: "Push Notifications", value: "push" },
  ];

  describe("Props", () => {
    it("Options - renders checkboxes for each option", () => {
      const component = mount(UCheckboxGroup, {
        props: {
          options: defaultOptions,
        },
      });

      const checkboxes = component.findAllComponents(UCheckbox);

      expect(checkboxes).toHaveLength(defaultOptions.length);

      checkboxes.forEach((checkbox, index) => {
        expect(checkbox.props("label")).toBe(defaultOptions[index].label);
        expect(checkbox.props("value")).toBe(defaultOptions[index].value);
      });
    });

    it("Options – checkbox emits value on change", async () => {
      const expectedValues = defaultOptions.map((option) => option.value);

      const component = mount(UCheckboxGroup, {
        props: {
          options: defaultOptions,
          name: "notification-preferences",
          modelValue: [],
        },
      });

      component.findAll("input[type='checkbox']").forEach(async (checkbox) => {
        await checkbox.setValue(true);
      });

      await nextTick();

      expect(component.emitted("update:modelValue")![1][0]).toEqual(expectedValues);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(UCheckboxGroup, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(UCheckboxGroup, {
        props: {
          description: descriptionText,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Error – passes error to ULabel component", () => {
      const errorText = "This is an error message";

      const component = mount(UCheckboxGroup, {
        props: {
          error: errorText,
        },
      });

      expect(component.getComponent(ULabel).props("error")).toBe(errorText);
    });

    it("Size – applies the correct size class", () => {
      const size = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UCheckboxGroup, {
          props: {
            size: size as Props["size"],
            options: defaultOptions,
          },
        });

        const checkboxInput = component.getComponent(UCheckbox).get("input");

        expect(checkboxInput.attributes("class")).toContain(classes);
      });
    });

    it("Name – sets the correct UCheckbox name prop", async () => {
      const name = "checkbox-name";

      const component = mount(UCheckboxGroup, {
        props: {
          name,
          options: defaultOptions,
        },
      });

      await flushPromises();

      component.findAllComponents("input").forEach((checkbox) => {
        expect(checkbox.attributes("name")).toBe(name);
      });
    });

    it("Color – sets correct UCheckbox color prop", () => {
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
            options: defaultOptions,
          },
        });

        component.findAllComponents(UCheckbox).forEach(async (checkbox) => {
          const checkboxInput = checkbox.get("input");

          await checkboxInput.trigger("input");

          expect(checkboxInput.attributes("class")).toContain(color);
        });
      });
    });

    it("Disabled – sets correct UCheckbox disabled prop", () => {
      const component = mount(UCheckboxGroup, {
        props: {
          disabled: true,
          options: defaultOptions,
        },
      });

      component.findAllComponents(UCheckbox).forEach((checkbox) => {
        expect(checkbox.props("disabled")).toBe(true);
      });
    });

    it("Data test  – sets correct data-test attribute to checkboxes", () => {
      const dataTestValue = "checkbox";

      const component = mount(UCheckboxGroup, {
        props: {
          "data-test": dataTestValue,
          options: defaultOptions,
        },
      });

      component.findAllComponents(UCheckbox).forEach((checkbox, idx) => {
        expect(checkbox.attributes("data-test")).toBe(`${dataTestValue}-item-${idx}-label`);
      });
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(UCheckboxGroup, {
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

      const component = mount(UCheckboxGroup, {
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

    it("Default slot – renders custom UCheckbox components", () => {
      const component = mount(UCheckboxGroup, {
        props: {
          modelValue: [],
          name: "custom-group",
        },
        slots: {
          default: `
            <UCheckbox value="option1" label="Custom Option 1" />
            <UCheckbox value="option2" label="Custom Option 2" />
            <UCheckbox value="option3" label="Custom Option 3" />
          `,
        },
        global: {
          components: {
            UCheckbox,
          },
        },
      });

      const checkboxes = component.findAllComponents(UCheckbox);

      expect(checkboxes).toHaveLength(3);

      expect(checkboxes[0].props("value")).toBe("option1");
      expect(checkboxes[0].props("label")).toBe("Custom Option 1");
      expect(checkboxes[1].props("value")).toBe("option2");
      expect(checkboxes[1].props("label")).toBe("Custom Option 2");
      expect(checkboxes[2].props("value")).toBe("option3");
      expect(checkboxes[2].props("label")).toBe("Custom Option 3");
    });
  });

  describe("Exposed properties", () => {
    it("exposes listRef", () => {
      const component = mount(UCheckboxGroup);

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
