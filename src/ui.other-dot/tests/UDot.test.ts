import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDot from "../UDot.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UDot.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", () => {
      const sizes = {
        xs: "size-1",
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
        xl: "size-3",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UDot, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Color prop
    it("applies the correct color class", () => {
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

        expect(component.attributes("class")).toContain(color);
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

  // Exposed refs tests
  describe("Exposed refs", () => {
    // dotRef
    it("exposes dotRef", () => {
      const component = mount(UDot);

      expect(
        (component.vm as ComponentPublicInstance & { dotRef: HTMLDivElement }).dotRef,
      ).toBeDefined();
    });
  });
});
