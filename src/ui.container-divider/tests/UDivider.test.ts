import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDivider from "../UDivider.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("UDivider", () => {
  describe("Props", () => {
    it("No props – shows only one divider when no label, icon, or slot content is provided", () => {
      const component = mount(UDivider);

      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(1);
    });

    it("Label – renders with label prop", () => {
      const label = "Divider Label";

      const component = mount(UDivider, {
        props: {
          label,
        },
      });

      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(2);
      expect(component.text()).toContain(label);
    });

    it("Label – prioritizes label over icon when both are provided", () => {
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

    it("Icon – renders with icon prop", () => {
      const icon = "star";

      const component = mount(UDivider, {
        props: {
          icon,
        },
      });

      const dividers = component.findAll("[vl-key='divider']");
      const iconComponent = component.findComponent(UIcon);

      expect(dividers.length).toBe(2);
      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(icon);
    });

    it("Size – applies correct size classes", () => {
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

    it("Color – applies correct color classes", () => {
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

    it("Dashed – applies dashed class when dashed prop is true", () => {
      const dashed = true;
      const expectedClass = "border-dashed";

      const component = mount(UDivider, {
        props: {
          dashed,
        },
      });

      expect(component.find(`[vl-key='divider']`).classes()).toContain(expectedClass);
    });

    it("Dotted – applies dotted class when dotted prop is true", () => {
      const dotted = true;
      const expectedClass = "border-dotted";

      const component = mount(UDivider, {
        props: {
          dotted,
        },
      });

      expect(component.find(`[vl-key='divider']`).classes()).toContain(expectedClass);
    });

    it("Vertical – applies vertical classes when vertical prop is true", () => {
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

        expect(component.classes()).toContain(classes.wrapper);
        expect(component.find("[vl-key='divider']").classes()).toContain(classes.divider);
      });
    });

    it("Data Test – applies data-test attribute", () => {
      const dataTest = "divider-test";

      const component = mount(UDivider, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content in default slot", () => {
      const slotClass = "custom-content";
      const slotContent = "Custom Content";

      const component = mount(UDivider, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      const dividers = component.findAll("[vl-key='divider']");

      expect(dividers.length).toBe(2);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });

    it("Default – provides label and icon-name bindings to default slot", () => {
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

  describe("Exposed refs", () => {
    it("Wrapper – exposes wrapperRef", () => {
      const component = mount(UDivider);

      expect(component.vm.wrapperRef).toBeDefined();
      expect(component.vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
