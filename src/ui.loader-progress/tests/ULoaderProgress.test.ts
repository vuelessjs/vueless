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

  describe("Props", () => {
    it("Loading – accepts loading prop and starts the loader", () => {
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

    it("Size – applies the correct size class", () => {
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

    it("DataTest – accepts dataTest prop", () => {
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

  describe("Exposed methods and refs", () => {
    it("start – exposes start method", () => {
      const expectedType = "function";

      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.start).toBeDefined();
      expect(typeof component.vm.start).toBe(expectedType);
      expect(() => component.vm.start()).not.toThrow();
    });

    it("stop – exposes stop method", () => {
      const expectedType = "function";

      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.stop).toBeDefined();
      expect(typeof component.vm.stop).toBe(expectedType);
      expect(() => component.vm.stop()).not.toThrow();
    });

    it("isLoading – exposes isLoading computed property", () => {
      const component = mount(ULoaderProgress, {
        global,
      });

      expect(component.vm.isLoading).toBeDefined();
    });

    it("progressRef – progressRef – exposes progressRef", () => {
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
