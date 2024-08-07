/* Custom Vueless colors */
export const BRAND_COLOR = "brand";
export const GRAY_COLOR = "gray";
export const COOL_COLOR = "cool";
export const GRAYSCALE_COLOR = "grayscale";

/* Vueless defaults */
export const DEFAULT_BRAND_COLOR = GRAYSCALE_COLOR;
export const DEFAULT_GRAY_COLOR = COOL_COLOR;
export const DEFAULT_ROUNDING = 8; /* pixels */
export const DEFAULT_DARK_MODE = false;

/* Vueless supported colors and shades */
export const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const GRAY_COLORS = ["slate", COOL_COLOR, "zinc", "neutral", "stone"];
export const BRAND_COLORS = [
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

/* Vueless merge class strategy types */
export const STRATEGY_TYPE = {
  merge: "merge",
  replace: "replace",
  overwrite: "overwrite",
};

/* CVA (Class Variance Authority) default config keys */
export const CVA_CONFIG_KEY = {
  base: "base",
  variants: "variants",
  compoundVariants: "compoundVariants",
  defaultVariants: "defaultVariants",
};

/* Vueless default config keys */
export const SYSTEM_CONFIG_KEY = {
  i18n: "i18n",
  strategy: "strategy",
  safelist: "safelist",
  component: "component",
  safelistColors: "safelistColors",
  iconNameCapitalize: "IconName",
  iconName: "iconName",
  ...CVA_CONFIG_KEY,
};
