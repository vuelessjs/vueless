import colors from "tailwindcss/colors.js";
import forms from "@tailwindcss/forms";
import vuelessConfig from "../../vueless.config.js";

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

export default class TailwindServiceDefault {
  constructor() {
    this.vuelessPreset = this.get();
  }

  /**
   * Transform CSS variable with RGB numbers into CSS color.
   * @returns {Function}
   */
  static twColorWithOpacity(variableName) {
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
  static getSafelist() {
    return JSON.parse(process.env.SAFELIST_JSON || "[]").map((rule) => ({
      ...rule,
      pattern: new RegExp(rule.pattern),
    }));
  }

  /**
   * Generates preset for TailwindCSS base on Vueless config.
   * @returns {Object}
   */
  get() {
    const isProd = process.env.NODE_ENV === "production";
    const brandColor = TailwindServiceDefault.twColorWithOpacity("--color-brand");
    const { brand, gray } = vuelessConfig;

    let brandPalette = brandColors.includes(brand) ? colors[brand] : colors.green;
    let grayPalette = grayColors.includes(gray) ? colors[gray] : colors.zinc;

    if (brand === "grayscale") {
      brandPalette = grayPalette;
    }

    const prodSafelist = TailwindServiceDefault.getSafelist();
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
        // TODO: remove it after creating the package
        "./.vueless-layouts/**/*.{js,ts,vue}",
        "./.vueless-services/**/*.{js,ts,vue}",
      ],
      safelist: isProd ? prodSafelist : devSafelist,
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
            "mobile-menu-height": "3.5rem",
          },
          fontSize: {
            "2xs": ["0.625rem", "0.875rem"], //  10px
          },
        },
      },
      plugins: [forms],
    };
  }
}

export const { vuelessPreset } = new TailwindServiceDefault();
