import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UText from "../UText.vue";

import type { Props } from "../types";

describe("UText.vue", () => {
  // Props tests
  describe("Props", () => {
    // Size prop
    it("applies the correct size class", async () => {
      const size = {
        xs: "text-tiny",
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(size).forEach(([size, classes]) => {
        const component = mount(UText, {
          props: {
            size: size as Props["size"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Align prop
    it("applies the correct align class", async () => {
      const align = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      };

      Object.entries(align).forEach(([align, classes]) => {
        const component = mount(UText, {
          props: {
            align: align as Props["align"],
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
        "inherit",
        "text",
      ];

      colors.forEach((color) => {
        const component = mount(UText, {
          props: {
            color: color as Props["color"],
          },
        });

        color === "text"
          ? expect(component.attributes("class")).toContain("text-default")
          : expect(component.attributes("class")).toContain(color);
      });
    });

    // Variant prop
    it("applies the correct variant class", async () => {
      const variants = {
        default: "text-primary",
        lifted: "text-primary-lifted",
        accented: "text-primary-accented",
        muted: "text-primary/(--vl-disabled-opacity)",
      };

      Object.entries(variants).forEach(([variant, classes]) => {
        const component = mount(UText, {
          props: {
            variant: variant as Props["variant"],
            color: "primary",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Line prop
    it("applies line class when line prop is true", () => {
      const line = true;

      const component = mount(UText, {
        props: {
          line,
        },
      });

      expect(component.attributes("class")).toContain("leading-none");
    });

    // Wrap prop
    it("applies text-nowrap class when wrap prop is false", () => {
      const wrap = false;

      const component = mount(UText, {
        props: {
          wrap,
        },
      });

      expect(component.attributes("class")).toContain("text-nowrap");
    });

    // Label prop
    it("renders the correct label content", () => {
      const label = "Text label";

      const component = mount(UText, {
        props: {
          label,
        },
      });

      expect(component.html()).toContain(label);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-text";

      const component = mount(UText, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    // Config prop overriding classes
    it("applies custom classes from config prop", () => {
      const customClasses = "font-bold";

      const component = mount(UText, {
        props: {
          config: {
            wrapper: customClasses,
          },
        },
      });

      expect(component.attributes("class")).toContain(customClasses);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UText, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    // Default slot overrides label prop
    it("default slot overrides label prop", () => {
      const label = "Label Text";
      const slotContent = "Custom Content";

      const component = mount(UText, {
        props: {
          label,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.html()).not.toContain(label);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UText, {});

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
