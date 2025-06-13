import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDot from "../UDot.vue";

import type { Props } from "../types.ts";

describe("UDot.vue", () => {
  // Props tests
  describe("Props", () => {
    // Color prop
    it("applies the correct color class", async () => {
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
        const component = mount(UDot, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(`bg-${color}`);
      });
    });

    // Size prop
    it("applies the correct size class", async () => {
      const sizes = {
        "3xs": "size-0.25",
        "2xs": "size-0.5",
        xs: "size-1",
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
        xl: "size-3",
        "2xl": "size-3.5",
      };

      Object.entries(sizes).forEach(([size, expectedClass]) => {
        const component = mount(UDot, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(expectedClass);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-dot";

      const component = mount(UDot, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Base rendering tests
  describe("Rendering", () => {
    it("renders as a div element", () => {
      const component = mount(UDot, {});

      expect(component.element.tagName.toLowerCase()).toBe("div");
    });

    it("has rounded-full class by default", () => {
      const component = mount(UDot, {});

      expect(component.attributes("class")).toContain("rounded-full");
    });

    it("applies default color and size classes when no props are provided", () => {
      const component = mount(UDot, {});

      // Default color is "primary" and default size is "md"
      expect(component.attributes("class")).toContain("bg-primary");
      expect(component.attributes("class")).toContain("size-2");
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // dotRef
    it("exposes dotRef", () => {
      const component = mount(UDot, {});

      expect(component.vm.dotRef).toBeDefined();
    });
  });
});
