import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme.js";
import {
  COLOR_SHADES,
  BRAND_COLOR,
  GRAY_COLOR,
  COOL_COLOR,
  DARK_MODE_SELECTOR,
} from "../constants/index.js";

const safelist = getSafelist();

/**
 * Generates preset for TailwindCSS base on Vueless config.
 * @returns {Object}
 */
export function vuelessPreset() {
  return {
    darkMode: DARK_MODE_SELECTOR,
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}",
      "./vueless.config.{js,ts}",
      "./node_modules/vueless/**/*.{js,ts,vue}",
    ],
    safelist,
    theme: {
      extend: {
        colors: {
          [BRAND_COLOR]: getPalette(BRAND_COLOR),
          [GRAY_COLOR]: getPalette(GRAY_COLOR),
          [COOL_COLOR]: { ...defaultTheme.colors[GRAY_COLOR] },
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
        borderRadius: {
          dynamic: "var(--rounding)",
        },
      },
    },
    plugins: [forms],
  };
}

/**
 * Transform CSS variable with RGB numbers into CSS color.
 * @param { String } variableName
 * @returns {Function}
 */
function twColorWithOpacity(variableName) {
  return ({ opacityValue }) => {
    return opacityValue !== undefined
      ? `rgba(var(${variableName}), ${opacityValue})`
      : `rgb(var(${variableName}))`;
  };
}

/**
 * Convert sting patterns to RegExp.
 * @param { String } color (gray | brand)
 * @returns { Object } - TailwindCSS color object palette.
 */
function getPalette(color) {
  let palette = {
    DEFAULT: twColorWithOpacity(`--color-${color}-default`),
  };

  COLOR_SHADES.forEach((shade) => {
    palette[shade] = twColorWithOpacity(`--color-${color}-${shade}`);
  });

  return palette;
}

/**
 * Convert sting patterns to RegExp.
 * @returns {Array} - TailwindCSS safelist.
 */
function getSafelist() {
  return JSON.parse(process.env.VUELESS_SAFELIST || "[]").map((rule) => ({
    ...rule,
    pattern: new RegExp(rule.pattern),
  }));
}
