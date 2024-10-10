import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors.js";
import {
  COLOR_SHADES,
  BRAND_COLOR,
  GRAY_COLOR,
  COOL_COLOR,
  DARK_MODE_SELECTOR,
} from "./constants.js";

const isStrategyOverride = process.env.VUELESS_STRATEGY === "override";

/**
 * Vueless Tailwind CSS `content` config.
 * Use it to extend project Tailwind CSS `content` config.
 */
export const vuelessContent = [
  "./vueless.config.{js,ts}",
  "./node_modules/vueless/**/*.{js,ts,vue}",
  ...(isStrategyOverride ? ["!./src/**/ui.*/config.{js,ts}"] : []), // only for vueless env
  ...(isStrategyOverride ? ["!./node_modules/vueless/**/ui.*/config.{js,ts}"] : []),
];

/**
 * Vue.js default Tailwind CSS `content` config.
 * Use it to extend project Tailwind CSS `content` config.
 */
export const vuelessContentVue = ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"];

/**
 * Nuxt.js default Tailwind CSS `content` config.
 * Use it to extend project Tailwind CSS `content` config.
 */
export const vuelessContentNuxt = [
  "./composables/**/*.{js,ts}",
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./utils/**/*.{js,ts}",
  "./App.{js,ts,vue}",
  "./app.{js,ts,vue}",
  "./Error.{js,ts,vue}",
  "./error.{js,ts,vue}",
  "./app.config.{js,ts}",
];

/**
 * Vueless tailwind static config.
 * Exported to use in `@vueless/module-nuxt`.
 */
const safelist = getSafelist();
const brandColors = getPalette(BRAND_COLOR);
const grayColors = getPalette(GRAY_COLOR);

export const vuelessTailwindConfig = {
  darkMode: DARK_MODE_SELECTOR,
  content: [...vuelessContent, ...vuelessContentVue, ...vuelessContentNuxt],
  theme: {
    extend: {
      colors: {
        [BRAND_COLOR]: brandColors || {},
        [GRAY_COLOR]: grayColors || {},
        [COOL_COLOR]: { ...(colors[GRAY_COLOR] || {}) },
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      fontSize: {
        "2xs": ["0.625rem", "0.875rem"] /* 10px / 14px */,
      },
      ringWidth: {
        dynamic: "var(--vl-ring)",
      },
      ringOffsetWidth: {
        dynamic: "var(--vl-ring-offset)",
      },
      borderRadius: {
        dynamic: "var(--vl-rounding)",
      },
    },
  },
};

/**
 * Generates preset for TailwindCSS base on Vueless config.
 * @returns {Object}
 */
export function vuelessPreset() {
  return {
    ...vuelessTailwindConfig,
    plugins: [forms],
    safelist,
  };
}

/**
 * Convert sting patterns to RegExp.
 * @returns {Array} - TailwindCSS safelist.
 */
export function getSafelist() {
  return JSON.parse(process.env.VUELESS_SAFELIST || "[]").map((rule) => ({
    ...rule,
    pattern: new RegExp(rule.pattern),
  }));
}

/**
 * Transform CSS variable with RGB numbers into CSS color.
 * @param { String } variableName
 * @returns {Function}
 */
function twColorWithOpacity(variableName) {
  return `rgba(var(${variableName}))`;
}

/**
 * Convert sting patterns to RegExp.
 * @param { String } color (gray | brand)
 * @returns { Object } - TailwindCSS color object palette.
 */
function getPalette(color) {
  let palette = {
    DEFAULT: twColorWithOpacity(`--vl-color-${color}-default`),
  };

  COLOR_SHADES.forEach((shade) => {
    palette[shade] = twColorWithOpacity(`--vl-color-${color}-${shade}`);
  });

  return palette;
}
