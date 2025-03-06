export const SRC_COMPONENTS_PATH = "/src/components";
export const COMPONENTS_PATH = "/components";
export const DEFAULT_VUELESS_CONFIG_CONTENT = `
export default {
  /**
   * Global settings.
   */
  strategy: "merge",
  primary: "grayscale",
  gray: "gray",
  outline: 2,
  rounding: 8,
  colorMode: "auto",
  baseClasses: "",

  /**
   * Light theme CSS variable settings.
   */
  lightTheme: {},

  /**
   * Dark theme CSS variable settings.
   */
  darkTheme: {},

  /**
   * Directive settings.
   */
  directives: {},

  /**
   * Component settings.
   */
  components: /*tw*/ {},

  /**
   * Custom classes TailwindMerge settings.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
   */
  tailwindMerge: {},
};
`;
