export const SRC_COMPONENTS_PATH = "/src/components";
export const COMPONENTS_PATH = "/components";
export const DEFAULT_VUELESS_CONFIG_CONTENT = `
export default {
  /**
   * Global settings.
   */
  primary: "grayscale",
  neutral: "gray",
  colorMode: "auto",
  outline: 2,
  rounding: 8,
  fontSize: 14,
  unstyled: false,

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
   * https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts
   */
  tailwindMerge: {},
};
`;
