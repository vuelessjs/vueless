import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { nextTick } from "vue";

import URadioGroup from "../URadioGroup.vue";
import URadio from "../../ui.form-radio/URadio.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

describe("URadioGroup.vue", () => {
  const defaultOptions = [
    { label: "Email Notifications", value: "email" },
    { label: "SMS Alerts", value: "sms" },
    { label: "Push Notifications", value: "push" },
  ];
  const defaultName = "test-group";

  describe("Props", () => {
    it("Options - renders radios for each option", () => {
      const component = mount(URadioGroup, {
        props: {
          options: defaultOptions,
          name: defaultName,
        },
      });

      const radios = component.findAllComponents(URadio);

      expect(radios).toHaveLength(defaultOptions.length);

      radios.forEach((radio, index) => {
        expect(radio.props("label")).toBe(defaultOptions[index].label);
        expect(radio.props("value")).toBe(defaultOptions[index].value);
      });
    });

    it("Options – radio emits value on change", async () => {
      const updatedValue = "sms";

      const component = mount(URadioGroup, {
        props: {
          options: defaultOptions,
          name: "notification-preferences",
          modelValue: "",
        },
      });

      const radioInput = component.find(`input[type='radio'][value='${updatedValue}']`);

      await radioInput.setValue(true);

      await nextTick();

      expect(component.emitted("update:modelValue")![0][0]).toBe(updatedValue);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(URadioGroup, {
        props: {
          label: labelText,
          name: defaultName,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(URadioGroup, {
        props: {
          description: descriptionText,
          name: defaultName,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Error – passes error to ULabel component", () => {
      const errorText = "This is an error message";

      const component = mount(URadioGroup, {
        props: {
          error: errorText,
          name: defaultName,
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
        const component = mount(URadioGroup, {
          props: {
            size: size as Props["size"],
            name: defaultName,
            options: defaultOptions,
          },
        });

        const radioInput = component.getComponent(URadio).get("input");

        expect(radioInput.attributes("class")).toContain(classes);
      });
    });

    it("Name – sets the correct URadio name prop", async () => {
      const name = "radio-name";

      const component = mount(URadioGroup, {
        props: {
          name,
          options: defaultOptions,
        },
      });

      await flushPromises();

      component.findAllComponents("input").forEach((radio) => {
        expect(radio.attributes("name")).toBe(name);
      });
    });

    it("Color – sets correct URadio color prop", () => {
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
        const component = mount(URadioGroup, {
          props: {
            color: color as Props["color"],
            name: defaultName,
            options: defaultOptions,
          },
        });

        component.findAllComponents(URadio).forEach(async (radio) => {
          const radioInput = radio.get("input");

          await radioInput.trigger("input");

          expect(radioInput.attributes("class")).toContain(color);
        });
      });
    });

    it("Disabled – sets correct URadio disabled prop", () => {
      const component = mount(URadioGroup, {
        props: {
          disabled: true,
          name: defaultName,
          options: defaultOptions,
        },
      });

      component.findAllComponents(URadio).forEach((radio) => {
        expect(radio.props("disabled")).toBe(true);
      });
    });

    it("Data test  – sets correct data-test attribute to radios", () => {
      const dataTestValue = "radio";

      const component = mount(URadioGroup, {
        props: {
          "data-test": dataTestValue,
          name: defaultName,
          options: defaultOptions,
        },
      });

      component.findAllComponents(URadio).forEach((radio, idx) => {
        expect(radio.attributes("data-test")).toBe(`${dataTestValue}-item-${idx}-label`);
      });
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(URadioGroup, {
        props: {
          label: "Default Label",
          name: defaultName,
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

      const component = mount(URadioGroup, {
        props: {
          label: defaultLabel,
          name: defaultName,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      const labelComponent = component.getComponent(ULabel);
      const labelElement = labelComponent.find("[vl-child-key='label']");

      expect(labelElement.text()).toBe(`Modified ${defaultLabel}`);
    });

    it("Default slot – renders custom URadio components", () => {
      const component = mount(URadioGroup, {
        props: {
          modelValue: "",
          name: "custom-group",
        },
        slots: {
          default: `
            <URadio value="option1" label="Custom Option 1" />
            <URadio value="option2" label="Custom Option 2" />
            <URadio value="option3" label="Custom Option 3" />
          `,
        },
        global: {
          components: {
            URadio,
          },
        },
      });

      const radios = component.findAllComponents(URadio);

      expect(radios).toHaveLength(3);
      expect(radios[0].props("value")).toBe("option1");
      expect(radios[0].props("label")).toBe("Custom Option 1");
      expect(radios[1].props("value")).toBe("option2");
      expect(radios[1].props("label")).toBe("Custom Option 2");
      expect(radios[2].props("value")).toBe("option3");
      expect(radios[2].props("label")).toBe("Custom Option 3");
    });
  });

  describe("Exposed properties", () => {
    it("exposes listRef", () => {
      const component = mount(URadioGroup, {
        props: {
          name: defaultName,
        },
      });

      expect(component.vm.listRef).toBeDefined();
    });
  });
});
