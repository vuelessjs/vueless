import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors.js";
import {
  COLOR_SHADES,
  BRAND_COLOR,
  GRAY_COLOR,
  COOL_COLOR,
  DARK_MODE_SELECTOR,
  DEFAULT_ROUNDING,
  DEFAULT_RING,
  DEFAULT_RING_OFFSET,
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
  darkMode: ["selector", `[class="${DARK_MODE_SELECTOR}"]`],
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
      // TODO: Add this feature
      ringOffsetColor: {
        dynamic: "var(--vl-ring-offset-color)",
      },
      borderRadius: {
        dynamic: "var(--vl-rounding)",
      },
    },
    configViewer: {
      themeReplacements: {
        // TODO: Set colors from vueless.config.{js|ts} if it present.
        "var(--vl-ring)": DEFAULT_RING,
        "var(--vl-ring-offset)": DEFAULT_RING_OFFSET,
        "var(--vl-rounding)": DEFAULT_ROUNDING,
        ...getReplacementColors(GRAY_COLOR, GRAY_COLOR),
        ...getReplacementColors(BRAND_COLOR, GRAY_COLOR),
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

/**
 * Prepare a color object for theme replacement to fix missing css color variables in `tailwind-config-viewer`.
 * @param { String } color (gray | brand)
 * @param { String } tailwindColor any tailwind color with pallet.
 * @returns { Object } - `tailwind-config-viewer` color replacement object.
 */
function getReplacementColors(color, tailwindColor) {
  const varsPalette = {
    [twColorWithOpacity(`--vl-color-${color}-default`)]: colors[tailwindColor][600],
  };

  COLOR_SHADES.forEach((shade) => {
    varsPalette[twColorWithOpacity(`--vl-color-${color}-${shade}`)] = colors[tailwindColor][shade];
  });

  return varsPalette;
}
