export default {
  /**
   * Global settings.
   */
  strategy: "merge",
  brand: "grayscale",
  gray: "gray",
  darkMode: "auto",
  outline: 2,
  rounding: 8,
  baseClasses: "",

  lightTheme: {
    "--vl-color-info-highlighted": "blue-700",
    "--vl-color-info-accented": "blue-700",
  },

  darkTheme: {
    "--vl-color-info-toned": "blue-400",
    "--vl-color-info-accented": "blue-400",
  },

  //   colors: {
  //     info: {
  //
  //
  //
  //       muted: { light: "blue-400", dark: "blue-600" },
  //       normal: { light: "blue-600", dark: "blue-400" },
  //       toned: { light: "blue-700", dark: "blue-500" },
  //       accented: { light: "blue-800", dark: "blue-600" },
  //     },
  //     error: {
  //       muted: { light: "#F00", dark: "#FF5000" },
  //       normal: { light: "blue-600", dark: "blue-400" },
  //       toned: { light: "blue-700", dark: "blue-500" },
  //       accented: { light: "blue-800", dark: "blue-600" },
  //     },
  //   },
  // },

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
