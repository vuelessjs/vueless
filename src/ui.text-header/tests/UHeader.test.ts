import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UHeader from "../UHeader.vue";

import type { Props } from "../types.ts";

describe("UHeader.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
        "2xl": "text-5xl",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UHeader, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

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
        const component = mount(UHeader, {
          props: {
            color: color as Props["color"],
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    // Label prop
    it("renders the correct label text", () => {
      const label = "Header Text";

      const component = mount(UHeader, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    // Tag prop
    it("renders the correct HTML tag", () => {
      const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span"];

      tags.forEach((tag) => {
        const component = mount(UHeader, {
          props: {
            tag,
          },
        });

        expect(component.element.tagName.toLowerCase()).toBe(tag);
      });
    });

    // Line prop
    it("applies line class when line prop is true", () => {
      const line = true;
      const lineClasses = "leading-none";

      const component = mount(UHeader, {
        props: {
          line,
        },
      });

      expect(component.attributes("class")).toContain(lineClasses);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-header";

      const component = mount(UHeader, {
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
      const label = "Header";

      const component = mount(UHeader, {
        props: {
          label,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).not.toContain(label);
      expect(component.text()).toContain(slotContent);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // headerRef
    it("exposes headerRef", () => {
      const component = mount(UHeader, {});

      expect(component.vm.headerRef).toBeDefined();
    });
  });
});
