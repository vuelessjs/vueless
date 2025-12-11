import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UDot from "../UDot.vue";

import type { Props } from "../types";
import type { ComponentPublicInstance } from "vue";

describe("UDot.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size class", () => {
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

    it("Color – applies the correct color class", () => {
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

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-dot";

      const component = mount(UDot, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Exposed refs", () => {
    it("dotRef – exposes dotRef", () => {
      const component = mount(UDot);

      expect(
        (component.vm as ComponentPublicInstance & { dotRef: HTMLDivElement }).dotRef,
      ).toBeDefined();
    });
  });
});
