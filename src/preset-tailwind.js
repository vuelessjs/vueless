/**
 * The file has `.js` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */
import { merge } from "lodash-es";
import forms from "@tailwindcss/forms";
import {
  BRAND_COLOR,
  GRAY_COLOR,
  GRAYSCALE_COLOR,
  COLOR_SHADES,
  TEXT_COLOR_SHADES,
  STATE_COLOR_SHADES,
  DARK_MODE_SELECTOR,
  TAILWIND_COLORS,
  DEFAULT_ROUNDING,
  DEFAULT_OUTLINE,
  DEFAULT_BRAND_COLOR,
  ROUNDING_DECREMENT,
  ROUNDING_INCREMENT,
  OUTLINE_INCREMENT,
  OUTLINE_DECREMENT,
  BORDER_COLOR_SHADES,
  BACKGROUND_COLOR_SHADES,
  STATE_COLORS,
} from "./constants.js";

const globalSettings = process.env.VUELESS_GLOBAL_SETTINGS || {};
const isStrategyOverride = globalSettings.strategy === "override";

/**
 * Vueless Tailwind CSS `content` config.
 * Use it to extend project Tailwind CSS `content` config.
 */
export const vuelessContent = [
  "./vueless.config.{js,ts}",
  "./.vueless/**/*.{js,ts,vue}",
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

const safelist = getSafelist();

const stateColors = {};
const typeColors = {};

const stateColorConfigs = [
  { type: "color", shades: STATE_COLOR_SHADES, stateColor: BRAND_COLOR },
  { type: "color", shades: STATE_COLOR_SHADES, stateColor: GRAYSCALE_COLOR },
  ...STATE_COLORS.map((stateColor) => ({ type: "color", stateColor, shades: STATE_COLOR_SHADES })),
];

const typeColorsConfigs = [
  { type: "border", shades: BORDER_COLOR_SHADES },
  { type: "text", shades: TEXT_COLOR_SHADES },
  { type: "bg", shades: BACKGROUND_COLOR_SHADES },
];

stateColorConfigs.forEach((config) => {
  stateColors[config.stateColor] = getColorPalette(config);
});

typeColorsConfigs.forEach((config) => {
  typeColors[`${config.type}Color`] = getColorPalette(config);
});

/**
 * Vueless tailwind static config.
 * Exported to use in `@vueless/nuxt`.
 */
export const vuelessTailwindConfig = {
  darkMode: ["class", `:where(.${DARK_MODE_SELECTOR})`],
  content: [...vuelessContent, ...vuelessContentVue, ...vuelessContentNuxt],
  theme: {
    extend: {
      ...typeColors /* borderColor, bgColor, textColor */,
      colors: {
        ...TAILWIND_COLORS,
        ...stateColors,
      },
      borderRadius: {
        inherit: "inherit",
        small: "var(--vl-rounding-sm)",
        medium: "var(--vl-rounding-md)",
        large: "var(--vl-rounding-lg)",
      },
      outlineWidth: {
        small: "var(--vl-outline-sm)",
        medium: "var(--vl-outline-md)",
        large: "var(--vl-outline-lg)",
      },
      fontSize: {
        "2xs": ["0.625rem", "0.875rem"] /* 10px / 14px */,
        xsmall: "var(--vl-text-xs)",
        small: "var(--vl-text-sm)",
        medium: "var(--vl-text-md)",
        large: "var(--vl-text-lg)",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
    // configViewer: {
    //   themeReplacements: {
    //     /* eslint-disable prettier/prettier, vue/max-len */
    //     "var(--vl-outline-sm)": globalSettings.ringSm || Math.max(0, (globalSettings.ring || DEFAULT_OUTLINE) - OUTLINE_DECREMENT),
    //     "var(--vl-outline)": globalSettings.ring || DEFAULT_OUTLINE,
    //     "var(--vl-outline-lg)": globalSettings.ringLg || Math.max(0, (globalSettings.ring || DEFAULT_OUTLINE) + OUTLINE_INCREMENT),
    //     "var(--vl-rounding-sm)": globalSettings.roundingSm || Math.max(0, (globalSettings.rounding || DEFAULT_ROUNDING) - ROUNDING_DECREMENT),
    //     "var(--vl-rounding)": globalSettings.ring || DEFAULT_ROUNDING,
    //     "var(--vl-rounding-lg)": globalSettings.roundingLg || Math.max(0, (globalSettings.rounding || DEFAULT_ROUNDING) - ROUNDING_INCREMENT),
    //     ...getReplacementColors(BRAND_COLOR, globalSettings.brand || DEFAULT_BRAND_COLOR),
    //     /* eslint-enable prettier/prettier, vue/max-len */
    //   },
    // },
  },
};

/**
 * Generates preset for TailwindCSS base on Vueless config.
 * @returns {Object}
 */
export function vuelessPreset() {
  return {
    theme: merge({}, globalSettings.tailwindTheme || {}, vuelessTailwindConfig.theme),
    darkMode: vuelessTailwindConfig.darkMode,
    content: vuelessTailwindConfig.content,
    plugins: [forms({ strategy: "base" })],
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
 * Creates Vueless theme color palette based on CSS variables.
 * @returns { Object } - TailwindCSS color object palette.
 */
function getColorPalette({ type, shades, stateColor = "" }) {
  const palette = {};

  Object.keys(shades).forEach((shade) => {
    const variableColor = stateColor ? `${stateColor}-${shade}` : shade;

    palette[shade] = twColorWithOpacity(`--vl-${type}-${variableColor}`);
  });

  /* Generate default brand pallet. */
  if (stateColor === BRAND_COLOR) {
    palette.DEFAULT = twColorWithOpacity(`--vl-${type}-${BRAND_COLOR}-default`);

    COLOR_SHADES.forEach((shade) => {
      palette[shade] = twColorWithOpacity(`--vl-${type}-${BRAND_COLOR}-${shade}`);
    });
  }

  return palette;
}

/**
 * Prepare a color object for theme replacement to fix missing css color variables in `tailwind-config-viewer`.
 * @param { String } color (gray | brand)
 * @param { String } tailwindColor any tailwind color with pallet.
 * @returns { Object } - `tailwind-config-viewer` color replacement object.
 */
function getReplacementColors(color, tailwindColor) {
  if (tailwindColor === GRAYSCALE_COLOR) {
    tailwindColor = GRAY_COLOR;
  }

  const varsPalette = {
    [twColorWithOpacity(`--vl-color-${color}-default`)]: TAILWIND_COLORS[tailwindColor][600],
  };

  COLOR_SHADES.forEach((shade) => {
    varsPalette[twColorWithOpacity(`--vl-color-${color}-${shade}`)] =
      TAILWIND_COLORS[tailwindColor][shade];
  });

  return varsPalette;
}
