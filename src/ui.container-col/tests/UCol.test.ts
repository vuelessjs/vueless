import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UCol from "../UCol.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UCol.vue", () => {
  // Props tests
  describe("Props", () => {
    // Gap prop
    it("applies correct gap classes", () => {
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
    it("applies correct align classes", () => {
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
    it("applies correct content classes", () => {
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
    it("applies correct justify classes", () => {
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
    it("applies correct reverse classes", () => {
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
    it("applies correct wrap classes", () => {
      const wrap = true;

      const componentWrap = mount(UCol, {
        props: {
          wrap,
        },
      });

      expect(componentWrap.attributes("class")).toContain("flex-wrap");

      const componentNoWrap = mount(UCol, {
        props: {
          wrap: false,
        },
      });

      expect(componentNoWrap.attributes("class")).not.toContain("flex-wrap");
    });

    // Block prop
    it("applies correct block classes", () => {
      const block = true;

      const componentBlock = mount(UCol, {
        props: {
          block,
        },
      });

      expect(componentBlock.attributes("class")).toContain("w-full");

      const componentNoBlock = mount(UCol, {
        props: {
          block: false,
        },
      });

      expect(componentNoBlock.attributes("class")).not.toContain("w-full");
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
    it("renders content in default slot", () => {
      const slotContent = "Default Content";
      const slotClass = "default-content";

      const component = mount(UCol, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // wrapperRef
    it("exposes wrapperRef", () => {
      const component = mount(UCol);
      const vm = component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
