import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { h } from "vue";

import UIcon from "../UIcon.vue";

import type { ComponentPublicInstance } from "vue";
import type { Props } from "../types";

describe("UIcon.vue", () => {
  // Wait for an async component to load
  function sleep(ms: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Props tests
  describe("Props", () => {
    // Name prop
    it("renders different icons based on name prop", async () => {
      const names = ["check", "close", "info", "warning"];

      for (const name of names) {
        const component = mount(UIcon, {
          props: {
            name,
          },
        });

        await sleep();
        expect(component.attributes("data-name")).toContain(name);
      }
    });

    // Src prop
    it("renders component with custom render function", () => {
      const name = "custom-svg";

      // Create mock component with render function
      const mockComponent = {
        render: () => {
          return h("svg", { "data-name": name }, "Custom Content");
        },
        [Symbol.toStringTag]: "Module",
      };

      const component = mount(UIcon, {
        props: {
          src: mockComponent as unknown as Props["src"],
        },
      });

      expect(component.attributes("data-name")).toBe(name);
    });

    // Edge case, no src and name
    it("doesn't render when neither name nor src is provided", () => {
      // Vue adds a comment node as a placeholder when using v-if
      const expectedHTML = "<!--v-if-->";

      const component = mount(UIcon, {
        props: {},
      });

      expect(component.html()).toBe(expectedHTML);
    });

    // Color prop
    it("accepts color prop", () => {
      const name = "check";
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
        "inherit",
      ];

      colors.forEach(async (color) => {
        const component = mount(UIcon, {
          props: {
            name,
            color: color as Props["color"],
          },
        });

        await sleep();
        expect(component.attributes("class")).toContain(color);
      });
    });

    // Size prop
    it("applies the correct size class", () => {
      const name = "check";
      const sizes = {
        "4xs": "size-2.5",
        "3xs": "size-3",
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
        "2xl": "size-12",
        "3xl": "size-14",
        "4xl": "size-16",
        "5xl": "size-20",
      };

      Object.entries(sizes).forEach(async ([size, classes]) => {
        const component = mount(UIcon, {
          props: {
            name,
            size: size as Props["size"],
          },
        });

        await sleep();
        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Variant prop
    it("applies the correct variant class", () => {
      const name = "check";
      const variants = {
        light: "brightness-125",
        default: "brightness-100",
        dark: "brightness-75",
      };

      Object.entries(variants).forEach(async ([variant, classes]) => {
        const component = mount(UIcon, {
          props: {
            name,
            variant: variant as Props["variant"],
          },
        });

        await sleep();
        expect(component.attributes("class")).toContain(classes);
      });
    });

    // Interactive prop
    it("accepts interactive prop", async () => {
      const name = "check";
      const interactive = true;
      const interactiveClass = "cursor-pointer";

      const component = mount(UIcon, {
        props: {
          name,
          interactive,
        },
      });

      await sleep();
      expect(component.attributes("class")).toContain(interactiveClass);
    });

    // Disabled prop
    it("accepts disabled prop", async () => {
      const name = "check";
      const disabled = true;
      const disabledClass = "--vl-disabled-opacity";

      const component = mount(UIcon, {
        props: {
          name,
          disabled,
        },
      });

      await sleep();
      expect(component.attributes("class")).toContain(disabledClass);
    });

    // DataTest prop
    it("accepts dataTest prop", async () => {
      const name = "check";
      const dataTest = "icon-test";

      const component = mount(UIcon, {
        props: {
          name,
          dataTest,
        },
      });

      await sleep();
      expect(component.attributes("data-test")).toBe(dataTest);
    });
  });

  // Events tests
  describe("Events", () => {
    // Click event
    it("has click event handler", () => {
      const name = "check";

      const component = mount(UIcon, {
        props: {
          name,
        },
      });

      // Check that the component has the onClick method
      expect(component.vm.onClick).toBeDefined();
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // iconRef
    it("exposes iconRef", () => {
      const name = "check";

      const component = mount(UIcon, {
        props: {
          name,
        },
      });

      expect(
        (component.vm as ComponentPublicInstance & { iconRef: HTMLElement }).iconRef,
      ).toBeDefined();
    });
  });
});
