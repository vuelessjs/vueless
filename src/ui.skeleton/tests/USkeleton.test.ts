import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USkeleton from "../USkeleton.vue";

describe("USkeleton.vue", () => {
  // Props tests
  describe("Props", () => {
    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-skeleton";

      const component = mount(USkeleton, {
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
      const slotClass = "custom-content";

      const component = mount(USkeleton, {
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });
});
