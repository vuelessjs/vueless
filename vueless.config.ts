export default {
  /**
   * Global settings.
   */
  strategy: "merge",
  brand: "grayscale",
  gray: "cool",
  darkMode: "auto",
  ring: 2,
  ringOffsetColorLight: "#ffffff", // white
  ringOffsetColorDark: "#111827", // gray-900
  rounding: 8,

  /**
   * Directive settings.
   */
  directives: {},

  /**
   * Component settings.
   */
  components: /*tw*/ {},

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
