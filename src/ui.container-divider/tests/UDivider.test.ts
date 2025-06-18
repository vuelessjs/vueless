import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDivider from "../UDivider.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UDivider", () => {
  // Props
  describe("Props", () => {
    // Default divider visibility
    it("shows only one divider when no label, icon, or slot content is provided", () => {
      const component = mount(UDivider);

      // Should have only one divider element
      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(1);
    });

    // Label prop
    it("renders with label prop", () => {
      const label = "Divider Label";

      const component = mount(UDivider, {
        props: {
          label,
        },
      });

      // Should have two divider elements (before and after icon)
      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(2);
      expect(component.text()).toContain(label);
    });

    // Icon prop
    it("renders with icon prop", () => {
      const icon = "star";

      const component = mount(UDivider, {
        props: {
          icon,
        },
      });

      // Should have two divider elements (before and after icon)
      const dividers = component.findAll("[vl-key='divider']");
      const iconComponent = component.findComponent(UIcon);

      expect(dividers.length).toBe(2);
      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(icon);
    });

    // Priority of label over icon
    it("prioritizes label over icon when both are provided", () => {
      const label = "Test Label";
      const icon = "star";

      const component = mount(UDivider, {
        props: {
          label,
          icon,
        },
      });

      expect(component.text()).toContain(label);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    // Size prop
    it("applies correct size classes", () => {
      const sizeClasses = {
        xs: "border-t",
        sm: "border-t-[2px]",
        md: "border-t-[3px]",
        lg: "border-t-[4px]",
        xl: "border-t-[5px]",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UDivider, {
          props: {
            size: size as Props["size"],
          },
        });

        const dividerElement = component.find("[vl-key='divider']");

        expect(dividerElement.classes()).toContain(classes);
      });
    });

    // Color prop
    it("applies correct color classes", () => {
      const colorClasses = {
        primary: "border-primary",
        secondary: "border-secondary",
        error: "border-error",
        warning: "border-warning",
        success: "border-success",
        info: "border-info",
        notice: "border-notice",
        neutral: "border-muted",
        grayscale: "border-grayscale",
      };

      Object.entries(colorClasses).forEach(([color, classes]) => {
        const label = "Test";

        const component = mount(UDivider, {
          props: {
            color: color as Props["color"],
            label,
          },
        });

        expect(component.find(`[vl-key='divider']`).attributes("class")).toContain(classes);
      });
    });

    // Dashed prop
    it("applies dashed class when dashed prop is true", () => {
      const dashed = true;
      const expectedClass = "border-dashed";

      const component = mount(UDivider, {
        props: {
          dashed,
        },
      });

      expect(component.find(`[vl-key='divider']`).classes()).toContain(expectedClass);
    });

    // Dotted prop
    it("applies dotted class when dotted prop is true", () => {
      const dotted = true;
      const expectedClass = "border-dotted";

      const component = mount(UDivider, {
        props: {
          dotted,
        },
      });

      expect(component.find(`[vl-key='divider']`).classes()).toContain(expectedClass);
    });

    // Vertical prop
    it("applies vertical classes when vertical prop is true", () => {
      const verticalVariants = {
        true: {
          wrapper: "flex-col",
          divider: "border-l",
        },
        false: {
          wrapper: "flex-row",
          divider: "border-t",
        },
      };

      Object.entries(verticalVariants).forEach(([vertical, classes]) => {
        const component = mount(UDivider, {
          props: {
            vertical: vertical === "true",
          },
        });

        // Check component has correct flex class
        expect(component.classes()).toContain(classes.wrapper);

        // Check divider has correct border class
        expect(component.find("[vl-key='divider']").classes()).toContain(classes.divider);
      });
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "divider-test";

      const component = mount(UDivider, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "custom-content";
      const slotContent = "Custom Content";

      const component = mount(UDivider, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      // Should have two divider elements (before and after slot content)
      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(2);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    it("provides label and icon-name bindings to default slot", () => {
      const slotClass = "custom-content";
      const label = "Test Label";
      const icon = "star";

      const component = mount(UDivider, {
        props: { label, icon },
        slots: {
          default: `
            <template #default="{ label, iconName }">
              <div class="${slotClass}" :data-label="label" :data-icon="iconName"></div>
            </template>
          `,
        },
      });

      const slotContent = component.find(`.${slotClass}`);

      expect(slotContent.exists()).toBe(true);
      expect(slotContent.attributes("data-label")).toBe(label);
      expect(slotContent.attributes("data-icon")).toBe(icon);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UDivider);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
