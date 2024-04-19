import colors from "tailwindcss/colors.js";
import forms from "@tailwindcss/forms";
import vuelessConfig from "../../../vueless.config.js";

export const grayColors = ["slate", "gray", "zinc", "neutral", "stone"];
export const brandColors = [
  "brand",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

/**
 * Generates preset for TailwindCSS base on Vueless config.
 * @returns {Object}
 */
export function vuelessPreset() {
  const isProd = process.env.NODE_ENV === "production";
  const brandColor = twColorWithOpacity("--color-brand");
  const { brand, gray } = vuelessConfig;

  let brandPalette = brandColors.includes(brand) ? colors[brand] : colors.green;
  let grayPalette = grayColors.includes(gray) ? colors[gray] : colors.zinc;

  if (brand === "grayscale") {
    brandPalette = grayPalette;
  }

  const prodSafelist = getSafelist();
  const devSafelist = [
    {
      pattern: /(border|bg|text|ring)-(.*)-((50|[1-9]00|950)?)$/,
      variants: ["hover", "focus", "focus-within", "active"],
    },
  ];

  return {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}",
      "./vueless.config.{js,ts}",
      "./node_modules/vueless/**/*.{js,ts,vue}",
    ],
    safelist: isProd ? prodSafelist : devSafelist,
    theme: {
      extend: {
        colors: {
          brand: { ...brandPalette, DEFAULT: brandColor },
          gray: grayPalette,
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
 * Convert sting patterns to RegExp.
 * @returns {Array} - TailwindCSS safelist.
 */
function getSafelist() {
  return JSON.parse(process.env.SAFELIST_JSON || "[]").map((rule) => ({
    ...rule,
    pattern: new RegExp(rule.pattern),
  }));
}
