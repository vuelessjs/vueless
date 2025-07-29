import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UBoilerplate from "../UBoilerplate.vue";
import defaultConfig from "../config.ts";

describe("UBoilerplate.vue", () => {
  describe("Props", () => {
    it("Data Test – accepts the dataTest prop", () => {
      const dataTest = "test-boilerplate";

      const component = mount(UBoilerplate, {
        props: {
          dataTest,
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });

    it("Config – applies custom config when provided", () => {
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
});
