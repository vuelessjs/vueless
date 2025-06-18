import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCol from "../UCol.vue";

import type { Props } from "../types.ts";

describe("UCol.vue", () => {
  // Props tests
  describe("Props", () => {
    // Gap prop
    it("applies the correct gap class", () => {
      const gapClasses = {
        none: "gap-0",
        "3xs": "gap-0.5",
        "2xs": "gap-1",
        xs: "gap-2",
        sm: "gap-3",
        md: "gap-4",
        lg: "gap-5",
        xl: "gap-6",
        "2xl": "gap-7",
        "3xl": "gap-8",
      };

      Object.entries(gapClasses).forEach(([gap, classes]) => {
        const component = mount(UCol, {
          props: {
            gap: gap as Props["gap"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Align prop
    it("applies the correct align class", () => {
      const alignClasses = {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };

      Object.entries(alignClasses).forEach(([align, classes]) => {
        const component = mount(UCol, {
          props: {
            align: align as Props["align"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Content prop
    it("applies the correct content class", () => {
      const contentClasses = {
        start: "content-start",
        end: "content-end",
        center: "content-center",
        around: "content-around",
        evenly: "content-evenly",
        between: "content-between",
        normal: "content-normal",
        stretch: "content-stretch",
        baseline: "content-baseline",
      };

      Object.entries(contentClasses).forEach(([content, classes]) => {
        const component = mount(UCol, {
          props: {
            content: content as Props["content"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Justify prop
    it("applies the correct justify class", () => {
      const justifyClasses = {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        around: "justify-around",
        evenly: "justify-evenly",
        between: "justify-between",
      };

      Object.entries(justifyClasses).forEach(([justify, classes]) => {
        const component = mount(UCol, {
          props: {
            justify: justify as Props["justify"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Reverse prop
    it("applies the correct reverse class", () => {
      const reverseClasses = {
        true: "flex-col-reverse",
        false: "flex-col",
      };

      Object.entries(reverseClasses).forEach(([reverse, classes]) => {
        const component = mount(UCol, {
          props: {
            reverse: reverse === "true",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Wrap prop
    it("applies the correct wrap class", () => {
      const wrap = true;
      const expectedClasses = "flex-wrap";

      const component = mount(UCol, {
        props: {
          wrap,
        },
      });

      expect(component.attributes("class")).toContain(expectedClasses);
    });

    // Block prop
    it("applies the correct block class", () => {
      const block = true;
      const expectedClasses = "w-full";

      const component = mount(UCol, {
        props: {
          block,
        },
      });

      expect(component.attributes("class")).toContain(expectedClasses);
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "col-test";

      const component = mount(UCol, {
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

      const component = mount(UCol, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toContain(slotContent);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UCol);

      expect(component.vm.wrapperRef).toBeDefined();
      // wrapperRef is a reference to the wrapper div element, not a boolean
      expect(component.vm.wrapperRef instanceof HTMLElement).toBe(true);
    });
  });
});
