import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import UKey from "../UKey.vue";

import type { Props } from "../types";
import type { ComponentPublicInstance } from "vue";

describe("UKey.vue", () => {
  describe("Props", () => {
    it("Value – displays the correct value", () => {
      const value = "K";

      const component = mount(UKey, {
        props: {
          value,
        },
      });

      expect(component.text()).toBe(value);
    });

    it("Value – displays system key symbols", () => {
      const systemKeys = {
        command: "⌘",
        shift: "⇧",
        alt: "⌥",
        ctrl: "⌃",
        enter: "↵",
        escape: "⎋",
        tab: "⇥",
      };

      Object.entries(systemKeys).forEach(([key, symbol]) => {
        const component = mount(UKey, {
          props: {
            value: key,
          },
        });

        expect(component.text()).toBe(symbol);
      });
    });

    it("Size – applies the correct size class", () => {
      const sizes = {
        sm: "h-4",
        md: "h-5",
        lg: "h-6",
      };

      Object.entries(sizes).forEach(([size, classes]) => {
        const component = mount(UKey, {
          props: {
            size: size as Props["size"],
            value: "K",
          },
        });

        expect(component.attributes("class")).toContain(classes);
      });
    });

    it("Variant – applies the correct variant class", () => {
      const variants = ["solid", "outlined", "subtle", "soft"];

      variants.forEach((variant) => {
        const component = mount(UKey, {
          props: {
            variant: variant as Props["variant"],
            value: "K",
          },
        });

        expect(component.attributes("class")).toBeDefined();
      });
    });

    it("Color – applies the correct color class", () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
        "notice",
        "neutral",
        "grayscale",
      ];

      colors.forEach((color) => {
        const component = mount(UKey, {
          props: {
            color: color as Props["color"],
            value: "K",
          },
        });

        expect(component.attributes("class")).toContain(color);
      });
    });

    it("DataTest – applies the correct data-test attribute", () => {
      const dataTest = "test-key";

      const component = mount(UKey, {
        props: {
          dataTest,
          value: "K",
        },
      });

      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
      const slotContent = "Custom Key";

      const component = mount(UKey, {
        props: {
          value: "K",
        },
        slots: {
          default: slotContent,
        },
      });

      expect(component.text()).toBe(slotContent);
    });
  });

  describe("Exposed refs", () => {
    it("keyRef – exposes keyRef", () => {
      const component = mount(UKey, {
        props: {
          value: "K",
        },
      });

      expect(
        (component.vm as ComponentPublicInstance & { keyRef: HTMLElement }).keyRef,
      ).toBeDefined();
    });
  });
});
