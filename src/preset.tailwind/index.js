import forms from "@tailwindcss/forms";
import { BRAND_COLORS, GRAY_COLORS, GRAYSCALE_COLOR } from "./constants/index.js";

const safelist = getSafelist();

/**
 * Generates preset for TailwindCSS base on Vueless config.
 * @returns {Object}
 */
export function vuelessPreset() {
  const brandColor = twColorWithOpacity("--color-brand");
  const { brand, gray } = getVuelessConfigColors();
  const colors = getTailwindConfigColors();

  if (!Object.keys(colors).length) {
    return {};
  }

  let brandPalette = BRAND_COLORS.includes(brand) ? colors[brand] : colors.green;
  let grayPalette = GRAY_COLORS.includes(gray) ? colors[gray] : colors.zinc;

  if (brand === GRAYSCALE_COLOR) {
    brandPalette = grayPalette;
  }

  return {
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
          brand: { ...brandPalette, DEFAULT: brandColor },
          gray: grayPalette,
        },
        spacing: {
          "safe-top": "env(safe-area-inset-top)",
          "safe-bottom": "env(safe-area-inset-bottom)",
          "safe-left": "env(safe-area-inset-left)",
          "safe-right": "env(safe-area-inset-right)",
        },
        fontSize: {
          "2xs": ["0.625rem", "0.875rem"], //  10px
        },
      },
    },
    plugins: [forms],
  };
}

/**
 * Transform CSS variable with RGB numbers into CSS color.
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
 * Convert sting to object.
 * @returns {Object} - TailwindCSS safelist.
 */
function getTailwindConfigColors() {
  return JSON.parse(process.env.VUELESS_TAILWIND_CONFIG_COLORS || "{}");
}

/**
 * Convert sting to object.
 * @returns {Object} - TailwindCSS safelist.
 */
function getVuelessConfigColors() {
  return JSON.parse(process.env.VUELESS_CONFIG_COLORS || "{}");
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
