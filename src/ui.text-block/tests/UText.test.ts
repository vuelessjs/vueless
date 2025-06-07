import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UText from "../UText.vue";

import type { Props } from "../types.ts";

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

    // HTML prop
    it("renders the correct HTML content", () => {
      const html = "<strong>Bold Text</strong>";

      const component = mount(UText, {
        props: {
          html,
        },
      });

      expect(component.html()).toContain(html);
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
      const customClasses = "text-red-500 font-bold";

      const component = mount(UText, {
        props: {
          config: {
            wrapper: customClasses,
          },
        },
      });

      expect(component.attributes("class")).toContain(customClasses);
    });

    // Config prop overriding default props
    it("overrides default props via config prop", () => {
      const size = "lg";
      const align = "center";
      const line = true;

      const component = mount(UText, {
        props: {
          config: {
            defaults: {
              size,
              align,
              line,
            },
          },
        },
      });

      // Check that size is overridden from default "md" to "lg"
      expect(component.attributes("class")).toContain("text-large");
      expect(component.attributes("class")).not.toContain("text-medium");

      // Check that align is overridden from default "left" to "center"
      expect(component.attributes("class")).toContain("text-center");
      expect(component.attributes("class")).not.toContain("text-left");

      // Check that line is overridden from default false to true
      expect(component.attributes("class")).toContain("leading-none");
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

    // Default slot overrides html prop
    it("default slot overrides html prop", () => {
      const html = "<strong>Bold Text</strong>";
      const slotContent = "Custom Content";

      const component = mount(UText, {
        props: {
          html,
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
      expect(component.html()).not.toContain(html);
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
