import path from "node:path";

export const DEFAULT_VUELESS_CONFIG_NAME = "vueless.config.js";
export const DEFAULT_EXIT_CODE = 0;
export const FAILURE_CODE = 1;
export const TYPESCRIPT_EXT = ".ts";
export const JAVASCRIPT_EXT = ".js";
export const SRC_COMPONENTS_PATH = "/src/components";
export const COMPONENTS_PATH = "/components";
export const SRC_PATH = "/src";
export const NODE_MODULES_PATH = path.resolve("/", path.resolve(process.argv[1], "../../"));
export const DEFAULT_VUELESS_CONFIG_CONTNET = `
export default {
  /**
    * Global settings.
    */
  strategy: "merge",
  brand: "grayscale",
  gray: "cool",
  darkMode: "auto",
  ring: 4,
  ringOffset: 0,
  ringOffsetColorLight: "#ffffff", // white
  ringOffsetColorDark: "#111827", // gray-900
  rounding: 8,

  /**
    * Directive settings.
    */
  directive: {},

  /**
    * Component settings.
    */
  component: /*tw*/ {},

  /**
    * Tailwind CSS theme config.
    * https://tailwindcss.com/docs/theme
    */
  tailwindTheme: {
    extend: {
      colors: {},
    },
  },

  /**
    * Custom classes TailwindMerge settings.
    * All lists of rules available here:
    * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
    */
  tailwindMerge: {},
};
`;
