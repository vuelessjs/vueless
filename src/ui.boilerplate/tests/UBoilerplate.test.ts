import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UBoilerplate from "../UBoilerplate.vue";
import defaultConfig from "../config.ts";

describe("UBoilerplate.vue", () => {
  // Props tests
  describe("Props", () => {
    // DataTest prop
    it("accepts the dataTest prop", () => {
      const dataTest = "test-boilerplate";

      const component = mount(UBoilerplate, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    // Config prop
    it("applies custom config when provided", () => {
      const customClass = "custom-class";
      const config = {
        wrapper: customClass,
      };

      const component = mount(UBoilerplate, {
        props: {
          config,
        },
      });

      expect(component.attributes("class")).toContain(customClass);
      // The default config is merged with the custom config, not replaced
      expect(component.attributes("class")).toContain(defaultConfig.wrapper);
    });
  });

  /*
  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Content";

      const component = mount(UBoilerplate, {
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).not.toBe("Boilerplate");
      expect(component.text()).toBe(slotContent);
    });
  });
  */
});
