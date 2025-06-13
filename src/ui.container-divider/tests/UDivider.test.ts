import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDivider from "../UDivider.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types.ts";

describe("UDivider", () => {
  // Props
  describe("Props", () => {
    // Label prop
    it("renders with label prop", () => {
      const label = "Divider Label";

      const wrapper = mount(UDivider, {
        props: {
          label,
        },
      });

      expect(wrapper.text()).toContain(label);
    });

    // Icon prop
    it("renders with icon prop", () => {
      const icon = "star";

      const wrapper = mount(UDivider, {
        props: {
          icon,
        },
      });

      const iconComponent = wrapper.findComponent(UIcon);

      expect(iconComponent.exists()).toBe(true);
      expect(iconComponent.props("name")).toBe(icon);
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
        const wrapper = mount(UDivider, {
          props: {
            size: size as Props["size"],
          },
        });

        const dividerElement = wrapper.find("[class*='border-t']");

        expect(dividerElement.classes()).toContain(classes);
      });
    });

    // Color prop
    it("applies correct color classes", () => {
      const colorClasses = {
        primary: "text-primary",
        secondary: "text-secondary",
        error: "text-error",
        warning: "text-warning",
        success: "text-success",
        info: "text-info",
        notice: "text-notice",
        neutral: "text-lifted",
        grayscale: "text-grayscale",
      };

      Object.entries(colorClasses).forEach(([color, classes]) => {
        const label = "Test";

        const wrapper = mount(UDivider, {
          props: {
            color: color as Props["color"],
            label,
          },
        });

        expect(wrapper.find(`[class*='${classes}']`).exists()).toBe(true);
      });
    });

    // Dashed prop
    it("applies dashed class when dashed prop is true", () => {
      const dashed = true;

      const wrapper = mount(UDivider, {
        props: {
          dashed,
        },
      });

      expect(wrapper.find(".border-dashed").exists()).toBe(true);
    });

    // Dotted prop
    it("applies dotted class when dotted prop is true", () => {
      const dotted = true;

      const wrapper = mount(UDivider, {
        props: {
          dotted,
        },
      });

      expect(wrapper.find(".border-dotted").exists()).toBe(true);
    });

    // Vertical prop
    it("applies vertical classes when vertical prop is true", () => {
      const vertical = true;

      const wrapper = mount(UDivider, {
        props: {
          vertical,
        },
      });

      // Check wrapper has flex-col class
      expect(wrapper.classes()).toContain("flex-col");

      // Check divider has border-l instead of border-t
      expect(wrapper.find("[class*='border-l']").exists()).toBe(true);
      expect(wrapper.find("[class*='border-t']").exists()).toBe(false);
    });

    // DataTest prop
    it("applies data-test attribute", () => {
      const dataTest = "divider-test";

      const wrapper = mount(UDivider, {
        props: {
          dataTest,
        },
      });

      expect(wrapper.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots
  describe("Slots", () => {
    // Default slot
    it("renders content in default slot", () => {
      const slotClass = "custom-content";
      const slotContent = "Custom Content";
      const wrapper = mount(UDivider, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(wrapper.find(`.${slotClass}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(slotContent);
    });

    it("provides label and icon-name bindings to default slot", () => {
      const label = "Test Label";
      const icon = "star";
      const wrapper = mount(UDivider, {
        props: { label, icon },
        slots: {
          default: `
            <template #default="{ label, iconName }">
              <div class="custom-content" :data-label="label" :data-icon="iconName"></div>
            </template>
          `,
        },
      });

      const slotContent = wrapper.find(".custom-content");

      expect(slotContent.exists()).toBe(true);
      expect(slotContent.attributes("data-label")).toBe(label);
      expect(slotContent.attributes("data-icon")).toBe(icon);
    });
  });

  // Conditional rendering
  describe("Conditional rendering", () => {
    // Label section visibility
    it("shows label section when label prop is provided", () => {
      const label = "Test Label";

      const wrapper = mount(UDivider, {
        props: {
          label,
        },
      });

      // Should have two divider elements (before and after label)
      const dividers = wrapper.findAll("[class*='border-']");

      expect(dividers.length).toBe(2);
      expect(wrapper.text()).toContain(label);
    });

    // Icon section visibility
    it("shows label section when icon prop is provided", () => {
      const icon = "star";

      const wrapper = mount(UDivider, {
        props: {
          icon,
        },
      });

      // Should have two divider elements (before and after icon)
      const dividers = wrapper.findAll("[class*='border-']");

      expect(dividers.length).toBe(2);
      expect(wrapper.findComponent(UIcon).exists()).toBe(true);
    });

    // Slot section visibility
    it("shows label section when default slot has content", () => {
      const slotContent = "Slot Content";

      const wrapper = mount(UDivider, {
        slots: {
          default: slotContent,
        },
      });

      // Should have two divider elements (before and after slot content)
      const dividers = wrapper.findAll("[class*='border-']");

      expect(dividers.length).toBe(2);
      expect(wrapper.text()).toContain(slotContent);
    });

    // Default divider visibility
    it("shows only one divider when no label, icon, or slot content is provided", () => {
      const wrapper = mount(UDivider);

      // Should have only one divider element
      const dividers = wrapper.findAll("[class*='border-']");

      expect(dividers.length).toBe(1);
    });

    // Priority of label over icon
    it("prioritizes label over icon when both are provided", () => {
      const label = "Test Label";
      const icon = "star";

      const wrapper = mount(UDivider, {
        props: {
          label,
          icon,
        },
      });

      expect(wrapper.text()).toContain(label);
      expect(wrapper.findComponent(UIcon).exists()).toBe(false);
    });
  });

  // Exposed refs
  describe("Exposed refs", () => {
    // WrapperRef
    it("exposes wrapperRef", () => {
      const wrapper = mount(UDivider);
      const vm = wrapper.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
