import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import URow from "../URow.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types.ts";

describe("URow.vue", () => {
  // Props tests
  describe("Props", () => {
    // Gap prop
    it("applies the correct gap class", () => {
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

    // Align prop
    it("applies the correct align class", () => {
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

    // Content prop
    it("applies the correct content class", () => {
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

    // Justify prop
    it("applies the correct justify class", () => {
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

    // Reverse prop
    it("applies the correct reverse class", () => {
      const reverseClasses = {
        false: "flex-row",
        true: "flex-row-reverse",
      };

      const componentWithReverse = mount(URow, {
        props: {
          reverse: true,
        },
      });

      expect(componentWithReverse.attributes("class")).toContain(reverseClasses.true);

      const componentWithoutReverse = mount(URow, {
        props: {
          reverse: false,
        },
      });

      expect(componentWithoutReverse.attributes("class")).toContain(reverseClasses.false);
    });

    // Wrap prop
    it("applies the correct wrap class", () => {
      const componentWithWrap = mount(URow, {
        props: {
          wrap: true,
        },
      });

      expect(componentWithWrap.attributes("class")).toContain("flex-wrap");

      const componentWithoutWrap = mount(URow, {
        props: {
          wrap: false,
        },
      });

      expect(componentWithoutWrap.attributes("class")).not.toContain("flex-wrap");
    });

    // Block prop
    it("applies the correct block class", () => {
      const componentWithBlock = mount(URow, {
        props: {
          block: true,
        },
      });

      expect(componentWithBlock.attributes("class")).toContain("w-full");

      const componentWithoutBlock = mount(URow, {
        props: {
          block: false,
        },
      });

      expect(componentWithoutBlock.attributes("class")).not.toContain("w-full");
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-row";

      const component = mount(URow, {
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

      const component = mount(URow, {
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
      const component = mount(URow);
      const vm = component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
