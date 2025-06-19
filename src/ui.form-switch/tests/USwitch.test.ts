import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USwitch from "../USwitch.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("USwitch.vue", () => {
  // Props tests
  describe("Props", () => {
    // ModelValue prop
    it("sets the correct model value", () => {
      const modelValue = true;

      const component = mount(USwitch, {
        props: {
          modelValue,
        },
      });

      expect(component.find("input").element.checked).toBe(modelValue);
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Switch Label";

      const component = mount(USwitch, {
        props: {
          label,
        },
      });

      expect(component.text()).toContain(label);
    });

    // LabelAlign prop
    it("applies the correct label alignment", () => {
      const labelAligns = ["top", "left", "right"];

      labelAligns.forEach((labelAlign) => {
        const component = mount(USwitch, {
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
      const description = "Switch description";

      const component = mount(USwitch, {
        props: {
          description,
        },
      });

      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("description")).toBe(description);
    });

    // Size prop
    it("applies the correct size class", () => {
      const size = {
        sm: "w-6",
        md: "w-8",
        lg: "w-10",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(USwitch, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.find("label").attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class when checked", () => {
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

    // ToggleIcon prop
    it("shows toggle icon when toggleIcon prop is true", () => {
      const toggleIcon = true;
      const modelValue = true;

      const component = mount(USwitch, {
        props: {
          toggleIcon,
          modelValue,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe("check");
    });

    // ToggleIcon prop (false state)
    it("shows correct toggle icon when switch is off", () => {
      const toggleIcon = true;
      const modelValue = false;

      const component = mount(USwitch, {
        props: {
          toggleIcon,
          modelValue,
        },
      });

      const iconComponent = component.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe("close");
    });

    // ToggleLabel prop
    it("shows toggle label when toggleLabel prop is true", () => {
      const toggleLabel = true;
      const modelValue = true;

      const component = mount(USwitch, {
        props: {
          toggleLabel,
          modelValue,
        },
      });

      const toggleLabelElement = component.find("[vl-key='toggleLabel']");

      expect(toggleLabelElement.exists()).toBe(true);
      expect(toggleLabelElement.text()).toBe("On");
    });

    // ToggleLabel prop (false state)
    it("shows correct toggle label when switch is off", () => {
      const toggleLabel = true;
      const modelValue = false;

      const component = mount(USwitch, {
        props: {
          toggleLabel,
          modelValue,
        },
      });

      const toggleLabelElement = component.find("[vl-key='toggleLabel']");

      expect(toggleLabelElement.exists()).toBe(true);
      expect(toggleLabelElement.text()).toBe("Off");
    });

    // Disabled prop
    it("applies disabled attribute when disabled prop is true", () => {
      const disabled = true;

      const component = mount(USwitch, {
        props: {
          disabled,
        },
      });

      expect(component.find("input").attributes("disabled")).toBeDefined();
      const labelComponent = component.findComponent(ULabel);

      expect(labelComponent.props("disabled")).toBe(true);
      expect(component.find("label").attributes("class")).toContain("pointer-events-none");
    });

    // ID prop
    it("applies the correct id attribute", () => {
      const id = "test-switch-id";

      const component = mount(USwitch, {
        props: {
          id,
        },
      });

      expect(component.find("input").attributes("id")).toBe(id);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-switch";

      const component = mount(USwitch, {
        props: {
          dataTest,
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
      const label = "Switch Label";

      const component = mount(USwitch, {
        props: {
          label,
        },
        slots: {
          label: `<span>${slotContent}</span>`,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.text()).not.toContain(label);
    });
  });

  // Events tests
  describe("Events", () => {
    // Update:modelValue event
    it("emits update:modelValue event when clicked", async () => {
      const component = mount(USwitch, {
        props: {
          modelValue: false,
        },
      });

      await component.find("input").setValue(true);

      expect(component.emitted("update:modelValue")).toBeTruthy();
      expect(component.emitted("update:modelValue")[0]).toEqual([true]);
    });

    // No update:modelValue event when disabled
    it("does not emit update:modelValue event when disabled", async () => {
      const disabled = true;

      const component = mount(USwitch, {
        props: {
          disabled,
          modelValue: false,
        },
      });

      await component.find("label").trigger("click");

      expect(component.emitted("update:modelValue")).toBeFalsy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(USwitch, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
