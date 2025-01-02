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
  roundingSm: 4,
  rounding: 8,
  roundingLg: 16,

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
   * Directive settings.
   */
  directive: {},

  /**
   * Component settings.
   */
  component: /*tw*/ {},

  /**
   * Custom classes TailwindMerge settings.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
   */
  tailwindMerge: {},
};
