import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULoader from "../ULoader.vue";

import type { Props } from "../types.ts";
import type { ComponentPublicInstance } from "vue";

describe("ULoader.vue", () => {
  // Props tests
  describe("Props", () => {
    // Loading prop
    it("shows loader when loading prop is true", () => {
      const loading = true;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("div").exists()).toBe(true);
    });

    it("hides loader when loading prop is false", () => {
      const loading = false;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("div").exists()).toBe(false);
    });

    // Color prop
    it("applies the correct color to the loader", () => {
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

      colors.forEach((color) => {
        const component = mount(ULoader, {
          props: {
            loading: true,
            color: color as Props["color"],
          },
        });

        // Check if the ellipses have the correct color class
        const ellipses = component.findAll("div > div");

        ellipses.forEach((ellipse) => {
          if (color === "inherit") {
            expect(ellipse.classes()).toContain("bg-current");
          } else {
            expect(ellipse.attributes("class")).toContain(`bg-${color}`);
          }
        });
      });
    });

    // Size prop
    it("applies the correct size to the loader", () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const component = mount(ULoader, {
          props: {
            loading: true,
            size: size as Props["size"],
          },
        });

        // Check if the loader has the correct size class
        const loader = component.find("div");

        expect(loader.classes()).toContain(
          `h-${size === "sm" ? "1.5" : size === "md" ? "2.5" : "4"}`,
        );
        expect(loader.classes()).toContain(
          `w-${size === "sm" ? "9" : size === "md" ? "[3.625rem]" : "20"}`,
        );

        // Check if the ellipses have the correct size class
        const ellipses = component.findAll("div > div");

        ellipses.forEach((ellipse) => {
          expect(ellipse.classes()).toContain(`vueless-loader-ellipse-${size}`);
          expect(ellipse.classes()).toContain(
            `size-${size === "sm" ? "1.5" : size === "md" ? "2.5" : "4"}`,
          );
        });
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-loader";

      const component = mount(ULoader, {
        props: {
          loading: true,
          dataTest,
        },
      });

      expect(component.find("div").attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Loader";
      const slotClass = "custom-loader";

      const component = mount(ULoader, {
        props: {
          loading: true,
        },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
      });

      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
      expect(component.findAll("div > div").length).toBe(1); // Only the custom slot content, not the default ellipses
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // loaderRef
    it("exposes loaderRef", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
        },
      });

      expect(
        (component.vm as ComponentPublicInstance & { loaderRef: HTMLDivElement }).loaderRef,
      ).toBeDefined();
    });
  });
});
