/* eslint-disable no-console */
import { h } from "vue";
import { config } from "@vue/test-utils";
import { beforeAll, afterAll, vi } from "vitest";
import { createLocale, LocaleSymbol } from "../src/composables/useLocale";

const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Invoke the slot function inside the render function instead")
    ) {
      return;
    }

    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

// Create a mock locale instance for tests
export const mockLocale = createLocale();

// Configure Vue Test Utils to provide the locale instance globally
config.global.provide = {
  ...config.global.provide,
  [LocaleSymbol]: mockLocale,
};

// Mock the virtual:vueless/icons import
// Mock the icons module with dynamic icon generation
vi.mock("virtual:vueless/icons", () => {
  // Function to create icon based on name
  const createIconRender = (iconName: string) => () => {
    return h(
      "svg",
      {
        "data-name": iconName,
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          d: `M${iconName}-path-data`, // Mock path based on icon name
        }),
      ],
    );
  };

  // Create a map of common icon names to their mock modules
  const iconModules = new Map();
  const commonIcons = [
    "check",
    "close",
    "close_small",
    "info",
    "warning",
    "user",
    "home",
    "search",
    "star",
    "star-fill",
    "visibility-fill",
    "visibility_off-fill",
  ];

  commonIcons.forEach((iconName) => {
    const render = createIconRender(iconName);

    iconModules.set(
      iconName,
      Promise.resolve({
        render,
        default: { render },
        [Symbol.toStringTag]: "Module",
      }),
    );
  });

  // Generate cached icons array
  const cachedIcons = Array.from(iconModules.entries()).map(([iconName, module]) => [
    `node_modules/.cache/vueless/icons/@material-symbols/${iconName}.svg`,
    module,
  ]);

  return { cachedIcons };
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
