import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULoader from "../ULoader.vue";

import type { Props } from "../types";

describe("ULoader.vue", () => {
  // Props tests
  describe("Props", () => {
    // Loading prop - true
    it("shows loader when loading prop is true", () => {
      const loading = true;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("[vl-key='loader']").exists()).toBe(true);
    });

    // Loading prop - false
    it("hides loader when loading prop is false", () => {
      const loading = false;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("[vl-key='loader']").exists()).toBe(false);
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
        const ellipses = component.findAll("[vl-key='ellipse']");

        ellipses.forEach((ellipse) => {
          color === "inherit"
            ? expect(ellipse.classes()).toContain("bg-current")
            : expect(ellipse.classes()).toContain(`bg-${color}`);
        });
      });
    });

    // Size prop
    it("applies the correct size to the loader", () => {
      const sizeVariants = {
        sm: "vueless-loader-ellipse-sm",
        md: "vueless-loader-ellipse-md",
        lg: "vueless-loader-ellipse-lg",
      };

      Object.entries(sizeVariants).forEach(([size, classes]) => {
        const component = mount(ULoader, {
          props: {
            loading: true,
            size: size as Props["size"],
          },
        });

        // Check if the ellipses have the correct size class
        const ellipses = component.findAll("[vl-key='ellipse']");

        ellipses.forEach((ellipse) => {
          expect(ellipse.classes()).toContain(classes);
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

      expect(component.find("[vl-key='loader']").attributes("data-test")).toBe(dataTest);
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
      expect(component.findAll("[vl-key='ellipse']").length).toBe(0); // No default ellipses when using a custom slot
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

      expect(component.vm.loaderRef).toBeDefined();
    });
  });
});
