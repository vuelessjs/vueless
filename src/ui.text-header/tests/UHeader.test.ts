import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UHeader from "../UHeader.vue";

import type { Props } from "../types";

describe("UHeader.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size class", async () => {
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

    it("Color – applies the correct color class", async () => {
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
        "text",
      ];

      colors.forEach((color) => {
        const component = mount(UHeader, {
          props: {
            color: color as Props["color"],
          },
        });

        color === "text"
          ? expect(component.attributes("class")).toContain("text-default")
          : expect(component.attributes("class")).toContain(color);
      });
    });

    it("Variant – applies the correct variant class", async () => {
      const variants = {
        default: "text-primary",
        lifted: "text-primary-lifted",
        accented: "text-primary-accented",
        muted: "text-primary/(--vl-disabled-opacity)",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UHeader, {
          props: {
            variant: variant as Props["variant"],
            color: "primary",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Weight – applies the correct weight class", async () => {
      const weights = {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      };

      Object.entries(weights).forEach(([weight, classes]) => {
        const component = mount(UHeader, {
          props: {
            weight: weight as Props["weight"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Label – renders the correct label text", () => {
      const label = "Header Text";

      const component = mount(UHeader, {
        props: {
          label,
        },
      });

      expect(component.text()).toBe(label);
    });

    it("Tag – renders the correct HTML tag", () => {
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

    it("Line – applies line class when line prop is true", () => {
      const line = true;
      const lineClasses = "leading-none";

      const component = mount(UHeader, {
        props: {
          line,
        },
      });

      expect(component.attributes("class")).toContain(lineClasses);
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-header";

      const component = mount(UHeader, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
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

  describe("Exposed refs", () => {
    it("headerRef – exposes headerRef", () => {
      const component = mount(UHeader, {});

      expect(component.vm.headerRef).toBeDefined();
    });
  });
});
