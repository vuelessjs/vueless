import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULabel from "../ULabel.vue";

import type { Props } from "../types.ts";

describe("ULabel.vue", () => {
  // Props tests
  describe("Props", () => {
    // Label prop
    it("renders the correct label text", () => {
      const label = "Label Text";

      const component = mount(ULabel, {
        props: {
          label,
        },
      });

      expect(component.text()).toContain(label);
    });

    // For prop
    it("applies the correct for attribute", () => {
      const forId = "input-id";

      const component = mount(ULabel, {
        props: {
          for: forId,
          label: "Label", // Add label to ensure label element is rendered
        },
      });

      // Check if the component passes the for prop to the label element
      expect(component.html()).toContain(`for="${forId}"`);
    });

    // Description prop
    it("renders the description text", () => {
      const description = "This is a description";

      const component = mount(ULabel, {
        props: {
          description,
        },
      });

      expect(component.text()).toContain(description);
    });

    // Error prop
    it("renders the error message", () => {
      const error = "This field is required";

      const component = mount(ULabel, {
        props: {
          error,
        },
      });

      expect(component.text()).toContain(error);
    });

    // Interactive prop
    it("applies interactive class when interactive prop is true", () => {
      const interactive = true;

      const component = mount(ULabel, {
        props: {
          interactive,
          label: "Label",
        },
      });

      const labelElement = component.find("label");

      expect(labelElement.attributes("class")).toContain("hover:cursor-pointer");
    });

    // Align prop
    it("applies the correct alignment class", () => {
      const alignClasses = {
        top: "flex-col",
        topInside: "flex-col gap-0 relative",
        topWithDesc: "flex-col-reverse",
        left: "flex-row-reverse",
        right: "flex-row",
      };

      Object.entries(alignClasses).forEach(([align, classes]) => {
        const component = mount(ULabel, {
          props: {
            align: align as Props["align"],
            label: "Label",
          },
        });

        // Check if the component's HTML contains the expected class for this alignment
        expect(component.html()).toContain(classes);
      });
    });

    // Size prop
    it("applies the correct size class", () => {
      const sizes = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(ULabel, {
          props: {
            size: size as Props["size"],
            label: "Label",
          },
        });

        const labelElement = component.find("label");

        expect(labelElement.attributes("class")).toContain(classes);
      });
    });

    // Disabled prop
    it("applies disabled class when disabled prop is true", () => {
      const disabled = true;

      const component = mount(ULabel, {
        props: {
          disabled,
          label: "Label",
        },
      });

      const labelElement = component.find("label");

      expect(labelElement.attributes("class")).toContain("cursor-not-allowed");
    });

    // Centred prop
    it("applies centred class when centred prop is true", () => {
      const centred = true;

      const component = mount(ULabel, {
        props: {
          centred,
          label: "Label",
          align: "left",
        },
      });

      // Use the exposed wrapperElement ref to check the class
      expect(component.vm.wrapperElement.className).toContain("items-center");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-label";

      const component = mount(ULabel, {
        props: {
          dataTest,
          label: "Label",
        },
      });

      const wrapper = component.find("[data-test]");

      expect(wrapper.attributes("data-test")).toContain(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Default Slot Content";
      const slotClass = "default-content";

      const component = mount(ULabel, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });

    // Label slot
    it("renders content from label slot", () => {
      const slotContent = "Custom Label";
      const label = "Default Label";
      const slotClass = "custom-label";

      const component = mount(ULabel, {
        props: {
          label,
        },
        slots: {
          label: `<span class="${slotClass}">${slotContent}</span>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.text()).not.toContain(label);
    });

    // Bottom slot
    it("renders content from bottom slot", () => {
      const slotContent = "Bottom Content";
      const slotClass = "bottom-content";

      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
        slots: {
          bottom: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("emits click event when label is clicked", async () => {
      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      const labelElement = component.find("label");

      await labelElement.trigger("click");

      expect(component.emitted("click")).toBeTruthy();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // labelElement
    it("exposes labelElement", () => {
      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      expect(component.vm.labelElement).toBeDefined();
    });

    // wrapperElement
    it("exposes wrapperElement", () => {
      const component = mount(ULabel, {
        props: {
          label: "Label",
        },
      });

      expect(component.vm.wrapperElement).toBeDefined();
    });
  });
});
