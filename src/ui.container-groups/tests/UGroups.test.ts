import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UGroups from "../UGroups.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("UGroups.vue", () => {
  // Props tests
  describe("Props", () => {
    // Gap prop
    it("applies correct gap classes", () => {
      const gaps = {
        none: "gap-0",
        xs: "gap-8",
        sm: "gap-10",
        md: "gap-12",
        lg: "gap-14",
        xl: "gap-16",
      };

      Object.entries(gaps).forEach(([gap, expectedClass]) => {
        const component = mount(UGroups, {
          props: {
            gap: gap as Props["gap"],
          },
        });

        expect(component.attributes("class")).toContain(expectedClass);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "groups-test";

      const component = mount(UGroups, {
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
      const slotClass = "default-content";
      const slotContent = "Default Content";

      const component = mount(UGroups, {
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
      const component = mount(UGroups);
      const vm = component.vm as ComponentPublicInstance & { wrapperRef: HTMLDivElement };

      expect(vm.wrapperRef).toBeDefined();
      expect(vm.wrapperRef instanceof HTMLDivElement).toBe(true);
    });
  });
});
