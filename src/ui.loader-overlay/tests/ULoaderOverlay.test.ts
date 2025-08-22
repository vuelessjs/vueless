import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import ULoaderOverlay from "../ULoaderOverlay.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import { LoaderOverlaySymbol, createLoaderOverlay } from "../useLoaderOverlay";

import type { Props } from "../types";

describe("ULoaderOverlay.vue", () => {
  // Define common test configurations
  const loading = true;
  const global = {
    provide: {
      [LoaderOverlaySymbol]: createLoaderOverlay(),
    },
  };

  // Props tests
  describe("Props", () => {
    // Loading prop - true
    it("shows overlay when loading prop is true", () => {
      const loading = true;

      const component = mount(ULoaderOverlay, {
        props: {
          loading,
        },
        global,
      });

      expect(component.find("[vl-key='overlay']").exists()).toBe(true);
      expect(component.findComponent(ULoader).exists()).toBe(true);
    });

    // Loading prop - false
    it("hides overlay when loading prop is false", () => {
      const loading = false;

      const component = mount(ULoaderOverlay, {
        props: {
          loading,
        },
        global,
      });

      expect(component.find("[vl-key='overlay']").exists()).toBe(false);
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
      ];

      colors.forEach((color) => {
        const component = mount(ULoaderOverlay, {
          props: {
            loading,
            color: color as Props["color"],
          },
          global,
        });

        const loader = component.findComponent(ULoader);

        expect(loader.props("color")).toBe(color);
      });
    });

    // DataTest prop
    it("applies the correct data-test attribute", () => {
      const dataTest = "test-loader-overlay";

      const component = mount(ULoaderOverlay, {
        props: {
          loading,
          dataTest,
        },
        global,
      });

      expect(component.find("[vl-key='overlay']").attributes("data-test")).toBe(dataTest);
    });
  });

  // Slots tests
  describe("Slots", () => {
    // Default slot
    it("renders content from default slot", () => {
      const slotContent = "Custom Loader";
      const slotClass = "custom-loader";

      const component = mount(ULoaderOverlay, {
        props: {
          loading,
        },
        slots: {
          default: `<div class="${slotClass}">${slotContent}</div>`,
        },
        global,
      });

      expect(component.findComponent(ULoader).exists()).toBe(false);
      expect(component.find(`.${slotClass}`).exists()).toBe(true);
      expect(component.find(`.${slotClass}`).text()).toBe(slotContent);
    });
  });

  // Event listeners tests
  describe("Event listeners", () => {
    let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
    let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      addEventListenerSpy = vi.spyOn(window, "addEventListener");
      removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    it("adds event listeners on mount", () => {
      mount(ULoaderOverlay, {
        global,
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith("loaderOverlayOn", expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith("loaderOverlayOff", expect.any(Function));
    });

    it("removes event listeners on unmount", () => {
      const component = mount(ULoaderOverlay, {
        global,
      });

      component.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith("loaderOverlayOn", expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith("loaderOverlayOff", expect.any(Function));
    });
  });

  // Exposed refs tests
  describe("Exposed refs", () => {
    // overlayRef
    it("exposes overlayRef", () => {
      const component = mount(ULoaderOverlay, {
        props: {
          loading,
        },
        global,
      });

      expect(component.vm.overlayRef).toBeDefined();
    });
  });
});
