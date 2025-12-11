import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UText from "../UText.vue";

import type { Props } from "../types";

describe("UText.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size class", async () => {
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

    it("Align – applies the correct align class", async () => {
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

    it("Variant – applies the correct variant class", async () => {
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

    it("Line – applies line class when line prop is true", () => {
      const line = true;

      const component = mount(UText, {
        props: {
          line,
        },
      });

      expect(component.attributes("class")).toContain("leading-none");
    });

    it("Wrap – applies text-nowrap class when wrap prop is false", () => {
      const wrap = false;

      const component = mount(UText, {
        props: {
          wrap,
        },
      });

      expect(component.attributes("class")).toContain("text-nowrap");
    });

    it("Label – renders the correct label content", () => {
      const label = "Text label";

      const component = mount(UText, {
        props: {
          label,
        },
      });

      expect(component.html()).toContain(label);
    });

    it("renders the correct HTML tag", () => {
      const tags = ["div", "p", "span", "section", "article"];

      tags.forEach((tag) => {
        const component = mount(UText, {
          props: {
            tag,
          },
        });

        expect(component.element.tagName.toLowerCase()).toBe(tag);
      });
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-text";

      const component = mount(UText, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    it("Config – applies custom classes from config prop", () => {
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

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UText, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });

    it("Default slot overrides label – default slot overrides label prop", () => {
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

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UText, {});

      expect(component.vm.textRef).toBeDefined();
    });
  });
});
