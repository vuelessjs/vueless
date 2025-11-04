import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import URow from "../URow.vue";

import type { Props } from "../types";

describe("URow.vue", () => {
  describe("Props", () => {
    it("Gap – applies the correct gap class", () => {
      const gapClasses = {
        none: "gap-0",
        "2xs": "gap-1",
        xs: "gap-2",
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-5",
        xl: "gap-6",
        "2xl": "gap-8",
      };

      Object.entries(gapClasses).forEach(([gap, classes]) => {
        const component = mount(URow, {
          props: {
            gap: gap as Props["gap"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Align – applies the correct align class", () => {
      const alignClasses = {
        end: "items-end",
        start: "items-start",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };

      Object.entries(alignClasses).forEach(([align, classes]) => {
        const component = mount(URow, {
          props: {
            align: align as Props["align"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Content – applies the correct content class", () => {
      const contentClasses = {
        end: "content-end",
        start: "content-start",
        center: "content-center",
        around: "content-around",
        evenly: "content-evenly",
        normal: "content-normal",
        stretch: "content-stretch",
        between: "content-between",
        baseline: "content-baseline",
      };

      Object.entries(contentClasses).forEach(([content, classes]) => {
        const component = mount(URow, {
          props: {
            content: content as Props["content"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Justify – applies the correct justify class", () => {
      const justifyClasses = {
        end: "justify-end",
        start: "justify-start",
        center: "justify-center",
        around: "justify-around",
        evenly: "justify-evenly",
        between: "justify-between",
      };

      Object.entries(justifyClasses).forEach(([justify, classes]) => {
        const component = mount(URow, {
          props: {
            justify: justify as Props["justify"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Reverse – applies the correct reverse class", () => {
      const reverseClasses = {
        false: "flex-row",
        true: "flex-row-reverse",
      };

      Object.entries(reverseClasses).forEach(([reverse, classes]) => {
        const component = mount(URow, {
          props: {
            reverse: reverse === "true",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Wrap – applies the correct wrap class", () => {
      const wrap = true;
      const expectedClasses = "flex-wrap";

      const component = mount(URow, {
        props: {
          wrap,
        },
      });

      expect(component.attributes("class")).toContain(expectedClasses);
    });

    it("Block – applies the correct block class", () => {
      const block = true;
      const expectedClasses = "w-full";

      const component = mount(URow, {
        props: {
          block,
        },
      });

      expect(component.attributes("class")).toContain(expectedClasses);
    });

    it("Tag – renders the correct HTML tag", () => {
      const tags = ["div", "section", "article", "main", "aside", "nav", "span"];

      tags.forEach((tag) => {
        const component = mount(URow, {
          props: {
            tag,
          },
        });

        expect(component.element.tagName.toLowerCase()).toBe(tag);
      });
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "test-row";

      const component = mount(URow, {
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

      const component = mount(URow, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(URow);

      expect(component.vm.wrapperRef).toBeDefined();
      // wrapperRef is a reference to the wrapper div element, not a boolean
      expect(component.vm.wrapperRef instanceof HTMLElement).toBe(true);
    });
  });
});
