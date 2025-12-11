import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import USkeleton from "../USkeleton.vue";

describe("USkeleton.vue", () => {
  describe("Props", () => {
    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-skeleton";

      const component = mount(USkeleton, {
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
