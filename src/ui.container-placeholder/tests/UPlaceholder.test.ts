import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UPlaceholder from "../UPlaceholder.vue";

import type { Props } from "../types";

describe("UPlaceholder.vue", () => {
  describe("Props", () => {
    it("Size – applies the correct size class", () => {
      const sizeClasses = {
        sm: "text-small",
        md: "text-medium",
        lg: "text-large",
      };

      Object.entries(sizeClasses).forEach(([size, classes]) => {
        const component = mount(UPlaceholder, {
          props: {
            size: size as Props["size"],
            label: "Test",
          },
        });

        const labelElement = component.find("span");

        expect(labelElement.attributes("class")).toContain(classes);
      });
    });

    it("Rounded – applies the correct rounded class", () => {
      const roundedClasses = {
        sm: "rounded-small",
        md: "rounded-medium",
        lg: "rounded-large",
        none: "rounded-none",
      };

      Object.entries(roundedClasses).forEach(([rounded, classes]) => {
        const component = mount(UPlaceholder, {
          props: {
            rounded: rounded as Props["rounded"],
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Dashed – applies the correct border class", () => {
      const dashed = true;
      const expectedClass = "border-dashed";

      const component = mount(UPlaceholder, {
        props: {
          dashed,
        },
      });

      expect(component.attributes("class")).toContain(expectedClass);
    });

    it("Dotted – applies the correct border class", () => {
      const dotted = true;
      const expectedClass = "border-dotted";

      const component = mount(UPlaceholder, {
        props: {
          dotted,
        },
      });

      expect(component.attributes("class")).toContain(expectedClass);
    });

    it("Border – applies solid border class by default", () => {
      const expectedClass = "border-solid";

      const component = mount(UPlaceholder, {
        props: {
          dashed: false,
          dotted: false,
        },
      });

      expect(component.attributes("class")).toContain(expectedClass);
    });

    it("Color – applies the correct color class", () => {
      const color = "primary";

      const component = mount(UPlaceholder, {
        props: {
          color,
        },
      });

      expect(component.attributes("class")).toContain(`border-${color}`);
    });

    it("Label – renders the correct label text", () => {
      const label = "Test Label";

      const component = mount(UPlaceholder, {
        props: {
          label,
        },
      });

      expect(component.text()).toContain(label);
    });

    it("Label – sets aria-label from label prop", () => {
      const label = "Test Area";

      const component = mount(UPlaceholder, {
        props: {
          label,
        },
      });

      expect(component.attributes("aria-label")).toBe(label);
    });

    it("Label – sets default aria-label when no label provided", () => {
      const component = mount(UPlaceholder);

      expect(component.attributes("aria-label")).toBe("Placeholder area");
    });

    it("Role – applies the correct role attribute", () => {
      const component = mount(UPlaceholder);

      expect(component.attributes("role")).toBe("region");
    });

    it("Data Test – applies the correct data-test attribute", () => {
      const dataTest = "custom-test-id";

      const component = mount(UPlaceholder, {
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

      const component = mount(UPlaceholder, {
        slots: {
          default: `<div class='${slotClass}'>${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.text()).toContain(slotContent);
    });
  });

  describe("Exposed refs", () => {
    it("wrapperRef – exposes wrapperRef", () => {
      const component = mount(UPlaceholder);

      expect(component.vm.wrapperRef).toBeDefined();
    });
  });
});
