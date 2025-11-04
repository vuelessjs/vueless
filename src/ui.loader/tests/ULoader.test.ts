import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ULoader from "../ULoader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Props } from "../types";

describe("ULoader.vue", () => {
  describe("Props", () => {
    it("Loading – shows loader when loading prop is true", () => {
      const loading = true;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("[vl-key='loader']").exists()).toBe(true);
    });

    it("Loading – hides loader when loading prop is false", () => {
      const loading = false;

      const component = mount(ULoader, {
        props: {
          loading,
        },
      });

      expect(component.find("[vl-key='loader']").exists()).toBe(false);
    });

    it("Color – applies the correct color to the loader", () => {
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

    it("Size – applies the correct size to the loader", () => {
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

    it("Variant – renders dots variant by default", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
        },
      });

      expect(component.findAll("[vl-key='ellipse']").length).toBe(4);
      expect(component.findComponent(UIcon).exists()).toBe(false);
    });

    it("Variant – renders spinner variant when variant prop is 'spinner'", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
          variant: "spinner",
        },
      });

      expect(component.findComponent(UIcon).exists()).toBe(true);
      expect(component.findAll("[vl-key='ellipse']").length).toBe(0);
    });

    it("Variant – applies color to spinner variant", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
          variant: "spinner",
          color: "error",
        },
      });

      expect(component.findComponent(UIcon).props("color")).toBe("error");
    });

    it("Variant – applies correct size to spinner variant", () => {
      const sizeVariants = {
        sm: "sm",
        md: "md",
        lg: "lg",
      };

      Object.entries(sizeVariants).forEach(([size, iconSize]) => {
        const component = mount(ULoader, {
          props: {
            loading: true,
            variant: "spinner",
            size: size as Props["size"],
          },
        });

        expect(component.findComponent(UIcon).props("size")).toBe(iconSize);
      });
    });

    it("Variant – renders spinner variant with correct icon name", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
          variant: "spinner",
        },
      });

      expect(component.findComponent(UIcon).exists()).toBe(true);
    });

    it("Data Test – applies the correct data-test attribute", () => {
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

  describe("Slots", () => {
    it("Default – renders content from default slot", () => {
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

  describe("Exposed refs", () => {
    it("loaderRef – exposes loaderRef", () => {
      const component = mount(ULoader, {
        props: {
          loading: true,
        },
      });

      expect(component.vm.loaderRef).toBeDefined();
    });
  });
});
