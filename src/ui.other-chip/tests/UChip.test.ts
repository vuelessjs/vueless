import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UChip from "../UChip.vue";
import UDot from "../../ui.other-dot/UDot.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types.ts";

describe("UChip.vue", () => {
  // Props tests
  describe("Props", () => {
    // Color prop
    it("applies the correct color class to the dot", async () => {
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
        const component = mount(UChip, {
          props: {
            color: color as Props["color"],
          },
        });

        const dot = component.findComponent(UDot);

        expect(dot.props("color")).toBe(color);
      });
    });

    // Size prop
    it("applies the correct size to the dot", async () => {
      const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"];

      sizes.forEach((size) => {
        const component = mount(UChip, {
          props: {
            size: size as Props["size"],
          },
        });

        const dot = component.findComponent(UDot);

        expect(dot.props("size")).toBe(size);
      });
    });

    // Icon prop
    it("renders UIcon when icon prop is provided", () => {
      const icon = "close";

      const component = mount(UChip, {
        props: {
          icon,
        },
      });

      expect(component.findComponent(UDot).exists()).toBe(false);
      expect(component.findComponent(UIcon).exists()).toBe(true);
      expect(component.findComponent(UIcon).props("name")).toBe(icon);
    });

    // xPosition prop
    it("applies the correct xPosition class", async () => {
      const positions = {
        left: "left-px",
        right: "right-px",
      };

      Object.entries(positions).forEach(([position, expectedClass]) => {
        const component = mount(UChip, {
          props: {
            xPosition: position as Props["xPosition"],
          },
        });

        const chipWrapper = component.find("[class*='absolute transform']");

        expect(chipWrapper.attributes("class")).toContain(expectedClass);
      });
    });

    // yPosition prop
    it("applies the correct yPosition class", async () => {
      const positions = {
        top: "top-px",
        bottom: "bottom-px",
      };

      Object.entries(positions).forEach(([position, expectedClass]) => {
        const component = mount(UChip, {
          props: {
            yPosition: position as Props["yPosition"],
          },
        });

        const chipWrapper = component.find("[class*='absolute transform']");

        expect(chipWrapper.attributes("class")).toContain(expectedClass);
      });
    });

    // Inset prop
    it("applies the correct transform classes when inset is false", () => {
      const component = mount(UChip, {
        props: {
          inset: false,
          yPosition: "top",
          xPosition: "right",
        },
      });

      const chipWrapper = component.find("[class*='absolute transform']");

      expect(chipWrapper.attributes("class")).toContain("-translate-y-1/2");
      expect(chipWrapper.attributes("class")).toContain("translate-x-1/2");
    });

    it("does not apply transform classes when inset is true", () => {
      const component = mount(UChip, {
        props: {
          inset: true,
          yPosition: "top",
          xPosition: "right",
        },
      });

      const chipWrapper = component.find("[class*='absolute transform']");

      expect(chipWrapper.attributes("class")).not.toContain("-translate-y-1/2");
      expect(chipWrapper.attributes("class")).not.toContain("translate-x-1/2");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-chip";

      const component = mount(UChip, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UChip, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    // Chip slot
    it("renders content from chip slot", () => {
      const slotText = "Custom Chip";
      const slotClass = "custom-chip";

      const component = mount(UChip, {
        slots: {
          chip: `<div class="${slotClass}">${slotText}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotText);
      expect(component.findComponent(UDot).exists()).toBe(false);
    });
  });

  // Base rendering tests
  describe("Rendering", () => {
    it("renders as a div element", () => {
      const component = mount(UChip, {});

      expect(component.element.tagName.toLowerCase()).toBe("div");
    });

    it("has a wrapper with relative positioning", () => {
      const component = mount(UChip, {});

      expect(component.attributes("class")).toContain("relative");
    });

    it("renders UDot by default when no icon is provided", () => {
      const component = mount(UChip, {});

      expect(component.findComponent(UDot).exists()).toBe(true);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    it("applies default props when no props are provided", () => {
      const component = mount(UChip, {});
      const chipWrapper = component.find("[class*='absolute transform']");

      // Default values from config
      expect(component.findComponent(UDot).props("color")).toBe("primary");
      expect(component.findComponent(UDot).props("size")).toBe("md");
      expect(chipWrapper.attributes("class")).toContain("right-px");
      expect(chipWrapper.attributes("class")).toContain("top-px");
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UChip, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
