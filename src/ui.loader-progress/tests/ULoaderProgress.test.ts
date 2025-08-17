import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import ULoaderProgress from "../ULoaderProgress.vue";
import { LoaderProgressSymbol, createLoaderProgress } from "../useLoaderProgress";

import type { Props } from "../types";

describe("ULoaderProgress.vue", () => {
  // Common test configuration
  const loading = true;
  const global = {
    provide: {
      [LoaderProgressSymbol]: createLoaderProgress(),
    },
  };

  // Wait for an async component to load
  function sleep(ms: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Props tests
  describe("Props", () => {
    // Loading prop
    it("accepts loading prop and starts the loader", () => {
      const loadings = [true, false];

      loadings.forEach(async (loading) => {
        const component = mount(ULoaderProgress, {
          props: {
            loading,
          },
          global,
        });

        await sleep();
        expect(component.exists()).toBe(loading);
      });
    });

    // Color prop
    it("applies the correct color class", () => {
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

      colors.forEach(async (color) => {
        const component = mount(ULoaderProgress, {
          props: {
            color: color as Props["color"],
            loading,
          },
          global,
        });

        await sleep();
        expect(component.attributes("class")).toContain(color);
      });
    });

    // Size prop
    it("applies the correct size class", () => {
      const sizes = {
        xs: "h-px",
        sm: "h-0.5",
        md: "h-[3px]",
        lg: "h-1",
      };

      Object.keys(sizes).forEach(async (size) => {
        const component = mount(ULoaderProgress, {
          props: {
            size: size as Props["size"],
            loading,
          },
          global,
        });

        await sleep();
        expect(component.attributes("class")).toContain(size);
      });
    });

    // DataTest prop
    it("accepts dataTest prop", () => {
      const dataTest = "test-loader-progress";

      const component = mount(ULoaderProgress, {
        props: {
          dataTest,
        },
        global,
      });

      expect(component.props("dataTest")).toBe(dataTest);
    });
  });

  // Exposed methods and refs tests
  describe("Exposed methods and refs", () => {
    // start method
    it("exposes start method", () => {
      const expectedType = "function";

      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.start).toBeDefined();
      expect(typeof component.vm.start).toBe(expectedType);
      expect(() => component.vm.start()).not.toThrow();
    });

    // stop method
    it("exposes stop method", () => {
      const expectedType = "function";

      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.stop).toBeDefined();
      expect(typeof component.vm.stop).toBe(expectedType);
      expect(() => component.vm.stop()).not.toThrow();
    });

    // isLoading computed property
    it("exposes isLoading computed property", () => {
      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.isLoading).toBeDefined();
    });

    // progressRef
    it("exposes progressRef", () => {
      const component = mount(ULoaderProgress, {
        props: {
          loading,
        },
        global,
      });

      expect(component.vm.progressRef).toBeDefined();
    });
  });
});
