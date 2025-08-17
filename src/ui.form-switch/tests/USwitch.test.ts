import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USwitch from "../USwitch.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("USwitch.vue", () => {
  describe("Props", () => {
    it("Model Value – sets the correct model value", async () => {
      const modelValue = true;

      const component = mount(USwitch, {
        props: {
          modelValue,
          "onUpdate:modelValue": (e) => component.setProps({ modelValue: e }),
        },
      });

      const inputElement = component.find("input");

      await inputElement.trigger("click");

      expect(component.emitted("update:modelValue")![0][0]).toBe(false);

      await inputElement.trigger("click");

      expect(component.emitted("update:modelValue")![1][0]).toBe(true);
    });

    it("Label – passes label to ULabel component", () => {
      const labelText = "Test Label";

      const component = mount(USwitch, {
        props: {
          label: labelText,
        },
      });

      expect(component.getComponent(ULabel).props("label")).toBe(labelText);
    });

    it("Label Align – passes labelAlign prop to ULabel component", () => {
      const labelAlign = "left";

      const component = mount(USwitch, {
        props: {
          label: "Test Label",
          labelAlign,
        },
      });

      expect(component.getComponent(ULabel).props("align")).toBe(labelAlign);
    });

    it("Description – passes description to ULabel component", () => {
      const descriptionText = "This is a description";

      const component = mount(USwitch, {
        props: {
          description: descriptionText,
        },
      });

      expect(component.getComponent(ULabel).props("description")).toBe(descriptionText);
    });

    it("Size – applies the correct size class", () => {
      const size = {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USwitch, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.get("[vl-key='circle']").attributes("class")).toContain(classes);
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
        const component = mount(USwitch, {
          props: {
            color: color as Props["color"],
            modelValue: true,
          },
        });

        expect(component.find("label").attributes("class")).toContain(color);
      });
    });

    it("Toggle Icon – shows toggle icon when toggleIcon prop is true", () => {
      const component = mount(USwitch, {
        props: {
          toggleIcon: true,
          modelValue: true,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.props("name")).toBe("check");
    });

    it("Toggle Icon – shows correct toggle icon when switch is off", () => {
      const component = mount(USwitch, {
        props: {
          toggleIcon: true,
          modelValue: false,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.props("name")).toBe("close");
    });

    it("Toggle Label – shows toggle icon when toggleLabel prop is true", () => {
      const component = mount(USwitch, {
        props: {
          toggleLabel: true,
          modelValue: true,
        },
      });

      expect(component.find("[vl-key='toggleLabel']").text()).toBe("On");
    });

    it("Toggle Label – shows correct toggle label when switch is off", () => {
      const component = mount(USwitch, {
        props: {
          toggleLabel: true,
          modelValue: false,
        },
      });

      expect(component.find("[vl-key='toggleLabel']").text()).toBe("Off");
    });

    it("Disabled – applies disabled attribute when disabled prop is true", () => {
      const component = mount(USwitch, {
        props: {
          disabled: true,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);
      expect(component.find("label").attributes("class")).toContain("pointer-events-none");
    });

    it("Id – applies the correct id attribute", () => {
      const id = "test-switch-id";

      const component = mount(USwitch, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-switch";

      const component = mount(USwitch, {
        props: {
          dataTest,
        },
      });

      expect(component.findComponent(ULabel).attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Label – renders custom content from label slot", () => {
      const customLabelContent = "Custom Label Content";

      const component = mount(USwitch, {
        props: {
          label: "Default Label",
        },
        slots: {
          label: customLabelContent,
        },
      });

      expect(component.findAll("label")[1].text()).toBe(customLabelContent);
    });

    it("Label – exposes label prop to slot", () => {
      const defaultLabel = "Test Label";

      const component = mount(USwitch, {
        props: {
          label: defaultLabel,
        },
        slots: {
          label: "Modified {{ params.label }}",
        },
      });

      expect(component.findAll("label")[1].text()).toBe(`Modified ${defaultLabel}`);
    });
  });

  describe("Exposed properties", () => {
    it("Wrapper element – exposes wrapperRef", () => {
      const component = mount(USwitch);

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
